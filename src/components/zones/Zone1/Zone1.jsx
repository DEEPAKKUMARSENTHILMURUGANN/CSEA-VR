import React, { useState, useEffect, useRef } from 'react';
import AnimatedCounter from '../../ui/AnimatedCounter';
import '../../../components-css/Zone1.css';

// ObservedSection helper to trigger scroll-reveal animation classes
const ObservedSection = ({ id, className = '', children }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.15, // Trigger when 15% of section is visible
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      className={`${className} scroll-reveal-section ${isVisible ? 'reveal-visible' : ''}`}
    >
      {children}
    </section>
  );
};

const Zone1 = ({ onNextZone }) => {
  const [activeAchievement, setActiveAchievement] = useState(null);

  const facts = [
    { value: 50, suffix: "+", label: "Years of Excellence", desc: "Established in 1973 • Continuous growth", icon: "⭐", colorClass: "yellow" },
    { value: 80, suffix: "+", label: "Faculty Strength", desc: "PhD holders • Active researchers", icon: "👨‍🏫", colorClass: "cyan" },
    { value: 2000, suffix: "+", label: "Students", desc: "UG • PG • PhD programmes", icon: "🎓", colorClass: "blue" },
    { value: 120, suffix: "+", label: "Industry Tie-ups", desc: "MoUs • Collaborations • Internships", icon: "🤝", colorClass: "green" }
  ];

  const accreditations = [
    { title: "NAAC A++ Accredited", desc: "Highest grade from the National Assessment and Accreditation Council — a mark of institutional excellence.", badge: "NAAC", icon: "🏅", colorClass: "yellow" },
    { title: "NBA Accredited Programme", desc: "National Board of Accreditation certification for B.E. Computer Science & Engineering.", badge: "NBA", icon: "📜", colorClass: "cyan" },
    { title: "Top CS Department", desc: "Consistently ranked among the leading Computer Science departments in Tamil Nadu and across India.", badge: "RANKED", icon: "📈", colorClass: "blue" },
    { title: "8 Research Laboratories", desc: "Specialized labs spanning AI, Cybersecurity, IoT, Data Science, and High-Performance Computing.", badge: "RESEARCH", icon: "🔬", colorClass: "green" }
  ];

  const researchOutcomes = [
    { value: 500, suffix: "+", label: "Publications", desc: "Peer-reviewed papers in international journals and conferences spanning AI, systems, and networking.", icon: "📚", category: "PUBLICATIONS", colorClass: "blue" },
    { value: 75, suffix: "+", label: "Patents", desc: "Granted patents across computer vision, embedded systems, and applied software innovations.", icon: "💡", category: "PATENTS", colorClass: "yellow" },
    { value: 95, suffix: "%+", label: "Placement Rate", desc: "Students placed annually at leading tech companies, startups, and research institutions worldwide.", icon: "💼", category: "PLACEMENT RATE", colorClass: "green" },
    { value: 10, prefix: "₹", suffix: "Cr+", label: "Research Funding", desc: "Sponsored grants from DST, DRDO, SERB, and industry partners for cutting-edge research projects.", icon: "💰", category: "RESEARCH FUNDING", colorClass: "yellow" }
  ];

  const journeySteps = [
    { step: "Learning", icon: "📖", desc: "Gaining fundamentals through research-informed curriculum, lab practices, and coding tracks." },
    { step: "Innovation", icon: "💡", desc: "Fostering raw concepts in hackathons, prototype centers, and open-source contributions." },
    { step: "Research", icon: "🔬", desc: "Publishing papers, filing patents, and running advanced testing in sponsored project labs." },
    { step: "Societal Impact", icon: "🌍", desc: "Deploying final production-grade systems to solve actual industrial and public challenges." }
  ];

  const achievements = [
    {
      title: "Research Excellence",
      icon: "🔬",
      short: "Leading citation metrics, papers, and sponsored research projects.",
      full: "PSG CSE faculty and research scholars lead citation metrics in AI, IoT, and Cybersecurity, securing prestigious grants and hosting collaborative symposiums worldwide."
    },
    {
      title: "Industry Collaboration",
      icon: "🤝",
      short: "Strong partnerships with top multinational tech leaders.",
      full: "Active joint laboratories with companies like Cisco, Intel, and Oracle provide students with direct training in enterprise networks, embedded systems, and database clouds."
    },
    {
      title: "Student Success",
      icon: "🏆",
      short: "National hackathon winners and global student leaders.",
      full: "Our students regularly secure first prize in Smart India Hackathons, ACM ICPC regionals, and win fully-funded research internships at international universities."
    },
    {
      title: "Innovation Ecosystem",
      icon: "🚀",
      short: "Incubating startups and developing software solutions.",
      full: "The PSG CSE Innovation Experience Centre fosters startup ventures, transforming student ideas into commercially viable software products and hardware devices."
    }
  ];

  return (
    <div className="zone1-page-wrapper">
      
      {/* 1. HERO SECTION */}
      <ObservedSection id="hero" className="section-hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot">•</span> ZONE 1 • DEPARTMENT HIGHLIGHTS
          </div>
          <h1 className="hero-title">
            Welcome to <br />
            <span className="highlight-text">PSG CSE</span>
          </h1>
          <p className="hero-description">
            Five decades of academic excellence, research distinction, and industry leadership — shaping the engineers and innovators who define tomorrow.
          </p>
          
          <div className="hero-pills-row">
            <span className="hero-pill yellow">Est. 1973</span>
            <span className="hero-pill cyan">NAAC A++</span>
            <span className="hero-pill green">NBA Accredited</span>
            <span className="hero-pill blue">Top CS Dept.</span>
          </div>

          <div className="hero-ctas">
            <a href="#stats" className="cta-btn primary explore-btn">
              Explore Zone <span className="btn-arrow">&rarr;</span>
            </a>
            <a href="#research" className="cta-btn secondary">View Research</a>
          </div>
        </div>
        
        <div className="hero-graphic">
          <div className="innovation-network-container">
            {/* SVG Network Visualizer */}
            <svg className="network-svg" viewBox="0 0 400 400">
              <circle cx="200" cy="200" r="120" className="orbit-circle" />
              <circle cx="200" cy="200" r="60" className="orbit-circle inner" />
              
              <line x1="200" y1="200" x2="100" y2="120" className="network-line" />
              <line x1="200" y1="200" x2="300" y2="120" className="network-line" />
              <line x1="200" y1="200" x2="120" y2="280" className="network-line" />
              <line x1="200" y1="200" x2="280" y2="280" className="network-line" />
              
              {/* Nodes */}
              <circle cx="200" cy="200" r="16" className="network-node center" />
              <circle cx="100" cy="120" r="10" className="network-node float-1" />
              <circle cx="300" cy="120" r="10" className="network-node float-2" />
              <circle cx="120" cy="280" r="10" className="network-node float-3" />
              <circle cx="280" cy="280" r="10" className="network-node float-4" />
              
              {/* Labels */}
              <text x="200" y="205" textAnchor="middle" className="node-text center">CSE</text>
              <text x="100" y="95" textAnchor="middle" className="node-text">AI</text>
              <text x="300" y="95" textAnchor="middle" className="node-text">IoT</text>
              <text x="120" y="310" textAnchor="middle" className="node-text">Cloud</text>
              <text x="280" y="310" textAnchor="middle" className="node-text">Security</text>
            </svg>
          </div>
        </div>

        {/* Vertical scroll cue on the right */}
        <div className="scroll-indicator-wrapper">
          <span className="scroll-cue-text">SCROLL</span>
          <div className="scroll-cue-line"></div>
        </div>
      </ObservedSection>

      {/* 2. QUICK FACTS SECTION */}
      <ObservedSection id="stats" className="section-stats">
        <div className="section-header">
          <span className="section-category-badge">BY THE NUMBERS</span>
          <h2>Five Decades, Measurable Impact</h2>
          <p className="subtitle">
            Concrete milestones reflecting sustained excellence across academics, faculty, and industry engagement.
          </p>
          <div className="header-bar"></div>
        </div>
        <div className="stats-grid">
          {facts.map((fact, idx) => (
            <div key={idx} className="stat-card" style={{ '--delay': `${idx * 0.1}s` }}>
              <div className={`card-icon-circle ${fact.colorClass}`}>
                <span className="card-emoji">{fact.icon}</span>
              </div>
              <div className="stat-number">
                <AnimatedCounter value={fact.value} suffix={fact.suffix} />
              </div>
              <div className="stat-label">{fact.label}</div>
              <p className="stat-description">{fact.desc}</p>
              <div className={`stat-accent-bar ${fact.colorClass}`}></div>
            </div>
          ))}
        </div>
      </ObservedSection>

      {/* 3. ACCREDITATION & RANKINGS */}
      <ObservedSection id="accreditation" className="section-accreditation">
        <div className="section-header">
          <span className="section-category-badge">RECOGNITION & STANDARDS</span>
          <h2>Accreditation & Rankings</h2>
          <p className="subtitle">
            Nationally recognized for academic quality, research output, and institutional governance.
          </p>
          <div className="header-bar"></div>
        </div>
        <div className="accreditation-grid">
          {accreditations.map((item, idx) => (
            <div key={idx} className="accred-card">
              <div className="accred-top-row">
                <span className="accred-emoji">{item.icon}</span>
                <span className={`accred-badge-pill ${item.colorClass}`}>{item.badge}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </ObservedSection>

      {/* 4. RESEARCH & OUTCOMES */}
      <ObservedSection id="research" className="section-research">
        <div className="section-header">
          <span className="section-category-badge">RESEARCH & OUTCOMES</span>
          <h2>Impact Through Innovation</h2>
          <p className="subtitle">
            From published research to patents and placements — outcomes that demonstrate the depth of the PSG CSE ecosystem.
          </p>
          <div className="header-bar"></div>
        </div>
        
        <div className="research-grid">
          {researchOutcomes.map((item, idx) => (
            <div key={idx} className="research-card">
              <div className="research-top-row">
                <span className="research-card-icon">{item.icon}</span>
                <span className="research-card-category">{item.category}</span>
              </div>
              <div className="research-number">
                <AnimatedCounter 
                  value={item.value} 
                  prefix={item.prefix} 
                  suffix={item.suffix} 
                />
              </div>
              <p className="research-description">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Research Infrastructure Banner */}
        <div className="research-infra-banner">
          <div className="banner-left">
            <span className="banner-badge">RESEARCH INFRASTRUCTURE</span>
            <h3>PSG CSE publishes across 40+ Scopus-indexed venues annually</h3>
          </div>
          <div className="banner-right">
            <div className="banner-stat">
              <span className="banner-stat-number">40+</span>
              <span className="banner-stat-label">Scopus venues</span>
            </div>
            <div className="banner-stat">
              <span className="banner-stat-number">15+</span>
              <span className="banner-stat-label">Active PhD guides</span>
            </div>
            <div className="banner-stat">
              <span className="banner-stat-number">8+</span>
              <span className="banner-stat-label">Research centres</span>
            </div>
          </div>
        </div>
      </ObservedSection>

      {/* 5. INNOVATION JOURNEY SECTION */}
      <ObservedSection id="journey" className="section-journey">
        <div className="section-header">
          <h2>Innovation Journey</h2>
          <p className="subtitle">The pathways connecting core science to societal empowerment</p>
          <div className="header-bar"></div>
        </div>
        
        <div className="journey-flow-container">
          <div className="journey-track-line">
            <div className="journey-laser-pulse"></div>
          </div>
          
          <div className="journey-steps">
            {journeySteps.map((step, idx) => (
              <div key={idx} className="journey-step-row">
                <div className="journey-icon-node">
                  <span className="step-emoji">{step.icon}</span>
                </div>
                
                <div className="journey-step-card">
                  <div className="step-num">0{idx + 1}</div>
                  <h3>{step.step}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ObservedSection>

      {/* 6. FEATURED ACHIEVEMENTS */}
      <ObservedSection id="achievements" className="section-achievements">
        <div className="section-header">
          <h2>Featured Achievements</h2>
          <div className="header-bar"></div>
        </div>
        <div className="achievements-list">
          {achievements.map((ach, idx) => {
            const isOpen = activeAchievement === idx;
            return (
              <div 
                key={idx} 
                className={`achievement-expandable-card ${isOpen ? 'expanded' : ''}`}
                onClick={() => setActiveAchievement(isOpen ? null : idx)}
              >
                <div className="achievement-summary-row">
                  <div className="ach-icon-circle">{ach.icon}</div>
                  <div className="ach-title-block">
                    <h3>{ach.title}</h3>
                    <p className="ach-short-desc">{ach.short}</p>
                  </div>
                  <span className="expand-indicator">{isOpen ? '−' : '+'}</span>
                </div>
                
                <div className="achievement-detail-pane">
                  <div className="detail-pane-content">
                    <p>{ach.full}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ObservedSection>

      {/* 7. NEXT ZONE SECTION */}
      <ObservedSection className="section-cta">
        <div className="cta-container">
          <div className="cta-badge">
            <span className="cta-badge-dot">•</span> CONTINUE THE JOURNEY
          </div>
          <h2 className="cta-heading">
            Discover What We <br />
            <span className="cta-heading-gradient">Build Together</span>
          </h2>
          <p className="cta-description">
            Zone 2 takes you deeper into the laboratories, student projects, and startup ventures that emerge from the PSG CSE innovation ecosystem.
          </p>
          <div className="cta-actions-row">
            <button className="cta-proceed-btn" onClick={onNextZone}>
              Proceed to Zone 2 <span className="cta-arrow">&rarr;</span>
            </button>
            <span className="cta-secondary-link" onClick={onNextZone}>
              <span className="cta-link-dot">•</span> Student Projects & Labs
            </span>
          </div>
          
          <div className="cta-pagination">
            <a href="#hero" className="pagination-dot active">01</a>
            <div className="pagination-line"></div>
            <a href="#stats" className="pagination-dot">02</a>
            <div className="pagination-line"></div>
            <a href="#accreditation" className="pagination-dot">03</a>
            <div className="pagination-line"></div>
            <a href="#research" className="pagination-dot">04</a>
            <div className="pagination-line"></div>
            <a href="#journey" className="pagination-dot">05</a>
            <div className="pagination-line"></div>
            <a href="#achievements" className="pagination-dot">06</a>
          </div>
        </div>
      </ObservedSection>
      
    </div>
  );
};

export default Zone1;