import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  MonitorPlay,
  ThumbsUp,
  Code2,
  Users,
  Activity,
  MessageSquare,
  Play,
  Pause
} from 'lucide-react';

const getVideoUrl = (projectName) => {
  switch (projectName) {
    case 'Eco-Sort Smart Bin':
      return 'https://assets.mixkit.co/videos/preview/mixkit-circuit-board-of-a-computer-43033-large.mp4';
    case 'IoT Smart Plant Waterer':
      return 'https://assets.mixkit.co/videos/preview/mixkit-water-dripping-on-leaves-of-a-green-plant-40097-large.mp4';
    case 'Campus Energy Monitor':
      return 'https://assets.mixkit.co/videos/preview/mixkit-server-room-with-blue-lights-42841-large.mp4';
    case 'Smart Campus Navigator':
      return 'https://assets.mixkit.co/videos/preview/mixkit-pointer-on-a-digital-map-of-a-city-43004-large.mp4';
    case 'Sign2Text Translator':
      return 'https://assets.mixkit.co/videos/preview/mixkit-hands-typing-on-a-keyboard-in-a-cyber-style-43048-large.mp4';
    case 'AI Crop Disease Predictor':
      return 'https://assets.mixkit.co/videos/preview/mixkit-drone-flying-over-a-green-field-42289-large.mp4';
    case 'Decentralized Voting System':
      return 'https://assets.mixkit.co/videos/preview/mixkit-cyber-security-system-concept-with-binary-codes-48922-large.mp4';
    case 'MedConnect Disaster Relief':
      return 'https://assets.mixkit.co/videos/preview/mixkit-connection-of-world-map-nodes-43007-large.mp4';
    default:
      return 'https://assets.mixkit.co/videos/preview/mixkit-code-running-on-a-computer-screen-2224-large.mp4';
  }
};

const getVideoPoster = (projectName) => {
  switch (projectName) {
    case 'Eco-Sort Smart Bin':
      return 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80';
    case 'IoT Smart Plant Waterer':
      return 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80';
    case 'Campus Energy Monitor':
      return 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80';
    case 'Smart Campus Navigator':
      return 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80';
    case 'Sign2Text Translator':
      return 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80';
    case 'AI Crop Disease Predictor':
      return 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80';
    case 'Decentralized Voting System':
      return 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80';
    case 'MedConnect Disaster Relief':
      return 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80';
    default:
      return 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80';
  }
};

const ProjectDetail = ({ project, category, onBackToList }) => {
  const [likes, setLikes] = useState(42);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  
  const handleLike = (e) => {
    e.stopPropagation();
    setLikes(prev => prev + 1);
  };

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.load();
      setIsPlaying(false);
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
          <div 
            className="lg:sticky lg:top-20 flex flex-col gap-6 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2 no-scrollbar"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            <style>{`
              .no-scrollbar::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}
              className="w-full bg-white/80 backdrop-blur-3xl rounded-[2.5rem] border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.06)] p-8 md:p-10 flex flex-col gap-6 overflow-hidden relative shrink-0 animate-fade-in"
            >
              <div className="absolute right-0 top-0 w-64 h-64 blur-3xl opacity-10 pointer-events-none" style={{ background: `radial-gradient(circle, ${category?.accentColor || '#3b82f6'} 0%, transparent 100%)` }} />
              
              {/* Header layout: Icon next to Title & Class Pill */}
              <div className="flex flex-row items-center gap-4 md:gap-5 z-10">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-center text-4xl md:text-5xl shadow-sm shrink-0">
                  {project.icon}
                </div>
                <div className="flex flex-col gap-1.5 min-w-0">
                  <span className="text-[9px] md:text-[10px] font-mono font-black uppercase tracking-widest block px-2.5 py-1 rounded-full w-fit border" style={{ color: category?.accentColor || '#3b82f6', borderColor: `${category?.accentColor || '#3b82f6'}30`, backgroundColor: `${category?.accentColor || '#3b82f6'}10` }}>
                    CLASS OF {project.year}
                  </span>
                  <h1 className="text-xl md:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                    {project.name}
                  </h1>
                </div>
              </div>
              
              {/* Description */}
              <div className="relative z-10 mt-1">
                <p className="text-sm md:text-base text-slate-500 leading-relaxed font-medium">{project.shortDesc}</p>
              </div>

              {/* Tags */}
              <div className="flex items-center gap-2 flex-wrap z-10">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm">{tag}</span>
                ))}
              </div>
              
              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mt-2 z-10">
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

            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="w-full bg-white/80 backdrop-blur-3xl rounded-[2.5rem] border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.06)] p-8 lg:p-10 flex flex-col gap-5 overflow-hidden animate-fade-in shrink-0"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-mono font-bold text-slate-800 flex items-center gap-2 uppercase tracking-widest">
                  <MonitorPlay className="w-4 h-4 text-blue-500" /> Project Demo Video
                </h3>
              </div>
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-200/60 shadow-sm group">
                <video
                  ref={videoRef}
                  src={getVideoUrl(project.name)}
                  poster={getVideoPoster(project.name)}
                  className="w-full h-full object-cover"
                  controls={isPlaying}
                  playsInline
                  onPlay={handlePlay}
                  onPause={handlePause}
                />
                {!isPlaying && (
                  <div 
                    onClick={handlePlayClick}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/40 backdrop-blur-[1px] cursor-pointer hover:bg-slate-950/30 transition-all duration-300 z-10"
                  >
                    <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-blue-600 shadow-xl group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      <Play className="w-5 h-5 fill-current translate-x-0.5" />
                    </div>
                    <span className="mt-3 text-[10px] font-mono font-bold text-white uppercase tracking-widest drop-shadow-md">
                      Watch Demo Video
                    </span>
                  </div>
                )}
              </div>
            </motion.div>

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
