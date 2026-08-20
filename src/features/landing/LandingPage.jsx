import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  const navigate = useNavigate();
  const [aboutActive, setAboutActive] = useState(false);
  const [isAboutTextShow, setIsAboutTextShow] = useState(false);
  const [typedPsgText, setTypedPsgText] = useState("");
  const [typedCseText, setTypedCseText] = useState("");
  const [activeNavIndex, setActiveNavIndex] = useState(0);
  const [navPillStyle, setNavPillStyle] = useState({ left: "0px", width: "60px" });
  const [logoSrc, setLogoSrc] = useState("images/psg_75_logo.png");
  const [isVideoActive, setIsVideoActive] = useState(false);
  const [isSideNavExpanded, setIsSideNavExpanded] = useState(false);
  const [isClubsOpen, setIsClubsOpen] = useState(false);

  const navRef = useRef(null);
  const buildingImgRef = useRef(null);
  const filmTrackRef = useRef(null);
  const filmConveyorRef = useRef(null);
  const videoRef = useRef(null);

  const PSG_TEXT = `Founded in 1951, PSG College of Technology is a government-aided autonomous institution affiliated with Anna University. Ranked consistently among the top engineering colleges in India, it is globally recognized for its strong industry-academia collaborations, cutting-edge research, and an illustrious alumni network.`;

  const CSE_TEXT = `The Department of Computer Science and Engineering is at the forefront of technological innovation. Equipped with state-of-the-art AI, IoT, and Cloud computing labs, the department fosters a culture of deep tech research and offers a rigorous curriculum aligned with the latest industry standards.`;

  // 1. Navbar sliding pill positioning
  const updateNavPosition = (index) => {
    if (!navRef.current) return;
    const items = navRef.current.querySelectorAll("ul li");
    if (items[index]) {
      const activeItem = items[index];
      setNavPillStyle({
        left: activeItem.offsetLeft + "px",
        width: activeItem.offsetWidth + "px"
      });
    }
  };

  useEffect(() => {
    updateNavPosition(activeNavIndex);
    const handleResize = () => updateNavPosition(activeNavIndex);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeNavIndex]);

  // 2. Mousemove 3D building perspective tilt
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (aboutActive || !buildingImgRef.current) return;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      buildingImgRef.current.style.transform = `perspective(800px) rotateY(${dx * 8}deg) rotateX(${-dy * 5}deg)`;
    };

    const handleMouseLeave = () => {
      if (!aboutActive && buildingImgRef.current) {
        buildingImgRef.current.style.transform = "";
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [aboutActive]);

  // 3. 3D Logo Swap Timer (4s)
  useEffect(() => {
    const timer = setTimeout(() => {
      const swapLogo = () => {
        setLogoSrc((prev) =>
          prev.includes("psg_75_logo")
            ? "https://res.cloudinary.com/drxmhgudx/image/upload/v1787206373/100yearsLogo_PsgSonsCharities_nv5bs7.png"
            : "https://res.cloudinary.com/drxmhgudx/image/upload/v1787206417/psg_75_logo_pm4frc.png"
        );
      };
      swapLogo();
      const interval = setInterval(swapLogo, 4000);
      return () => clearInterval(interval);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // 4. Film Conveyor Animation Loop
  useEffect(() => {
    let animId;
    const track = filmTrackRef.current;
    const conveyor = filmConveyorRef.current;
    if (!track || !conveyor) return;

    const frames = track.querySelectorAll(".film-frame");
    const SPEED = 0.6;
    let scrollX = 0;
    const GAP = 70;
    const FRAME_W = 150;
    const ITEM_SPAN = FRAME_W + GAP;
    const HALF_SET = 8;
    const LOOP_W = HALF_SET * ITEM_SPAN;

    const animate = () => {
      scrollX -= SPEED;
      if (scrollX <= -LOOP_W) scrollX += LOOP_W;
      track.style.transform = `translateY(-50%) translateX(${scrollX}px)`;

      const conveyorRect = conveyor.getBoundingClientRect();
      const centerX = conveyorRect.left + conveyorRect.width / 2;

      frames.forEach((frame) => {
        const rect = frame.getBoundingClientRect();
        const frameCenterX = rect.left + rect.width / 2;
        const dist = Math.abs(frameCenterX - centerX) / (conveyorRect.width / 2);
        const d = Math.min(1, Math.max(0, dist));
        const scale = 0.35 + d * 0.8;
        const opacity = 0.15 + d * 0.7;
        const yOff = (1 - d) * 40;
        const rotY = (frameCenterX < centerX ? 1 : -1) * (1 - d) * 12;

        frame.style.transform = `scale(${scale}) translateY(${yOff}px) perspective(600px) rotateY(${rotY}deg)`;
        frame.style.opacity = opacity;
      });

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  // 5. Typewriter Effect
  const typeText = (fullText, setFn, speed, callback) => {
    setFn("");
    let i = 0;
    const typeChar = () => {
      if (i < fullText.length) {
        setFn(fullText.substring(0, i + 1));
        i++;
        setTimeout(typeChar, speed);
      } else if (callback) {
        callback();
      }
    };
    typeChar();
  };

  const handleNavClick = (index, target, slideRoute) => {
    setActiveNavIndex(index);
    updateNavPosition(index);

    if (target === "about") {
      if (!aboutActive) {
        setAboutActive(true);
        if (buildingImgRef.current) buildingImgRef.current.style.transform = "";
        setTimeout(() => setIsAboutTextShow(true), 600);
        setTimeout(() => {
          typeText(PSG_TEXT, setTypedPsgText, 6, () => {
            typeText(CSE_TEXT, setTypedCseText, 6);
          });
        }, 900);
      }
    } else {
      if (aboutActive) {
        handleBackToHome();
      }
      if (slideRoute) {
        navigate(slideRoute);
      }
    }
  };

  const handleBackToHome = () => {
    setAboutActive(false);
    setTimeout(() => {
      setIsAboutTextShow(false);
      setTypedPsgText("");
      setTypedCseText("");
      if (buildingImgRef.current) buildingImgRef.current.style.animation = "";
    }, 600);
  };

  const handleOpenVideo = (e) => {
    e.preventDefault();
    setIsVideoActive(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  const handleCloseVideo = () => {
    setIsVideoActive(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div className={`landing-body ${aboutActive ? "about-mode" : ""}`}>
      {/* Quick Navigation Side Nav */}
      <nav className={`side-nav ${isSideNavExpanded ? "expanded" : ""}`} aria-label="Quick Navigation" id="main-side-nav">
        <button
          className="side-nav-toggle"
          id="side-nav-toggle"
          aria-label="Toggle Navigation"
          onClick={() => {
            setIsSideNavExpanded((prev) => {
              const next = !prev;
              if (!next) setIsClubsOpen(false);
              return next;
            });
          }}
        >
          <i className="fa-solid fa-bars"></i>
        </button>

        <a href="https://www.psgtech.edu/prografac.php" className="side-nav-item" id="sidenav-faculty" target="_blank" rel="noreferrer">
          <i className="fa-solid fa-chalkboard-user"></i>
          <span>Faculty</span>
        </a>

        <div className="side-nav-divider"></div>

        <div className={`side-nav-item-group ${isClubsOpen ? "open" : ""}`} id="group-clubs">
          <a
            href="#"
            className="side-nav-item"
            id="sidenav-clubs"
            onClick={(e) => {
              e.preventDefault();
              if (!isSideNavExpanded) setIsSideNavExpanded(true);
              setIsClubsOpen((prev) => !prev);
            }}
          >
            <i className="fa-solid fa-people-group"></i>
            <span>Clubs</span>
            <i className="fa-solid fa-chevron-down dropdown-arrow"></i>
          </a>
          <div className={`side-nav-submenu ${isClubsOpen ? "open" : ""}`} id="submenu-clubs">
            <a href="https://www.linkedin.com/in/cseapsgtech/overlay/contact-info/" target="_blank" rel="noreferrer" className="submenu-item">
              <img src="images/csea_trans.png" alt="" style={{ height: "18px", width: "18px", objectFit: "contain", marginRight: "8px", verticalAlign: "-4px" }} />
              CSEA
            </a>
            <a href="https://www.linkedin.com/company/github-campus-club-psgtech/about/" target="_blank" rel="noreferrer" className="submenu-item">
              <img src="images/github_trans.png" alt="" style={{ height: "18px", width: "18px", objectFit: "contain", marginRight: "8px", verticalAlign: "-4px", filter: "brightness(0) invert(1) opacity(0.9)" }} />
              GitHub Campus Club
            </a>
            <a href="https://www.linkedin.com/company/theeye-network/about/" target="_blank" rel="noreferrer" className="submenu-item">
              <img src="images/eye_trans.png" alt="" style={{ height: "18px", width: "18px", objectFit: "contain", marginRight: "8px", verticalAlign: "-4px", opacity: 0.9 }} />
              The Eye
            </a>
          </div>
        </div>

        <div className="side-nav-divider"></div>

        <Link to="/tour" className="side-nav-item" id="sidenav-chatbot">
          <i className="fa-solid fa-compass"></i>
          <span>360° VR Tour</span>
        </Link>
      </nav>

      {/* Top Navbar */}
      <header className="navbar">
        <Link to="/" className="brand" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <img src="https://res.cloudinary.com/frqyykmt/image/upload/v1787208722/psg_logo.png" alt="PSG Logo" className="brand-icon" style={{ height: "50px", width: "auto", background: "transparent", padding: 0 }} />
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", fontFamily: "'Poppins', sans-serif" }}>
            <span style={{ color: "#2b55a1", fontWeight: 800, fontSize: "1.2 rem", lineHeight: 1.1, letterSpacing: "0.5px" }}></span>
          </div>
        </Link>
        <nav ref={navRef}>
          <ul>
            <li className={activeNavIndex === 0 ? "active" : ""} onClick={() => handleNavClick(0, "about")}>
              <span>About</span>
            </li>
            <li className={activeNavIndex === 1 ? "active" : ""} onClick={() => handleNavClick(1, null, "/zone1")}>
              <span>Department Highlights</span>
            </li>
            <li className={activeNavIndex === 2 ? "active" : ""} onClick={() => handleNavClick(2, null, "/gallery")}>
              <span>Student Innovation Gallery</span>
            </li>
            <li className={activeNavIndex === 3 ? "active" : ""} onClick={() => handleNavClick(3, null, "/zone3")}>
              <span>AI & Emerging Tech</span>
            </li>
            <li className={activeNavIndex === 4 ? "active" : ""} onClick={() => handleNavClick(4, null, "/zone4")}>
              <span>Research & Innovation</span>
            </li>
            <li className={activeNavIndex === 5 ? "active" : ""} onClick={() => handleNavClick(5, null, "/zone5")}>
              <span>Industry Collaboration</span>
            </li>
          </ul>
          <div className="nav-effect">
            <div className="pill" style={{ left: navPillStyle.left, width: navPillStyle.width }}></div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg-text">PSG TECH</div>

        {/* Film Conveyor */}
        <div className="film-conveyor" id="film-conveyor" ref={filmConveyorRef}>
          <div className="film-track" id="film-track" ref={filmTrackRef}>
            <div className="film-frame"><Link to="/zone1"><img src="images/001.png" alt="" /></Link></div>
            <div className="film-frame"><Link to="/zone1"><img src="images/002.png" alt="" /></Link></div>
            <div className="film-frame"><Link to="/zone1"><img src="images/003.png" alt="" /></Link></div>
            <div className="film-frame"><Link to="/zone1"><img src="images/004.png" alt="" /></Link></div>
            <div className="film-frame"><Link to="/zone1"><img src="images/005.png" alt="" /></Link></div>
            <div className="film-frame"><Link to="/zone1"><img src="images/001.png" alt="" /></Link></div>
            <div className="film-frame"><Link to="/zone1"><img src="images/002.png" alt="" /></Link></div>
            <div className="film-frame"><Link to="/zone1"><img src="images/003.png" alt="" /></Link></div>
            <div className="film-frame"><Link to="/zone1"><img src="images/004.png" alt="" /></Link></div>
            <div className="film-frame"><Link to="/zone1"><img src="images/005.png" alt="" /></Link></div>
            <div className="film-frame"><Link to="/zone1"><img src="images/001.png" alt="" /></Link></div>
            <div className="film-frame"><Link to="/zone1"><img src="images/002.png" alt="" /></Link></div>
            <div className="film-frame"><Link to="/zone1"><img src="images/003.png" alt="" /></Link></div>
            <div className="film-frame"><Link to="/zone1"><img src="images/004.png" alt="" /></Link></div>
            <div className="film-frame"><Link to="/zone1"><img src="images/005.png" alt="" /></Link></div>
            <div className="film-frame"><Link to="/zone1"><img src="images/001.png" alt="" /></Link></div>
          </div>
        </div>

        <div className="hero-content">
          <div className="hero-center">
            {/* Years of Excellence logo – pinned top-right of hero */}
            <a href="https://platinum.psgtech.ac.in/" target="_blank" rel="noreferrer" className="top-right-logo" style={{ textDecoration: "none", color: "inherit", position: "absolute", top: "80px", right: "32px", zIndex: 3 }}>
              <div className="years-logo-glow white-glow">
                <img id="dynamic-logo-img" src={logoSrc} alt="Years of Excellence" />
              </div>
            </a>

            <div className="building-wrap" style={{ position: "relative", zIndex: 2 }}>
              <img src="images/building_3d.png" alt="PSG College of Technology 3D Model" ref={buildingImgRef} />
            </div>
            <div className="hero-cta-bar" style={{ position: "relative", zIndex: 2 }}>
              <Link to="/showcase" className="btn-explore">
                View Showcase <i className="fa-solid fa-arrow-right"></i>
              </Link> 
              <a href="#" className="btn-explore-ghost" id="btn-campus-tour" onClick={handleOpenVideo}>
                <i className="fa-solid fa-play"></i> Campus Tour
              </a>
            </div>
          </div>
        {/* About Panel */}
        <div className="about-panel" id="about-panel">
          <div className={`about-text-panel ${isAboutTextShow ? "show" : ""}`} id="about-text">
            <div className="about-section">
              <div className="about-section-label">Est. 1951</div>
              <h3>PSG College of Technology</h3>
              <div className="typed-text" id="typed-psg">{typedPsgText}</div>
            </div>
            <div className="about-section">
              <div className="about-section-label">Department</div>
              <h3>Computer Science &amp; Engineering</h3>
              <div className="typed-text" id="typed-cse">{typedCseText}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* Section 2: Quote / Tagline Section */}
      <section className="tagline-section">
        <div className="hero-tagline">
          <h2>Excellence in Education</h2>
        </div>
      </section>

      {/* Section 3: Companies Marquee Section */}
      <section className="marquee-section">

        <div className="marquee-row right">
          <div className="marquee-content">
            <div className="company-logo"><img src="images/logo_google.png" alt="Google" /><span>Google</span></div><span className="marquee-dot"></span>
            <div className="company-logo"><img src="images/logo_microsoft.png" alt="Microsoft" /><span>Microsoft</span></div><span className="marquee-dot"></span>
            <div className="company-logo"><img src="images/logo_amazon.png" alt="Amazon" /><span>Amazon</span></div><span className="marquee-dot"></span>
            <div className="company-logo"><img src="images/logo_goldmansachs.png" alt="Goldman Sachs" /><span>Goldman Sachs</span></div><span className="marquee-dot"></span>
            <div className="company-logo"><img src="images/logo_qualcomm.png" alt="Qualcomm" /><span>Qualcomm</span></div><span className="marquee-dot"></span>
            <div className="company-logo"><img src="images/logo_adobe.png" alt="Adobe" /><span>Adobe</span></div><span className="marquee-dot"></span>
          </div>
          <div className="marquee-content">
            <div className="company-logo"><img src="images/logo_google.png" alt="Google" /><span>Google</span></div><span className="marquee-dot"></span>
            <div className="company-logo"><img src="images/logo_microsoft.png" alt="Microsoft" /><span>Microsoft</span></div><span className="marquee-dot"></span>
            <div className="company-logo"><img src="images/logo_amazon.png" alt="Amazon" /><span>Amazon</span></div><span className="marquee-dot"></span>
            <div className="company-logo"><img src="images/logo_goldmansachs.png" alt="Goldman Sachs" /><span>Goldman Sachs</span></div><span className="marquee-dot"></span>
            <div className="company-logo"><img src="images/logo_qualcomm.png" alt="Qualcomm" /><span>Qualcomm</span></div><span className="marquee-dot"></span>
            <div className="company-logo"><img src="images/logo_adobe.png" alt="Adobe" /><span>Adobe</span></div><span className="marquee-dot"></span>
          </div>
          <div className="marquee-content">
            <div className="company-logo"><img src="images/logo_google.png" alt="Google" /><span>Google</span></div><span className="marquee-dot"></span>
            <div className="company-logo"><img src="images/logo_microsoft.png" alt="Microsoft" /><span>Microsoft</span></div><span className="marquee-dot"></span>
            <div className="company-logo"><img src="images/logo_amazon.png" alt="Amazon" /><span>Amazon</span></div><span className="marquee-dot"></span>
            <div className="company-logo"><img src="images/logo_goldmansachs.png" alt="Goldman Sachs" /><span>Goldman Sachs</span></div><span className="marquee-dot"></span>
            <div className="company-logo"><img src="images/logo_qualcomm.png" alt="Qualcomm" /><span>Qualcomm</span></div><span className="marquee-dot"></span>
            <div className="company-logo"><img src="images/logo_adobe.png" alt="Adobe" /><span>Adobe</span></div><span className="marquee-dot"></span>
          </div>
        </div>

        <div className="marquee-row left">
          <div className="marquee-content">
            <div className="company-logo"><img src="images/logo_paypal.png" alt="PayPal" /><span>PayPal</span></div><span className="marquee-dot"></span>
            <div className="company-logo"><img src="images/logo_phonepe.png" alt="PhonePe" /><span>PhonePe</span></div><span className="marquee-dot"></span>
            <div className="company-logo"><img src="images/logo_bosch.png" alt="Bosch" /><span>Caterpillar / Bosch</span></div><span className="marquee-dot"></span>
            <div className="company-logo"><img src="images/logo_cognizant.png" alt="Cognizant" /><span>Cognizant / HCL Tech</span></div><span className="marquee-dot"></span>
          </div>
          <div className="marquee-content">
            <div className="company-logo"><img src="images/logo_paypal.png" alt="PayPal" /><span>PayPal</span></div><span className="marquee-dot"></span>
            <div className="company-logo"><img src="images/logo_phonepe.png" alt="PhonePe" /><span>PhonePe</span></div><span className="marquee-dot"></span>
            <div className="company-logo"><img src="images/logo_bosch.png" alt="Bosch" /><span>Caterpillar / Bosch</span></div><span className="marquee-dot"></span>
            <div className="company-logo"><img src="images/logo_cognizant.png" alt="Cognizant" /><span>Cognizant / HCL Tech</span></div><span className="marquee-dot"></span>
          </div>
          <div className="marquee-content">
            <div className="company-logo"><img src="images/logo_paypal.png" alt="PayPal" /><span>PayPal</span></div><span className="marquee-dot"></span>
            <div className="company-logo"><img src="images/logo_phonepe.png" alt="PhonePe" /><span>PhonePe</span></div><span className="marquee-dot"></span>
            <div className="company-logo"><img src="images/logo_bosch.png" alt="Bosch" /><span>Caterpillar / Bosch</span></div><span className="marquee-dot"></span>
            <div className="company-logo"><img src="images/logo_cognizant.png" alt="Cognizant" /><span>Cognizant / HCL Tech</span></div><span className="marquee-dot"></span>
          </div>
        </div>
      </section>

      {/* Back Button */}
      <button className="btn-back" id="btn-back" onClick={handleBackToHome}>
        <i className="fa-solid fa-arrow-left"></i> Back to Home
      </button>

      {/* Video Modal */}
      <div className={`video-modal ${isVideoActive ? "active" : ""}`} id="video-modal" onClick={(e) => { if (e.target.id === "video-modal") handleCloseVideo(); }}>
        <button className="video-modal-close" id="video-modal-close" onClick={handleCloseVideo}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div className="video-modal-content">
          <video id="campus-tour-video" ref={videoRef} controls playsInline>
            <source src="images/bg_video.mp4.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
}
