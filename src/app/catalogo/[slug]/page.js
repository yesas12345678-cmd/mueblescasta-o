import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { productos } from '@/data/productos';
import ProductDetailActions from '@/components/ProductDetailActions';
import '@/styles/product-detail.css';

export async function generateStaticParams() {
  return productos.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = productos.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: 'Producto No Encontrado | Muebles Castaño',
    };
  }

  return {
    title: `${product.name} | Muebles Castaño Huéscar`,
    description: `${product.description.slice(0, 150)}...`,
    keywords: [
      product.name,
      `${product.name} Huéscar`,
      `${product.category} Huéscar`,
      'muebles a medida',
    ],
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = productos.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Product JSON-LD Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': product.name,
    'image': `https://mueblescastano.com${product.image}`,
    'description': product.description,
    'sku': product.id,
    'brand': {
      '@type': 'Brand',
      'name': 'Muebles Castaño'
    },
    'offers': {
      '@type': 'Offer',
      'url': `https://mueblescastano.com/catalogo/${product.slug}`,
      'priceCurrency': 'EUR',
      'price': product.price.toFixed(2),
      'availability': product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      'priceValidUntil': '2027-12-31'
    }
  };

  return (
    <>
      {/* Product Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="detail-container">
        <div className="container">
          <Link href="/catalogo" className="back-link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" x2="5" y1="12" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Volver al Catálogo
          </Link>

          <div className="detail-grid">
            {/* Left - Image */}
            <div className="detail-image-wrapper">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                className="product-image"
                sizes="(max-width: 992px) 100vw, 50vw"
              />
            </div>

            {/* Right - Product Info */}
            <div className="detail-content">
              <span className="detail-category">{product.category}</span>
              <h1 className="detail-title">{product.name}</h1>
              <div className="detail-price">{product.price.toFixed(2)}€</div>
              
              <p className="detail-desc">{product.description}</p>

              <div className="detail-meta">
                <div className="detail-meta-item">
                  <span className="detail-meta-label">Dimensiones:</span>
                  <span className="detail-meta-value">{product.dimensions}</span>
                </div>
                <div className="detail-meta-item">
                  <span className="detail-meta-label">Disponibilidad:</span>
                  <span
                    className="detail-meta-value"
                    style={{ color: product.stock > 0 ? 'var(--success)' : 'var(--error)', fontWeight: '600' }}
                  >
                    {product.stock > 0 ? `En Stock (${product.stock} u.)` : 'Agotado'}
                  </span>
                </div>
              </div>

              {/* Features List */}
              <ul className="features-list">
                {product.features.map((feat, index) => (
                  <li key={index}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {feat}
                  </li>
                ))}
              </ul>

              {/* Action Rows */}
              {product.stock > 0 ? (
                <ProductDetailActions product={product} />
              ) : (
                <button className="btn btn-secondary" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                  Agotado Temporalmente
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
