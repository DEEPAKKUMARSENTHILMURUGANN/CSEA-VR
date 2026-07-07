import React from "react";
import { technologies } from "./zone3data";
import { technologyIcons } from "./icons";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Zone3() {
    const navigate = useNavigate();

    // Helper to calculate grid span based on index
    const getGridSpan = (index) => {
        if (index === 0) return "md:col-span-2 md:row-span-2"; // First item large
        if (index === 3) return "md:col-span-2"; // Make 4th item span 2 columns
        return "md:col-span-1";
    };

    return (
        <div className="min-h-screen w-full bg-slate-100 py-20 px-6 md:px-12 font-sans selection:bg-blue-200">
            {/* HERO */}
            <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-[1200px] mx-auto text-center mb-20 flex flex-col items-center"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-8">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                    <span className="text-xs font-bold tracking-widest uppercase text-slate-500 font-mono">
                        PSG College of Technology • Dept of CSE
                    </span>
                </div>

                <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-tight mb-6">
                    AI & Emerging <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">Technologies Pavilion</span>
                </h1>

                <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-2xl font-medium">
                    Explore cutting-edge technologies, laboratories and
                    innovation facilities shaping the future of computing.
                </p>
            </motion.section>

            {/* TECHNOLOGY GRID (BENTO BOX) */}
            <section className="max-w-[1600px] w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:auto-rows-[300px]">
                {technologies.map((tech, index) => {
                    const Icon = technologyIcons[tech.slug];
                    const spanClass = getGridSpan(index);
                    const isLarge = spanClass.includes("row-span-2");

                    return (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.02, y: -5 }}
                            key={tech.id}
                            onClick={() => navigate(`/technology/${tech.slug}`)}
                            className={`group relative bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-12 overflow-hidden cursor-pointer shadow-[0_15px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-all duration-500 flex flex-col ${spanClass}`}
                            style={{ 
                                '--accent': tech.accentColor || '#3b82f6',
                                '--accent-light': (tech.accentColor || '#3b82f6') + '15'
                            }}
                        >
                            {/* Abstract gradient glow */}
                            <div 
                                className="absolute -right-20 -top-20 w-64 h-64 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"
                                style={{ backgroundColor: 'var(--accent)' }}
                            />

                            <div className="flex justify-between items-start mb-auto relative z-10">
                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl bg-slate-50 border border-slate-100 shadow-sm group-hover:scale-110 transition-transform duration-500">
                                    {Icon && <Icon size={32} color="var(--accent)" />}
                                </div>
                                <div className="px-4 py-1.5 rounded-full text-xs font-bold border" style={{ color: 'var(--accent)', backgroundColor: 'var(--accent-light)', borderColor: 'var(--accent-light)' }}>
                                    {tech.labsCount} Labs
                                </div>
                            </div>

                            <div className="mt-8 relative z-10 flex flex-col gap-2">
                                <h2 className={`font-black text-slate-900 tracking-tight leading-none group-hover:text-blue-600 transition-colors ${isLarge ? 'text-4xl md:text-5xl' : 'text-2xl md:text-3xl'}`}>
                                    {tech.title}
                                </h2>
                                <p className="text-slate-500 font-medium leading-relaxed max-w-lg mt-2 line-clamp-3">
                                    {tech.shortDescription || "Explore laboratories and facilities under this technology."}
                                </p>
                            </div>

                            {/* Massive background number */}
                            <span className="absolute -bottom-4 -right-2 text-[120px] font-black text-slate-100/50 pointer-events-none font-mono tracking-tighter leading-none group-hover:scale-110 transition-transform duration-700">
                                {String(tech.id).padStart(2, "0")}
                            </span>
                        </motion.div>
                    );
                })}
            </section>
        </div>
    );
}

export default Zone3;