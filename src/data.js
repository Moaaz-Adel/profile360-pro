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
    front: "I built Readora — an Arabic-first AI reading platform",
    back: "Shipped in 2026 with Next.js, OpenAI, PostgreSQL, and Prisma. Added progress tracking, file uploads, and gamification — designed for Arabic readers who want a modern, AI-powered learning experience."
  },
  {
    id: 2,
    category: "projects",
    icon: "🌌",
    gradient: "from-indigo-500 via-violet-500 to-purple-500",
    glow: "shadow-indigo-500/40",
    tag: "GitHub Universe · 2026",
    front: "I created GitHub Universe — my interactive 3D portfolio",
    back: "Combined Next.js, Three.js, and the GitHub REST API to turn a developer profile into a visual identity. Built to stand out to recruiters and showcase engineering creativity beyond a static README."
  },
  {
    id: 3,
    category: "impact",
    icon: "⏱️",
    gradient: "from-amber-500 via-orange-500 to-rose-500",
    glow: "shadow-amber-500/40",
    tag: "Regression · 85% ↓",
    front: "I reduced regression testing from 8 hours to 1",
    back: "An 85% cut in release-cycle testing time. Achieved by designing parallel Playwright and Cypress suites integrated into CI/CD pipelines with deploy-blocking quality gates."
  },
  {
    id: 4,
    category: "impact",
    icon: "🐛",
    gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
    glow: "shadow-rose-500/40",
    tag: "Bug Graveyard",
    front: "I've intercepted 500+ bugs before they reached users",
    back: "Caught checkout memory leaks, payment gateway race conditions, and XSS in profile uploads. Zero P0 defects escaped to production in the last 12 months — that's my Bug Graveyard record."
  },
  {
    id: 5,
    category: "automation",
    icon: "🤖",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    glow: "shadow-emerald-500/40",
    tag: "92% Automated",
    front: "I automated 92% of critical user journeys",
    back: "Built TypeScript test frameworks covering web and API layers. Drove flaky test rate below 1% using custom retries, API mocks, and Playwright trace-based root-cause analysis."
  },
  {
    id: 6,
    category: "automation",
    icon: "🌲",
    gradient: "from-green-500 via-emerald-500 to-teal-500",
    glow: "shadow-green-500/40",
    tag: "Open Source",
    front: "I open-sourced full Cypress UI + API test coverage",
    back: "My automation-exercise-cypress repo on GitHub fully tests Automation Exercise Challenges — both UI and API — demonstrating how I architect production-grade E2E automation from scratch."
  },
  {
    id: 7,
    category: "career",
    icon: "🧪",
    gradient: "from-teal-500 via-emerald-500 to-lime-500",
    glow: "shadow-teal-500/40",
    tag: "Since 2022",
    front: "Since 2022, I've specialized in test engineering",
    back: "Deep expertise in Cucumber BDD, Cypress, blockchain testing, and distributed systems frameworks. This is where I evolved from executing tests to architecting quality systems."
  },
  {
    id: 8,
    category: "ai-devops",
    icon: "🧠",
    gradient: "from-sky-500 via-blue-500 to-indigo-500",
    glow: "shadow-sky-500/40",
    tag: "AI & DevOps · 2024",
    front: "In 2024, I explored AI agents and DevOps workflows",
    back: "Worked with khoj integrating GPT, Claude, Gemini, Llama, and Qwen. Used lazydocker for container management — applying QA rigor to emerging AI and infrastructure tooling."
  },
  {
    id: 9,
    category: "projects",
    icon: "🏗️",
    gradient: "from-sky-500 via-indigo-500 to-violet-500",
    glow: "shadow-sky-500/40",
    tag: "Provider · 2025",
    front: "In 2025, I shipped TypeScript infrastructure projects",
    back: "Built provider and infrastructure projects that strengthened my full-stack engineering. The same architectural discipline I bring when designing scalable test automation frameworks."
  },
  {
    id: 10,
    category: "cicd",
    icon: "🔄",
    gradient: "from-fuchsia-500 via-violet-500 to-purple-500",
    glow: "shadow-fuchsia-500/40",
    tag: "CI/CD Pipeline",
    front: "I embed quality gates into every release pipeline",
    back: "Designed GitHub Actions and Jenkins workflows with Dockerized test environments, parallel Playwright E2E, Allure reporting, Slack alerts, and hard blocks on failed deploys."
  },
  {
    id: 11,
    category: "career",
    icon: "📋",
    gradient: "from-cyan-500 via-emerald-500 to-green-500",
    glow: "shadow-cyan-500/40",
    tag: "ISTQB · Remote",
    front: "I'm an ISTQB-certified Senior QA Engineer",
    back: "Remote from Egypt (GMT+2, flexible globally). I practice shift-left testing across E2E, API, performance, and mobile — engineering quality pipelines, not just writing test cases."
  },
  {
    id: 12,
    category: "career",
    icon: "🏆",
    gradient: "from-orange-500 via-yellow-500 to-amber-500",
    glow: "shadow-orange-500/40",
    tag: "Let's Connect",
    front: "Recruiters — you found my hidden card",
    back: "Email me at moaaz.adel.m@gmail.com with code BUGFREE2026 for a guaranteed 24-hour response and a free 30-minute QA architecture consultation for your team."
  }
];