import React, { useEffect, useState } from 'react';
import { Lightbulb, Wrench, Package, Globe, ArrowUpRight, Award, Shield, Cpu } from 'lucide-react';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';
import { useCountUp } from './hooks/useCountUp';
import styles from '../../../components-css/industry.module.css';
import psgLab from './assets/images/psg_cse_research_lab_1781941809367.jpg';
import jayasreeImg from './assets/jayasree.png';

export function StartupPipeline() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [activeStep, setActiveStep] = useState(0);

  // Stats count up hooks with 900ms duration
  const [countIdea] = useCountUp(25, 900, isVisible);
  const [countProto] = useCountUp(18, 900, isVisible);
  const [countProd] = useCountUp(12, 900, isVisible);
  const [countMarket] = useCountUp(8, 900, isVisible);

  useEffect(() => {
    if (isVisible) {
      setActiveStep(1);
      const t1 = setTimeout(() => setActiveStep(2), 250);
      const t2 = setTimeout(() => setActiveStep(3), 500);
      const t3 = setTimeout(() => setActiveStep(4), 750);
      const t4 = setTimeout(() => setActiveStep(5), 1000);
      const t5 = setTimeout(() => setActiveStep(6), 1250);
      const t6 = setTimeout(() => setActiveStep(7), 1500);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
        clearTimeout(t5);
        clearTimeout(t6);
      };
    }
  }, [isVisible]);

  const staircaseSteps = [
    {
      title: 'IDEA',
      icon: <Lightbulb className="w-5 h-5 text-[var(--psg-gold)]" />,
      count: countIdea,
      hint: '25+ concepts annually',
      height: '160px',
      visibleStage: 1
    },
    {
      title: 'PROTOTYPE',
      icon: <Wrench className="w-5 h-5 text-[var(--psg-gold)]" />,
      count: countProto,
      hint: '18 incubated startups',
      height: '180px',
      visibleStage: 3
    },
    {
      title: 'PRODUCT',
      icon: <Package className="w-5 h-5 text-[var(--psg-gold)]" />,
      count: countProd,
      hint: '12 commercialised',
      height: '200px',
      visibleStage: 5
    },
    {
      title: 'MARKET',
      icon: <Globe className="w-5 h-5 text-[var(--psg-gold)]" />,
      count: countMarket,
      hint: '8 faculty ventures',
      height: '220px',
      visibleStage: 7
    }
  ];

  const ventures = [
    {
      name: 'Dr. L. S. Jayashree',
      role: 'Professor & Head',
      company: 'GaitWatch Biometrix',
      desc: 'AI computer-vision diagnostics transferred to Agna Inc.',
      tag: 'Faculty Spinoff Showcase',
      icon: <Cpu className="w-5 h-5 text-[var(--psg-gold)]" />
    },
    {
      name: 'S. Siddharth & Team',
      role: 'Class of 2024',
      company: 'DeepDefend Security',
      desc: 'Enterprise cloud protection incubated under PSG-HPE Labs.',
      tag: 'Student Enterprise 1',
      icon: <Shield className="w-5 h-5 text-[var(--psg-gold)]" />
    },
    {
      name: 'R. Nirmal Kumar',
      role: 'Class of 2023',
      company: 'Plexus Network OS',
      desc: 'Distributed coordination engine launched on Open-Source.',
      tag: 'Student Enterprise 2',
      icon: <Award className="w-5 h-5 text-[var(--psg-gold)]" />
    }
  ];

  return (
    <section
      ref={ref}
      className="bg-[var(--psg-charcoal)] text-white overflow-hidden"
      style={{ paddingTop: '8rem', paddingBottom: '8rem', paddingLeft: '5%', paddingRight: '5%' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Block to establish copy tone */}
        <div className="text-center mb-24">
          <div className="mb-4">
            <span className={`${styles.eyebrow}`}>
              <span>FROM IDEA TO IMPACT</span>
            </span>
          </div>
          <h2
            className="text-4xl sm:text-5xl font-black uppercase text-white tracking-tight leading-none mb-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Not Just Students. <br className="sm:hidden" />
            <span className="text-[var(--psg-gold)] italic font-bold text-3xl sm:text-4xl">Founders.</span>
          </h2>
        </div>

        {/* Staircase Step cards: bottom-aligned in flex layout */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 lg:gap-2 mb-28">
          {staircaseSteps.map((step, idx) => {
            const isCardActive = activeStep >= step.visibleStage;
            const isArrowActive = activeStep >= step.visibleStage + 1;

            return (
              <React.Fragment key={idx}>
                {/* Staircard with custom height matching the ascending rules */}
                <div
                  className={`flex-1 min-w-[200px] p-5 rounded-xl bg-white/[0.03] border border-white/[0.06] transition-all duration-700 transform flex flex-col justify-between hover:bg-white/[0.08] hover:translate-y-[-4px] ${styles.stepCard} ${
                    isCardActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
                  }`}
                  style={{
                    height: step.height,
                    transitionTimingFunction: 'var(--ease-out-expo)'
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-white/[0.04] rounded-lg">
                      {step.icon}
                    </div>
                    <span
                      className="text-white/90 font-bold text-xs tracking-wider uppercase"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      {step.title}
                    </span>
                  </div>

                  <div className="text-left mt-auto select-text">
                    <span
                      className="text-[var(--psg-gold)] text-4xl font-black block leading-none"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {step.count}
                    </span>
                    <span
                      className="text-white/50 text-[11px] block mt-1 leading-snug font-medium uppercase tracking-wide"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      {step.hint}
                    </span>
                  </div>
                </div>

                {/* SVG Arrow Connectors */}
                {idx < staircaseSteps.length - 1 && (
                  <div className="flex justify-center items-center py-4 md:py-0 self-center md:mb-10">
                    <svg
                      width="40"
                      height="12"
                      viewBox="0 0 40 12"
                      className="hidden md:block select-none pointer-events-none"
                    >
                      <path
                        d="M0 6 L34 6 M28 1 L34 6 L28 11"
                        stroke="var(--psg-gold)"
                        strokeWidth="1.5"
                        fill="none"
                        strokeDasharray="50"
                        strokeDashoffset={isArrowActive ? '0' : '50'}
                        style={{ transition: 'stroke-dashoffset 0.6s ease-out' }}
                      />
                    </svg>

                    {/* mobile fallbacks */}
                    <div
                      className={`md:hidden text-[var(--psg-gold)] font-bold text-base transition-all duration-300 ${
                        isArrowActive ? 'opacity-50 scale-100' : 'opacity-0 scale-50'
                      }`}
                    >
                      ↓
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Bottom Founder placeholders */}
        <div className="border-t border-white/[0.08] pt-20">
          <div className="text-center mb-16">
            <span
              className="text-[var(--psg-gold)] text-xs font-bold tracking-[0.25em] uppercase mb-4 block"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              INVESTOR READY VENTURES
            </span>
            <p className="text-white/40 text-xs w-full max-w-sm mx-auto" style={{ fontFamily: 'var(--font-sans)' }}>
              Commercial-grade platforms operated and spun out from the department.
            </p>
          </div>

          {/* Three columns of customized showcase cards using newly generated R&D lab images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {ventures.map((v, idx) => (
              <div key={idx} className="flex flex-col items-center w-full max-w-[280px]">
                {/* 280px x 240px Card */}
                <div
                  className="relative w-full h-[240px] rounded-xl border border-white/[0.08] overflow-hidden group cursor-pointer shadow-lg transition-all duration-500 hover:scale-[1.02] hover:border-[var(--psg-gold)]/[0.4] hover:shadow-[0_12px_36px_rgba(201,146,42,0.15)] flex flex-col justify-end p-6"
                  style={{ transitionTimingFunction: 'var(--ease-out-soft)' }}
                >
                  {/* Background Lab Image overlay with custom filters */}
                  <img
                    src={psgLab}
                    alt={v.company}
                    className="absolute inset-0 w-full h-full object-cover opacity-15 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700 z-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--psg-charcoal)] via-[var(--psg-charcoal)]/85 to-[var(--psg-charcoal)]/40 z-10 pointer-events-none" />

                  {/* Icon floating top right */}
                  <div className="absolute top-4 right-4 p-2 bg-white/[0.02] border border-white/5 rounded-lg z-20 group-hover:border-[var(--psg-gold)]/30 transition-colors duration-300">
                    {v.icon}
                  </div>

                  {/* Venture content */}
                  <div className="relative z-20 text-left">
                    <span className="text-[10px] text-[var(--psg-gold)] font-mono tracking-widest uppercase block mb-1">
                      {v.role}
                    </span>
                    <h4 className="text-white text-lg font-bold tracking-tight mb-1 group-hover:text-[var(--psg-gold)] transition-colors duration-300 flex items-center gap-1">
                      {v.company}
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </h4>
                    <p className="text-white/60 text-xs leading-relaxed font-sans font-medium line-clamp-2">
                      {v.desc}
                    </p>
                    <div className="mt-4 pt-3 border-t border-white/[0.05] flex items-center justify-between text-[10px] text-white/40">
                      <div className="flex items-center gap-2">
                        {v.name === 'Dr. L. S. Jayashree' && (
                          <img src={jayasreeImg} alt={v.name} className="w-5 h-5 rounded-full object-cover" />
                        )}
                        <span>{v.name}</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Venture label tag below */}
                <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--psg-gold)]/70 mt-3.5 block" style={{ fontFamily: 'var(--font-sans)' }}>
                  {v.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export default StartupPipeline;
