import { motion } from 'framer-motion';

export function AboutView() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <section className="section-wrap-full" style={{ padding: '120px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-label" style={{ marginBottom: '1rem' }}>01 // The Architect</div>
          <h2 className="section-title" style={{ fontFamily: 'var(--font-serif)', fontSize: '3.5rem', color: 'var(--mughal-gold)' }}>Abdul Rafay</h2>
        </div>

        <motion.div 
          className="bento-grid"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Main Intro Cell */}
          <motion.div className="bento-cell bento-span-8 bento-row-2" variants={itemVariants}>
            <h3 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-sans)', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--text-white)', letterSpacing: '-0.02em' }}>
              Engineering Intelligence.
            </h3>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              I am an AI/ML Engineer, Full-Stack Developer, and the CEO of <a href="https://canvas-gali.vercel.app/" target="_blank" rel="noreferrer" style={{ color: 'var(--mughal-gold)', textDecoration: 'none', fontWeight: 600 }}>Canvasgali</a>. My work bridges the rigid logic of distributed edge architectures with the fluid, dynamic aesthetics of high-performance user interfaces.
            </p>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              Whether I am orchestrating microservices, training deep learning models, or leading product development at Canvasgali, my focus remains on building resilient, scalable systems that feel alive.
            </p>
          </motion.div>

          {/* Connect / Socials Cell */}
          <motion.div className="bento-cell bento-span-4" variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h4 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-mono)', color: 'var(--mughal-gold)', marginBottom: '1.5rem' }}>// NETWORK</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <a href="https://linkedin.com/in/abdulrafayau" target="_blank" rel="noreferrer" style={{ color: 'var(--text-white)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid var(--border-soft)' }}>
                <span style={{ color: 'var(--mughal-gold)' }}>in</span> LinkedIn
              </a>
              <a href="https://github.com/abdulrafayau" target="_blank" rel="noreferrer" style={{ color: 'var(--text-white)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid var(--border-soft)' }}>
                <span style={{ color: 'var(--mughal-gold)' }}>gh</span> GitHub
              </a>
            </div>
          </motion.div>

          {/* Stats Cell */}
          <motion.div className="bento-cell bento-span-4" variants={itemVariants} style={{ background: 'var(--mughal-gold)', color: '#111' }}>
            <h4 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-mono)', color: '#4A3424', marginBottom: '2rem' }}>// GLOBAL REACH</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <div style={{ fontSize: '3rem', fontWeight: 800, lineHeight: 1 }}>17+</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#4A3424', marginTop: '0.25rem' }}>PROJECTS DELIVERED</div>
              </div>
              <div>
                <div style={{ fontSize: '3rem', fontWeight: 800, lineHeight: 1 }}>3+</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#4A3424', marginTop: '0.25rem' }}>COUNTRIES REACHED</div>
              </div>
            </div>
          </motion.div>

          {/* Philosophy Cell */}
          <motion.div className="bento-cell bento-span-8" variants={itemVariants} style={{ position: 'relative' }}>
            
            <h4 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-mono)', color: 'var(--mughal-gold)', marginBottom: '1.5rem' }}>// METHODOLOGY</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
              <div>
                <h5 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-white)', marginBottom: '0.75rem', fontFamily: 'var(--font-sans)' }}>Precision Engineering</h5>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  Building robust, fault-tolerant systems using React, Node.js, and Python. Every architecture is designed with scalability and zero-trust security in mind.
                </p>
              </div>
              <div>
                <h5 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-white)', marginBottom: '0.75rem', fontFamily: 'var(--font-sans)' }}>Algorithmic Design</h5>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  Translating organic flow into computational models, utilizing vector mathematics and machine learning to generate dynamic digital experiences.
                </p>
              </div>
            </div>
          </motion.div>

        </motion.div>

        {/* ── Additional About Rows ── */}
        <motion.div 
          className="bento-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          style={{ marginTop: '1.5rem' }}
        >
          {/* Core Values Cell */}
          <motion.div className="bento-cell bento-span-6" variants={itemVariants}>
            <h4 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-mono)', color: 'var(--mughal-gold)', marginBottom: '1.5rem' }}>// CORE VALUES</h4>
            <ul style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li><strong style={{ color: 'var(--text-white)' }}>Simplicity Over Complexity:</strong> Code should be easy to read and maintain, even if the underlying logic is complex.</li>
              <li><strong style={{ color: 'var(--text-white)' }}>Zero-Trust Security:</strong> Architecture built on the assumption of failure, ensuring high resilience.</li>
              <li><strong style={{ color: 'var(--text-white)' }}>Aesthetic Integrity:</strong> An application is only as good as it feels to the user. Design matters.</li>
            </ul>
          </motion.div>

          {/* Interests Cell */}
          <motion.div className="bento-cell bento-span-6" variants={itemVariants}>
            <h4 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-mono)', color: 'var(--mughal-gold)', marginBottom: '1.5rem' }}>// BEYOND CODE</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1rem' }}>
              When I'm not architecting distributed edge systems or training machine learning models, I channel my creativity into analogue disciplines.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <span style={{ padding: '0.4rem 1rem', border: '1px solid var(--border-soft)', borderRadius: '100px', fontSize: '0.85rem', color: 'var(--text-white)', background: 'rgba(255,255,255,0.03)' }}>Classical Calligraphy</span>
              <span style={{ padding: '0.4rem 1rem', border: '1px solid var(--border-soft)', borderRadius: '100px', fontSize: '0.85rem', color: 'var(--text-white)', background: 'rgba(255,255,255,0.03)' }}>Open Source Contribution</span>
              <span style={{ padding: '0.4rem 1rem', border: '1px solid var(--border-soft)', borderRadius: '100px', fontSize: '0.85rem', color: 'var(--text-white)', background: 'rgba(255,255,255,0.03)' }}>System Design Theory</span>
            </div>
          </motion.div>
        </motion.div>

      </section>
    </motion.div>
  );
}
