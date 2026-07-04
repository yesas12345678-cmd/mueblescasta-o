'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function ProductDetailActions({ product }) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  const adjustQty = (amount) => {
    setQty((prev) => Math.max(1, prev + amount));
  };

  return (
    <div className="actions-row">
      <div className="quantity-selector">
        <button
          className="quantity-btn"
          onClick={() => adjustQty(-1)}
          aria-label="Disminuir cantidad"
        >
          &minus;
        </button>
        <span
          className="quantity-input"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {qty}
        </span>
        <button
          className="quantity-btn"
          onClick={() => adjustQty(1)}
          aria-label="Aumentar cantidad"
        >
          &#43;
        </button>
      </div>

      <button
        className="btn btn-primary"
        style={{ flexGrow: 1, height: '46px' }}
        onClick={() => addToCart(product, qty)}
      >
        Añadir al Carrito
      </button>
    </div>
  );
}
