import React, { useState, useEffect, useCallback } from 'react';
import '../../../components-css/Zone2.css';

// Same backend base as Zone2.jsx — mounted via app.use('/api/projects', zone2Routes).
const API_BASE = import.meta.env.VITE_ZONE2_API_BASE || 'https://vr-backend-gwr1.onrender.com/api/projects';

/* ============================================================
   DATA HOOK
   ============================================================ */
function useCategoryItems(categoryId) {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('loading'); // 'loading' | 'error' | 'ready'
  const [error, setError] = useState(null);

  const fetchItems = useCallback(async () => {
    if (!categoryId) return;
    setStatus('loading');
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/${categoryId}`);
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      const data = await res.json();
      const list = Array.isArray(data) ? data : data.data || [];
      setItems(list);
      setStatus('ready');
    } catch (err) {
      setError(err.message || 'Failed to load this category');
      setStatus('error');
    }
  }, [categoryId]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return { items, status, error, refetch: fetchItems };
}

/* ============================================================
   ROW CONTENT — the backend returns 3 different shapes for
   secretaries / achievements / regular projects (per the
   .select() calls in getProjectsByCategory), so normalize each
   into { primary, secondary, meta } for one consistent row.
   ============================================================ */
const rowContentFor = (item, categoryId) => {
  if (categoryId === 'secretaries') {
    return {
      primary: item.name,
      secondary: [item.club, item.position].filter(Boolean).join(' · '),
      meta: [item.class, item.year].filter(Boolean).join(' · '),
    };
  }
  if (categoryId === 'achievements') {
    return {
      primary: item.title,
      secondary: item.description,
      meta: [item.name, item.rollNo, item.class].filter(Boolean).join(' · '),
    };
  }
  // Regular project — list endpoint doesn't include problemStatement/
  // solutionOverview (those only come back from the detail endpoint).
  return {
    primary: item.title || item.name,
    secondary: item.description,
    meta: [item.programme, item.class, item.year].filter(Boolean).join(' · '),
  };
};

/* ============================================================
   STATES
   ============================================================ */
const EmptyState = ({ category }) => (
  <div className="z2-empty-state">
    <div className="z2-empty-icon" style={{ background: category.lightColor, color: category.accentColor }}>
      🚧
    </div>
    <h3 className="z2-empty-title">Projects Coming Soon</h3>
    <p className="z2-empty-desc">
      No projects have been added to <strong>{category.name}</strong> yet.
      Check back soon — this space is filling up fast.
    </p>
    <div className="z2-empty-pill" style={{ borderColor: category.accentColor + '50', color: category.accentColor, background: category.lightColor }}>
      Be the first to add a project
    </div>
  </div>
);

const LoadingState = () => (
  <div className="z2-empty-state">
    <p className="z2-empty-desc">Loading…</p>
  </div>
);

const ErrorState = ({ error, onRetry, accentColor }) => (
  <div className="z2-empty-state">
    <p className="z2-empty-desc" style={{ marginBottom: '1rem' }}>
      {error || 'Something went wrong loading these projects.'}
    </p>
    <button
      onClick={onRetry}
      className="z2-empty-pill"
      style={{ borderColor: accentColor + '50', color: accentColor, background: 'transparent', cursor: 'pointer' }}
    >
      Try Again
    </button>
  </div>
);

const CategoryPage = ({ category, onBack, onProjectClick }) => {
  const { items, status, error, refetch } = useCategoryItems(category.id);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <div className="z2-catpage slide-up">
      {/* Page header */}
      <div className="z2-catpage-header" style={{ '--accent': category.accentColor }}>
        <div className="z2-catpage-meta">
          <span className="z2-catpage-num">{category.number}</span>
          <div>
            <span className="z2-catpage-eyebrow" style={{ color: category.accentColor }}>
              {status === 'ready' ? items.length : category.count} Active Projects
            </span>
            <h1 className="z2-catpage-title">{category.name}</h1>
            <p className="z2-catpage-desc">{category.description}</p>
          </div>
        </div>
      </div>

      {status === 'loading' && <LoadingState />}
      {status === 'error' && (
        <ErrorState error={error} onRetry={refetch} accentColor={category.accentColor} />
      )}

      {status === 'ready' && (
        items.length === 0 ? (
          <EmptyState category={category} />
        ) : (
          <div className="z2-project-list">
            {items.map((item, i) => {
              const { primary, secondary, meta } = rowContentFor(item, category.id);
              return (
                <button
                  key={item.slug || i}
                  className={`z2-proj-row ${hoveredIdx === i ? 'hovered' : ''}`}
                  style={{ '--accent': category.accentColor, animationDelay: `${i * 0.07}s` }}
                  onClick={() => onProjectClick(item)}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  <div className="z2-proj-row-left">
                    <span className="z2-proj-idx">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="z2-proj-info">
                      <span className="z2-proj-name">{primary}</span>
                      {secondary && <span className="z2-proj-short">{secondary}</span>}
                    </div>
                  </div>
                  <div className="z2-proj-row-right">
                    {meta && (
                      <span
                        className="z2-proj-tag"
                        style={{ borderColor: `${category.accentColor}30`, color: category.accentColor }}
                      >
                        {meta}
                      </span>
                    )}
                    <span className="z2-proj-arrow" style={{ color: category.accentColor }}>→</span>
                  </div>
                </button>
              );
            })}
          </div>
        )
      )}
    </div>
  );
};

export default CategoryPage;