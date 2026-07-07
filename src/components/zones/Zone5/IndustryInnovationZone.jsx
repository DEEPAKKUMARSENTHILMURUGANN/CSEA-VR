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

export default function IndustryInnovationZone() {
  return (
    <div className="min-h-screen bg-slate-50/50 w-full overflow-x-hidden font-sans antialiased selection:bg-blue-200">
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-12 flex flex-col gap-24">
        <HeroBanner />
        <ImpactNumbers />
        <ProductCards />
        <CoESection />
        <MOUTimeline />
        <StartupPipeline />
        <PartnerLogoWall />
        <CTABlock />
      </main>

      {/* Modern Light Footer */}
      <footer className="bg-white border-t border-slate-200 py-16 px-6 md:px-12 mt-12 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
          {/* Logo Column */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-50 border border-slate-100 shadow-sm p-1">
                <img src={psgLogo} alt="PSG Tech Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-800">
                PSG TECH CSE
              </span>
            </div>
            <p className="text-slate-500 font-medium text-sm leading-relaxed max-w-sm">
              Bridging computing education and direct regional product development. Operating from Coimbatore, India since 1951.
            </p>
          </div>

          {/* Quick Info */}
          <div>
            <h4 className="text-xs font-black tracking-widest text-slate-400 uppercase mb-4 font-mono">
              Location Info
            </h4>
            <address className="text-slate-600 font-medium text-sm not-italic leading-relaxed">
              Zone 6 & 7 — Innovation Experience Centre (IEC)<br />
              GRD Block, First Floor<br />
              PSG College of Technology, Peelamedu<br />
              Coimbatore - 641004, Tamil Nadu, India
            </address>
          </div>

          {/* Institutional Compliance Links */}
          <div>
            <h4 className="text-xs font-black tracking-widest text-slate-400 uppercase mb-4 font-mono">
              Showcase Registry
            </h4>
            <p className="text-slate-600 font-medium text-sm leading-relaxed mb-4">
              This registry forms Section 6 & 7 of the IEC portfolio representing joint ventures with Agna Inc, Red Hat, DST, and PSG Hospitals.
            </p>
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 font-mono">
              © 2026 PSG Tech CSE. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
