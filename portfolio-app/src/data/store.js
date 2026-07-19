// ============================================================
//  Central Data Store — localStorage-backed, event-driven
//  All mutations emit a 'portfolio-data-change' CustomEvent
// ============================================================

const CHANGE_EVENT = 'portfolio-data-change';

const emit = (key) => window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: { key } }));

export const DB = {
  get: (key) => {
    try { return JSON.parse(localStorage.getItem(`portfolio_${key}`) || 'null'); }
    catch { return null; }
  },
  set: (key, val) => {
    localStorage.setItem(`portfolio_${key}`, JSON.stringify(val));
    emit(key);
  },
  subscribe: (cb) => {
    window.addEventListener(CHANGE_EVENT, cb);
    return () => window.removeEventListener(CHANGE_EVENT, cb);
  },
};

// ─── Default seed data ───────────────────────────────────────
const seed = {
  projects: [
    {
      id: 1, num: '001', featured: true,
      title: 'E-Commerce Platform with AI Recommendations',
      image: '/ecommerce_mockup.png',
      problem: 'Fragmented purchasing flows and static product discovery resulting in low conversion rates.',
      solution: 'Engineered a Next.js edge storefront with real-time collaborative-filtering recommendations. Transactional routing cut checkout steps by 40%.',
      impact: ['3× conversion lift', '99.9% uptime', '<1 s load time'],
      tags: ['Next.js', 'Node.js', 'PostgreSQL', 'AI/ML'],
      link: 'https://github.com/abdulrafayau',
      color: 'from-indigo-950 to-violet-950',
    },
    {
      id: 2, num: '002', featured: false,
      title: 'Real-Time Cryptographic Chat',
      image: '/chat_mockup.png',
      problem: 'Latency spikes and lack of end-to-end encryption in message exchanges.',
      solution: 'Built a WebSocket microservice using Socket.io, Redis adapter scaling, and AES-GCM client-side encryption.',
      impact: ['<50 ms latency', 'E2E encrypted', '10k concurrent'],
      tags: ['React', 'Socket.io', 'Redis', 'AES-GCM'],
      link: 'https://github.com/abdulrafayau',
      color: 'from-slate-950 to-cyan-950',
    },
    {
      id: 3, num: '003', featured: false,
      title: 'Algorithmic Art Generator',
      image: '/art_generator_mockup.png',
      problem: 'Slow inference rendering and complex API layers for customized vector artwork styles.',
      solution: 'Async task queue in FastAPI linking Stable Diffusion weights; blob caching achieved 3× speed improvement.',
      impact: ['3× faster inference', 'Async queue', 'Blob cache'],
      tags: ['Python', 'FastAPI', 'React', 'Stable Diffusion'],
      link: 'https://github.com/abdulrafayau',
      color: 'from-purple-950 to-pink-950',
    },
    {
      id: 4, num: '004', featured: false,
      title: 'Study Companion RAG Agent',
      image: '',
      problem: 'LLM hallucination and context-size restrictions when ingesting long textbooks or PDFs.',
      solution: 'RAG pipeline using LangChain; text vectors embedded into local collections for precise, citation-backed answers.',
      impact: ['95% accuracy', 'No hallucination', 'Multi-doc support'],
      tags: ['Python', 'LangChain', 'React', 'Vector DB'],
      link: 'https://github.com/abdulrafayau',
      color: 'from-emerald-950 to-teal-950',
    },
    {
      id: 5, num: '005', featured: false,
      title: 'Secure Session Microservice',
      image: '',
      problem: 'High latency overhead for database session lookups on centralized authentication.',
      solution: 'JWT authorization backed by in-memory Redis blacklist for instant token revocation without DB round-trips.',
      impact: ['<5 ms auth check', '100% revocable', 'Zero-DB auth'],
      tags: ['Node.js', 'Redis', 'JWT', 'Microservice'],
      link: 'https://github.com/abdulrafayau',
      color: 'from-amber-950 to-orange-950',
    },
    {
      id: 6, num: '006', featured: false,
      title: 'WebGL Frequency Visualiser',
      image: '',
      problem: 'CPU bottlenecks during live frequency analysis rendering thousands of canvas objects.',
      solution: 'Custom GLSL fragment shaders in Three.js with Web Audio API buffers — particle physics offloaded to GPU.',
      impact: ['GPU-accelerated', '60 fps solid', 'Live audio sync'],
      tags: ['WebGL', 'Three.js', 'GLSL', 'Web Audio API'],
      link: 'https://github.com/abdulrafayau',
      color: 'from-blue-950 to-indigo-950',
    },
  ],

  experiences: [
    {
      id: 1,
      company: 'Gudaz', role: 'CEO & Founder', period: '2023 – Present', type: 'Founder',
      description: 'Founded and direct international online calligraphy contests. Built platform infrastructure and community management systems serving artists across 15+ countries.',
      tags: ['Leadership', 'Product Strategy', 'Community'],
    },
    {
      id: 2,
      company: 'CanvasGali', role: 'Founder & Full-Stack Developer', period: '2024 – Present', type: 'Founder',
      description: 'Building an art-focused platform ecosystem for visual artists to showcase, connect, and monetize work. End-to-end development with React, Node.js, and PostgreSQL.',
      tags: ['React', 'Node.js', 'PostgreSQL', 'Product Design'],
    },
    {
      id: 3,
      company: 'Freelance', role: 'Full-Stack Developer', period: '2022 – Present', type: 'Freelance',
      description: 'Delivered end-to-end web applications for e-commerce, SaaS, and content management clients. Specialised in scalable backend architecture and performant frontend interfaces.',
      tags: ['Next.js', 'FastAPI', 'TypeScript', 'AWS'],
    },
  ],

  publications: [
    {
      id: 1, year: '2025',
      journal: 'IEEE Systems Journal (Draft)',
      title: 'Distributed Canvas: Real-time Collaborative Vector Graphics over Edge Architectures',
      abstract: 'This paper presents a framework for low-latency synchronisation of vector brush paths over Edge networks. We utilise Conflict-Free Replicated Data Types (CRDTs) to reconcile concurrent canvas mutations without centralised authority.',
      methodology: 'CRDT-based synchronisation with P2P WebRTC broadcast, achieving sub-30 ms reconciliation latency at 100 concurrent users.',
      link: 'https://github.com/abdulrafayau',
    },
    {
      id: 2, year: '2024',
      journal: 'International Journal of Art & Technology',
      title: 'Computational Calligraphy: Algorithmic Mimicry of Classic Nastaliq Strokes',
      abstract: 'An analysis of traditional Nastaliq script structures translated into vector Bézier formulas. We introduce an adaptive coordinate projection model mapping pen tilt and ink velocity vectors to render dynamic stroke widths.',
      methodology: 'Spline coordinate tracking → Fluid dynamic equations → SVG path extraction pipeline.',
      link: 'https://github.com/abdulrafayau',
    },
  ],

  contacts: [],

  education: [
    {
      id: 1,
      institution: 'Air University, Islamabad',
      degree: 'BS Information Technology',
      period: '2025 - 2029',
      description: 'Currently pursuing studies in Information Technology. Focusing on modern software architecture, systems engineering, and advanced computing paradigms.',
      medals: []
    }
  ],

  certifications: [
    {
      id: 1,
      title: 'Advanced AI Architectures',
      issuer: 'DeepLearning.AI',
      year: '2024',
      link: '#'
    },
    {
      id: 2,
      title: 'Cloud Security Professional',
      issuer: 'AWS',
      year: '2023',
      link: '#'
    }
  ],

  trusted_companies: [
    { id: 't1', name: 'Vercel', logoUrl: 'https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png' },
    { id: 't2', name: 'OpenAI', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg' },
    { id: 't3', name: 'Meta', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg' },
    { id: 't4', name: 'AUBIC', logoUrl: '' },
    { id: 't5', name: 'CanvasGali', logoUrl: '' }
  ],
};

// Seed only once or on version bump
export function initDB() {
  const seedVersion = 2; // Bump this to force client cache clearing
  const currentVersion = DB.get('seed_version') || 0;
  
  Object.entries(seed).forEach(([key, val]) => {
    if (!DB.get(key) || currentVersion < seedVersion) {
      DB.set(key, val);
    }
  });
  
  if (currentVersion < seedVersion) {
    DB.set('seed_version', seedVersion);
  }
}

// CRUD helpers
export const ProjectsAPI = {
  all: () => DB.get('projects') || [],
  add: (p) => { const list = ProjectsAPI.all(); list.unshift({ ...p, id: Date.now() }); DB.set('projects', list); },
  update: (p) => { DB.set('projects', ProjectsAPI.all().map(x => x.id === p.id ? p : x)); },
  remove: (id) => { DB.set('projects', ProjectsAPI.all().filter(x => x.id !== id)); },
};

export const ExperiencesAPI = {
  all: () => DB.get('experiences') || [],
  add: (e) => { const list = ExperiencesAPI.all(); list.unshift({ ...e, id: Date.now() }); DB.set('experiences', list); },
  update: (e) => { DB.set('experiences', ExperiencesAPI.all().map(x => x.id === e.id ? e : x)); },
  remove: (id) => { DB.set('experiences', ExperiencesAPI.all().filter(x => x.id !== id)); },
};

export const PublicationsAPI = {
  all: () => DB.get('publications') || [],
  add: (p) => { const list = PublicationsAPI.all(); list.unshift({ ...p, id: Date.now() }); DB.set('publications', list); },
  update: (p) => { DB.set('publications', PublicationsAPI.all().map(x => x.id === p.id ? p : x)); },
  remove: (id) => { DB.set('publications', PublicationsAPI.all().filter(x => x.id !== id)); },
};

export const ContactsAPI = {
  all: () => DB.get('contacts') || [],
  add: (c) => { const list = ContactsAPI.all(); list.unshift({ ...c, id: Date.now(), timestamp: new Date().toISOString(), read: false }); DB.set('contacts', list); },
  markRead: (id) => { DB.set('contacts', ContactsAPI.all().map(x => x.id === id ? { ...x, read: true } : x)); },
  remove: (id) => { DB.set('contacts', ContactsAPI.all().filter(x => x.id !== id)); },
  clearRead: () => { DB.set('contacts', ContactsAPI.all().filter(x => !x.read)); },
};

export const EducationAPI = {
  all: () => DB.get('education') || [],
  add: (e) => { const list = EducationAPI.all(); list.unshift({ ...e, id: Date.now() }); DB.set('education', list); },
  update: (e) => { DB.set('education', EducationAPI.all().map(x => x.id === e.id ? e : x)); },
  remove: (id) => { DB.set('education', EducationAPI.all().filter(x => x.id !== id)); },
};

export const CertificationsAPI = {
  all: () => DB.get('certifications') || [],
  add: (c) => { const list = CertificationsAPI.all(); list.unshift({ ...c, id: Date.now() }); DB.set('certifications', list); },
  update: (c) => { DB.set('certifications', CertificationsAPI.all().map(x => x.id === c.id ? c : x)); },
  remove: (id) => { DB.set('certifications', CertificationsAPI.all().filter(x => x.id !== id)); },
};

export const StatsAPI = {
  get: () => DB.get('stats') || { years: '1 Year+', countries: '3+', projects: '17+' },
  update: (s) => DB.set('stats', s),
};

export const TrustedAPI = {
  all: () => DB.get('trusted_companies') || [],
  add: (c) => { const list = TrustedAPI.all(); list.push({ ...c, id: Date.now().toString() }); DB.set('trusted_companies', list); },
  delete: (id) => { DB.set('trusted_companies', TrustedAPI.all().filter(x => x.id !== id)); },
};

export const AuthAPI = {
  EXPECTED_HASH: 'c6fe1e0c70ae1e223d5ebb7e4a33c6309bbcb6addb8afa14003a5aef7a1e255c', // hash for rafay@admin:rafay@portfolio2006
  login: async (username, password) => {
    try {
      const msgUint8 = new TextEncoder().encode(username + ':' + password);
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      
      if (hashHex === AuthAPI.EXPECTED_HASH) {
        sessionStorage.setItem('pa', '1');
        window.dispatchEvent(new Event('auth-change'));
        return true;
      }
      return false;
    } catch {
      return false;
    }
  },
  logout: () => {
    sessionStorage.removeItem('pa');
    window.dispatchEvent(new Event('auth-change'));
  },
  isLoggedIn: () => sessionStorage.getItem('pa') === '1',
};
