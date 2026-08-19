import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../../../components-css/Zone2Detail.css';

// Same backend base as Zone2.jsx / CategoryPage.jsx.
const API_BASE = import.meta.env.VITE_ZONE2_API_BASE || 'https://vr-backend-gwr1.onrender.com/api/projects';

/* ============================================================
   DATA HOOK
   ============================================================ */
function useEntryDetail(categoryId, slug) {
  const [item, setItem] = useState(null);
  const [status, setStatus] = useState('loading'); // 'loading' | 'error' | 'ready'
  const [error, setError] = useState(null);

  const fetchDetail = useCallback(async () => {
    if (!categoryId || !slug) return;
    setStatus('loading');
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/${categoryId}/${slug}`);
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      const data = await res.json();
      setItem(data);
      setStatus('ready');
    } catch (err) {
      setError(err.message || 'Failed to load this entry');
      setStatus('error');
    }
  }, [categoryId, slug]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  return { item, status, error, refetch: fetchDetail };
}

/* ── Problem Card ─────────────────────────────── */
const ProblemCard = ({ text, accentColor, accentLight, year }) => {
  const firstSentence = (text || '').split(/(?<=[.?!])\s/)[0];
  return (
    <div className="z2-problem-issue">
      <div className="z2-problem-header" style={{ background: accentLight }}>
        <span className="z2-problem-filed" style={{ color: accentColor }}>
          Issue Filed{year ? ` — ${year}` : ''}
        </span>
        <span className="z2-problem-meta">Engineering Research · CSE Dept</span>
      </div>
      <div className="z2-problem-body">
        {firstSentence && (
          <blockquote className="z2-problem-lede" style={{ borderLeftColor: accentColor }}>
            {firstSentence}
          </blockquote>
        )}
        <p className="z2-problem-full">{text}</p>
      </div>
    </div>
  );
};

/* ── Solution Card ────────────────────────────── */
const SolutionCard = ({ text, accentColor, accentLight }) => (
  <div className="z2-solution-card">
    <span className="z2-solution-quote-mark" aria-hidden="true" style={{ color: accentLight }}>
      "
    </span>
    <p className="z2-solution-text">{text}</p>
    <div
      className="z2-solution-rule"
      style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }}
    />
  </div>
);

/* ============================================================
   LOADING / ERROR SHELL — shared by every branch below
   ============================================================ */
const DetailShell = ({ accentColor, accentLight, children }) => (
  <div className="z2-detail slide-up" style={{ '--accent': accentColor, '--accent-light': accentLight }}>
    <div className="z2-detail-scroll">{children}</div>
  </div>
);

const DetailLoading = ({ accentColor, accentLight }) => (
  <DetailShell accentColor={accentColor} accentLight={accentLight}>
    <p style={{ padding: '4rem 1rem', textAlign: 'center', color: accentColor, fontWeight: 700 }}>
      Loading…
    </p>
  </DetailShell>
);

const DetailError = ({ accentColor, accentLight, error, onRetry }) => (
  <DetailShell accentColor={accentColor} accentLight={accentLight}>
    <div style={{ padding: '4rem 1rem', textAlign: 'center' }}>
      <p style={{ marginBottom: '1.25rem', color: 'var(--text-h, #1f2937)' }}>
        {error || 'This entry could not be found.'}
      </p>
      <button
        onClick={onRetry}
        style={{
          padding: '0.65rem 1.5rem',
          borderRadius: '999px',
          border: 'none',
          background: accentColor,
          color: '#fff',
          fontWeight: 700,
          cursor: 'pointer',
        }}
      >
        Try Again
      </button>
    </div>
  </DetailShell>
);

/* ============================================================
   SECRETARY DETAIL — secretarySchema: name, club, class, position, year
   ============================================================ */
const SecretaryDetail = ({ secretary, accentColor, accentLight }) => (
  <DetailShell accentColor={accentColor} accentLight={accentLight}>
    <div className="z2-detail-hero">
      <div className="z2-detail-hero-stripe" style={{ background: accentColor }} />
      <span className="z2-detail-hero-icon" style={{ background: accentLight }}>
        {secretary.name?.[0]?.toUpperCase() || '?'}
      </span>
      <div className="z2-detail-hero-text">
        <div className="z2-detail-tags">
          {secretary.position && (
            <span
              className="z2-detail-tag"
              style={{ color: accentColor, borderColor: accentColor + '50', background: accentLight }}
            >
              {secretary.position}
            </span>
          )}
          {secretary.club && (
            <span
              className="z2-detail-tag"
              style={{ color: accentColor, borderColor: accentColor + '50', background: accentLight }}
            >
              {secretary.club}
            </span>
          )}
        </div>
        <h1 className="z2-detail-title">{secretary.name}</h1>
        <p className="z2-detail-subtitle">
          {[secretary.class, secretary.year].filter(Boolean).join(' · ')}
        </p>
      </div>
    </div>
  </DetailShell>
);

/* ============================================================
   ACHIEVEMENT DETAIL — achievementSchema: title, description, name, rollNo, class
   ============================================================ */
const AchievementDetail = ({ achievement, accentColor, accentLight }) => (
  <DetailShell accentColor={accentColor} accentLight={accentLight}>
    <div className="z2-detail-hero">
      <div className="z2-detail-hero-stripe" style={{ background: accentColor }} />
      <span className="z2-detail-hero-icon" style={{ background: accentLight }}>🏆</span>
      <div className="z2-detail-hero-text">
        <div className="z2-detail-tags">
          {achievement.class && (
            <span
              className="z2-detail-tag"
              style={{ color: accentColor, borderColor: accentColor + '50', background: accentLight }}
            >
              {achievement.class}
            </span>
          )}
        </div>
        <h1 className="z2-detail-title">{achievement.title}</h1>
        <p className="z2-detail-subtitle">
          {[achievement.name, achievement.rollNo].filter(Boolean).join(' · ')}
        </p>
      </div>
    </div>

    <section className="z2-section">
      <p className="z2-section-label" style={{ color: accentColor }}>Details</p>
      <p className="z2-problem-full">{achievement.description}</p>
    </section>
  </DetailShell>
);

/* ============================================================
   REGULAR PROJECT DETAIL — projectSchema: name, year, programme, title,
   description, problemStatement, solutionOverview, class, githubLink.
   No icon/tags/techStack/teamMembers/media/demoLink fields exist in the
   DB, so those sections from the old mock-data version are dropped;
   "Links" (githubLink) replaces the old QR/demo section.
   ============================================================ */
const buildSections = (hasGithub) => [
  { id: 'problem', label: 'Problem' },
  { id: 'solution', label: 'Solution' },
  ...(hasGithub ? [{ id: 'links', label: 'Links' }] : []),
];

const ProjectDetailBody = ({ project, accentColor, accentLight }) => {
  const hasGithub = Boolean(project.githubLink);
  const SECTIONS = buildSections(hasGithub);
  const sectionRefs = useRef({});
  const [activeSection, setActiveSection] = useState('problem');

  const scrollTo = (id) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveSection(id);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.dataset.section);
        });
      },
      { threshold: 0.35 }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [hasGithub]);

  const tags = [project.programme, project.class].filter(Boolean);

  return (
    <div className="z2-detail slide-up" style={{ '--accent': accentColor, '--accent-light': accentLight }}>
      <nav className="z2-section-nav">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            className={`z2-sec-btn ${activeSection === s.id ? 'active' : ''}`}
            style={{ '--accent': accentColor }}
            onClick={() => scrollTo(s.id)}
          >
            <span className="z2-sec-btn-label">{s.label}</span>
          </button>
        ))}
      </nav>

      <div className="z2-detail-scroll">
        <div className="z2-detail-hero">
          <div className="z2-detail-hero-stripe" style={{ background: accentColor }} />
          <span className="z2-detail-hero-icon" style={{ background: accentLight }}>
            {(project.name || project.title || '•')[0]?.toUpperCase()}
          </span>
          <div className="z2-detail-hero-text">
            {tags.length > 0 && (
              <div className="z2-detail-tags">
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    className="z2-detail-tag"
                    style={{ color: accentColor, borderColor: accentColor + '50', background: accentLight }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <h1 className="z2-detail-title">{project.title || project.name}</h1>
            <p className="z2-detail-subtitle">{project.description}</p>
          </div>
        </div>

        <section
          className="z2-section"
          data-section="problem"
          ref={(el) => (sectionRefs.current['problem'] = el)}
        >
          <p className="z2-section-label" style={{ color: accentColor }}>Problem Statement</p>
          <ProblemCard
            text={project.problemStatement}
            accentColor={accentColor}
            accentLight={accentLight}
            year={project.year}
          />
        </section>

        <section
          className="z2-section"
          data-section="solution"
          ref={(el) => (sectionRefs.current['solution'] = el)}
        >
          <p className="z2-section-label" style={{ color: accentColor }}>Solution Overview</p>
          <SolutionCard
            text={project.solutionOverview}
            accentColor={accentColor}
            accentLight={accentLight}
          />
        </section>

        {hasGithub && (
          <section
            className="z2-section"
            data-section="links"
            ref={(el) => (sectionRefs.current['links'] = el)}
          >
            <p className="z2-section-label" style={{ color: accentColor }}>Links</p>
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="z2-demo-btn"
              style={{ background: accentColor, display: 'inline-block' }}
            >
              View on GitHub
            </a>
          </section>
        )}
      </div>
    </div>
  );
};

/* ============================================================
   ENTRY POINT — fetches by category.id + project.slug, then
   branches on which of the 3 backend shapes came back.
   ============================================================ */
const ProjectDetail = ({ project, category }) => {
  const categoryId = category?.id;
  const slug = project?.slug;
  const accentColor = category?.accentColor || 'var(--accent)';
  const accentLight = category?.lightColor || 'var(--accent-bg)';

  const { item, status, error, refetch } = useEntryDetail(categoryId, slug);

  if (status === 'loading') {
    return <DetailLoading accentColor={accentColor} accentLight={accentLight} />;
  }
  if (status === 'error' || !item) {
    return (
      <DetailError
        accentColor={accentColor}
        accentLight={accentLight}
        error={error}
        onRetry={refetch}
      />
    );
  }

  if (categoryId === 'secretaries') {
    return <SecretaryDetail secretary={item} accentColor={accentColor} accentLight={accentLight} />;
  }
  if (categoryId === 'achievements') {
    return <AchievementDetail achievement={item} accentColor={accentColor} accentLight={accentLight} />;
  }
  return <ProjectDetailBody project={item} accentColor={accentColor} accentLight={accentLight} />;
};

export default ProjectDetail;