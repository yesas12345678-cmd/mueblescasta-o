'use client';

import Link from 'next/link';
import '@/styles/checkout.css';

export default function CancelPage() {
  return (
    <div className="checkout-section container">
      <div className="checkout-status-card">
        <div className="cancel-icon-wrapper">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="15" x2="9" y1="9" y2="15" />
            <line x1="9" x2="15" y1="9" y2="15" />
          </svg>
        </div>
        <h1>Proceso de Pago Cancelado</h1>
        <p>
          El pago no pudo completarse o fue cancelado. No se ha realizado ningún cargo en tu tarjeta.
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: '-10px auto 30px', maxWidth: '500px' }}>
          Puedes regresar a tu carrito para revisar los productos seleccionados e intentar realizar el pago nuevamente.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Link href="/carrito" className="btn btn-primary">
            Volver al Carrito
          </Link>
          <Link href="/catalogo" className="btn btn-secondary">
            Ver Catálogo
          </Link>
        </div>
      </div>
    </div>
  );
}
