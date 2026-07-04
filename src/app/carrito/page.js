'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import '@/styles/cart.css';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, isLoaded } = useCart();

  if (!isLoaded) {
    return (
      <div className="cart-section container">
        <div className="text-center" style={{ padding: '80px 0' }}>
          <h2>Cargando tu carrito...</h2>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-section container">
        <div className="empty-cart">
          <h2>Tu carrito está vacío</h2>
          <p>¿Aún no has descubierto nuestros muebles exclusivos para tu hogar?</p>
          <Link href="/catalogo" className="btn btn-primary">
            Explorar Catálogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-section container">
      <h1 className="cart-title">Tu Carrito de Compra</h1>
      
      <div className="cart-grid">
        {/* Left Column - Cart Items */}
        <div className="cart-items-panel">
          <table className="cart-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th style={{ textAlign: 'center' }}>Cantidad</th>
                <th style={{ textAlign: 'right' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="cart-product-cell">
                      <div className="cart-product-img">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="product-image"
                          sizes="70px"
                        />
                      </div>
                      <div>
                        <div className="cart-product-title">{item.name}</div>
                        <button
                          className="cart-remove-btn"
                          onClick={() => removeFromCart(item.id)}
                          aria-label={`Eliminar ${item.name} del carrito`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div
                      className="quantity-selector"
                      style={{ margin: '0 auto', maxWidth: '110px' }}
                    >
                      <button
                        className="quantity-btn"
                        style={{ height: '36px', width: '32px' }}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Reducir una unidad"
                      >
                        &minus;
                      </button>
                      <span
                        className="quantity-input"
                        style={{
                          height: '36px',
                          width: '40px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        className="quantity-btn"
                        style={{ height: '36px', width: '32px' }}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Añadir una unidad"
                      >
                        &#43;
                      </button>
                    </div>
                  </td>
                  <td style={{ textAlign: 'right', fontWeight: '700', color: 'var(--primary)', fontSize: '1.1rem' }}>
                    {(item.price * item.quantity).toFixed(2)}€
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right Column - Summary */}
        <div className="cart-summary-panel">
          <h2>Resumen del Pedido</h2>
          
          <div className="summary-row">
            <span>Subtotal</span>
            <span>{cartTotal.toFixed(2)}€</span>
          </div>
          
          <div className="summary-row">
            <span>Envío y Montaje</span>
            <span style={{ color: 'var(--success)', fontWeight: '600' }}>Gratis</span>
          </div>

          <div className="summary-row" style={{ fontSize: '0.85rem' }}>
            <span>Zona de Envío</span>
            <span>Granada Provincia</span>
          </div>

          <div className="summary-row total">
            <span>Total (IVA inc.)</span>
            <span>{cartTotal.toFixed(2)}€</span>
          </div>

          <Link href="/checkout" className="btn btn-primary" style={{ width: '100%', height: '48px' }}>
            Proceder al Pago
          </Link>
          
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <Link href="/catalogo" style={{ fontSize: '0.9rem', color: 'var(--accent)', fontWeight: '600' }}>
              Seguir Comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
