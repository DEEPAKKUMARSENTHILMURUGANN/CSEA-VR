import React from 'react';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';
import { Mail, GraduationCap, Handshake } from 'lucide-react';
import styles from '../../../components-css/industry.module.css';

export function CTABlock() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2, triggerOnce: true });

  return (
    <section
      id="cta-block"
      ref={ref}
      className={`bgMaroon text-white text-center relative overflow-hidden`}
      style={{ paddingTop: '8rem', paddingBottom: '8rem', paddingLeft: '5%', paddingRight: '5%' }}
    >
      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
        {/* Animated Headline */}
        <h2
          className={`text-4xl md:text-5xl font-black uppercase tracking-tight mb-4 transition-all duration-[1200ms] transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px]'
          }`}
          style={{
            fontFamily: 'var(--font-display)',
            transitionTimingFunction: 'var(--ease-out-expo)'
          }}
        >
          Partner With Us.
        </h2>

        {/* Animated Subtitle */}
        <p
          className={`text-white/75 text-base md:text-lg max-w-2xl leading-relaxed mt-3 mb-12 transition-all duration-[1200ms] transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px]'
          }`}
          style={{
            fontFamily: 'var(--font-sans)',
            transitionTimingFunction: 'var(--ease-out-expo)'
          }}
        >
          Sponsor a lab. Co-develop a product. Hire our talent.
        </p>

        {/* Three Action Buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 md:gap-6 mb-16">
          
          {/* Button 1: Explore MOU Opportunities (Outlined White) */}
          <button
            className={`px-6 py-3.5 rounded font-bold text-xs uppercase tracking-wider flex items-center gap-2 ${styles.btnOutlinedWhite} transition-all duration-[500ms] transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[12px]'
            }`}
            style={{
              transitionDelay: isVisible ? '100ms' : '0ms',
              transitionTimingFunction: 'var(--ease-out-soft)'
            }}
          >
            <Handshake className="w-4 h-4" />
            Explore MOU Opportunities
          </button>

          {/* Button 2: View Student Talent Pool (Filled Gold, color primary/deep #080008) */}
          <button
            className={`px-6 py-3.5 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-2 bg-[var(--psg-gold)] text-[var(--psg-deep)] hover:bg-[var(--psg-gold)]/80 hover:scale-[1.02] hover:shadow-lg transition-all duration-[500ms] transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[12px]'
            }`}
            style={{
              transitionDelay: isVisible ? '200ms' : '0ms',
              transitionTimingFunction: 'var(--ease-out-soft)'
            }}
          >
            <GraduationCap className="w-5 h-5 fill-current" />
            View Student Talent Pool
          </button>

          {/* Button 3: Contact the Department */}
          <a
            href="mailto:hod.cse@psgtech.ac.in"
            className={`px-6 py-3.5 rounded border border-dashed border-white/20 text-xs font-bold uppercase tracking-wider text-white bg-white/[0.03] hover:bg-white/[0.08] hover:border-[var(--psg-gold)] transition-all duration-[500ms] transform flex items-center gap-2`}
            style={{
              transitionDelay: isVisible ? '300ms' : '0ms',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
              transitionTimingFunction: 'var(--ease-out-soft)'
            }}
            data-placeholder="link"
          >
            <Mail className="w-4 h-4" />
            Contact the Department
          </a>

        </div>

        {/* Row of Stat Chips separated by · and custom spring sizes */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 border-t border-white/10 pt-12 w-full select-none">
          {/* Chip 1 */}
          <div
            className={`text-xs font-semibold uppercase tracking-wider text-white/60 transition-all duration-[320ms] transform ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
            style={{
              transitionDelay: isVisible ? '400ms' : '0ms',
              transitionTimingFunction: 'var(--ease-spring)',
              fontFamily: 'var(--font-sans)'
            }}
          >
            50+ Years
          </div>

          <span className="text-white/35 font-bold">•</span>

          {/* Chip 2 */}
          <div
            className={`text-xs font-semibold uppercase tracking-wider text-white/60 transition-all duration-[320ms] transform ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
            style={{
              transitionDelay: isVisible ? '460ms' : '0ms',
              transitionTimingFunction: 'var(--ease-spring)',
              fontFamily: 'var(--font-sans)'
            }}
          >
            NAAC A++
          </div>

          <span className="text-white/35 font-bold">•</span>

          {/* Chip 3 */}
          <div
            className={`text-xs font-semibold uppercase tracking-wider text-white/60 transition-all duration-[320ms] transform ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
            style={{
              transitionDelay: isVisible ? '520ms' : '0ms',
              transitionTimingFunction: 'var(--ease-spring)',
              fontFamily: 'var(--font-sans)'
            }}
          >
            NBA Accredited
          </div>
        </div>
      </div>
    </section>
  );
}
export default CTABlock;
