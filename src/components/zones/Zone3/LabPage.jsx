import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { technologies } from "./zone3data";
import { specIcons, sectionIcons } from "./icons";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../../components-css/zone3.css"; // Keep for swiper overrides if any, but relying on tailwind for main layout

function LabPage() {
    const { slug, labId } = useParams();
    const navigate = useNavigate();

    const technology = technologies.find((tech) => tech.slug === slug);

    if (!technology) {
        return (
            <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center">
                <h1 className="text-3xl font-bold text-slate-800">Technology Not Found</h1>
            </div>
        );
    }

    const lab = technology.labs.find((item) => item.id === Number(labId));

    if (!lab) {
        return (
            <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center">
                <h1 className="text-3xl font-bold text-slate-800">Lab Not Found</h1>
            </div>
        );
    }

    const ProcessorIcon = specIcons.processor;
    const RamIcon = specIcons.ram;
    const GpuIcon = specIcons.gpu;
    const SystemIcon = specIcons.systems;

    const SpecificationIcon = sectionIcons.specifications;
    const SoftwareIcon = sectionIcons.software;
    const FacilityIcon = sectionIcons.facilities;
    const ProjectIcon = sectionIcons.projects;

    const accent = technology.accentColor || '#3b82f6';
    const accentLight = accent + '15';

    return (
        <div className="min-h-screen w-full bg-slate-50/50 py-12 px-6 md:px-12 font-sans selection:bg-blue-200">
            <div className="max-w-6xl mx-auto flex flex-col gap-12">
                
                {/* Back Button */}
                <motion.button 
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate(`/technology/${slug}`)}
                    className="flex items-center gap-2 w-fit px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-sm text-sm font-bold text-slate-600 hover:text-blue-600 hover:shadow-md transition-all group"
                >
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
                    Back to Laboratories
                </motion.button>

                {/* HERO */}
                <motion.section 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                    className="flex flex-col items-center text-center mb-4"
                >
                    <span className="text-xs font-mono font-black uppercase tracking-widest px-4 py-1.5 rounded-full border shadow-sm mb-6" style={{ color: accent, backgroundColor: accentLight, borderColor: accentLight }}>
                        {lab.room}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-none mb-4">
                        {lab.name}
                    </h1>
                    <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl leading-relaxed">
                        {lab.subtitle}
                    </p>
                </motion.section>

                {/* GALLERY */}
                <motion.section 
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }}
                    className="w-full rounded-[2.5rem] overflow-hidden border-8 border-white shadow-[0_20px_50px_rgba(0,0,0,0.08)] bg-white relative"
                >
                    <Swiper
                        modules={[Navigation, Pagination]}
                        navigation
                        pagination={{ clickable: true }}
                        loop={true}
                        className="w-full h-[400px] md:h-[600px] rounded-3xl overflow-hidden"
                    >
                        {lab.images.map((image, index) => (
                            <SwiperSlide key={index}>
                                <img
                                    src={image}
                                    alt={lab.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </motion.section>

                {/* CONTENT GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
                    
                    {/* LEFT COLUMN: Main Info */}
                    <div className="lg:col-span-2 flex flex-col gap-8">
                        {/* About */}
                        <motion.section 
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                            className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] border border-white shadow-sm p-8 md:p-12"
                        >
                            <h2 className="text-2xl font-black text-slate-800 mb-4 flex items-center gap-3">
                                <span className="w-2 h-6 rounded-full bg-blue-500"></span>
                                About the Laboratory
                            </h2>
                            <p className="text-slate-600 leading-relaxed font-medium md:text-lg">
                                {lab.description}
                            </p>
                        </motion.section>

                        {/* Projects */}
                        <motion.section 
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
                            className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] border border-white shadow-sm p-8 md:p-12"
                        >
                            <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
                                {ProjectIcon && <ProjectIcon className="w-6 h-6 text-emerald-500" />}
                                Projects Developed
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {lab.projects.map((project, index) => (
                                    <div key={index} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:border-emerald-300 hover:shadow-md transition-all group">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 mb-3 group-hover:scale-150 transition-transform"></div>
                                        <p className="font-bold text-slate-700 text-sm">{project}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.section>
                    </div>

                    {/* RIGHT COLUMN: Specs & Tech */}
                    <div className="lg:col-span-1 flex flex-col gap-8">
                        {/* Hardware */}
                        <motion.section 
                            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                            className="bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-xl p-8 text-white relative overflow-hidden"
                        >
                            <div className="absolute -right-20 -top-20 w-48 h-48 bg-blue-500/20 blur-3xl rounded-full"></div>
                            
                            <h2 className="text-xl font-black mb-6 flex items-center gap-3 text-white relative z-10">
                                {SpecificationIcon && <SpecificationIcon className="w-5 h-5 text-blue-400" />}
                                Hardware Specs
                            </h2>
                            <div className="flex flex-col gap-4 relative z-10">
                                {[
                                    { icon: ProcessorIcon, label: "Processor", val: lab.specifications.processor },
                                    { icon: RamIcon, label: "Memory", val: lab.specifications.ram },
                                    { icon: GpuIcon, label: "Graphics", val: lab.specifications.gpu },
                                    { icon: SystemIcon, label: "Workstations", val: lab.specifications.systems },
                                ].map((spec, i) => (
                                    <div key={i} className="flex items-center gap-4 bg-slate-800/50 border border-slate-700 p-4 rounded-2xl">
                                        <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-blue-400">
                                            {spec.icon && <spec.icon className="w-5 h-5" />}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider">{spec.label}</span>
                                            <span className="text-sm font-bold text-slate-200">{spec.val}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.section>

                        {/* Software */}
                        <motion.section 
                            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
                            className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] border border-white shadow-sm p-8"
                        >
                            <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3">
                                {SoftwareIcon && <SoftwareIcon className="w-5 h-5 text-violet-500" />}
                                Software Stack
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {lab.software.map((software, i) => (
                                    <span key={i} className="px-4 py-2 rounded-xl bg-violet-50 text-violet-700 border border-violet-100 text-xs font-bold shadow-sm">
                                        {software}
                                    </span>
                                ))}
                            </div>
                        </motion.section>

                        {/* Facilities */}
                        <motion.section 
                            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] border border-white shadow-sm p-8"
                        >
                            <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3">
                                {FacilityIcon && <FacilityIcon className="w-5 h-5 text-amber-500" />}
                                Facilities
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {lab.facilities.map((facility, i) => (
                                    <span key={i} className="px-4 py-2 rounded-xl bg-amber-50 text-amber-700 border border-amber-100 text-xs font-bold shadow-sm">
                                        {facility}
                                    </span>
                                ))}
                            </div>
                        </motion.section>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default LabPage;