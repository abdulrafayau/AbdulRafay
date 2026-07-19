import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { initDB, AuthAPI } from './data/store';
import { CustomCursor } from './components/CustomCursor';
import { MughalBackground } from './components/MughalBackground';
import { Navigation } from './components/Navigation';
import { Toast } from './components/Toast';
import { HomeView } from './views/HomeView';
import { AboutView } from './views/AboutView';
import { ProjectsView } from './views/ProjectsView';
import { EducationView } from './views/EducationView';
import { ExperienceView } from './views/ExperienceView';
import { ContactView } from './views/ContactView';
import { AdminView } from './views/AdminView';
import { CommandPalette } from './components/CommandPalette';
import { Chatbot } from './components/Chatbot';

function AnimatedRoutes({ triggerToast }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomeView showToast={triggerToast} />} />
        <Route path="/about" element={<AboutView />} />
        <Route path="/projects" element={<ProjectsView />} />
        <Route path="/education" element={<EducationView />} />
        <Route path="/experience" element={<ExperienceView />} />
        <Route path="/contact" element={<ContactView showToast={triggerToast} />} />
        <Route path="/admin" element={<AdminView showToast={triggerToast} />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [toastMsg, setToastMsg] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(() => AuthAPI.isLoggedIn());
  const [cmdOpen, setCmdOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  // Theme State Initialization
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio_theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    initDB();

    const handleCmdK = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmdOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleCmdK);

    // Aggressive Anti-Debugging Security Measures
    // 1. Disable Context Menu
    const preventContext = (e) => e.preventDefault();
    document.addEventListener('contextmenu', preventContext);

    // 2. Disable Key Combinations
    const preventKeys = (e) => {
      // F12
      if (e.keyCode === 123) e.preventDefault();
      // Ctrl+Shift+I (DevTools)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 73) e.preventDefault();
      // Ctrl+Shift+C (Element Inspector)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 67) e.preventDefault();
      // Ctrl+Shift+J (Console)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 74) e.preventDefault();
      // Ctrl+U (View Source)
      if (e.ctrlKey && e.keyCode === 85) e.preventDefault();
    };
    document.addEventListener('keydown', preventKeys);

    // 3. Override Console
    const noop = () => {};
    console.log = noop;
    console.warn = noop;
    console.error = noop;
    console.info = noop;
    console.dir = noop;
    console.table = noop;

    return () => {
      document.removeEventListener('contextmenu', preventContext);
      document.removeEventListener('keydown', preventKeys);
      window.removeEventListener('keydown', handleCmdK);
    };
  }, []);

  const triggerToast = (msg) => {
    setToastMsg(msg);
  };

  const handleLogout = () => {
    AuthAPI.logout();
    setIsLoggedIn(false);
    triggerToast('Logged out of workspace.');
  };

  const handleCtaClick = () => {
    triggerToast('Initiating connection stream...');
  };

  return (
    <BrowserRouter>
      <motion.div
        className="scroll-progress"
        style={{ scaleX: scrollYProgress }}
      />
      
      <MughalBackground />

      <Navigation
        isLoggedIn={isLoggedIn}
        onCtaClick={handleCtaClick}
        onLogout={handleLogout}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <main style={{ position: 'relative', zIndex: 10, minHeight: 'calc(100vh - 120px)' }}>
        <AnimatedRoutes triggerToast={triggerToast} />
      </main>

      <Toast message={toastMsg} onClose={() => setToastMsg('')} />

      <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />

      <Chatbot />

      <CustomCursor />

      <footer className="footer" style={{ borderTop: '1px solid var(--border-soft)', padding: '4rem 24px', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>
        <div className="footer-brand" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>AR.DEV // SYSTEMS & UI</div>
        
        <div className="footer-socials" style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
          <a href="https://github.com/abdulrafayau" target="_blank" rel="noreferrer" className="social-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          </a>
          <a href="https://www.linkedin.com/in/abdulrafayqar/" target="_blank" rel="noreferrer" className="social-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
        </div>

        <div className="footer-links" style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2rem', fontFamily: 'var(--font-mono)' }}>
          <a href="/about" style={{ textDecoration: 'none' }}>About</a>
          <a href="/projects" style={{ textDecoration: 'none' }}>Work</a>
          <a href="/contact" style={{ textDecoration: 'none' }}>Contact</a>
        </div>

        <div className="footer-copy">© {new Date().getFullYear()} Abdul Rafay. All rights reserved.</div>
      </footer>
    </BrowserRouter>
  );
}
