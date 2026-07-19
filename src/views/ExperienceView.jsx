import { motion } from 'framer-motion';
import { useStore } from '../hooks/useStore';

export function ExperienceView() {
  const experiences = useStore('experiences') || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}
    >
      <section className="section-wrap-full" style={{ padding: '120px 24px', maxWidth: '1000px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-label">04 // Career</div>
          <h2 className="section-title" style={{ color: 'var(--text-white)' }}>Professional Experience</h2>
          <p className="section-sub" style={{ margin: '0 auto', maxWidth: '600px' }}>
            A timeline of my roles in software engineering and research.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {experiences.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>No records found. Add via Admin.</div>
          ) : (
            experiences.map((exp, idx) => (
              <motion.div 
                key={exp.id}
                initial={{ opacity: 0, scale: 0.98, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: idx * 0.1, type: 'spring', stiffness: 300, damping: 30 }}
                whileHover={{ y: -5, scale: 1.01 }}
                className="ios-glass"
                style={{
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-white)', marginBottom: '0.25rem' }}>{exp.role}</h3>
                    <div style={{ fontSize: '1rem', color: 'var(--mughal-gold)', fontFamily: 'var(--font-sans)', fontWeight: 500 }}>{exp.company}</div>
                  </div>
                  <div style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)', background: 'rgba(255,255,255,0.03)', padding: '0.4rem 1rem', borderRadius: '100px' }}>
                    {exp.period}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  {exp.location}
                </div>

                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: '0.5rem' }}>
                  {exp.description}
                </p>

                {exp.highlights && exp.highlights.length > 0 && (
                  <ul style={{ paddingLeft: '1.2rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {exp.highlights.map((item, i) => (
                      <li key={i} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))
          )}
        </div>

      </section>
    </motion.div>
  );
}
