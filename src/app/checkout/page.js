'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import '@/styles/checkout.css';

export default function CheckoutPage() {
  const { cartItems, cartTotal, isLoaded } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: 'Huéscar',
    province: 'Granada',
    zip: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isLoaded) {
    return (
      <div className="checkout-section container">
        <div className="text-center" style={{ padding: '80px 0' }}>
          <h2>Cargando formulario...</h2>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="checkout-section container">
        <div className="checkout-status-card" style={{ margin: '40px auto' }}>
          <h2>Tu carrito está vacío</h2>
          <p>Debes añadir productos al carrito antes de proceder al pago.</p>
          <Link href="/catalogo" className="btn btn-primary">
            Ir al Catálogo
          </Link>
        </div>
      </div>
    );
  }

  const handlePay = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartItems,
          customerInfo: formData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ocurrió un error al iniciar el pago');
      }

      // Redirigimos al usuario a la URL de pago de Stripe (o la simulada si no hay API key)
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No se recibió la URL de redirección de pago');
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="checkout-section container">
      <div className="checkout-grid">
        {/* Left Column - Billing and Shipping */}
        <form className="checkout-form-panel" onSubmit={handlePay}>
          <h2>Datos de Entrega y Facturación</h2>
          
          {error && (
            <div
              style={{
                backgroundColor: 'rgba(168, 66, 66, 0.1)',
                border: '1px solid var(--error)',
                color: 'var(--error)',
                padding: '16px',
                borderRadius: 'var(--border-radius-sm)',
                marginBottom: '20px',
                fontSize: '0.95rem',
              }}
            >
              {error}
            </div>
          )}

          <div className="form-group">
            <label className="form-label" htmlFor="chk-name">
              Nombre y Apellidos *
            </label>
            <input
              className="form-input"
              type="text"
              id="chk-name"
              required
              placeholder="Ej. Juan Pérez Gómez"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label className="form-label" htmlFor="chk-email">
                Correo Electrónico *
              </label>
              <input
                className="form-input"
                type="email"
                id="chk-email"
                required
                placeholder="juan@correo.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label className="form-label" htmlFor="chk-phone">
                Teléfono de Contacto *
              </label>
              <input
                className="form-input"
                type="tel"
                id="chk-phone"
                required
                placeholder="600123456"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="chk-address">
              Dirección de Envío *
            </label>
            <input
              className="form-input"
              type="text"
              id="chk-address"
              required
              placeholder="Calle, número, piso y puerta"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
            <div>
              <label className="form-label" htmlFor="chk-zip">
                Código Postal *
              </label>
              <input
                className="form-input"
                type="text"
                id="chk-zip"
                required
                placeholder="18830"
                value={formData.zip}
                onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
              />
            </div>
            <div>
              <label className="form-label" htmlFor="chk-city">
                Localidad *
              </label>
              <input
                className="form-input"
                type="text"
                id="chk-city"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>
            <div>
              <label className="form-label" htmlFor="chk-province">
                Provincia *
              </label>
              <input
                className="form-input"
                type="text"
                id="chk-province"
                required
                value={formData.province}
                onChange={(e) => setFormData({ ...formData, province: e.target.value })}
              />
            </div>
          </div>

          <div style={{ marginTop: '30px' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              * Al hacer clic en el botón de pago, serás redirigido a la pasarela de pago oficial y segura de Stripe para completar la transacción.
            </p>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={loading}
              style={{ width: '100%', height: '50px', fontSize: '1.05rem' }}
            >
              {loading ? 'Redirigiendo a Pasarela Segura...' : `Pagar ${cartTotal.toFixed(2)}€`}
            </button>
          </div>
        </form>

        {/* Right Column - Summary */}
        <div className="checkout-summary-panel">
          <h2>Tu Pedido</h2>
          
          <div style={{ marginBottom: '20px' }}>
            {cartItems.map((item) => (
              <div key={item.id} className="checkout-item-row">
                <div>
                  <span className="checkout-item-name">{item.name}</span>
                  <span className="checkout-item-qty">x{item.quantity}</span>
                </div>
                <span className="checkout-item-price">{(item.price * item.quantity).toFixed(2)}€</span>
              </div>
            ))}
          </div>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>{cartTotal.toFixed(2)}€</span>
          </div>
          
          <div className="summary-row">
            <span>Transporte y Montaje</span>
            <span style={{ color: 'var(--success)', fontWeight: '600' }}>Gratis</span>
          </div>

          <div className="summary-row total" style={{ marginBottom: 0 }}>
            <span>Total</span>
            <span>{cartTotal.toFixed(2)}€</span>
          </div>
        </div>
      </div>
    </div>
  );
}
