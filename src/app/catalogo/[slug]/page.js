import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { productos } from '@/data/productos';
import { query } from '@/utils/db';
import ProductDetailActions from '@/components/ProductDetailActions';
import '@/styles/product-detail.css';

export async function generateStaticParams() {
  const hasDb = !!process.env.DATABASE_URL;
  if (hasDb) {
    try {
      const result = await query('SELECT slug FROM productos');
      return result.rows.map((row) => ({
        slug: row.slug,
      }));
    } catch (e) {
      console.error('Error al generar parámetros estáticos de productos:', e);
    }
  }
  return productos.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  let product;
  const hasDb = !!process.env.DATABASE_URL;
  
  if (hasDb) {
    try {
      const result = await query('SELECT * FROM productos WHERE slug = $1', [slug]);
      if (result.rows.length > 0) {
        const row = result.rows[0];
        product = {
          id: row.id,
          name: row.name,
          slug: row.slug,
          description: row.description,
          price: parseFloat(row.price),
          category: row.category,
          image: row.image,
          features: Array.isArray(row.features) ? row.features : [],
          dimensions: row.dimensions,
          stock: parseInt(row.stock, 10),
        };
      }
    } catch (e) {
      console.error('Error al obtener metadatos de producto desde BD:', e);
    }
  }
  
  if (!product) {
    product = productos.find((p) => p.slug === slug);
  }

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
  let product;
  const hasDb = !!process.env.DATABASE_URL;
  
  if (hasDb) {
    try {
      const result = await query('SELECT * FROM productos WHERE slug = $1', [slug]);
      if (result.rows.length > 0) {
        const row = result.rows[0];
        product = {
          id: row.id,
          name: row.name,
          slug: row.slug,
          description: row.description,
          price: parseFloat(row.price),
          category: row.category,
          image: row.image,
          features: Array.isArray(row.features) ? row.features : [],
          dimensions: row.dimensions,
          stock: parseInt(row.stock, 10),
        };
      }
    } catch (e) {
      console.error('Error al obtener el producto en detalle desde BD:', e);
    }
  }
  
  if (!product) {
    product = productos.find((p) => p.slug === slug);
  }

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
      'priceValidUntil': '2027-12-31',
      'validFrom': '2026-01-01T00:00:00Z',
      'hasMerchantReturnPolicy': {
        '@type': 'MerchantReturnPolicy',
        'applicableCountry': 'ES',
        'returnPolicyCategory': 'https://schema.org/MerchantReturnFiniteReturnWindow',
        'merchantReturnDays': 14,
        'returnMethod': 'https://schema.org/ReturnByMail',
        'returnFees': 'https://schema.org/ReturnFeesCustomerPaying'
      },
      'shippingDetails': {
        '@type': 'OfferShippingDetails',
        'shippingDestination': {
          '@type': 'DefinedRegion',
          'addressCountry': 'ES'
        },
        'shippingRate': {
          '@type': 'MonetaryAmount',
          'value': 0,
          'currency': 'EUR'
        },
        'deliveryTime': {
          '@type': 'ShippingDeliveryTime',
          'handlingTime': {
            '@type': 'QuantitativeValue',
            'minValue': 1,
            'maxValue': 3,
            'unitCode': 'DAY'
          },
          'transitTime': {
            '@type': 'QuantitativeValue',
            'minValue': 3,
            'maxValue': 7,
            'unitCode': 'DAY'
          }
        }
      }
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
