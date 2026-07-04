'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const { cartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => pathname === path;

  return (
    <header className="header">
      <div className="container header-container">
        <Link href="/" className="logo" style={{ display: 'flex', alignItems: 'center' }}>
          <Image
            src="/images/logo.png"
            alt="Logo Muebles Castaño"
            width={140}
            height={46}
            style={{ objectFit: 'contain' }}
            priority
          />
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

        <div className="header-actions">
          <Link href="/carrito" className="cart-btn" aria-label="Ver Carrito de compra">
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
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

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

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '80px',
            left: 0,
            width: '100%',
            backgroundColor: 'var(--bg-white)',
            borderBottom: '1px solid var(--border-color)',
            boxShadow: 'var(--box-shadow-hover)',
            zIndex: 99,
            padding: '20px 0',
          }}
        >
          <ul
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
              listStyle: 'none',
            }}
          >
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
