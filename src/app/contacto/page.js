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
          <div className="map-container" style={{ marginBottom: '16px' }}>
            <iframe
              src="https://maps.google.com/maps?q=Muebles%20Casta%C3%B1o,%20Calle%20Mayor%2015,%2018830%20Hu%C3%A9scar,%20Granada&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: 'var(--border-radius-md)' }}
              allowFullScreen=""
              loading="lazy"
              title="Ubicación de Muebles Castaño en Google Maps"
            ></iframe>
          </div>
          
          <div className="map-actions" style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '40px' }}>
            <a 
              href="https://maps.google.com/?q=Muebles+Castaño,+Calle+Mayor+15,+Huéscar,+Granada" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', fontSize: '0.9rem' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"></path><path d="M10 14 21 3"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg>
              Ampliar Mapa
            </a>
            <a 
              href="https://www.google.com/maps/dir/?api=1&destination=Muebles+Castaño,+Calle+Mayor+15,+Huéscar,+Granada" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', fontSize: '0.9rem', backgroundColor: 'var(--accent)', color: 'white' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
              Cómo Llegar
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
