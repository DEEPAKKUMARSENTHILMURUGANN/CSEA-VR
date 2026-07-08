import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, ArrowRight, ArrowLeft } from 'lucide-react';
// import '../../../components-css/ResearchInnovationCorner.css'; // Removed old dark theme CSS

/* ============================================================
   DATA: 4 Research Categories x 3+ projects each
   ============================================================ */
const CATEGORIES = [
  {
    id: 'web',
    letter: 'W',
    number: '01',
    title: 'Web Applications',
    description: 'Scalable, full-stack platforms built with modern frameworks — tackling real-world problems from campus to enterprise.',
    stats: { projects: '12+', labs: '4' },
    accent: 'web',
    accentColor: '#10b981',
  },
  {
    id: 'mobile',
    letter: 'M',
    number: '02',
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile solutions leveraging AI, AR, and cloud capabilities for everyday impact.',
    stats: { projects: '10+', labs: '3' },
    accent: 'mobile',
    accentColor: '#3b82f6',
  },
  {
    id: 'health',
    letter: 'H',
    number: '03',
    title: 'Healthcare Systems',
    description: 'AI-driven diagnostic tools, patient monitoring platforms, and accessibility-first medical innovations.',
    stats: { projects: '8+', labs: '5' },
    accent: 'health',
    accentColor: '#a855f7',
  },
  {
    id: 'smartcity',
    letter: 'S',
    number: '04',
    title: 'Smart City Solutions',
    description: 'IoT- and AI-powered urban infrastructure projects — traffic, energy, waste, and public safety reimagined.',
    stats: { projects: '9+', labs: '3' },
    accent: 'smartcity',
    accentColor: '#f59e0b',
  },
];

const PROJECTS_DATA = {
  web: [
    {
      name: 'Campus Connect Portal', letter: 'CP', tags: ['React', 'Node.js', 'PostgreSQL'],
      shortDesc: 'Unified academic portal integrating attendance, grades, event scheduling, and club management.',
      fullDesc: 'A comprehensive full-stack platform serving 5000+ students and faculty. Features real-time attendance tracking, grade analytics with visual trends, department-wise event scheduling, and a club management module with member rosters and budget tracking. Built with role-based access and a responsive design for mobile and desktop.',
      techStack: ['React 18', 'Node.js', 'Express', 'PostgreSQL', 'Redis', 'Docker', 'Nginx'],
      team: [
        { name: 'Arun K.', role: 'Full-Stack Lead', initials: 'AK', color: '#6366f1' },
        { name: 'Bhavna R.', role: 'Frontend Dev', initials: 'BR', color: '#06b6d4' },
        { name: 'Chris P.', role: 'Backend Dev', initials: 'CP', color: '#10b981' },
      ],
      year: '2024', lab: 'Web Systems Lab',
    },
    {
      name: 'E-Commerce Analytics Engine', letter: 'EA', tags: ['Python', 'React', 'ML'],
      shortDesc: 'Real-time dashboard for predicting sales trends and customer churn using ML models.',
      fullDesc: 'An end-to-end analytics platform for small e-commerce businesses. Ingests transaction data to forecast sales, segment customers, and predict churn with 89% accuracy. Features a drag-and-drop dashboard builder, automated PDF report generation, and email alerts for anomaly detection.',
      techStack: ['Python', 'FastAPI', 'React', 'TensorFlow', 'MongoDB', 'D3.js', 'Celery'],
      team: [
        { name: 'Divya M.', role: 'ML Engineer', initials: 'DM', color: '#f59e0b' },
        { name: 'Esha T.', role: 'Data Pipeline', initials: 'ET', color: '#ef4444' },
      ],
      year: '2024', lab: 'Data Science Lab',
    },
    {
      name: 'Open Source Contribution Tracker', letter: 'OS', tags: ['Next.js', 'GraphQL', 'OSS'],
      shortDesc: 'Platform tracking and gamifying student open-source contributions across GitHub.',
      fullDesc: 'A gamified platform that connects student GitHub accounts, tracks commits, PRs, and issues across repositories, and awards contribution points. Features leaderboards, achievement badges, and a mentorship matching system. Used by the CSEA to encourage open-source culture.',
      techStack: ['Next.js', 'GraphQL', 'Prisma', 'GitHub API', 'PostgreSQL', 'Tailwind'],
      team: [
        { name: 'Farhan Q.', role: 'Full-Stack Dev', initials: 'FQ', color: '#8b5cf6' },
        { name: 'Gauri N.', role: 'UI/UX Designer', initials: 'GN', color: '#ec4899' },
        { name: 'Harish S.', role: 'API Integration', initials: 'HS', color: '#6366f1' },
      ],
      year: '2025', lab: 'Web Systems Lab',
    },
  ],
  mobile: [
    {
      name: 'Campus AR Navigator', letter: 'AN', tags: ['AR', 'Flutter', 'Unity'],
      shortDesc: 'Augmented reality indoor navigation for campus buildings.',
      fullDesc: 'An AR-powered navigation app that overlays directional arrows on the live camera feed to guide students through complex campus buildings. Pre-mapped with floor plans of 12+ departments, includes classroom finder, faculty office locator, and accessibility-aware routes.',
      techStack: ['Flutter', 'Unity', 'AR Foundation', 'C#', 'Firebase', 'Blender'],
      team: [
        { name: 'Ishan V.', role: 'AR Developer', initials: 'IV', color: '#06b6d4' },
        { name: 'Jaya L.', role: 'Flutter Dev', initials: 'JL', color: '#f59e0b' },
      ],
      year: '2024', lab: 'Mobile Innovation Lab',
    },
    {
      name: 'MediTrack Patient App', letter: 'MP', tags: ['React Native', 'FHIR', 'AI'],
      shortDesc: 'Cross-platform patient manager with medication reminders and telehealth integration.',
      fullDesc: 'A patient-centric mobile app that integrates with hospital FHIR APIs to display medical records, send medication reminders via push notifications, and schedule telehealth consultations. Features include symptom journaling with AI suggestions, lab report PDF viewer, and family sharing.',
      techStack: ['React Native', 'FHIR', 'Node.js', 'Twilio', 'OpenAI API', 'MongoDB'],
      team: [
        { name: 'Kavya P.', role: 'Mobile Lead', initials: 'KP', color: '#10b981' },
        { name: 'Lokesh R.', role: 'Health API', initials: 'LR', color: '#6366f1' },
        { name: 'Maya S.', role: 'UI Designer', initials: 'MS', color: '#ec4899' },
      ],
      year: '2024', lab: 'HealthTech Lab',
    },
    {
      name: 'Community Task Exchange', letter: 'TX', tags: ['Flutter', 'Firebase', 'P2P'],
      shortDesc: 'Peer-to-peer micro-task marketplace for campus communities.',
      fullDesc: 'A mobile marketplace where students can post and complete micro-tasks (tutoring, deliveries, tech help) within the campus community. Features in-app chat, rating system, escrow payments, and a reputation score. Handles 200+ tasks weekly.',
      techStack: ['Flutter', 'Firebase', 'Cloud Functions', 'Stripe', 'Dart'],
      team: [
        { name: 'Naveen K.', role: 'Mobile Dev', initials: 'NK', color: '#f59e0b' },
        { name: 'Ojaswi M.', role: 'Backend Dev', initials: 'OM', color: '#06b6d4' },
      ],
      year: '2025', lab: 'Mobile Innovation Lab',
    },
  ],
  health: [
    {
      name: 'RetinaScan AI', letter: 'RA', tags: ['Deep Learning', 'Medical Imaging', 'Python'],
      shortDesc: 'CNN-based diabetic retinopathy detection from retinal fundus images.',
      fullDesc: 'A deep learning system that analyzes retinal fundus photographs to detect diabetic retinopathy with 94.2% accuracy. Uses an ensemble of EfficientNet and ResNet architectures. Deployed as a web-based screening tool for rural clinics with low-bandwidth optimization.',
      techStack: ['Python', 'TensorFlow', 'EfficientNet', 'Flask', 'OpenCV', 'Docker'],
      team: [
        { name: 'Pranav D.', role: 'ML Research', initials: 'PD', color: '#10b981' },
        { name: 'Rakshita J.', role: 'Clinical Validation', initials: 'RJ', color: '#6366f1' },
        { name: 'Sandeep R.', role: 'Full-Stack Dev', initials: 'SR', color: '#06b6d4' },
      ],
      year: '2024', lab: 'HealthTech Lab',
    },
    {
      name: 'Wearable Fall Detector', letter: 'FD', tags: ['IoT', 'Edge AI', 'Wearable'],
      shortDesc: 'Real-time fall detection smartwatch app with emergency alert system.',
      fullDesc: 'An edge-AI system running on consumer smartwatches that detects falls using accelerometer and gyroscope data with an on-device LSTM model. Triggers automatic SMS alerts to emergency contacts with GPS coordinates. Achieves 96% sensitivity with less than 5% false positive rate.',
      techStack: ['TensorFlow Lite', 'Arduino', 'Flutter', 'BLE', 'C++', 'Firebase'],
      team: [
        { name: 'Tanvi S.', role: 'Edge AI', initials: 'TS', color: '#f59e0b' },
        { name: 'Umesh K.', role: 'Hardware', initials: 'UK', color: '#ef4444' },
      ],
      year: '2024', lab: 'Embedded Systems Lab',
    },
    {
      name: 'Mental Wellness Chatbot', letter: 'MW', tags: ['NLP', 'LLM', 'Therapy'],
      shortDesc: 'Empathetic AI chatbot providing first-line mental health support for students.',
      fullDesc: 'A fine-tuned LLM-based chatbot designed specifically for college students. Provides guided breathing exercises, cognitive reframing suggestions, and crisis resource referrals. Trained on de-identified counseling transcripts with clinical oversight. Includes mood tracking and anonymized trend reporting.',
      techStack: ['Python', 'PyTorch', 'LangChain', 'React', 'FastAPI', 'MongoDB'],
      team: [
        { name: 'Varsha N.', role: 'NLP Engineer', initials: 'VN', color: '#8b5cf6' },
        { name: 'Yash A.', role: 'Clinical Psych', initials: 'YA', color: '#10b981' },
        { name: 'Zara M.', role: 'Full-Stack', initials: 'ZM', color: '#6366f1' },
      ],
      year: '2025', lab: 'AI Research Lab',
    },
  ],
  smartcity: [
    {
      name: 'Smart Traffic Optimizer', letter: 'TO', tags: ['IoT', 'Computer Vision', 'Edge'],
      shortDesc: 'AI-powered adaptive traffic signal control using live camera feeds.',
      fullDesc: 'An intelligent traffic management system that uses computer vision at intersections to detect vehicle density and dynamically adjust signal timings. Reduced average wait time by 34% in pilot studies. Features emergency vehicle preemption and pedestrian priority modes.',
      techStack: ['Python', 'OpenCV', 'YOLOv8', 'Raspberry Pi', 'MQTT', 'React', 'InfluxDB'],
      team: [
        { name: 'Aditya C.', role: 'CV Lead', initials: 'AC', color: '#f59e0b' },
        { name: 'Bhavya K.', role: 'IoT Engineer', initials: 'BK', color: '#06b6d4' },
        { name: 'Chirag S.', role: 'Full-Stack', initials: 'CS', color: '#6366f1' },
      ],
      year: '2024', lab: 'Smart Systems Lab',
    },
    {
      name: 'Waste-to-Energy Monitor', letter: 'WE', tags: ['IoT', 'Analytics', 'Sustainability'],
      shortDesc: 'Real-time monitoring and optimization platform for waste-to-energy plants.',
      fullDesc: 'An IoT sensor network deployed at a waste-to-energy facility that monitors temperature, gas emissions, and conversion efficiency in real-time. ML models predict maintenance needs 48 hours in advance. Dashboard visualizes carbon offset metrics for ESG reporting.',
      techStack: ['Arduino', 'Python', 'Grafana', 'InfluxDB', 'MQTT', 'TensorFlow', 'React'],
      team: [
        { name: 'Deepa R.', role: 'IoT Lead', initials: 'DR', color: '#10b981' },
        { name: 'Eklavya S.', role: 'ML Engineer', initials: 'ES', color: '#6366f1' },
      ],
      year: '2024', lab: 'Sustainable Tech Lab',
    },
    {
      name: 'Public Safety Alert Mesh', letter: 'PS', tags: ['BLE Mesh', 'Offline', 'Emergency'],
      shortDesc: 'Decentralized alert network for disaster zones using Bluetooth mesh.',
      fullDesc: 'A Bluetooth mesh-based communication system that creates an ad-hoc alert network in disaster-stricken areas where cellular infrastructure is down. Citizens receive evacuation alerts, responders can map victim locations, and the system self-heals as nodes move. Tested in coordination with Coimbatore disaster response teams.',
      techStack: ['BLE Mesh', 'Flutter', 'Dart', 'SQLite', 'OpenStreetMap', 'Node.js'],
      team: [
        { name: 'Faraz M.', role: 'Mesh Architect', initials: 'FM', color: '#ef4444' },
        { name: 'Geeta P.', role: 'Mobile Dev', initials: 'GP', color: '#06b6d4' },
        { name: 'Hariharan V.', role: 'Systems Eng', initials: 'HV', color: '#f59e0b' },
      ],
      year: '2025', lab: 'Smart Systems Lab',
    },
  ],
};

/* ============================================================
   SUB-COMPONENTS
   ============================================================ */

const Hero = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}
    className="flex flex-col items-center text-center max-w-4xl mx-auto mb-20"
  >
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-8">
      <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
      <span className="text-xs font-bold tracking-widest uppercase text-slate-500 font-mono">
        CSEA Research Division
      </span>
    </div>
    
    <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-tight mb-6">
      Research & <br className="hidden md:block" />
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-600">
        Innovation Corner
      </span>
    </h1>
    
    <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-2xl font-medium">
      Where ideas become impact — exploring groundbreaking research and
      entrepreneurial solutions from the brightest minds at PSG Tech.
    </p>
  </motion.div>
);

const CategoryCard = ({ cat, onClick, index }) => {
  const acc = cat.accentColor;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      onClick={() => onClick(cat)}
      className="group relative bg-white/70 backdrop-blur-2xl border border-slate-100 rounded-[2.5rem] p-8 md:p-10 pb-12 md:pb-14 cursor-pointer shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-all duration-500 flex flex-col h-full overflow-hidden shrink-0"
    >
      <div 
        className="absolute -right-20 -top-20 w-64 h-64 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"
        style={{ backgroundColor: acc }}
      />
      
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div 
          className="w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-2xl font-black shadow-sm group-hover:scale-110 transition-transform duration-500 bg-white border"
          style={{ color: acc, borderColor: `${acc}30` }}
        >
          {cat.letter}
        </div>
        <span className="text-6xl font-black text-slate-100/60 font-mono tracking-tighter pointer-events-none transition-transform duration-700 group-hover:scale-110 group-hover:text-slate-100">
          {cat.number}
        </span>
      </div>
      
      <div className="relative z-10 flex-grow flex flex-col">
        <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-4 group-hover:text-blue-600 transition-colors">
          {cat.title}
        </h3>
        <p className="text-slate-500 font-medium leading-relaxed mb-6 flex-grow">
          {cat.description}
        </p>
        
        <div className="flex gap-4 mb-6">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider">Projects</span>
            <span className="text-lg font-black text-slate-800">{cat.stats.projects}</span>
          </div>
          <div className="w-px bg-slate-200"></div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider">Labs</span>
            <span className="text-lg font-black text-slate-800">{cat.stats.labs}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 font-bold text-sm" style={{ color: acc }}>
          Explore Research <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
};

const CategoryView = ({ category, onBack, onProjectClick }) => {
  const projects = PROJECTS_DATA[category.id] || [];
  const acc = category.accentColor;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}
      className="flex flex-col gap-12"
    >
      {/* Header */}
      <div className="relative overflow-hidden bg-white/80 backdrop-blur-3xl rounded-[2.5rem] border border-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-10 md:p-16 flex flex-col gap-8">
        <div className="absolute right-0 top-0 bottom-0 w-96 blur-[100px] opacity-10 pointer-events-none" style={{ backgroundColor: acc }} />
        
        <button 
          onClick={onBack}
          className="flex items-center gap-2 w-fit px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-sm text-sm font-bold text-slate-600 hover:text-blue-600 hover:shadow-md transition-all group relative z-10"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back
        </button>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 relative z-10">
          <div 
            className="w-24 h-24 rounded-[2rem] bg-white border flex items-center justify-center shadow-sm flex-shrink-0 text-4xl font-black"
            style={{ color: acc, borderColor: `${acc}30` }}
          >
            {category.letter}
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
              {category.title}
            </h2>
            <p className="text-base md:text-xl text-slate-500 font-medium leading-relaxed max-w-3xl">
              {category.description}
            </p>
            <div className="flex gap-4 mt-2">
              <span className="px-4 py-1.5 rounded-full text-xs font-bold border bg-white" style={{ color: acc, borderColor: `${acc}30` }}>
                {category.stats.projects} Projects
              </span>
              <span className="px-4 py-1.5 rounded-full text-xs font-bold border border-slate-200 bg-white text-slate-600">
                {category.stats.labs} Research Labs
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Project List */}
      <div className="flex flex-col gap-6">
        <h3 className="text-2xl font-black text-slate-800 tracking-tight ml-4 flex items-center gap-3">
          <span className="w-2 h-6 rounded-full" style={{ backgroundColor: acc }}></span>
          Featured Projects
        </h3>
        
        {projects.length === 0 ? (
          <div className="bg-white/50 backdrop-blur-md rounded-3xl p-12 text-center border border-slate-200">
            <p className="text-slate-500 font-medium">Research projects in this category are being compiled.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {projects.map((proj, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}
                onClick={() => onProjectClick(proj)}
                className="group flex flex-col md:flex-row items-start md:items-center gap-6 p-6 rounded-[2rem] bg-white/70 backdrop-blur-xl border border-white shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
                style={{ '--hover-color': acc }}
              >
                <div className="flex items-center gap-6 md:w-1/4 flex-shrink-0">
                  <span className="text-2xl font-black text-slate-200 font-mono w-8">{String(i + 1).padStart(2, '0')}</span>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg bg-white border shadow-sm group-hover:scale-110 transition-transform" style={{ color: acc, borderColor: `${acc}30` }}>
                    {proj.letter}
                  </div>
                </div>
                
                <div className="flex flex-col gap-1 flex-grow">
                  <h4 className="text-xl font-bold text-slate-900 group-hover:text-[var(--hover-color)] transition-colors">{proj.name}</h4>
                  <p className="text-sm text-slate-500 font-medium line-clamp-1">{proj.shortDesc}</p>
                </div>
                
                <div className="flex gap-2 flex-wrap md:justify-end md:w-1/3">
                  {proj.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-lg bg-slate-50 text-[10px] font-bold text-slate-500 border border-slate-100 uppercase tracking-wide">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 border border-slate-100 group-hover:bg-[var(--hover-color)] group-hover:text-white group-hover:border-transparent transition-colors ml-4 text-slate-400">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const ProjectDetail = ({ project, category, onBack }) => {
  const acc = category?.accentColor || '#3b82f6';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}
      className="flex flex-col gap-8 max-w-5xl mx-auto w-full"
    >
      <button 
        onClick={onBack}
        className="flex items-center gap-2 w-fit px-4 py-2 rounded-xl bg-white/80 backdrop-blur-md border border-slate-200 shadow-sm text-sm font-bold text-slate-600 hover:text-blue-600 hover:shadow-md transition-all group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to {category?.title || 'Projects'}
      </button>

      <div className="bg-white/90 backdrop-blur-3xl rounded-[3rem] border border-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-8 md:p-16 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-[500px] blur-[120px] opacity-10 pointer-events-none" style={{ backgroundColor: acc }} />
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start gap-8 mb-12 relative z-10 border-b border-slate-100 pb-12">
          <div className="w-24 h-24 rounded-[2rem] bg-white border flex items-center justify-center shadow-sm flex-shrink-0 text-4xl font-black" style={{ color: acc, borderColor: `${acc}30` }}>
            {project.letter}
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">{project.name}</h2>
            <p className="text-xl text-slate-500 font-medium max-w-2xl">{project.shortDesc}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="px-4 py-1 rounded-full text-xs font-bold border bg-slate-50 text-slate-600 border-slate-200">{project.year}</span>
              <span className="px-4 py-1 rounded-full text-xs font-bold border bg-slate-50 text-slate-600 border-slate-200">{project.lab}</span>
              {project.tags.map(tag => (
                <span key={tag} className="px-4 py-1 rounded-full text-xs font-bold border bg-white shadow-sm" style={{ color: acc, borderColor: `${acc}30` }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
          <div className="md:col-span-2 flex flex-col gap-10">
            <section>
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 mb-4">Project Overview</h3>
              <p className="text-slate-600 font-medium leading-relaxed text-lg">{project.fullDesc}</p>
            </section>
            
            <section>
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-3">
                {project.techStack.map(tech => (
                  <span key={tech} className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-sm shadow-sm hover:border-slate-300 transition-colors">
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          </div>
          
          <div className="md:col-span-1">
            <div className="bg-slate-50 rounded-[2rem] border border-slate-100 p-8">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 mb-6">Research Team</h3>
              <div className="flex flex-col gap-4">
                {project.team.map((member, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-sm" style={{ backgroundColor: member.color }}>
                      {member.initials}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900">{member.name}</span>
                      <span className="text-xs font-medium text-slate-500">{member.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
const ResearchInnovationCorner = () => {
  const [view, setView] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleCategoryClick = useCallback((cat) => {
    setSelectedCategory(cat);
    setSelectedProject(null);
    setView('category');
  }, []);

  const handleProjectClick = useCallback((proj) => {
    setSelectedProject(proj);
    setView('project');
  }, []);

  const handleBackToHome = useCallback(() => {
    setSelectedCategory(null);
    setSelectedProject(null);
    setView('home');
  }, []);

  const handleBackToCategory = useCallback(() => {
    setSelectedProject(null);
    setView('category');
  }, []);

  return (
    <div className="min-h-screen w-full bg-slate-50/50 py-20 px-6 md:px-12 font-sans selection:bg-blue-200">
      <div className="max-w-[1600px] w-full mx-auto h-full flex flex-col">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}
              className="flex flex-col"
            >
              <Hero />
              <div className="max-w-[1600px] w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {CATEGORIES.map((cat, i) => (
                  <CategoryCard key={cat.id} cat={cat} index={i} onClick={handleCategoryClick} />
                ))}
              </div>
            </motion.div>
          )}

          {view === 'category' && selectedCategory && (
            <motion.div key="category" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full">
              <CategoryView
                category={selectedCategory}
                onBack={handleBackToHome}
                onProjectClick={handleProjectClick}
              />
            </motion.div>
          )}

          {view === 'project' && selectedProject && (
            <motion.div key="project" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full">
              <ProjectDetail
                project={selectedProject}
                category={selectedCategory}
                onBack={handleBackToCategory}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ResearchInnovationCorner;