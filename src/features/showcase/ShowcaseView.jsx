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
  <div
    className={`showcase-page-container ${isLoaded ? "loaded" : ""}`}
    style={{
      minHeight: "100vh",
      color: "#fff",
      position: "relative",
      overflowX: "hidden",
    }}
  >
    {/* Page Load Transition Overlay */}
    <div
      className="transition-overlay"
      style={{
        position: "fixed",
        inset: 0,
        background: "#000",
        zIndex: 9999,
        pointerEvents: "none",
        opacity: isLoaded ? 0 : 1,
        transition: "opacity 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    />

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
        0%, 100% {
          transform: translateY(-50%) translateY(0px);
        }
        50% {
          transform: translateY(-50%) translateY(-18px);
        }
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
        text-shadow:
          0 4px 30px rgba(255, 255, 255, 0.25),
          0 2px 10px rgba(0, 0, 0, 0.6) !important;
      }

      /* Floating Chatbot Styles */
      /* ... keep your existing chatbot styles here ... */
    `}</style>

    {/* Push content below the global fixed navbar */}
    <div className="navbar-spacer" />

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
      <span className="icon-circle">
        <i className="fa-solid fa-arrow-left"></i>
      </span>
      Back to Home Page
    </Link>

    {/* Chatbot Button */}
    <button
      className="sc-chat-btn"
      id="sc-chat-btn"
      aria-label="Open chat"
      onClick={() => setIsChatOpen(!isChatOpen)}
    >
      {isChatOpen ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      )}
    </button>

    {/* Chatbot Window */}
    <div
      className={`sc-chat-window ${isChatOpen ? "active" : ""}`}
      id="sc-chat-window"
    >
      {/* Keep your existing chatbot JSX here unchanged */}
    </div>
  </div>
);

}
