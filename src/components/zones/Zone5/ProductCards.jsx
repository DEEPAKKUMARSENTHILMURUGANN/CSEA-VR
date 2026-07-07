import React, { useEffect, useState } from 'react';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';
import { Building, User, ArrowUpRight } from 'lucide-react';
import styles from '../../../components-css/industry.module.css';
import jayasreeImg from './assets/jayasree.png';



export function ProductCards() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });

  const products = [
    {
      title: 'Gait Watch',
      tag: 'COMMERCIALISED',
      tagBg: 'var(--psg-gold)', // Gold bg
      oneLiner: 'Wearable fall risk & gait monitoring device for elderly',
      faculty: 'Dr. L.S. Jayashree',
      partner: 'Agna Inc., Coimbatore',
      impact: 'Technology transferred. Mass produced. Endorsed by leading Neurologists.',
      imageDesc: 'Gait Watch product photo / GIF demo'
    },
    {
      title: 'Vita Link',
      tag: 'DEPLOYED',
      tagBg: 'var(--psg-maroon)', // Maroon bg
      oneLiner: 'Anti-coagulation dosage monitoring system',
      faculty: 'Dr. L.S. Jayashree',
      partner: 'PSG IMSR, Coimbatore',
      impact: 'Accurate Warfarin dosage prescription — reducing risk for therapy patients.',
      imageDesc: 'Vita Link interface / clinical photo'
    },
    {
      title: 'DataPent',
      tag: 'OPERATIONAL',
      tagBg: 'var(--psg-steel)', // Steel bg
      oneLiner: 'AI pharmacy inventory & demand prediction system',
      faculty: 'Dr. L.S. Jayashree',
      partner: 'PSG IMSR Pharmacy Dept',
      impact: 'Tracks drug usage patterns. Predicts demand. Zero stockouts.',
      imageDesc: 'DataPent dashboard screenshot'
    }
  ];

  return (
    <section ref={ref} className="bg-[var(--psg-cream)]" style={{ paddingTop: '8rem', paddingBottom: '8rem', paddingLeft: '5%', paddingRight: '5%' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header Block Left-Aligned */}
        <div className="mb-20 text-center">
          {/* Eyebrow pattern */}
          <div className="mb-4">
            <span className={`${styles.eyebrow}`}>
              <span>CENTRE OF EXCELLENCE · ASSISTIVE TECHNOLOGIES</span>
            </span>
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-[44px] font-black uppercase text-white leading-tight tracking-tight select-text"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Products Born Here. <br />
            <span className="text-[var(--psg-maroon)] italic font-bold">Used Out There.</span>
          </h2>
        </div>

        {/* CSS Grid with uneven columns: 1.05fr, 0.95fr, 1fr */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr_1fr] gap-8">
          {products.map((p, idx) => {
            const staggerDelay = idx * 120;

            return (
              <div
                key={idx}
                className={`relative group flex flex-col bg-[#0c1223]/35 border border-white/[0.05] backdrop-blur-md rounded-xl overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.4)] transition-all duration-[600ms] transform hover:translate-y-[-8px] hover:rotate-[-0.3deg] hover:shadow-[0_28px_72px_rgba(168,85,247,0.15)] ${styles.signatureCard}`}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
                  transitionDelay: `${staggerDelay}ms`,
                  transitionTimingFunction: 'var(--ease-out-expo)',
                  minHeight: '480px'
                }}
              >
                {/* Active side height border trigger rule */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-[4px] bg-[var(--psg-maroon)] group-hover:bg-[var(--psg-gold)] transition-all duration-500`}
                  style={{
                    height: isVisible ? '100%' : '0%',
                    transitionDelay: `${staggerDelay + 200}ms`
                  }}
                />

                {/* Zone A — Card Header (180px height, dark) */}
                <div
                  className="relative bg-[#080d19]/80 overflow-hidden flex flex-col justify-end select-none border-b border-white/[0.05]"
                  style={{ height: '180px', padding: '1.5rem', paddingBottom: '1rem' }}
                >
                  {/* Dashed placeholder container inside background */}
                  <div
                    className="absolute z-0 rounded border-2 border-dashed border-[var(--psg-maroon)]/35 flex flex-col items-center justify-center bg-[#1A0008]/20 group-hover:border-[var(--psg-gold)] group-hover:bg-[calc(201,146,42,0.04)] transition-all duration-300"
                    style={{ top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' }}
                  >
                    <span className="text-[18px] text-[var(--psg-gold)]">📷</span>
                    <span
                      className="text-[10px] uppercase font-bold text-white/40 tracking-wider text-center px-4 mt-2"
                      data-placeholder="image"
                    >
                      {p.imageDesc}
                    </span>
                  </div>

                  {/* Dark gradient overlay covering bottom of header block */}
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-10" />

                  {/* Tag Pill top-right */}
                  <div className="absolute top-6 right-6 z-20">
                    <span
                      className="inline-block px-2.5 py-0.5 rounded text-[10px] font-black tracking-widest uppercase"
                      style={{
                        backgroundColor: p.tagBg,
                        color: p.tag === 'COMMERCIALISED' ? 'var(--psg-charcoal)' : '#FFFFFF'
                      }}
                    >
                      {p.tag}
                    </span>
                  </div>

                  {/* Product title bottom-left */}
                  <h3
                    className="text-white font-bold tracking-tight z-20"
                    style={{ fontFamily: 'var(--font-display)', fontSize: '22px', lineHeight: '1.2' }}
                  >
                    {p.title}
                  </h3>
                </div>

                {/* Zone B — Content */}
                <div
                  className="flex-grow flex flex-col justify-between bg-transparent z-10"
                  style={{ padding: '1.5rem', paddingTop: '1.5rem', paddingBottom: '1.5rem' }}
                >
                  <div>
                    {/* One-liner description */}
                    <p className={`${styles.fontSans} text-[var(--psg-steel)] text-[15px] leading-relaxed mr-2`}>
                      {p.oneLiner}
                    </p>

                    {/* Faculty avatar alignment block */}
                    <div className="flex items-center gap-3" style={{ marginTop: '1.5rem' }}>
                      <div className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-xs text-[var(--psg-maroon)]/60 font-semibold shrink-0 overflow-hidden">
                        {p.faculty === 'Dr. L.S. Jayashree' ? (
                          <img src={jayasreeImg} alt={p.faculty} className="w-full h-full object-cover" />
                        ) : (
                          <User className="w-4 h-4" />
                        )}
                      </div>
                      <div className="text-left">
                        <span className="text-[10px] text-[var(--psg-steel)]/50 uppercase font-black tracking-widest block leading-none">
                          FACULTY COORDINATOR
                        </span>
                        <span className="text-sm font-bold text-white mt-1 block">
                          {p.faculty}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Building development partner tag block */}
                  <div
                    className="flex items-start gap-2.5 border-t border-white/[0.05]"
                    style={{ marginTop: '1.25rem', paddingTop: '1rem' }}
                  >
                    <Building className="w-4 h-4 text-[var(--psg-gold)] shrink-0 mt-0.5" />
                    <div className="text-left">
                      <span className="text-[10px] text-[var(--psg-steel)]/50 uppercase font-bold tracking-widest block leading-none">
                        CO-DEVELOPMENT PARTNER
                      </span>
                      <span className="text-xs font-semibold text-[var(--psg-steel)] mt-1 block">
                        {p.partner}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Zone C — Impact Strip (muted background) */}
                <div
                  className="bg-[#0c1223]/40 border-t border-white/[0.05] flex items-center justify-between gap-4 z-10"
                  style={{ padding: '1.25rem 1.5rem' }}
                >
                  <span className={`${styles.fontSans} text-[#ebd5ff] text-xs font-medium italic leading-relaxed max-w-[80%] text-left`}>
                    {p.impact}
                  </span>
                  <button className="flex items-center gap-1 font-bold text-xs text-[var(--psg-gold)] hover:text-white transition-colors focus:outline-none select-none duration-250 shrink-0">
                    <span className="uppercase tracking-widest font-bold text-[10px] hidden sm:inline">Case Study</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export default ProductCards;
