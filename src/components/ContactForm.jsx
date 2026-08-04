'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSubmitted(false);

    try {
      const response = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ocurrió un error al enviar tu mensaje. Inténtalo de nuevo.');
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
            fontWeight: '500',
          }}
        >
          {error}
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
