import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useStore } from '../hooks/useStore';
import { MacBookWorkspace } from '../components/MacBookWorkspace';

const TYPING_SPEED = 70;
const roles = [
  "an AI/ML Engineer.",
  "a Full Stack Developer.",
  "a Researcher.",
  "a Problem Solver."
];

const techStack = [
  "React", "Three.js", "Node.js", "FastAPI", "Pandas", "NumPy", "TensorFlow", 
  "PyTorch", ".NET", "Angular", "ExpressJS", "MongoDB", "SQL", "Azure"
];

export function HomeView() {
  const trusted = useStore('trusted_companies') || [];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;
    const currentRole = roles[currentRoleIndex];
    
    if (isDeleting) {
      if (displayedText === "") {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        timeout = setTimeout(() => {
          setDisplayedText(currentRole.substring(0, displayedText.length - 1));
        }, 30);
      }
    } else {
      if (displayedText === currentRole) {
        timeout = setTimeout(() => setIsDeleting(true), 2500);
      } else {
        timeout = setTimeout(() => {
          setDisplayedText(currentRole.substring(0, displayedText.length + 1));
        }, TYPING_SPEED);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentRoleIndex]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ overflow: 'hidden' }}
    >
      {/* ── Hero Section ── */}
      <section style={{
        display: 'flex',
        alignItems: 'center', 
        justifyContent: 'center',
        minHeight: '90vh', 
        padding: '120px 5vw 40px',
      }}>
        <div className="hero-wrap" style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: '1400px',
          gap: '4rem',
          flexWrap: 'wrap-reverse'
        }}>
          
          {/* LEFT: MacBook */}
          <div style={{ flex: '1 1 500px', display: 'flex', justifyContent: 'center' }}>
            <MacBookWorkspace />
          </div>

          {/* RIGHT: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{ flex: '1 1 400px', textAlign: 'left' }}
          >
            <div className="section-label" style={{ marginBottom: '1.5rem', color: 'var(--mughal-gold)' }}>
              // System Initialized
            </div>
            
            <h1 style={{ 
              fontFamily: 'var(--font-sans)', 
              fontWeight: 800, 
              fontSize: 'clamp(3.5rem, 6vw, 5rem)', 
              lineHeight: 1.1, 
              letterSpacing: '-0.04em',
              marginBottom: '1rem',
              color: 'var(--text-white)'
            }}>
              I'm <br/><span style={{ color: 'var(--mughal-gold)' }}>Abdul Rafay</span>
            </h1>

            <div style={{ 
              fontSize: '1.25rem', 
              fontFamily: 'var(--font-mono)', 
              color: 'var(--text-secondary)', 
              marginBottom: '2.5rem',
              height: '2rem',
              display: 'flex',
              alignItems: 'center'
            }}>
              <span>&gt; {displayedText}</span>
              <span style={{ 
                display: 'inline-block', width: '10px', height: '20px',
                backgroundColor: 'var(--mughal-gold)', marginLeft: '8px',
                animation: 'blink 1s step-end infinite'
              }}></span>
            </div>

            <p className="section-sub" style={{ marginBottom: '3rem', fontSize: '1.1rem', maxWidth: '500px' }}>
              Architecting high-performance edge infrastructure, scalable AI microservices, and elegant digital experiences.
            </p>

            <div className="btn-group" style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/projects" className="btn btn-primary" style={{ background: '#f5f5f7', color: '#111' }}>
                View Deployments
              </Link>
              <Link to="/contact" className="btn btn-ghost" style={{ borderColor: 'var(--border-soft)', color: 'var(--text-secondary)' }}>
                Let's Connect
              </Link>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── Infinite Tech Ticker ── */}
      <div className="ticker-wrap">
        <div className="ticker-content">
          {techStack.map((tech, i) => (
            <div key={`t1-${i}`} className="ticker-item">
              <span>-</span> {tech}
            </div>
          ))}
        </div>
        <div className="ticker-content">
          {techStack.map((tech, i) => (
            <div key={`t2-${i}`} className="ticker-item">
              <span>-</span> {tech}
            </div>
          ))}
        </div>
      </div>

      {/* ── Trusted By Ticker ── */}
      {trusted && trusted.length > 0 && (
        <section style={{ padding: '4rem 0', background: 'rgba(0,0,0,0.2)', borderTop: '1px solid var(--border-soft)', borderBottom: '1px solid var(--border-soft)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '0.85rem', color: 'var(--text-tertiary)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
            Trusted By Engineering Teams At
          </div>
          <div className="ticker-wrap" style={{ border: 'none', background: 'transparent' }}>
            <div className="ticker-content" style={{ animationDuration: '20s' }}>
              {trusted.map((company, i) => (
                <div key={`trust1-${i}`} className="ticker-item" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0 2rem' }}>
                  {company.logoUrl ? (
                    <img src={company.logoUrl} alt={company.name} style={{ height: '32px', filter: 'brightness(0) invert(1)', opacity: 0.7 }} />
                  ) : null}
                  <span style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{company.name}</span>
                </div>
              ))}
            </div>
            <div className="ticker-content" style={{ animationDuration: '20s' }}>
              {trusted.map((company, i) => (
                <div key={`trust2-${i}`} className="ticker-item" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0 2rem' }}>
                  {company.logoUrl ? (
                    <img src={company.logoUrl} alt={company.name} style={{ height: '32px', filter: 'brightness(0) invert(1)', opacity: 0.7 }} />
                  ) : null}
                  <span style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{company.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Engineering Arsenal Bento ── */}
      <section style={{ padding: '80px 5vw', maxWidth: '1400px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label" style={{ color: 'var(--mughal-gold)' }}>// Core Competencies</div>
          <h2 className="section-title">Engineering Arsenal</h2>
          
          <div className="bento-grid" style={{ marginTop: '3rem' }}>
            
            <div className="bento-cell bento-span-6" style={{ background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.1), transparent)' }}>
              <div style={{ color: 'var(--mughal-gold)', marginBottom: '1rem' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Systems Architecture</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Building resilient microservices, high-throughput APIs, and distributed edge infrastructure using Node.js, Next.js, and PostgreSQL.</p>
            </div>

            <div className="bento-cell bento-span-6" style={{ background: 'linear-gradient(135deg, rgba(138, 43, 226, 0.1), transparent)' }}>
              <div style={{ color: 'var(--punchy-violet)', marginBottom: '1rem' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Modern Frontend</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Crafting dynamic, glassmorphic interfaces and responsive web applications using React, Framer Motion, and Tailwind CSS.</p>
            </div>

            <div className="bento-cell bento-span-8" style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
              <div style={{ color: 'var(--text-white)', marginBottom: '1rem' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>AI & Machine Learning</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Integrating advanced LLM inference pipelines, RAG systems, and Stable Diffusion models into production-ready web platforms using Python and LangChain.</p>
            </div>

            <div className="bento-cell bento-span-4" style={{ background: 'rgba(255, 255, 255, 0.02)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
              <h3 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-white)' }}>99.9%</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Target Uptime on Deployed Services</p>
            </div>
            
          </div>
        </motion.div>
      </section>

      {/* ── Quick Contact Block ── */}
      <section style={{ padding: '80px 24px', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-sans)', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--text-white)' }}>
            Ready to scale?
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '3rem', lineHeight: 1.8 }}>
            Whether you need a robust distributed system, an optimized ML inference pipeline, or a polished full-stack application, I'm available for engineering roles and collaborations.
          </p>
          <Link to="/contact" className="btn btn-primary" style={{ background: 'var(--mughal-gold)', color: '#111', fontSize: '1rem', padding: '1rem 2rem' }}>
            Initiate Contact →
          </Link>
        </motion.div>
      </section>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blink { 50% { opacity: 0; } }
        @media (max-width: 1000px) {
          .hero-wrap { flex-direction: column-reverse !important; justify-content: center !important; }
          .hero-wrap > div { text-align: center !important; align-items: center !important; }
          .hero-wrap .btn-group { justify-content: center !important; }
          .hero-wrap .section-sub { margin-left: auto; margin-right: auto; }
          .hero-wrap h1 { text-align: center; }
          .hero-wrap > div > div[style*="fontFamily: var(--font-mono)"] { justify-content: center !important; }
        }
      `}} />
    </motion.div>
  );
}
