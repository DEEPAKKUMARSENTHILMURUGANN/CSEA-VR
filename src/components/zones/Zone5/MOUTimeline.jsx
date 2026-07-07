import React from 'react';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';
import styles from '../../../components-css/industry.module.css';

import gopikaImg from './assets/gopikarani.png';
import sathyapriyaImg from './assets/sathyapriya.png';
import sudhaImg from './assets/sudha sadasivam.png';
import jayasreeImg from './assets/jayasree.png';
import karpagamImg from './assets/karpagam.png';

const getFacultyImage = (name) => {
  if (name.includes('Gopika')) return gopikaImg;
  if (name.includes('Sathiya Priya')) return sathyapriyaImg;
  if (name.includes('Sudha')) return sudhaImg;
  if (name.includes('Jayashree')) return jayasreeImg;
  if (name.includes('Karpagam')) return karpagamImg;
  return null;
};

const mouData = [
  {
    year: '2018',
    partner: 'Red Hat Academy (Plexus Networks)',
    details: 'Open Source & Red Hat Technologies',
    faculty: 'Dr. N. Gopika Rani'
  },
  {
    year: '2019',
    partner: 'EMURGO Learning Solutions, Bengaluru',
    details: 'Blockchain Education Programme',
    faculty: 'Dr. K. Sathiya Priya'
  },
  {
    year: '2019',
    partner: 'Cloudera, Bengaluru',
    details: 'Federated Cloud Environment',
    faculty: 'Dr. G. Sudha Sadasivam'
  },
  {
    year: '2020',
    partner: 'Agna Inc.',
    details: 'GaitWatch Technology Transfer (5 Years)',
    faculty: 'Dr. L.S. Jayashree'
  },
  {
    year: '2021',
    partner: 'Verticurl, Coimbatore',
    details: 'Innovation Practices & Value Added Courses',
    faculty: 'Dr. K. Sathiya Priya'
  },
  {
    year: '2022',
    partner: 'Ugam Solutions SEZ Pvt Ltd, Coimbatore',
    details: 'Innovation Project Statements',
    faculty: 'Dr. N. Gopika Rani'
  },
  {
    year: '2023',
    partner: 'HPE, Bangalore',
    details: 'PSG-HPE Centre for Security & Infrastructure (5 Years)',
    faculty: 'Dr. G.R. Karpagam'
  }
];

export function MOUTimeline() {
  const [railRef, isRailVisible] = useIntersectionObserver({ threshold: 0.05, triggerOnce: true });

  return (
    <section className="bg-transparent" style={{ paddingTop: '8rem', paddingBottom: '8rem', paddingLeft: '5%', paddingRight: '5%' }}>
      <div className="max-w-5xl mx-auto">
        {/* Header Block with Line Eyebrow Decoration */}
        <div className="text-center mb-24">
          <div className="mb-4">
            <span className={`${styles.eyebrow}`}>
              <span>7 PARTNERSHIPS · 2018–2023</span>
            </span>
          </div>
          <h2
            className="text-4xl sm:text-5xl font-black uppercase text-slate-900 tracking-tight leading-none mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Partnerships That Built Things.
          </h2>
          <p className={`${styles.fontSans} text-slate-600 text-base max-w-xl mx-auto leading-relaxed mt-4`}>
            Our Memorandum of Understanding (MOU) ecosystem bridges academic scholarship with directly commercialised industrial products.
          </p>
        </div>

        {/* Timeline wrapper */}
        <div ref={railRef} className="relative min-h-[500px]">
          {/* Vertical Rail Line drawing top to bottom */}
          <div className={`${styles.timelineRail} ${isRailVisible ? styles.timelineRailActive : ''}`} />

          {/* Timeline entries with stagger spacer */}
          <div className="space-y-16">
            {mouData.map((item, idx) => (
              <TimelineCard key={String(idx)} item={item} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineCard({ item, index }) {
  // Card enters on scroll reach
  const [cardRef, isCardVisible] = useIntersectionObserver({ threshold: 0.2, triggerOnce: true });

  // Alternate left/right side columns on desktop sizes
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={cardRef}
      className="relative grid grid-cols-1 md:grid-cols-2 items-center w-full min-h-[160px]"
    >
      {/* Connector dot: double-ring outer 20px, inner 10px */}
      <div
        className="absolute left-4 md:left-1/2 -translate-x-1/2 top-5 md:top-1/2 -translate-y-1/2 z-20 pointer-events-none"
      >
        <div
          className={`${styles.timelineDoubleConnector}`}
          style={{
            transform: isCardVisible ? 'scale(1)' : 'scale(0)'
          }}
        >
          <div
            className={`${styles.timelineDoubleConnectorInner}`}
            style={{
              transform: isCardVisible ? 'scale(1)' : 'scale(0)'
            }}
          />
        </div>
      </div>

      {/* Styled Card block */}
      <div
        data-year={item.year}
        className={`w-full md:w-[90%] bg-white border border-slate-200 rounded-lg transition-all duration-800 shadow-sm hover:shadow-xl transform group overflow-hidden ${styles.mouCard} ${
          isLeft ? 'md:col-start-1 md:justify-self-start text-left md:mr-10 ml-10 md:ml-0' : 'md:col-start-2 md:justify-self-end text-left md:ml-10'
        } ${
          isCardVisible ? 'opacity-100 translate-x-0' : isLeft ? 'opacity-0 md:-translate-x-12 translate-x-12' : 'opacity-0 translate-x-12'
        }`}
        style={{
          borderLeft: '3px solid #2563eb',
          transitionTimingFunction: 'var(--ease-out-expo)',
          padding: '2rem',
          paddingLeft: '2.5rem'
        }}
      >
        {/* Hover-triggered signature gold border overlay change */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-blue-600 group-hover:bg-blue-400 transition-all duration-300" />

        {/* Year Label */}
        <div
          className="text-blue-600 font-black text-3xl tracking-tight leading-none mb-3"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {item.year}
        </div>

        {/* Partner Name */}
        <h4 className={`${styles.fontSans} text-slate-900 text-lg font-bold leading-tight`}>
          {item.partner}
        </h4>

        {/* Outcome / Area of agreement */}
        <p className={`${styles.fontSans} text-slate-600 text-sm mt-2 font-medium leading-relaxed`}>
          {item.details}
        </p>

        {/* Department Faculty Lead coordinator */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {(() => { const img = getFacultyImage(item.faculty); return img ? <img src={img} alt={item.faculty} className="w-6 h-6 rounded-full object-cover border border-[var(--psg-maroon)]/20 shadow-sm" /> : null; })()}
            <span className={`${styles.fontSans} text-[10px] text-slate-500 font-semibold uppercase tracking-widest`}>
              Faculty Lead: {item.faculty}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MOUTimeline;
