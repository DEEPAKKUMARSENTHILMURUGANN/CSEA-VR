import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ChevronRight, ThumbsUp, SlidersHorizontal, Inbox } from 'lucide-react';

import { PROJECTS_DATA } from './ProjectsData';

const CategoryPage = ({ category, onProjectClick }) => {
  const projects = PROJECTS_DATA[category.id] || [];
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState(null);
  const [likes, setLikes] = useState({});

  useEffect(() => {
    const savedLikes = localStorage.getItem('psg_innovation_likes');
    if (savedLikes) {
      try {
        setLikes(JSON.parse(savedLikes));
      } catch (e) {}
    } else {
      const initial = {};
      projects.forEach(p => {
        initial[p.name] = Math.floor(Math.random() * 25) + 32;
      });
      setLikes(initial);
      localStorage.setItem('psg_innovation_likes', JSON.stringify(initial));
    }
  }, [category.id, projects]);

  const handleLike = (e, projectName) => {
    e.stopPropagation();
    const updated = {
      ...likes,
      [projectName]: (likes[projectName] || 0) + 1
    };
    setLikes(updated);
    localStorage.setItem('psg_innovation_likes', JSON.stringify(updated));
  };

  const allTags = Array.from(new Set(projects.flatMap(p => p.tags)));

  const filteredProjects = projects.filter((proj) => {
    const matchesSearch = 
      proj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTag = !activeTag || proj.tags.includes(activeTag);
    return matchesSearch && matchesTag;
  });

  return (
    <motion.div layoutId={`category-container-${category.id}`} className="flex flex-col gap-10 w-full bg-white/70 backdrop-blur-3xl rounded-[2.5rem] p-8 md:p-12 border border-white shadow-[0_20px_50px_rgba(0,0,0,0.05)]" style={{ paddingBottom: '5rem' }}>
      
      {/* Category Header Morphing from Bento Box */}
      <div className="relative overflow-hidden flex flex-col justify-between">
        <div className="absolute right-0 top-0 bottom-0 w-96 h-full blur-3xl opacity-10 pointer-events-none" style={{ background: `radial-gradient(circle, ${category.accentColor} 0%, transparent 100%)` }} />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10 w-full">
          <div className="flex items-center gap-6">
            <span className="text-7xl font-sans font-black pointer-events-none text-slate-100 select-none font-mono tracking-tighter">{category.number}</span>
            <div className="flex flex-col gap-2">
              <motion.span layoutId={`category-tagline-${category.id}`} className="text-[10px] font-mono font-black uppercase tracking-widest block px-3 py-1.5 rounded-full w-fit" style={{ color: category.accentColor, backgroundColor: `${category.accentColor}10` }}>
                Track Exhibition Index
              </motion.span>
              <motion.h1 layoutId={`category-title-${category.id}`} className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mt-1 leading-none">{category.name}</motion.h1>
              <motion.p layoutId={`category-desc-${category.id}`} className="text-sm text-slate-500 mt-3 max-w-2xl leading-relaxed">{category.description}</motion.p>
            </div>
          </div>
          <div className="flex-shrink-0 w-20 h-20 rounded-3xl bg-white border border-slate-100 flex items-center justify-center text-4xl shadow-sm">{category.icon}</div>
        </div>
      </div>

      <div className="flex flex-col gap-6 p-7 rounded-3xl border border-slate-200 bg-slate-50/50 backdrop-blur-md">
        <div className="flex flex-col md:flex-row gap-4 items-center w-full">
          <div className="relative flex-grow w-full">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Filter by prototype terminology, compilation tags, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-5 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all font-medium shadow-sm"
            />
          </div>
          {(searchQuery || activeTag) && (
            <button 
              onClick={() => { setSearchQuery(''); setActiveTag(null); }} 
              className="text-xs text-slate-600 bg-white border border-slate-200 hover:bg-slate-100 hover:text-slate-900 rounded-2xl transition-all cursor-pointer whitespace-nowrap font-sans font-bold shadow-sm"
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', height: '48px', padding: '0 1.5rem' }}
            >
              Clear Filters
            </button>
          )}
        </div>
        {allTags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap pt-4 border-t border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1.5 mr-2 tracking-widest">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Domains
            </span>
            {allTags.map((tag) => {
              const isSelected = activeTag === tag;
              return (
                <button 
                  key={tag} 
                  onClick={() => setActiveTag(isSelected ? null : tag)} 
                  className={`text-[11px] font-bold rounded-full transition-all border cursor-pointer font-sans shadow-sm ${isSelected ? 'border-blue-500 text-blue-700 bg-blue-50' : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900 bg-white'}`}
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', height: '32px', padding: '0 1rem' }}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <AnimatePresence mode="popLayout">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((proj, i) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                key={proj.name} 
                onClick={() => onProjectClick(proj)} 
                className="w-full bg-white border border-slate-200 hover:border-blue-300 hover:shadow-[0_15px_40px_rgba(37,99,235,0.08)] rounded-3xl p-7 flex flex-col gap-6 text-left transition-all duration-300 group cursor-pointer relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-blue-600 transition-colors duration-300 shadow-sm">
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>

                <div className="flex items-start gap-4 min-w-0">
                  <div className="w-14 h-14 bg-slate-50 border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-200 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 transition-all duration-300 group-hover:scale-110">{proj.icon}</div>
                  <div className="flex flex-col min-w-0 pt-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-xl font-bold text-slate-900 leading-tight">{proj.name}</h3>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded mt-1 w-fit">CLASS OF {proj.year}</span>
                  </div>
                </div>
                
                <p className="text-sm text-slate-600 font-medium leading-relaxed line-clamp-2 mt-2">{proj.shortDesc}</p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                  <div className="flex gap-1.5 items-center flex-wrap">
                    {proj.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[10px] font-bold text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded-lg">{tag}</span>
                    ))}
                  </div>
                  <button 
                    onClick={(e) => handleLike(e, proj.name)} 
                    className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-rose-500 transition-colors p-2 -mr-2 rounded-xl hover:bg-rose-50"
                  >
                    <ThumbsUp className={`w-4 h-4 ${likes[proj.name] > 40 ? 'text-rose-500 fill-rose-500/20' : ''}`} /> 
                    <span>{likes[proj.name]}</span>
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-20 rounded-3xl border border-dashed border-slate-300 bg-slate-50/50 text-slate-500 text-xs flex flex-col items-center justify-center gap-3 col-span-full">
              <Inbox className="w-10 h-10 text-slate-400 opacity-60" />
              <span className="font-mono text-slate-400 uppercase tracking-widest text-[10px]">No matches meet your filter criteria.</span>
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
export default CategoryPage;