export const LINKEDIN_URL = "https://www.linkedin.com/in/moaz-moharam/";
export const CALENDLY_URL = "https://calendly.com/moaaz-adel";
export const EMAIL = "moaaz.adel.m@gmail.com";
export const WHATSAPP_URL = "https://wa.me/201014074200";

export const caseStudies = [
  {
    id: "regression",
    title: "Regression: 8 Hours → 1 Hour",
    emoji: "⏱️",
    gradient: "from-amber-500 to-rose-500",
    problem: "Manual regression blocked every release — 8-hour cycles, missed Friday deploys, team burnout.",
    approach: "Parallel Playwright + Cypress suites, Dockerized CI runners, API mocks for flaky third parties, shard-by-feature strategy.",
    stack: ["Playwright", "Cypress", "GitHub Actions", "Docker", "Allure"],
    metrics: [
      { label: "Time saved", value: "85%" },
      { label: "Flaky rate", value: "<1%" },
      { label: "Coverage", value: "92%" }
    ],
    outcome: "Release confidence restored. Quality gates now block bad deploys instead of slowing good ones."
  },
  {
    id: "cypress-repo",
    title: "automation-exercise-cypress",
    emoji: "🌲",
    gradient: "from-emerald-500 to-cyan-500",
    problem: "Team needed a reference architecture for full UI + API test coverage on a real e-commerce app.",
    approach: "Page Object Model, API interceptors, custom commands, CI matrix across browsers, negative path suites.",
    stack: ["Cypress", "TypeScript", "REST Assured patterns", "GitHub Actions"],
    metrics: [
      { label: "UI scenarios", value: "40+" },
      { label: "API tests", value: "25+" },
      { label: "Run time", value: "12 min" }
    ],
    outcome: "Open-sourced on GitHub — now used as onboarding material for new QA hires."
  },
  {
    id: "readora-qa",
    title: "Readora QA Strategy",
    emoji: "📖",
    gradient: "from-violet-500 to-fuchsia-500",
    problem: "Arabic-first AI reading app with RTL layouts, file uploads, AI responses, and gamification — high regression risk.",
    approach: "RTL visual regression, AI response contract tests, upload boundary testing, progress-state machine validation.",
    stack: ["Next.js", "Playwright", "PostgreSQL", "OpenAI API", "Prisma"],
    metrics: [
      { label: "Critical flows", value: "18" },
      { label: "AI edge cases", value: "30+" },
      { label: "RTL checks", value: "100%" }
    ],
    outcome: "Shipped with confidence — zero P0 defects in first 3 release cycles."
  }
];

export const pipelineSteps = [
  { id: "commit", icon: "👨‍💻", label: "Developer Commit", tool: "Git / PR", color: "from-slate-600 to-slate-800" },
  { id: "ci", icon: "🔄", label: "CI Trigger", tool: "GitHub Actions", color: "from-violet-600 to-purple-600" },
  { id: "docker", icon: "🐳", label: "Test Environment", tool: "Docker Compose", color: "from-blue-600 to-cyan-600" },
  { id: "unit", icon: "🧪", label: "Unit & Component", tool: "Jest / Vitest", color: "from-emerald-600 to-teal-600" },
  { id: "e2e", icon: "🌐", label: "E2E + API", tool: "Playwright / Cypress", color: "from-cyan-600 to-blue-600" },
  { id: "gate", icon: "🚦", label: "Quality Gate", tool: "Allure + Thresholds", color: "from-amber-600 to-orange-600" },
  { id: "deploy", icon: "🚀", label: "Deploy", tool: "Staging → Prod", color: "from-emerald-600 to-green-600" },
  { id: "alert", icon: "📊", label: "Fail → Alert", tool: "Slack + Report", color: "from-rose-600 to-red-600" }
];

export const bugGraveyard = [
  { id: 1, title: "Checkout memory leak", severity: "P0", category: "Performance", caught: "Staging", impact: "15% cart abandonment prevented" },
  { id: 2, title: "Payment gateway race condition", severity: "P0", category: "API", caught: "Integration", impact: "Timeout handling added" },
  { id: 3, title: "XSS in profile image upload", severity: "P1", category: "Security", caught: "Staging", impact: "Input sanitization enforced" },
  { id: 4, title: "Flaky login — unawaited requests", severity: "P2", category: "Automation", caught: "CI", impact: "Auto-wait patterns adopted" },
  { id: 5, title: "RTL layout break on Arabic content", severity: "P1", category: "UI/UX", caught: "QA", impact: "Readora release saved" },
  { id: 6, title: "API rate-limit not handled", severity: "P1", category: "API", caught: "Load test", impact: "Retry + backoff implemented" }
];

export const toolOrbs = [
  { name: "Playwright", icon: "🎭", level: 95, note: "Cross-browser E2E, trace viewer, API mocking" },
  { name: "Cypress", icon: "🌲", level: 95, note: "Component testing, time-travel debugging" },
  { name: "k6", icon: "⚡", level: 85, note: "Load, stress, and spike testing" },
  { name: "Docker", icon: "🐳", level: 88, note: "Testcontainers, CI environments" },
  { name: "TypeScript", icon: "🔷", level: 92, note: "Type-safe test frameworks" },
  { name: "Postman", icon: "📮", level: 90, note: "API collections, contract tests" },
  { name: "GitHub Actions", icon: "⚙️", level: 88, note: "Parallel sharding, quality gates" },
  { name: "Allure", icon: "📊", level: 85, note: "Rich test reporting" }
];

export const services = [
  {
    id: "audit",
    icon: "🔍",
    title: "Test Automation Audit",
    description: "Review your existing framework, identify flaky patterns, and deliver a prioritized improvement roadmap.",
    price: "From $500",
    duration: "3–5 days"
  },
  {
    id: "cicd",
    icon: "🔄",
    title: "CI/CD Quality Gates",
    description: "Embed Playwright/Cypress into GitHub Actions or Jenkins with deploy-blocking gates and Slack alerts.",
    price: "From $800",
    duration: "1–2 weeks"
  },
  {
    id: "k6",
    icon: "⚡",
    title: "Performance Baseline (k6)",
    description: "Define SLOs, build load test scripts, and set up Grafana dashboards for pre-release performance gates.",
    price: "From $600",
    duration: "1 week"
  },
  {
    id: "consult",
    icon: "💬",
    title: "QA Architecture Consult",
    description: "30–60 min strategy session — test pyramid design, tool selection, and team onboarding plan.",
    price: "Free w/ BUGFREE2026",
    duration: "30 min"
  }
];

export const compareRows = [
  { feature: "Critical journey automation", typical: "Manual-heavy", moaaz: "92% automated" },
  { feature: "Regression cycle time", typical: "4–8 hours", moaaz: "1 hour" },
  { feature: "CI/CD integration", typical: "Afterthought", moaaz: "Deploy-blocking gates" },
  { feature: "Flaky test rate", typical: "5–15%", moaaz: "<1%" },
  { feature: "Pre-production bugs caught", typical: "Ad-hoc", moaaz: "500+ systematically" },
  { feature: "P0 escaped to prod (12 mo)", typical: "1–3", moaaz: "Zero" },
  { feature: "Performance testing", typical: "Optional", moaaz: "k6 SLO gates" },
  { feature: "Certification", typical: "Varies", moaaz: "ISTQB Certified" }
];

export const certifications = [
  { name: "Generative AI Leader Certification", issuer: "Google", year: "2026", verify: "#", icon: "🧠" },
  { name: "GenAI & AI Agents for QA Automation", issuer: "Copilot & Claude", year: "2026", verify: "#", icon: "✨" },
  { name: "Performance Test Specialist", issuer: "ISTQB", year: "2022", verify: "#", icon: "⚡" },
  { name: "Mobile Application Testing", issuer: "ISTQB · Foundation Level", year: "2021", verify: "#", icon: "📱" },
  { name: "Test Automation Engineer", issuer: "ISTQB · Advanced Level", year: "2021", verify: "#", icon: "🤖" },
  { name: "Certified Agile Tester", issuer: "ISTQB · Foundation Level", year: "2020", verify: "#", icon: "🔄" },
  { name: "Certified Tester", issuer: "ISTQB · Foundation Level", year: "2018", verify: "#", icon: "📋" },
  { name: "Test Automation University", issuer: "Technical, Automation & Management", year: "", verify: "https://bit.ly/3H8VJnv", icon: "🎓" }
];

export const experienceData = [
  {
    id: "finjourney",
    company: "FinJourney",
    type: "Part-Time / Freelance",
    role: "Senior Quality Engineer",
    period: "2024 — Present",
    location: "Ireland, Remote",
    industries: ["Fintech", "Digital Transformation"],
    icon: "💳",
    current: true,
    bullets: [
      "Own functional and non-functional test planning for fintech products, aligning coverage with risk, user journeys, and release goals.",
      "Built maintainable Playwright automation that cut manual testing effort by 60%, freeing capacity for exploratory and risk-based testing.",
      "Embedded automated checks into GitHub Actions on every pull request, plus nightly regression runs to catch issues earlier.",
      "Automated k6 load, stress, and spike tests to surface performance bottlenecks before release."
    ],
    tech: ["Playwright", "TypeScript", "GitHub Actions", "k6", "CI/CD"]
  },
  {
    id: "jobsity",
    company: "Jobsity LLC",
    type: "Full-Time · Client: Zebra Technologies",
    role: "Senior Quality Engineer",
    period: "2023 — 2024",
    location: "US, Remote",
    industries: ["Digital Transformation"],
    icon: "🦓",
    bullets: [
      "Delivered quality engineering for a client-facing low-code/no-code platform, turning specs and user stories into full test coverage.",
      "Designed risk-based test scenarios across core functionality, end-to-end workflows, and data integrity.",
      "Balanced manual and automated testing to validate behavior efficiently and give delivery teams fast feedback.",
      "Ran exploratory testing to catch defects and usability issues scripted coverage missed."
    ]
  },
  {
    id: "iotblue-senior",
    company: "IoTBlue",
    type: "Full-Time",
    role: "Senior Quality Engineer",
    period: "2019 — 2023",
    location: "Egypt & Spain",
    industries: ["IoT Ecosystems", "Security Operations (SOC)", "Industrial Solutions"],
    icon: "📡",
    promoted: true,
    bullets: [
      "Owned test planning and automation strategy across the company's IoT and security product lines.",
      "Built testing processes from the ground up and led hiring, upskilling, and mentoring for a self-managed QA team.",
      "Drove CI/CD and continuous testing adoption, helping the team ship faster with more confidence.",
      "Guided agile, iterative development and ran knowledge-sharing sessions across the team."
    ]
  },
  {
    id: "iotblue-set1",
    company: "IoTBlue",
    type: "Full-Time",
    role: "Software Engineer in Test I",
    period: "2018 — 2019",
    location: "Egypt",
    industries: ["IoT Ecosystems", "Security Operations (SOC)", "Industrial Solutions"],
    icon: "🔧",
    bullets: [
      "Designed and executed test cases across HTTP, MQTT, and LoRaWAN protocols, plus UI and API layers.",
      "Applied shift-left testing to catch defects earlier in the development cycle.",
      "Ran functional, usability, and compatibility testing, translating business requirements into test strategy.",
      "Contributed to test plans alongside senior testers, covering risk, scope, and resourcing."
    ]
  }
];

export const educationData = [
  {
    degree: "Master's Degree in Software Testing and Quality Assurance",
    school: "University of Maryland Global Campus",
    period: "2019 — 2020",
    icon: "🎓"
  },
  {
    degree: "Bachelor's Degree in Computer Science",
    school: "Faculty of Computers and Artificial Intelligence",
    period: "2013 — 2017",
    icon: "🎓"
  }
];

export const talksAndArticles = [
  { title: "Cutting Flaky Tests Below 1%", type: "Article", year: "2025", link: "#" },
  { title: "Playwright vs Cypress — My Decision Framework", type: "Article", year: "2025", link: "#" },
  { title: "Building Quality Gates in GitHub Actions", type: "Talk", year: "2024", link: "#" },
  { title: "Shift-Left Testing for Startups", type: "Talk", year: "2024", link: "#" }
];

export const blogNotes = [
  {
    id: 1,
    slug: "flaky-tests",
    title: "How I Cut Flaky Tests Below 1%",
    excerpt: "Custom retries aren't enough — here's my 5-layer approach using traces, mocks, and CI sharding.",
    date: "Aug 2025",
    readTime: "6 min",
    tags: ["Playwright", "CI/CD"]
  },
  {
    id: 2,
    slug: "playwright-vs-cypress",
    title: "Playwright vs Cypress — When I Pick Which",
    excerpt: "A practical decision matrix based on 3 years of shipping both in production pipelines.",
    date: "Jul 2025",
    readTime: "8 min",
    tags: ["Playwright", "Cypress"]
  },
  {
    id: 3,
    slug: "k6-slo-gates",
    title: "k6 SLO Gates That Actually Block Bad Deploys",
    excerpt: "Setting p95 thresholds from real user flows, not arbitrary numbers.",
    date: "Jun 2025",
    readTime: "5 min",
    tags: ["k6", "Performance"]
  },
  {
    id: 4,
    slug: "shift-left-startups",
    title: "Shift-Left Testing for Startups on a Budget",
    excerpt: "Maximum quality ROI when you can't afford a 10-person QA team.",
    date: "May 2025",
    readTime: "7 min",
    tags: ["Strategy", "CI/CD"]
  }
];

export const openSourceRepos = [
  { name: "automation-exercise-cypress", url: "https://github.com/Moaaz-Adel/automation-exercise-cypress", skill: "Cypress E2E", stars: "⭐" },
  { name: "readora", url: "https://github.com/Moaaz-Adel/readora", skill: "Next.js + AI", stars: "⭐" },
  { name: "github-universe", url: "https://github.com/Moaaz-Adel/github-universe", skill: "Three.js", stars: "⭐" },
  { name: "profile360-pro", url: "https://github.com/Moaaz-Adel/profile360-pro", skill: "React Portfolio", stars: "⭐" },
  { name: "provider", url: "https://github.com/Moaaz-Adel/provider", skill: "TypeScript", stars: "⭐" }
];

export const availabilitySlots = [
  { day: "Mon", slots: ["10:00 AM", "2:00 PM"], open: true },
  { day: "Tue", slots: ["11:00 AM", "3:00 PM"], open: true },
  { day: "Wed", slots: ["10:00 AM"], open: true },
  { day: "Thu", slots: ["2:00 PM", "4:00 PM"], open: true },
  { day: "Fri", slots: ["10:00 AM"], open: true },
  { day: "Sat", slots: [], open: false },
  { day: "Sun", slots: [], open: false }
];

export const qaLabMetrics = {
  flakyRate: 0.8,
  automationRate: 92,
  bugsCaught: 500,
  pipelineStatus: "passing",
  lastRun: "12 min ago",
  coverage: { unit: 78, integration: 65, e2e: 92 }
};

export const resumeVariants = {
  qa: {
    label: "Senior QA Engineer",
    summary: "ISTQB-certified Senior QA Engineer specializing in Playwright, Cypress, and CI/CD quality gates. 500+ pre-production bugs caught, 85% regression reduction.",
    highlights: ["E2E & API Automation", "CI/CD Quality Gates", "Performance Testing (k6)", "Shift-Left Strategy"]
  },
  sdet: {
    label: "SDET / Test Automation Architect",
    summary: "Test Automation Architect building TypeScript frameworks from scratch. 92% critical journey coverage, flaky rate under 1%, open-source Cypress reference repos.",
    highlights: ["Framework Architecture", "Playwright + Cypress", "Docker / Testcontainers", "Allure Reporting"]
  },
  consultant: {
    label: "QA Consultant",
    summary: "Independent QA consultant helping teams embed quality into the SDLC. Audits, pipeline setup, k6 performance baselines, and team onboarding.",
    highlights: ["Automation Audits", "Pipeline Design", "Team Training", "Performance SLOs"]
  }
};

export const breakDemoFields = [
  { id: "email", label: "Email", type: "text", bug: "No validation — accepts 'not-an-email'" },
  { id: "age", label: "Age", type: "number", bug: "Accepts negative numbers and 99999" },
  { id: "password", label: "Password", type: "password", bug: "No minimum length — '1' is accepted" }
];
