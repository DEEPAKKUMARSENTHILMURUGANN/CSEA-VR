import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Clock } from "lucide-react";

import Zone2_StudentInnovationGallery from "./components/zones/Zone2_StudentInnovationGallery/Zone2";
import Zone3 from "./components/zones/Zone3/Zone3";
import TechnologyPage from "./components/zones/Zone3/Technologypage";
import LabPage from "./components/zones/Zone3/LabPage";

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
    <BrowserRouter>
      <div className="min-h-screen bg-[#02050d] text-[#9ca3af] relative font-sans flex flex-col antialiased">

        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-[#10b981]/5 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-[#a855f7]/5 to-transparent blur-3xl pointer-events-none" />

        <header className="h-20 border-b border-white/[0.04] bg-[#02050d]/80 backdrop-blur-xl px-8 flex items-center justify-between z-40 sticky top-0 shadow-sm">

          <div className="flex items-center gap-4">

            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5ef1df] via-[#3b82f6] to-[#a855f7] flex items-center justify-center text-black font-black text-xs tracking-tighter shadow-lg">
              PSG
            </div>

            <div className="flex flex-col">

              <h1 className="text-sm font-black text-white tracking-widest leading-none uppercase">
                PSG College of Technology
              </h1>

              <span className="text-[9px] font-mono tracking-widest text-[#5ef1df] uppercase mt-2 font-bold">
                Department of Computer Science & Engineering
              </span>

            </div>

          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-gray-400 bg-white/[0.02] border border-white/[0.04] px-4 py-2 rounded-xl shadow-lg">

            <Clock className="w-4 h-4 text-[#5ef1df] animate-pulse" />

            <span className="text-white font-bold">
              {systemTime} IST
            </span>

          </div>

        </header>

        <div className="flex-grow">

          <Routes>

            <Route
              path="/"
              element={<Zone2_StudentInnovationGallery />}
            />

            <Route
              path="/zone3"
              element={<Zone3 />}
            />

            <Route
              path="/technology/:slug"
              element={<TechnologyPage />}
            />

            <Route
              path="/technology/:slug/lab/:labId"
              element={<LabPage />}
            />

          </Routes>

        </div>

      </div>
    </BrowserRouter>
  );
}