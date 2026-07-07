import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import CategoryPage, { PROJECTS_DATA } from './CategoryPage';
import ProjectDetail from './ProjectDetail';
import { 
  LayoutGrid, 
  Sparkles, 
  Cpu, 
  Layers, 
  Trophy, 
  FolderGit2, 
  ArrowRight,
  ChevronRight,
  Search,
  Award,
  Zap
} from 'lucide-react';

const CATEGORIES = [
  {
    id: 'first-year',
    number: '01',
    name: 'First-Year Projects',
    tagline: 'Fresh perspective prototypes',
    description: 'Foundation-level innovations from fresh-semester CSE students tackling actual ecosystem problems with dynamic, uninhibited designs.',
    count: '3',
    icon: '🌱',
    accentColor: '#10b981',
  },
  {
    id: 'mini',
    number: '02',
    name: 'Mini Projects',
    tagline: 'Domain-specific applications',
    description: 'Focused problem-solving systems built in second-year teams using applied software paradigms, BLE modules, and localized hardware.',
    count: '2',
    icon: '⚡',
    accentColor: '#3b82f6',
  },
  {
    id: 'capstone',
    number: '03',
    name: 'Capstone Projects',
    tagline: 'Full-Scale Industrial Systems',
    description: 'Comprehensive, deployment-caliber engineering exhibits designed over full academic year blocks, complete with system optimizations.',
    count: '2',
    icon: '🏺',
    accentColor: '#a855f7',
  },
  {
    id: 'hackathon',
    number: '04',
    name: 'Hackathon Classics',
    tagline: 'National & Global Champions',
    description: 'Award-winning projects assembled by CSE squads under intense time scales and tested under live field conditions.',
    count: '1',
    icon: '🏆',
    accentColor: '#f59e0b',
  },
];

const getCategoryIcon = (id, color) => {
  switch (id) {
    case 'first-year': return <Sparkles className="w-5 h-5" style={{ color }} />;
    case 'mini': return <Cpu className="w-5 h-5" style={{ color }} />;
    case 'capstone': return <Layers className="w-5 h-5" style={{ color }} />;
    case 'hackathon': return <Trophy className="w-5 h-5" style={{ color }} />;
    default: return <FolderGit2 className="w-5 h-5" style={{ color }} />;
  }
};

const Zone2 = () => {
  const [view, setView] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [activePromoIndex, setActivePromoIndex] = useState(0);

  const flatFeaturedList = Object.entries(PROJECTS_DATA).flatMap(([catId, list]) => 
    list.map(p => ({ ...p, catId }))
  ).filter(p => p.tags.includes('AI') || p.tags.includes('IoT') || p.tags.includes('Blockchain'));

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePromoIndex(prev => (prev + 1) % flatFeaturedList.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [flatFeaturedList.length]);

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    setView('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProjectClick = (project) => {
    const catId = Object.keys(PROJECTS_DATA).find(key => 
      PROJECTS_DATA[key].some(p => p.name === project.name)
    );
    const cat = CATEGORIES.find(c => c.id === catId);
    if (cat) setSelectedCategory(cat);
    setSelectedProject(project);
    setView('project');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setSelectedCategory(null);
    setSelectedProject(null);
    setView('home');
    setGlobalSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCategory = () => {
    setSelectedProject(null);
    setView('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalProjects = Object.values(PROJECTS_DATA).reduce((acc, current) => acc + current.length, 0);
  const allProjectsFlattened = Object.entries(PROJECTS_DATA).flatMap(([catId, projs]) => 
    projs.map(p => ({ ...p, catId }))
  );

  const searchedProjects = globalSearchQuery
    ? allProjectsFlattened.filter(p => 
        p.name.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
        p.shortDesc.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
        p.techStack.some(t => t.toLowerCase().includes(globalSearchQuery.toLowerCase()))
      )
    : [];

  const featuredProject = flatFeaturedList[activePromoIndex] || flatFeaturedList[0];

  return (
    <div className="w-full text-gray-200" style={{ paddingTop: '3.5rem', paddingBottom: '6rem', paddingLeft: '5%', paddingRight: '5%' }}>
      <div className="max-w-7xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {view !== 'home' && (
            <motion.nav 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl border border-white/[0.06] bg-[#0b0f19]/80 backdrop-blur-xl text-[10px]"
              style={{ marginBottom: '2rem' }}
            >
              <button
                className="hover:text-[#5ef1df] cursor-pointer uppercase tracking-widest font-black font-mono text-gray-400 group"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', border: 'none', background: 'none' }}
                onClick={handleBackToHome}
              >
                <LayoutGrid className="w-4 h-4 text-gray-500 group-hover:text-[#5ef1df]" /> 
                <span>Gallery Index</span>
              </button>
              {selectedCategory && (
                <>
                  <ChevronRight className="w-4 h-4 text-gray-700" />
                  <button
                    className={`hover:text-white cursor-pointer uppercase tracking-widest font-black font-mono ${view === 'category' ? 'text-[#5ef1df]' : 'text-gray-400'}`}
                    onClick={view === 'project' ? handleBackToCategory : undefined}
                    disabled={view === 'category'}
                  >
                    {selectedCategory.name}
                  </button>
                </>
              )}
              {view === 'project' && selectedProject && (
                <>
                  <ChevronRight className="w-4 h-4 text-gray-700" />
                  <span className="text-[#a855f7] bg-[#a855f7]/10 px-3 py-1 rounded-md border border-[#a855f7]/20 uppercase tracking-widest font-bold font-mono">
                    {selectedProject.name}
                  </span>
                </>
              )}
            </motion.nav>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div key="home" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} className="flex flex-col gap-16 w-full">
              <div className="flex flex-col items-center text-center gap-8 pb-10 border-b border-white/[0.04]">
                <div className="flex flex-col items-center gap-3 max-w-3xl">
                  <div className="flex items-center gap-2 justify-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#5ef1df] animate-pulse" />
                    <span className="text-[11px] font-bold text-[#5ef1df] font-mono uppercase tracking-widest">CSEA SCHOLARLY ARCHIVE</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-none mt-1">
                    Student Innovation{' '}
                    <span className="bg-gradient-to-r from-[#5ef1df] via-[#3b82f6] to-[#a855f7] bg-clip-text text-transparent">Exhibition Space</span>
                  </h1>
                  <p className="text-sm md:text-base text-gray-400 mt-2 leading-relaxed max-w-2xl">
                    A high-end, digital index showcasing elite computer science research, IoT controllers, full-stack systems, and national award champions developed strictly by PSG tech undergraduate squads.
                  </p>
                </div>

                <div className="flex gap-16 font-mono justify-center mt-4">
                  <div className="flex flex-col items-center">
                    <span className="text-4xl font-extrabold text-[#5ef1df]">{totalProjects}</span>
                    <span className="text-[9px] text-[#6b7280] uppercase tracking-wider font-bold mt-2">Active Exhibits</span>
                  </div>
                  <div className="w-px h-12 bg-white/[0.08]" />
                  <div className="flex flex-col items-center">
                    <span className="text-4xl font-extrabold text-[#a855f7]">04</span>
                    <span className="text-[9px] text-[#6b7280] uppercase tracking-wider font-bold mt-2">Research Tracks</span>
                  </div>
                </div>
              </div>

              {featuredProject && (
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold font-mono tracking-widest text-[#a855f7] uppercase flex items-center gap-2">
                      <Award className="w-4 h-4 text-[#a855f7] animate-bounce" /> CURATOR'S FEATURED SHOWCASE
                    </span>
                    <div className="flex gap-1.5">
                      {flatFeaturedList.map((_, i) => (
                        <button key={i} onClick={() => setActivePromoIndex(i)} className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activePromoIndex === i ? 'bg-[#5ef1df] w-6' : 'bg-white/10 hover:bg-white/30'}`} />
                      ))}
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div key={featuredProject.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => handleProjectClick(featuredProject)} className="group relative rounded-3xl border border-white/[0.05] bg-[#0c1223]/25 hover:bg-[#0c1223]/40 p-10 md:p-14 flex flex-col gap-8 items-center cursor-pointer transition-all duration-500 overflow-hidden shadow-2xl text-center">
                      <div className="flex flex-col items-center gap-3 w-full">
                        <div className="flex items-center gap-2 justify-center">
                          <span className="text-2xl bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">{featuredProject.icon}</span>
                          <div className="flex items-center gap-1.5">
                            {featuredProject.tags.slice(0, 2).map(tag => (
                              <span key={tag} className="text-[9px] font-mono tracking-widest uppercase font-bold text-[#5ef1df] bg-[#5ef1df]/5 px-2 py-0.5 rounded border border-[#5ef1df]/15">{tag}</span>
                            ))}
                          </div>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white group-hover:text-[#5ef1df] transition-colors">{featuredProject.name}</h3>
                        <p className="text-sm text-gray-400 leading-relaxed max-w-xl">{featuredProject.shortDesc}</p>
                        <div className="flex flex-wrap gap-2 justify-center pt-1">
                          {featuredProject.techStack.slice(0, 5).map(tech => (
                            <span key={tech} className="text-[10px] font-mono text-gray-300 bg-white/[0.06] border border-white/10 px-2.5 py-1 rounded-lg">{tech}</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3 items-stretch justify-center mt-2">
                        <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-3" style={{ height: '56px' }}>
                          <div className="flex -space-x-2">
                            {featuredProject.teamMembers.map((m, idx) => (
                              <div key={idx} className="w-8 h-8 rounded-full border border-[#030712] flex items-center justify-center font-bold text-[9px] text-black shadow-lg" style={{ backgroundColor: m.color || '#5ef1df' }}>{m.initials}</div>
                            ))}
                          </div>
                          <div className="flex flex-col leading-none text-left">
                            <span className="text-[9px] text-gray-500 font-mono uppercase tracking-wider font-black">COLLABORATORS</span>
                            <span className="text-xs text-white font-semibold mt-1">PSG CSE Squad</span>
                          </div>
                        </div>
                        <button 
                          className="rounded-2xl bg-white text-black font-mono font-black text-xs uppercase hover:bg-[#5ef1df] transition-all"
                          style={{ 
                            height: '56px', 
                            padding: '0 2rem', 
                            display: 'inline-flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            gap: '0.5rem',
                            border: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          <span>LAUNCH PROTOTYPE</span>
                          <ArrowRight className="w-4 h-4 shrink-0" />
                        </button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              )}

              <div className="relative">
                <div className="flex items-center gap-4 bg-[#0a0f1d]/60 hover:bg-[#0a0f1d]/80 p-5 rounded-3xl border border-white/[0.05] focus-within:border-[#5ef1df]/40 transition-all duration-300">
                  <Search className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  <input
                    type="text"
                    value={globalSearchQuery}
                    onChange={(e) => setGlobalSearchQuery(e.target.value)}
                    placeholder="Instantly lookup student projects, software microcontrollers, stack chips, or engineers..."
                    className="w-full bg-transparent border-none outline-none text-xs md:text-sm text-white placeholder-gray-500 font-sans"
                  />
                </div>

                <AnimatePresence>
                  {globalSearchQuery && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute left-0 right-0 mt-3 p-4 bg-[#080d19] border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-50 flex flex-col gap-2 max-h-96 overflow-y-auto">
                      {searchedProjects.length > 0 ? (
                        searchedProjects.map((p, idx) => (
                          <button key={idx} onClick={() => handleProjectClick(p)} className="w-full p-3 rounded-2xl hover:bg-white/[0.03] flex justify-between items-center text-left border border-transparent hover:border-white/5">
                            <div className="flex items-center gap-4 min-w-0">
                              <span className="text-xl w-10 h-10 bg-white/5 rounded-xl border border-white/5 flex items-center justify-center">{p.icon}</span>
                              <div className="flex flex-col min-w-0">
                                <span className="text-xs font-bold text-white leading-tight">{p.name}</span>
                                <span className="text-[10px] text-gray-500 truncate mt-0.5 max-w-md">{p.shortDesc}</span>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-[#5ef1df] opacity-60" />
                          </button>
                        ))
                      ) : (
                        <div className="p-6 text-center text-xs text-gray-500 font-mono">No matches found.</div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex flex-col gap-8">
                <div className="flex flex-col items-center gap-2">
                  <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-[#5ef1df]" /> DIRECT SELECTION TRACKS
                  </h2>
                  <p className="text-[10px] text-gray-600 font-mono">Browse all 4 research segments and explore registered projects</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {CATEGORIES.map((cat) => (
                    <motion.button
                      key={cat.id}
                      whileHover={{ y: -6, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleCategoryClick(cat)}
                      className="group relative rounded-2xl border border-white/[0.06] bg-[#090d16]/60 hover:bg-[#0c1223]/80 hover:border-white/[0.12] text-center flex flex-col cursor-pointer overflow-hidden transition-all duration-400 shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
                      style={{ minHeight: '300px' }}
                    >
                      {/* Top accent bar */}
                      <div className="h-[3px] w-full" style={{ backgroundColor: cat.accentColor }} />

                      {/* Card body */}
                      <div className="flex flex-col items-center flex-grow gap-5 px-6 pt-9 pb-6">
                        {/* Icon */}
                        <div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg border border-white/[0.06]"
                          style={{ backgroundColor: `${cat.accentColor}14` }}
                        >
                          {getCategoryIcon(cat.id, cat.accentColor)}
                        </div>

                        {/* Segment & count */}
                        <div className="flex items-center gap-1.5">
                          <span className="text-[8px] font-mono text-[#6b7280] tracking-widest font-black uppercase">SEG</span>
                          <span className="text-[8px] font-extrabold text-white font-mono">{cat.number}</span>
                          <span className="w-1 h-1 rounded-full" style={{ backgroundColor: cat.accentColor }} />
                          <span className="text-[8px] font-mono font-bold" style={{ color: cat.accentColor }}>{cat.count} Registered</span>
                        </div>

                        {/* Main text */}
                        <div className="flex flex-col items-center gap-1.5">
                          <span className="text-[9px] font-bold font-mono uppercase tracking-widest" style={{ color: cat.accentColor }}>{cat.tagline}</span>
                          <h3 className="text-[15px] font-bold text-white tracking-tight leading-tight">{cat.name}</h3>
                          <p className="text-[11px] text-gray-500 leading-relaxed">{cat.description}</p>
                        </div>
                      </div>

                      {/* Footer CTA */}
                      <div className="flex items-center justify-center gap-1.5 py-3 px-5 border-t border-white/[0.06]">
                        <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#6b7280] group-hover:text-white transition-colors duration-200">EXPLORE TRACK</span>
                        <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200" style={{ color: cat.accentColor }} />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {view === 'category' && selectedCategory && (
            <motion.div key="category" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="w-full">
              <CategoryPage category={selectedCategory} onProjectClick={handleProjectClick} />
            </motion.div>
          )}

          {view === 'project' && selectedProject && (
            <motion.div key="project" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} className="w-full">
              <ProjectDetail project={selectedProject} category={selectedCategory} onBackToList={handleBackToCategory} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Zone2;