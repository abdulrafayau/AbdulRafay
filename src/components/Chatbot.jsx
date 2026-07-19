import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ContactsAPI } from '../data/store';

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0); 
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hi! I'm Rafay's Assistant. Who am I speaking with?" }
  ]);
  
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: 'user', text: inputValue }];
    setMessages(newMessages);
    const userInput = inputValue;
    setInputValue('');

    // Process logic based on step
    setTimeout(() => {
      if (step === 0) {
        setFormData(prev => ({ ...prev, name: userInput }));
        setMessages(m => [...m, { sender: 'bot', text: `Nice to meet you, ${userInput}! What's the best email to reach you at?` }]);
        setStep(1);
      } else if (step === 1) {
        setFormData(prev => ({ ...prev, email: userInput }));
        setMessages(m => [...m, { sender: 'bot', text: "Got it. How can we help you today? (e.g. Hiring, Contract work, General inquiry)" }]);
        setStep(2);
      } else if (step === 2) {
        ContactsAPI.add({
          name: formData.name,
          email: formData.email,
          subject: 'Lead from Chatbot',
          message: userInput,
        });
        setMessages(m => [...m, { sender: 'bot', text: "Thanks! I've logged your request into AR's secure database. He will be in touch shortly." }]);
        setStep(3);
      }
    }, 600); // Simulate bot typing delay
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'var(--bg-glass-md)',
          backdropFilter: 'blur(10px)',
          border: '1px solid var(--border-soft)',
          boxShadow: 'var(--shadow-md)',
          color: 'var(--text-white)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 10000,
        }}
      >
        {isOpen ? (
          <span style={{ fontSize: '1.25rem' }}>✕</span>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="ios-glass"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            style={{
              position: 'fixed',
              bottom: '90px',
              right: '24px',
              width: 'min(350px, calc(100vw - 48px))',
              height: 'min(500px, calc(100vh - 120px))',
              borderRadius: 'var(--r-md)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              zIndex: 9999,
            }}
          >
            {/* macOS Header */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              background: 'rgba(255,255,255,0.02)',
              borderBottom: '1px solid var(--border-soft)'
            }}>
              <div style={{ display: 'flex', gap: '8px', padding: '10px 14px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
              </div>
              <div style={{ padding: '0 1.25rem 1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text-white)' }}>Rafay's Assistant</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--mughal-gold)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '3px', background: 'var(--mughal-gold)', display: 'inline-block' }}></span>
                    Online
                  </div>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div style={{
              flex: 1,
              padding: '1.25rem',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              position: 'relative'
            }}>
              {/* Spinning Gear Background */}
              <div className="gear-spin" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '150px', opacity: 0.03, pointerEvents: 'none' }}>
                ⚙️
              </div>
              {messages.map((msg, idx) => (
                <div key={idx} style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  background: msg.sender === 'user' ? 'linear-gradient(135deg, var(--mughal-gold), var(--punchy-violet))' : 'var(--bg-card)',
                  color: msg.sender === 'user' ? '#fff' : 'var(--text-white)',
                  padding: '0.8rem 1rem',
                  borderRadius: msg.sender === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  maxWidth: '85%',
                  fontSize: '0.95rem',
                  lineHeight: 1.5,
                  border: msg.sender === 'bot' ? '1px solid var(--border-soft)' : 'none',
                  boxShadow: msg.sender === 'user' ? '0 4px 15px rgba(138, 43, 226, 0.3)' : 'none'
                }}>
                  {msg.text}
                </div>
              ))}
              <div ref={endOfMessagesRef} />
            </div>

            {/* Input Area */}
            <div style={{
              padding: '1rem',
              borderTop: '1px solid var(--border-soft)',
              background: 'rgba(0,0,0,0.2)',
              display: 'flex',
              gap: '0.5rem'
            }}>
              <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={step >= 3 ? "Conversation ended." : "Type a message..."}
                disabled={step >= 3}
                style={{
                  flex: 1,
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-soft)',
                  borderRadius: '20px',
                  padding: '0.75rem 1rem',
                  color: 'var(--text-white)',
                  outline: 'none',
                  fontFamily: 'var(--font-sans)',
                }}
              />
              <button
                onClick={handleSend}
                disabled={step >= 3 || !inputValue.trim()}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '22px',
                  background: 'var(--text-white)',
                  color: '#000',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: step >= 3 || !inputValue.trim() ? 'not-allowed' : 'pointer',
                  opacity: step >= 3 || !inputValue.trim() ? 0.5 : 1
                }}
              >
                ↑
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
