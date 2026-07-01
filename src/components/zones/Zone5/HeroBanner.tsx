import React, { useEffect, useState } from 'react';
import { Play } from 'lucide-react';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';
import styles from './styles/industry.module.css';
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
      className="relative overflow-hidden bg-[var(--psg-deep)] text-white min-h-screen pt-28 pb-20 px-6 md:px-12 lg:px-24 flex flex-col justify-center"
    >
      {/* Layer 1 — Film grain */}
      <div className={`${styles.heroFilmGrain}`} />

      {/* Layer 2 & 3 — Floating depth anchors */}
      <div
        className={`${styles.orbMaroon} transition-opacity duration-1000 ${stage >= 1 ? 'opacity-100' : 'opacity-0'
          }`}
      />
      <div
        className={`${styles.orbGold} transition-opacity duration-1000 ${stage >= 1 ? 'opacity-100' : 'opacity-0'
          }`}
      />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10 my-auto">
        {/* Left Column — Content */}
        <div className="lg:col-span-7 text-left">
          {/* Eyebrow */}
          <div
            className={`transition-all duration-[400ms] ${styles.eyebrow} ${stage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-[10px]'
              }`}
          >
            <span>INDUSTRY & INNOVATION</span>
          </div>

          {/* Heading */}
          <h1 className="mt-6 mb-4 select-text">
            <span
              className={`block text-white text-[48px] sm:text-[64px] lg:text-[88px] font-black uppercase tracking-tight transition-all duration-[600ms] transform leading-none ${stage >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[28px]'
                }`}
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Where Classrooms
            </span>
            <span
              className={`block text-[var(--psg-gold)] text-[48px] sm:text-[64px] lg:text-[88px] font-black italic tracking-tight transition-all duration-[600ms] transform leading-none ${stage >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[28px]'
                }`}
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Meet Boardrooms.
            </span>
          </h1>

          {/* Divider */}
          <div
            className="bg-[var(--psg-gold)] opacity-50 transition-all duration-[250ms]"
            style={{
              height: '1px',
              width: stage >= 6 ? '48px' : '0px',
              margin: '24px 0'
            }}
          />

          {/* Body */}
          <p
            className={`${styles.fontSans} text-white/55 text-base md:text-[17px] leading-[1.8] max-w-[480px] transition-opacity duration-[350ms] ${stage >= 7 ? 'opacity-100' : 'opacity-0'
              }`}
          >
            120+ industry partnerships. 12 commercialised products. One department building what Tamil Nadu's industries actually need.
          </p>

          {/* Buttons */}
          <div
            className={`flex flex-wrap items-center gap-4 mt-9 transition-all duration-[500ms] ${stage >= 8 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[10px]'
              }`}
          >
            <button
              onClick={() => {
                const target = document.getElementById('cta-block');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-7 py-3.5 rounded-lg text-[var(--psg-deep)] font-bold text-sm tracking-wide bg-[var(--psg-gold)] shadow-[0_4px_14px_rgba(201,146,42,0.25)] hover:shadow-[0_8px_28px_rgba(201,146,42,0.35)] hover:scale-[1.02] hover:brightness-[1.08] transition-all duration-300"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Explore Partnerships
            </button>
            <button
              onClick={() => {
                const portalElem = document.getElementById('video-portal');
                if (portalElem) portalElem.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-7 py-3.5 rounded-lg text-white font-semibold text-sm tracking-wide bg-white/5 border border-white/15 hover:bg-white/10 hover:border-[var(--psg-gold)] transition-all duration-300 flex items-center gap-2"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Watch the Story <span className="text-[10px] text-[var(--psg-gold)]">▶</span>
            </button>
          </div>
        </div>

        {/* Right Column — Video Portal */}
        <div className="lg:col-span-5 relative flex justify-center items-center">
          <div
            id="video-portal"
            className={`relative w-full aspect-video rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_32px_80px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.06)] hover:translate-y-[-6px] hover:shadow-[0_0_60px_rgba(123,28,46,0.35),0_40px_100px_rgba(0,0,0,0.6)] transition-all duration-[800ms] ${stage >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-94'
              }`}
            style={{ transitionTimingFunction: 'var(--ease-out-expo)' }}
          >
            {/* Real majestic heritage building image */}
            <img
              src={psgBuilding}
              alt="PSG College of Technology Heritage Block"
              className="absolute inset-0 w-full h-full object-cover opacity-45 hover:opacity-65 transition-opacity duration-700 z-0"
              referrerPolicy="no-referrer"
            />

            {/* Dark gradient overlap inside */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent pointer-events-none z-10"></div>

            {/* Play trigger indicator */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
              <div className="w-[52px] h-[52px] rounded-full flex items-center justify-center bg-[var(--psg-deep)]/40 border border-[var(--psg-gold)] text-[var(--psg-gold)] transition-all duration-300 hover:bg-[var(--psg-gold)] hover:text-[var(--psg-deep)] hover:scale-110 shadow-[0_0_20px_rgba(201,146,42,0.2)] cursor-pointer">
                <Play className="w-5 h-5 fill-current translate-x-0.5" />
              </div>
              <div
                className="mt-4 px-3 py-1.5 border border-dashed border-[var(--psg-gold)]/40 rounded bg-[var(--psg-maroon)]/25 text-[11px] text-white/90 font-mono tracking-wide"
                data-placeholder="video"
              >
                [IEC Walkthrough Video — 60sec]
              </div>
            </div>

            {/* Bottom-left label caption */}
            <div className="absolute bottom-4 left-5 text-left z-20 pointer-events-none">
              <span className="text-[11px] text-white/50 uppercase tracking-widest font-semibold block" style={{ fontFamily: 'var(--font-sans)' }}>
                Walkthrough Video / Virtual Tour
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
