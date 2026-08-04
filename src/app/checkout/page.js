'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import '@/styles/checkout.css';

const COUNTRIES_PREFIXES = [
  { code: '+34', flag: '🇪🇸', name: 'España' },
  { code: '+351', flag: '🇵🇹', name: 'Portugal' },
  { code: '+33', flag: '🇫🇷', name: 'Francia' },
  { code: '+44', flag: '🇬🇧', name: 'Reino Unido' },
  { code: '+49', flag: '🇩🇪', name: 'Alemania' },
  { code: '+39', flag: '🇮🇹', name: 'Italia' },
  { code: '+376', flag: '🇦🇩', name: 'Andorra' },
  { code: '+212', flag: '🇲🇦', name: 'Marruecos' },
  { code: '+54', flag: '🇦🇷', name: 'Argentina' },
  { code: '+57', flag: '🇨🇴', name: 'Colombia' },
  { code: '+52', flag: '🇲🇽', name: 'México' },
  { code: '+1', flag: '🇺🇸', name: 'Estados Unidos' },
  { code: '+40', flag: '🇷🇴', name: 'Rumanía' },
  { code: '+359', flag: '🇧🇬', name: 'Bulgaria' },
  { code: '+48', flag: '🇵🇱', name: 'Polonia' },
  { code: '+31', flag: '🇳🇱', name: 'Países Bajos' },
  { code: '+32', flag: '🇧🇪', name: 'Bélgica' },
  { code: '+41', flag: '🇨🇭', name: 'Suiza' },
];

const PROVINCIA_CP_MAP = {
  '01': 'Álava', '02': 'Albacete', '03': 'Alicante', '04': 'Almería', '05': 'Ávila',
  '06': 'Badajoz', '07': 'Baleares', '08': 'Barcelona', '09': 'Burgos', '10': 'Cáceres',
  '11': 'Cádiz', '12': 'Castellón', '13': 'Ciudad Real', '14': 'Córdoba', '15': 'La Coruña',
  '16': 'Cuenca', '17': 'Gerona', '18': 'Granada', '19': 'Guadalajara', '20': 'Guipúzcoa',
  '21': 'Huelva', '22': 'Huesca', '23': 'Jaén', '24': 'León', '25': 'Lérida',
  '26': 'La Rioja', '27': 'Lugo', '28': 'Madrid', '29': 'Málaga', '30': 'Murcia',
  '31': 'Navarra', '32': 'Orense', '33': 'Asturias', '34': 'Palencia', '35': 'Las Palmas',
  '36': 'Pontevedra', '37': 'Salamanca', '38': 'Santa Cruz de Tenerife', '39': 'Cantabria',
  '40': 'Segovia', '41': 'Sevilla', '42': 'Soria', '43': 'Tarragona', '44': 'Teruel',
  '45': 'Toledo', '46': 'Valencia', '47': 'Valladolid', '48': 'Vizcaya', '49': 'Zamora',
  '50': 'Zaragoza', '51': 'Ceuta', '52': 'Melilla'
};

export default function CheckoutPage() {
  const { cartItems, cartTotal, isLoaded } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    address2: '',
    city: 'Huéscar',
    province: 'Granada',
    zip: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Estados para el selector de prefijos telefónicos
  const [selectedPrefix, setSelectedPrefix] = useState(COUNTRIES_PREFIXES[0]);
  const [showPrefixDropdown, setShowPrefixDropdown] = useState(false);
  const [prefixSearchQuery, setPrefixSearchQuery] = useState('');

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

    const zip = formData.zip.trim();
    const city = formData.city.trim();
    const province = formData.province.trim();

    // Helper de normalización de texto para validación robusta
    const normalizeText = (text) => {
      return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
    };

    // 1. Validar longitud y dígitos del código postal
    if (zip.length !== 5 || isNaN(zip)) {
      setError('El código postal debe ser un número de 5 dígitos (ej: 18830).');
      setLoading(false);
      return;
    }

    // 2. Validar correspondencia de provincia según el prefijo del CP
    const cpPrefix = zip.substring(0, 2);
    const expectedProvince = PROVINCIA_CP_MAP[cpPrefix];
    if (!expectedProvince) {
      setError('El código postal introducido no es un código postal válido en España.');
      setLoading(false);
      return;
    }

    if (normalizeText(expectedProvince) !== normalizeText(province)) {
      setError(`El código postal ${zip} pertenece a la provincia de ${expectedProvince}, no a la provincia de ${province}.`);
      setLoading(false);
      return;
    }

    // 3. Validar Huéscar específicamente
    if (normalizeText(city) === 'huescar' && zip !== '18830') {
      setError('El código postal para la localidad de Huéscar debe ser 18830.');
      setLoading(false);
      return;
    }

    try {
      const combinedPhone = `${selectedPrefix.code} ${formData.phone.trim()}`;
      const combinedAddress = formData.address2.trim()
        ? `${formData.address.trim()}, ${formData.address2.trim()}`
        : formData.address.trim();

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartItems,
          customerInfo: {
            ...formData,
            phone: combinedPhone,
            address: combinedAddress,
          },
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
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            
            <div>
              <label className="form-label" htmlFor="chk-phone">
                Teléfono de Contacto *
              </label>
              <div className="phone-input-group" style={{ display: 'flex', width: '100%', gap: '10px', position: 'relative' }}>
                <div style={{ position: 'relative' }}>
                  <button
                    type="button"
                    className="form-input prefix-btn"
                    onClick={() => setShowPrefixDropdown(!showPrefixDropdown)}
                    style={{
                      width: '105px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      padding: '12px 10px',
                      textAlign: 'center',
                      userSelect: 'none',
                    }}
                  >
                    <span>{selectedPrefix.flag} {selectedPrefix.code}</span>
                    <span style={{ fontSize: '0.75rem', color: '#a69b93' }}>▼</span>
                  </button>

                  {showPrefixDropdown && (
                    <div
                      className="prefix-dropdown-panel"
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: '0',
                        width: '240px',
                        backgroundColor: 'rgba(44, 37, 32, 0.98)',
                        border: '1px solid rgba(229, 223, 218, 0.15)',
                        borderRadius: 'var(--border-radius-sm)',
                        boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                        zIndex: '999',
                        marginTop: '5px',
                        padding: '10px',
                      }}
                    >
                      <input
                        type="text"
                        placeholder="Buscar país o código..."
                        value={prefixSearchQuery}
                        onChange={(e) => setPrefixSearchQuery(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          marginBottom: '8px',
                          borderRadius: 'var(--border-radius-sm)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          color: '#ffffff',
                          fontSize: '0.85rem',
                          outline: 'none',
                        }}
                      />
                      <div
                        style={{
                          maxHeight: '180px',
                          overflowY: 'auto',
                        }}
                        className="prefix-scrollbar"
                      >
                        {COUNTRIES_PREFIXES.filter(
                          (p) =>
                            p.name.toLowerCase().includes(prefixSearchQuery.toLowerCase()) ||
                            p.code.includes(prefixSearchQuery)
                        ).map((p) => (
                          <div
                            key={p.code + p.name}
                            onClick={() => {
                              setSelectedPrefix(p);
                              setShowPrefixDropdown(false);
                              setPrefixSearchQuery('');
                            }}
                            style={{
                              padding: '8px 10px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              fontSize: '0.85rem',
                              color: '#ffffff',
                              borderRadius: '4px',
                              transition: 'background 0.2s',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(197, 168, 128, 0.15)')}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                          >
                            <span>{p.flag}</span>
                            <span style={{ fontWeight: '600' }}>{p.code}</span>
                            <span style={{ opacity: '0.7', fontSize: '0.8rem' }}>{p.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <input
                  className="form-input"
                  type="tel"
                  id="chk-phone"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{ flex: 1 }}
                />
              </div>
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
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="chk-address2">
              Piso, puerta, bloque o especificaciones adicionales (Opcional)
            </label>
            <input
              className="form-input"
              type="text"
              id="chk-address2"
              value={formData.address2}
              onChange={(e) => setFormData({ ...formData, address2: e.target.value })}
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
