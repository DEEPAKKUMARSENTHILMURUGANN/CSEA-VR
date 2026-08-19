import React from "react";
import { Link, useParams } from "react-router-dom";
import "../../../style.css";

const eventDatabase = {
  "001": {
    category: "Hackathon",
    title: "CODE SPRINT 2026",
    description: "Join the ultimate 24-hour hackathon hosted by the CSE department. Build innovative solutions, win exciting cash prizes, and get noticed by top tech recruiters!"
  },
  "002": {
    category: "Guest Lecture",
    title: "AI IN CYBERSECURITY",
    description: "An exclusive session by industry experts on how AI is revolutionizing threat detection and ethical hacking. Open to all students."
  },
  "003": {
    category: "Workshop",
    title: "WEB3 & BLOCKCHAIN",
    description: "A hands-on workshop covering smart contracts, Ethereum, and decentralized apps. Prerequisite: Basic JavaScript."
  },
  "004": {
    category: "Cultural",
    title: "CSE DEPARTMENT DAY",
    description: "Celebrate our department with music, dance, drama, and the much-awaited award ceremony honoring top academic performers."
  },
  "005": {
    category: "Alumni Meet",
    title: "TECH ALUMNI CONNECT",
    description: "Network with our distinguished alumni currently working at Google, Microsoft, and Amazon. Learn from their journeys and secure mentorships."
  }
};

export default function EventHighlightsView() {
  const { eventId: paramEventId } = useParams();
  const eventId = (paramEventId && eventDatabase[paramEventId]) ? paramEventId : "001";
  const ev = eventDatabase[eventId];

  return (
    <div className="event-page-container" style={{ background: "#0b0c10", minHeight: "100vh", color: "#fff", position: "relative", overflowX: "hidden" }}>
      {/* Inline styles ported from event.html */}
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
        .item.straight-float.active figure img,
        .item.straight-float figure img {
            transform: rotate(0deg) !important;
        }
        @keyframes dept-float {
            0%, 100% { transform: translateY(0px); }
            50%       { transform: translateY(-18px); }
        }
        .item.straight-float.active figure {
            animation: dept-float 3.2s ease-in-out infinite;
            animation-delay: 0.9s;
        }
        .item:not(.active).straight-float figure {
            animation: none;
        }
      `}</style>

      {/* Header */}
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 5%", height: "70px" }}>
        <figure className="logo" style={{ display: "flex", alignItems: "center", gap: "10px", margin: 0 }}>
          <img src="img/psg_logo.png" alt="PSG Logo" style={{ height: "50px", width: "auto", objectFit: "contain" }} />
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", fontFamily: "'Poppins', sans-serif" }}>
            <span style={{ color: "#2b55a1", fontWeight: 800, fontSize: "1.2rem", lineHeight: 1.1, letterSpacing: "0.5px" }}>PSG</span>
            <span style={{ color: "#2b55a1", fontWeight: 800, fontSize: "1rem", lineHeight: 1.1 }}>College of Technology</span>
          </div>
        </figure>
        <nav>
          <ul style={{ color: "#fff", fontWeight: "bold", letterSpacing: "2px", listStyle: "none", margin: 0, padding: 0 }}>
            <li>PSG TECH SHOWCASE</li>
          </ul>
        </nav>
      </header>

      {/* Event Display Carousel */}
      <section className="carousel">
        <div className="list">
          <div className="item active straight-float">
            <figure>
              <img src={`images/${eventId}.png`} alt={ev.title} />
            </figure>
            <div className="content">
              <p className="category">{ev.category}</p>
              <h2>{ev.title}</h2>
              <p className="description">{ev.description}</p>
              <div className="more">
                <button onClick={() => alert(`Registered for ${ev.title}!`)}>
                  <i className="fa-solid fa-arrow-right"></i> Register Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Home Button */}
      <Link to="/" className="btn-back-home" id="btn-back-home">
        <span className="icon-circle"><i className="fa-solid fa-arrow-left"></i></span>
        Back to Home Page
      </Link>
    </div>
  );
}
