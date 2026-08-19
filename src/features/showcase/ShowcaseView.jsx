import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import ShowcaseCarousel from "./components/ShowcaseCarousel";
import "../../../style.css";

const showcaseItems = [
  {
    id: 1,
    img: "img/3.png",
    category: "Overview",
    title: "DEPARTMENT HIGHLIGHTS",
    description: "Explore the unique strengths, achievements, and core values of our Computer Science department. We build the future through excellence.",
    targetRoute: "/zone1",
    isStraightFloat: true
  },
  {
    id: 2,
    img: "img/2.png",
    category: "Projects",
    title: "INNOVATION GALLERY",
    description: "Witness the groundbreaking projects, hackathon winners, and creative solutions developed by our brilliant students.",
    targetRoute: "/gallery",
    isStraightFloat: true
  },
  {
    id: 3,
    img: "img/1.png",
    category: "Labs",
    title: "AI & EMERGING TECH",
    description: "Dive into the future with our advanced artificial intelligence, machine learning, and IoT research labs equipped with state-of-the-art tech.",
    targetRoute: "/zone3",
    isStraightFloat: true
  },
  {
    id: 4,
    img: "img/4.png",
    category: "Discovery",
    title: "RESEARCH & INNOVATION",
    description: "Discover how our dedicated research centers and faculty are driving next-generation technological advancements and publications.",
    targetRoute: "/zone4",
    isStraightFloat: true
  },
  {
    id: 5,
    img: "img/5.png",
    category: "Partnerships",
    title: "INDUSTRY COLLABORATION",
    description: "Bridging the gap between academia and top global tech corporations through internships, mentorships, and joint projects.",
    targetRoute: "/zone5",
    isStraightFloat: true
  }
];

export default function ShowcaseView() {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [calculation, setCalculation] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: "bot", text: "👋 Hey there! Welcome to the CSEA AR/VR Club. How can I help you today?", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    { sender: "bot", text: "You can ask me about our VR zones, upcoming events, projects, or anything AR/VR related!", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [chatInput, setChatInput] = useState("");
  const autoPlayRef = useRef(null);
  const chatBodyRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const startAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      handleNext();
    }, 5000);
  };

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [active]);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatMessages, isChatOpen]);

  const handleNext = () => {
    setCalculation(1);
    setActive((prev) => (prev + 1 >= showcaseItems.length ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCalculation(-1);
    setActive((prev) => (prev - 1 < 0 ? showcaseItems.length - 1 : prev - 1));
  };

  const handleIndicatorClick = (index) => {
    setCalculation(index > active ? 1 : -1);
    setActive(index);
  };

  const handleSendMessage = (textToSend) => {
    const msg = (textToSend || chatInput).trim();
    if (!msg) return;

    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChatMessages((prev) => [...prev, { sender: "user", text: msg, time: userTime }]);
    if (!textToSend) setChatInput("");
    setShowQuickReplies(false);

    fetch('http://localhost:3001/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: msg })
    })
      .then((r) => r.json())
      .then((data) => {
        const botTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setChatMessages((prev) => [...prev, { sender: "bot", text: data.reply || "Sorry, I couldn't process that.", time: botTime }]);
      })
      .catch(() => {
        const botTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setChatMessages((prev) => [...prev, { sender: "bot", text: "Oops! Couldn't reach the server. Make sure the backend is running on port 3001.", time: botTime }]);
      });
  };

  return (
    <div className={`showcase-page-container ${isLoaded ? "loaded" : ""}`} style={{ minHeight: "100vh", color: "#fff", position: "relative", overflowX: "hidden" }}>
      {/* Page Load Transition Overlay */}
      <div className="transition-overlay" style={{
        position: "fixed",
        inset: 0,
        background: "#000",
        zIndex: 9999,
        pointerEvents: "none",
        opacity: isLoaded ? 0 : 1,
        transition: "opacity 1.5s cubic-bezier(0.4, 0, 0.2, 1)"
      }}></div>

      {/* Inline styles ported from showcase.html */}
      <style>{`
        .carousel.no-transition .list .item,
        .carousel.no-transition .list .item .category,
        .carousel.no-transition .list .item h2,
        .carousel.no-transition .list .item .description,
        .carousel.no-transition .list .item .more,
        .carousel.no-transition .list .item figure img {
            transition: none !important;
            animation: none !important;
        }
        .carousel.no-transition .list .item.active {
            opacity: 1 !important;
            transform: translateX(0) !important;
        }
        .carousel.no-transition .list .item.active .category,
        .carousel.no-transition .list .item.active h2,
        .carousel.no-transition .list .item.active .description,
        .carousel.no-transition .list .item.active .more {
            opacity: 1 !important;
            transform: translateX(0) !important;
        }
        .carousel.no-transition .list .item:not(.active) {
            opacity: 0 !important;
            transform: translateX(0) !important;
        }
        .carousel .list .item figure {
            width: clamp(320px, 44vw, 530px) !important;
            top: 50% !important;
            left: 0 !important;
            transform: translateY(-50%) !important;
        }
        .carousel .list .item figure img,
        .item.straight-float.active figure img,
        .item.straight-float figure img {
            transform: rotate(0deg) !important;
            width: 100% !important;
            height: auto !important;
            object-fit: contain !important;
        }
        @keyframes dept-float {
            0%, 100% { transform: translateY(-50%) translateY(0px); }
            50%       { transform: translateY(-50%) translateY(-18px); }
        }
        .item.straight-float.active figure {
            animation: dept-float 3.2s ease-in-out infinite !important;
            animation-delay: 0.9s;
        }
        .item:not(.active).straight-float figure {
            animation: none !important;
        }

        .carousel .list .item .content h2 {
            color: #ffffff !important;
            text-shadow: 0 4px 30px rgba(255, 255, 255, 0.25), 0 2px 10px rgba(0, 0, 0, 0.6) !important;
        }

        /* Floating Chatbot Styles */
        .sc-chat-btn {
            position: fixed;
            bottom: 24px;
            right: 24px;
            z-index: 9999;
            width: 56px;
            height: 56px;
            border-radius: 50%;
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            color: #fff;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 8px 32px rgba(59,130,246,0.5);
            transition: transform 0.2s, box-shadow 0.2s;
            font-size: 1.3rem;
        }
        .sc-chat-btn:hover {
            transform: scale(1.08);
            box-shadow: 0 12px 40px rgba(59,130,246,0.6);
        }
        .sc-chat-btn:active {
            transform: scale(0.92);
        }
        .sc-chat-window {
            position: fixed;
            bottom: 92px;
            right: 24px;
            z-index: 9999;
            width: 420px;
            max-width: calc(100vw - 48px);
            height: 600px;
            max-height: calc(100vh - 140px);
            background: rgba(2, 6, 23, 0.75);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            display: flex;
            flex-direction: column;
            box-shadow: 0 20px 60px rgba(0,0,0,0.6);
            opacity: 0;
            pointer-events: none;
            transform: translateY(20px) scale(0.93);
            transition: opacity 0.25s ease, transform 0.25s ease;
            overflow: hidden;
        }
        .sc-chat-window.active {
            opacity: 1;
            pointer-events: auto;
            transform: translateY(0) scale(1);
        }
        .sc-chat-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px 20px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            flex-shrink: 0;
        }
        .sc-chat-header-left {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .sc-chat-avatar {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: rgba(59,130,246,0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.1rem;
        }
        .sc-chat-header h3 {
            margin: 0;
            font-size: 0.95rem;
            font-weight: 600;
            color: #fff;
        }
        .sc-chat-status {
            font-size: 0.7rem;
            font-weight: 500;
            color: rgba(59,130,246,0.8);
        }
        .sc-chat-close {
            background: rgba(255,255,255,0.05);
            border: none;
            color: rgba(255,255,255,0.6);
            width: 32px;
            height: 32px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1rem;
            transition: background 0.2s;
        }
        .sc-chat-close:hover {
            background: rgba(255,255,255,0.15);
            color: #fff;
        }
        .sc-chat-body {
            flex: 1;
            padding: 16px;
            overflow-y: auto;
            background: rgba(0,0,0,0.15);
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        .sc-msg {
            max-width: 80%;
            padding: 10px 16px;
            border-radius: 16px;
            font-size: 0.88rem;
            line-height: 1.45;
            animation: scPopIn 0.25s ease;
        }
        @keyframes scPopIn {
            0% { opacity: 0; transform: scale(0.9) translateY(8px); }
            100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .sc-msg-bot {
            align-self: flex-start;
            background: rgba(255,255,255,0.1);
            border: 1px solid rgba(255,255,255,0.05);
            color: #fff;
            border-bottom-left-radius: 4px;
        }
        .sc-msg-user {
            align-self: flex-end;
            background: #3b82f6;
            color: #fff;
            border-bottom-right-radius: 4px;
        }
        .sc-msg-time {
            display: block;
            margin-top: 4px;
            font-size: 0.6rem;
            opacity: 0.5;
            letter-spacing: 0.3px;
        }
        .sc-quick-replies {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 8px;
        }
        .sc-quick-reply {
            padding: 6px 14px;
            font-size: 0.75rem;
            font-weight: 500;
            background: rgba(255,255,255,0.08);
            border: 1px solid rgba(255,255,255,0.12);
            color: rgba(255,255,255,0.8);
            border-radius: 50px;
            cursor: pointer;
            transition: background 0.2s, border-color 0.2s, color 0.2s;
        }
        .sc-quick-reply:hover {
            background: rgba(59,130,246,0.2);
            border-color: rgba(59,130,246,0.4);
            color: #fff;
        }
        .sc-chat-footer {
            padding: 12px 16px;
            border-top: 1px solid rgba(255,255,255,0.1);
            display: flex;
            gap: 10px;
            flex-shrink: 0;
            background: transparent;
        }
        .sc-chat-input {
            flex: 1;
            background: rgba(255,255,255,0.06);
            border: 1px solid rgba(255,255,255,0.15);
            border-radius: 12px;
            padding: 10px 16px;
            color: #fff;
            font-size: 0.88rem;
            outline: none;
            transition: border-color 0.2s;
        }
        .sc-chat-input:focus {
            border-color: #3b82f6;
        }
        .sc-chat-send {
            background: #3b82f6;
            border: none;
            color: #fff;
            width: 40px;
            height: 40px;
            border-radius: 12px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.2s;
            flex-shrink: 0;
        }
        .sc-chat-send:hover {
            background: #2563eb;
        }
      `}</style>

      {/* Header */}
      <header>
        <figure className="logo" style={{ display: "flex", alignItems: "center", gap: "10px", margin: 0 }}>
          <img src="img/psg_logo.png" alt="PSG Logo" style={{ height: "50px", width: "auto", objectFit: "contain" }} />
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", fontFamily: "'Poppins', sans-serif" }}>
            <span style={{ color: "#ffffff", fontWeight: 800, fontSize: "1.2rem", lineHeight: 1.1, letterSpacing: "0.5px" }}>PSG</span>
            <span style={{ color: "rgba(255, 255, 255, 0.75)", fontWeight: 600, fontSize: "0.85rem", lineHeight: 1.1 }}>College of Technology</span>
          </div>
        </figure>
        <nav>
          <ul style={{ color: "#fff", fontWeight: "bold", letterSpacing: "2px", listStyle: "none", margin: 0, padding: 0 }}>
            <li>PSG TECH SHOWCASE</li>
          </ul>
        </nav>
      </header>

      {/* Carousel Component */}
      <ShowcaseCarousel
        items={showcaseItems}
        active={active}
        calculation={calculation}
        onNext={handleNext}
        onPrev={handlePrev}
        onIndicatorClick={handleIndicatorClick}
        onExplore={(route) => navigate(route)}
      />

      {/* Back to Home Button */}
      <Link to="/" className="btn-back-home" id="btn-back-home">
        <span className="icon-circle"><i className="fa-solid fa-arrow-left"></i></span>
        Back to Home Page
      </Link>

      {/* Chatbot Button */}
      <button className="sc-chat-btn" id="sc-chat-btn" aria-label="Open chat" onClick={() => setIsChatOpen(!isChatOpen)}>
        {isChatOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        )}
      </button>

      {/* Chatbot Window */}
      <div className={`sc-chat-window ${isChatOpen ? "active" : ""}`} id="sc-chat-window">
        <div className="sc-chat-header">
          <div className="sc-chat-header-left">
            <div className="sc-chat-avatar">🤖</div>
            <div>
              <h3>CSEA Bot</h3>
              <span className="sc-chat-status">Online</span>
            </div>
          </div>
          <button className="sc-chat-close" aria-label="Close chat" onClick={() => setIsChatOpen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div className="sc-chat-body" ref={chatBodyRef}>
          {chatMessages.map((msg, index) => (
            <div key={index} className={`sc-msg sc-msg-${msg.sender}`}>
              {msg.text}
              <span className="sc-msg-time">{msg.time}</span>
            </div>
          ))}
          {showQuickReplies && (
            <div className="sc-quick-replies">
              <button className="sc-quick-reply" onClick={() => handleSendMessage("Tell me about the VR zones")}>Tell me about the VR zones</button>
              <button className="sc-quick-reply" onClick={() => handleSendMessage("Upcoming events")}>Upcoming events</button>
              <button className="sc-quick-reply" onClick={() => handleSendMessage("Club projects")}>Club projects</button>
              <button className="sc-quick-reply" onClick={() => handleSendMessage("How to join?")}>How to join?</button>
            </div>
          )}
        </div>
        <div className="sc-chat-footer">
          <input
            type="text"
            className="sc-chat-input"
            placeholder="Type a message..."
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleSendMessage(); }}
          />
          <button className="sc-chat-send" aria-label="Send message" onClick={() => handleSendMessage()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
