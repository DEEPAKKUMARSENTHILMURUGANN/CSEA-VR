import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import CategoryPage from './CategoryPage';
import { PROJECTS_DATA } from './ProjectsData';
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

const TiltCard = ({ children, className, style, onClick }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg']);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        ...style,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
      whileHover={{ scale: 1.02, zIndex: 10, y: -5 }}
      whileTap={{ scale: 0.98 }}
      className={className}
    >
      <div style={{ transform: 'translateZ(30px)', width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </motion.div>
  );
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
    <div className="w-full text-slate-900" style={{ paddingTop: '2rem', paddingBottom: '5rem', paddingLeft: '5%', paddingRight: '5%' }}>
      <div className="w-full max-w-[1600px] mx-auto relative">
        <AnimatePresence mode="wait">
          {view !== 'home' && (
            <motion.nav 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="sticky top-6 z-50 w-full flex items-center gap-3 px-6 py-4 rounded-3xl bg-white/70 backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-white/50 text-xs text-slate-500 mb-8"
            >
              <button
                className="hover:text-blue-600 cursor-pointer uppercase tracking-widest font-black font-mono text-slate-500 group transition-colors"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', border: 'none', background: 'none' }}
                onClick={handleBackToHome}
              >
                <LayoutGrid className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" /> 
                <span>Gallery Index</span>
              </button>
              {selectedCategory && (
                <>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                  <button
                    className={`hover:text-slate-900 cursor-pointer uppercase tracking-widest font-black font-mono transition-colors ${view === 'category' ? 'text-blue-600' : 'text-slate-400'}`}
                    onClick={view === 'project' ? handleBackToCategory : undefined}
                    disabled={view === 'category'}
                  >
                    {selectedCategory.name}
                  </button>
                </>
              )}
              {view === 'project' && selectedProject && (
                <>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                  <span className="text-violet-600 bg-violet-50 px-3 py-1 rounded-md border border-violet-100 uppercase tracking-widest font-bold font-mono">
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
              <div className="flex flex-col items-center text-center gap-6 pb-12 border-b border-slate-200/60">
                <div className="flex flex-col items-center gap-3 max-w-3xl">
                  <div className="flex items-center gap-2 justify-center bg-blue-50/80 border border-blue-100 px-4 py-1.5 rounded-full shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-[10px] font-black text-blue-700 font-mono uppercase tracking-widest">CSEA Scholarly Archive</span>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] mt-3">
                    Student Innovation<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">Exhibition Space</span>
                  </h1>
                  <p className="text-base text-slate-600 mt-4 leading-relaxed max-w-2xl font-medium">
                    A high-end, digital index showcasing elite computer science research, IoT controllers, full-stack systems, and national award champions.
                  </p>
                </div>

                <div className="flex gap-16 font-mono justify-center mt-6">
                  <div className="flex flex-col items-center">
                    <span className="text-5xl font-extrabold text-blue-600">{totalProjects}</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mt-2">Active Exhibits</span>
                  </div>
                  <div className="w-px h-16 bg-slate-200" />
                  <div className="flex flex-col items-center">
                    <span className="text-5xl font-extrabold text-violet-600">04</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mt-2">Research Tracks</span>
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
                    <motion.div key={featuredProject.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="w-full">
                      <TiltCard onClick={() => handleProjectClick(featuredProject)} className="group relative rounded-3xl border border-slate-200 bg-white/60 backdrop-blur-2xl hover:bg-white/80 p-10 md:p-14 flex flex-col gap-8 items-center cursor-pointer transition-all duration-500 overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.1)] hover:-translate-y-2 text-center w-full max-w-full box-border">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                      <div className="flex flex-col items-center gap-4 w-full relative z-10">
                        <div className="flex items-center gap-2 justify-center">
                          <span className="text-2xl bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">{featuredProject.icon}</span>
                          <div className="flex items-center gap-1.5">
                            {featuredProject.tags.slice(0, 2).map(tag => (
                              <span key={tag} className="text-[9px] font-mono tracking-widest uppercase font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{tag}</span>
                            ))}
                          </div>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">{featuredProject.name}</h3>
                        <p className="text-sm text-slate-500 leading-relaxed max-w-xl">{featuredProject.shortDesc}</p>
                        <div className="flex flex-wrap gap-2 justify-center pt-1">
                          {featuredProject.techStack.slice(0, 5).map(tech => (
                            <span key={tech} className="text-[10px] font-mono text-slate-600 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg">{tech}</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3 items-stretch justify-center mt-2">
                        <div className="p-3 rounded-2xl bg-white/80 border border-slate-200 shadow-sm flex items-center gap-3" style={{ height: '56px' }}>
                          <div className="flex -space-x-2">
                            {featuredProject.teamMembers.map((m, idx) => (
                              <div key={idx} className="w-8 h-8 rounded-full border border-white flex items-center justify-center font-bold text-[9px] text-white shadow-sm" style={{ backgroundColor: m.color || '#3b82f6' }}>{m.initials}</div>
                            ))}
                          </div>
                          <div className="flex flex-col leading-none text-left">
                            <span className="text-[9px] text-slate-400 font-mono uppercase tracking-wider font-black">COLLABORATORS</span>
                            <span className="text-xs text-slate-800 font-bold mt-1">PSG CSE Squad</span>
                          </div>
                        </div>
                        <button 
                          className="rounded-2xl bg-slate-900 text-white font-mono font-black text-xs uppercase hover:bg-blue-600 transition-all shadow-[0_4px_14px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.2)]"
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
                      </TiltCard>
                    </motion.div>
                  </AnimatePresence>
                </div>
              )}

              <div className="relative z-40 max-w-2xl mx-auto w-full -mt-6">
                <div className="flex items-center gap-4 bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] focus-within:shadow-[0_10px_40px_rgba(37,99,235,0.15)] p-4 rounded-2xl border border-white focus-within:border-blue-200 transition-all duration-300 w-full box-border">
                  <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  <input
                    type="text"
                    value={globalSearchQuery}
                    onChange={(e) => setGlobalSearchQuery(e.target.value)}
                    placeholder="Search projects, technologies, or keywords..."
                    className="w-full bg-transparent border-none outline-none text-base text-slate-800 placeholder-slate-400 font-sans font-medium"
                  />
                </div>

                <AnimatePresence>
                  {globalSearchQuery && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute left-0 right-0 mt-3 p-3 bg-white/95 backdrop-blur-3xl border border-slate-100 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex flex-col gap-1 max-h-96 overflow-y-auto">
                      {searchedProjects.length > 0 ? (
                        searchedProjects.map((p, idx) => (
                          <button key={idx} onClick={() => handleProjectClick(p)} className="w-full p-3 rounded-xl hover:bg-slate-50 flex justify-between items-center text-left border border-transparent hover:border-slate-100 transition-colors">
                            <div className="flex items-center gap-4 min-w-0">
                              <span className="text-2xl w-12 h-12 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center shadow-sm">{p.icon}</span>
                              <div className="flex flex-col min-w-0">
                                <span className="text-sm font-bold text-slate-900 leading-tight">{p.name}</span>
                                <span className="text-xs text-slate-500 truncate mt-0.5 max-w-md">{p.shortDesc}</span>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-blue-500" />
                          </button>
                        ))
                      ) : (
                        <div className="p-6 text-center text-sm text-slate-500 font-medium">No matches found.</div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex flex-col gap-6 mt-4">
                <div className="flex flex-col gap-2 pl-2">
                  <h2 className="text-xl font-black tracking-tight text-slate-800 flex items-center gap-2">
                    Research Tracks
                  </h2>
                  <p className="text-sm text-slate-500">Explore projects categorized by academic level and domain.</p>
                </div>
                
                {/* BENTO BOX GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
                  {CATEGORIES.map((cat, i) => {
                    // Make the first item span 2 columns on desktop
                    const isLarge = i === 0;
                    return (
                      <motion.div
                        layoutId={`category-container-${cat.id}`}
                        key={cat.id}
                        onClick={() => handleCategoryClick(cat)}
                        className={`group cursor-pointer relative overflow-hidden rounded-[2.5rem] bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_15px_35px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col p-8 ${isLarge ? 'md:col-span-2' : 'md:col-span-1'}`}
                      >
                        {/* Decorative background blob */}
                        <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full blur-[80px] opacity-20 transition-opacity duration-500 group-hover:opacity-40" style={{ backgroundColor: cat.accentColor }} />
                        
                        <div className="flex justify-between items-start relative z-10 w-full mb-auto">
                          <div
                            className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm border border-white"
                            style={{ backgroundColor: `${cat.accentColor}15` }}
                          >
                            {getCategoryIcon(cat.id, cat.accentColor)}
                          </div>
                          <span className="text-4xl font-black text-slate-200 font-mono select-none pointer-events-none drop-shadow-sm">{cat.number}</span>
                        </div>

                        <div className="flex flex-col gap-2 relative z-10 mt-6">
                          <motion.span layoutId={`category-tagline-${cat.id}`} className="text-[10px] font-black font-mono uppercase tracking-widest" style={{ color: cat.accentColor }}>{cat.tagline}</motion.span>
                          <motion.h3 layoutId={`category-title-${cat.id}`} className="text-2xl font-black text-slate-900 tracking-tight leading-tight">{cat.name}</motion.h3>
                          {isLarge && (
                            <motion.p layoutId={`category-desc-${cat.id}`} className="text-sm text-slate-500 leading-relaxed mt-2 max-w-md">{cat.description}</motion.p>
                          )}
                        </div>

                        <div className="absolute bottom-8 right-8 w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200 group-hover:bg-slate-900 group-hover:border-slate-900 transition-colors duration-300 shadow-sm z-10">
                          <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors duration-300" />
                        </div>
                      </motion.div>
                    );
                  })}
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