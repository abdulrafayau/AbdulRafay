import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useStore';

export function Navigation({ onCtaClick, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isLoggedIn = useAuth();
  const isActive = (path) => location.pathname === path ? { color: 'var(--text-white)' } : {};

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav className="nav">
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          <img src="/sign.png" alt="AR Logo" style={{ height: '24px', filter: 'invert(1)', mixBlendMode: 'screen', opacity: 0.9, marginRight: '8px', display: 'inline-block', verticalAlign: 'middle' }} />
          Abdul Rafay
        </Link>
        <ul className="nav-links">
          <li><Link to="/about" style={isActive('/about')}>About</Link></li>
          <li><Link to="/projects" style={isActive('/projects')}>Projects</Link></li>
          <li><Link to="/education" style={isActive('/education')}>Education</Link></li>
          <li><Link to="/experience" style={isActive('/experience')}>Experience</Link></li>
          <li><Link to="/contact" style={isActive('/contact')}>Contact</Link></li>
          {isLoggedIn && (
            <li>
              <button onClick={onLogout} style={{ color: 'var(--red)', fontSize: '0.8125rem' }}>
                Logout
              </button>
            </li>
          )}
        </ul>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <a 
            href="/cv.pdf" 
            download="Abdul_Rafay_CV.pdf"
            title="Download CV"
            style={{ display: 'flex', alignItems: 'center', color: 'var(--text-white)', transition: 'color 0.3s' }}
            onMouseOver={e=>e.currentTarget.style.color='var(--mughal-gold)'} 
            onMouseOut={e=>e.currentTarget.style.color='var(--text-white)'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          </a>
          <Link to="/contact" className="nav-cta" onClick={() => { closeMenu(); onCtaClick && onCtaClick(); }}>
            Let's Connect
          </Link>
          
          {/* Hamburger Toggle */}
          <button className="mobile-menu-btn" onClick={toggleMenu}>
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Link to="/" onClick={closeMenu}>Home</Link>
            <Link to="/about" onClick={closeMenu}>About</Link>
            <Link to="/projects" onClick={closeMenu}>Projects</Link>
            <Link to="/education" onClick={closeMenu}>Education</Link>
            <Link to="/experience" onClick={closeMenu}>Experience</Link>
            <Link to="/contact" onClick={closeMenu}>Contact</Link>
            {isLoggedIn && (
              <button onClick={() => { closeMenu(); onLogout(); }} style={{ color: 'var(--red)', textAlign: 'left', fontSize: '1.25rem', fontWeight: 500 }}>Logout</button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
