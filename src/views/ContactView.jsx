import { motion } from 'framer-motion';
import { ContactForm } from '../components/ContactForm';

export function ContactView({ showToast }) {
  return (
    <motion.section
      className="section-wrap-full"
      style={{ padding: '120px 24px', maxWidth: '1100px', margin: '0 auto' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="section-label">04 // Secure Channels</div>
      <h2 className="section-title">Initiate Connection.</h2>
      
      <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginTop: '3rem' }}>
        <motion.div 
          className="contact-info"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-white)' }}>Global Reach</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
            Direct conversations can be initiated through traditional mail streams or active social developer integrations.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <motion.a whileHover={{ y: -5, scale: 1.02 }} href="mailto:abdulrafaykazi@gmail.com" className="ios-glass" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem', textDecoration: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>✉</span>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text-white)' }}>Primary Email</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>abdulrafaykazi@gmail.com</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '0.2rem' }}>Secondary: abdulrafaydevau@gmail.com</div>
                </div>
              </div>
              <span style={{ color: 'var(--mughal-gold)' }}>→</span>
            </motion.a>

            <motion.a whileHover={{ y: -5, scale: 1.02 }} href="https://github.com/abdulrafayau" target="_blank" rel="noreferrer" className="ios-glass" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem', textDecoration: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>⌨</span>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text-white)' }}>GitHub</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>github.com/abdulrafayau</div>
                </div>
              </div>
              <span style={{ color: 'var(--mughal-gold)' }}>→</span>
            </motion.a>

            <motion.a whileHover={{ y: -5, scale: 1.02 }} href="https://www.linkedin.com/in/abdulrafayqar/" target="_blank" rel="noreferrer" className="ios-glass" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem', textDecoration: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>💼</span>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text-white)' }}>LinkedIn</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>linkedin.com/in/abdulrafayqar</div>
                </div>
              </div>
              <span style={{ color: 'var(--mughal-gold)' }}>→</span>
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ContactForm onSuccess={showToast} />
        </motion.div>
      </div>
    </motion.section>
  );
}
