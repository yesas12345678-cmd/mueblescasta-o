import Link from 'next/link';
import Image from 'next/image';
import { productos } from '@/data/productos';
import ProductCard from '@/components/ProductCard';
import '@/styles/home.css';

export default function Home() {
  const featured = productos.slice(0, 3);

  // LocalBusiness Schema Markup
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    'name': 'Muebles Castaño',
    'image': 'https://mueblescastano.com/images/sofa-huescar.jpg',
    '@id': 'https://mueblescastano.com/#store',
    'url': 'https://mueblescastano.com',
    'telephone': '+34958740123',
    'priceRange': '$$',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Calle Mayor, 15',
      'addressLocality': 'Huéscar',
      'addressRegion': 'Granada',
      'postalCode': '18830',
      'addressCountry': 'ES'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 37.8105,
      'longitude': -2.5401
    },
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday'
        ],
        'opens': '09:30',
        'closes': '13:30'
      },
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday'
        ],
        'opens': '17:00',
        'closes': '20:30'
      },
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': 'Saturday',
        'opens': '10:00',
        'closes': '14:00'
      }
    ],
    'sameAs': [
      'https://www.facebook.com/mueblescastano',
      'https://www.instagram.com/mueblescastano'
    ]
  };

  return (
    <>
      {/* Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section Premium */}
      <section className="hero">
        {/* Imagen de Fondo Adaptada */}
        <div className="hero-background-wrapper">
          <Image
            src="/images/hero-bg.jpg"
            alt="Ambiente de salón premium de Muebles Castaño"
            fill
            priority
            className="hero-bg-img"
            sizes="100vw"
          />
          <div className="hero-overlay"></div>
        </div>

        <div className="container hero-container">
          <div className="hero-content">
            <span className="hero-subtitle animated-fade-in">DISEÑO QUE TRANSFORMA</span>
            <h1 className="hero-title animated-slide-up">
              Muebles <br/><span className="highlight">Castaño</span>
            </h1>
            <p className="hero-desc animated-fade-in-delay">
              Calidad, diseño y funcionalidad para <br />
              crear espacios que reflejan tu estilo.
            </p>
            <div className="hero-actions animated-slide-up-delay">
              <Link href="/catalogo" className="btn btn-primary hero-btn">
                DESCUBRIR COLECCIONES <span className="arrow">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Barra de Características Inferior Translúcida */}
        <div className="hero-feature-bar">
          <div className="container feature-bar-container">
            {/* Envío gratuito */}
            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <svg className="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="15" height="13" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              </div>
              <div className="feature-text">
                <span className="feature-title">ENVÍO GRATUITO</span>
                <span className="feature-desc">A toda España</span>
              </div>
            </div>

            {/* Calidad Garantizada */}
            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <svg className="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 11 2 2 4-4" />
                </svg>
              </div>
              <div className="feature-text">
                <span className="feature-title">CALIDAD GARANTIZADA</span>
                <span className="feature-desc">Materiales de primera</span>
              </div>
            </div>

            {/* Diseños Exclusivos */}
            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <svg className="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                </svg>
              </div>
              <div className="feature-text">
                <span className="feature-title">DISEÑOS EXCLUSIVOS</span>
                <span className="feature-desc">Colecciones únicas</span>
              </div>
            </div>

            {/* Atención Personalizada */}
            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <svg className="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                  <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                </svg>
              </div>
              <div className="feature-text">
                <span className="feature-title">ATENCIÓN PERSONALIZADA</span>
                <span className="feature-desc">Te asesoramos</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Local Section */}
      <section className="seo-intro section-padding">
        <div className="container">
          <div className="seo-grid">
            <div className="seo-text">
              <span className="section-subtitle">Tu tienda de confianza</span>
              <h2>Comprar Muebles en Huéscar y Granada</h2>
              <p>
                ¿Buscas renovar tu salón, comprar un colchón cómodo o amueblar tu dormitorio en el Altiplano Granadino? En <strong>Muebles Castaño</strong> te ayudamos a encontrar los mejores muebles adaptados a tu espacio y presupuesto.
              </p>
              <p>
                Ofrecemos un servicio cercano y profesional en <strong>Huéscar (Granada)</strong>, extendiendo nuestros envíos y montajes a localidades vecinas como Orce, Galera, Castilléjar, Puebla de Don Fadrique y Baza. Apostamos por la calidad de nuestros materiales y la satisfacción de nuestros clientes.
              </p>
              <div className="seo-features">
                <div className="seo-feature-card">
                  <h3>Montaje Profesional</h3>
                  <p>Llevamos y montamos tus muebles en tu domicilio sin complicaciones.</p>
                </div>
                <div className="seo-feature-card">
                  <h3>Asesoramiento</h3>
                  <p>Te ayudamos a elegir el diseño que mejor encaje en tu hogar.</p>
                </div>
                <div className="seo-feature-card">
                  <h3>Garantía Local</h3>
                  <p>Soporte posventa directo y cercano para cualquier incidencia.</p>
                </div>
                <div className="seo-feature-card">
                  <h3>Calidad / Precio</h3>
                  <p>Muebles de alta durabilidad con precios adaptados a ti.</p>
                </div>
              </div>
            </div>
            <div className="seo-image-container">
              <Image
                src="/images/seo-store.jpg"
                alt="Tienda de Muebles Castaño en Huéscar"
                fill
                className="product-image"
                sizes="(max-width: 992px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products section-padding">
        <div className="container">
          <div className="section-title-wrapper">
            <div>
              <span className="section-subtitle">Exclusividad</span>
              <h2 className="section-title">Nuestros Destacados</h2>
            </div>
            <Link href="/catalogo" className="btn btn-secondary">
              Ver todo el catálogo
            </Link>
          </div>

          <div className="product-grid">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Local SEO CTA */}
      <section className="cta-banner">
        <div className="container cta-banner-content">
          <h2>¿Quieres ver nuestros muebles en persona?</h2>
          <p>
            Visítanos en nuestra tienda física en Calle Mayor, 15, Huéscar (Granada). Estaremos encantados de atenderte y mostrarte las últimas tendencias en sofás, comedores y colchones.
          </p>
          <Link href="/contacto" className="btn btn-primary" style={{ backgroundColor: '#ffffff', color: 'var(--primary)' }}>
            Cómo llegar y Contacto
          </Link>
        </div>
      </section>
    </>
  );
}
