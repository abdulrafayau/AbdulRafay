export function MughalBackground() {
  const baseText1 = "React ✦ Node.js ✦ Next.js ✦ PostgreSQL ✦ System Architecture ✦ TypeScript ✦ UI/UX Design ✦ Cloud DevOps ✦ API Integration ✦ Web Security ✦ Python ✦ AI Integration ✦ ";
  const text1 = baseText1.repeat(4);
  
  const baseText2 = "Software Engineering ✦ Frontend Polish ✦ Backend Scaling ✦ Database Design ✦ Performance Optimization ✦ Technical Leadership ✦ Agile Methodologies ✦ Creative Problem Solving ✦ ";
  const text2 = baseText2.repeat(3);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        overflow: 'hidden',
        background: 'radial-gradient(circle at center, var(--bg-elevated) 0%, var(--bg-main) 100%)',
      }}
    >
      <div className="mughal-ring-container" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '200vh', height: '200vh', opacity: 0.15, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
         <svg viewBox="0 0 1000 1000" width="100%" height="100%" style={{ animation: 'spin-slow 120s linear infinite' }}>
            <defs>
              <path id="ring1" d="M 500, 500 m -400, 0 a 400,400 0 1,1 800,0 a 400,400 0 1,1 -800,0" />
            </defs>
            <text fill="var(--mughal-gold)" fontSize="16" fontFamily="var(--font-mono)" letterSpacing="4">
              <textPath href="#ring1" startOffset="0%">
                {text1}
              </textPath>
            </text>
         </svg>
      </div>

      <div className="mughal-ring-container" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '140vh', height: '140vh', opacity: 0.1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
         <svg viewBox="0 0 1000 1000" width="100%" height="100%" style={{ animation: 'spin-slow-reverse 150s linear infinite' }}>
            <defs>
              <path id="ring2" d="M 500, 500 m -300, 0 a 300,300 0 1,1 600,0 a 300,300 0 1,1 -600,0" />
            </defs>
            <text fill="var(--punchy-violet)" fontSize="20" fontFamily="var(--font-mono)" letterSpacing="6">
              <textPath href="#ring2" startOffset="0%">
                {text2}
              </textPath>
            </text>
         </svg>
      </div>
      
      {/* Subtle overlay glow */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80vw', height: '80vw',
        background: 'radial-gradient(circle, rgba(0, 229, 255, 0.05) 0%, transparent 60%)',
        opacity: 0.8,
        mixBlendMode: 'var(--blend-glow)'
      }} />
    </div>
  );
}
