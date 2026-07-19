import { useState } from 'react';
import { ContactsAPI } from '../data/store';
import emailjs from '@emailjs/browser';

export function ContactForm({ onSuccess }) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setSubmitting(true);
    
    // Save to local database
    ContactsAPI.add(formData);

    // EmailJS Implementation
    // Note: SERVICE_ID and TEMPLATE_ID must be replaced with actual IDs from your EmailJS dashboard.
    const serviceId = 'YOUR_SERVICE_ID'; 
    const templateId = 'YOUR_TEMPLATE_ID';
    const publicKey = '-v_HVBkR4T25S10ze8ixu';

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      to_email: 'abdulrafaydevau@gmail.com',
      subject: formData.subject,
      message: formData.message,
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setSubmitting(false);
        if (onSuccess) onSuccess('Message submitted successfully via EmailJS!');
      })
      .catch((error) => {
        console.error('FAILED...', error);
        // Fallback: Even if EmailJS fails (due to missing IDs), we show success because it's saved locally
        setFormData({ name: '', email: '', subject: '', message: '' });
        setSubmitting(false);
        if (onSuccess) onSuccess('Message saved locally. (EmailJS requires Service/Template IDs to send emails)');
      });
  };

  return (
    <div className="ios-glass" style={{ padding: '2.5rem', borderRadius: 'var(--r-xl)', position: 'relative', overflow: 'hidden' }}>
      <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--text-white)' }}>Send a Direct Message</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-row-2">
          <div className="form-group">
            <label className="form-label" htmlFor="contact-name">Name</label>
            <input
              type="text"
              id="contact-name"
              placeholder="Rafay"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="contact-email">Email</label>
            <input
              type="email"
              id="contact-email"
              placeholder="rafay@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="contact-subject">Subject</label>
          <input
            type="text"
            id="contact-subject"
            placeholder="Partnership Proposal"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="contact-message">Message</label>
          <textarea
            id="contact-message"
            placeholder="Tell me about your project..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '1rem', fontSize: '1rem' }} disabled={submitting}>
          {submitting ? 'Executing Protocol...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}
