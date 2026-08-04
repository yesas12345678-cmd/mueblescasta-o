import '@/styles/legal.css';

export const metadata = {
  title: 'Política de Cookies | Muebles Castaño',
  description: 'Conoce el uso y configuración de cookies en el sitio web de Muebles Castaño.',
};

export default function CookiePolicyPage() {
  return (
    <>
      <div className="legal-header">
        <div className="container">
          <h1>Política de Cookies</h1>
          <p>Detalle sobre el almacenamiento y gestión de cookies en tu navegador.</p>
        </div>
      </div>

      <div className="container">
        <div className="legal-content">
          <div className="legal-card">
            <h2>1. ¿Qué es una Cookie?</h2>
            <p>
              Una cookie es un pequeño archivo de texto que un sitio web almacena en el navegador del usuario. Las cookies facilitan el uso y la navegación por una página web y son esenciales para el funcionamiento de internet, aportando innumerables ventajas en la prestación de servicios interactivos.
            </p>

            <h2>2. Cookies Utilizadas en este Sitio Web</h2>
            <p>
              Muebles Castaño utiliza únicamente cookies esenciales para el correcto funcionamiento del portal, respetando al máximo la privacidad de sus visitantes:
            </p>
            <ul>
              <li><strong>Cookies de sesión y técnicas:</strong> Necesarias para recordar el estado de tu carrito de la compra e identificar tus peticiones mientras navegas y compras en la web. Sin ellas, no se podría procesar un pedido.</li>
              <li><strong>Cookie de consentimiento:</strong> Almacena tu elección sobre el uso de cookies en esta web (`cookies-consent`) para no mostrarte el banner de aviso de forma reiterada.</li>
            </ul>

            <h2>3. Desactivación o Eliminación de Cookies</h2>
            <p>
              El usuario puede en cualquier momento permitir, bloquear o eliminar las cookies instaladas en su equipo mediante la configuración de las opciones del navegador que utilice:
            </p>
            <ul>
              <li><strong>Google Chrome:</strong> Configuración &gt; Privacidad y seguridad &gt; Cookies y otros datos de sitios.</li>
              <li><strong>Mozilla Firefox:</strong> Ajustes &gt; Privacidad &amp; Seguridad &gt; Cookies y datos del sitio.</li>
              <li><strong>Safari:</strong> Preferencias &gt; Privacidad &gt; Cookies y datos de sitios web.</li>
              <li><strong>Microsoft Edge:</strong> Configuración &gt; Cookies y permisos del sitio.</li>
            </ul>
            <p>
              Tenga en cuenta que si desactiva por completo las cookies técnicas de este sitio, algunas funcionalidades (como añadir productos al carrito o procesar el pago) podrían no estar operativas o presentar errores de sesión.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
