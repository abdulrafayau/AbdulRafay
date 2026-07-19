import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Toast({ message, duration = 3000, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) setTimeout(onClose, 400); // Wait for transition out
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  return (
    <AnimatePresence>
      {visible && message && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9, x: '-50%' }}
          animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
          exit={{ opacity: 0, y: 20, scale: 0.9, x: '-50%' }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          style={{
            position: 'fixed',
            bottom: '2rem',
            left: '50%',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-soft)',
            borderRadius: 'var(--r-md)',
            boxShadow: 'var(--shadow-md)',
            overflow: 'hidden',
            zIndex: 99999,
            minWidth: '350px'
          }}
        >
          {/* Mac Header */}
          <div style={{ display: 'flex', gap: '8px', padding: '10px 14px', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border-soft)' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
          </div>
          {/* Body */}
          <div style={{ padding: '1.25rem 1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.95rem', color: 'var(--mughal-gold)' }}>
            &gt; {message}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
