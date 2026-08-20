import React, { useEffect, useState } from 'react';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';
import { Calendar, Building, ArrowUpRight, X } from 'lucide-react';
import styles from '../../../components-css/industry.module.css';

export function LabEventsArchive() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });
  const [lightboxEvent, setLightboxEvent] = useState(null);

  // Close on Escape, lock page scroll while open
  useEffect(() => {
    if (!lightboxEvent) return;

    const handleKeyDown = (evt) => {
      if (evt.key === 'Escape') setLightboxEvent(null);
    };
    document.addEventListener('keydown', handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxEvent]);

  // Paste each event's CDN image URL into `imageUrl` once uploaded.
  const events = [
    {
      title: 'Open Source Software Laboratory',
      tag: 'INAUGURATION',
      tagBg: 'var(--psg-gold)',
      oneLiner: 'MOU for the inauguration of the Open Source Software Laboratory, established Dec 22, 2006 in E Block.',
      year: 'June 1, 2014',
      partner: 'Cognizant',
      impact: 'Runs under Dr. G.R. Karpagam, E Block, 1st Floor.',
      imageDesc: 'MOU photo — Cognizant, Open Source Software Lab',
      imageUrl: 'https://res.cloudinary.com/drxmhgudx/image/upload/v1787152916/Picture17_vizztb.png'
    },
    {
      title: 'Service Oriented Architecture (SOA) Laboratory',
      tag: 'MOU SIGNING',
      tagBg: 'var(--psg-maroon)',
      oneLiner: 'MOU to set up an SOA laboratory at PSG, followed by its inauguration on Aug 18, 2007.',
      year: 'August 8, 2007',
      partner: 'Cordys',
      impact: 'Located in E Block, 1st Floor, under Dr. G.R. Karpagam.',
      imageDesc: 'MOU photo — Cordys, SOA Laboratory',
      imageUrl: 'https://res.cloudinary.com/drxmhgudx/image/upload/v1787152428/Picture9_gxy55j.jpg'
    },
    {
      title: 'Cloud Computing Laboratory',
      tag: 'MOU SIGNING',
      tagBg: 'var(--psg-maroon)',
      oneLiner: 'MOU to set up a Cloud Computing laboratory at PSG, inaugurated Feb 17, 2010.',
      year: 'July 23, 2009',
      partner: 'Cordys',
      impact: 'Located in E Block, 1st Floor, under Dr. G.R. Karpagam.',
      imageDesc: 'MOU photo — Cordys, Cloud Computing Lab',
      imageUrl: 'https://res.cloudinary.com/drxmhgudx/image/upload/v1787152428/Picture10_siwxip.jpg'
    },
    {
      title: 'PSG–Yahoo Laboratory',
      tag: 'MOU SIGNING',
      tagBg: 'var(--psg-maroon)',
      oneLiner: 'Laboratory partnership spanning several signing dates, established Nov 2008 and extended Apr 2010.',
      year: 'Mar 2008 / Dec 2008 / Sep 2009',
      partner: 'Yahoo',
      impact: 'Located in E Block, 4th Floor, under Dr. G. Sudhasadasivam.',
      imageDesc: 'MOU photo — Yahoo Laboratory',
      imageUrl: 'https://res.cloudinary.com/drxmhgudx/image/upload/v1787152428/Picture11_yjrxzh.jpg'
    },
    {
      title: 'PSG–Nokia Big Data Analytics Laboratory',
      tag: 'INAUGURATION',
      tagBg: 'var(--psg-gold)',
      oneLiner: 'MOU signing and inauguration of the Big Data Analytics Lab, documented alongside the Yahoo laboratory.',
      year: 'June 29, 2012',
      partner: 'Nokia',
      impact: 'Located in E Block, 4th Floor, under Dr. G. Sudhasadasivam.',
      imageDesc: 'MOU photo — Nokia, Big Data Analytics Lab',
      imageUrl: 'https://res.cloudinary.com/drxmhgudx/image/upload/v1787152428/Picture12_zollby.jpg'
    },
    {
      title: 'PSG–Advantech Data Link Solutions MOU / PSG AIR Lab',
      tag: 'MOU SIGNING',
      tagBg: 'var(--psg-maroon)',
      oneLiner: 'MOU signing for the PSG AIR Lab, photographed alongside the Giles Brooker Group signing.',
      year: 'August 24, 2017',
      partner: 'Advantech Data Link Solutions',
      impact: '3-year term in F Block, under Dr. N. Arulanand & Dr. S. Lovelyn Rose.',
      imageDesc: 'MOU photo — Advantech Data Link Solutions',
      imageUrl: 'https://res.cloudinary.com/drxmhgudx/image/upload/v1787152428/Picture13_iwqaqr.jpg'
    },
    {
      title: 'Center for Artificial Intelligence Research (AIR)',
      tag: 'MOU SIGNING',
      tagBg: 'var(--psg-maroon)',
      oneLiner: 'MOU for a Center for AI Research, with Impiger providing Azure cloud credits, internships, and an NVIDIA Tesla V100 server.',
      year: 'April 28, 2018',
      partner: 'Impiger Technologies',
      impact: 'Coordinated by Dr. G.R. Karpagam and Dr. B. Vinoth Kumar.',
      imageDesc: 'MOU photo — Impiger Technologies, AIR Center',
      imageUrl: 'https://res.cloudinary.com/drxmhgudx/image/upload/v1787152429/Picture14_qdfe9g.jpg'
    },
    {
      title: 'Data Analytics Specialization Curriculum Partnership',
      tag: 'MOU SIGNING',
      tagBg: 'var(--psg-maroon)',
      oneLiner: 'MOU to design a Data Analytics Specialization curriculum, delivered at IDS College, Jakarta.',
      year: 'August 21, 2018',
      partner: 'Giles Brooker Group',
      impact: '3-year term facility in F Block, under Dr. G.R. Karpagam.',
      imageDesc: 'MOU photo — Giles Brooker Group',
      imageUrl: ''
    },
    {
      title: 'Center for Teaching and Experiencing Security and Infrastructure',
      tag: 'MOU SIGNING',
      tagBg: 'var(--psg-maroon)',
      oneLiner: 'MOU to set up a center for teaching and experiencing security and infrastructure.',
      year: 'March 29, 2019',
      partner: 'Hewlett Packard Enterprise (HPE)',
      impact: '2-year term under Dr. N. Gopika Rani.',
      imageDesc: 'MOU photo — HPE, Security & Infrastructure Center',
      imageUrl: 'https://res.cloudinary.com/drxmhgudx/image/upload/v1787152429/Picture15_nidyma.jpg'
    },
    {
      title: 'PSG–Red Hat Academy powered by Plexus Networks',
      tag: 'MOU SIGNING',
      tagBg: 'var(--psg-maroon)',
      oneLiner: 'MOU for Red Hat Academy classes on open-source technology, delivered by Plexus Networks.',
      year: 'August 21, 2018',
      partner: 'Red Hat Academy (Plexus Networks)',
      impact: '3-year term under Dr. N. Gopika Rani.',
      imageDesc: 'MOU photo — Red Hat Academy, Plexus Networks',
      imageUrl: 'https://res.cloudinary.com/drxmhgudx/image/upload/v1787152428/Picture16_iueylr.jpg'
    }
  ];

  return (
    <section ref={ref} className="bg-transparent" style={{ paddingTop: '8rem', paddingBottom: '8rem', paddingLeft: '5%', paddingRight: '5%' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header Block */}
        <div className="mb-20 text-center">
          <div className="mb-4">
            <span className={`${styles.eyebrow}`}>
              <span>INSTITUTIONAL ARCHIVE · INDUSTRY COLLABORATIONS</span>
            </span>
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-[44px] font-black uppercase text-slate-900 leading-tight tracking-tight select-text"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Milestones Built Together. <br />
            <span className="text-blue-600 italic font-bold">Documented Here.</span>
          </h2>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((e, idx) => {
            const staggerDelay = idx * 120;

            return (
              <div
                key={idx}
                className={`relative group flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm cursor-pointer transition-all duration-[600ms] transform hover:scale-[1.02] hover:border-blue-300 hover:shadow-xl ${styles.signatureCard}`}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
                  transitionDelay: `${staggerDelay}ms`,
                  transitionTimingFunction: 'var(--ease-out-expo)',
                  minHeight: '480px'
                }}
              >
                {/* Active side border trigger rule */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[4px] bg-blue-600 group-hover:bg-blue-400 transition-all duration-500 z-30"
                  style={{
                    height: isVisible ? '100%' : '0%',
                    transitionDelay: `${staggerDelay + 200}ms`
                  }}
                />

                {/* Zone A — Card Header */}
                <div
                  className="relative bg-slate-50 overflow-hidden flex flex-col justify-end select-none border-b border-slate-200"
                  style={{ height: '180px', padding: '1.5rem', paddingBottom: '1rem' }}
                >
                  {/* Dashed placeholder — swap for <img src={e.imageUrl} /> once you have the CDN URL */}
                  {e.imageUrl ? (
                    <img
                      src={e.imageUrl}
                      alt={e.title}
                      className="absolute inset-0 w-full h-full object-cover z-0 group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div
                      className="absolute z-0 rounded border-2 border-dashed border-slate-300 flex flex-col items-center justify-center bg-white group-hover:border-blue-300 group-hover:bg-blue-50 transition-all duration-300"
                      style={{ top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' }}
                    >
                      <span className="text-[18px] text-[var(--psg-gold)]">📷</span>
                      <span
                        className="text-[10px] uppercase font-bold text-slate-400 tracking-wider text-center px-4 mt-2"
                        data-placeholder="image"
                      >
                        {e.imageDesc}
                      </span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/85 to-white/40 pointer-events-none z-10" />

                  {/* Tag Pill top-right */}
                  <div className="absolute top-6 right-6 z-20">
                    <span
                      className="inline-block px-2.5 py-0.5 rounded text-[10px] font-black tracking-widest uppercase"
                      style={{
                        backgroundColor: e.tagBg,
                        color: e.tag === 'INAUGURATION' ? 'var(--psg-charcoal)' : '#FFFFFF'
                      }}
                    >
                      {e.tag}
                    </span>
                  </div>

                  {/* Title bottom-left */}
                  <h3
                    className="text-slate-900 font-bold tracking-tight z-20 flex items-center gap-1 group-hover:text-blue-600 transition-colors duration-300"
                    style={{ fontFamily: 'var(--font-display)', fontSize: '22px', lineHeight: '1.2' }}
                  >
                    {e.title}
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0" />
                  </h3>
                </div>

                {/* Zone B — Content */}
                <div
                  className="flex-grow flex flex-col justify-between bg-transparent z-10"
                  style={{ padding: '1.5rem', paddingTop: '1.5rem', paddingBottom: '1.5rem' }}
                >
                  <div>
                    <p className={`${styles.fontSans} text-slate-600 text-[15px] leading-relaxed mr-2`}>
                      {e.oneLiner}
                    </p>

                    {/* Date block, mirrors the faculty-avatar slot */}
                    <div className="flex items-center gap-3" style={{ marginTop: '1.5rem' }}>
                      <div className="w-9 h-9 rounded-full border border-slate-200 bg-white flex items-center justify-center text-blue-600 shrink-0 group-hover:border-blue-200 transition-colors duration-300">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest block leading-none">
                          EVENT DATE
                        </span>
                        <span className="text-sm font-bold text-slate-800 mt-1 block">
                          {e.year}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Partner block */}
                  <div
                    className="flex items-start gap-2.5 border-t border-slate-100"
                    style={{ marginTop: '1.25rem', paddingTop: '1rem' }}
                  >
                    <Building className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div className="text-left">
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest block leading-none">
                        PARTNER ORGANIZATION
                      </span>
                      <span className="text-xs font-semibold text-slate-600 mt-1 block">
                        {e.partner}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Zone C — Impact Strip */}
                <div
                  className="bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4 z-10"
                  style={{ padding: '1.25rem 1.5rem' }}
                >
                  <span className={`${styles.fontSans} text-slate-600 text-xs font-medium italic leading-relaxed max-w-[80%] text-left`}>
                    {e.impact}
                  </span>
                  <button
                    type="button"
                    disabled={!e.imageUrl}
                    onClick={() => e.imageUrl && setLightboxEvent(e)}
                    className={`flex items-center gap-1 font-bold text-xs transition-colors focus:outline-none select-none duration-250 shrink-0 ${
                      e.imageUrl
                        ? 'text-blue-600 hover:text-blue-800 cursor-pointer'
                        : 'text-slate-300 cursor-not-allowed'
                    }`}
                  >
                    <span className="uppercase tracking-widest font-bold text-[10px] hidden sm:inline">
                      {e.imageUrl ? 'View Photo' : 'No Photo'}
                    </span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox — full-size photo viewer, triggered by "View Photo" */}
      {lightboxEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.85)' }}
          onClick={() => setLightboxEvent(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-xl overflow-hidden shadow-2xl"
            onClick={(evt) => evt.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxEvent(null)}
              aria-label="Close photo viewer"
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-300 transition-colors duration-300"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={lightboxEvent.imageUrl}
              alt={lightboxEvent.title}
              className="w-full max-h-[70vh] object-contain bg-slate-50"
            />

            <div className="p-6 border-t border-slate-100 text-left">
              <span
                className="inline-block px-2.5 py-0.5 rounded text-[10px] font-black tracking-widest uppercase mb-2"
                style={{
                  backgroundColor: lightboxEvent.tagBg,
                  color: lightboxEvent.tag === 'INAUGURATION' ? 'var(--psg-charcoal)' : '#FFFFFF'
                }}
              >
                {lightboxEvent.tag}
              </span>
              <h3
                className="text-slate-900 font-bold tracking-tight text-xl mb-1"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {lightboxEvent.title}
              </h3>
              <p className={`${styles.fontSans} text-slate-600 text-sm leading-relaxed`}>
                {lightboxEvent.oneLiner}
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-1 mt-3 text-xs text-slate-500 font-semibold">
                <span>{lightboxEvent.year}</span>
                <span>{lightboxEvent.partner}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
export default LabEventsArchive;