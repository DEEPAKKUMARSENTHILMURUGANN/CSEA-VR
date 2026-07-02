import React from 'react';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';
import { useCountUp } from './hooks/useCountUp';
import styles from '../../../components-css/industry.module.css';

export function ImpactNumbers() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  // 6 distinct countUp hook targets with varying durations so they land dynamically (1200ms to 2000ms)
  const [count1] = useCountUp(125, 1400, isVisible);
  const [count2] = useCountUp(32, 1600, isVisible);
  const [count3] = useCountUp(8, 1200, isVisible);
  const [count4] = useCountUp(30, 1800, isVisible);
  const [count5] = useCountUp(200, 2000, isVisible);
  const [count6] = useCountUp(10, 1500, isVisible);

  const stats = [
    { number: count1, suffix: '+', label: 'Industry Tie-ups' },
    { number: count2, suffix: '+', label: 'Consultancy Projects' },
    { number: count3, suffix: '', label: 'Sponsored Labs' },
    { number: count4, suffix: '+', label: 'Research Projects' },
    { number: count5, suffix: '+', label: 'Internship Partners' },
    { prefix: '₹', number: count6, suffix: ' Cr+', label: 'Research Funding' }
  ];

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ paddingTop: '8rem', paddingBottom: '8rem', paddingLeft: '5%', paddingRight: '5%', backgroundColor: 'var(--psg-charcoal)' }}
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Centered Heading */}
        <div className="text-center mb-24">
          <h2
            className="text-white text-4xl sm:text-5xl font-black uppercase tracking-tight mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Our Strength
          </h2>
          <div className="w-[48px] h-[1px] bg-[var(--psg-gold)] opacity-40 mx-auto" />
        </div>

        {/* 6 stats in custom responsive grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {stats.map((stat, idx) => {
            // Apply unique transition delay stagger (80ms per index)
            const delay = idx * 80;

            return (
              <div
                key={idx}
                className="flex flex-col items-start text-left transition-all duration-[800ms] transform"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
                  transitionDelay: `${delay}ms`,
                  transitionTimingFunction: 'var(--ease-out-expo)'
                }}
              >
                {/* Horizontal / Vertical mini rule above the count */}
                <div className="w-8 h-[2px] bg-[var(--psg-gold)] opacity-35 mb-4" />

                {/* Stat Display Block */}
                <div
                  className="text-7xl font-black text-[var(--psg-gold)] tracking-tight leading-none"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {stat.prefix || ''}
                  {stat.number}
                  {stat.suffix}
                </div>

                {/* Tracking Label */}
                <span
                  className="font-medium text-xs text-white/50 uppercase tracking-[0.1em] mt-3"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export default ImpactNumbers;
