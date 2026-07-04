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

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Muebles Exclusivos y Decoración en Huéscar</h1>
            <p>
              En Muebles Castaño creamos espacios únicos para tu hogar. Calidad artesanal, diseños contemporáneos y transporte gratuito en toda la provincia de Granada.
            </p>
            <div className="hero-ctas">
              <Link href="/catalogo" className="btn btn-primary">
                Ver Catálogo
              </Link>
              <Link href="/contacto" className="btn btn-secondary" style={{ borderColor: 'white', color: 'white' }}>
                Visítanos
              </Link>
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
