import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { Clock } from "lucide-react";

import Zone1 from "./components/zones/Zone1/Zone1";
import Zone2_StudentInnovationGallery from "./components/zones/Zone2_StudentInnovationGallery/Zone2";
import Zone3 from "./components/zones/Zone3/Zone3";
import TechnologyPage from "./components/zones/Zone3/Technologypage";
import LabPage from "./components/zones/Zone3/LabPage";
import Zone4 from "./components/zones/Zone4/Zone4";
import Zone5 from "./components/zones/Zone5/Zone5";

import "./App.css";

const NAV_LINKS = [
  { label: "Zone 1", to: "/zone1", match: "/zone1" },
  { label: "Zone 2", to: "/",      match: "/" },
  { label: "Zone 3", to: "/zone3", match: "/zone3" },
  { label: "Zone 4", to: "/zone4", match: "/zone4" },
  { label: "Zone 5", to: "/zone5", match: "/zone5" },
];

function NavBar() {
  const { pathname } = useLocation();
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const isActive = (match) => {
    if (match === "/") return pathname === "/";
    return pathname.startsWith(match);
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 2rem",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        background: "rgba(3,7,18,0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      {/* Brand */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            background: "linear-gradient(135deg, #5ef1df, #3b82f6, #a855f7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "10px",
            fontWeight: 900,
            color: "#000",
            letterSpacing: "-0.5px",
            flexShrink: 0,
          }}
        >
          PSG
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <span
            style={{
              fontSize: "12px",
              fontWeight: 800,
              color: "#f3f4f6",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              lineHeight: 1,
            }}
          >
            PSG College of Technology
          </span>
          <span
            style={{
              fontSize: "9px",
              fontWeight: 700,
              color: "#5ef1df",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontFamily: "monospace",
              lineHeight: 1,
            }}
          >
            Dept. of Computer Science &amp; Engineering
          </span>
        </div>
      </div>

      {/* Nav links */}
      <nav style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        {NAV_LINKS.map(({ label, to, match }) => {
          const active = isActive(match);
          return (
            <Link
              key={to}
              to={to}
              style={{
                position: "relative",
                padding: "6px 14px",
                borderRadius: "8px",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "color 0.2s, background 0.2s",
                color: active ? "#5ef1df" : "#6b7280",
                background: active ? "rgba(94,241,223,0.08)" : "transparent",
                border: active ? "1px solid rgba(94,241,223,0.18)" : "1px solid transparent",
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.color = "#d1d5db";
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.color = "#6b7280";
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              {label}
              {active && (
                <span
                  style={{
                    position: "absolute",
                    bottom: "-1px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "16px",
                    height: "2px",
                    borderRadius: "1px",
                    background: "#5ef1df",
                  }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Clock */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "6px 14px",
          borderRadius: "8px",
          border: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(255,255,255,0.02)",
        }}
      >
        <Clock size={13} style={{ color: "#5ef1df" }} />
        <span
          style={{
            fontSize: "11px",
            fontWeight: 700,
            color: "#e5e7eb",
            fontFamily: "monospace",
            letterSpacing: "0.05em",
          }}
        >
          {time} <span style={{ color: "#6b7280" }}>IST</span>
        </span>
      </div>
    </header>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div
        className="min-h-screen font-sans antialiased"
        style={{ background: "#030712", color: "#9ca3af" }}
      >
        <NavBar />
        <main>
          <Routes>
            <Route path="/zone1" element={<Zone1 />} />
            <Route path="/" element={<Zone2_StudentInnovationGallery />} />
            <Route path="/zone3" element={<Zone3 />} />
            <Route path="/technology/:slug" element={<TechnologyPage />} />
            <Route path="/technology/:slug/lab/:labId" element={<LabPage />} />
            <Route path="/zone4" element={<Zone4 />} />
            <Route path="/zone5" element={<Zone5 />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}