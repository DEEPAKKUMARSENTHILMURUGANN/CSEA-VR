import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import Zone2_StudentInnovationGallery from './components/zones/Zone2_StudentInnovationGallery/Zone2';
import Zone5 from "./components/zones/Zone5/Zone5";

export default function App() {
  const [systemTime, setSystemTime] = useState('');
  const [activeZone, setActiveZone] = useState('zone5');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setSystemTime(now.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#02050d] text-[#9ca3af] relative font-sans flex flex-col antialiased">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-[#10b981]/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-[#a855f7]/5 to-transparent blur-3xl pointer-events-none" />

      <header className="h-20 border-b border-white/[0.04] bg-[#02050d]/80 backdrop-blur-xl px-8 flex items-center justify-between z-40 sticky top-0 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5ef1df] via-[#3b82f6] to-[#a855f7] flex items-center justify-center text-black font-black text-xs tracking-tighter shadow-lg">
            PSG
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-black text-white tracking-widest leading-none uppercase">PSG College of Technology</h1>
            <span className="text-[9px] font-mono tracking-widest text-[#5ef1df] uppercase mt-2 font-bold">DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex bg-white/[0.03] p-1 rounded-xl border border-white/5">
          <button 
            onClick={() => setActiveZone('zone2')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 ${activeZone === 'zone2' ? 'bg-[#5ef1df] text-black shadow-md' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            Zone 2: Innovation
          </button>
          <button 
            onClick={() => setActiveZone('zone5')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 ${activeZone === 'zone5' ? 'bg-[#C9922A] text-[#0F0506] shadow-md' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            Zone 5: Industry
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-gray-400 bg-white/[0.02] border border-white/[0.04] px-4 py-2 rounded-xl shadow-lg">
          <Clock className="w-4 h-4 text-[#5ef1df] animate-pulse" />
          <span className="text-white font-bold">{systemTime || '12:00:00'} IST</span>
        </div>
      </header>

      <div className={`flex-grow flex flex-col items-center w-full ${activeZone === 'zone2' ? 'px-6 md:px-12 py-10' : ''}`}>
        <main className={`w-full relative flex-grow ${activeZone === 'zone2' ? 'max-w-6xl' : ''}`}>
          {activeZone === 'zone2' && <Zone2_StudentInnovationGallery />}
          {activeZone === 'zone5' && <Zone5 />}
        </main>
      </div>

      <footer className="h-14 border-t border-white/[0.04] bg-black/40 flex items-center justify-between px-8 z-30 font-mono text-[9px] text-gray-500">
        <span>© 2026 PSG College of Technology. Computer Science Association.</span>
        <span>Secure Blockchain & IoT Telemetry Verified.</span>
      </footer>
    </div>
  );
}