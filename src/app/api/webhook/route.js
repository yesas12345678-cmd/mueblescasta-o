import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { query } from '@/utils/db';
import { sendOrderEmails } from '@/utils/orderEmails';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});


export async function POST(request) {
  const sig = request.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    console.error('Falta la firma de Stripe o el secreto de Webhook.');
    return NextResponse.json({ error: 'Falta firma o secreto' }, { status: 400 });
  }

  let event;

  try {
    const rawBody = await request.text();
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    console.error(`Error al verificar la firma del Webhook: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Manejar el evento de Stripe
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const orderId = session.metadata?.orderId;

    if (!orderId) {
      console.error('El Webhook recibió un evento de sesión completada pero no se encontró orderId en los metadatos.');
      return NextResponse.json({ error: 'Metadata orderId no encontrada' }, { status: 400 });
    }

    console.log(`Pago verificado por Stripe para el pedido: ${orderId}`);

    try {
      // 1. Actualizar el estado del pedido a 'pagado' en la base de datos
      const updateResult = await query(
        "UPDATE pedidos SET estado_pago = 'pagado', stripe_session_id = $1 WHERE id = $2 RETURNING *",
        [session.id, orderId]
      );

      if (updateResult.rowCount === 0) {
        console.warn(`El pedido ${orderId} no se encontró en la base de datos al intentar marcarlo como pagado.`);
      } else {
        const order = updateResult.rows[0];

        // 2. Obtener los detalles del pedido para el correo electrónico
        const itemsResult = await query(
          "SELECT producto_id as id, producto_nombre as name, cantidad, precio_unitario as price FROM detalles_pedido WHERE pedido_id = $1",
          [orderId]
        );

        const cartItems = itemsResult.rows.map(item => ({
          id: item.id,
          name: item.name,
          quantity: parseInt(item.cantidad, 10),
          price: parseFloat(item.price)
        }));

        const customerInfo = {
          name: order.cliente_nombre,
          email: order.cliente_email,
          phone: order.cliente_telefono,
          address: order.direccion,
          zip: order.codigo_postal,
          city: order.localidad,
          province: order.provincia
        };

        const total = parseFloat(order.total);

        // 3. Enviar correos de confirmación al cliente y administrador
        try {
          await sendOrderEmails({
            orderId,
            customerInfo,
            cartItems,
            total
          });
          console.log(`Correos de confirmación de pedido ${orderId} enviados con éxito.`);
        } catch (emailError) {
          console.error(`Error al enviar los correos del pedido ${orderId}:`, emailError);
        }
      }
    } catch (dbError) {
      console.error(`Error de base de datos en webhook para el pedido ${orderId}:`, dbError);
      return NextResponse.json({ error: 'Error interno en la base de datos' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
