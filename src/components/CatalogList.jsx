'use client';

import { useState } from 'react';
import ProductCard from '@/components/ProductCard';

export default function CatalogList({ initialProducts }) {
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = ['Todos', 'Salón', 'Dormitorio', 'Almacenamiento'];

  const filteredProducts = selectedCategory === 'Todos'
    ? initialProducts
    : initialProducts.filter(p => p.category === selectedCategory);

  return (
    <section className="catalog-section">
      <div className="container">
        {/* Filters */}
        <div className="filter-container">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <h3>No se encontraron productos</h3>
            <p style={{ color: 'var(--text-muted)' }}>Intenta cambiar de categoría.</p>
          </div>
        )}
      </div>
    </section>
  );
}
