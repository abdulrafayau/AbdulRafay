import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const commands = [
    { id: 'home', icon: '🏠', label: 'Go to Home', action: () => navigate('/') },
    { id: 'about', icon: '👨‍💻', label: 'Go to About', action: () => navigate('/about') },
    { id: 'projects', icon: '🚀', label: 'Go to Projects', action: () => navigate('/projects') },
    { id: 'experience', icon: '💼', label: 'Go to Experience', action: () => navigate('/experience') },
    { id: 'education', icon: '🎓', label: 'Go to Education', action: () => navigate('/education') },
    { id: 'contact', icon: '✉️', label: 'Contact Me', action: () => navigate('/contact') },
    { id: 'canvasgali', icon: '🎨', label: 'Visit Canvasgali', action: () => window.open('https://canvas-gali.vercel.app/', '_blank') },
    { id: 'cv', icon: '📄', label: 'Download CV', action: () => {
        const link = document.createElement('a');
        link.href = '/cv.pdf';
        link.download = 'Abdul_Rafay_CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }},
  ];

  const filtered = commands.filter(c => c.label.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filtered.length);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filtered.length) % filtered.length);
      }
      if (e.key === 'Enter' && filtered.length > 0) {
        e.preventDefault();
        filtered[selectedIndex].action();
        onClose();
      }
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
              background: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(4px)',
              zIndex: 9999
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            style={{
              position: 'fixed', top: '15%', left: '50%', x: '-50%',
              width: '100%', maxWidth: '600px',
              background: 'var(--bg-glass-heavy)',
              border: '1px solid var(--border-soft)',
              borderRadius: 'var(--r-md)',
              boxShadow: 'var(--shadow-md)',
              overflow: 'hidden',
              zIndex: 10000,
              fontFamily: 'var(--font-sans)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-soft)' }}>
              <span style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginRight: '1rem' }}>⌘</span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search commands or jump to..."
                style={{
                  width: '100%', background: 'transparent', border: 'none',
                  color: 'var(--text-white)', fontSize: '1.25rem', outline: 'none'
                }}
              />
            </div>
            <div style={{ maxHeight: '350px', overflowY: 'auto', padding: '0.5rem' }}>
              {filtered.length === 0 ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>No results found.</div>
              ) : (
                filtered.map((cmd, idx) => (
                  <div
                    key={cmd.id}
                    onClick={() => { cmd.action(); onClose(); }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    style={{
                      padding: '1rem 1.5rem',
                      display: 'flex', alignItems: 'center', gap: '1rem',
                      cursor: 'pointer',
                      borderRadius: '8px',
                      background: idx === selectedIndex ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                      color: idx === selectedIndex ? 'var(--text-white)' : 'var(--text-secondary)',
                      transition: 'background 0.1s ease'
                    }}
                  >
                    <span style={{ fontSize: '1.25rem' }}>{cmd.icon}</span>
                    <span style={{ fontWeight: 500 }}>{cmd.label}</span>
                    {idx === selectedIndex && (
                      <span style={{ marginLeft: 'auto', fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>↵</span>
                    )}
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
