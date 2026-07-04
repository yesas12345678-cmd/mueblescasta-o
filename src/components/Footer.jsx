import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-info">
            <div style={{ marginBottom: '16px' }}>
              <Image
                src="/images/logo.png"
                alt="Logo Muebles Castaño"
                width={130}
                height={40}
                style={{ filter: 'brightness(0) invert(1)', objectFit: 'contain', display: 'block' }}
              />
            </div>
            <p>
              Tu tienda de confianza de muebles y decoración en Huéscar (Granada). Diseños de alta calidad, atención personalizada y transporte propio en toda la provincia.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              {/* Social icons could go here */}
            </div>
          </div>

          <div className="footer-links">
            <h4>Secciones</h4>
            <ul>
              <li>
                <Link href="/">Inicio</Link>
              </li>
              <li>
                <Link href="/catalogo">Catálogo de Muebles</Link>
              </li>
              <li>
                <Link href="/nosotros">Sobre Muebles Castaño</Link>
              </li>
              <li>
                <Link href="/contacto">Dónde Estamos</Link>
              </li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Contacto Local</h4>
            <p>
              <strong>Dirección:</strong>
              <br />
              Calle Mayor, 15, 18830 Huéscar, Granada, España
            </p>
            <p>
              <strong>Teléfono:</strong>
              <br />
              <a href="tel:+34958740123" style={{ color: '#a69b93' }}>+34 958 74 01 23</a>
            </p>
            <p>
              <strong>Email:</strong>
              <br />
              <a href="mailto:info@mueblescastano.com" style={{ color: '#a69b93' }}>info@mueblescastano.com</a>
            </p>
          </div>

          <div className="footer-hours">
            <h4>Horarios</h4>
            <p>
              <strong>Lunes a Viernes:</strong>
              <br />
              09:30 - 13:30 | 17:00 - 20:30
            </p>
            <p>
              <strong>Sábados:</strong>
              <br />
              10:00 - 14:00
            </p>
            <p>
              <strong>Domingos:</strong>
              <br />
              Cerrado
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Muebles Castaño. Todos los derechos reservados.</p>
          <p>
            Diseñado para el mejor posicionamiento SEO en Huéscar y el Altiplano de Granada.
          </p>
        </div>
      </div>
    </footer>
  );
}
