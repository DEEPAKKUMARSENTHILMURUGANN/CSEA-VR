import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";

import Zone1 from "./components/zones/Zone1/Zone1";
import Zone2_StudentInnovationGallery from "./components/zones/Zone2_StudentInnovationGallery/Zone2";
import Zone3 from "./components/zones/Zone3/Zone3";
import TechnologyPage from "./components/zones/Zone3/Technologypage";
import LabPage from "./components/zones/Zone3/LabPage";
import Zone4 from "./components/zones/Zone4/Zone4";
import Zone5 from "./components/zones/Zone5/Zone5";

import "./App.css";

export default function App() {
  const [systemTime, setSystemTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setSystemTime(
        now.toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <div className="min-h-screen text-[#9ca3af] relative font-sans flex flex-col antialiased" style={{background: 'linear-gradient(135deg, #e8edf5 0%, #dfe6f0 30%, #f0f3f8 60%, #e2e8f2 100%)'}}>

        {/* Glassmorphism Header matching landing page */}
        <header style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          height: '70px',
          background: 'rgba(2, 6, 23, 0.5)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 30px',
          boxShadow: '0 4px 30px rgba(0,0,0,0.3)',
        }}>
          {/* PSG Branding */}
          <a href="index.html" style={{display:'flex', alignItems:'center', gap:'10px', textDecoration:'none'}}>
            <img src="/img/psg_logo.png" alt="PSG Logo" style={{height:'45px', width:'auto'}} />
            <div style={{display:'flex', flexDirection:'column', justifyContent:'center', fontFamily: "'Poppins', sans-serif"}}>
              <span style={{color:'#fff', fontWeight:800, fontSize:'1.1rem', lineHeight:1.1, letterSpacing:'0.5px'}}>PSG</span>
              <span style={{color:'rgba(255,255,255,0.7)', fontWeight:600, fontSize:'0.75rem', lineHeight:1.1}}>College of Technology</span>
            </div>
          </a>

          {/* Zone Navigation - Glassmorphism pill style */}
          <div style={{display:'flex', background:'rgba(255,255,255,0.08)', padding:'4px', borderRadius:'14px', border:'1px solid rgba(255,255,255,0.1)', gap:'4px'}}>
            <Link to="/zone1" style={{padding:'8px 18px', borderRadius:'10px', fontSize:'0.78rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.05em', transition:'all 0.3s', color:'rgba(255,255,255,0.6)', textDecoration:'none', display:'inline-block'}}
              onMouseOver={e=>{e.target.style.color='#fff';e.target.style.background='rgba(37,99,235,0.25)';e.target.style.boxShadow='0 0 15px rgba(37,99,235,0.4)'}}
              onMouseOut={e=>{e.target.style.color='rgba(255,255,255,0.6)';e.target.style.background='transparent';e.target.style.boxShadow='none'}}
            >Dept Highlights</Link>
            <Link to="/" style={{padding:'8px 18px', borderRadius:'10px', fontSize:'0.78rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.05em', transition:'all 0.3s', color:'rgba(255,255,255,0.6)', textDecoration:'none', display:'inline-block'}}
              onMouseOver={e=>{e.target.style.color='#fff';e.target.style.background='rgba(37,99,235,0.25)';e.target.style.boxShadow='0 0 15px rgba(37,99,235,0.4)'}}
              onMouseOut={e=>{e.target.style.color='rgba(255,255,255,0.6)';e.target.style.background='transparent';e.target.style.boxShadow='none'}}
            >Innovation Gallery</Link>
            <Link to="/zone3" style={{padding:'8px 18px', borderRadius:'10px', fontSize:'0.78rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.05em', transition:'all 0.3s', color:'rgba(255,255,255,0.6)', textDecoration:'none', display:'inline-block'}}
              onMouseOver={e=>{e.target.style.color='#fff';e.target.style.background='rgba(37,99,235,0.25)';e.target.style.boxShadow='0 0 15px rgba(37,99,235,0.4)'}}
              onMouseOut={e=>{e.target.style.color='rgba(255,255,255,0.6)';e.target.style.background='transparent';e.target.style.boxShadow='none'}}
            >AI & Emerging Tech</Link>
            <Link to="/zone4" style={{padding:'8px 18px', borderRadius:'10px', fontSize:'0.78rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.05em', transition:'all 0.3s', color:'rgba(255,255,255,0.6)', textDecoration:'none', display:'inline-block'}}
              onMouseOver={e=>{e.target.style.color='#fff';e.target.style.background='rgba(37,99,235,0.25)';e.target.style.boxShadow='0 0 15px rgba(37,99,235,0.4)'}}
              onMouseOut={e=>{e.target.style.color='rgba(255,255,255,0.6)';e.target.style.background='transparent';e.target.style.boxShadow='none'}}
            >Research & Innovation</Link>
            <Link to="/zone5" style={{padding:'8px 18px', borderRadius:'10px', fontSize:'0.78rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.05em', transition:'all 0.3s', color:'rgba(255,255,255,0.6)', textDecoration:'none', display:'inline-block'}}
              onMouseOver={e=>{e.target.style.color='#fff';e.target.style.background='rgba(37,99,235,0.25)';e.target.style.boxShadow='0 0 15px rgba(37,99,235,0.4)'}}
              onMouseOut={e=>{e.target.style.color='rgba(255,255,255,0.6)';e.target.style.background='transparent';e.target.style.boxShadow='none'}}
            >Industry Connect</Link>
          </div>

          {/* Back to Landing Page */}
          <a href="index.html" style={{
            display:'inline-flex', alignItems:'center', gap:'8px',
            background:'rgba(37,99,235,0.2)', border:'1px solid rgba(37,99,235,0.3)',
            color:'#fff', padding:'8px 20px', borderRadius:'50px',
            fontSize:'0.8rem', fontWeight:600, textDecoration:'none',
            transition:'all 0.3s'
          }}
            onMouseOver={e=>{e.target.style.background='rgba(37,99,235,0.4)';e.target.style.boxShadow='0 0 20px rgba(37,99,235,0.5)'}}
            onMouseOut={e=>{e.target.style.background='rgba(37,99,235,0.2)';e.target.style.boxShadow='none'}}
          >
            ← Back to Home
          </a>
        </header>

        <div className="flex-grow w-full">
          <Routes>
            <Route path="/zone1" element={<Zone1 />} />
            <Route path="/" element={<Zone2_StudentInnovationGallery />} />
            <Route path="/zone3" element={<Zone3 />} />
            <Route path="/technology/:slug" element={<TechnologyPage />} />
            <Route path="/technology/:slug/lab/:labId" element={<LabPage />} />
            <Route path="/zone4" element={<Zone4 />} />
            <Route path="/zone5" element={<Zone5 />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}