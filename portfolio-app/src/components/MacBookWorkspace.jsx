import { motion } from 'framer-motion';

export function MacBookWorkspace() {
  return (
    <div className="macbook-container">
      <div className="macbook">
        {/* Animated Screen Lid */}
        <motion.div 
          className="mac-screen-lid"
          initial={{ rotateX: 90 }}
          animate={{ rotateX: 0 }}
          transition={{ duration: 1.5, type: 'spring', bounce: 0.3, delay: 0.2 }}
        >
          <div className="mac-screen-bezel">
            <div className="mac-camera"></div>
            <div className="mac-screen-display">
              
              {/* Display Content: A sleek code editor or terminal inside the mac */}
              <div style={{ padding: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#d4d4d4', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: '6px', marginBottom: '1.5rem' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }}></div>
                </div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 1 }}
                >
                  <div style={{ color: '#569cd6', marginBottom: '0.5rem' }}>import {'{'} Developer {'}'} from 'abdul-rafay';</div>
                  <div style={{ color: '#569cd6', marginBottom: '1rem' }}>import {'{'} AI_Models {'}'} from 'neural-nets';</div>
                  
                  <div style={{ color: '#ce9178', marginBottom: '0.5rem' }}>// Initialize Workspace</div>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <span style={{ color: '#4fc1ff' }}>const</span> profile = new Developer({'{\n'}
                    <span style={{ paddingLeft: '1.5rem', color: '#9cdcfe' }}>role:</span> <span style={{ color: '#ce9178' }}>'Full Stack Web & AI/ML Engineer'</span>,{'\n'}
                    <span style={{ paddingLeft: '1.5rem', color: '#9cdcfe' }}>focus:</span> <span style={{ color: '#ce9178' }}>'Scalable Architectures & Interactive WebGL'</span>{'\n'}
                    {'});'}
                  </div>
                  
                  <div style={{ marginTop: '1rem' }}>
                    <span style={{ color: '#dcdcaa' }}>profile</span>.deploy();
                    <motion.span 
                      animate={{ opacity: [1, 0] }} 
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      style={{ borderRight: '2px solid #fff', marginLeft: '2px' }}
                    />
                  </div>
                </motion.div>
              </div>

            </div>
          </div>
        </motion.div>
        
        {/* Keyboard Base */}
        <div className="mac-base"></div>
      </div>
    </div>
  );
}
