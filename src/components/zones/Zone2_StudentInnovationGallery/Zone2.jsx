import React, { useState, useEffect, useCallback } from 'react';
import '../../../components-css/Zone2.css';
import CategoryPage from './CategoryPage';
import ProjectDetail from './ProjectDetail';


const API_BASE = `${import.meta.env.VITE_API_BASE || 'https://vr-backend-gwr1.onrender.com/'}api/projects`;


const ACCENTS_BY_ID = {
  'first-year': { accentColor: '#6B9B6D', lightColor: '#EBF3EB' },
  mini: { accentColor: '#6289A8', lightColor: '#E4EEF5' },
  capstone: { accentColor: '#B56A4A', lightColor: '#F6EAE1' },
  hackathon: { accentColor: '#C49830', lightColor: '#F7EDD5' },
};
const DEFAULT_ACCENT = { accentColor: '#6B7280', lightColor: '#EEF0F2' };

const sanitizeIcon = (icon) => {
  if (!icon) return '';
  return String(icon).replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{26FF}]/gu, '') || '';
};

/* ============================================================
   DATA HOOK
   ============================================================ */
function useCategories() {
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState('loading'); // 'loading' | 'error' | 'ready'
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async () => {
    setStatus('loading');
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/categories`);
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      const data = await res.json();
      // Handle either a raw array or a { data: [...] } envelope.
      const list = Array.isArray(data) ? data : data.data || data.categories || [];
      const merged = list
        .map((cat) => ({ ...cat, ...(ACCENTS_BY_ID[cat.id] || DEFAULT_ACCENT) }))
        .sort((a, b) => Number(a.number) - Number(b.number));
      setCategories(merged);
      setStatus('ready');
    } catch (err) {
      setError(err.message || 'Failed to load categories');
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return { categories, status, error, refetch: fetchCategories };
}

/* ============================================================
   LOADING / ERROR STATES
   ============================================================ */
const CategoriesLoading = () => (
  <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
    <p className="z2-hero-sub">Loading categories…</p>
  </div>
);

const CategoriesError = ({ error, onRetry }) => (
  <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
    <p className="z2-hero-sub" style={{ marginBottom: '1.25rem' }}>
      {error || 'Something went wrong loading the categories.'}
    </p>
    <button
      onClick={onRetry}
      style={{
        padding: '0.65rem 1.5rem',
        borderRadius: '999px',
        border: 'none',
        background: 'var(--text-h, #1f2937)',
        color: '#fff',
        fontWeight: 700,
        cursor: 'pointer',
      }}
    >
      Try Again
    </button>
  </div>
);

const Zone2 = () => {
  const { categories, status, error, refetch } = useCategories();

  const [view, setView] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    setView('category');
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setView('project');
  };

  const handleBackToHome = () => {
    setSelectedCategory(null);
    setSelectedProject(null);
    setView('home');
  };

  const handleBackToCategory = () => {
    setSelectedProject(null);
    setView('category');
  };

  return (
    <div className="z2-root">

      {/* ── Background mesh blobs ── */}
      <div className="z2-bg-blobs" aria-hidden="true">
        <div className="z2-blob z2-blob-1" />
        <div className="z2-blob z2-blob-2" />
        <div className="z2-blob z2-blob-3" />
      </div>

      {/* Breadcrumb */}
      {view !== 'home' && (
        <nav className="z2-breadcrumb slide-up">
          <button className="z2-bc-btn" onClick={handleBackToHome}>Gallery</button>
          {selectedCategory && (
            <>
              <span className="z2-bc-sep">›</span>
              <button
                className="z2-bc-btn"
                onClick={view === 'project' ? handleBackToCategory : undefined}
                style={view === 'category' ? { color: 'var(--text-h)', cursor: 'default' } : {}}
              >
                {selectedCategory.name}
              </button>
            </>
          )}
          {view === 'project' && selectedProject && (
            <>
              <span className="z2-bc-sep">›</span>
              <span className="z2-bc-current">{selectedProject.name}</span>
            </>
          )}
        </nav>
      )}

      {/* ── LEVEL 1: Home ── */}
      {view === 'home' && (
        <div className="z2-home slide-up">
          <div className="z2-hero">
            <span className="z2-eyebrow">PSG College of Technology · Department of CSE</span>
            <h1 className="z2-hero-title">
              Student<br />
              <em className="z2-hero-em">Innovation</em><br />
              Gallery
            </h1>
            <p className="z2-hero-sub">
              Four tracks. Hundreds of ideas. Explore groundbreaking projects built by students
              who refused to wait to change the world.
            </p>
            <div className="z2-hero-stats">
              <div className="z2-hero-stat">
                <span className="z2-hero-stat-num">86+</span>
                <span className="z2-hero-stat-label">Projects</span>
              </div>
              <div className="z2-hero-stat-div" />
              <div className="z2-hero-stat">
                <span className="z2-hero-stat-num">4</span>
                <span className="z2-hero-stat-label">Tracks</span>
              </div>
              <div className="z2-hero-stat-div" />
              <div className="z2-hero-stat">
                <span className="z2-hero-stat-num">200+</span>
                <span className="z2-hero-stat-label">Students</span>
              </div>
            </div>
          </div>

          {status === 'loading' && <CategoriesLoading />}
          {status === 'error' && <CategoriesError error={error} onRetry={refetch} />}

          {status === 'ready' && (
            <div className="z2-categories-grid">
              {categories.map((cat, i) => (
                <button
                  key={cat.id}
                  className="z2-cat-card"
                  style={{
                    '--accent': cat.accentColor,
                    '--accent-light': cat.lightColor,
                    animationDelay: `${i * 0.09}s`,
                  }}
                  onClick={() => handleCategoryClick(cat)}
                >
                  <div className="z2-cat-card-inner">
                    {/* Glow blob */}
                    <div className="z2-cat-glow" style={{ background: cat.accentColor }} />

                    <div className="z2-cat-top">
                      <span className="z2-cat-icon">{sanitizeIcon(cat.icon)}</span>
                      <span className="z2-cat-count">
                        {cat.count} project{cat.count === '1' ? '' : 's'}
                      </span>
                    </div>
                    <div className="z2-cat-body">
                      <span className="z2-cat-number">{cat.number}</span>
                      <h2 className="z2-cat-name">{cat.name}</h2>
                      <p className="z2-cat-tagline">{cat.tagline}</p>
                      <p className="z2-cat-desc">{cat.description}</p>
                    </div>
                    <div className="z2-cat-cta">
                      <span>Explore projects</span>
                      <span className="z2-cat-arrow">→</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── LEVEL 2: Category ── */}
      {view === 'category' && selectedCategory && (
        <CategoryPage
          category={selectedCategory}
          onProjectClick={handleProjectClick}
        />
      )}

      {/* ── LEVEL 3: Project Detail ── */}
      {view === 'project' && selectedProject && (
        <ProjectDetail
          project={selectedProject}
          category={selectedCategory}
        />
      )}
    </div>
  );
};

export default Zone2;