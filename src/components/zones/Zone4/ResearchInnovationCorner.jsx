import React, { useState, useCallback } from 'react';
import ZoneBg from '../../../components/ui/ZoneBg';
import '../../../components-css/ResearchInnovationCorner.css';

/* ============================================================
   DATA: 4 Research Categories x 3+ projects each
   ============================================================ */
const CATEGORIES = [
  {
    id: 'web',
    letter: 'W',
    number: '01',
    title: 'Web Applications',
    description:
      'Scalable, full-stack platforms built with modern frameworks — tackling real-world problems from campus to enterprise.',
    stats: { projects: '12+', labs: '4' },
    accent: 'web',
    accentColor: '#10b981',
  },
  {
    id: 'mobile',
    letter: 'M',
    number: '02',
    title: 'Mobile Apps',
    description:
      'Native and cross-platform mobile solutions leveraging AI, AR, and cloud capabilities for everyday impact.',
    stats: { projects: '10+', labs: '3' },
    accent: 'mobile',
    accentColor: '#3b82f6',
  },
  {
    id: 'health',
    letter: 'H',
    number: '03',
    title: 'Healthcare Systems',
    description:
      'AI-driven diagnostic tools, patient monitoring platforms, and accessibility-first medical innovations.',
    stats: { projects: '8+', labs: '5' },
    accent: 'health',
    accentColor: '#a855f7',
  },
  {
    id: 'smartcity',
    letter: 'S',
    number: '04',
    title: 'Smart City Solutions',
    description:
      'IoT- and AI-powered urban infrastructure projects — traffic, energy, waste, and public safety reimagined.',
    stats: { projects: '9+', labs: '3' },
    accent: 'smartcity',
    accentColor: '#f59e0b',
  },
];

const PROJECTS_DATA = {
  web: [
    {
      name: 'Campus Connect Portal',
      letter: 'CP',
      tags: ['React', 'Node.js', 'PostgreSQL'],
      shortDesc: 'Unified academic portal integrating attendance, grades, event scheduling, and club management.',
      fullDesc:
        'A comprehensive full-stack platform serving 5000+ students and faculty. Features real-time attendance tracking, grade analytics with visual trends, department-wise event scheduling, and a club management module with member rosters and budget tracking. Built with role-based access and a responsive design for mobile and desktop.',
      techStack: ['React 18', 'Node.js', 'Express', 'PostgreSQL', 'Redis', 'Docker', 'Nginx'],
      team: [
        { name: 'Arun K.', role: 'Full-Stack Lead', initials: 'AK', color: '#6366f1' },
        { name: 'Bhavna R.', role: 'Frontend Dev', initials: 'BR', color: '#06b6d4' },
        { name: 'Chris P.', role: 'Backend Dev', initials: 'CP', color: '#10b981' },
      ],
      year: '2024',
      lab: 'Web Systems Lab',
    },
    {
      name: 'E-Commerce Analytics Engine',
      letter: 'EA',
      tags: ['Python', 'React', 'ML'],
      shortDesc: 'Real-time dashboard for predicting sales trends and customer churn using ML models.',
      fullDesc:
        'An end-to-end analytics platform for small e-commerce businesses. Ingests transaction data to forecast sales, segment customers, and predict churn with 89% accuracy. Features a drag-and-drop dashboard builder, automated PDF report generation, and email alerts for anomaly detection.',
      techStack: ['Python', 'FastAPI', 'React', 'TensorFlow', 'MongoDB', 'D3.js', 'Celery'],
      team: [
        { name: 'Divya M.', role: 'ML Engineer', initials: 'DM', color: '#f59e0b' },
        { name: 'Esha T.', role: 'Data Pipeline', initials: 'ET', color: '#ef4444' },
      ],
      year: '2024',
      lab: 'Data Science Lab',
    },
    {
      name: 'Open Source Contribution Tracker',
      letter: 'OS',
      tags: ['Next.js', 'GraphQL', 'OSS'],
      shortDesc: 'Platform tracking and gamifying student open-source contributions across GitHub.',
      fullDesc:
        'A gamified platform that connects student GitHub accounts, tracks commits, PRs, and issues across repositories, and awards contribution points. Features leaderboards, achievement badges, and a mentorship matching system. Used by the CSEA to encourage open-source culture.',
      techStack: ['Next.js', 'GraphQL', 'Prisma', 'GitHub API', 'PostgreSQL', 'Tailwind'],
      team: [
        { name: 'Farhan Q.', role: 'Full-Stack Dev', initials: 'FQ', color: '#8b5cf6' },
        { name: 'Gauri N.', role: 'UI/UX Designer', initials: 'GN', color: '#ec4899' },
        { name: 'Harish S.', role: 'API Integration', initials: 'HS', color: '#6366f1' },
      ],
      year: '2025',
      lab: 'Web Systems Lab',
    },
  ],
  mobile: [
    {
      name: 'Campus AR Navigator',
      letter: 'AN',
      tags: ['AR', 'Flutter', 'Unity'],
      shortDesc: 'Augmented reality indoor navigation for campus buildings.',
      fullDesc:
        'An AR-powered navigation app that overlays directional arrows on the live camera feed to guide students through complex campus buildings. Pre-mapped with floor plans of 12+ departments, includes classroom finder, faculty office locator, and accessibility-aware routes.',
      techStack: ['Flutter', 'Unity', 'AR Foundation', 'C#', 'Firebase', 'Blender'],
      team: [
        { name: 'Ishan V.', role: 'AR Developer', initials: 'IV', color: '#06b6d4' },
        { name: 'Jaya L.', role: 'Flutter Dev', initials: 'JL', color: '#f59e0b' },
      ],
      year: '2024',
      lab: 'Mobile Innovation Lab',
    },
    {
      name: 'MediTrack Patient App',
      letter: 'MP',
      tags: ['React Native', 'FHIR', 'AI'],
      shortDesc: 'Cross-platform patient manager with medication reminders and telehealth integration.',
      fullDesc:
        'A patient-centric mobile app that integrates with hospital FHIR APIs to display medical records, send medication reminders via push notifications, and schedule telehealth consultations. Features include symptom journaling with AI suggestions, lab report PDF viewer, and family sharing.',
      techStack: ['React Native', 'FHIR', 'Node.js', 'Twilio', 'OpenAI API', 'MongoDB'],
      team: [
        { name: 'Kavya P.', role: 'Mobile Lead', initials: 'KP', color: '#10b981' },
        { name: 'Lokesh R.', role: 'Health API', initials: 'LR', color: '#6366f1' },
        { name: 'Maya S.', role: 'UI Designer', initials: 'MS', color: '#ec4899' },
      ],
      year: '2024',
      lab: 'HealthTech Lab',
    },
    {
      name: 'Community Task Exchange',
      letter: 'TX',
      tags: ['Flutter', 'Firebase', 'P2P'],
      shortDesc: 'Peer-to-peer micro-task marketplace for campus communities.',
      fullDesc:
        'A mobile marketplace where students can post and complete micro-tasks (tutoring, deliveries, tech help) within the campus community. Features in-app chat, rating system, escrow payments, and a reputation score. Handles 200+ tasks weekly.',
      techStack: ['Flutter', 'Firebase', 'Cloud Functions', 'Stripe', 'Dart'],
      team: [
        { name: 'Naveen K.', role: 'Mobile Dev', initials: 'NK', color: '#f59e0b' },
        { name: 'Ojaswi M.', role: 'Backend Dev', initials: 'OM', color: '#06b6d4' },
      ],
      year: '2025',
      lab: 'Mobile Innovation Lab',
    },
  ],
  health: [
    {
      name: 'RetinaScan AI',
      letter: 'RA',
      tags: ['Deep Learning', 'Medical Imaging', 'Python'],
      shortDesc: 'CNN-based diabetic retinopathy detection from retinal fundus images.',
      fullDesc:
        'A deep learning system that analyzes retinal fundus photographs to detect diabetic retinopathy with 94.2% accuracy. Uses an ensemble of EfficientNet and ResNet architectures. Deployed as a web-based screening tool for rural clinics with low-bandwidth optimization.',
      techStack: ['Python', 'TensorFlow', 'EfficientNet', 'Flask', 'OpenCV', 'Docker'],
      team: [
        { name: 'Pranav D.', role: 'ML Research', initials: 'PD', color: '#10b981' },
        { name: 'Rakshita J.', role: 'Clinical Validation', initials: 'RJ', color: '#6366f1' },
        { name: 'Sandeep R.', role: 'Full-Stack Dev', initials: 'SR', color: '#06b6d4' },
      ],
      year: '2024',
      lab: 'HealthTech Lab',
    },
    {
      name: 'Wearable Fall Detector',
      letter: 'FD',
      tags: ['IoT', 'Edge AI', 'Wearable'],
      shortDesc: 'Real-time fall detection smartwatch app with emergency alert system.',
      fullDesc:
        'An edge-AI system running on consumer smartwatches that detects falls using accelerometer and gyroscope data with an on-device LSTM model. Triggers automatic SMS alerts to emergency contacts with GPS coordinates. Achieves 96% sensitivity with less than 5% false positive rate.',
      techStack: ['TensorFlow Lite', 'Arduino', 'Flutter', 'BLE', 'C++', 'Firebase'],
      team: [
        { name: 'Tanvi S.', role: 'Edge AI', initials: 'TS', color: '#f59e0b' },
        { name: 'Umesh K.', role: 'Hardware', initials: 'UK', color: '#ef4444' },
      ],
      year: '2024',
      lab: 'Embedded Systems Lab',
    },
    {
      name: 'Mental Wellness Chatbot',
      letter: 'MW',
      tags: ['NLP', 'LLM', 'Therapy'],
      shortDesc: 'Empathetic AI chatbot providing first-line mental health support for students.',
      fullDesc:
        'A fine-tuned LLM-based chatbot designed specifically for college students. Provides guided breathing exercises, cognitive reframing suggestions, and crisis resource referrals. Trained on de-identified counseling transcripts with clinical oversight. Includes mood tracking and anonymized trend reporting.',
      techStack: ['Python', 'PyTorch', 'LangChain', 'React', 'FastAPI', 'MongoDB'],
      team: [
        { name: 'Varsha N.', role: 'NLP Engineer', initials: 'VN', color: '#8b5cf6' },
        { name: 'Yash A.', role: 'Clinical Psych', initials: 'YA', color: '#10b981' },
        { name: 'Zara M.', role: 'Full-Stack', initials: 'ZM', color: '#6366f1' },
      ],
      year: '2025',
      lab: 'AI Research Lab',
    },
  ],
  smartcity: [
    {
      name: 'Smart Traffic Optimizer',
      letter: 'TO',
      tags: ['IoT', 'Computer Vision', 'Edge'],
      shortDesc: 'AI-powered adaptive traffic signal control using live camera feeds.',
      fullDesc:
        'An intelligent traffic management system that uses computer vision at intersections to detect vehicle density and dynamically adjust signal timings. Reduced average wait time by 34% in pilot studies. Features emergency vehicle preemption and pedestrian priority modes.',
      techStack: ['Python', 'OpenCV', 'YOLOv8', 'Raspberry Pi', 'MQTT', 'React', 'InfluxDB'],
      team: [
        { name: 'Aditya C.', role: 'CV Lead', initials: 'AC', color: '#f59e0b' },
        { name: 'Bhavya K.', role: 'IoT Engineer', initials: 'BK', color: '#06b6d4' },
        { name: 'Chirag S.', role: 'Full-Stack', initials: 'CS', color: '#6366f1' },
      ],
      year: '2024',
      lab: 'Smart Systems Lab',
    },
    {
      name: 'Waste-to-Energy Monitor',
      letter: 'WE',
      tags: ['IoT', 'Analytics', 'Sustainability'],
      shortDesc: 'Real-time monitoring and optimization platform for waste-to-energy plants.',
      fullDesc:
        'An IoT sensor network deployed at a waste-to-energy facility that monitors temperature, gas emissions, and conversion efficiency in real-time. ML models predict maintenance needs 48 hours in advance. Dashboard visualizes carbon offset metrics for ESG reporting.',
      techStack: ['Arduino', 'Python', 'Grafana', 'InfluxDB', 'MQTT', 'TensorFlow', 'React'],
      team: [
        { name: 'Deepa R.', role: 'IoT Lead', initials: 'DR', color: '#10b981' },
        { name: 'Eklavya S.', role: 'ML Engineer', initials: 'ES', color: '#6366f1' },
      ],
      year: '2024',
      lab: 'Sustainable Tech Lab',
    },
    {
      name: 'Public Safety Alert Mesh',
      letter: 'PS',
      tags: ['BLE Mesh', 'Offline', 'Emergency'],
      shortDesc: 'Decentralized alert network for disaster zones using Bluetooth mesh.',
      fullDesc:
        'A Bluetooth mesh-based communication system that creates an ad-hoc alert network in disaster-stricken areas where cellular infrastructure is down. Citizens receive evacuation alerts, responders can map victim locations, and the system self-heals as nodes move. Tested in coordination with Coimbatore disaster response teams.',
      techStack: ['BLE Mesh', 'Flutter', 'Dart', 'SQLite', 'OpenStreetMap', 'Node.js'],
      team: [
        { name: 'Faraz M.', role: 'Mesh Architect', initials: 'FM', color: '#ef4444' },
        { name: 'Geeta P.', role: 'Mobile Dev', initials: 'GP', color: '#06b6d4' },
        { name: 'Hariharan V.', role: 'Systems Eng', initials: 'HV', color: '#f59e0b' },
      ],
      year: '2025',
      lab: 'Smart Systems Lab',
    },
  ],
};

/* ============================================================
   SUB-COMPONENTS
   ============================================================ */

/** Hero banner */
const Hero = () => (
  <div className="z4-hero">
    <div className="z4-hero-badge">
      <span className="z4-hero-badge-dot" />
      CSEA Research Division
    </div>
    <h1>
      Research &amp;{' '}
      <span style={{ background: 'linear-gradient(135deg, #5ef1df, #3b82f6, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
        Innovation Corner
      </span>
    </h1>
    <p className="z4-hero-sub">
      Where ideas become impact — exploring groundbreaking research and
      entrepreneurial solutions from the brightest minds at PSG Tech.
    </p>
    <div className="z4-hero-institution">
      <span>PSG College of Technology</span>
      <span>—</span>
      <span>
        Department of Computer Science &amp; Engineering
      </span>
    </div>
  </div>
);

/** Category Card */
const CategoryCard = ({ cat, onClick }) => {
  return (
    <div
      className="z4-card"
      data-accent={cat.accent}
      onClick={() => onClick(cat)}
    >
      <div className="z4-card-icon">{cat.letter}</div>
      <div className="z4-card-number">{cat.number}</div>
      <h3>{cat.title}</h3>
      <p>{cat.description}</p>
      <div className="z4-card-stats">
        <div className="z4-card-stat">
          <span>{cat.stats.projects}</span> Projects
        </div>
        <div className="z4-card-stat">
          <span>{cat.stats.labs}</span> Labs
        </div>
      </div>
      <div className="z4-card-cta">
        <span>Explore Research</span>
        <span className="z4-card-cta-arrow">&rarr;</span>
      </div>
    </div>
  );
};

/** Category detail — shows project list */
const CategoryView = ({ category, onBack, onProjectClick }) => {
  const projects = PROJECTS_DATA[category.id] || [];
  const acc = category.accentColor || '#5ef1df';

  return (
    <div className="z4-view">
      <div className="z4-category-header">
        <button
          className="z4-back-btn"
          onClick={onBack}
          style={{ borderColor: `${acc}30`, color: acc, backgroundColor: `${acc}0a` }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = `${acc}18`; e.currentTarget.style.borderColor = `${acc}60`; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = `${acc}0a`; e.currentTarget.style.borderColor = `${acc}30`; }}
        >
          &larr; Back to all categories
        </button>
        <div className="z4-category-title-section">
          <div
            className="z4-category-icon-large"
            style={{ borderColor: `${acc}35`, backgroundColor: `${acc}12`, color: acc }}
          >
            {category.letter}
          </div>
          <div>
            <h2 style={{ color: '#e2e8f0' }}>{category.title}</h2>
            <p>{category.description}</p>
            <div className="z4-category-meta">
              <span className="z4-category-meta-item" style={{ color: acc, borderColor: `${acc}25`, backgroundColor: `${acc}08` }}>
                {category.stats.projects} Projects
              </span>
              <span className="z4-category-meta-item">{category.stats.labs} Research Labs</span>
            </div>
          </div>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="z4-empty">
          <div className="z4-empty-icon">--</div>
          <p>Research projects in this category are being compiled. Check back soon.</p>
        </div>
      ) : (
        <div className="z4-project-list">
          {projects.map((proj, i) => (
            <div
              key={i}
              className="z4-project-item"
              onClick={() => onProjectClick(proj)}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${acc}40`; e.currentTarget.style.boxShadow = `0 0 0 1px ${acc}20`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = ''; e.currentTarget.style.boxShadow = ''; }}
            >
              <span className="z4-project-index" style={{ color: acc }}>{String(i + 1).padStart(2, '0')}</span>
              <span
                className="z4-project-icon-small"
                style={{ borderColor: `${acc}35`, backgroundColor: `${acc}12`, color: acc }}
              >
                {proj.letter}
              </span>
              <div className="z4-project-info">
                <h4>{proj.name}</h4>
                <p>{proj.shortDesc}</p>
              </div>
              <div className="z4-project-tags">
                {proj.tags.map((tag) => (
                  <span key={tag} className="z4-project-tag">
                    {tag}
                  </span>
                ))}
              </div>
              <span className="z4-project-chevron" style={{ color: acc }}>&rsaquo;</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/** Project detail view */
const ProjectDetail = ({ project, category, onBack }) => {
  const acc = category?.accentColor || '#5ef1df';

  return (
    <div className="z4-view">
      <button
        className="z4-back-btn"
        onClick={onBack}
        style={{ borderColor: `${acc}30`, color: acc, backgroundColor: `${acc}0a` }}
        onMouseEnter={e => { e.currentTarget.style.backgroundColor = `${acc}18`; e.currentTarget.style.borderColor = `${acc}60`; }}
        onMouseLeave={e => { e.currentTarget.style.backgroundColor = `${acc}0a`; e.currentTarget.style.borderColor = `${acc}30`; }}
      >
        &larr; Back to {category?.title || 'projects'}
      </button>

      <div className="z4-project-detail" style={{ borderColor: `${acc}15` }}>
        <div className="z4-pd-header">
          <div
            className="z4-pd-icon"
            style={{ borderColor: `${acc}35`, backgroundColor: `${acc}12`, color: acc }}
          >
            {project.letter}
          </div>
          <div className="z4-pd-header-info">
            <h2>{project.name}</h2>
            <p className="z4-pd-subtitle">{project.shortDesc}</p>
            <div className="z4-pd-meta">
              <span className="z4-pd-meta-tag">{project.year}</span>
              <span className="z4-pd-meta-tag">{project.lab}</span>
              {project.tags.map((tag) => (
                <span key={tag} className="z4-pd-meta-tag" style={{ color: acc, borderColor: `${acc}25`, backgroundColor: `${acc}08` }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="z4-pd-section">
          <div className="z4-pd-section-label" style={{ color: acc }}>Overview</div>
          <p>{project.fullDesc}</p>
        </div>

        <div className="z4-pd-section">
          <div className="z4-pd-section-label" style={{ color: acc }}>Tech Stack</div>
          <div className="z4-pd-tech-list">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="z4-pd-tech-chip"
                style={{ borderColor: `${acc}30`, backgroundColor: `${acc}10`, color: acc }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="z4-pd-section">
          <div className="z4-pd-section-label" style={{ color: acc }}>Research Team</div>
          <div className="z4-pd-team">
            {project.team.map((member) => (
              <div key={member.name} className="z4-pd-team-member">
                <div
                  className="z4-pd-team-avatar"
                  style={{ background: member.color }}
                >
                  {member.initials}
                </div>
                <div className="z4-pd-team-info">
                  <span className="z4-pd-team-name">{member.name}</span>
                  <span className="z4-pd-team-role">{member.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
const ResearchInnovationCorner = () => {
  const [view, setView] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleCategoryClick = useCallback((cat) => {
    setSelectedCategory(cat);
    setSelectedProject(null);
    setView('category');
  }, []);

  const handleProjectClick = useCallback((proj) => {
    setSelectedProject(proj);
    setView('project');
  }, []);

  const handleBackToHome = useCallback(() => {
    setSelectedCategory(null);
    setSelectedProject(null);
    setView('home');
  }, []);

  const handleBackToCategory = useCallback(() => {
    setSelectedProject(null);
    setView('category');
  }, []);

  return (
    <div className="z4-root">
      <ZoneBg trailColor={0x5ef1df} trailCount={4} dustCount={160} variant={4} />
      <div className="z4-content">
        {/* -- HOME VIEW -- */}
        {view === 'home' && (
          <div className="z4-view">
            <Hero />
            <div className="z4-divider" />
            <div className="z4-grid">
              {CATEGORIES.map((cat) => (
                <CategoryCard key={cat.id} cat={cat} onClick={handleCategoryClick} />
              ))}
            </div>
          </div>
        )}

        {/* -- CATEGORY VIEW -- */}
        {view === 'category' && selectedCategory && (
          <CategoryView
            category={selectedCategory}
            onBack={handleBackToHome}
            onProjectClick={handleProjectClick}
          />
        )}

        {/* -- PROJECT DETAIL VIEW -- */}
        {view === 'project' && selectedProject && (
          <ProjectDetail
            project={selectedProject}
            category={selectedCategory}
            onBack={handleBackToCategory}
          />
        )}
      </div>
    </div>
  );
};

export default ResearchInnovationCorner;