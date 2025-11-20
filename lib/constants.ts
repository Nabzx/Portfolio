export const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "experience", label: "Experience" },
  { id: "tech", label: "Tech Stack" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
] as const;

export const SOCIAL_LINKS = {
  github: "https://github.com/Nabzx",
  linkedin: "https://linkedin.com/in/nabilshah",
  email: "mailto:nabilshahx@gmail.com",
};

export const EXPERIENCE = [
  {
    company: "Minexx",
    role: "Software Engineer Intern (AI & Platforms)",
    period: "2024",
    description: [
      "Built real-time data ingestion pipeline processing 3K+ articles/day with 95% deduplication",
      "Developed Tin Sentiment Bot using GDELT, PostgreSQL, and NLP achieving +20% accuracy",
      "Created ETL pipelines running 24/7 with automated monitoring on GCP production systems",
      "Platform handles 1M+ requests/day with high availability and fault tolerance",
    ],
  },
];

export const PROJECTS = [
  {
    id: "tradeflux",
    title: "TradeFlux AI",
    description: "High-frequency trading system with real-time data processing and LSTM forecasting",
    tech: ["Next.js", "Kafka", "Redis", "LSTM", "AWS Lambda", "SwiftUI"],
    github: "https://github.com/Nabzx/TradeFluxAI",
    highlights: [
      "50K+ ticks/min Kafka→Redis pipeline",
      "<120ms latency, LSTM forecaster (200K+ data points)",
      "Next.js dashboard, AWS Lambda, SwiftUI",
    ],
    category: "ML",
  },
  {
    id: "fianchetto",
    title: "FianchettoX Chess Engine",
    description: "High-performance chess engine with neural network evaluation",
    tech: ["C++", "Docker", "ONNX", "Bitboards", "Alpha-Beta"],
    github: "https://github.com/Nabzx/Fianchetto-Engine",
    highlights: [
      "Bitboards, alpha-beta pruning, transposition tables",
      "Zobrist hashing, ONNX neural evaluation",
      "C++ + Docker microservices architecture",
    ],
    category: "C++",
  },
  {
    id: "morgan-stanley",
    title: "Morgan Stanley Trading Bot",
    description: "Algorithmic trading system developed for high-frequency market operations",
    tech: ["Python", "Real-time APIs", "ML", "Backtesting", "Risk Management"],
    github: "https://github.com/Nabzx/MSTradingCompetition",
    highlights: [
      "Real-time market data processing",
      "Advanced algorithmic strategies",
      "Risk management and compliance",
    ],
    category: "ML",
  },
  {
    id: "black-hole",
    title: "Python Black Hole Simulator",
    description: "Physics simulation of black hole dynamics and gravitational effects",
    tech: ["Python", "NumPy", "Matplotlib", "Physics Simulation"],
    github: "https://github.com/Nabzx/Black-Hole-Simulator",
    highlights: [
      "Accurate gravitational calculations",
      "Visualisation of spacetime curvature",
      "Interactive parameter controls",
    ],
    category: "Systems",
  },
  {
    id: "icu-risk",
    title: "ICU Risk Prediction (BigQuery)",
    description: "Machine learning model for predicting ICU patient risk using BigQuery analytics",
    tech: ["BigQuery", "Python", "ML", "Healthcare Analytics"],
    github: "https://github.com/Nabzx/Synthea-ICU-Risk-Prediction-Multimodal-Patient-Analysis",
    highlights: [
      "Large-scale healthcare data analysis",
      "Real-time risk scoring",
      "Integration with hospital systems",
    ],
    category: "ML",
  },
  {
    id: "study-buddy",
    title: "AI Study Buddy (Next.js + OpenAI)",
    description: "Intelligent study assistant powered by OpenAI for personalised learning",
    tech: ["Next.js", "OpenAI", "TypeScript", "TailwindCSS"],
    github: "https://github.com/Nabzx/IBMHACKATHON",
    highlights: [
      "Personalised study plans",
      "AI-powered explanations",
      "Progress tracking and analytics",
    ],
    category: "LLMs",
  },
];

export const TECH_STACK = {
  languages: [
    { name: "Python" },
    { name: "C++" },
    { name: "Java" },
    { name: "JavaScript/TypeScript" },
    { name: "SQL" },
    { name: "Bash" },
  ],
  ml: [
    { name: "TensorFlow" },
    { name: "PyTorch" },
    { name: "scikit-learn" },
    { name: "Hugging Face" },
    { name: "spaCy" },
    { name: "NLTK" },
    { name: "ONNX" },
  ],
  cloud: [
    { name: "GCP" },
    { name: "AWS" },
    { name: "BigQuery" },
    { name: "PostgreSQL" },
    { name: "Redis" },
    { name: "Kafka" },
    { name: "Firebase" },
  ],
  systems: [
    { name: "Docker" },
    { name: "Git" },
    { name: "CI/CD" },
    { name: "Async Pipelines" },
    { name: "Distributed Systems" },
  ],
};

export const ACHIEVEMENTS = [
  {
    title: "IBM Hackathon Winner",
    description: "First place in AI/ML category",
    icon: "🏆",
  },
  {
    title: "Kaggle Competitions",
    description: "Active participant in ML competitions",
    icon: "📊",
  },
  {
    title: "LeetCode Hackathon",
    description: "Top performer in algorithmic challenges",
    icon: "💻",
  },
  {
    title: "3 AI Startups Founded",
    description: "Entrepreneurial ventures in AI space",
    icon: "🚀",
  },
  {
    title: "President – Founders Society",
    description: "Leading student entrepreneurship organization",
    icon: "👔",
  },
  {
    title: "House of Wisdom",
    description: "Leadership role in academic society",
    icon: "🏛️",
  },
  {
    title: "Debating – Top 30 Worldwide",
    description: "Competitive debating achievements",
    icon: "🎤",
  },
  {
    title: "1st Place Piano Performance",
    description: "Award-winning musical performance",
    icon: "🎹",
  },
  {
    title: "1st Amateur MMA Fight",
    description: "Competitive martial arts achievement",
    icon: "🥊",
  },
];

export const PROJECT_CATEGORIES = ["All", "ML", "Systems", "C++", "LLMs"] as const;

