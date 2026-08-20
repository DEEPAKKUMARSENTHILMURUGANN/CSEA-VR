import React from 'react';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';
import { Calendar, MapPin, User } from 'lucide-react';
import styles from '../../../components-css/industry.module.css';

export function MOUTimeline() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });

  // Chronological by MOU signing date. Update `year` to a Date-parseable string if you
  // later want to sort programmatically instead of by array order.
  const milestones = [
    {
      year: '2007',
      date: 'August 8, 2007',
      partner: 'Cordys',
      title: 'Service Oriented Architecture (SOA) Laboratory',
      desc: 'MOU to set up an SOA laboratory at PSG, followed by its inauguration on Aug 18, 2007.',
      location: 'E Block, 1st Floor',
      faculty: 'Dr. G.R. Karpagam',
      tagBg: 'var(--psg-maroon)'
    },
    {
      year: '2008',
      date: 'Mar 2008 / Dec 2008 / Sep 2009',
      partner: 'Yahoo',
      title: 'PSG–Yahoo Laboratory',
      desc: 'Laboratory partnership spanning several signing dates, established Nov 2008 and extended Apr 2010.',
      location: 'E Block, 4th Floor',
      faculty: 'Dr. G. Sudhasadasivam',
      tagBg: 'var(--psg-maroon)'
    },
    {
      year: '2009',
      date: 'July 23, 2009',
      partner: 'Cordys',
      title: 'Cloud Computing Laboratory',
      desc: 'MOU to set up a Cloud Computing laboratory at PSG, inaugurated Feb 17, 2010.',
      location: 'E Block, 1st Floor',
      faculty: 'Dr. G.R. Karpagam',
      tagBg: 'var(--psg-maroon)'
    },
    {
      year: '2012',
      date: 'June 29, 2012',
      partner: 'Nokia',
      title: 'PSG–Nokia Big Data Analytics Laboratory',
      desc: 'MOU signing and inauguration of the Big Data Analytics Lab, documented alongside the Yahoo laboratory.',
      location: 'E Block, 4th Floor',
      faculty: 'Dr. G. Sudhasadasivam',
      tagBg: 'var(--psg-gold)'
    },
    {
      year: '2014',
      date: 'June 1, 2014',
      partner: 'Cognizant',
      title: 'Open Source Software Laboratory',
      desc: 'MOU for the inauguration of the Open Source Software Laboratory, established Dec 22, 2006.',
      location: 'E Block, 1st Floor',
      faculty: 'Dr. G.R. Karpagam',
      tagBg: 'var(--psg-gold)'
    },
    {
      year: '2017',
      date: 'August 24, 2017',
      partner: 'Advantech Data Link Solutions',
      title: 'PSG AIR Lab',
      desc: 'MOU signing for the PSG AIR Lab, photographed alongside the Giles Brooker Group signing.',
      location: 'F Block, 4th Floor · 3-year term',
      faculty: 'Dr. N. Arulanand & Dr. S. Lovelyn Rose',
      tagBg: 'var(--psg-maroon)'
    },
    {
      year: '2018',
      date: 'April 28, 2018',
      partner: 'Impiger Technologies',
      title: 'Center for Artificial Intelligence Research (AIR)',
      desc: 'MOU for a Center for AI Research, with Impiger providing Azure credits, internships, and an NVIDIA Tesla V100 server.',
      location: 'PSG College of Technology',
      faculty: 'Dr. G.R. Karpagam & Dr. B. Vinoth Kumar',
      tagBg: 'var(--psg-maroon)'
    },
    {
      year: '2018',
      date: 'August 21, 2018',
      partner: 'Giles Brooker Group',
      title: 'Data Analytics Specialization Curriculum',
      desc: 'MOU to design a Data Analytics Specialization curriculum, delivered at IDS College, Jakarta.',
      location: 'F Block · 3-year term',
      faculty: 'Dr. G.R. Karpagam',
      tagBg: 'var(--psg-maroon)'
    },
    {
      year: '2018',
      date: 'August 21, 2018',
      partner: 'Red Hat Academy (Plexus Networks)',
      title: 'PSG–Red Hat Academy powered by Plexus Networks',
      desc: 'MOU for Red Hat Academy classes on open-source technology, delivered by Plexus Networks.',
      location: 'PSG College of Technology · 3-year term',
      faculty: 'Dr. N. Gopika Rani',
      tagBg: 'var(--psg-maroon)'
    },
    {
      year: '2019',
      date: 'March 29, 2019',
      partner: 'Hewlett Packard Enterprise (HPE)',
      title: 'Center for Teaching and Experiencing Security and Infrastructure',
      desc: 'MOU to set up a center for teaching and experiencing security and infrastructure.',
      location: 'PSG College of Technology · 2-year term',
      faculty: 'Dr. N. Gopika Rani',
      tagBg: 'var(--psg-maroon)'
    }
  ];

  return (
    <section
      ref={ref}
      className="bg-transparent"
      style={{ paddingTop: '8rem', paddingBottom: '8rem', paddingLeft: '5%', paddingRight: '5%' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header Block */}
        <div className="mb-20 text-center">
          <div className="mb-4">
            <span className={`${styles.eyebrow}`}>
              <span>A DECADE OF PARTNERSHIPS · 2007–2019</span>
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-[44px] font-black uppercase text-slate-900 leading-tight tracking-tight select-text"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Every MOU. <br />
            <span className="text-blue-600 italic font-bold">A Step Forward.</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center rail — desktop only */}
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-200"
            style={{ transform: 'translateX(-50%)' }}
          />
          {/* Left rail — mobile */}
          <div className="md:hidden absolute left-[15px] top-0 bottom-0 w-px bg-slate-200" />

          <div className="flex flex-col gap-12 md:gap-4">
            {milestones.map((m, idx) => {
              const isLeft = idx % 2 === 0;
              const staggerDelay = idx * 100;

              return (
                <div
                  key={idx}
                  className="relative flex flex-col md:flex-row items-start md:items-center"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
                    transitionProperty: 'opacity, transform',
                    transitionDuration: '600ms',
                    transitionDelay: `${staggerDelay}ms`,
                    transitionTimingFunction: 'var(--ease-out-expo)'
                  }}
                >
                  {/* Mobile marker */}
                  <div className="md:hidden absolute left-[15px] top-1.5 -translate-x-1/2 z-20">
                    <div className="w-3 h-3 rounded-full bg-blue-600 border-2 border-white shadow" />
                  </div>

                  {/* Left slot */}
                  <div className={`w-full md:w-1/2 pl-10 md:pl-0 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pr-12 md:opacity-0 md:pointer-events-none'}`}>
                    {isLeft && (
                      <MilestoneCard m={m} align="right" />
                    )}
                  </div>

                  {/* Center marker — desktop */}
                  <div className="hidden md:flex flex-col items-center absolute left-1/2 -translate-x-1/2 z-20">
                    <div className="w-4 h-4 rounded-full bg-blue-600 border-4 border-white shadow group-hover:bg-blue-400 transition-colors duration-300" />
                  </div>

                  {/* Right slot */}
                  <div className={`w-full md:w-1/2 pl-10 md:pl-12 ${!isLeft ? '' : 'md:opacity-0 md:pointer-events-none'}`}>
                    {!isLeft && (
                      <MilestoneCard m={m} align="left" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function MilestoneCard({ m, align }) {
  const isRight = align === 'right';

  return (
    <div
      className="group relative inline-block w-full max-w-md bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden transition-all duration-500 transform hover:scale-[1.02] hover:border-blue-300 hover:shadow-xl"
      style={{ transitionTimingFunction: 'var(--ease-out-soft)' }}
    >
      <div className="p-5" style={{ textAlign: isRight ? 'right' : 'left' }}>
        {/* Year + tag row */}
        <div className={`flex items-center gap-2 mb-2 ${isRight ? 'justify-end' : 'justify-start'}`}>
          <span
            className="text-blue-600 font-mono text-xs font-bold tracking-widest uppercase"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {m.year}
          </span>
          <span
            className="inline-block px-2 py-0.5 rounded text-[9px] font-black tracking-widest uppercase"
            style={{ backgroundColor: m.tagBg, color: m.tagBg === 'var(--psg-gold)' ? 'var(--psg-charcoal)' : '#FFFFFF' }}
          >
            {m.partner}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-slate-900 font-bold tracking-tight text-lg leading-snug mb-2 group-hover:text-blue-600 transition-colors duration-300"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {m.title}
        </h3>

        {/* Description */}
        <p className={`${styles.fontSans} text-slate-600 text-[13px] leading-relaxed mb-4`}>
          {m.desc}
        </p>

        {/* Meta rows */}
        <div className={`flex flex-col gap-2 pt-3 border-t border-slate-100 ${isRight ? 'items-end' : 'items-start'}`}>
          <div className={`flex items-center gap-2 text-[11px] text-slate-500 font-medium ${isRight ? 'flex-row-reverse' : ''}`}>
            <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>{m.date}</span>
          </div>
          <div className={`flex items-center gap-2 text-[11px] text-slate-500 font-medium ${isRight ? 'flex-row-reverse' : ''}`}>
            <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>{m.location}</span>
          </div>
          <div className={`flex items-center gap-2 text-[11px] text-slate-500 font-medium ${isRight ? 'flex-row-reverse' : ''}`}>
            <User className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>{m.faculty}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MOUTimeline;