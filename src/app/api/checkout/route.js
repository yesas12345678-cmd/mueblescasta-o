import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { rateLimit } from '@/utils/rateLimit';
import { pool, query } from '@/utils/db';
import { sendOrderEmails } from '@/utils/orderEmails';

export async function POST(request) {
  try {
    // 1. OBTENER IP DEL CLIENTE Y APLICAR RATE LIMITING
    const forwardedFor = request.headers.get('x-forwarded-for');
    const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';

    // Límite de 5 peticiones por minuto por IP para evitar ataques DoS o abuso de la pasarela
    if (!rateLimit(clientIp, 5, 60000)) {
      return NextResponse.json(
        { error: 'Demasiadas solicitudes de pago desde esta dirección. Por favor, espere un minuto.' },
        { status: 429 }
      );
    }

    const { cartItems, customerInfo } = await request.json();

    // 2. VALIDACIÓN RIGUROSA DE ENTRADA
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return NextResponse.json(
        { error: 'El carrito está vacío o el formato es incorrecto' },
        { status: 400 }
      );
    }

    // Validar productos individuales
    for (const item of cartItems) {
      if (!item.id || !item.name || typeof item.price !== 'number' || typeof item.quantity !== 'number' || item.quantity <= 0) {
        return NextResponse.json(
          { error: 'Formato de producto no válido en el carrito' },
          { status: 400 }
        );
      }
    }

    // Validar información del cliente
    if (!customerInfo || typeof customerInfo !== 'object') {
      return NextResponse.json(
        { error: 'Información del cliente no proporcionada' },
        { status: 400 }
      );
    }

    const { name, email, phone, address, zip, city, province } = customerInfo;

    if (!name || typeof name !== 'string' || name.trim().length < 3 || name.length > 100) {
      return NextResponse.json({ error: 'Nombre no válido (debe tener entre 3 y 100 caracteres)' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email) || email.length > 150) {
      return NextResponse.json({ error: 'Dirección de correo electrónico no válida' }, { status: 400 });
    }

    const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/;
    if (!phone || !phoneRegex.test(phone) || phone.length < 9 || phone.length > 20) {
      return NextResponse.json({ error: 'Número de teléfono no válido' }, { status: 400 });
    }

    if (!address || typeof address !== 'string' || address.trim().length < 5 || address.length > 200) {
      return NextResponse.json({ error: 'Dirección de envío no válida' }, { status: 400 });
    }

    if (!zip || typeof zip !== 'string' || zip.trim().length < 5 || zip.length > 10) {
      return NextResponse.json({ error: 'Código postal no válido' }, { status: 400 });
    }

    if (!city || typeof city !== 'string' || city.trim().length < 2 || city.length > 100) {
      return NextResponse.json({ error: 'Localidad no válida' }, { status: 400 });
    }

    if (!province || typeof province !== 'string' || province.trim().length < 2 || province.length > 100) {
      return NextResponse.json({ error: 'Provincia no válida' }, { status: 400 });
    }

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const origin = request.headers.get('origin') || 'https://mueblescastano.com';
    const isLocalhost = origin.includes('localhost') || origin.includes('127.0.0.1');
    const isProd = process.env.NODE_ENV === 'production' && !isLocalhost;

    // 3. REGISTRAR PEDIDO EN BASE DE DATOS (SI ESTÁ CONFIGURADA)
    const hasDb = !!process.env.DATABASE_URL;
    const orderDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `MC-${orderDate}-${randomSuffix}`;
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (hasDb) {
      const client = await pool.connect();
      try {
        await client.query('BEGIN');
        
        const orderQuery = `
          INSERT INTO pedidos (id, cliente_nombre, cliente_email, cliente_telefono, direccion, codigo_postal, localidad, provincia, total, estado_pago)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        `;
        const orderParams = [
          orderId,
          name,
          email,
          phone,
          address,
          zip,
          city,
          province,
          total,
          'pendiente'
        ];
        await client.query(orderQuery, orderParams);

        const itemQuery = `
          INSERT INTO detalles_pedido (pedido_id, producto_id, producto_nombre, cantidad, precio_unitario)
          VALUES ($1, $2, $3, $4, $5)
        `;
        for (const item of cartItems) {
          await client.query(itemQuery, [
            orderId,
            item.id,
            item.name,
            item.quantity,
            item.price
          ]);
        }

        await client.query('COMMIT');
      } catch (dbError) {
        await client.query('ROLLBACK');
        console.error('Error de base de datos al registrar pedido:', dbError);
        return NextResponse.json(
          { error: 'Error interno al registrar el pedido en la base de datos' },
          { status: 500 }
        );
      } finally {
        client.release();
      }
    } else if (isProd) {
      console.error('ERROR SEGURIDAD: DATABASE_URL no está configurada en producción.');
      return NextResponse.json(
        { error: 'Error de configuración en el servidor.' },
        { status: 500 }
      );
    }

    // 4. SEGURIDAD: SI NO HAY CLAVE DE STRIPE, PREVENIR ACCESO GRATUITO EN PRODUCCIÓN
    if (!stripeSecretKey) {
      if (isProd) {
        console.error('ERROR SEGURIDAD: Se intentó realizar un pago pero STRIPE_SECRET_KEY no está configurada.');
        return NextResponse.json(
          { error: 'El servicio de pago no está configurado correctamente en el servidor. Contacte con soporte.' },
          { status: 500 }
        );
      }

      console.warn('STRIPE_SECRET_KEY no encontrada. Iniciando pasarela simulada segura en modo de desarrollo.');
      
      const mockSessionId = `mock_session_${Date.now()}`;
      if (hasDb) {
        try {
          // En simulación de desarrollo, actualizamos el pedido a pagado directamente
          await query(
            'UPDATE pedidos SET stripe_session_id = $1, estado_pago = $2 WHERE id = $3',
            [mockSessionId, 'pagado', orderId]
          );
        } catch (dbError) {
          console.error('Error al actualizar pedido simulado en DB:', dbError);
        }
      }

      // Enviar correos de confirmación (se simularán o enviarán de verdad según SMTP)
      try {
        await sendOrderEmails({
          orderId,
          customerInfo,
          cartItems,
          total,
        });
      } catch (emailError) {
        console.error('Error al enviar emails de confirmación del pedido simulado:', emailError);
      }

      // Simulación segura únicamente en desarrollo local
      return NextResponse.json({
        url: `${origin}/checkout/success?session_id=${mockSessionId}`,
        simulated: true,
      });
    }

    // Inicializamos Stripe con la clave secreta
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16', // Versión de API segura
    });

    // Mapeamos los productos del carrito al formato oficial de Stripe
    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
          images: [item.image.startsWith('http') ? item.image : `${origin}${item.image}`],
        },
        unit_amount: Math.round(item.price * 100), // Stripe procesa en céntimos
      },
      quantity: item.quantity,
    }));

    // Creamos la sesión oficial de Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      customer_email: email,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
      shipping_address_collection: {
        allowed_countries: ['ES'], // Envío solo en España
      },
      metadata: {
        orderId: orderId,
      },
    });

    if (hasDb) {
      try {
        // Guardamos el Stripe Session ID real en nuestro pedido
        await query(
          'UPDATE pedidos SET stripe_session_id = $1 WHERE id = $2',
          [session.id, orderId]
        );
      } catch (dbError) {
        console.error('Error al actualizar stripe_session_id en DB:', dbError);
      }
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error al procesar la API de checkout:', error);
    return NextResponse.json(
      { error: 'Ocurrió un error al procesar el pago. Por favor, inténtelo de nuevo.' },
      { status: 500 }
    );
  }
}

