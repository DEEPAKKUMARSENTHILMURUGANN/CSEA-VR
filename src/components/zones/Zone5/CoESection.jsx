import React from 'react';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';
import styles from '../../../components-css/industry.module.css';
import centreOfExcellenceImg from './assets/centre of excellence.png';

export function CoESection() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      className={`bg-[var(--psg-cream)]/50 overflow-hidden`}
      style={{ paddingTop: '8rem', paddingBottom: '8rem', paddingLeft: '5%', paddingRight: '5%' }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left column: Text */}
        <div
          className={`lg:col-span-7 transition-all duration-1200 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionTimingFunction: 'var(--ease-out-expo)' }}
        >
          {/* Eyebrow Label with premium line decoration */}
          <div className="mb-6">
            <span className={`${styles.eyebrow}`}>
              <span>DST-FUNDED CENTRE OF EXCELLENCE</span>
            </span>
          </div>

          <h2
            className="text-[var(--psg-maroon)] text-3xl sm:text-4xl md:text-[40px] font-black uppercase tracking-tight mb-6 leading-none"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Assistive Technologies Lab
          </h2>

          <p
            className={`${styles.fontSans} text-[var(--psg-steel)] text-base md:text-lg leading-relaxed mb-8`}
          >
            Established with sponsorship from the Department of Science & Technology and PSG Institute of Medical Research, this centre focuses entirely on product development for underserved communities — the elderly, the differently-abled, and rural healthcare recipients.
          </p>

          {/* Staggered Bullet Callouts */}
          <div className="flex flex-col gap-6">
            <div
              className={`flex items-start gap-4 transition-all duration-320 transform ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-3'
              }`}
              style={{
                transitionDelay: isVisible ? '200ms' : '0ms',
                transitionTimingFunction: 'var(--ease-out-soft)'
              }}
            >
              {/* Gold dot */}
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--psg-gold)] mt-2 flex-shrink-0"></div>
              <div>
                <h4 className={`${styles.fontSans} text-sm font-bold text-white uppercase tracking-wide`}>
                  DST Research Grant Recipient
                </h4>
                <p className={`${styles.fontSans} text-xs text-[var(--psg-steel)] mt-1`}>
                  Secured national-tier federal sponsorship for applied biomedical and cyber-physical engineering.
                </p>
              </div>
            </div>

            <div
              className={`flex items-start gap-4 transition-all duration-320 transform ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-3'
              }`}
              style={{
                transitionDelay: isVisible ? '280ms' : '0ms',
                transitionTimingFunction: 'var(--ease-out-soft)'
              }}
            >
              {/* Gold dot */}
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--psg-gold)] mt-2 flex-shrink-0"></div>
              <div>
                <h4 className={`${styles.fontSans} text-sm font-bold text-white uppercase tracking-wide`}>
                  3 Products Deployed in Real Clinical Settings
                </h4>
                <p className={`${styles.fontSans} text-xs text-[var(--psg-steel)] mt-1`}>
                  Engineered systems undergo active validation inside PSG Hospitalswards with real clinical feedback loops.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Centre of Excellence image */}
        <div
          className={`lg:col-span-5 transition-all duration-1200 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            transitionDelay: isVisible ? '150ms' : '0ms',
            transitionTimingFunction: 'var(--ease-out-expo)'
          }}
        >
          <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.3)] hover:shadow-xl transition-all duration-300">
            {/* 400x300 container with actual image */}
            <img
              src={centreOfExcellenceImg}
              alt="Lab interior photo / team working photo"
              className="w-full h-[300px] object-cover rounded-lg"
            />
            {/* Caption in 12px steel */}
            <div className="mt-4 text-center">
              <span className={`${styles.fontSans} text-xs text-[var(--psg-steel)]/70 font-semibold uppercase tracking-widest block`}>
                Centre of Excellence on Assistive Technologies — PSG CSE
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
