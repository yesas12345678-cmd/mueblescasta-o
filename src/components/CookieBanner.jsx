'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // 1. Escuchar evento global para reabrir la configuración de cookies
    const handleOpenSettings = () => {
      setShowBanner(true);
      setShowConfig(true);
    };
    window.addEventListener('open-cookie-settings', handleOpenSettings);

    // 2. Comprobar si ya existe consentimiento guardado
    const savedConsent = localStorage.getItem('cookies-consent');
    if (savedConsent) {
      try {
        const parsed = JSON.parse(savedConsent);
        // Si tiene el nuevo formato de objeto, lo cargamos
        if (typeof parsed === 'object' && parsed !== null) {
          setPreferences({
            essential: true,
            analytics: !!parsed.analytics,
            marketing: !!parsed.marketing,
          });
        }
      } catch (e) {
        // Si tiene el formato antiguo de texto ('accepted' / 'declined')
        if (savedConsent === 'accepted') {
          setPreferences({ essential: true, analytics: true, marketing: true });
        } else {
          setPreferences({ essential: true, analytics: false, marketing: false });
        }
      }
    } else {
      // Mostrar banner si no hay consentimiento guardado
      setTimeout(() => {
        setShowBanner(true);
      }, 800);
    }

    return () => window.removeEventListener('open-cookie-settings', handleOpenSettings);
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = { essential: true, analytics: true, marketing: true };
    localStorage.setItem('cookies-consent', JSON.stringify(allAccepted));
    setPreferences(allAccepted);
    setShowBanner(false);
    setShowConfig(false);
  };

  const handleDeclineAll = () => {
    const allDeclined = { essential: true, analytics: false, marketing: false };
    localStorage.setItem('cookies-consent', JSON.stringify(allDeclined));
    setPreferences(allDeclined);
    setShowBanner(false);
    setShowConfig(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookies-consent', JSON.stringify(preferences));
    setShowBanner(false);
    setShowConfig(false);
  };

  const togglePreference = (key) => {
    if (key === 'essential') return; // Siempre activas
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!showBanner) return null;

  return (
    <div className="cookie-banner-container">
      {!showConfig ? (
        // Banner Normal
        <div className="cookie-banner-content">
          <div className="cookie-banner-text">
            <p>
              Utilizamos cookies técnicas necesarias para el carrito de compra y opcionales para analizar visitas. Puedes aceptarlas todas, rechazarlas o configurar tus preferencias. Lee nuestra{' '}
              <Link href="/politica-cookies" className="cookie-banner-link">
                Política de Cookies
              </Link>.
            </p>
          </div>
          <div className="cookie-banner-actions">
            <button onClick={() => setShowConfig(true)} className="cookie-btn cookie-btn-configure">
              Configurar
            </button>
            <button onClick={handleDeclineAll} className="cookie-btn cookie-btn-decline">
              Rechazar
            </button>
            <button onClick={handleAcceptAll} className="cookie-btn cookie-btn-accept">
              Aceptar
            </button>
          </div>
        </div>
      ) : (
        // Panel de Configuración Detallada
        <div className="cookie-config-modal">
          <div className="cookie-config-header">
            <h3>Configuración de Cookies</h3>
            <button className="cookie-config-close" onClick={() => setShowConfig(false)}>&times;</button>
          </div>
          
          <div className="cookie-config-body">
            <p style={{ fontSize: '0.85rem', color: '#a69b93', marginBottom: '16px', lineHeight: '1.4' }}>
              Personaliza qué cookies permites almacenar. Las cookies técnicas son obligatorias para el correcto funcionamiento de la cesta y el checkout.
            </p>
            
            {/* Técnicas */}
            <div className="cookie-config-item">
              <div className="cookie-config-info">
                <h4>Cookies Técnicas y Esenciales</h4>
                <p>Necesarias para navegar, guardar productos en el carrito y procesar la compra de forma segura.</p>
              </div>
              <div className="cookie-switch-wrapper">
                <input 
                  type="checkbox" 
                  checked={preferences.essential} 
                  disabled 
                  id="cookie-essential"
                  className="cookie-switch-input"
                />
                <label className="cookie-switch-label disabled" htmlFor="cookie-essential"></label>
              </div>
            </div>

            {/* Analíticas */}
            <div className="cookie-config-item">
              <div className="cookie-config-info">
                <h4>Cookies Analíticas</h4>
                <p>Nos ayudan a entender cómo interactúan los usuarios con la web para mejorar la experiencia de navegación.</p>
              </div>
              <div className="cookie-switch-wrapper">
                <input 
                  type="checkbox" 
                  checked={preferences.analytics} 
                  onChange={() => togglePreference('analytics')}
                  id="cookie-analytics"
                  className="cookie-switch-input"
                />
                <label className="cookie-switch-label" htmlFor="cookie-analytics"></label>
              </div>
            </div>

            {/* Marketing */}
            <div className="cookie-config-item">
              <div className="cookie-config-info">
                <h4>Cookies de Marketing</h4>
                <p>Utilizadas para ofrecer publicidad relevante y medir la efectividad de las campañas comerciales.</p>
              </div>
              <div className="cookie-switch-wrapper">
                <input 
                  type="checkbox" 
                  checked={preferences.marketing} 
                  onChange={() => togglePreference('marketing')}
                  id="cookie-marketing"
                  className="cookie-switch-input"
                />
                <label className="cookie-switch-label" htmlFor="cookie-marketing"></label>
              </div>
            </div>
          </div>

          <div className="cookie-config-footer">
            <button onClick={handleDeclineAll} className="cookie-btn cookie-btn-decline" style={{ fontSize: '0.82rem', padding: '8px 16px' }}>
              Rechazar Todas
            </button>
            <button onClick={handleSavePreferences} className="cookie-btn cookie-btn-accept" style={{ fontSize: '0.82rem', padding: '8px 16px' }}>
              Guardar Selección
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
