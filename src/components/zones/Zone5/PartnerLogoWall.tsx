import React, { useEffect, useState } from 'react';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';
import styles from './styles/industry.module.css';

export function PartnerLogoWall() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });
  const [activeCount, setActiveCount] = useState(0);

  const logos = [
    { name: 'HPE' },
    { name: 'Red Hat' },
    { name: 'Cloudera' },
    { name: 'EMURGO' },
    { name: 'Agna' },
    { name: 'Verticurl' },
    { name: 'Ugam' },
    { name: 'PSG IMSR' },
    { name: 'DST CoE' }
  ];

  useEffect(() => {
    if (isVisible) {
      let count = 0;
      const interval = setInterval(() => {
        count += 1;
        setActiveCount(count);
        if (count >= logos.length) {
          clearInterval(interval);
        }
      }, 60); // un-gray staggered 60ms
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  return (
    <section
      ref={ref}
      className="py-32 px-6 md:px-12 lg:px-24 bg-[var(--psg-cream)] flex flex-col items-center select-none"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Centered Heading */}
        <div className="text-center mb-16 flex flex-row items-baseline justify-center gap-2">
          <span
            className="text-3xl sm:text-4xl md:text-[44px] font-normal text-[var(--psg-steel)] tracking-tight leading-none"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Our
          </span>
          <span
            className="text-3xl sm:text-4xl md:text-[44px] font-bold text-[var(--psg-maroon)] tracking-tight leading-none"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Partners.
          </span>
        </div>

        {/* Static 3x3 Grid */}
        <div className="grid grid-cols-3 gap-5 items-center justify-center max-w-[480px]">
          {logos.map((logo, idx) => {
            const hasStaggered = activeCount > idx;

            return (
              <div
                key={idx}
                className="w-[140px] h-[60px] bg-white border border-[var(--psg-maroon)]/[0.08] rounded-lg flex items-center justify-center transition-all duration-[320ms]"
                style={{
                  filter: hasStaggered
                     ? 'grayscale(100%) opacity(0.35) blur(0px)'
                     : 'grayscale(100%) opacity(0.15) blur(1px)',
                  transitionTimingFunction: 'var(--ease-out-soft)'
                }}
                // Custom hover class inside style or css
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = 'grayscale(0%) opacity(1)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.borderColor = 'var(--psg-gold)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = 'grayscale(100%) opacity(0.35) blur(0px)';
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.borderColor = 'rgba(123, 28, 46, 0.08)';
                }}
                data-placeholder="logo"
              >
                <div className="text-center font-bold text-xs text-[var(--psg-steel)] tracking-widest uppercase px-2 truncate leading-none">
                  {logo.name}
                </div>
              </div>
            );
          })}
        </div>

        {/* Centered description paragraph */}
        <div className="mt-16 text-center max-w-xl">
          <p
            className="text-[var(--psg-steel)] text-sm leading-relaxed font-normal"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            120+ partners across healthcare, cloud, blockchain, infrastructure, and product development.
          </p>
        </div>
      </div>
    </section>
  );
}
export default PartnerLogoWall;
