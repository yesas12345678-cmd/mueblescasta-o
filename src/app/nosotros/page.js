import Image from 'next/image';
import '@/styles/about.css';

export const metadata = {
  title: 'Sobre Nosotros | Muebles Castaño en Huéscar',
  description:
    'Conoce la historia de Muebles Castaño, una tienda familiar en Huéscar (Granada) con más de 40 años de trayectoria ofreciendo muebles de calidad, diseño y trato cercano.',
  keywords: [
    'historia de Muebles Castaño',
    'tienda familiar de muebles Huéscar',
    'carpintería de madera Granada',
    'muebles a medida Huéscar',
  ],
};

export default function AboutPage() {
  return (
    <>
      <div className="about-header">
        <div className="container">
          <h1>Nuestra Historia</h1>
          <p>Trayectoria, pasión y dedicación al diseño de interiores en Granada.</p>
        </div>
      </div>

      <section className="about-content">
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
              <h2>Más de 40 años amueblando hogares</h2>
              <p>
                Fundada en <strong>1985 por Antonio Castaño</strong>, nuestra tienda nació en el corazón de Huéscar con un propósito sencillo pero ambicioso: acercar muebles de calidad, confortables y duraderos a los hogares del Altiplano Granadino.
              </p>
              <p>
                Lo que comenzó como un pequeño taller de carpintería y exposición se ha convertido hoy en un referente de la venta de muebles y decoración en toda la comarca de Huéscar y Baza. Hoy en día, la segunda generación familiar continúa liderando el negocio, manteniendo intactos los valores tradicionales de honestidad, esfuerzo y compromiso con nuestra tierra.
              </p>
              <p>
                Nos enorgullecemos de ofrecer un servicio integral que no termina con la venta: asesoramos de forma personalizada a cada cliente, realizamos proyectos de distribución a medida y transportamos y montamos cada pieza directamente en tu domicilio con el máximo cuidado.
              </p>
            </div>
            <div className="about-image">
              <Image
                src="/images/about-workshop.jpg"
                alt="Taller tradicional de Muebles Castaño"
                fill
                className="product-image"
                sizes="(max-width: 992px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="values-section">
        <div className="container">
          <h2 className="text-center" style={{ fontSize: '2.2rem', marginBottom: '10px' }}>
            Nuestros Valores
          </h2>
          <p className="text-center" style={{ color: 'var(--text-muted)', marginBottom: '50px' }}>
            Los pilares que guían nuestro trabajo día tras día.
          </p>

          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <h3>Calidad Garantizada</h3>
              <p>
                Seleccionamos cuidadosamente cada fabricante y cada tipo de madera para garantizar que tus muebles soporten el paso del tiempo.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3>Trato Cercano</h3>
              <p>
                No somos una gran corporación impersonal. En Muebles Castaño te atendemos de tú a tú, con la amabilidad y confianza del comercio de toda la vida.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3>Soporte Posventa</h3>
              <p>
                Si surge cualquier inconveniente con el montaje o el transporte, estamos a tu disposición en Huéscar para resolverlo al instante, sin esperas telefónicas.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
