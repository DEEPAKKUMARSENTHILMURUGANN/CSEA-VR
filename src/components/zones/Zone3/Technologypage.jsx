import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { technologies } from "./zone3data";
import { technologyIcons } from "./icons";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";

function TechnologyPage() {
    const { slug } = useParams();
    const navigate = useNavigate();
    
    const technology = technologies.find((tech) => tech.slug === slug);

    if (!technology) {
        return (
            <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center">
                <h1 className="text-3xl font-bold text-slate-800">Technology Not Found</h1>
            </div>
        );
    }

    const Icon = technologyIcons[technology.slug];
    const accent = technology.accentColor || '#3b82f6';
    const accentLight = accent + '15';

    return (
        <div className="min-h-screen w-full bg-slate-50/50 py-12 px-6 md:px-12 font-sans selection:bg-blue-200">
            <div className="max-w-7xl mx-auto flex flex-col gap-12">
                
                {/* Back Button */}
                <motion.button 
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 w-fit px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-sm text-sm font-bold text-slate-600 hover:text-blue-600 hover:shadow-md transition-all group"
                >
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
                    Back to Technologies
                </motion.button>

                {/* Header Section */}
                <motion.section 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                    className="relative overflow-hidden bg-white/80 backdrop-blur-3xl rounded-[2.5rem] border border-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-10 md:p-16 flex flex-col gap-6"
                >
                    <div className="absolute right-0 top-0 bottom-0 w-96 blur-[100px] opacity-10 pointer-events-none" style={{ backgroundColor: accent }} />
                    
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-8 relative z-10">
                        <div className="w-24 h-24 rounded-[2rem] bg-white border border-slate-100 flex items-center justify-center shadow-sm flex-shrink-0">
                            {Icon && <Icon size={48} color={accent} />}
                        </div>
                        <div className="flex flex-col gap-3">
                            <span className="text-[10px] font-mono font-black uppercase tracking-widest px-4 py-1.5 rounded-full border w-fit" style={{ color: accent, backgroundColor: accentLight, borderColor: accentLight }}>
                                Domain Overview
                            </span>
                            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-none">
                                {technology.title}
                            </h1>
                            <p className="text-base md:text-xl text-slate-500 font-medium leading-relaxed max-w-3xl mt-2">
                                {technology.shortDescription}
                            </p>
                        </div>
                    </div>
                </motion.section>

                {/* Laboratories Grid */}
                <section className="flex flex-col gap-8 mt-4">
                    <div className="flex items-center gap-4">
                        <span className="w-2 h-8 rounded-full" style={{ backgroundColor: accent }}></span>
                        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Explore Our Laboratories</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {technology.labs.map((lab, index) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                key={lab.id}
                                onClick={() => navigate(`/technology/${technology.slug}/lab/${lab.id}`)}
                                className="group relative bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden border border-slate-200 cursor-pointer shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 flex flex-col"
                            >
                                {/* Lab Image */}
                                <div className="relative h-64 overflow-hidden w-full">
                                    <img 
                                        src={lab.images[0]} 
                                        alt={lab.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {/* Subtle gradient overlay to ensure badge visibility */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/10"></div>
                                    
                                    <span className="absolute top-4 left-4 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-xs font-bold shadow-sm" style={{ color: accent }}>
                                        {lab.room}
                                    </span>
                                    
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-white/20 backdrop-blur-md text-white font-bold text-sm border border-white/30 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg translate-y-4 group-hover:translate-y-0 whitespace-nowrap">
                                        Explore Lab →
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8 flex flex-col gap-2 flex-grow">
                                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                                        {lab.name}
                                    </h3>
                                    <p className="text-sm text-slate-500 font-medium leading-relaxed">
                                        {lab.subtitle}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default TechnologyPage;