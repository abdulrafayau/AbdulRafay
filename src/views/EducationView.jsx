import { motion } from 'framer-motion';
import { useStore } from '../hooks/useStore';

export function EducationView() {
  const education = useStore('education') || [];
  const certifications = useStore('certifications') || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}
    >
      <section className="section-wrap-full" style={{ padding: '120px 24px', maxWidth: '1000px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-label">03 // Academia</div>
          <h2 className="section-title" style={{ color: 'var(--text-white)' }}>Education & Merits</h2>
          <p className="section-sub" style={{ margin: '0 auto', maxWidth: '600px' }}>
            Academic foundation and professional certifications.
          </p>
        </div>

        {/* iOS Style List for Education */}
        <div style={{ marginBottom: '4rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-sans)', fontWeight: 600, color: 'var(--text-white)', marginBottom: '1.5rem', paddingLeft: '1rem' }}>Academic Timeline</h3>
          <div className="ios-glass" style={{ overflow: 'hidden', paddingBottom: '1rem' }}>
            {education.length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>No records found. Add via Admin.</div>
            ) : (
              education.map((edu, idx) => (
                <motion.div 
                  key={edu.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1, type: 'spring', stiffness: 300, damping: 30 }}
                  style={{ 
                    padding: '1.5rem 2rem', 
                    borderBottom: idx !== education.length - 1 ? '1px solid var(--border-soft)' : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-white)', marginBottom: '0.25rem' }}>{edu.degree}</h4>
                      <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)' }}>{edu.institution}</div>
                    </div>
                    <div style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)', background: 'rgba(255,255,255,0.03)', padding: '0.25rem 0.75rem', borderRadius: '100px' }}>
                      {edu.period}
                    </div>
                  </div>
                  {edu.description && (
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-tertiary)', marginTop: '0.5rem', lineHeight: 1.6 }}>
                      {edu.description}
                    </p>
                  )}
                  {edu.awards && edu.awards.length > 0 && (
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                      {edu.awards.map((award, i) => (
                        <div key={i} style={{ 
                          fontSize: '0.75rem', 
                          padding: '0.25rem 0.75rem', 
                          borderRadius: '100px', 
                          background: award.toLowerCase().includes('gold') ? 'rgba(255,215,0,0.1)' : award.toLowerCase().includes('silver') ? 'rgba(192,192,192,0.1)' : 'rgba(255,255,255,0.05)',
                          color: award.toLowerCase().includes('gold') ? '#FFD700' : award.toLowerCase().includes('silver') ? '#C0C0C0' : 'var(--text-secondary)',
                          border: `1px solid ${award.toLowerCase().includes('gold') ? 'rgba(255,215,0,0.2)' : award.toLowerCase().includes('silver') ? 'rgba(192,192,192,0.2)' : 'var(--border-soft)'}`
                        }}>
                          ★ {award}
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Certifications Grid */}
        <div>
          <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-sans)', fontWeight: 600, color: 'var(--text-white)', marginBottom: '1.5rem', paddingLeft: '1rem' }}>Certifications</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {certifications.length === 0 ? (
              <div style={{ color: 'var(--text-secondary)', paddingLeft: '1rem' }}>No certifications found.</div>
            ) : (
              certifications.map((cert, idx) => (
                <motion.a 
                  href={cert.link} target="_blank" rel="noreferrer"
                  key={cert.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1, type: 'spring', stiffness: 300, damping: 30 }}
                  whileHover={{ y: -5 }}
                  className="ios-glass"
                  style={{ 
                    padding: '1.5rem',
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                  }}
                >
                  <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-white)' }}>{cert.title}</h4>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{cert.issuer}</div>
                  <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--mughal-gold)', marginTop: '0.5rem' }}>
                    {cert.date}
                  </div>
                </motion.a>
              ))
            )}
          </div>
        </div>

      </section>
    </motion.div>
  );
}
