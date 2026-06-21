import React, { useState } from 'react';
import '../../../components-css/Zone2.css';

const MOCK_PROJECTS = [
  {
    name: 'Smart Campus Navigator',
    icon: '🧭',
    problemStatement: 'Students and visitors frequently get lost while trying to find specific laboratories or classrooms in large, complex campus buildings.',
    solutionOverview: 'An interactive AR-based mobile application that helps individuals navigate indoor campus environments seamlessly using smartphone cameras.',
    techStack: 'Unity, AR Foundation, C#, React Native, Node.js',
    teamMembers: 'Alice Johnson, Bob Smith, Charlie Davis',
    demoVideo: 'https://example.com/qr-placeholder.png'
  },
  {
    name: 'AI Crop Disease Predictor',
    icon: '🌱',
    problemStatement: 'Farmers suffer massive crop losses due to late detection of plant diseases before visual symptoms appear.',
    solutionOverview: 'A drone-based image capture system paired with a CNN model to predict diseases weeks in advance from subtle leaf discolorations.',
    techStack: 'Python, TensorFlow, React, AWS EC2, OpenCV',
    teamMembers: 'Ivy Kim, Jack Martinez, Ken Adams',
    demoVideo: 'https://example.com/qr-placeholder2.png'
  },
  {
    name: 'Decentralized Voting System',
    icon: '🗳️',
    problemStatement: 'Current electronic voting systems are vulnerable to tampering and lack transparent verification for voters.',
    solutionOverview: 'A blockchain-based e-voting platform ensuring anonymous, verifiable, and immutable votes for university elections.',
    techStack: 'Solidity, Ethereum, Next.js, Web3.js',
    teamMembers: 'Liam Brown, Mia Chen',
    demoVideo: 'https://example.com/qr-placeholder3.png'
  },
  {
    name: 'Eco-Sort Smart Bin',
    icon: '♻️',
    problemStatement: 'Improper waste segregation at the source leads to severe recycling inefficiencies and environmental harm.',
    solutionOverview: 'An IoT-enabled bin using real-time image recognition to automatically sort waste into recyclable, organic, and hazardous compartments.',
    techStack: 'Raspberry Pi, Google Coral, Python, React',
    teamMembers: 'Noah Evans, Olivia Garcia',
    demoVideo: 'https://example.com/qr-placeholder4.png'
  },
  {
    name: 'Sign2Text Translator',
    icon: '🧤',
    problemStatement: 'There is a significant communication barrier between sign language users and non-users in everyday interactions.',
    solutionOverview: 'A wearable glove equipped with flex sensors and accelerometers that translates hand signs into text and speech in real-time.',
    techStack: 'Arduino, Bluetooth LE, Flutter, Firebase',
    teamMembers: 'Paul Vance, Quinn Ahn',
    demoVideo: 'https://example.com/qr-placeholder5.png'
  }
];

const Zone2 = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
  const [activeTab, setActiveTab] = useState('problem');

  const tabs = [
    { id: 'problem', label: 'Problem Statement', icon: '🎯' },
    { id: 'solution', label: 'Solution Overview', icon: '💡' },
    { id: 'tech', label: 'Tech Stack', icon: '⚙️' },
    { id: 'team', label: 'Team Members', icon: '👥' },
    { id: 'demo', label: 'Demo (QR)', icon: '📱' }
  ];

  const handleProjectSelect = (index) => {
    setSelectedProjectIndex(index);
    setActiveTab('problem'); // reset tab to the first one when switching projects
  };

  const handleBack = () => {
    setSelectedProjectIndex(null);
  };

  const renderContent = () => {
    const displayProject = MOCK_PROJECTS[selectedProjectIndex];
    if (!displayProject) return null;

    switch (activeTab) {
      case 'problem':
        return <p className="feature-text">{displayProject.problemStatement}</p>;
      case 'solution':
        return <p className="feature-text">{displayProject.solutionOverview}</p>;
      case 'tech':
        return (
          <div className="tech-tags">
            {displayProject.techStack.split(',').map((tech, index) => (
              <span key={index} className="tech-tag">{tech.trim()}</span>
            ))}
          </div>
        );
      case 'team':
        return (
          <ul className="team-list">
            {displayProject.teamMembers.split(',').map((member, index) => (
              <li key={index} className="team-member">
                <span className="member-avatar">👤</span>
                {member.trim()}
              </li>
            ))}
          </ul>
        );
      case 'demo':
        return (
          <div className="demo-section">
            <p className="feature-text">Scan the QR code below to experience the live demo:</p>
            <div className="qr-card">
              <div className="qr-placeholder">
                <span className="qr-icon">🔲</span>
                <p>QR Code</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="project-details-wrapper">
      <div className="zone2-main-container">
        
        {selectedProjectIndex === null ? (
          /* View 1: Projects List */
          <div className="projects-grid-view slide-up">
            <div className="view-header">
              <h2>Student Innovation Gallery</h2>
              <p>Select a project to explore its features</p>
            </div>
            
            <div className="projects-grid">
              {MOCK_PROJECTS.map((proj, index) => (
                <div 
                  key={index} 
                  className="project-grid-card" 
                  onClick={() => handleProjectSelect(index)}
                >
                  <div className="card-icon">{proj.icon}</div>
                  <h3>{proj.name}</h3>
                  <div className="card-arrow">&rarr; Explore</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* View 2: Project Details */
          <div className="project-details-view slide-up">
            <button className="back-btn" onClick={handleBack}>
              &larr; Back to Gallery
            </button>
            
            <div className="project-details-card">
              
              {/* Header Area */}
              <div className="project-header">
                <div className="header-text">
                  <h2>{MOCK_PROJECTS[selectedProjectIndex].name}</h2>
                  <p className="subtitle">Exhibit Details</p>
                </div>
                <div className="status-badge">Live Prototype</div>
              </div>
              
              {/* Main Content Layout */}
              <div className="features-layout">
                
                {/* Sidebar Tabs */}
                <div className="features-sidebar">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      className={`feature-tab ${activeTab === tab.id ? 'active' : ''}`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <span className="tab-icon">{tab.icon}</span>
                      <span className="tab-label">{tab.label}</span>
                    </button>
                  ))}
                </div>
                
                {/* Content Area */}
                <div className="features-content">
                  <div className="content-pane slide-up" key={activeTab}>
                    <h3>{tabs.find(t => t.id === activeTab).label}</h3>
                    <div className="content-body">
                      {renderContent()}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default Zone2;
