import { useState, useEffect } from 'react';
import { useStore, useAuth } from '../hooks/useStore';
import {
  AuthAPI,
  ProjectsAPI,
  ExperiencesAPI,
  PublicationsAPI,
  ContactsAPI,
  EducationAPI,
  CertificationsAPI,
  StatsAPI,
  TrustedAPI
} from '../data/store';

export function AdminView({ showToast }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const isLoggedIn = useAuth();

  // Selected sub-tabs: 'dashboard' | 'contacts' | 'projects' | 'experiences' | 'publications' | 'education' | 'certifications' | 'stats'
  const [activeTab, setActiveTab] = useState('dashboard');

  // Query database items using the store subscription hook
  const projects = useStore('projects') || [];
  const experiences = useStore('experiences') || [];
  const publications = useStore('publications') || [];
  const education = useStore('education') || [];
  const certifications = useStore('certifications') || [];
  const contacts = useStore('contacts') || [];

  // Message Detail Overlay state
  const [selectedContact, setSelectedContact] = useState(null);

  // Edit/Add Modals State
  const [showProjModal, setShowProjModal] = useState(false);
  const [projForm, setProjForm] = useState({ id: '', num: '', title: '', problem: '', solution: '', image: '', link: '', tags: '', featured: 'false' });

  const [showExpModal, setShowExpModal] = useState(false);
  const [expForm, setExpForm] = useState({ id: '', company: '', role: '', period: '', description: '', tags: '', type: 'Freelance' });

  const [showPubModal, setShowPubModal] = useState(false);
  const [pubForm, setPubForm] = useState({ id: '', journal: '', year: '', title: '', abstract: '', link: '' });

  const [showEduModal, setShowEduModal] = useState(false);
  const [eduForm, setEduForm] = useState({ id: '', institution: '', degree: '', period: '', description: '', medals: '' });

  const [showCertModal, setShowCertModal] = useState(false);
  const [certForm, setCertForm] = useState({ id: '', title: '', issuer: '', year: '', link: '' });

  // Stats Form State
  const [statsForm, setStatsForm] = useState({ years: '', countries: '', projects: '' });

  const trusted = useStore('trusted_companies') || [];
  const [showTrustModal, setShowTrustModal] = useState(false);
  const [trustForm, setTrustForm] = useState({ id: '', name: '', logoUrl: '' });

  const saveTrusted = (e) => {
    e.preventDefault();
    if (!trustForm.name || !trustForm.logoUrl) return;
    if (trustForm.id) {
      // not implementing update for now, just delete and add
    } else {
      TrustedAPI.add({ name: trustForm.name, logoUrl: trustForm.logoUrl });
    }
    showToast('Partner saved.');
    setShowTrustModal(false);
  };

  const deleteTrusted = (id) => {
    if (window.confirm('Delete this partner?')) {
      TrustedAPI.delete(id);
      showToast('Partner removed.');
    }
  };
  
  useEffect(() => {
    if (isLoggedIn) {
      setStatsForm(StatsAPI.get());
    }
  }, [isLoggedIn]);

  // Handle Login Authentication
  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await AuthAPI.login(username, password);
    if (success) {
      showToast('Logged into system core dashboard.');
      setUsername('');
      setPassword('');
    } else {
      showToast('Authentication failed. Invalid token passkey.');
    }
  };

  const handleLogout = () => {
    AuthAPI.logout();
    showToast('Logged out of admin session.');
    window.location.reload();
  };

  // Contacts operations
  const readContact = (c) => {
    ContactsAPI.markRead(c.id);
    setSelectedContact(c);
  };

  const deleteContact = (id) => {
    if (window.confirm('Delete this contact form submission record?')) {
      ContactsAPI.remove(id);
      showToast('Message record removed.');
    }
  };

  const clearReadContacts = () => {
    if (window.confirm('Remove all read message records from inbox?')) {
      ContactsAPI.clearRead();
      showToast('Read messages cleared.');
    }
  };

  // Save actions
  const saveProject = (e) => {
    e.preventDefault();
    if (!projForm.title) return;
    const item = {
      ...projForm,
      featured: projForm.featured === 'true',
      tags: projForm.tags.split(',').map(x => x.trim()).filter(Boolean)
    };
    if (projForm.id) {
      ProjectsAPI.update({ ...item, id: Number(projForm.id) });
      showToast('Project updated successfully.');
    } else {
      ProjectsAPI.add({ ...item, num: projForm.num || `${projects.length + 1}`.padStart(3, '0') });
      showToast('New project created.');
    }
    setShowProjModal(false);
  };

  const openProjectEdit = (p) => {
    setProjForm({
      id: p.id,
      num: p.num || '',
      title: p.title,
      problem: p.problem,
      solution: p.solution,
      image: p.image || '',
      link: p.link || '',
      tags: p.tags?.join(', ') || '',
      featured: p.featured ? 'true' : 'false'
    });
    setShowProjModal(true);
  };

  const deleteProject = (id) => {
    if (window.confirm('Delete this project?')) {
      ProjectsAPI.remove(id);
      showToast('Project removed.');
    }
  };

  // Experiences Operations
  const saveExperience = (e) => {
    e.preventDefault();
    if (!expForm.company || !expForm.role) return;
    const item = {
      ...expForm,
      tags: expForm.tags.split(',').map(x => x.trim()).filter(Boolean)
    };
    if (expForm.id) {
      ExperiencesAPI.update({ ...item, id: Number(expForm.id) });
      showToast('Work history updated.');
    } else {
      ExperiencesAPI.add(item);
      showToast('New job position logged.');
    }
    setShowExpModal(false);
  };

  const openExpEdit = (exp) => {
    setExpForm({
      id: exp.id,
      company: exp.company,
      role: exp.role,
      period: exp.period,
      description: exp.description,
      tags: exp.tags?.join(', ') || '',
      type: exp.type || 'Freelance'
    });
    setShowExpModal(true);
  };

  const deleteExperience = (id) => {
    if (window.confirm('Delete this experience?')) {
      ExperiencesAPI.remove(id);
      showToast('Experience log removed.');
    }
  };

  // Publications Operations
  const savePublication = (e) => {
    e.preventDefault();
    if (!pubForm.title || !pubForm.journal) return;
    if (pubForm.id) {
      PublicationsAPI.update({ ...pubForm, id: Number(pubForm.id) });
      showToast('Research entry updated.');
    } else {
      PublicationsAPI.add(pubForm);
      showToast('New research publication draft logged.');
    }
    setShowPubModal(false);
  };

  const openPubEdit = (pub) => {
    setPubForm({
      id: pub.id,
      journal: pub.journal,
      year: pub.year,
      title: pub.title,
      abstract: pub.abstract,
      link: pub.link || ''
    });
    setShowPubModal(true);
  };

  const deletePublication = (id) => {
    if (window.confirm('Delete this publication listing?')) {
      PublicationsAPI.remove(id);
      showToast('Publication item deleted.');
    }
  };

  // Education Operations
  const saveEducation = (e) => {
    e.preventDefault();
    if (!eduForm.institution || !eduForm.degree) return;
    const item = {
      ...eduForm,
      medals: eduForm.medals ? eduForm.medals.split(',').map(x => x.trim()).filter(Boolean) : []
    };
    if (eduForm.id) {
      EducationAPI.update({ ...item, id: Number(eduForm.id) });
      showToast('Education record updated.');
    } else {
      EducationAPI.add(item);
      showToast('New education record logged.');
    }
    setShowEduModal(false);
  };

  const openEduEdit = (edu) => {
    setEduForm({
      id: edu.id,
      institution: edu.institution,
      degree: edu.degree,
      period: edu.period,
      description: edu.description || '',
      medals: edu.medals?.join(', ') || ''
    });
    setShowEduModal(true);
  };

  const deleteEducation = (id) => {
    if (window.confirm('Delete this education record?')) {
      EducationAPI.remove(id);
      showToast('Education record removed.');
    }
  };

  // Certifications Operations
  const saveCertification = (e) => {
    e.preventDefault();
    if (!certForm.title || !certForm.issuer) return;
    if (certForm.id) {
      CertificationsAPI.update({ ...certForm, id: Number(certForm.id) });
      showToast('Certification updated.');
    } else {
      CertificationsAPI.add(certForm);
      showToast('New certification logged.');
    }
    setShowCertModal(false);
  };

  const openCertEdit = (cert) => {
    setCertForm({
      id: cert.id,
      title: cert.title,
      issuer: cert.issuer,
      year: cert.year,
      link: cert.link || ''
    });
    setShowCertModal(true);
  };

  const deleteCertification = (id) => {
    if (window.confirm('Delete this certification?')) {
      CertificationsAPI.remove(id);
      showToast('Certification removed.');
    }
  };

  // Auth Guard Gate
  if (!isLoggedIn) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', padding: '24px' }}>
        <div className="ios-glass" style={{ padding: '2.5rem', borderRadius: 'var(--r-xl)', width: '400px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem', letterSpacing: '-0.02em', color: 'var(--text-white)' }}>Admin Core Gate</h2>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>Admin Identity</label>
              <input
                type="password"
                placeholder="••••••••"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>Passcode Key</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn-submit">Enter Platform Dashboard</button>
          </form>
        </div>
      </div>
    );
  }

  // Dashboard calculations
  const unreadCount = contacts.filter(c => !c.read).length;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', paddingTop: '100px' }}>
      
      {/* ─── SIDEBAR NAV ─── */}
      <div style={{ position: 'sticky', top: '100px', height: 'calc(100vh - 100px)', overflowY: 'auto', width: '250px', borderRight: '1px solid var(--border-soft)', padding: '1.5rem', background: 'var(--bg-main)', flexShrink: 0 }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-tertiary)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '1rem' }}>
          Navigation
        </div>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li>
            <button
              onClick={() => setActiveTab('dashboard')}
              style={{ width: '100%', textAlign: 'left', padding: '0.5rem 0.75rem', borderRadius: 'var(--r-sm)', fontSize: '0.875rem', color: activeTab === 'dashboard' ? 'var(--text-white)' : 'var(--text-secondary)', background: activeTab === 'dashboard' ? 'var(--bg-glass-md)' : 'transparent' }}
            >
              📊 System Dashboard
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('contacts')}
              style={{ width: '100%', textAlign: 'left', padding: '0.5rem 0.75rem', borderRadius: 'var(--r-sm)', fontSize: '0.875rem', color: activeTab === 'contacts' ? 'var(--text-white)' : 'var(--text-secondary)', background: activeTab === 'contacts' ? 'var(--bg-glass-md)' : 'transparent', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <span>📬 Inbound Queries</span>
              {unreadCount > 0 && <span style={{ background: 'var(--apple-blue)', color: 'white', fontSize: '0.6875rem', padding: '0.1rem 0.4rem', borderRadius: '100px' }}>{unreadCount}</span>}
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('projects')}
              style={{ width: '100%', textAlign: 'left', padding: '0.5rem 0.75rem', borderRadius: 'var(--r-sm)', fontSize: '0.875rem', color: activeTab === 'projects' ? 'var(--text-white)' : 'var(--text-secondary)', background: activeTab === 'projects' ? 'var(--bg-glass-md)' : 'transparent' }}
            >
              🗂️ Project Portfolios
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('experiences')}
              style={{ width: '100%', textAlign: 'left', padding: '0.5rem 0.75rem', borderRadius: 'var(--r-sm)', fontSize: '0.875rem', color: activeTab === 'experiences' ? 'var(--text-white)' : 'var(--text-secondary)', background: activeTab === 'experiences' ? 'var(--bg-glass-md)' : 'transparent' }}
            >
              💼 Job Work History
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('publications')}
              style={{ width: '100%', textAlign: 'left', padding: '0.5rem 0.75rem', borderRadius: 'var(--r-sm)', fontSize: '0.875rem', color: activeTab === 'publications' ? 'var(--text-white)' : 'var(--text-secondary)', background: activeTab === 'publications' ? 'var(--bg-glass-md)' : 'transparent' }}
            >
              📄 Research Drafts
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('education')}
              style={{ width: '100%', textAlign: 'left', padding: '0.5rem 0.75rem', borderRadius: 'var(--r-sm)', fontSize: '0.875rem', color: activeTab === 'education' ? 'var(--text-white)' : 'var(--text-secondary)', background: activeTab === 'education' ? 'var(--bg-glass-md)' : 'transparent' }}
            >
              🎓 Education & Medals
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('certifications')}
              style={{ width: '100%', textAlign: 'left', padding: '0.5rem 0.75rem', borderRadius: 'var(--r-sm)', fontSize: '0.875rem', color: activeTab === 'certifications' ? 'var(--text-white)' : 'var(--text-secondary)', background: activeTab === 'certifications' ? 'var(--bg-glass-md)' : 'transparent' }}
            >
              📜 Certifications
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('stats')}
              style={{ width: '100%', textAlign: 'left', padding: '0.5rem 0.75rem', borderRadius: 'var(--r-sm)', fontSize: '0.875rem', color: activeTab === 'stats' ? 'var(--text-white)' : 'var(--text-secondary)', background: activeTab === 'stats' ? 'var(--bg-glass-md)' : 'transparent' }}
            >
              ⚙️ Home Stats Config
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('partners')}
              style={{ width: '100%', textAlign: 'left', padding: '0.5rem 0.75rem', borderRadius: 'var(--r-sm)', fontSize: '0.875rem', color: activeTab === 'partners' ? 'var(--text-white)' : 'var(--text-secondary)', background: activeTab === 'partners' ? 'var(--bg-glass-md)' : 'transparent' }}
            >
              🤝 Trusted Partners
            </button>
          </li>
        </ul>
        <button
          onClick={handleLogout}
          style={{ width: '100%', padding: '0.5rem 0.75rem', marginTop: '3rem', border: '1px solid var(--border-soft)', borderRadius: 'var(--r-sm)', color: 'var(--red)', fontSize: '0.8125rem', fontWeight: 500 }}
        >
          Logout Session
        </button>
      </div>

      {/* ─── WORKSPACE CONTENT ─── */}
      <div style={{ flex: 1, padding: '2.5rem 3rem', overflowY: 'auto', minHeight: '100%' }}>
        
        {/* TAB 1: SYSTEM OVERVIEW */}
        {activeTab === 'dashboard' && (
          <div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '2rem' }}>Administrative Control Console</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2.5rem' }}>
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-soft)', padding: '1.25rem', borderRadius: 'var(--r-md)' }}>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}>INBOUND MESSAGES</div>
                <div style={{ fontSize: '2rem', fontWeight: 700, marginTop: '0.5rem' }}>{contacts.length}</div>
              </div>
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-soft)', padding: '1.25rem', borderRadius: 'var(--r-md)' }}>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}>PROJECT LISTINGS</div>
                <div style={{ fontSize: '2rem', fontWeight: 700, marginTop: '0.5rem' }}>{projects.length}</div>
              </div>
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-soft)', padding: '1.25rem', borderRadius: 'var(--r-md)' }}>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}>LOGGED EXPERIENCES</div>
                <div style={{ fontSize: '2rem', fontWeight: 700, marginTop: '0.5rem' }}>{experiences.length}</div>
              </div>
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-soft)', padding: '1.25rem', borderRadius: 'var(--r-md)' }}>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}>PUBLICATIONS</div>
                <div style={{ fontSize: '2rem', fontWeight: 700, marginTop: '0.5rem' }}>{publications.length}</div>
              </div>
            </div>

            <div className="ios-glass" style={{ padding: '2rem', borderRadius: 'var(--r-md)' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-white)' }}>System Status</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                All systems active. Local client-side CRUD engine synced with active observer hooks. Authenticated session cookies restricted to sessionStorage parameters.
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: INBOX QUERIES */}
        {activeTab === 'contacts' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.03em' }}>Inbound Form Messages</h2>
              <button className="btn btn-ghost" onClick={clearReadContacts}>Clear All Read Messages</button>
            </div>
            
            {contacts.length === 0 ? (
              <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-tertiary)' }}>No contact submissions saved.</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {contacts.map(c => (
                  <div
                    key={c.id}
                    style={{ background: 'var(--bg-card)', border: c.read ? '1px solid var(--border-soft)' : '1px solid var(--apple-blue)', padding: '1.25rem', borderRadius: 'var(--r-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <div>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <span style={{ fontWeight: 600, color: 'var(--text-white)' }}>{c.name}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>({c.email})</span>
                        {!c.read && <span style={{ background: 'var(--apple-blue)', color: 'white', fontSize: '0.625rem', padding: '0.05rem 0.35rem', borderRadius: '100px' }}>NEW</span>}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{c.subject || 'No Subject'}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn btn-ghost" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }} onClick={() => readContact(c)}>View Message</button>
                      <button className="btn btn-ghost" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', color: 'var(--red)' }} onClick={() => deleteContact(c.id)}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: PROJECTS PORTFOLIO */}
        {activeTab === 'projects' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.03em' }}>Project Listings</h2>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setProjForm({ id: '', num: '', title: '', problem: '', solution: '', image: '', link: '', tags: '', featured: 'false' });
                  setShowProjModal(true);
                }}
              >
                + Add Project Case Study
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {projects.map(p => (
                <div
                  key={p.id}
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border-soft)', padding: '1.25rem', borderRadius: 'var(--r-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <div>
                    <div style={{ fontWeight: 600 }}>{p.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>No. {p.num} {p.featured ? '• FEATURED' : ''}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn-ghost" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }} onClick={() => openProjectEdit(p)}>Edit</button>
                    <button className="btn btn-ghost" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', color: 'var(--red)' }} onClick={() => deleteProject(p.id)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: JOB WORK HISTORY */}
        {activeTab === 'experiences' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.03em' }}>Work History Log</h2>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setExpForm({ id: '', company: '', role: '', period: '', description: '', tags: '', type: 'Freelance' });
                  setShowExpModal(true);
                }}
              >
                + Add Work Experience
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {experiences.map(e => (
                <div
                  key={e.id}
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border-soft)', padding: '1.25rem', borderRadius: 'var(--r-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <div>
                    <div style={{ fontWeight: 600 }}>{e.role} at {e.company}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>{e.period} • {e.type}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn-ghost" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }} onClick={() => openExpEdit(e)}>Edit</button>
                    <button className="btn btn-ghost" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', color: 'var(--red)' }} onClick={() => deleteExperience(e.id)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: PUBLICATIONS */}
        {activeTab === 'publications' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.03em' }}>Research & Publication Listings</h2>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setPubForm({ id: '', journal: '', year: '', title: '', abstract: '', link: '' });
                  setShowPubModal(true);
                }}
              >
                + Add Research Draft
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {publications.map(p => (
                <div
                  key={p.id}
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border-soft)', padding: '1.25rem', borderRadius: 'var(--r-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <div>
                    <div style={{ fontWeight: 600 }}>{p.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>{p.journal} ({p.year})</div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn-ghost" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }} onClick={() => openPubEdit(p)}>Edit</button>
                    <button className="btn btn-ghost" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', color: 'var(--red)' }} onClick={() => deletePublication(p.id)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: EDUCATION */}
        {activeTab === 'education' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.03em' }}>Education History</h2>
              <button className="btn btn-primary" onClick={() => { setEduForm({ id: '', institution: '', degree: '', period: '', description: '', medals: '' }); setShowEduModal(true); }}>
                + Add Degree/Medal
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {education.map(e => (
                <div key={e.id} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-soft)', padding: '1.25rem', borderRadius: 'var(--r-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>{e.degree} at {e.institution}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{e.period} {e.medals?.length > 0 ? `• Medals: ${e.medals.join(', ')}` : ''}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn-ghost" onClick={() => openEduEdit(e)}>Edit</button>
                    <button className="btn btn-ghost" style={{ color: 'var(--red)' }} onClick={() => deleteEducation(e.id)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: CERTIFICATIONS */}
        {activeTab === 'certifications' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.03em' }}>Certifications</h2>
              <button className="btn btn-primary" onClick={() => { setCertForm({ id: '', title: '', issuer: '', year: '', link: '' }); setShowCertModal(true); }}>
                + Add Certification
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {certifications.map(c => (
                <div key={c.id} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-soft)', padding: '1.25rem', borderRadius: 'var(--r-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>{c.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{c.issuer} ({c.year})</div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn-ghost" onClick={() => openCertEdit(c)}>Edit</button>
                    <button className="btn btn-ghost" style={{ color: 'var(--red)' }} onClick={() => deleteCertification(c.id)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: STATS */}
        {activeTab === 'stats' && (
          <div>
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.03em' }}>Home Stats Configuration</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.5rem' }}>Update the dynamic numbers on your landing page.</p>
            </div>
            
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-soft)', padding: '2rem', borderRadius: 'var(--r-md)', maxWidth: '600px' }}>
              <form onSubmit={(e) => {
                e.preventDefault();
                StatsAPI.update(statsForm);
                showToast('Home page stats updated successfully.');
              }}>
                <div className="form-group">
                  <label className="form-label">Years of Experience</label>
                  <input type="text" value={statsForm.years} onChange={e => setStatsForm({...statsForm, years: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Countries Reached</label>
                  <input type="text" value={statsForm.countries} onChange={e => setStatsForm({...statsForm, countries: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Projects Delivered</label>
                  <input type="text" value={statsForm.projects} onChange={e => setStatsForm({...statsForm, projects: e.target.value})} />
                </div>
                <button type="submit" className="btn-submit" style={{ marginTop: '1rem' }}>Update Stats Matrix</button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'partners' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.02em' }}>Trusted Partners</h2>
              <button className="btn-submit" onClick={() => { setTrustForm({ id: '', name: '', logoUrl: '' }); setShowTrustModal(true); }}>+ Add Partner</button>
            </div>
            {trusted.length === 0 ? (
              <p style={{ color: 'var(--text-tertiary)' }}>No partners logged. Add one above.</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                {trusted.map(c => (
                  <div key={c.id} style={{ background: '#111', border: '1px solid var(--border-soft)', padding: '1rem', borderRadius: 'var(--r-md)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', position: 'relative' }}>
                    <div style={{ height: '60px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <img src={c.logoUrl} alt={c.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
                    </div>
                    <div style={{ fontWeight: 500, fontSize: '0.9rem' }}>{c.name}</div>
                    <button onClick={() => deleteTrusted(c.id)} style={{ position: 'absolute', top: '10px', right: '10px', background: 'var(--red)', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>✕</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* ─── OVERLAY MODALS ─── */}
      {/* Contact Msg modal */}
      <div className={`drawer-overlay ${selectedContact ? 'open' : ''}`} onClick={() => setSelectedContact(null)}>
        <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
          <button className="drawer-close" onClick={() => setSelectedContact(null)}>✕</button>
          {selectedContact && (
            <div>
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--apple-blue-light)', marginBottom: '0.5rem' }}>
                INCOMING FORM QUERY
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                {selectedContact.subject || 'No Subject Line'}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9375rem', marginBottom: '2rem' }}>
                <div>
                  <span style={{ color: 'var(--text-tertiary)' }}>Sender: </span>
                  <span style={{ color: 'var(--text-white)', fontWeight: 500 }}>{selectedContact.name}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-tertiary)' }}>Email: </span>
                  <a href={`mailto:${selectedContact.email}`} style={{ color: 'var(--apple-blue-light)', textDecoration: 'underline' }}>{selectedContact.email}</a>
                </div>
                <div>
                  <span style={{ color: 'var(--text-tertiary)' }}>Submitted: </span>
                  <span style={{ color: 'var(--text-secondary)' }}>{new Date(selectedContact.timestamp).toLocaleString()}</span>
                </div>
                <div style={{ marginTop: '1rem' }}>
                  <div style={{ color: 'var(--text-white)', fontWeight: 600, marginBottom: '0.5rem' }}>Message Payload:</div>
                  <div style={{ background: '#111', border: '1px solid var(--border-soft)', padding: '1rem', borderRadius: 'var(--r-md)', whiteSpace: 'pre-wrap', color: 'var(--text-secondary)' }}>
                    {selectedContact.message}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Project details modal */}
      {showProjModal && (
        <div className="drawer-overlay open" onClick={() => setShowProjModal(false)}>
          <div className="drawer-panel" onClick={(e) => e.stopPropagation()} style={{ width: 'min(640px, 100%)' }}>
            <button className="drawer-close" onClick={() => setShowProjModal(false)}>✕</button>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>{projForm.id ? 'Edit Project' : 'Create New Project'}</h3>
            <form onSubmit={saveProject}>
              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Sequence (Num)</label>
                  <input type="text" placeholder="001" value={projForm.num} onChange={e => setProjForm({ ...projForm, num: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Featured Spacing</label>
                  <select value={projForm.featured} onChange={e => setProjForm({ ...projForm, featured: e.target.value })}>
                    <option value="false">Standard Card</option>
                    <option value="true">Featured Width (Full-Row Spanning)</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Project Title *</label>
                <input type="text" required value={projForm.title} onChange={e => setProjForm({ ...projForm, title: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Problem statement *</label>
                <textarea required value={projForm.problem} onChange={e => setProjForm({ ...projForm, problem: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Solution statement *</label>
                <textarea required value={projForm.solution} onChange={e => setProjForm({ ...projForm, solution: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Mockup Asset Link</label>
                <input type="text" placeholder="/ecommerce_mockup.png" value={projForm.image} onChange={e => setProjForm({ ...projForm, image: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Repository / Live Site URL</label>
                <input type="url" placeholder="https://github.com/..." value={projForm.link} onChange={e => setProjForm({ ...projForm, link: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Tags (comma-separated)</label>
                <input type="text" placeholder="Next.js, Node.js, PostgreSQL" value={projForm.tags} onChange={e => setProjForm({ ...projForm, tags: e.target.value })} />
              </div>
              <button type="submit" className="btn-submit" style={{ marginTop: '1.5rem' }}>Save changes</button>
            </form>
          </div>
        </div>
      )}

      {/* Experience modal */}
      {showExpModal && (
        <div className="drawer-overlay open" onClick={() => setShowExpModal(false)}>
          <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
            <button className="drawer-close" onClick={() => setShowExpModal(false)}>✕</button>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>{expForm.id ? 'Edit Experience Log' : 'Create Experience Log'}</h3>
            <form onSubmit={saveExperience}>
              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Company Name *</label>
                  <input type="text" required value={expForm.company} onChange={e => setExpForm({ ...expForm, company: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Job Role Title *</label>
                  <input type="text" required value={expForm.role} onChange={e => setExpForm({ ...expForm, role: e.target.value })} />
                </div>
              </div>
              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Timeline Period *</label>
                  <input type="text" placeholder="2022 – Present" required value={expForm.period} onChange={e => setExpForm({ ...expForm, period: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Badge Tag</label>
                  <select value={expForm.type} onChange={e => setExpForm({ ...expForm, type: e.target.value })}>
                    <option value="Founder">Founder</option>
                    <option value="Freelance">Freelance Contract</option>
                    <option value="Full-Time">Full-Time Position</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Job Description *</label>
                <textarea required rows="4" value={expForm.description} onChange={e => setExpForm({ ...expForm, description: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Core Skills (comma-separated)</label>
                <input type="text" placeholder="TypeScript, React, Python" value={expForm.tags} onChange={e => setExpForm({ ...expForm, tags: e.target.value })} />
              </div>
              <button type="submit" className="btn-submit" style={{ marginTop: '1.5rem' }}>Save Experience</button>
            </form>
          </div>
        </div>
      )}

      {/* Publications Modal */}
      {showPubModal && (
        <div className="drawer-overlay open" onClick={() => setShowPubModal(false)}>
          <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
            <button className="drawer-close" onClick={() => setShowPubModal(false)}>✕</button>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>{pubForm.id ? 'Edit Research Listing' : 'Log Research Listing'}</h3>
            <form onSubmit={savePublication}>
              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Journal/Publisher Name *</label>
                  <input type="text" required value={pubForm.journal} onChange={e => setPubForm({ ...pubForm, journal: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Publishing Year *</label>
                  <input type="text" placeholder="2025" required value={pubForm.year} onChange={e => setPubForm({ ...pubForm, year: e.target.value })} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Research Paper Title *</label>
                <input type="text" required value={pubForm.title} onChange={e => setPubForm({ ...pubForm, title: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Abstract Text *</label>
                <textarea required rows="5" value={pubForm.abstract} onChange={e => setPubForm({ ...pubForm, abstract: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Draft / Repository Link</label>
                <input type="url" placeholder="https://..." value={pubForm.link} onChange={e => setPubForm({ ...pubForm, link: e.target.value })} />
              </div>
              <button type="submit" className="btn-submit" style={{ marginTop: '1.5rem' }}>Save Listing</button>
            </form>
          </div>
        </div>
      )}

      {/* Education Modal */}
      {showEduModal && (
        <div className="drawer-overlay open" onClick={() => setShowEduModal(false)}>
          <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
            <button className="drawer-close" onClick={() => setShowEduModal(false)}>✕</button>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>{eduForm.id ? 'Edit Education' : 'Log Education'}</h3>
            <form onSubmit={saveEducation}>
              <div className="form-group">
                <label className="form-label">Institution Name *</label>
                <input type="text" required value={eduForm.institution} onChange={e => setEduForm({ ...eduForm, institution: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Degree/Major *</label>
                <input type="text" required value={eduForm.degree} onChange={e => setEduForm({ ...eduForm, degree: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Period *</label>
                <input type="text" placeholder="2019 - 2023" required value={eduForm.period} onChange={e => setEduForm({ ...eduForm, period: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea rows="3" value={eduForm.description} onChange={e => setEduForm({ ...eduForm, description: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Medals/Honors (comma-separated)</label>
                <input type="text" placeholder="Gold Medalist, Silver Medalist" value={eduForm.medals} onChange={e => setEduForm({ ...eduForm, medals: e.target.value })} />
              </div>
              <button type="submit" className="btn-submit" style={{ marginTop: '1.5rem' }}>Save Education</button>
            </form>
          </div>
        </div>
      )}

      {/* Certifications Modal */}
      {showCertModal && (
        <div className="drawer-overlay open" onClick={() => setShowCertModal(false)}>
          <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
            <button className="drawer-close" onClick={() => setShowCertModal(false)}>✕</button>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>{certForm.id ? 'Edit Certification' : 'Log Certification'}</h3>
            <form onSubmit={saveCertification}>
              <div className="form-group">
                <label className="form-label">Certification Title *</label>
                <input type="text" required value={certForm.title} onChange={e => setCertForm({ ...certForm, title: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Issuer Organization *</label>
                <input type="text" required value={certForm.issuer} onChange={e => setCertForm({ ...certForm, issuer: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Year</label>
                <input type="text" value={certForm.year} onChange={e => setCertForm({ ...certForm, year: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Verification Link</label>
                <input type="url" value={certForm.link} onChange={e => setCertForm({ ...certForm, link: e.target.value })} />
              </div>
              <button type="submit" className="btn-submit" style={{ marginTop: '1.5rem' }}>Save Certification</button>
            </form>
          </div>
        </div>
      )}

      {/* Trusted Partners Modal */}
      {showTrustModal && (
        <div className="drawer-overlay open" onClick={() => setShowTrustModal(false)}>
          <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
            <button className="drawer-close" onClick={() => setShowTrustModal(false)}>✕</button>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>Add Trusted Partner</h3>
            <form onSubmit={saveTrusted}>
              <div className="form-group">
                <label className="form-label">Company Name *</label>
                <input type="text" required placeholder="e.g. Google" value={trustForm.name} onChange={e => setTrustForm({ ...trustForm, name: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Logo Image URL *</label>
                <input type="url" required placeholder="https://.../logo.png" value={trustForm.logoUrl} onChange={e => setTrustForm({ ...trustForm, logoUrl: e.target.value })} />
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>Note: Logos will be automatically inverted to white on the dark theme ticker.</p>
              <button type="submit" className="btn-submit" style={{ marginTop: '1.5rem' }}>Save Partner</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
