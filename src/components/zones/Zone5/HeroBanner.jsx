import React, { useEffect, useState } from 'react';
import { Play } from 'lucide-react';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';
import styles from '../../../components-css/industry.module.css';
import psgBuilding from './assets/images/psg_tech_heritage_building_1781941790591.jpg';

export function HeroBanner() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (isVisible) {
      // Orchestrate the sequential loaded state
      setStage(1); // t=0ms Orbs fade in

      const tPortal = setTimeout(() => setStage(2), 200);   // t=200ms Portal fades in
      const tEyebrow = setTimeout(() => setStage(3), 350);  // t=350ms Eyebrow slides down
      const tHead1 = setTimeout(() => setStage(4), 450);    // t=450ms Heading line 1
      const tHead2 = setTimeout(() => setStage(5), 580);    // t=580ms Heading line 2
      const tDivide = setTimeout(() => setStage(6), 680);   // t=680ms Divider draws
      const tBody = setTimeout(() => setStage(7), 750);     // t=750ms Body fades in
      const tButtons = setTimeout(() => setStage(8), 850);  // t=850ms Buttons appear
      const tStat = setTimeout(() => setStage(9), 1000);    // t=1000ms Stat card drifts in

      return () => {
        clearTimeout(tPortal);
        clearTimeout(tEyebrow);
        clearTimeout(tHead1);
        clearTimeout(tHead2);
        clearTimeout(tDivide);
        clearTimeout(tBody);
        clearTimeout(tButtons);
        clearTimeout(tStat);
      };
    }
  }, [isVisible]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-transparent text-slate-900 min-h-[85vh] flex flex-col justify-center w-full"
      style={{ paddingTop: '7rem', paddingBottom: '5rem', paddingLeft: '5%', paddingRight: '5%' }}
    >
      {/* Light Glassmorphism Base */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl z-[-1]" />

      {/* Decorative Orbs */}
      <div
        className={`absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-[120px] transition-opacity duration-1000 z-[-1] ${stage >= 1 ? 'opacity-100' : 'opacity-0'}`}
      />
      <div
        className={`absolute bottom-0 left-0 w-[600px] h-[600px] bg-violet-100/40 rounded-full blur-[100px] transition-opacity duration-1000 z-[-1] ${stage >= 1 ? 'opacity-100' : 'opacity-0'}`}
      />

      <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10 my-auto">
        {/* Left Column — Content */}
        <div className="lg:col-span-7 text-left">
          <div
            className={`transition-all duration-[400ms] inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-6 ${stage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-[10px]'}`}
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="text-xs font-bold tracking-widest uppercase text-slate-500 font-mono">INDUSTRY & INNOVATION</span>
          </div>

          <h1 className="mt-2 mb-4 select-text">
            <span
              className={`block text-slate-900 font-black uppercase tracking-tight transition-all duration-[600ms] transform leading-none ${stage >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[28px]'}`}
              style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}
            >
              Where Classrooms
            </span>
            <span
              className={`block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600 font-black tracking-tight transition-all duration-[600ms] transform leading-none ${stage >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[28px]'}`}
              style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}
            >
              Meet Boardrooms.
            </span>
          </h1>

          <div
            className="bg-blue-500 opacity-50 transition-all duration-[250ms]"
            style={{
              height: '3px',
              width: stage >= 6 ? '64px' : '0px',
              margin: '32px 0',
              borderRadius: '4px'
            }}
          />

          {/* Body */}
          <p
            className={`text-slate-600 font-medium text-base md:text-xl leading-[1.8] max-w-[600px] transition-opacity duration-[350ms] ${stage >= 7 ? 'opacity-100' : 'opacity-0'}`}
          >
            120+ industry partnerships. 12 commercialised products. One department building what Tamil Nadu's industries actually need.
          </p>

          {/* Buttons */}
          <div
            className={`flex flex-wrap items-center gap-4 mt-10 transition-all duration-[500ms] ${stage >= 8 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[10px]'}`}
          >
            <button
              onClick={() => {
                const target = document.getElementById('cta-block');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-xl text-white font-bold text-sm tracking-wide bg-blue-600 shadow-[0_8px_20px_rgba(37,99,235,0.25)] hover:shadow-[0_12px_28px_rgba(37,99,235,0.4)] hover:-translate-y-1 transition-all duration-300"
            >
              Explore Partnerships
            </button>
            <button
              onClick={() => {
                const portalElem = document.getElementById('video-portal');
                if (portalElem) portalElem.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-xl text-slate-700 font-bold text-sm tracking-wide bg-white border border-slate-200 shadow-sm hover:bg-slate-50 hover:border-blue-200 transition-all duration-300 flex items-center gap-2"
            >
              Watch the Story <span className="text-[10px] text-blue-600">▶</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 relative flex justify-center items-center h-full w-full">
          <div
            id="video-portal"
            className={`relative w-full aspect-video rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(37,99,235,0.15)] transition-all duration-[800ms] ${stage >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-94'}`}
          >
            {/* Real majestic heritage building image */}
            <img
              src={psgBuilding}
              alt="PSG College of Technology Heritage Block"
              className="absolute inset-0 w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-700 z-0"
              referrerPolicy="no-referrer"
            />

            {/* Gradient overlap inside */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent pointer-events-none z-10"></div>

            {/* Play trigger indicator */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
              <div className="w-[64px] h-[64px] rounded-full flex items-center justify-center bg-white/90 backdrop-blur-md text-blue-600 transition-all duration-300 hover:bg-blue-600 hover:text-white hover:scale-110 shadow-xl cursor-pointer">
                <Play className="w-6 h-6 fill-current translate-x-0.5" />
              </div>
              <div
                className="mt-6 px-4 py-2 border border-slate-200/50 rounded-lg bg-black/30 backdrop-blur-md text-xs text-white font-mono tracking-wider font-bold shadow-sm"
              >
                [IEC Walkthrough Video]
              </div>
            </div>

            {/* Bottom-left label caption */}
            <div className="absolute bottom-6 left-6 text-left z-20 pointer-events-none">
              <span className="text-xs text-white/90 uppercase tracking-widest font-bold block drop-shadow-md">
                Virtual Tour
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
