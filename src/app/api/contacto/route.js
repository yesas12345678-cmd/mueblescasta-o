import { NextResponse } from 'next/server';
import { sendEmail } from '@/utils/mailer';
import { rateLimit } from '@/utils/rateLimit';

export async function POST(request) {
  try {
    // 1. APLICAR RATE LIMITING (Límite de 3 peticiones por minuto por IP para evitar spam)
    const forwardedFor = request.headers.get('x-forwarded-for');
    const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';

    if (!rateLimit(clientIp, 3, 60000)) {
      return NextResponse.json(
        { error: 'Demasiados mensajes enviados. Por favor, espera un minuto.' },
        { status: 429 }
      );
    }

    const { name, email, phone, message } = await request.json();

    // 2. VALIDACIÓN RIGUROSA DE ENTRADA
    if (!name || typeof name !== 'string' || name.trim().length < 3 || name.length > 100) {
      return NextResponse.json({ error: 'El nombre debe tener entre 3 y 100 caracteres.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email) || email.length > 150) {
      return NextResponse.json({ error: 'La dirección de correo electrónico no es válida.' }, { status: 400 });
    }

    if (phone) {
      const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/;
      if (!phoneRegex.test(phone) || phone.length < 9 || phone.length > 20) {
        return NextResponse.json({ error: 'El número de teléfono no es válido.' }, { status: 400 });
      }
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10 || message.length > 3000) {
      return NextResponse.json({ error: 'El mensaje debe tener entre 10 y 3000 caracteres.' }, { status: 400 });
    }

    // 3. ENVIAR EMAIL DE NOTIFICACIÓN A LA ADMINISTRACIÓN
    const adminEmail = process.env.SMTP_TO || 'info@mueblescastano.com';
    const emailSubject = `Nuevo mensaje de contacto web: ${name}`;

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #634533; border-bottom: 2px solid #634533; padding-bottom: 10px;">Nuevo Mensaje de Contacto</h2>
        <p style="font-size: 16px; color: #333;">Has recibido una nueva consulta a través del formulario de la web de Muebles Castaño.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; width: 150px; color: #555;">Nombre:</td>
            <td style="padding: 8px 0; color: #333;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
            <td style="padding: 8px 0; color: #333;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555;">Teléfono:</td>
            <td style="padding: 8px 0; color: #333;">${phone ? phone : 'No facilitado'}</td>
          </tr>
        </table>
        
        <div style="background-color: #f9f6f4; padding: 15px; border-left: 4px solid #634533; border-radius: 4px; margin-top: 15px;">
          <h4 style="margin-top: 0; color: #634533; margin-bottom: 8px;">Mensaje del cliente:</h4>
          <p style="margin: 0; color: #444; line-height: 1.5; white-space: pre-wrap;">${message}</p>
        </div>
        
        <div style="margin-top: 30px; font-size: 12px; color: #888; text-align: center; border-top: 1px solid #e0e0e0; padding-top: 15px;">
          Este correo fue enviado de forma automática desde el formulario de contacto de mueblescastano.com.
        </div>
      </div>
    `;

    await sendEmail({
      to: adminEmail,
      subject: emailSubject,
      html: emailHtml,
    });

    return NextResponse.json({ success: true, message: 'Mensaje enviado correctamente' });
  } catch (error) {
    console.error('Error en API de contacto:', error);
    return NextResponse.json(
      { error: 'Ocurrió un error al enviar tu mensaje. Por favor, inténtelo de nuevo.' },
      { status: 500 }
    );
  }
}
