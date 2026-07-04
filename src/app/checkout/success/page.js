'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import '@/styles/checkout.css';

export default function SuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    // Vacíamos el carrito tras la compra exitosa
    clearCart();
  }, []);

  return (
    <div className="checkout-section container">
      <div className="checkout-status-card">
        <div className="success-icon-wrapper">
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
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <h1>¡Pago Completado con Éxito!</h1>
        <p>
          Muchas gracias por tu compra en <strong>Muebles Castaño</strong>. Hemos recibido tu pedido correctamente.
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: '-10px auto 30px', maxWidth: '500px' }}>
          En las próximas 24 horas laborables nos pondremos en contacto contigo para coordinar el día y la hora exacta de la entrega y el montaje gratuito en tu domicilio.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Link href="/catalogo" className="btn btn-primary">
            Seguir Comprando
          </Link>
          <Link href="/contacto" className="btn btn-secondary">
            ¿Tienes dudas?
          </Link>
        </div>
      </div>
    </div>
  );
}
