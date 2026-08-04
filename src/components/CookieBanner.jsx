'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if the user has already consented
    const consent = localStorage.getItem('cookies-consent');
    if (!consent) {
      setTimeout(() => {
        setShowBanner(true);
      }, 0);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookies-consent', 'accepted');
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookies-consent', 'declined');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="cookie-banner-container">
      <div className="cookie-banner-content">
        <div className="cookie-banner-text">
          <p>
            Utilizamos cookies técnicas y esenciales para garantizar el correcto funcionamiento de la tienda y la seguridad de tu carrito de la compra. Al continuar navegando, aceptas nuestra{' '}
            <Link href="/politica-cookies" className="cookie-banner-link">
              Política de Cookies
            </Link>.
          </p>
        </div>
        <div className="cookie-banner-actions">
          <button onClick={handleDecline} className="cookie-btn cookie-btn-decline">
            Rechazar
          </button>
          <button onClick={handleAccept} className="cookie-btn cookie-btn-accept">
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
