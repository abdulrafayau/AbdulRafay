import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../hooks/useStore';

export function ProjectsView() {
  const projects = useStore('projects') || [];
  const publications = useStore('publications') || [];
  
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Full Stack', 'AI/ML', 'Publications'];

  const allItems = [
    ...projects.map(p => ({ ...p, type: 'project' })),
    ...publications.map(p => ({ ...p, type: 'publication' }))
  ];

  const filteredItems = allItems.filter(item => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Publications') return item.type === 'publication';
    
    if (item.type === 'project' && item.tags) {
      const tagsLower = item.tags.map(t => t.toLowerCase());
      if (activeTab === 'Full Stack') {
        return tagsLower.some(t => ['react', 'node.js', 'next.js', 'postgresql', 'socket.io', 'redis', 'webgl'].includes(t));
      }
      if (activeTab === 'AI/ML') {
        return tagsLower.some(t => ['python', 'ai/ml', 'langchain', 'stable diffusion', 'vector db'].includes(t));
      }
    }
    return false;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <section className="section-wrap-full" style={{ padding: '120px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header & Tabs */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-label">02 // Deployments</div>
          <h2 className="section-title" style={{ color: 'var(--text-white)' }}>Infrastructure & Research</h2>
          <p className="section-sub" style={{ margin: '0 auto 3rem', maxWidth: '600px' }}>
            A comprehensive log of production applications, distributed microservices, and peer-reviewed algorithmic methodologies.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {tabs.map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: activeTab === tab ? 'var(--mughal-gold)' : 'transparent',
                  color: activeTab === tab ? '#000' : 'var(--text-secondary)',
                  border: `1px solid ${activeTab === tab ? 'var(--mughal-gold)' : 'var(--border-soft)'}`,
                  padding: '0.6rem 1.25rem',
                  borderRadius: '100px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: activeTab === tab ? '0 0 15px rgba(0, 240, 255, 0.3)' : 'none'
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
          <AnimatePresence mode="popLayout">
            {filteredItems.map(item => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={`${item.type}-${item.id}`}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-soft)',
                  borderRadius: '16px',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {item.type === 'publication' ? (
                  <>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--mughal-gold)', marginBottom: '1rem' }}>
                      [ PUBLICATION / {item.year} ]
                    </div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-white)', lineHeight: 1.3 }}>{item.title}</h3>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem', fontFamily: 'var(--font-mono)' }}>{item.journal}</div>
                    <p style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '2rem', flexGrow: 1 }}>
                      {item.abstract}
                    </p>
                    {item.link && (
                      <a href={item.link} target="_blank" rel="noreferrer" style={{ alignSelf: 'flex-start', color: 'var(--mughal-gold)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', textDecoration: 'none', borderBottom: '1px solid var(--mughal-gold)', paddingBottom: '2px' }}>
                        READ DRAFT →
                      </a>
                    )}
                  </>
                ) : (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--mughal-gold)' }}>
                        SYS_ID: {item.num}
                      </div>
                      {item.link && (
                        <a href={item.link} target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)' }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                        </a>
                      )}
                    </div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-white)', lineHeight: 1.3 }}>{item.title}</h3>
                    <p style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '2rem', flexGrow: 1 }}>
                      {item.solution}
                    </p>
                    
                    {item.impact && (
                      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                        {item.impact.map((imp, idx) => (
                          <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div style={{ color: 'var(--text-white)', fontSize: '1rem', fontWeight: 'bold' }}>{imp.split(' ')[0]}</div>
                            <div style={{ color: 'var(--text-tertiary)', fontSize: '0.65rem', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>{imp.substring(imp.indexOf(' ') + 1)}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {item.tags?.map((t, idx) => (
                        <span key={idx} className="tech-tag">{t}</span>
                      ))}
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </section>
    </motion.div>
  );
}
