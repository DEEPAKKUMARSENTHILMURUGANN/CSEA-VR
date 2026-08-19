
const VIDEOS = {
  air: 'https://res.cloudinary.com/gvyea8kb/video/upload/v1787155344/air_lab.mp4',
  grd: 'https://res.cloudinary.com/gvyea8kb/video/upload/v1787155145/grd_lab.mp4',
  hardware: 'https://res.cloudinary.com/gvyea8kb/video/upload/v1787154936/hardware_lab.mp4',
  psgCares: 'https://res.cloudinary.com/gvyea8kb/video/upload/v1787154762/Psg_cares_lab.mp4',
  scps: 'https://res.cloudinary.com/gvyea8kb/video/upload/v1787154549/scps_lab.mp4',
  programmingLab1: 'https://res.cloudinary.com/gvyea8kb/video/upload/v1787155021/programming_lab_1.mp4',
  bigDataCloud: 'https://res.cloudinary.com/gvyea8kb/video/upload/v1787154865/programming_lab_2.mp4',
  // Unused — doesn't match any lab in this doc, likely Zone2's Open Source Software Lab:
  // openSource: 'https://res.cloudinary.com/gvyea8kb/video/upload/v1787155244/open_source_lab.mp4',
};
 
/* ── Shared lab records ─────────────────────────────────────── */
const LAB_LIBRARY = {
  'Hardware Lab': {
    name: 'Hardware Lab',
    room: 'Department of CSE, PSG College of Technology',
    subtitle: 'Microprocessors, microcontrollers & embedded/analog electronics',
    description:
      'A practical laboratory designed for hands-on learning in microprocessors, microcontrollers, embedded systems, and digital/analog electronics. Provides processor and controller trainer kits (8085, 8086, 8051, PIC, ARM, DSP), Arduino UNO and Raspberry Pi platforms, interfacing boards, sensor kits, and electronic measurement instruments, enabling students to develop, test and debug hardware-based applications.',
    images: [VIDEOS.hardware],
    projects: [
      '8085/8086 Assembly Programming Exercises',
      'PIC16F877 / ARM Controller Interfacing',
      'Arduino & Raspberry Pi Sensor Projects',
      'DSP-Based Signal Processing Experiments',
    ],
    specifications: {
      processor: 'Mixed fleet — Intel Core i3/i5/i7 (HCL & Dell OptiPlex/3060 units)',
      ram: '2–16 GB (varies by system, newest units at 16 GB)',
      gpu: 'Integrated graphics',
      systems: '26 total computer systems',
    },
    software: ['Arduino IDE 1.8.7', 'Code::Blocks 10.05', 'Java 1.8', 'NetBeans 8.1'],
    facilities: [
      '8085/8086 Microprocessor Trainer Kits',
      '8051, PIC16F877 & ARM Controller Kits',
      'DSP Starter Kits and Trainers',
      'Digital & Analog IC Testers',
      'Function Generators & Digital Storage Oscilloscopes',
    ],
  },
 
  'AIR Lab / Centre for Algorithms and Applied AI (3AI)': {
    name: 'AIR Lab / Centre for Algorithms and Applied AI (3AI)',
    room: 'Department of CSE, PSG College of Technology',
    subtitle: 'AI, Deep Learning, Computer Vision & Applied Algorithms research',
    description:
      'A research-oriented facility focused on Artificial Intelligence, Deep Learning, Computer Vision, and Applied Algorithms. Work here spans CNNs, object detection, feature extraction, explainable AI, multimodal analysis, conversational AI, and cybersecurity-resilience research. Projects developed have been published in international journals and presented at IEEE conferences, and several are deployed as functional campus applications.',
    images: [VIDEOS.air],
    projects: [
      'Smart Attendance Tracking System',
      'Drowsiness Detection System',
      'Breast Cancer Prediction Model',
      'Dyslexia Assessment Tool',
      'CYBRANA — AI-Powered Cybersecurity Resilience Firewall (IEEE CVMI 2024)',
      'Skylanot — AI Chatbot & Mobile App for Campus Information',
      'Sebastian Chatbot 2 — BERT-Based Voice Assistant (Flask + Flutter)',
    ],
    specifications: {
      processor: 'Intel Core i7-13700 (13th Gen)',
      ram: '16 GB DDR4 3200 MHz',
      gpu: 'Integrated graphics (no dedicated GPU listed)',
      systems: '85 Lenovo ThinkCentre M70s desktops',
    },
    software: ['Python', 'VS Code', 'Java', 'NetBeans', 'Code::Blocks', 'Microsoft Visual C++', 'Flowgorithm'],
    facilities: [
      'AI & Deep Learning research focus',
      'Computer Vision / CNN & Image Classification',
      'Explainable AI (XAI)',
      'Medical Image Analysis',
      'Intelligent Monitoring Systems',
    ],
  },
 
  'Big Data Analytics and Cloud Computing Lab': {
    name: 'Big Data Analytics and Cloud Computing Lab',
    room: 'Department of CSE, PSG College of Technology',
    subtitle: 'Practical big data, cloud computing & database application development',
    description:
      'A dedicated computing facility for practical work in big data analytics and cloud computing, supporting programming and software development in Python and Java alongside database connectivity tools.',
    images: [VIDEOS.bigDataCloud],
    projects: [
      'Big Data Processing Exercises (Python)',
      'Cloud Computing Application Development',
      'Database Connectivity via Oracle 9i Client',
      'Java-Based Distributed Data Programs',
    ],
    specifications: {
      processor: 'Intel Core i7-12700',
      ram: '16 GB DDR3',
      gpu: 'Integrated graphics',
      systems: '50 Lenovo M70T Gen3 desktops',
    },
    software: ['Code::Blocks 10.05', 'Java 1.8', 'NetBeans 8.1', 'Oracle 9i Client', 'Python 3.10.11', 'VS Code'],
    facilities: [
      'Dedicated big data & cloud computing environment',
      'Database-application development tooling',
    ],
  },
 
  'Cyber Security and Privacy Lab': {
    name: 'Cyber Security and Privacy Lab',
    room: 'Department of CSE, PSG College of Technology',
    subtitle: 'Network security, private cloud, cryptography & secure systems',
    description:
      'A dedicated facility for hands-on learning in network security, cloud infrastructure, cryptography, secrets management, and secure system design. Built on a Tier 2 private cloud (OpenStack-based) IaaS environment, it covers edge security tools (IDS/IPS, WAF, CDN protection), key/secrets management platforms, blockchain and cryptographic fundamentals, and biometric/physical access security.',
    images: [], // no confirmed video — see coverage note at top of file
    projects: [
      'Private Cloud (OpenStack IaaS) Provisioning',
      'IDS/IPS & WAF Deployment (Snort, OSSEC, ModSecurity)',
      'Secrets Management Across Cloud Platforms',
      'Blockchain & Consensus Fundamentals (Ethereum, Hyperledger)',
      'Biometric Access Control System Setup',
    ],
    specifications: {
      processor: '24 vCores compute (56 total, hyperthreaded KVM)',
      ram: '32 GB compute (64 GB total, 2–16 GB scalable per VM)',
      gpu: 'N/A',
      systems: '6 TB redundant block storage — Tier 2 OpenStack private cloud',
    },
    software: [
      'OpenStack (Nova, Glance, Neutron, Swift, MySQL, RabbitMQ)',
      'HashiCorp Vault / AWS Secrets Manager / Azure Key Vault',
      'Snort / OSSEC / ModSecurity / Cloudflare',
      'Ethereum / Hyperledger',
    ],
    facilities: [
      '2× 24U rack enclosures with power strips',
      'Biometric finger & card readers (up to 50,000 users)',
      'Face/finger/card multi-mode authentication readers',
      '24-port Gigabit switch',
    ],
  },
 
  'PSG CARES Lab': {
    name: 'PSG CARES Lab',
    room: 'Department of CSE, PSG College of Technology',
    subtitle: 'DST Centre of Excellence — Assistive Technology & Rehabilitation Engineering',
    description:
      'A DST-funded Centre of Excellence for research in Assistive Technology and Rehabilitation Engineering, developing cost-effective solutions for elderly and specially-challenged populations by integrating AI, VR, Cloud Computing, IoT, and wearable biomedical devices, with clinical validation through medical-institution partnerships.',
    images: [VIDEOS.psgCares],
    projects: [
      'Vita-Link — Anti-Coagulation Dosage Management App (with PSG IMS&R)',
      'Prediction & Modelling of Static and Functional Scoliosis (Depth-Sensor + ML)',
    ],
    specifications: {
      processor: 'Mixed — Intel Core i5-8500 (×10 Optiplex) / i7-13700 (host) / Jetson Nano ARM A57 (×2)',
      ram: '8–16 GB per system',
      gpu: 'NVIDIA RTX 2080 Ti (GPU workstation) + Jetson Nano 128-core Maxwell (×2)',
      systems: '~15 systems (desktops, GPU workstation, Jetson Nano kits, FPGA kit, laptop)',
    },
    software: ['Ubuntu 20.04 LTS + CUDA 11.4', 'Android Studio 4.1.1', 'Visual Studio Code / 2019', 'MySQL Workbench', 'Vivado 2021.2', 'Kinect Studio 2.0'],
    facilities: [
      'Kinect Motion Capture System',
      'Xilinx Zynq UltraScale+ FPGA Evaluation Kit',
      'NVIDIA Jetson Nano Kits (×2)',
      'Certified testing hub for wearable biomedical devices (in progress)',
    ],
  },
 
  'Programming Lab I': {
    name: 'Programming Lab I',
    room: 'Department of CSE, PSG College of Technology',
    subtitle: 'Foundational to advanced programming across languages & paradigms',
    description:
      'A general-purpose computing laboratory for foundational and advanced programming instruction — logic programming, object-oriented programming, scripting, data science, and database connectivity across languages including C/C++, Java, Python, R and Prolog.',
    images: [VIDEOS.programmingLab1],
    projects: [
      'Structured & Object-Oriented Programming Exercises',
      'Logic Programming in SWI-Prolog',
      'Data Analysis with R / Python',
      'Database Connectivity via Oracle 9i Client',
    ],
    specifications: {
      processor: 'Mixed — Intel Core i5-4590 / i7-7700 / i5-8400 / i7-13700 (Lenovo M70S Gen3)',
      ram: '4–16 GB DDR3/DDR4',
      gpu: 'Integrated graphics',
      systems: '86 computer systems',
    },
    software: ['Code::Blocks 10.05', 'Java 1.8', 'NetBeans 8.1', 'SWI-Prolog 7.2.3', 'Python 3.10.11', 'RStudio 1.1.383', 'R 3.6.0', 'Cryptool', 'Anaconda 3.5.2'],
    facilities: ['Scratch 3.26 (intro programming)', 'Flowgorithm 2.30', 'Oracle 9i Client'],
  },
 
  'GRD Computing Laboratory': {
    name: 'GRD Computing Laboratory',
    room: 'Department of CSE, PSG College of Technology',
    subtitle: 'Programming, statistical computing & student project work (incl. Project Work II)',
    description:
      'A general-purpose computing lab used for programming, software development and project work by UG/PG students, supporting "Project Work II" — student-designed projects spanning deep learning, NLP, computer vision, federated learning, IoT and privacy-preserving systems using TensorFlow, PyTorch and Keras.',
    images: [VIDEOS.grd],
    projects: [
      'Image Enhancement Using Deep Learning',
      'Cognitive Assessment Automation for Neurodegenerative Diseases',
      'Legal Text Understanding & News Summarization (SVM + Genetic Algorithms)',
      'Adversarial-Attack Defence for ML Classifiers',
      'Privacy-Preserving Federated Recommender System',
      'Diabetic Retinopathy Classification',
      'IoT Intrusion Detection',
      'Blockchain-Based Medical Record Sharing',
      'Multimodal Emotion / Fear Recognition',
    ],
    specifications: {
      processor: 'Mixed — up to Intel Core i9-13900 (Dell Precision 3660)',
      ram: '4–32 GB DDR4/DDR5',
      gpu: 'Integrated graphics (workload-dependent)',
      systems: '87 total computer systems',
    },
    software: ['Code::Blocks', 'Java 1.8', 'NetBeans 8.1', 'StarUML', 'RStudio', 'Python 3.10.11', 'VS Code', 'Android Studio', 'R 3.6.0', 'Weka 3.7.4'],
    facilities: [
      'TensorFlow / PyTorch / Keras',
      'RapidMiner / Scikit-learn / CNTK / Caffe / OpenNN',
      'AutoML tooling',
      '"19Z820 – Project Work II" course support',
    ],
  },
 
  'Centre for Smart Cyber Physical Systems (SCPS)': {
    name: 'Centre for Smart Cyber Physical Systems (SCPS)',
    room: 'Department of CSE, PSG College of Technology',
    subtitle: 'Full-stack web development, databases & cyber-physical systems',
    description:
      'A computing lab dedicated to hands-on learning in full-stack web development, database systems, and cyber-physical systems concepts, with reference material covering the modern web-dev stack and the nine major database paradigms.',
    images: [VIDEOS.scps],
    projects: [
      'Full-Stack Web Application (Node.js / Express / React or Vue)',
      'RESTful API Design & Implementation',
      'Database Paradigm Comparison Exercises (SQL vs NoSQL vs Graph vs Vector)',
    ],
    specifications: {
      processor: 'Intel Core i7-13700 (12th/13th Gen)',
      ram: '16 GB DDR4-3200MHz',
      gpu: 'Integrated graphics',
      systems: '75 Lenovo M70s ThinkCentre desktops',
    },
    software: ['Code::Blocks', 'Java', 'NetBeans', 'Python', 'VS Code', 'Microsoft Visual C++'],
    facilities: [
      'Web stack reference wall: HTML/CSS/JS, Node.js, MySQL, React/Vue, Express.js, REST APIs',
      '9 database-type reference: Relational, Document, Key-Value, Columnar, Graph, Time-Series, Object-Oriented, In-Memory, Vector',
    ],
  },
 
  'Software Programming Lab': {
    name: 'Software Programming Lab',
    room: 'Department of CSE, PSG College of Technology',
    subtitle: 'Computer networks & distributed computing coursework',
    description:
      'A core programming lab supporting Computer Networks Laboratory (19Z510) and Distributed Computing Laboratory (19Z611) — socket-based network applications, protocol analysis, and distributed-systems concepts including RPC, election algorithms, deadlock detection, MPI parallel programming, MapReduce, and containerized cloud deployment.',
    images: [], // no confirmed video — see coverage note at top of file
    projects: [
      'Socket-Based Chat Application (TCP/UDP)',
      'Sliding Window Protocol Simulation',
      'RPC Client-Server Implementation',
      'Distributed Deadlock Detection',
      'MPI-Based Matrix Multiplication & Pi Calculation',
      'Hadoop MapReduce Pipeline',
      'Dockerized Cloud Deployment (AWS / GCP)',
    ],
    specifications: {
      processor: 'Mixed — Intel Core 2 Duo through i7-7700 (Dell & HCL units)',
      ram: '2–8 GB DDR2/DDR3/DDR4',
      gpu: 'Integrated graphics',
      systems: '48 total computer systems',
    },
    software: ['Code::Blocks', 'Java 1.8', 'Python 3.10.11', 'Oracle 9i Client', 'NetBeans', 'VS Code', 'MongoDB', 'Ubuntu', 'NS2', 'Wireshark'],
    facilities: [
      '19Z510 Computer Networks Lab (Wireshark, NS2, Packet Tracer)',
      '19Z611 Distributed Computing Lab (MS-MPI, Hadoop, Docker Toolbox, Jenkins)',
    ],
  },
};
 
/* Maps an ordered list of lab names to this technology's labs array,
   assigning a locally-unique id (LabPage looks up by id within one
   technology's labs, not globally). */
const labsFor = (names) => names.map((name, idx) => ({ id: idx + 1, ...LAB_LIBRARY[name] }));
 
export const technologies = [
  {
    id: 1,
    slug: 'artificial-intelligence',
    title: 'Artificial Intelligence',
    shortDescription:
      'Intelligent agents, search, reasoning and applied AI — driven by the AIR Lab / 3AI Centre\'s CNN, explainable-AI and medical-prediction research alongside GRD Computing\'s deep-learning project work.',
    accentColor: '#3b82f6',
    labsCount: 2,
    labs: labsFor(['AIR Lab / Centre for Algorithms and Applied AI (3AI)', 'GRD Computing Laboratory']),
  },
  {
    id: 2,
    slug: 'generative-ai',
    title: 'Generative AI',
    shortDescription:
      'Transformer-based generation and image enhancement — from the AIR Lab / 3AI Centre\'s BERT-based Sebastian Chatbot to GRD Computing\'s deep-learning image-enhancement project work.',
    accentColor: '#8b5cf6',
    labsCount: 2,
    labs: labsFor(['AIR Lab / Centre for Algorithms and Applied AI (3AI)', 'GRD Computing Laboratory']),
  },
  {
    id: 3,
    slug: 'agentic-ai',
    title: 'Agentic AI',
    shortDescription:
      'Conversational and autonomous agents — the AIR Lab / 3AI Centre\'s Sebastian Chatbot (BERT + Flask + Flutter) and Skylanot campus-information assistant.',
    accentColor: '#ec4899',
    labsCount: 1,
    labs: labsFor(['AIR Lab / Centre for Algorithms and Applied AI (3AI)']),
  },
  {
    id: 4,
    slug: 'computer-vision',
    title: 'Computer Vision',
    shortDescription:
      'CNNs, object detection and medical imaging — the AIR Lab / 3AI Centre\'s drowsiness-detection and breast-cancer-prediction work, plus GRD Computing\'s diabetic-retinopathy classification project.',
    accentColor: '#10b981',
    labsCount: 2,
    labs: labsFor(['AIR Lab / Centre for Algorithms and Applied AI (3AI)', 'GRD Computing Laboratory']),
  },
  {
    id: 5,
    slug: 'natural-language-processing',
    title: 'Natural Language Processing',
    shortDescription:
      'Language understanding and summarization — the AIR Lab / 3AI Centre\'s BERT-based chatbot work and GRD Computing\'s legal-text-understanding and news-summarization projects.',
    accentColor: '#f59e0b',
    labsCount: 2,
    labs: labsFor(['AIR Lab / Centre for Algorithms and Applied AI (3AI)', 'GRD Computing Laboratory']),
  },
  {
    id: 6,
    slug: 'robotics',
    title: 'Robotics',
    shortDescription:
      'Embedded control and motion systems — the Hardware Lab\'s microcontroller/interfacing kits paired with PSG CARES\' Kinect motion-capture and Jetson Nano platforms.',
    accentColor: '#ef4444',
    labsCount: 2,
    labs: labsFor(['Hardware Lab', 'PSG CARES Lab']),
  },
  {
    id: 7,
    slug: 'internet-of-things',
    title: 'Internet of Things',
    shortDescription:
      'Connected-device development and networking — Hardware Lab\'s Arduino/Raspberry Pi platforms, PSG CARES\' wearable IoT work, and Software Programming Lab\'s network-protocol coursework.',
    accentColor: '#06b6d4',
    labsCount: 3,
    labs: labsFor(['Hardware Lab', 'PSG CARES Lab', 'Software Programming Lab']),
  },
  {
    id: 8,
    slug: 'edge-ai',
    title: 'Edge AI',
    shortDescription:
      'On-device inference — PSG CARES\' Jetson Nano kits for edge deployment, backed by the Hardware Lab\'s embedded processor platforms.',
    accentColor: '#6366f1',
    labsCount: 2,
    labs: labsFor(['PSG CARES Lab', 'Hardware Lab']),
  },
  {
    id: 9,
    slug: 'digital-twins',
    title: 'Digital Twins',
    shortDescription:
      'Sensor-driven virtual modelling — PSG CARES\' depth-sensor scoliosis-modelling research alongside the SCPS Centre\'s explicit cyber-physical-systems focus.',
    accentColor: '#14b8a6',
    labsCount: 2,
    labs: labsFor(['PSG CARES Lab', 'Centre for Smart Cyber Physical Systems (SCPS)']),
  },
  {
    id: 10,
    slug: 'blockchain',
    title: 'Blockchain',
    shortDescription:
      'Distributed ledgers and consensus — Cyber Security Lab\'s Ethereum/Hyperledger fundamentals, GRD Computing\'s blockchain medical-record-sharing project, and Software Programming Lab\'s distributed-computing coursework.',
    accentColor: '#f97316',
    labsCount: 3,
    labs: labsFor(['Cyber Security and Privacy Lab', 'GRD Computing Laboratory', 'Software Programming Lab']),
  },
  {
    id: 11,
    slug: 'cybersecurity',
    title: 'Cybersecurity',
    shortDescription:
      'Network security, private cloud and secrets management — an OpenStack-based Tier 2 IaaS environment covering IDS/IPS, WAF, key-management platforms and biometric access security.',
    accentColor: '#dc2626',
    labsCount: 1,
    labs: labsFor(['Cyber Security and Privacy Lab']),
  },
  {
    id: 12,
    slug: 'big-data-cloud-computing',
    title: 'Big Data & Cloud Computing',
    shortDescription:
      'Large-scale data processing and cloud deployment — the dedicated Big Data Analytics & Cloud Computing Lab, Software Programming Lab\'s Hadoop/MapReduce/Docker coursework, and SCPS\'s database-paradigm coverage.',
    accentColor: '#0ea5e9',
    labsCount: 3,
    labs: labsFor(['Big Data Analytics and Cloud Computing Lab', 'Software Programming Lab', 'Centre for Smart Cyber Physical Systems (SCPS)']),
  },
];
 
export default technologies;
 