import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  MonitorPlay,
  ThumbsUp,
  Code2,
  Users,
  Activity,
  MessageSquare
} from 'lucide-react';

const ProjectDetail = ({ project, category, onBackToList }) => {
  const [likes, setLikes] = useState(42);
  const [streamLogs, setStreamLogs] = useState([]);
  
  const handleLike = (e) => {
    e.stopPropagation();
    setLikes(prev => prev + 1);
  };

  useEffect(() => {
    if (project.simulatedPayloads) {
      const logs = project.simulatedPayloads.map((p, i) => ({
        id: i,
        time: "12:04:22",
        badge: p.badge || "SYSTEM",
        input: p.input,
        output: p.output
      }));
      setStreamLogs(logs);
    }
  }, [project]);

  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto text-slate-800" style={{ paddingBottom: '5rem' }}>
      
      <motion.button 
        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
        onClick={onBackToList}
        className="flex items-center gap-2 w-fit px-4 py-2 rounded-xl bg-white/60 hover:bg-white backdrop-blur-xl border border-slate-200 shadow-sm text-sm font-bold text-slate-600 hover:text-blue-600 transition-all group"
      >
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Collection
      </motion.button>

      <div className="flex flex-col lg:flex-row gap-8 w-full">
        
        <div className="w-full lg:w-[45%] flex flex-col gap-6">
          <div className="lg:sticky lg:top-28 flex flex-col gap-6">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}
              className="w-full bg-white/80 backdrop-blur-3xl rounded-[2.5rem] border border-white shadow-[0_20px_50px_rgba(0,0,0,0.06)] p-8 lg:p-10 flex flex-col gap-6 overflow-hidden relative"
            >
              <div className="absolute right-0 top-0 w-64 h-64 blur-3xl opacity-10 pointer-events-none" style={{ background: `radial-gradient(circle, ${category?.accentColor || '#3b82f6'} 0%, transparent 100%)` }} />
              
              <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-center text-5xl shadow-sm z-10">{project.icon}</div>
              
              <div className="flex flex-col gap-3 relative z-10 mt-2">
                <span className="text-[10px] font-mono font-black uppercase tracking-widest block px-3 py-1.5 rounded-full w-fit border" style={{ color: category?.accentColor || '#3b82f6', borderColor: `${category?.accentColor || '#3b82f6'}30`, backgroundColor: `${category?.accentColor || '#3b82f6'}10` }}>
                  CLASS OF {project.year}
                </span>
                <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">{project.name}</h1>
                <p className="text-sm md:text-base text-slate-500 leading-relaxed font-medium mt-2">{project.shortDesc}</p>
              </div>

              <div className="flex items-center gap-2 flex-wrap mt-4 z-10">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm">{tag}</span>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-6 z-10">
                <button 
                  onClick={handleLike}
                  className={`flex-1 flex items-center justify-center gap-2 font-bold transition-all shadow-sm rounded-2xl h-14 border ${likes > 40 ? 'bg-rose-50 border-rose-100 text-rose-600' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                >
                  <ThumbsUp className={`w-5 h-5 ${likes > 40 ? 'fill-rose-500/20' : ''}`} /> 
                  <span className="text-sm">Endorse ({likes})</span>
                </button>
                
                <button 
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-md rounded-2xl h-14"
                >
                  <MonitorPlay className="w-5 h-5" />
                  <span className="text-sm">Launch Demo</span>
                </button>
              </div>
            </motion.div>

            {project.simulatedPayloads && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
                className="w-full bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.2)] p-6 lg:p-8 flex flex-col gap-5 overflow-hidden"
              >
                <div className="flex items-center justify-between border-b border-slate-700/50 pb-4">
                  <h3 className="text-sm font-mono font-bold text-slate-300 flex items-center gap-2 uppercase tracking-widest">
                    <Activity className="w-4 h-4 text-emerald-400" /> Live Data Stream
                  </h3>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                </div>
                <div className="flex flex-col gap-4 font-mono text-[11px] overflow-hidden">
                  <AnimatePresence mode="popLayout">
                    {streamLogs.map((log) => (
                      <motion.div 
                        key={log.id} 
                        initial={{ opacity: 0, x: -10 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex flex-col gap-2 p-3 bg-slate-800/50 rounded-xl border border-slate-700/50"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">[{log.time}] IN:</span>
                          <span className="text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded border border-blue-400/20">{log.badge}</span>
                        </div>
                        <span className="text-emerald-400 break-words">{log.input}</span>
                        <div className="w-full h-px bg-slate-700/30 my-1" />
                        <span className="text-slate-400">OUT: <span className="text-slate-200">{log.output}</span></span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {streamLogs.length === 0 && (
                    <span className="text-slate-600 animate-pulse">Initializing connection...</span>
                  )}
                </div>
              </motion.div>
            )}

          </div>
        </div>

        {/* RIGHT COLUMN: Scrollable Content (White Panels) */}
        <div className="w-full lg:w-[55%] flex flex-col gap-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] border border-white shadow-[0_15px_40px_rgba(0,0,0,0.04)] p-8 lg:p-10 flex flex-col gap-8"
          >
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-black text-slate-800 uppercase tracking-widest font-mono flex items-center gap-2">
                <span className="w-2 h-6 bg-rose-400 rounded-full"></span> Problem Statement
              </h3>
              <p className="text-slate-600 leading-relaxed font-medium md:text-lg">{project.problemStatement}</p>
            </div>
            <div className="w-full h-px bg-slate-100" />
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-black text-slate-800 uppercase tracking-widest font-mono flex items-center gap-2">
                <span className="w-2 h-6 bg-emerald-400 rounded-full"></span> Solution Architecture
              </h3>
              <p className="text-slate-600 leading-relaxed font-medium md:text-lg">{project.solutionOverview}</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] border border-white shadow-[0_15px_40px_rgba(0,0,0,0.04)] p-8 lg:p-10 flex flex-col gap-6"
          >
            <h3 className="text-lg font-black text-slate-800 uppercase tracking-widest font-mono flex items-center gap-2">
              <span className="w-2 h-6 bg-blue-500 rounded-full"></span> Technology Stack
            </h3>
            <div className="flex flex-wrap gap-3 mt-2">
              {project.techStack.map((tech) => (
                <div key={tech} className="bg-slate-50 border border-slate-200 shadow-sm rounded-xl px-4 py-3 flex items-center gap-3 group hover:border-blue-300 hover:shadow-md transition-all cursor-default">
                  <div className="w-2 h-2 rounded-full bg-blue-500 group-hover:scale-150 transition-transform"></div>
                  <span className="font-bold text-slate-700 font-sans text-sm">{tech}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] border border-white shadow-[0_15px_40px_rgba(0,0,0,0.04)] p-8 lg:p-10 flex flex-col gap-6"
          >
            <h3 className="text-lg font-black text-slate-800 uppercase tracking-widest font-mono flex items-center gap-2">
              <span className="w-2 h-6 bg-violet-500 rounded-full"></span> Development Team
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              {project.teamMembers.map((member) => (
                <div key={member.name} className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-2xl p-4 hover:shadow-md hover:border-violet-200 transition-all">
                  <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center font-black text-white shadow-sm" style={{ backgroundColor: member.color || '#3b82f6' }}>
                    {member.initials}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900 text-base">{member.name}</span>
                    <span className="text-xs font-mono font-bold text-slate-500 uppercase">{member.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

    </div>
  );
};

export default ProjectDetail;
