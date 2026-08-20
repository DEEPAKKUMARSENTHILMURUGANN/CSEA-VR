import React from "react";
import { technologies } from "./zone3data";
import { technologyIcons } from "./icons";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../../../components-css/zone3.css";

function Zone3() {
    const navigate = useNavigate();

    // Balanced Bento grid span logic for 12 cards in a 3-column layout
    const getGridSpan = (index) => {
        if (index === 0) return "lg:col-span-2 lg:row-span-2"; // 2x2 Feature Card
        if (index === 5) return "lg:col-span-2";               // 2x1 Wide Card
        if (index === 11) return "lg:col-span-2";              // 2x1 Wide Card (balances bottom row)
        return "lg:col-span-1";
    };

    return (
        <div className="zone3 min-h-screen w-full bg-slate-50/80 py-16 px-6 md:px-12 font-sans selection:bg-blue-200">
            {/* Back Button */}
            <div className="max-w-[1400px] mx-auto mb-6">
                <button className="back-btn" onClick={() => navigate("/")}>
                    <i className="fa-solid fa-arrow-left"></i> Back to Home
                </button>
            </div>

            {/* HERO */}
            <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="hero max-w-[950px] mx-auto text-center mb-16 flex flex-col items-center"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
                    <span className="text-xs font-bold tracking-widest uppercase text-slate-500 font-mono">
                        PSG College of Technology • Dept of CSE
                    </span>
                </div>

                <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight mb-6">
                    AI & Emerging <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">Technologies Pavilion</span>
                </h1>

                <p className="hero-desc text-base md:text-lg text-slate-500 leading-relaxed max-w-2xl font-medium">
                    Explore cutting-edge technologies, laboratories and innovation facilities shaping the future of computing.
                </p>
            </motion.section>

            {/* TECHNOLOGY BENTO GRID */}
            <section className="max-w-[1400px] w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {technologies.map((tech, index) => {
                    const Icon = technologyIcons[tech.slug];
                    const spanClass = getGridSpan(index);
                    const isLarge = spanClass.includes("row-span-2");
                    const isWide = spanClass.includes("col-span-2") && !isLarge;

                    return (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.06 }}
                            whileHover={{ scale: 1.01, y: -4 }}
                            key={tech.id}
                            onClick={() => navigate(`/technology/${tech.slug}`)}
                            className={`group relative bg-white border border-slate-200/80 rounded-3xl p-8 overflow-hidden cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.12)] transition-all duration-500 flex flex-col justify-between h-full min-h-[310px] ${spanClass}`}
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

                            {/* Top Header: Icon & Badge */}
                            <div className="flex justify-between items-center relative z-10 mb-6">
                                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-slate-50 border border-slate-100 shadow-sm group-hover:scale-110 transition-transform duration-500 flex-shrink-0">
                                    {Icon && <Icon size={28} color="var(--accent)" />}
                                </div>
                                <div className="px-3.5 py-1.5 rounded-full text-xs font-bold border" style={{ color: 'var(--accent)', backgroundColor: 'var(--accent-light)', borderColor: 'var(--accent-light)' }}>
                                    {tech.labsCount} Lab{tech.labsCount === 1 ? '' : 's'}
                                </div>
                            </div>

                            {/* Main Body */}
                            {isWide ? (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 my-auto">
                                    <div className="md:col-span-2 flex flex-col gap-2.5">
                                        <h2 className="font-black text-slate-900 tracking-tight leading-snug text-2xl md:text-3xl group-hover:text-blue-600 transition-colors">
                                            {tech.title}
                                        </h2>
                                        <p className="text-slate-500 font-medium leading-relaxed text-sm">
                                            {tech.shortDescription}
                                        </p>
                                    </div>
                                    <div className="hidden md:flex flex-col justify-center gap-2 border-l border-slate-100 pl-6">
                                        <span className="text-[10px] font-mono text-slate-400 uppercase font-black tracking-wider">Focus Areas</span>
                                        <div className="flex flex-wrap gap-1.5">
                                            <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-bold">Research</span>
                                            <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-bold">Innovation</span>
                                            <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-bold">Labs</span>
                                        </div>
                                    </div>
                                </div>
                            ) : isLarge ? (
                                <div className="relative z-10 flex flex-col gap-4 my-auto">
                                    <div className="flex flex-col gap-2.5">
                                        <h2 className="font-black text-slate-900 tracking-tight leading-snug text-3xl md:text-4xl group-hover:text-blue-600 transition-colors">
                                            {tech.title}
                                        </h2>
                                        <p className="text-slate-500 font-medium leading-relaxed text-base">
                                            {tech.shortDescription}
                                        </p>
                                    </div>

                                    {tech.labs && tech.labs.length > 0 && (
                                        <div className="flex flex-col gap-3 border-t border-slate-100 pt-6 mt-2">
                                            <span className="text-[10px] font-mono text-slate-400 uppercase font-black tracking-wider">Associated Facilities</span>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                {tech.labs.slice(0, 4).map((lab) => (
                                                    <div key={lab.id} className="flex items-center gap-2.5 text-xs font-bold text-slate-700 hover:text-blue-600 transition-colors bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
                                                        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: 'var(--accent)' }}></span>
                                                        <span className="truncate">{lab.name}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="relative z-10 flex flex-col gap-2.5 my-auto">
                                    <h2 className="font-black text-slate-900 tracking-tight leading-snug text-xl md:text-2xl group-hover:text-blue-600 transition-colors">
                                        {tech.title}
                                    </h2>
                                    <p className="text-slate-500 font-medium leading-relaxed text-sm">
                                        {tech.shortDescription}
                                    </p>
                                </div>
                            )}

                            {/* Bottom CTA Row */}
                            <div className="relative z-10 flex items-center justify-between text-sm font-bold pt-4 border-t border-slate-100 mt-6" style={{ color: 'var(--accent)' }}>
                                <span>Explore Domain</span>
                                <span className="group-hover:translate-x-1.5 transition-transform text-base">→</span>
                            </div>

                            {/* Background card number */}
                            <span className="absolute bottom-2 right-3 text-[90px] font-black text-slate-100/50 pointer-events-none font-mono tracking-tighter leading-none group-hover:scale-105 transition-transform duration-700 select-none z-0">
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