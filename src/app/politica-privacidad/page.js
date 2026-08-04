import '@/styles/legal.css';

export const metadata = {
  title: 'Política de Privacidad | Muebles Castaño',
  description: 'Conoce cómo tratamos y protegemos tus datos de carácter personal en Muebles Castaño.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <div className="legal-header">
        <div className="container">
          <h1>Política de Privacidad</h1>
          <p>Cumplimiento del RGPD y protección de tus datos personales.</p>
        </div>
      </div>

      <div className="container">
        <div className="legal-content">
          <div className="legal-card">
            <h2>1. Responsable del Tratamiento de Datos</h2>
            <p>
              El responsable de los datos recopilados en esta web es <strong>Muebles Castaño S.L.</strong>, con domicilio en Calle Mayor, 15, 18830 Huéscar, Granada, España, y NIF B-12345678, correo electrónico de contacto: <a href="mailto:info@mueblescastano.com" style={{ color: 'var(--accent)', fontWeight: '600' }}>info@mueblescastano.com</a>.
            </p>

            <h2>2. Finalidad del Tratamiento de los Datos</h2>
            <p>
              En Muebles Castaño tratamos la información que nos facilitan las personas interesadas con el fin de:
            </p>
            <ul>
              <li>Gestionar el envío de los productos comprados a través de nuestro sitio web.</li>
              <li>Tramitar la facturación y el cobro de los pedidos realizados.</li>
              <li>Atender las solicitudes de información, dudas y consultas recibidas a través de nuestro formulario de contacto.</li>
              <li>Prevenir fraudes e incidentes de seguridad informática en nuestra pasarela de pagos.</li>
            </ul>

            <h2>3. Legitimación para el Tratamiento</h2>
            <p>
              La base legal para el tratamiento de sus datos es:
            </p>
            <ul>
              <li><strong>La ejecución de un contrato:</strong> Para gestionar las compras, envíos y facturación de sus pedidos.</li>
              <li><strong>El consentimiento del interesado:</strong> Para responder a sus consultas formuladas a través del formulario de contacto o para aceptar las cookies de rastreo opcionales.</li>
              <li><strong>Interés legítimo:</strong> Para asegurar la infraestructura tecnológica del sitio web y evitar accesos no autorizados.</li>
            </ul>

            <h2>4. Plazo de Conservación de los Datos</h2>
            <p>
              Los datos personales proporcionados se conservarán durante el tiempo necesario para cumplir con la finalidad para la que se recopilaron y para determinar las posibles responsabilidades que se pudieran derivar de dicha finalidad y del tratamiento de los datos (por ejemplo, obligaciones contables y tributarias estatales).
            </p>

            <h2>5. Destinatarios a los que se Comunicarán los Datos</h2>
            <p>
              Los datos no se cederán a terceros ajenos a Muebles Castaño salvo en los siguientes supuestos necesarios:
            </p>
            <ul>
              <li>Entidades financieras y pasarelas de pago homologadas (Stripe) para la tramitación segura de los pagos correspondientes.</li>
              <li>Empresas de transporte y montaje para poder entregar el pedido en tu domicilio.</li>
              <li>Organismos públicos oficiales y autoridades judiciales en cumplimiento de obligaciones legales de carácter fiscal o penal.</li>
            </ul>

            <h2>6. Derechos de los Usuarios</h2>
            <p>
              Cualquier persona tiene derecho a obtener confirmación sobre si en Muebles Castaño estamos tratando sus datos personales. Las personas interesadas tienen derecho a:
            </p>
            <ul>
              <li>Acceder a sus datos personales.</li>
              <li>Solicitar la rectificación de los datos inexactos.</li>
              <li>Solicitar su supresión (&quot;derecho al olvido&quot;) cuando, entre otros motivos, los datos ya no sean necesarios para los fines que fueron recogidos.</li>
              <li>Solicitar la limitación de su tratamiento, en cuyo caso únicamente los conservaremos para el ejercicio o la defensa de reclamaciones.</li>
              <li>Oponerse al tratamiento de sus datos.</li>
            </ul>
            <p>
              Para ejercitar estos derechos, puede enviar una comunicación por escrito adjuntando fotocopia de su DNI o documento equivalente a nuestro correo electrónico: <a href="mailto:info@mueblescastano.com" style={{ color: 'var(--accent)', fontWeight: '600' }}>info@mueblescastano.com</a>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
