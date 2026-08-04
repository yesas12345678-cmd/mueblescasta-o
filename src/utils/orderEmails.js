import { sendEmail } from '@/utils/mailer';

/**
 * Envía las confirmaciones de pedido por email tanto al cliente como al administrador.
 * 
 * @param {Object} data Datos del pedido
 * @param {string} data.orderId ID único del pedido (ej. MC-20260804-1234)
 * @param {Object} data.customerInfo Datos de envío y contacto del cliente
 * @param {Array} data.cartItems Artículos del carrito comprados
 * @param {number} data.total Importe total del pedido
 */
export async function sendOrderEmails({ orderId, customerInfo, cartItems, total }) {
  const { name, email, phone, address, zip, city, province } = customerInfo;

  // 1. GENERAR CORREO PARA EL CLIENTE
  const clientSubject = `Confirmación de tu pedido ${orderId} | Muebles Castaño`;
  
  const clientHtmlItems = cartItems
    .map(
      (item) => `
      <tr style="border-bottom: 1px solid #eeeeee;">
        <td style="padding: 12px 8px; vertical-align: middle;">
          <span style="font-weight: 600; color: #2c2520; font-size: 14px;">${item.name}</span>
        </td>
        <td style="padding: 12px 8px; text-align: center; color: #777777; font-size: 14px;">x${item.quantity}</td>
        <td style="padding: 12px 8px; text-align: right; font-weight: 600; color: #2c2520; font-size: 14px;">
          ${(item.price * item.quantity).toFixed(2)}€
        </td>
      </tr>
    `
    )
    .join('');

  const clientEmailHtml = `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f7f6f5; padding: 40px 10px; color: #444444;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border-top: 6px solid #634533;">
        
        <!-- Cabecera -->
        <div style="padding: 30px; text-align: center; background-color: #fcfbfa; border-bottom: 1px solid #eeeeee;">
          <h1 style="color: #634533; margin: 0; font-size: 26px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;">Muebles Castaño</h1>
          <p style="margin: 5px 0 0 0; color: #a18b7e; font-size: 12px; letter-spacing: 2px;">HUÉSCAR • GRANADA</p>
        </div>

        <!-- Cuerpo principal -->
        <div style="padding: 40px 30px;">
          <h2 style="color: #2c2520; font-size: 20px; margin-top: 0; font-weight: 600;">¡Muchas gracias por tu compra, ${name}!</h2>
          <p style="line-height: 1.6; color: #555555; font-size: 15px;">
            Hemos recibido tu pedido correctamente. A continuación tienes un resumen con los detalles de tu compra.
          </p>

          <!-- Tarjeta ID Pedido -->
          <div style="background-color: #fcfbfa; border: 1px dashed #a18b7e; padding: 15px; border-radius: 6px; text-align: center; margin: 25px 0; font-size: 15px;">
            <strong>Código de Pedido:</strong> <span style="color: #634533; font-family: monospace; font-size: 16px; font-weight: bold;">${orderId}</span>
          </div>

          <!-- Tabla de Artículos -->
          <h3 style="color: #2c2520; font-size: 16px; border-bottom: 2px solid #634533; padding-bottom: 8px; margin-top: 30px; font-weight: 600;">Productos comprados</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead>
              <tr style="border-bottom: 1px solid #dddddd; text-align: left;">
                <th style="padding: 8px; color: #777777; font-size: 13px; font-weight: bold; text-transform: uppercase;">Producto</th>
                <th style="padding: 8px; color: #777777; font-size: 13px; font-weight: bold; text-transform: uppercase; text-align: center;">Cant.</th>
                <th style="padding: 8px; color: #777777; font-size: 13px; font-weight: bold; text-transform: uppercase; text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${clientHtmlItems}
            </tbody>
          </table>

          <!-- Desglose Totales -->
          <div style="background-color: #fcfbfa; padding: 20px; border-radius: 6px; margin-top: 20px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px;">
              <span style="color: #777777;">Subtotal:</span>
              <span style="font-weight: 600; color: #2c2520;">${total.toFixed(2)}€</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px;">
              <span style="color: #777777;">Transporte y Montaje:</span>
              <span style="font-weight: 600; color: #3e5c46;">¡Gratis!</span>
            </div>
            <div style="display: flex; justify-content: space-between; border-top: 1px solid #dddddd; padding-top: 10px; margin-top: 10px; font-size: 16px; font-weight: bold;">
              <span style="color: #2c2520;">Total Pagado:</span>
              <span style="color: #634533; font-size: 18px;">${total.toFixed(2)}€</span>
            </div>
          </div>

          <!-- Información de Entrega -->
          <h3 style="color: #2c2520; font-size: 16px; border-bottom: 1px solid #eeeeee; padding-bottom: 8px; margin-top: 35px; font-weight: 600;">Dirección de Envío</h3>
          <p style="line-height: 1.5; color: #555555; font-size: 14px; background-color: #faf9f8; padding: 15px; border-radius: 6px; border-left: 3px solid #a18b7e; margin-top: 10px;">
            ${address}<br/>
            ${zip} - ${city} (${province})
          </p>

          <!-- Aviso de Montaje Corporativo -->
          <div style="margin-top: 40px; padding: 20px; background-color: #f4f7f5; border-radius: 6px; border: 1px solid #d4e0d7; color: #2c4433;">
            <h4 style="margin: 0 0 8px 0; font-size: 15px; font-weight: bold; color: #3e5c46;">🚚 Entrega y Montaje Gratuito</h4>
            <p style="margin: 0; font-size: 14px; line-height: 1.5;">
              Tal y como te informamos, en las próximas <strong>24 horas laborables</strong> nuestro equipo de tienda se pondrá en contacto contigo a través del teléfono <strong>${phone}</strong> para concertar el día y la hora exacta de la entrega que mejor se adapte a tu horario. El transporte y el montaje son totalmente gratis en la zona de Huéscar y comarca.
            </p>
          </div>
        </div>

        <!-- Footer del correo -->
        <div style="background-color: #2c2520; padding: 30px; text-align: center; color: #a18b7e; font-size: 12px; line-height: 1.5;">
          <p style="margin: 0 0 10px 0; color: #ffffff; font-weight: bold;">Muebles Castaño S.L.</p>
          <p style="margin: 0 0 5px 0;">Calle Mayor, 15, 18830 Huéscar, Granada</p>
          <p style="margin: 0 0 15px 0;">Teléfono: +34 958 74 01 23 | info@mueblescastano.com</p>
          <div style="border-top: 1px solid #443c37; padding-top: 15px; font-size: 11px;">
            Has recibido este correo electrónico en relación a tu compra en mueblescastano.com
          </div>
        </div>
        
      </div>
    </div>
  `;

  // Enviar correo al cliente
  await sendEmail({
    to: email,
    subject: clientSubject,
    html: clientEmailHtml,
  });

  // 2. GENERAR CORREO PARA EL ADMINISTRADOR (LA TIENDA)
  const adminSubject = `[NUEVA VENTA WEB] Pedido ${orderId} - ${name}`;
  
  const adminEmailHtml = `
    <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 30px 10px; color: #333333;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 6px; overflow: hidden; border: 1px solid #dddddd;">
        
        <div style="background-color: #2c2520; color: #ffffff; padding: 20px; text-align: center;">
          <h2 style="margin: 0; font-size: 20px;">¡Nueva Venta Recibida en la Web!</h2>
          <span style="font-size: 14px; color: #a18b7e;">Pedido ID: <strong>${orderId}</strong></span>
        </div>

        <div style="padding: 25px;">
          <!-- Ficha del Cliente -->
          <h3 style="color: #634533; border-bottom: 2px solid #634533; padding-bottom: 6px; margin-top: 0;">Datos del Cliente</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
            <tr>
              <td style="padding: 6px 0; font-weight: bold; width: 140px; color: #555555;">Nombre:</td>
              <td style="padding: 6px 0; color: #111111;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #555555;">Email:</td>
              <td style="padding: 6px 0; color: #111111;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #555555;">Teléfono:</td>
              <td style="padding: 6px 0; color: #111111; font-weight: bold; font-size: 15px;"><a href="tel:${phone}">${phone}</a> (Llamar para coordinar)</td>
            </tr>
          </table>

          <!-- Datos de Envío -->
          <h3 style="color: #634533; border-bottom: 2px solid #634533; padding-bottom: 6px; margin-top: 25px;">Dirección de Entrega y Montaje</h3>
          <p style="background-color: #fcfbfa; padding: 15px; border-radius: 4px; border-left: 4px solid #634533; margin: 10px 0; line-height: 1.5; font-size: 14px; color: #111111;">
            <strong>Dirección:</strong> ${address}<br/>
            <strong>Código Postal:</strong> ${zip}<br/>
            <strong>Localidad:</strong> ${city}<br/>
            <strong>Provincia:</strong> ${province}
          </p>

          <!-- Listado de Muebles a Entregar -->
          <h3 style="color: #634533; border-bottom: 2px solid #634533; padding-bottom: 6px; margin-top: 25px;">Artículos a Entregar</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
            <thead>
              <tr style="background-color: #fafafa; border-bottom: 1px solid #cccccc; text-align: left;">
                <th style="padding: 8px; color: #555555;">Producto</th>
                <th style="padding: 8px; text-align: center; color: #555555;">Cantidad</th>
                <th style="padding: 8px; text-align: right; color: #555555;">Precio Unit.</th>
              </tr>
            </thead>
            <tbody>
              ${cartItems
                .map(
                  (item) => `
                <tr style="border-bottom: 1px solid #eeeeee;">
                  <td style="padding: 10px 8px; font-weight: bold; color: #2c2520;">${item.name}</td>
                  <td style="padding: 10px 8px; text-align: center;">${item.quantity}</td>
                  <td style="padding: 10px 8px; text-align: right;">${item.price.toFixed(2)}€</td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>

          <div style="background-color: #fafafa; padding: 15px; text-align: right; border-radius: 4px; border: 1px solid #eeeeee;">
            <span style="font-size: 14px; color: #666666; margin-right: 15px;">Total Facturado:</span>
            <span style="font-size: 18px; font-weight: bold; color: #634533;">${total.toFixed(2)}€</span>
          </div>

          <div style="margin-top: 30px; padding: 15px; background-color: #fffbeb; border-radius: 4px; border: 1px solid #fef3c7; color: #78350f; font-size: 13px;">
            <strong>Nota de montaje:</strong> Recuerda llamar al cliente en las próximas 24 horas laborables para agendar la fecha de transporte y montaje.
          </div>
        </div>

        <div style="background-color: #f5f5f5; padding: 15px; text-align: center; color: #777777; font-size: 11px; border-top: 1px solid #dddddd;">
          Notificación generada automáticamente por el servidor de mueblescastano.com
        </div>
      </div>
    </div>
  `;

  // Enviar correo a la administración
  const adminToEmail = process.env.SMTP_TO || 'info@mueblescastano.com';
  await sendEmail({
    to: adminToEmail,
    subject: adminSubject,
    html: adminEmailHtml,
  });
}
