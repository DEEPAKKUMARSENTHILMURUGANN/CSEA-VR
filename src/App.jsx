import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import LandingPage from "./features/landing/LandingPage";
import ShowcaseView from "./features/showcase/ShowcaseView";
import EventHighlightsView from "./features/events/EventHighlightsView";
import Zone1 from "./components/zones/Zone1/Zone1";
import Zone2_StudentInnovationGallery from "./components/zones/Zone2_StudentInnovationGallery/Zone2";
import Zone3 from "./components/zones/Zone3/Zone3";
import TechnologyPage from "./components/zones/Zone3/Technologypage";
import LabPage from "./components/zones/Zone3/LabPage";
import Zone4 from "./components/zones/Zone4/Zone4";
import Zone5 from "./components/zones/Zone5/Zone5";
import VirtualTour from "./components/virtual-tour/VirtualTour";

import "./App.css";

function AppContent() {
  const location = useLocation();
  const hideDefaultHeader =
    location.pathname === "/" ||
    location.pathname === "/showcase" ||
    location.pathname.startsWith("/events");

  return (
    <div className="min-h-screen text-slate-800 relative font-sans flex flex-col antialiased">
      {!hideDefaultHeader && (
        <header style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          height: '70px',
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(0,0,0,0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 30px',
          boxShadow: '0 4px 30px rgba(0,0,0,0.03)',
        }}>

          <a href="#/" style={{display:'flex', alignItems:'center', gap:'10px', textDecoration:'none'}}>
            <img src="/img/psg_logo.png" alt="PSG Logo" style={{height:'45px', width:'auto'}} />
            <div style={{display:'flex', flexDirection:'column', justifyContent:'center', fontFamily: "'Poppins', sans-serif"}}>
              <span style={{color:'#0f172a', fontWeight:800, fontSize:'1.1rem', lineHeight:1.1, letterSpacing:'0.5px'}}>PSG</span>
              <span style={{color:'#64748b', fontWeight:600, fontSize:'0.75rem', lineHeight:1.1}}>College of Technology</span>
            </div>
          </a>
        </header>
      )}

      <div className="flex-grow w-full">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/showcase" element={<ShowcaseView />} />
          <Route path="/events" element={<EventHighlightsView />} />
          <Route path="/events/:eventId" element={<EventHighlightsView />} />
          <Route path="/gallery" element={<Zone2_StudentInnovationGallery />} />
          <Route path="/zone1" element={<Zone1 />} />
          <Route path="/zone3" element={<Zone3 />} />
          <Route path="/technology/:slug" element={<TechnologyPage />} />
          <Route path="/technology/:slug/lab/:labId" element={<LabPage />} />
          <Route path="/zone4" element={<Zone4 />} />
          <Route path="/zone5" element={<Zone5 />} />
          <Route path="/tour" element={<VirtualTour />} />
          <Route path="/tour/:panoramaId" element={<VirtualTour />} />
        </Routes>
      </div>
    </div>
  );
}



export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
