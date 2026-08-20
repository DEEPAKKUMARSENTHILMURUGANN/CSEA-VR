import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Award, FolderKanban, FileText, User, Loader2, AlertCircle } from 'lucide-react';


const API_BASE = `${import.meta.env.VITE_API_BASE || 'https://vr-backend-gwr1.onrender.com/'}api/faculty`;


const ACCENTS = ['#10b981', '#3b82f6', '#a855f7', '#f59e0b', '#ef4444', '#06b6d4'];
const accentFor = (id) => {
  const str = String(id || '');
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return ACCENTS[Math.abs(hash) % ACCENTS.length];
};

const initialsFor = (name = '') =>
  name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join('') || '?';

// Treat null AND undefined as "field not provided" — everything else (including
// empty strings/arrays) is considered present and should render normally.
const isPresent = (val) => val !== null && val !== undefined;

/* ============================================================
   DESIGNATION HIERARCHY
   ============================================================ */
// Ordered highest → lowest, exactly as specified:
//   1. Hod
//   2. Professor
//   3. Associate Professor
//   4. Asst Proff (Selection Grade)
//   5. Asst Proff (Senior Grade)
//   6. Asst Proff
// Each tier lists both the abbreviated form your API uses and common
// spelled-out variants, so the match still works if the wording drifts.
const DESIGNATION_HIERARCHY = [
  { keywords: ['hod', 'head of department', 'professor & head', 'professor and head'] },
  { keywords: ['professor'] },
  { keywords: ['associate professor', 'asso proff', 'asso. proff', 'assoc professor', 'assoc. professor'] },
  { keywords: ['asst proff (sl.grade)', 'asst. proff (sl.grade)', 'asst proff (sl grade)', 'assistant professor (selection grade)', 'selection grade'] },
  { keywords: ['asst proff (snr.grade)', 'asst. proff (snr.grade)', 'asst proff (snr grade)', 'assistant professor (senior grade)', 'senior grade'] },
  { keywords: ['asst proff', 'asst. proff', 'assistant professor'] }
];

// Matches the LONGEST keyword found across every tier, so e.g. the specific
// "Asst Proff (SL.Grade)" phrase outranks the shorter generic "Asst Proff"
// match, and "Associate Professor" resolves to its own tier instead of the
// shorter, higher-ranked "Professor" entry. Unmatched designations sort
// last, then alphabetically by name as a tiebreaker.
const rankFor = (designation = '') => {
  const d = designation.toLowerCase();
  let bestRank = DESIGNATION_HIERARCHY.length;
  let bestLen = -1;
  DESIGNATION_HIERARCHY.forEach((tier, rank) => {
    tier.keywords.forEach((keyword) => {
      if (d.includes(keyword) && keyword.length > bestLen) {
        bestRank = rank;
        bestLen = keyword.length;
      }
    });
  });
  return bestRank;
};

// Special-cased Head of Department: guarantees this person sorts first and
// gets an explicit "HOD" badge regardless of whatever designation string the
// backend sends. Matched on a name snippet — update if the HOD changes.
const HOD_NAME_MATCH = 'karpagam';
const isPinned = (name = '') => name.toLowerCase().includes(HOD_NAME_MATCH);

const sortByHierarchy = (list) =>
  [...list].sort((a, b) => {
    const aPinned = isPinned(a.name);
    const bPinned = isPinned(b.name);
    if (aPinned && !bPinned) return -1;
    if (bPinned && !aPinned) return 1;

    const rankDiff = rankFor(a.designation) - rankFor(b.designation);
    if (rankDiff !== 0) return rankDiff;
    return (a.name || '').localeCompare(b.name || '');
  });

/* ============================================================
   DATA HOOK
   ============================================================ */
function useFacultyList() {
  const [faculty, setFaculty] = useState([]);
  const [status, setStatus] = useState('loading'); // 'loading' | 'error' | 'ready'
  const [error, setError] = useState(null);

  const fetchFaculty = useCallback(async () => {
    setStatus('loading');
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/`);
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      const data = await res.json();
      // Handle either a raw array or a { data: [...] } envelope.
      const list = Array.isArray(data) ? data : data.data || data.faculty || [];
      setFaculty(sortByHierarchy(list));
      setStatus('ready');
    } catch (err) {
      setError(err.message || 'Failed to load faculty');
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    fetchFaculty();
  }, [fetchFaculty]);

  return { faculty, status, error, refetch: fetchFaculty };
}

/* ============================================================
   SUB-COMPONENTS
   ============================================================ */

const SectionHeader = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}
    className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16"
  >
    <div className="zone4-label-wrap">
      <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight mb-6">ZONE 4</h2>

      <span className="zone4-subtext">Dept of CSE</span>
    </div>

    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-8">
      <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
      <span className="text-xs font-bold tracking-widest uppercase text-slate-500 font-mono">
        Meet the Researchers
      </span>
    </div>
    <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight mb-6">
      FACULTY DIRECTORY <span text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight mb-6>ZONE</span>
    </h2>
    <p className="text-lg text-slate-500 leading-relaxed max-w-2xl font-medium">
      The mentors and principal investigators driving research across every lab.
    </p>
  </motion.div>
);

const LoadingState = () => (
  <div className="flex flex-col items-center justify-center gap-4 py-24">
    <Loader2 className="w-8 h-8 text-slate-400 animate-spin" />
    <p className="text-slate-500 font-medium">Loading faculty…</p>
  </div>
);

const ErrorState = ({ error, onRetry }) => (
  <div className="flex flex-col items-center justify-center gap-4 py-24 bg-white/50 backdrop-blur-md rounded-3xl border border-slate-200">
    <AlertCircle className="w-8 h-8 text-red-400" />
    <p className="text-slate-600 font-medium">{error || 'Something went wrong.'}</p>
    <button
      onClick={onRetry}
      className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-700 transition-colors"
    >
      Try Again
    </button>
  </div>
);

const EmptyState = () => (
  <div className="bg-white/50 backdrop-blur-md rounded-3xl p-12 text-center border border-slate-200">
    <p className="text-slate-500 font-medium">No faculty profiles have been added yet.</p>
  </div>
);

const FacultyCard = ({ person, index, onClick }) => {
  const acc = accentFor(person._id || person.id || person.name);

  // Keep the raw values so we can tell "field missing" (null/undefined) apart
  // from "field present but empty" — only the former should be hidden.
  const achievementsRaw = person.achievementsAndHonors;
  const projectsRaw = person.projects;
  const papersRaw = person.researchPapers;

  const achievements = Array.isArray(achievementsRaw) ? achievementsRaw : [];
  const projectsCount = Array.isArray(projectsRaw) ? projectsRaw.length : 0;
  const papersCount = Array.isArray(papersRaw) ? papersRaw.length : 0;
  const staggerDelay = Math.min(index * 0.05, 0.25);

  const showAwardsStat = isPresent(achievementsRaw);
  const showProjectsStat = isPresent(projectsRaw);
  const showPapersStat = isPresent(papersRaw);
  const showStatsRow = showAwardsStat || showProjectsStat || showPapersStat;

  // Most recent achievement doubles as the "impact" line, same role the
  // ProductCards footer strip gives to `impact`.
  const latestAchievement = achievements[achievements.length - 1];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -150px 0px' }}
      transition={{ duration: 0.25, delay: staggerDelay, ease: 'easeOut' }}
      onClick={() => onClick(person)}
      className="relative group flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl cursor-pointer"
      style={{ minHeight: '480px' }}
    >
      {/* Left accent bar, grows in on scroll like the ProductCards signature rule */}
      <motion.div
        initial={{ height: '0%' }}
        whileInView={{ height: '100%' }}
        viewport={{ once: true, margin: '0px 0px -150px 0px' }}
        transition={{ duration: 0.25, delay: staggerDelay + 0.1 }}
        className="absolute left-0 top-0 w-[4px] z-30 transition-colors duration-500"
        style={{ backgroundColor: acc }}
      />

      {/* Zone A — header */}
      <div
        className="relative bg-slate-50 overflow-hidden flex flex-col justify-end select-none border-b border-slate-200"
        style={{ height: '180px', padding: '1.5rem', paddingBottom: '1rem' }}
      >
        {person.photo || person.photoUrl || person.image ? (
          <img
            src={person.photo || person.photoUrl || person.image}
            alt={person.name}
            className="absolute z-0 object-cover w-full h-full top-3 left-0 right-0"
          />
        ) : (
          <div
            className="absolute z-0 rounded border-2 border-dashed border-slate-300 flex flex-col items-center justify-center bg-white transition-all duration-300"
            style={{ top: '1rem', bottom: '1rem', left: '1rem', right: '1rem', borderColor: `${acc}40` }}
          >
            <span className="text-2xl font-black" style={{ color: acc }}>{initialsFor(person.name)}</span>
          </div>
        )}

        {/* Gradient overlay so the title/tag stay legible */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-white/90 to-transparent pointer-events-none z-10" />

        {/* HOD badge — top-left, only for the pinned Head of Department */}
        {isPinned(person.name) && (
          <div className="absolute top-6 left-6 z-20">
            <span
              className="inline-block px-2.5 py-0.5 rounded text-[10px] font-black tracking-widest uppercase text-white"
              style={{ backgroundColor: acc }}
            >
              HOD
            </span>
          </div>
        )}

        <h3
          className="text-slate-900 font-black tracking-tight z-20 group-hover:text-blue-600 transition-colors"
          style={{ fontSize: '22px', lineHeight: '1.2' }}
        >
          {person.name}
        </h3>
      </div>

      {/* Zone B — content */}
      <div className="flex-grow flex flex-col justify-between bg-transparent z-10" style={{ padding: '1.5rem' }}>
        <div>
          {isPresent(person.description) && (
            <p className="text-slate-600 text-[15px] leading-relaxed line-clamp-3">
              {person.description}
            </p>
          )}
        </div>

        {/* Stats row, same slot the partner block occupies in ProductCards.
            Only rendered if at least one of the underlying fields is present;
            each individual stat is hidden if its field is null/undefined. */}
        {showStatsRow && (
          <div className="flex items-start gap-2.5 border-t border-slate-100" style={{ marginTop: '1.25rem', paddingTop: '1rem' }}>
            <User className="w-4 h-4 shrink-0 mt-0.5" style={{ color: acc }} />
            <div className="flex gap-5 text-left">
              {showAwardsStat && (
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest block leading-none">Awards</span>
                  <span className="text-sm font-bold text-slate-700 mt-1 block">{achievements.length}</span>
                </div>
              )}
              {showProjectsStat && (
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest block leading-none">Projects</span>
                  <span className="text-sm font-bold text-slate-700 mt-1 block">{projectsCount}</span>
                </div>
              )}
              {showPapersStat && (
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest block leading-none">Papers</span>
                  <span className="text-sm font-bold text-slate-700 mt-1 block">{papersCount}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Designation strip — sits directly above the View Profile footer bar */}
      {isPresent(person.designation) && (
        <div className="px-6 pt-3 z-10">
          <span
            className="text-[10px] font-black uppercase tracking-widest"
            style={{ color: acc }}
          >
            {person.designation}
          </span>
        </div>
      )}

      {/* Zone C — impact strip */}
      <div
        className="bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4 z-10"
        style={{ padding: '1.25rem 1.5rem' }}
      >
        <span className="text-slate-600 text-xs font-medium italic leading-relaxed max-w-[80%] text-left line-clamp-2">
          {latestAchievement ? latestAchievement.title : 'Profile details available inside.'}
        </span>
        <button
          className="flex items-center gap-1 font-bold text-xs hover:opacity-70 transition-opacity focus:outline-none select-none shrink-0"
          style={{ color: acc }}
        >
          <span className="uppercase tracking-widest font-bold text-[10px] hidden sm:inline">View Profile</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

const ListBlock = ({ icon: Icon, title, items, acc, renderItem, emptyLabel }) => (
  <section>
    <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
      <Icon className="w-4 h-4" style={{ color: acc }} /> {title}
    </h3>
    {!items || items.length === 0 ? (
      <p className="text-slate-400 font-medium text-sm">{emptyLabel}</p>
    ) : (
      <div className="flex flex-col gap-3">
        {items.map((item, i) => (
          <div key={i} className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
            {renderItem(item)}
          </div>
        ))}
      </div>
    )}
  </section>
);

const FacultyDetail = ({ person, onBack }) => {
  const acc = accentFor(person._id || person.id || person.name);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}
      className="flex flex-col gap-8 max-w-5xl mx-auto w-full"
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 w-fit px-4 py-2 rounded-xl bg-white/80 backdrop-blur-md border border-slate-200 shadow-sm text-sm font-bold text-slate-600 hover:text-blue-600 hover:shadow-md transition-all group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Directory
      </button>

      <div className="bg-white/90 backdrop-blur-3xl rounded-[3rem] border border-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-8 md:p-16 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-[500px] blur-[120px] opacity-10 pointer-events-none" style={{ backgroundColor: acc }} />

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start gap-8 mb-12 relative z-10 border-b border-slate-100 pb-12">
          {person.photo || person.photoUrl || person.image ? (
            <img
              src={person.photo || person.photoUrl || person.image}
              alt={person.name}
              className="w-48 h-48 md:w-72 md:h-72 rounded-[2rem] object-cover shadow-sm flex-shrink-0 border mx-auto md:mx-0"
              style={{ borderColor: `${acc}30` }}
            />
          ) : (
            <div
              className="w-48 h-48 md:w-72 md:h-72 rounded-[2rem] bg-white border flex items-center justify-center shadow-sm flex-shrink-0 text-6xl font-black mx-auto md:mx-0"
              style={{ color: acc, borderColor: `${acc}30` }}
            >
              {initialsFor(person.name)}
            </div>
          )}

          <div className="flex flex-col gap-3 flex-1 min-w-0 w-full text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 flex-wrap">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">{person.name}</h2>
              {isPinned(person.name) && (
                <span
                  className="inline-block px-2.5 py-1 rounded text-xs font-black tracking-widest uppercase text-white"
                  style={{ backgroundColor: acc }}
                >
                  HOD
                </span>
              )}
            </div>
            {isPresent(person.designation) && (
              <p className="text-lg font-bold" style={{ color: acc }}>{person.designation}</p>
            )}
            {isPresent(person.description) && (
              <p className="text-slate-600 font-medium leading-relaxed mt-2 break-words">{person.description}</p>
            )}
          </div>
        </div>

        {/* Content — each block is skipped entirely when the underlying field
            is null/undefined; if the field is present (even as an empty
            array) the block renders with its normal empty-state message. */}
        <div className="flex flex-col gap-10 relative z-10">
          {isPresent(person.achievementsAndHonors) && (
            <ListBlock
              icon={Award}
              title="Achievements & Honors"
              items={person.achievementsAndHonors}
              acc={acc}
              emptyLabel="No achievements listed yet."
              renderItem={(a) => (
                <>
                  <p className="font-bold text-slate-900">{a.title}</p>
                  {a.description && (
                    <p className="text-sm text-slate-500 font-medium mt-1">{a.description}</p>
                  )}
                  {a.year && <p className="text-xs text-slate-400 font-mono mt-1">{a.year}</p>}
                </>
              )}
            />
          )}

          {isPresent(person.projects) && (
            <ListBlock
              icon={FolderKanban}
              title="Projects"
              items={person.projects}
              acc={acc}
              emptyLabel="No projects listed yet."
              renderItem={(p) => (
                <>
                  <p className="font-bold text-slate-900">{p.title}</p>
                  {p.description && <p className="text-sm text-slate-500 font-medium mt-1">{p.description}</p>}
                  {p.year && <p className="text-xs text-slate-400 font-mono mt-1">{p.year}</p>}
                </>
              )}
            />
          )}

          {isPresent(person.researchPapers) && (
            <ListBlock
              icon={FileText}
              title="Research Papers"
              items={person.researchPapers}
              acc={acc}
              emptyLabel="No research papers listed yet."
              renderItem={(paper) => (
                <>
                  <p className="font-bold text-slate-900">{paper.title}</p>
                  <p className="text-sm text-slate-500 font-medium mt-1">
                    {[paper.journal, paper.year].filter(Boolean).join(' · ')}
                  </p>
                  {paper.link ? (
                    <a
                      href={paper.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-bold mt-1 inline-block hover:underline"
                      style={{ color: acc }}
                    >
                      View publication →
                    </a>
                  ) : null}
                </>
              )}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
const FacultyDirectory = () => {
  const { faculty, status, error, refetch } = useFacultyList();
  const [selected, setSelected] = useState(null);

  const handleSelect = useCallback((person) => setSelected(person), []);
  const handleBack = useCallback(() => setSelected(null), []);

  return (
    <div className="w-full py-20 px-6 md:px-12 font-sans">
      <div className="max-w-[1600px] w-full mx-auto flex flex-col">
        <AnimatePresence mode="wait">
          {!selected ? (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <SectionHeader />

              {status === 'loading' && <LoadingState />}
              {status === 'error' && <ErrorState error={error} onRetry={refetch} />}
              {status === 'ready' && faculty.length === 0 && <EmptyState />}
              {status === 'ready' && faculty.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                  {faculty.map((person, i) => (
                    <FacultyCard key={person._id || person.id || i} person={person} index={i} onClick={handleSelect} />
                  ))}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div key="detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <FacultyDetail person={selected} onBack={handleBack} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FacultyDirectory;