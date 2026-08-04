'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';

export default function Header() {
  const pathname = usePathname();
  const { cartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isActive = (path) => pathname === path;
  const isHome = pathname === '/';

  // Detectar scroll para cambiar el fondo de la cabecera
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerClass = `header ${isHome && !scrolled ? 'header-home-transparent' : ''} ${scrolled ? 'scrolled' : ''}`;

  return (
    <header className={headerClass}>
      <div className="container header-container">
        {/* Logotipo Vectorial Premium */}
        <Link href="/" className="header-logo">
          <div className="logo-icon-wrapper">
            <svg viewBox="0 0 100 100" className="logo-icon-svg" fill="none" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="15" y="15" width="70" height="70" rx="8" />
              <path d="M30 40 L30 60" />
              <path d="M70 40 L70 60" />
              <path d="M30 40 Q50 35 70 40" />
              <path d="M25 60 L75 60" />
              <path d="M25 60 L25 72 Q50 74 75 72 L75 60" />
              <path d="M20 54 L20 62 C20 66 25 66 25 66" />
              <path d="M80 54 L80 62 C80 66 75 66 75 66" />
              <path d="M32 72 L28 82" />
              <path d="M68 72 L72 82" />
            </svg>
          </div>
          <div className="logo-text-wrapper">
            <span className="logo-sub">MUEBLES</span>
            <span className="logo-main">CASTAÑO</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav>
          <ul className="nav">
            <li>
              <Link href="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/catalogo" className={`nav-link ${isActive('/catalogo') ? 'active' : ''}`}>
                Colecciones
              </Link>
            </li>
            <li>
              <Link href="/catalogo" className={`nav-link ${isActive('/catalogo') ? 'active' : ''}`}>
                Catálogo
              </Link>
            </li>
            <li>
              <Link href="/nosotros" className={`nav-link ${isActive('/nosotros') ? 'active' : ''}`}>
                Sobre Nosotros
              </Link>
            </li>
            <li>
              <Link href="/contacto" className={`nav-link ${isActive('/contacto') ? 'active' : ''}`}>
                Contacto
              </Link>
            </li>
          </ul>
        </nav>

        {/* Iconos de Acción */}
        <div className="header-actions">
          {/* Búsqueda */}
          <button className="header-action-btn search-btn" aria-label="Buscar productos">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>

          {/* Mi Cuenta (Mock) */}
          <Link href="/contacto" className="header-action-btn profile-btn" aria-label="Mi Cuenta">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </Link>

          {/* Carrito de Compra */}
          <Link href="/carrito" className="header-action-btn cart-btn" aria-label="Ver Carrito de compra">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          {/* Botón de Menú Móvil */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menú"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Menú Móvil */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer">
          <ul className="mobile-nav-list">
            <li>
              <Link
                href="/"
                className={`nav-link ${isActive('/') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                href="/catalogo"
                className={`nav-link ${isActive('/catalogo') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Colecciones
              </Link>
            </li>
            <li>
              <Link
                href="/catalogo"
                className={`nav-link ${isActive('/catalogo') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Catálogo
              </Link>
            </li>
            <li>
              <Link
                href="/nosotros"
                className={`nav-link ${isActive('/nosotros') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Sobre Nosotros
              </Link>
            </li>
            <li>
              <Link
                href="/contacto"
                className={`nav-link ${isActive('/contacto') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contacto
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
