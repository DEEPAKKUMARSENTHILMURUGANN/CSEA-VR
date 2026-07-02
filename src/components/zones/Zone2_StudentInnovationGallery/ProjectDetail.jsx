import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUpRight, 
  Users, 
  Send,
  Award
} from 'lucide-react';

const ProjectDetail = ({ project, category, onBackToList }) => {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState('blueprint');

  // Interactive Live protocol simulation states
  const payloads = project.simulatedPayloads || [];
  const [activePayloadIndex, setActivePayloadIndex] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simLog, setSimLog] = useState([]);
  const [activePacketCode, setActivePacketCode] = useState('0x00');
  const [simProgress, setSimProgress] = useState(0);
  const terminalEndRef = useRef(null);

  // Peer Assessment forms state
  const [reviewerName, setReviewerName] = useState('');
  const [evaluationNotes, setEvaluationNotes] = useState('');
  const [scoreInnovation, setScoreInnovation] = useState(8);
  const [scoreFeasibility, setScoreFeasibility] = useState(8);
  const [scoreComplexity, setScoreComplexity] = useState(9);
  const [localAssessments, setLocalAssessments] = useState([]);
  const [justSubmitted, setJustSubmitted] = useState(false);

  // Telemetry real-time canvas animation state (for the Simulator tab)
  const [canvasFrame, setCanvasFrame] = useState(0);
  const canvasRef = useRef(null);

  // Load and store community assessments and metrics
  useEffect(() => {
    const key = `psg_ast_${project.name.replace(/\s+/g, '_')}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        setLocalAssessments(JSON.parse(saved));
      } catch (e) {
        // Safe fallback
      }
    } else {
      // Seed with some professional realistic mock student peer evals
      const seed = [
        {
          innovation: 9,
          feasibility: 8,
          complexity: 9,
          reviewer: 'Prof. Ramakrishnan (Dean IR)',
          notes: 'High commercial potential. Model size is exceptionally optimized for edge computation. Encourage filing for immediate patent.',
          timestamp: '2 hours ago'
        },
        {
          innovation: 8,
          feasibility: 9,
          complexity: 8,
          reviewer: 'CSEA Peer Evaluator',
          notes: 'Tested the network sync module live. Hardware latency remains below 14ms. Great telemetry display!',
          timestamp: '1 day ago'
        }
      ];
      setLocalAssessments(seed);
      localStorage.setItem(key, JSON.stringify(seed));
    }
  }, [project.name]);

  // Terminal auto-scroller helper
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [simLog, isSimulating]);

  // Telemetry Oscilloscope wave animator (simulates real hardware hardware output)
  useEffect(() => {
    if (activeTab !== 'simulator') return;
    let animId;
    const iterate = () => {
      setCanvasFrame(f => f + 1);
      animId = requestAnimationFrame(iterate);
    };
    iterate();
    return () => cancelAnimationFrame(animId);
  }, [activeTab]);

  // Draw real-time sine / square waves on simulated canvas
  useEffect(() => {
    if (activeTab !== 'simulator' || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#5ef1df';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    // Wave parameters change based on active load-states
    const freqMod = isSimulating ? 0.15 : 0.05;
    const ampMod = isSimulating ? 22 : 8;

    for (let x = 0; x < canvas.width; x++) {
      const y = canvas.height / 2 + Math.sin(x * freqMod + canvasFrame * 0.1) * ampMod;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Secondary auxiliary grid mesh lines inside oscillator
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0; x < canvas.width; x += 40) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
    }
    for (let y = 0; y < canvas.height; y += 30) {
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
    }
    ctx.stroke();

  }, [canvasFrame, isSimulating, activeTab]);

  const handleSimulate = (idx) => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActivePayloadIndex(idx);
    setSimProgress(0);
    const target = payloads[idx];
    
    // Simulate dynamic terminal log sequences
    setSimLog([`[SYSTEM_BOOT] Mounting local IoT firmware controller node...`]);
    
    let logs = [
      `[COM-PORT] Handshake established successfully. Handshake clock aligned: 104Mhz.`,
      `[PACKET] Received dynamic record segment: "${target.input}"`,
      `[EVAL-GATE] Initiating AI / micro-automator routing classifier...`,
      `[CLASSIFY] Pipeline active: ${target.badge || 'Global Rule Override'}`,
      `[DIAGNOSTICS] Analysis successful. Verification rating: 99.78%`,
      `[SYSTEM-OUT] Triggering relay event: "${target.output}"`,
      `[SYNC-BUS] State broadcast logged in local storage node completely.`
    ];

    logs.forEach((logLine, index) => {
      setTimeout(() => {
        setSimLog(prev => [...prev, logLine]);
        setSimProgress(Math.floor(((index + 1) / logs.length) * 100));
        if (index === logs.length - 1) {
          setIsSimulating(false);
          setActivePacketCode(`0x${Math.floor(Math.random() * 9000 + 1000).toString(16).toUpperCase()}`);
        }
      }, (index + 1) * 250);
    });
  };

  const submitAssessment = (e) => {
    e.preventDefault();
    if (!reviewerName.trim() || !evaluationNotes.trim()) return;

    const newEval = {
      innovation: scoreInnovation,
      feasibility: scoreFeasibility,
      complexity: scoreComplexity,
      reviewer: reviewerName.trim(),
      notes: evaluationNotes.trim(),
      timestamp: 'Just now'
    };

    const updated = [newEval, ...localAssessments];
    setLocalAssessments(updated);
    
    const key = `psg_ast_${project.name.replace(/\s+/g, '_')}`;
    localStorage.setItem(key, JSON.stringify(updated));

    setReviewerName('');
    setEvaluationNotes('');
    setJustSubmitted(true);
    setTimeout(() => setJustSubmitted(false), 3000);
  };

  const avgInnovation = localAssessments.length 
    ? (localAssessments.reduce((sum, item) => sum + item.innovation, 0) / localAssessments.length).toFixed(1)
    : '8.5';
  const avgFeasibility = localAssessments.length 
    ? (localAssessments.reduce((sum, item) => sum + item.feasibility, 0) / localAssessments.length).toFixed(1)
    : '8.0';
  const avgComplexity = localAssessments.length 
    ? (localAssessments.reduce((sum, item) => sum + item.complexity, 0) / localAssessments.length).toFixed(1)
    : '8.8';

  const overallScore = ((parseFloat(avgInnovation) + parseFloat(avgFeasibility) + parseFloat(avgComplexity)) / 3).toFixed(1);

  return (
    <div className="flex flex-col gap-10 w-full text-gray-200" style={{ paddingBottom: '5rem' }}>
      
      {/* ── LUXURY HEADER HERO BLOCK ── */}
      <div className="p-8 md:p-12 rounded-3xl border border-white/[0.04] relative overflow-hidden bg-gradient-to-br from-[#0a0f1d]/50 to-black/30 backdrop-blur-xl shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-br from-[#5ef1df]/5 to-[#a855f7]/5 blur-3xl pointer-events-none" />
        
        {/* Solid elegant left color line */}
        {category && (
          <div 
            className="absolute left-0 top-0 bottom-0 w-1.5 transition-all"
            style={{ backgroundColor: category.accentColor }}
          />
        )}

        <div className="flex flex-col md:flex-row gap-8 relative z-10 items-start md:items-center justify-between">
          <div className="flex items-start md:items-center gap-6">
            <span className="text-4xl p-5 bg-white/[0.02] border border-white/[0.06] rounded-2xl flex-shrink-0 animate-pulse shadow-xl">
              {project.icon}
            </span>
            <div className="flex flex-col gap-2 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[9px] font-mono font-black uppercase tracking-widest px-3 py-1 rounded-full border border-[#5ef1df]/20 bg-[#5ef1df]/5 text-[#5ef1df]"
                  >
                    {tag}
                  </span>
                ))}
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest bg-white/[0.02] px-2 py-0.5 rounded">
                  AUTHENTICATED RECORD // PSG-CSE
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mt-1 font-display">
                {project.name}
              </h1>
              <p className="text-xs md:text-sm text-gray-400 leading-relaxed max-w-3xl mt-1">
                {project.shortDesc}
              </p>
            </div>
          </div>

          <div className="flex-shrink-0">
            <button
              onClick={onBackToList}
              className="text-xs font-mono font-black tracking-widest text-[#5ef1df] hover:text-white bg-[#5ef1df]/10 hover:bg-[#5ef1df]/20 rounded-2xl border border-[#5ef1df]/20 hover:border-white/30 transition-all cursor-pointer shadow-lg"
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', height: '42px', padding: '0 1.5rem' }}
            >
              BACK TO INDEX
            </button>
          </div>
        </div>
      </div>

      {/* ── SPACIOUS TAB CONTROLLER ── */}
      <div className="flex border-b border-white/[0.04] gap-4 select-none">
        {['blueprint', 'simulator', 'reviews'].map((tab) => {
          const names = {
            blueprint: '01 // SPEC blueprint',
            simulator: '02 // core simulator',
            reviews: `03 // peer review (${localAssessments.length})`
          };
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-6 py-4 text-xs uppercase font-mono font-black tracking-widest transition-all duration-300 cursor-pointer ${
                isActive ? 'text-white' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <span className="relative z-10">{names[tab]}</span>
              {isActive && (
                <motion.div 
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5ef1df]"
                  transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* ── TAB OUTCOMES CONTAINER WITH SPACIOUS INTERACTION SYSTEMS ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
          className="w-full"
        >
          {/* TAB 1: BLUEPRINT */}
          {activeTab === 'blueprint' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

              {/* Main Blueprint details */}
              <div className="md:col-span-2 flex flex-col gap-8">
                
                {/* Problem Statement Component */}
                <div className="p-8 rounded-3xl border border-white/[0.04] bg-[#0c1223]/10 backdrop-blur-md shadow-2xl flex flex-col gap-3">
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest font-black block">
                    THE ANCHOR CHALLENGE STATEMENT
                  </span>
                  <div className="flex items-start gap-5">
                    <span className="text-3xl p-3 bg-white/[0.02] border border-white/5 rounded-2xl select-none">🚨</span>
                    <p className="text-sm text-gray-300 leading-relaxed font-sans pt-1">
                      {project.problemStatement}
                    </p>
                  </div>
                </div>

                {/* Solution Strategy Component */}
                <div className="p-8 rounded-3xl border border-white/[0.04] bg-[#0c1223]/10 backdrop-blur-md shadow-2xl flex flex-col gap-3">
                  <span className="text-[10px] font-mono text-[#5ef1df] uppercase tracking-widest font-black block">
                    THE PROPOSED SYSTEM ARCHITECTURE
                  </span>
                  <div className="flex items-start gap-5">
                    <span className="text-3xl p-3 bg-white/[0.02] border border-white/5 rounded-2xl select-none">💡</span>
                    <p className="text-sm text-gray-300 leading-relaxed font-sans pt-1">
                      {project.solutionOverview}
                    </p>
                  </div>
                </div>

                {/* Tech chip pile */}
                <div className="p-8 rounded-3xl border border-white/[0.04] bg-[#0c1223]/10 backdrop-blur-md shadow-2xl flex flex-col gap-4">
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest font-black block">
                    COMPILED TECHNOLOGY MODULES
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 rounded-xl border border-white/[0.04] bg-white/[0.01] hover:border-[#5ef1df]/30 hover:bg-[#5ef1df]/5 hover:text-white text-xs text-gray-300 font-mono font-bold transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Sidebar stats panel */}
              <div className="flex flex-col gap-8">
                
                {/* Team Members */}
                <div className="p-8 rounded-3xl border border-white/[0.04] bg-[#0c1223]/10 backdrop-blur-md shadow-2xl flex flex-col gap-5">
                  <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest font-black flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#5ef1df]" /> PROJECT ENGINEERS
                  </h3>
                  <div className="flex flex-col gap-3.5">
                    {project.teamMembers.map((member, idx) => (
                      <div 
                        key={idx}
                        className="p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 flex items-center gap-4 transition-all"
                      >
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs text-black"
                          style={{ backgroundColor: member.color || '#5ef1df' }}
                        >
                          {member.initials}
                        </div>
                        <div className="flex flex-col leading-tight">
                          <span className="text-sm font-bold text-white font-sans">{member.name}</span>
                          <span className="text-[10px] text-gray-500 font-mono tracking-wider uppercase mt-1">{member.role}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Score Summary Metrics */}
                <div className="p-8 rounded-3xl border border-white/[0.04] bg-[#0c1223]/10 backdrop-blur-md shadow-2xl flex flex-col gap-4">
                  <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest font-black flex items-center gap-2">
                    <Award className="w-4 h-4 text-purple-400" /> STABILITY RATING
                  </h3>

                  <div className="flex items-center gap-4 py-3 border-b border-white/[0.04]">
                    <span className="text-4xl font-extrabold font-display text-white">{overallScore}</span>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-500 uppercase font-mono tracking-wider font-bold">Consensus Metric</span>
                      <span className="text-[9px] text-[#5ef1df] font-mono tracking-widest mt-1 font-black">HIGHLY RECOMMENDED</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 font-sans py-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Innovation Quotient</span>
                      <span className="text-white font-mono font-bold">{avgInnovation}/10</span>
                    </div>
                    <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#5ef1df] h-full transition-all duration-500" style={{ width: `${parseFloat(avgInnovation) * 10}%` }} />
                    </div>

                    <div className="flex justify-between text-xs mt-1">
                      <span className="text-gray-400">Technical Difficulty</span>
                      <span className="text-white font-mono font-bold">{avgComplexity}/10</span>
                    </div>
                    <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                      <div className="bg-purple-500 h-full transition-all duration-500" style={{ width: `${parseFloat(avgComplexity) * 10}%` }} />
                    </div>

                    <div className="flex justify-between text-xs mt-1">
                      <span className="text-gray-400">Production Feasibility</span>
                      <span className="text-white font-mono font-bold">{avgFeasibility}/10</span>
                    </div>
                    <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-400 h-full transition-all duration-500" style={{ width: `${parseFloat(avgFeasibility) * 10}%` }} />
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: FUNCTIONAL SIMULATOR PORT */}
          {activeTab === 'simulator' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

              {/* Console window */}
              <div className="md:col-span-2 flex flex-col gap-4">
                
                <div className="p-8 rounded-3xl border border-white/[0.04] bg-[#0c1223]/10 backdrop-blur-md shadow-2xl flex flex-col gap-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 text-[10px] font-mono text-gray-700 select-none">
                    DIAGNOSTICS PANEL V2.1
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#5ef1df] animate-ping" />
                    <span className="text-xs font-mono text-gray-400 tracking-wider">HARDWARE COMM TELEMETRY CHANNEL</span>
                  </div>

                  {/* Oscilloscope live Wave Canvas */}
                  <div className="h-28 w-full bg-black/60 rounded-2xl border border-white/[0.06] flex flex-col overflow-hidden relative">
                    <span className="absolute top-2 left-3 text-[8px] font-mono text-gray-600 tracking-wider">OSCILLOSCOPE_LIVE_OUTPUT</span>
                    <canvas 
                      ref={canvasRef} 
                      width={640} 
                      height={112} 
                      className="w-full h-full"
                    />
                  </div>

                  {/* Interactive Terminal window */}
                  <div className="bg-black/90 rounded-2xl border border-white/10 p-5 font-mono text-[10px] min-h-[220px] max-h-80 overflow-y-auto leading-relaxed flex flex-col text-gray-300">
                    <div className="border-b border-white/[0.05] pb-2.5 mb-3 text-gray-500 flex justify-between">
                      <span>CONSOLE OUTPUT CHANNEL</span>
                      <span>BUFFER SYSTEM OK</span>
                    </div>

                    {simLog.length === 0 ? (
                      <div className="text-gray-600 italic flex-grow flex items-center justify-center text-center p-8 text-xs leading-relaxed max-w-md mx-auto">
                        Terminal idle. Choose one of the verified hardware/software input feed records on the right panel to launch simulator processing...
                      </div>
                    ) : (
                      <div className="flex-grow flex flex-col gap-2">
                        {simLog.map((line, i) => (
                          <div key={i} className="flex gap-2">
                            <span className="text-gray-500 font-bold">&gt;</span>
                            <span className={line.includes('successfully') || line.includes('Segment') ? 'text-[#5ef1df] font-semibold' : ''}>
                              {line}
                            </span>
                          </div>
                        ))}
                        {isSimulating && (
                          <div className="text-[#a855f7] animate-pulse font-sans font-bold flex items-center gap-2 mt-2">
                            <span>Processing compilation package segments... ({simProgress}%)</span>
                          </div>
                        )}
                      </div>
                    )}
                    <div ref={terminalEndRef} />
                  </div>

                  {/* Telemetry bottom status info */}
                  <div className="flex justify-between items-center bg-white/[0.01] px-5 py-4 rounded-2xl font-mono text-[9px] text-gray-500 border border-white/[0.03]">
                    <div className="flex gap-6">
                      <span>TRANSMISSION_HEX: <strong className="text-white">{activePacketCode}</strong></span>
                      <span>BUS_STATE: <strong className="text-emerald-400">ACTIVE_STREAMING</strong></span>
                    </div>
                    <span>PARSED COMPILER CALIBRATION OK</span>
                  </div>

                </div>

              </div>

              {/* Selecting sample packets inside pipeline */}
              <div className="flex flex-col gap-8">
                
                {/* Seed packet selector */}
                <div className="p-8 rounded-3xl border border-white/[0.04] bg-[#0c1223]/10 backdrop-blur-md shadow-2xl flex flex-col gap-4">
                  <div>
                    <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest font-black">
                      EMBEDDED INPUT DECK
                    </h3>
                    <p className="text-[10px] text-gray-500 font-sans mt-2 leading-relaxed">
                      Calibrate custom hardware triggers. Choose an input module to run the neural net or state machines.
                    </p>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    {payloads.map((payload, idx) => {
                      const isActive = activePayloadIndex === idx;
                      return (
                        <button
                          key={idx}
                          disabled={isSimulating}
                          onClick={() => handleSimulate(idx)}
                          className={`p-4 rounded-2xl border text-left flex flex-col gap-1.5 transition-all cursor-pointer ${
                            isActive
                              ? 'border-[#5ef1df] bg-[#5ef1df]/5 text-[#5ef1df]'
                              : 'border-white/5 bg-white/[0.01] hover:bg-white/[0.03] text-gray-300'
                          }`}
                        >
                          <div className="flex justify-between items-center w-full">
                            <span className="text-[9px] font-mono font-black tracking-widest text-[#a855f7]">RECORD INDEX {idx + 1}</span>
                            <span className="text-[8px] font-mono bg-white/5 px-2 py-0.5 rounded text-gray-400 font-bold">
                              {payload.badge}
                            </span>
                          </div>
                          <span className="text-xs font-extrabold font-sans mt-1">
                            {payload.input}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Direct Deployed sandbox gateway */}
                <div className="p-8 rounded-3xl border border-white/[0.04] bg-[#0c1223]/10 backdrop-blur-md shadow-2xl flex flex-col gap-4">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl p-2 bg-white/5 rounded-xl">⚡</span>
                    <div className="flex flex-col leading-tight">
                      <h3 className="text-xs font-sans font-bold text-white uppercase tracking-wider">Source Sandbox</h3>
                      <span className="text-[9px] text-gray-500 font-mono uppercase mt-1">DEPLOYED REPOSITORY</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-400 leading-relaxed">
                    Redirects standard connection straight to the undergraduate team's live deployment repository, schematic files, or product video documentation.
                  </p>
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center py-3 rounded-2xl text-xs font-mono font-black tracking-widest bg-[#5ef1df] hover:bg-[#68ffea] text-black transition-all flex items-center justify-center gap-1.5 pointer-events-auto hover:shadow-2xl"
                  >
                    GO TO REPOSITORIES <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>

            </div>
          )}

          {/* TAB 3: REVIEWS & SURVEY REPORTS */}
          {activeTab === 'reviews' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              {/* Testimonials column */}
              <div className="md:col-span-2 flex flex-col gap-6">
                <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest font-black px-1 mr-2">
                  PEER DESIGN REVENUE AUDITS
                </h3>

                <div className="flex flex-col gap-5 max-h-[500px] overflow-y-auto pr-2">
                  {localAssessments.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-6 md:p-8 rounded-3xl border border-white/[0.04] bg-[#0c1223]/10 backdrop-blur-md shadow-xl flex flex-col gap-4 relative"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col leading-tight">
                          <span className="text-sm font-bold text-white max-w-sm font-sans">
                            {item.reviewer}
                          </span>
                          <span className="text-[9px] text-gray-500 font-mono tracking-widest mt-1">
                            {item.timestamp}
                          </span>
                        </div>

                        {/* Scores badge lists */}
                        <div className="flex gap-2.5 font-mono text-[9px] font-bold">
                          <span className="text-[#5ef1df] bg-[#5ef1df]/5 px-2.5 py-1 rounded border border-[#5ef1df]/10">
                            INN // {item.innovation}
                          </span>
                          <span className="text-[#a855f7] bg-[#a855f7]/5 px-2.5 py-1 rounded border border-[#a855f7]/10">
                            FES // {item.feasibility}
                          </span>
                          <span className="text-amber-400 bg-amber-400/5 px-2.5 py-1 rounded border border-amber-400/10">
                            COM // {item.complexity}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-gray-400 leading-relaxed italic border-l-2 border-white/5 pl-4">
                        "{item.notes}"
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Evaluation submit form */}
              <div className="flex flex-col gap-8">
                
                <div className="p-8 rounded-3xl border border-white/[0.04] bg-[#0c1223]/10 backdrop-blur-md shadow-2xl">
                  <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest font-black mb-6">
                    LOG NEW FIELD AUDIT
                  </h3>

                  <form onSubmit={submitAssessment} className="flex flex-col gap-5 font-sans text-xs">
                    
                    {/* Review name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-mono text-gray-500 uppercase tracking-widest font-black">Evaluator Tag Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Prof. Raman / Lead Architect"
                        value={reviewerName}
                        onChange={(e) => setReviewerName(e.target.value)}
                        className="p-3.5 bg-black/60 border border-white/[0.05] rounded-2xl text-white outline-none focus:border-[#5ef1df] transition-colors"
                      />
                    </div>

                    {/* Score sliders */}
                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between text-[9px] font-mono text-gray-500 uppercase tracking-widest font-black">
                        <span>INNOVATION SCORE</span>
                        <span className="text-white font-bold">{scoreInnovation}/10</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="10"
                        value={scoreInnovation}
                        onChange={(e) => setScoreInnovation(parseInt(e.target.value))}
                        className="w-full accent-[#5ef1df]"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between text-[9px] font-mono text-gray-500 uppercase tracking-widest font-black">
                        <span>TECHNICAL REVENUE</span>
                        <span className="text-white font-bold">{scoreComplexity}/10</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="10"
                        value={scoreComplexity}
                        onChange={(e) => setScoreComplexity(parseInt(e.target.value))}
                        className="w-full accent-purple-500"
                      />
                    </div>

                    {/* text box review feedback notes */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-mono text-gray-500 uppercase tracking-widest font-black">Constructive Review Comments</label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Log compiler state performance, latency details or commercial recommendations here..."
                        value={evaluationNotes}
                        onChange={(e) => setEvaluationNotes(e.target.value)}
                        className="p-3.5 bg-black/60 border border-white/[0.05] rounded-2xl text-white outline-none focus:border-[#5ef1df] resize-none transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#5ef1df] hover:bg-[#68ffea] text-black font-mono font-black rounded-2xl transition-all cursor-pointer shadow-2xl mt-2 uppercase text-xs tracking-widest"
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', height: '48px', border: 'none' }}
                    >
                      <Send className="w-4 h-4 shrink-0" /> <span>SUBMIT AUDIT</span>
                    </button>

                  </form>

                  <AnimatePresence>
                    {justSubmitted && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl text-[9px] text-center font-mono font-black uppercase tracking-wider"
                      >
                        ✓ Evaluation filed in ledger successfully!
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>

            </div>
          )}
        </motion.div>
      </AnimatePresence>

    </div>
  );
};

export default ProjectDetail;
