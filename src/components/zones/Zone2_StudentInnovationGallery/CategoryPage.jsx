import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ChevronRight, ThumbsUp, SlidersHorizontal, Inbox } from 'lucide-react';

const PROJECTS_DATA = {
  'first-year': [
    {
      name: 'Eco-Sort Smart Bin',
      icon: '♻️',
      year: '2024',
      tags: ['IoT', 'AI', 'Hardware'],
      shortDesc: 'Automatic waste segregation using real-time image recognition.',
      problemStatement: 'Improper waste segregation at the source leads to severe recycling inefficiencies and environmental harm, with over 60% of recyclables ending up in landfills.',
      solutionOverview: 'An IoT-enabled bin using real-time image recognition to automatically sort waste into recyclable, organic, and hazardous compartments using a Raspberry Pi and a trained CNN model.',
      techStack: ['Raspberry Pi', 'Google Coral', 'Python', 'React', 'TensorFlow Lite', 'OpenCV'],
      teamMembers: [
        { name: 'Noah Evans', role: 'Hardware Engineer', initials: 'NE', color: '#10b981' },
        { name: 'Olivia Garcia', role: 'ML Engineer', initials: 'OG', color: '#a855f7' },
      ],
      demoLink: 'https://example.com',
      simulatedPayloads: [
        { input: 'Metal Soda Can', output: 'Recyclable Compartment Activated', badge: 'Metal Detect Sensor' },
        { input: 'Banana Peel', output: 'Organic Compartment Activated', badge: 'CNN Image Model' },
        { input: 'Lithium Battery', output: 'Hazardous Compartment Activated', badge: 'Chemical Warning Sensor' },
      ],
    },
    {
      name: 'IoT Smart Plant Waterer',
      icon: '💧',
      year: '2024',
      tags: ['IoT', 'Arduino', 'Automation'],
      shortDesc: 'Automated plant watering triggered by soil moisture sensors.',
      problemStatement: 'Houseplants frequently wither when owners travel or forget to water them on schedule, costing millions in replacements annually.',
      solutionOverview: 'A simple Arduino-based soil moisture monitoring system that triggers an automated micro-pump when dryness threshold is detected, with remote override via Bluetooth.',
      techStack: ['Arduino', 'C++', 'Soil Sensors', 'Micro-pump', 'Bluetooth LE'],
      teamMembers: [
        { name: 'Emma Watson', role: 'Embedded Systems', initials: 'EW', color: '#f59e0b' },
        { name: 'Rupert Grint', role: 'App Developer', initials: 'RG', color: '#ef4444' },
      ],
      demoLink: 'https://example.com',
      simulatedPayloads: [
        { input: 'Dry Soil (Moisture 15%)', output: 'Pump Relay Enabled (Watering for 5s)', badge: 'Analog Moisture Pin' },
        { input: 'Wet Soil (Moisture 85%)', output: 'Pump Idle (Adequate Water levels)', badge: 'Saturate Indicator' },
      ],
    },
    {
      name: 'Campus Energy Monitor',
      icon: '⚡',
      year: '2024',
      tags: ['Web', 'Analytics', 'IoT'],
      shortDesc: 'Real-time energy usage dashboard for campus buildings.',
      problemStatement: 'Campus administrators lack real-time visibility into energy usage patterns, leading to significant wastage and high electricity bills.',
      solutionOverview: 'A networked smart-meter system with a React dashboard providing real-time energy analytics, historical trends, and anomaly alerts for department administrators.',
      techStack: ['React', 'Node.js', 'MQTT', 'InfluxDB', 'Grafana', 'Raspberry Pi'],
      teamMembers: [
        { name: 'Arjun Mehta', role: 'Full-Stack Dev', initials: 'AM', color: '#06b6d4' },
        { name: 'Priya Singh', role: 'Data Analyst', initials: 'PS', color: '#8b5cf6' },
      ],
      demoLink: 'https://example.com',
      simulatedPayloads: [
        { input: 'Peak Afternoon Lecture Block', output: 'Alert: High AC usage flagged (Auto Setback applied)', badge: 'MQTT Broker Node' },
        { input: 'Mid-Night Downtime Scan', output: 'No-waste steady stream (3.2 kW background)', badge: 'Admin Threshold' },
      ],
    },
  ],
  'mini': [
    {
      name: 'Smart Campus Navigator',
      icon: '🧭',
      year: '2024',
      tags: ['AR', 'Mobile', 'Unity'],
      shortDesc: 'AR-based indoor navigation for campus buildings.',
      problemStatement: 'Students and visitors frequently get lost while trying to find specific laboratories or classrooms in large, complex campus buildings.',
      solutionOverview: 'An interactive AR-based mobile application that helps individuals navigate indoor campus environments seamlessly using smartphone cameras and pre-mapped floor plans.',
      techStack: ['Unity', 'AR Foundation', 'C#', 'React Native', 'Node.js', 'Firebase'],
      teamMembers: [
        { name: 'Alice Johnson', role: 'AR Developer', initials: 'AJ', color: '#6366f1' },
        { name: 'Bob Smith', role: 'Backend Dev', initials: 'BS', color: '#10b981' },
      ],
      demoLink: 'https://example.com',
      simulatedPayloads: [
        { input: 'Scan Main Archway', output: 'AR Arrow locked to Lab Block F3 (35m forward)', badge: 'AR Anchors Engine' },
        { input: 'Rotate Camera Rightward', output: 'Tag Discovered: CSE Seminar Library', badge: 'Spatial Map Pin' },
      ],
    },
    {
      name: 'Sign2Text Translator',
      icon: '🧤',
      year: '2024',
      tags: ['Wearable', 'ML', 'Accessibility'],
      shortDesc: 'Glove that translates sign language to text in real-time.',
      problemStatement: 'There is a significant communication barrier between sign language users and non-users in everyday interactions, isolating the hearing-impaired community.',
      solutionOverview: 'A wearable glove equipped with flex sensors and accelerometers that translates ASL hand signs into text and speech in real-time via Bluetooth to a mobile app.',
      techStack: ['Arduino', 'Bluetooth LE', 'Flutter', 'Firebase', 'TensorFlow', 'Python'],
      teamMembers: [
        { name: 'Paul Vance', role: 'Hardware Lead', initials: 'PV', color: '#ec4899' },
        { name: 'Quinn Ahn', role: 'ML Engineer', initials: 'QA', color: '#06b6d4' },
      ],
      demoLink: 'https://example.com',
      simulatedPayloads: [
        { input: 'Flex Flex Sensor A & B', output: 'Token Translated: "GOOD MORNING"', badge: 'Bluetooth App Rx' },
        { input: 'Full Fist Position (All Flex)', output: 'Token Translated: "THANK YOU"', badge: 'TF-Lite Matrix' },
      ],
    }
  ],
  'capstone': [
    {
      name: 'AI Crop Disease Predictor',
      icon: '🌱',
      year: '2024',
      tags: ['Computer Vision', 'Drone', 'AI'],
      shortDesc: 'Drone-based CNN system predicting crop diseases weeks in advance.',
      problemStatement: 'Farmers suffer massive crop losses due to late detection of plant diseases before visual symptoms appear, resulting in billions in agricultural losses annually.',
      solutionOverview: 'A drone-based image capture system paired with a CNN model to predict diseases weeks in advance from subtle leaf discolorations invisible to the naked eye.',
      techStack: ['Python', 'TensorFlow', 'React', 'AWS EC2', 'OpenCV', 'DJI SDK', 'PostgreSQL'],
      teamMembers: [
        { name: 'Ivy Kim', role: 'ML Research Lead', initials: 'IK', color: '#10b981' },
        { name: 'Jack Martinez', role: 'Drone Systems', initials: 'JM', color: '#6366f1' },
      ],
      demoLink: 'https://example.com',
      simulatedPayloads: [
        { input: 'Scan Sector 4 (Maize crop)', output: 'Early Stage Anthracnose risk detected (Score 84%)', badge: 'Drone CNN Inference' },
        { input: 'Crop Leaf Sample #419', output: 'Healthy chlorophyll indices logged', badge: 'RGB Index' },
      ],
    },
    {
      name: 'Decentralized Voting System',
      icon: '🗳️',
      year: '2024',
      tags: ['Blockchain', 'Web3', 'Security'],
      shortDesc: 'Blockchain-based e-voting for transparent university elections.',
      problemStatement: 'Current electronic voting systems are vulnerable to tampering and lack transparent verification mechanisms for voters to verify their own votes.',
      solutionOverview: 'A blockchain-based e-voting platform ensuring anonymous, verifiable, and immutable votes using smart contracts on Ethereum, with a user-friendly Next.js frontend.',
      techStack: ['Solidity', 'Ethereum', 'Next.js', 'Web3.js', 'IPFS', 'MetaMask'],
      teamMembers: [
        { name: 'Liam Brown', role: 'Blockchain Dev', initials: 'LB', color: '#6366f1' },
        { name: 'Mia Chen', role: 'Frontend Dev', initials: 'MC', color: '#ec4899' },
      ],
      demoLink: 'https://example.com',
      simulatedPayloads: [
        { input: 'Submit Ballot ID #3911', output: 'Ballot verified. Block Hash: 0x5a18c... added', badge: 'Solidity Contract' },
        { input: 'Check Ballot Status', output: 'Ballot Status: Complete. Immutable hash locked.', badge: 'MetaMask Gateway' },
      ],
    },
  ],
  'hackathon': [
    {
      name: 'MedConnect Disaster Relief',
      icon: '🏥',
      year: '2024',
      tags: ['BLE Mesh', 'Offline-first', 'Emergency'],
      shortDesc: 'Offline Bluetooth-mesh app for disaster victim mapping.',
      problemStatement: 'During natural disasters, centralized cellular networks collapse, preventing emergency responders from locating victims or coordinating relief efforts.',
      solutionOverview: 'A decentralized Bluetooth-mesh messaging app that maps victim locations and medical statuses without any internet connection, syncing when connectivity resumes.',
      techStack: ['Flutter', 'BLE Mesh API', 'SQLite', 'Node.js', 'Dart', 'OpenStreetMap'],
      teamMembers: [
        { name: 'Alex Mercer', role: 'Mobile Lead', initials: 'AM', color: '#f59e0b' },
        { name: 'Clara Oswald', role: 'BLE Systems', initials: 'CO', color: '#10b981' },
      ],
      demoLink: 'https://example.com',
      simulatedPayloads: [
        { input: 'Broadcast SOS Beacon', output: 'Beacon caught by Node 3 (Distance 12m). Added to Grid', badge: 'BLE Hardware Mesh' },
        { input: 'Pull Offline Maps Sync', output: 'Synchronized local mapping coordinates successfully', badge: 'SQLite Offline Db' },
      ],
    },
  ],
};

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
    <div className="flex flex-col gap-12 w-full" style={{ paddingBottom: '5rem' }}>
      <div className="p-10 md:p-14 rounded-3xl border border-white/[0.04] relative overflow-hidden bg-gradient-to-r from-[#0c0f1d]/30 to-black/10 backdrop-blur-xl shadow-2xl flex flex-col justify-between">
        <div className="absolute right-0 top-0 bottom-0 w-96 h-full blur-3xl opacity-20 pointer-events-none" style={{ background: `radial-gradient(circle, ${category.accentColor} 0%, transparent 100%)` }} />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10 w-full">
          <div className="flex items-center gap-6">
            <span className="text-7xl font-sans font-black pointer-events-none text-white/[0.03] select-none font-mono">{category.number}</span>
            <div className="flex flex-col gap-2">
              <span className="text-[9px] font-mono font-black uppercase tracking-widest block px-3 py-1 rounded-full border w-fit" style={{ color: category.accentColor, borderColor: `${category.accentColor}35`, backgroundColor: `${category.accentColor}05` }}>
                Track Exhibition Index
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mt-1 leading-none">{category.name}</h1>
              <p className="text-xs md:text-sm text-gray-400 mt-2 max-w-2xl leading-relaxed">{category.description}</p>
            </div>
          </div>
          <div className="flex-shrink-0 w-16 h-16 rounded-3xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-4xl shadow-2xl">{category.icon}</div>
        </div>
      </div>

      <div className="flex flex-col gap-6 p-7 rounded-3xl border border-white/[0.04] bg-[#0c1222]/15 backdrop-blur-md">
        <div className="flex flex-col md:flex-row gap-4 items-center w-full">
          <div className="relative flex-grow w-full">
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Filter by prototype terminology, compilation tags, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-5 py-3.5 bg-[#0a0f1d]/80 border border-white/[0.05] rounded-2xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#5ef1df] focus:ring-1 focus:ring-[#5ef1df] transition-all"
            />
          </div>
          {(searchQuery || activeTag) && (
            <button 
              onClick={() => { setSearchQuery(''); setActiveTag(null); }} 
              className="text-xs text-[#5ef1df] bg-[#5ef1df]/10 border border-[#5ef1df]/20 hover:bg-[#5ef1df]/20 rounded-2xl transition-all cursor-pointer whitespace-nowrap font-mono uppercase font-black"
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', height: '48px', padding: '0 1.5rem' }}
            >
              Reset Filters
            </button>
          )}
        </div>
        {allTags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap pt-3 border-t border-white/[0.04]">
            <span className="text-[10px] uppercase font-mono text-gray-500 font-black flex items-center gap-1.5 mr-2">
              <SlidersHorizontal className="w-3.5 h-3.5" /> DOMAIN CHIPS:
            </span>
            {allTags.map((tag) => {
              const isSelected = activeTag === tag;
              return (
                <button 
                  key={tag} 
                  onClick={() => setActiveTag(isSelected ? null : tag)} 
                  className={`text-[10px] font-bold rounded-2xl transition-all border cursor-pointer font-mono ${isSelected ? 'border-[#5ef1df] text-[#5ef1df] bg-[#5ef1df]/10' : 'border-white/5 text-gray-400 hover:border-white/10 hover:text-white bg-slate-950/20'}`}
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', height: '32px', padding: '0 1rem' }}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-5">
        <AnimatePresence mode="popLayout">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((proj, i) => (
              <div key={proj.name} onClick={() => onProjectClick(proj)} className="w-full bg-[#0a0e1c]/15 hover:bg-[#0a0e1c]/40 border border-white/[0.04] hover:border-[#5ef1df]/30 rounded-3xl p-7 md:p-9 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 text-left transition-all duration-300 group cursor-pointer relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-[#5ef1df] transition-all" />
                <div className="flex items-center gap-6 min-w-0 flex-grow">
                  <span className="text-base font-black font-mono text-gray-700 w-6 group-hover:text-[#5ef1df] transition-colors duration-300 hidden md:inline">{String(i + 1).padStart(2, '0')}</span>
                  <div className="w-14 h-14 bg-white/[0.02] border border-white/5 group-hover:bg-white/[0.04] group-hover:border-[#5ef1df]/20 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 transition-all duration-300 group-hover:rotate-6">{proj.icon}</div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="text-lg font-bold text-white transition-colors duration-300 group-hover:text-white leading-tight">{proj.name}</h3>
                      <span className="text-[9px] font-mono text-gray-400 bg-white/5 border border-white/5 px-2.5 py-0.5 rounded-md">CLASS OF {proj.year}</span>
                    </div>
                    <p className="text-xs md:text-sm text-gray-400 font-sans mt-2 leading-relaxed max-w-2xl line-clamp-2">{proj.shortDesc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 self-end sm:self-auto flex-shrink-0 pl-16 sm:pl-0 font-mono">
                  <div className="hidden lg:flex gap-1.5 items-center mr-2">
                    {proj.tags.map((tag) => (
                      <span key={tag} className="text-[9px] font-black tracking-wider px-2.5 py-1 rounded-lg border border-white/5 bg-[#030712]/45 text-gray-500">{tag}</span>
                    ))}
                  </div>
                  <button 
                    onClick={(e) => handleLike(e, proj.name)} 
                    className="rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-[#5ef1df]/5 hover:border-[#5ef1df]/20 text-gray-400 hover:text-[#5ef1df] transition-all cursor-pointer shadow-lg"
                    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', height: '36px', padding: '0 1rem' }}
                  >
                    <ThumbsUp className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold text-white leading-none">{likes[proj.name] || 0}</span>
                  </button>
                  <div className="w-10 h-10 rounded-full border border-white/5 bg-white/[0.02] flex items-center justify-center group-hover:bg-[#5ef1df]/10 group-hover:border-[#5ef1df]/20 transition-all duration-300">
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#5ef1df] group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 rounded-3xl border border-dashed border-white/10 bg-slate-950/20 text-gray-500 text-xs flex flex-col items-center justify-center gap-3">
              <Inbox className="w-10 h-10 text-gray-600 opacity-60" />
              <span className="font-mono text-gray-400 uppercase tracking-widest text-[10px]">No matches meet your filter criteria.</span>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export { PROJECTS_DATA };
export default CategoryPage;