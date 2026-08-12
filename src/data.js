export const GITHUB_USERNAME = "Moaaz-Adel";
export const GITHUB_URL = `https://github.com/${GITHUB_USERNAME}`;

export const autoGradients = [
  "bg-gradient-to-br from-violet-500 to-cyan-500",
  "bg-gradient-to-br from-amber-500 to-rose-500",
  "bg-gradient-to-br from-emerald-500 to-cyan-500",
  "bg-gradient-to-br from-fuchsia-500 to-violet-500",
  "bg-gradient-to-br from-sky-500 to-indigo-500",
  "bg-gradient-to-br from-orange-500 to-yellow-500"
];

export const languageEmojis = {
  TypeScript: "🔷",
  JavaScript: "🟨",
  Python: "🐍",
  Java: "☕",
  Go: "🔵",
  Rust: "🦀",
  HTML: "📄",
  CSS: "🎨",
  Shell: "💻",
  Dockerfile: "🐳",
  C: "🔧",
  "C++": "⚙️"
};

export function getRepoEmoji(language) {
  return languageEmojis[language] || "📦";
}

export const initialProjects = [
  {
    id: 1,
    title: "Analytics Dashboard",
    description: "A real-time dashboard with charts, KPI cards, filters, and animated insights for tracking user engagement.",
    categories: ["web", "data"],
    tags: ["React", "Charts", "API"],
    emoji: "📊",
    gradient: "bg-gradient-to-br from-violet-500 to-cyan-500",
    featured: true
  },
  {
    id: 2,
    title: "E-Commerce Experience",
    description: "A modern shopping interface with product filtering, cart animation, and responsive product pages.",
    categories: ["web", "ui"],
    tags: ["JavaScript", "Tailwind", "UI Design"],
    emoji: "🛍️",
    gradient: "bg-gradient-to-br from-amber-500 to-rose-500",
    featured: false
  },
  {
    id: 3,
    title: "Habit Tracker App",
    description: "A mobile-first habit tracking app concept with progress rings, streaks, and satisfying micro-interactions.",
    categories: ["mobile", "ui"],
    tags: ["Mobile", "UX", "Animation"],
    emoji: "📱",
    gradient: "bg-gradient-to-br from-emerald-500 to-cyan-500",
    featured: false
  },
  {
    id: 4,
    title: "AI Career Assistant",
    description: "An intelligent assistant that helps users improve their profile, resume, and career presentation.",
    categories: ["web", "data"],
    tags: ["AI", "Web App", "Personalization"],
    emoji: "🤖",
    gradient: "bg-gradient-to-br from-fuchsia-500 to-violet-500",
    featured: true
  },
  {
    id: 5,
    title: "Portfolio Design System",
    description: "A reusable design system with components, themes, animations, and accessibility-focused patterns.",
    categories: ["ui", "web"],
    tags: ["Design System", "Components", "Accessibility"],
    emoji: "🎨",
    gradient: "bg-gradient-to-br from-sky-500 to-indigo-500",
    featured: false
  },
  {
    id: 6,
    title: "Data Story Platform",
    description: "A visual storytelling project that transforms raw data into animated, easy-to-understand insights.",
    categories: ["data"],
    tags: ["Data", "Visualization", "Charts"],
    emoji: "📈",
    gradient: "bg-gradient-to-br from-orange-500 to-yellow-500",
    featured: false
  }
];

export const seedMessages = [
  {
    id: 1,
    name: "Sara Ali",
    email: "sara@example.com",
    message: "Your portfolio looks amazing. I would love to discuss a freelance project.",
    date: "8/4/2026, 9:20 AM",
    status: "unread"
  },
  {
    id: 2,
    name: "John Mensah",
    email: "john@example.com",
    message: "We are hiring junior developers. Are you open to opportunities?",
    date: "8/3/2026, 4:12 PM",
    status: "read"
  }
];

export const skillBars = [
  { name: "TypeScript / Next.js", level: 92 },
  { name: "AI & LLM Integration", level: 88 },
  { name: "Testing & Quality", level: 86 },
  { name: "PostgreSQL / Prisma", level: 80 },
  { name: "DevOps & Docker", level: 76 },
  { name: "Three.js / 3D Web", level: 72 }
];

export const radarData = [
  { skill: "TypeScript / Next.js", value: 92 },
  { skill: "AI / LLM Integration", value: 88 },
  { skill: "Testing (Cypress / Cucumber)", value: 86 },
  { skill: "PostgreSQL / Prisma", value: 80 },
  { skill: "Three.js / 3D", value: 72 },
  { skill: "DevOps / Docker", value: 76 }
];

export const timelineData = [
  {
    year: "2026",
    title: "Readora — Arabic AI Reading Platform",
    description: "Built an Arabic-first reading app with AI integration, progress tracking, uploads, and gamification using Next.js, OpenAI, PostgreSQL, and Prisma."
  },
  {
    year: "2026",
    title: "GitHub Universe — Interactive 3D Portfolio",
    description: "Designed and shipped an interactive GitHub profile universe combining Next.js, Three.js, and the GitHub API for a visually rich developer identity."
  },
  {
    year: "2025",
    title: "Provider & Infrastructure Projects",
    description: "Shipped provider and other TypeScript-first projects, solidifying modern full-stack development skills."
  },
  {
    year: "2024",
    title: "AI & DevOps Exploration",
    description: "Explored AI agents with khoj (LLM integrations: GPT, Claude, Gemini, Llama, Qwen) and Docker workflows via lazydocker."
  },
  {
    year: "2022",
    title: "Deep Dive into Testing",
    description: "Curated expertise in testing — Cucumber, Cypress, blockchain testing, and distributed systems testing frameworks."
  }
];

export const testimonials = [
  {
    quote: "A highly creative developer who understands how to make interfaces feel alive and engaging.",
    author: "Sarah Johnson",
    role: "Product Designer"
  },
  {
    quote: "Excellent attention to detail, strong communication, and a real passion for interactive experiences.",
    author: "David Smith",
    role: "Startup Founder"
  },
  {
    quote: "Delivered a beautiful and functional project with impressive animations and clean structure.",
    author: "Amina Hassan",
    role: "Project Manager"
  },
  {
    quote: "One of the most dedicated people I have worked with. Highly recommended for modern web projects.",
    author: "Michael Chen",
    role: "Senior Developer"
  }
];

export const growthArea = [
  { month: "Jan", value: 58 },
  { month: "Feb", value: 63 },
  { month: "Mar", value: 69 },
  { month: "Apr", value: 74 },
  { month: "May", value: 81 },
  { month: "Jun", value: 88 },
  { month: "Jul", value: 94 }
];

export const trafficArea = [
  { day: "Mon", visitors: 120 },
  { day: "Tue", visitors: 190 },
  { day: "Wed", visitors: 170 },
  { day: "Thu", visitors: 260 },
  { day: "Fri", visitors: 310 },
  { day: "Sat", visitors: 280 },
  { day: "Sun", visitors: 360 }
];

export const techPie = [
  { name: "TypeScript", value: 32 },
  { name: "JavaScript", value: 26 },
  { name: "Next.js", value: 18 },
  { name: "Testing", value: 14 },
  { name: "Docker", value: 10 }
];

export const achievementBar = [
  { name: "Projects", count: 24 },
  { name: "Certificates", count: 7 },
  { name: "Talks", count: 4 },
  { name: "Articles", count: 12 },
  { name: "Awards", count: 3 }
];

export const adminTraffic = [
  { month: "Jan", views: 820, leads: 24 },
  { month: "Feb", views: 940, leads: 31 },
  { month: "Mar", views: 1120, leads: 35 },
  { month: "Apr", views: 1260, leads: 42 },
  { month: "May", views: 1480, leads: 51 },
  { month: "Jun", views: 1720, leads: 64 },
  { month: "Jul", views: 1980, leads: 75 }
];

export const projectGradients = [
  { label: "Violet Cyan", value: "bg-gradient-to-br from-violet-500 to-cyan-500" },
  { label: "Amber Rose", value: "bg-gradient-to-br from-amber-500 to-rose-500" },
  { label: "Emerald Cyan", value: "bg-gradient-to-br from-emerald-500 to-cyan-500" },
  { label: "Fuchsia Violet", value: "bg-gradient-to-br from-fuchsia-500 to-violet-500" },
  { label: "Sky Indigo", value: "bg-gradient-to-br from-sky-500 to-indigo-500" },
  { label: "Orange Yellow", value: "bg-gradient-to-br from-orange-500 to-yellow-500" }
];

export const flashCards = [
  {
    id: 1,
    category: "projects",
    icon: "📖",
    gradient: "from-violet-500 via-fuchsia-500 to-cyan-500",
    glow: "shadow-violet-500/40",
    tag: "Readora · 2026",
    front: "What did Moaaz build with Readora?",
    back: "An Arabic-first AI reading platform with progress tracking, file uploads, and gamification — shipped with Next.js, OpenAI, PostgreSQL, and Prisma."
  },
  {
    id: 2,
    category: "projects",
    icon: "🌌",
    gradient: "from-indigo-500 via-violet-500 to-purple-500",
    glow: "shadow-indigo-500/40",
    tag: "GitHub Universe · 2026",
    front: "What is Moaaz's GitHub Universe project?",
    back: "An interactive 3D developer portfolio that transforms a GitHub profile into a visual identity — built with Next.js, Three.js, and the GitHub REST API."
  },
  {
    id: 3,
    category: "impact",
    icon: "⏱️",
    gradient: "from-amber-500 via-orange-500 to-rose-500",
    glow: "shadow-amber-500/40",
    tag: "Regression · 85% ↓",
    front: "How much did Moaaz cut regression testing time?",
    back: "From 8 hours down to 1 hour — an 85% reduction — by building parallel Playwright & Cypress suites wired into CI/CD quality gates."
  },
  {
    id: 4,
    category: "impact",
    icon: "🐛",
    gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
    glow: "shadow-rose-500/40",
    tag: "Bug Graveyard",
    front: "What's Moaaz's pre-production bug track record?",
    back: "500+ bugs caught before release — checkout memory leaks, payment gateway race conditions, XSS in profile uploads — with zero P0 defects escaped in the last 12 months."
  },
  {
    id: 5,
    category: "automation",
    icon: "🤖",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    glow: "shadow-emerald-500/40",
    tag: "92% Automated",
    front: "What automation coverage has Moaaz achieved?",
    back: "92% of critical user journeys automated in TypeScript frameworks, with flaky tests reduced to under 1% using custom retries, API mocks, and Playwright trace debugging."
  },
  {
    id: 6,
    category: "automation",
    icon: "🌲",
    gradient: "from-green-500 via-emerald-500 to-teal-500",
    glow: "shadow-green-500/40",
    tag: "Cypress Repo",
    front: "What does automation-exercise-cypress showcase?",
    back: "Moaaz's public repo fully testing Automation Exercise Challenges — UI and API layers — demonstrating production-grade Cypress patterns and test architecture."
  },
  {
    id: 7,
    category: "career",
    icon: "🧪",
    gradient: "from-teal-500 via-emerald-500 to-lime-500",
    glow: "shadow-teal-500/40",
    tag: "Since 2022",
    front: "Where did Moaaz's deep testing journey begin?",
    back: "A focused dive into Cucumber BDD, Cypress, blockchain testing, and distributed systems frameworks — the foundation that shaped his Senior QA Engineer path."
  },
  {
    id: 8,
    category: "ai-devops",
    icon: "🧠",
    gradient: "from-sky-500 via-blue-500 to-indigo-500",
    glow: "shadow-sky-500/40",
    tag: "AI & DevOps · 2024",
    front: "What did Moaaz explore in AI & DevOps during 2024?",
    back: "AI agents with khoj (GPT, Claude, Gemini, Llama, Qwen) and container workflows via lazydocker — applying a QA engineer's rigor to emerging AI and infra tooling."
  },
  {
    id: 9,
    category: "projects",
    icon: "🏗️",
    gradient: "from-sky-500 via-indigo-500 to-violet-500",
    glow: "shadow-sky-500/40",
    tag: "Provider · 2025",
    front: "What did Moaaz ship in his Provider projects?",
    back: "TypeScript-first provider and infrastructure projects that hardened his full-stack skills — the same engineering discipline he brings to test automation architecture."
  },
  {
    id: 10,
    category: "cicd",
    icon: "🔄",
    gradient: "from-fuchsia-500 via-violet-500 to-purple-500",
    glow: "shadow-fuchsia-500/40",
    tag: "CI/CD Pipeline",
    front: "How does Moaaz embed quality into the SDLC?",
    back: "GitHub Actions & Jenkins pipelines with Dockerized test environments, parallel Playwright E2E, Allure reports, Slack alerts, and deploy-blocking quality gates."
  },
  {
    id: 11,
    category: "career",
    icon: "📋",
    gradient: "from-cyan-500 via-emerald-500 to-green-500",
    glow: "shadow-cyan-500/40",
    tag: "ISTQB · Remote",
    front: "What defines Moaaz as a QA professional?",
    back: "ISTQB-certified Senior QA Engineer based in Egypt (GMT+2, remote-flexible), specializing in shift-left testing across E2E, API, performance, and mobile layers."
  },
  {
    id: 12,
    category: "career",
    icon: "🏆",
    gradient: "from-orange-500 via-yellow-500 to-amber-500",
    glow: "shadow-orange-500/40",
    tag: "Recruiter Easter Egg",
    front: "Found the hidden recruiter easter egg?",
    back: "Promo code BUGFREE2026 — email moaaz.adel.m@gmail.com with it for a guaranteed 24-hour response and a free 30-minute QA architecture consultation."
  }
];