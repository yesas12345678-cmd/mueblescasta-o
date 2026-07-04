'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <article className="product-card">
      <div className="product-image-container">
        {product.stock <= 2 && (
          <span className="product-badge">Últimas unidades</span>
        )}
        <Link href={`/catalogo/${product.slug}`} style={{ display: 'block', height: '100%' }}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="product-image"
            priority={product.id === 'prod_1'}
          />
        </Link>
      </div>

      <div className="product-content">
        <span className="product-category">{product.category}</span>
        <h3 className="product-title">
          <Link href={`/catalogo/${product.slug}`}>{product.name}</Link>
        </h3>
        
        <div className="product-price-row">
          <span className="product-price">{product.price.toFixed(2)}€</span>
          <button
            className="add-to-cart-btn"
            onClick={() => addToCart(product, 1)}
            aria-label={`Añadir ${product.name} al carrito`}
            title="Añadir al carrito"
          >
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
              <line x1="12" x2="12" y1="5" y2="19" />
              <line x1="5" x2="19" y1="12" y2="12" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}
