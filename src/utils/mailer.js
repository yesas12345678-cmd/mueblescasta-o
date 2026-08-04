import nodemailer from 'nodemailer';

/**
 * Envía un correo electrónico.
 * Si las variables SMTP no están configuradas y estamos en desarrollo,
 * simula el envío imprimiendo el correo en la consola.
 * 
 * @param {Object} options Opciones de envío
 * @param {string} options.to Destinatario del correo
 * @param {string} options.subject Asunto del correo
 * @param {string} options.html Cuerpo del mensaje en formato HTML
 * @returns {Promise<boolean>} Retorna true si se envió o simuló con éxito
 */
export async function sendEmail({ to, subject, html }) {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  const from = process.env.SMTP_FROM || '"Muebles Castaño" <no-reply@mueblescastano.com>';

  const isConfigured = host && port && user && pass;

  if (!isConfigured) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('============= SIMULACIÓN DE EMAIL (DESARROLLO) =============');
      console.log(`De: ${from}`);
      console.log(`Para: ${to}`);
      console.log(`Asunto: ${subject}`);
      console.log('Cuerpo (HTML):');
      console.log(html);
      console.log('===========================================================');
      return true;
    }
    
    console.error('ERROR SEGURIDAD: Credenciales SMTP no configuradas en producción.');
    throw new Error('Servicio de correo electrónico no disponible.');
  }

  // Inicializar nodemailer
  const transporter = nodemailer.createTransport({
    host,
    port: parseInt(port, 10),
    secure: parseInt(port, 10) === 465, // true para puerto 465, false para otros (587)
    auth: {
      user,
      pass,
    },
    // Algunos servidores SMTP compartidos requieren desactivar la validación estricta de TLS en desarrollo
    tls: {
      rejectUnauthorized: process.env.NODE_ENV === 'production',
    },
  });

  try {
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      html,
    });

    if (process.env.NODE_ENV !== 'production') {
      console.log('Correo enviado con éxito:', info.messageId);
    }
    return true;
  } catch (error) {
    console.error('Error al enviar correo electrónico:', error);
    throw error;
  }
}
