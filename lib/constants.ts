export const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "tech", label: "Tech Stack" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
] as const;

export const SOCIAL_LINKS = {
  github: "https://github.com/nabilshah",
  linkedin: "https://linkedin.com/in/nabilshah",
  email: "mailto:nabil@example.com",
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
    github: "https://github.com/nabilshah/tradeflux",
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
    github: "https://github.com/nabilshah/fianchetto",
    highlights: [
      "Bitboards, alpha-beta pruning, transposition tables",
      "Zobrist hashing, ONNX neural evaluation",
      "C++ + Docker microservices architecture",
    ],
    category: "C++",
  },
  {
    id: "trading-bot",
    title: "Algorithmic Trading Bot",
    description: "Automated FX trading system with real-time market analysis",
    tech: ["Python", "Real-time APIs", "ML", "Backtesting"],
    github: "https://github.com/nabilshah/trading-bot",
    highlights: [
      "£400K+ simulated profit",
      "Real-time FX APIs integration",
      "Advanced risk management",
    ],
    category: "ML",
  },
];

export const TECH_STACK = {
  languages: [
    { name: "Python", level: 95 },
    { name: "TypeScript", level: 90 },
    { name: "C++", level: 85 },
    { name: "Swift", level: 80 },
    { name: "Rust", level: 75 },
  ],
  ml: [
    { name: "PyTorch", level: 90 },
    { name: "TensorFlow", level: 85 },
    { name: "ONNX", level: 80 },
    { name: "Transformers", level: 85 },
    { name: "Scikit-learn", level: 90 },
  ],
  cloud: [
    { name: "AWS", level: 85 },
    { name: "GCP", level: 80 },
    { name: "Docker", level: 90 },
    { name: "Kubernetes", level: 75 },
    { name: "PostgreSQL", level: 85 },
    { name: "Redis", level: 80 },
    { name: "Kafka", level: 85 },
  ],
  systems: [
    { name: "Next.js", level: 90 },
    { name: "React", level: 90 },
    { name: "Node.js", level: 85 },
    { name: "Linux", level: 85 },
    { name: "Git", level: 95 },
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
    title: "President - Founders Society",
    description: "Leading student entrepreneurship organization",
    icon: "👔",
  },
  {
    title: "House of Wisdom",
    description: "Leadership role in academic society",
    icon: "🏛️",
  },
  {
    title: "Debating - Top 30 Worldwide",
    description: "Competitive debating achievements",
    icon: "🎤",
  },
];

export const PROJECT_CATEGORIES = ["All", "ML", "Systems", "C++", "LLMs"] as const;

