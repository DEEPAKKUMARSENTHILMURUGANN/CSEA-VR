import React from 'react';
import { HeroBanner } from './HeroBanner';
import { ImpactNumbers } from './ImpactNumbers';
import { ProductCards } from './ProductCards';
import { CoESection } from './CoESection';
import { MOUTimeline } from './MOUTimeline';
import { StartupPipeline } from './StartupPipeline';
import { PartnerLogoWall } from './PartnerLogoWall';
import { CTABlock } from './CTABlock';
import psgLogo from './assets/psg logo.png';
import styles from '../../../components-css/industry.module.css';

export default function IndustryInnovationZone() {
  return (
    <div className={`min-h-screen bg-[#02050d] text-[#9ca3af] ${styles.fontSans} antialiased selection:bg-[var(--psg-maroon)] selection:text-white`}>
      {/* Top Institutional Header Bar */}


      {/* Main Zone layout blocks */}
      <main>
        {/* Section 1 : Hero walkthrough and headline */}
        <HeroBanner />

        {/* Section 2 : Impact count statistics */}
        <ImpactNumbers />

        {/* Diagonal transition from Impact stats (black var(--psg-deep)) down to ProductCards (light) */}
        <div className="h-[60px] bg-transparent relative overflow-hidden">
          <div
            className={`${styles.sectionDividerDiagonalLeft} absolute inset-x-0 top-0`}
            style={{ backgroundColor: 'var(--psg-deep)' }}
          />
        </div>

        {/* Section 3 : Commercialised systems product cards */}
        <ProductCards />

        {/* Section 4 : Centre of excellence on assistive devices */}
        <CoESection />

        {/* Section 5 : Memorandums of Understanding ledger timeline */}
        <MOUTimeline />

        {/* Section 6 : Incubation flow startup pipeline */}
        <StartupPipeline />

        {/* Diagonal transition from Startup dark block (var(--psg-charcoal)) down to PartnerLogoWall (light cream) */}
        <div className="h-[60px] bg-[var(--psg-cream)] relative overflow-hidden">
          <div
            className={`${styles.sectionDividerDiagonalRight} absolute inset-x-0 top-0`}
            style={{ backgroundColor: 'var(--psg-charcoal)' }}
          />
        </div>

        {/* Section 7 : Endless marquee logo wall */}
        <PartnerLogoWall />

        {/* Section 8 : CTA connective trigger pane */}
        <CTABlock />
      </main>

      {/* Institutional Footer Block */}
      <footer className={`${styles.bgCharcoal} text-white border-t-4 border-[var(--psg-maroon)] py-16`} style={{ paddingLeft: '5%', paddingRight: '5%' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
          {/* Logo Column */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-8 h-8 rounded flex items-center justify-center bg-white overflow-hidden p-0.5`}>
                <img src={psgLogo} alt="PSG Tech Logo" className="w-full h-full object-contain" />
              </div>
              <span className={`${styles.fontDisplay} text-lg font-bold tracking-tight text-white`}>
                PSG TECH CSE
              </span>
            </div>
            <p className={`${styles.fontSans} text-[rgba(255,255,255,0.45)] text-xs leading-relaxed max-w-sm`}>
              Bridging computing education and direct regional product development. Operating from Coimbatore, India since 1951.
            </p>
          </div>

          {/* Quick Info */}
          <div>
            <h4 className={`${styles.fontSans} text-xs font-bold tracking-widest text-[var(--psg-gold)] uppercase mb-4`}>
              Location Info
            </h4>
            <address className={`${styles.fontSans} text-[rgba(255,255,255,0.45)] text-xs not-italic leading-relaxed`}>
              Zone 6 & 7 — Innovation Experience Centre (IEC)<br />
              GRD Block, First Floor<br />
              PSG College of Technology, Peelamedu<br />
              Coimbatore - 641004, Tamil Nadu, India
            </address>
          </div>

          {/* Institutional Compliance Links */}
          <div>
            <h4 className={`${styles.fontSans} text-xs font-bold tracking-widest text-[var(--psg-gold)] uppercase mb-4`}>
              Showcase Registry
            </h4>
            <p className={`${styles.fontSans} text-[rgba(255,255,255,0.45)] text-xs leading-relaxed mb-4`}>
              This registry forms Section 6 & 7 of the IEC portfolio representing joint ventures with Agna Inc, Red Hat, DST, and PSG Hospitals.
            </p>
            <div className="text-[10px] uppercase font-bold tracking-wider text-[var(--psg-steel)]">
              © 2026 PSG Tech CSE. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
