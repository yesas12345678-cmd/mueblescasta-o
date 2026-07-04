import ContactForm from '@/components/ContactForm';
import '@/styles/contact.css';

export const metadata = {
  title: 'Contacto y Dónde Estamos | Muebles Castaño Huéscar',
  description:
    'Encuentra Muebles Castaño en Calle Mayor 15, Huéscar (Granada). Llámanos al +34 958 74 01 23 o mándanos un mensaje. Envío gratis en la comarca.',
  keywords: [
    'dirección Muebles Castaño',
    'contacto Muebles Castaño',
    'cómo llegar Muebles Castaño',
    'teléfono muebles Huéscar',
  ],
};

export default function ContactPage() {
  return (
    <>
      <div className="contact-header">
        <div className="container">
          <h1>Contacto y Ubicación</h1>
          <p>Estamos a tu servicio. Ven a visitarnos o ponte en contacto con nosotros.</p>
        </div>
      </div>

      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            {/* Left - Contact info */}
            <div className="contact-info-panel">
              <h2>Información de Contacto</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
                Estaremos encantados de resolver tus dudas o asesorarte sobre el mobiliario ideal para tu casa.
              </p>

              <div className="contact-item">
                <h3>Nuestra Tienda</h3>
                <p>Calle Mayor, 15, 18830 Huéscar, Granada (España)</p>
              </div>

              <div className="contact-item">
                <h3>Teléfono Directo</h3>
                <p>
                  <a href="tel:+34958740123" style={{ color: 'var(--accent)', fontWeight: '600' }}>
                    +34 958 74 01 23
                  </a>
                </p>
              </div>

              <div className="contact-item">
                <h3>Correo Electrónico</h3>
                <p>
                  <a href="mailto:info@mueblescastano.com" style={{ color: 'var(--accent)' }}>
                    info@mueblescastano.com
                  </a>
                </p>
              </div>

              <div className="contact-item">
                <h3>Horario Comercial</h3>
                <p>
                  <strong>Lunes a Viernes:</strong> 09:30 - 13:30 | 17:00 - 20:30
                  <br />
                  <strong>Sábados:</strong> 10:00 - 14:00
                  <br />
                  <strong>Domingos:</strong> Cerrado
                </p>
              </div>
            </div>

            {/* Right - Contact form */}
            <ContactForm />
          </div>

          {/* Interactive Map */}
          <h2 style={{ fontSize: '2rem', marginBottom: '24px', textAlign: 'center' }}>¿Cómo llegar?</h2>
          <div className="map-container">
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=-2.5447%2C37.8080%2C-2.5355%2C37.8130&layer=mapnik&marker=37.8105%2C-2.5401"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Ubicación de Muebles Castaño en Huéscar"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
}
