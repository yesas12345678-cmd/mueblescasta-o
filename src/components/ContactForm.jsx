'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate sending message
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 1200);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h2>Envíanos un mensaje</h2>
      {submitted && (
        <div
          style={{
            backgroundColor: 'rgba(62, 92, 70, 0.1)',
            border: '1px solid var(--success)',
            color: 'var(--success)',
            padding: '16px',
            borderRadius: 'var(--border-radius-sm)',
            marginBottom: '20px',
            fontSize: '0.95rem',
            fontWeight: '500',
          }}
        >
          ¡Gracias por tu mensaje! Nos pondremos en contacto contigo lo antes posible.
        </div>
      )}

      <div className="form-group">
        <label className="form-label" htmlFor="name">
          Nombre completo *
        </label>
        <input
          className="form-input"
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="email">
          Correo electrónico *
        </label>
        <input
          className="form-input"
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="phone">
          Teléfono de contacto
        </label>
        <input
          className="form-input"
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="message">
          ¿En qué podemos ayudarte? *
        </label>
        <textarea
          className="form-input"
          id="message"
          rows="4"
          required
          style={{ resize: 'vertical' }}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        ></textarea>
      </div>

      <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: '100%' }}>
        {loading ? 'Enviando...' : 'Enviar Mensaje'}
      </button>
    </form>
  );
}
