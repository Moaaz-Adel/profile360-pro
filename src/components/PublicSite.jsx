import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from "recharts";
import {
  skillBars,
  radarData,
  timelineData,
  testimonials,
  growthArea,
  trafficArea,
  techPie,
  achievementBar,
  GITHUB_URL,
  autoGradients,
  getRepoEmoji
} from "../data";

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 }
};

const tooltipStyle = {
  background: "rgba(15, 23, 42, 0.92)",
  border: "1px solid rgba(148, 163, 184, 0.25)",
  borderRadius: 12,
  color: "#fff"
};

// 🆕 QA-Focused Filters
const filters = [
  { label: "All", value: "all" },
  { label: "Automation", value: "automation" },
  { label: "API Testing", value: "api" },
  { label: "Performance", value: "performance" },
  { label: "Mobile", value: "mobile" },
  { label: "CI/CD", value: "cicd" }
];

// 🆕 QA-Focused Typing Roles
const roles = [
  "Senior QA Engineer",
  "Test Automation Architect",
  "Playwright & Cypress Expert",
  "API Testing Specialist",
  "Quality Assurance Leader"
];

function Section({ id, className = "", children }) {
  return (
    <section id={id} className={`mx-auto w-[min(1160px,calc(100%-2rem))] py-20 ${className}`}>
      {children}
    </section>
  );
}

function Panel({ children, className = "" }) {
  return (
    <div
      className={`rounded-[28px] border border-slate-200/70 bg-white/70 p-7 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-white/5 ${className}`}
    >
      {children}
    </div>
  );
}

function SectionHead({ eyebrow, title }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55 }}
      className="mb-10"
    >
      <span className="mb-3 inline-block text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
        {eyebrow}
      </span>
      <h2 className="font-display text-3xl font-bold md:text-5xl">{title}</h2>
    </motion.div>
  );
}

function Chip({ children }) {
  return (
    <span className="rounded-full border border-slate-200/70 bg-white/70 px-3 py-1.5 text-sm font-semibold text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
      {children}
    </span>
  );
}

function Counter({ value, suffix = "" }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const duration = 1500;
        const target = Number(value) || 0;
        const start = performance.now();

        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.floor(target * eased));

          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            setDisplay(target);
          }
        }

        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.35 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

function TypingRoles() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[index];

    if (!deleting && subIndex < current.length) {
      const timeout = setTimeout(() => {
        setText(current.slice(0, subIndex + 1));
        setSubIndex(subIndex + 1);
      }, 80);

      return () => clearTimeout(timeout);
    }

    if (!deleting && subIndex === current.length) {
      const timeout = setTimeout(() => {
        setDeleting(true);
      }, 1400);

      return () => clearTimeout(timeout);
    }

    if (deleting && subIndex > 0) {
      const timeout = setTimeout(() => {
        setText(current.slice(0, subIndex - 1));
        setSubIndex(subIndex - 1);
      }, 45);

      return () => clearTimeout(timeout);
    }

    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((index + 1) % roles.length);
    }
  }, [subIndex, deleting, index]);

  return (
    <span>
      {text}
      <span className="animate-pulse text-emerald-500">|</span>
    </span>
  );
}

export default function PublicSite({
  theme,
  setTheme,
  user,
  projects,
  views,
  addMessage,
  showToast,
  onLoginClick,
  onAdminClick,
  github
}) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  // Merge GitHub repos with local projects
  const visibleProjects = (() => {
    const source = github?.data?.featured?.length
      ? github.data.featured.map((repo, index) => ({
          id: `gh-${repo.id}`,
          title: repo.name,
          description:
            repo.description ||
            `A ${repo.language || "code"} project with ${repo.forks_count || 0} forks and ${repo.stargazers_count || 0} stars.`,
          categories: [repo.language?.toLowerCase() || "automation", repo.topics?.[0] || "e2e"].filter(Boolean),
          tags: [
            repo.language,
            ...(repo.topics || []).slice(0, 2),
            `${repo.stargazers_count} ⭐`
          ].filter(Boolean),
          emoji: getRepoEmoji(repo.language),
          gradient: autoGradients[index % autoGradients.length],
          featured: true,
          githubUrl: repo.html_url,
          language: repo.language
        }))
      : projects;

    return source.filter((project) => {
      const cats = (project.categories || []).map((c) => c.toLowerCase());
      return (
        activeFilter === "all" ||
        cats.includes(activeFilter)
      );
    });
  })();

  // Use live GitHub languages if available, otherwise fallback to techPie
  const languageData = github?.data?.languages?.length
    ? github.data.languages
    : techPie;

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 6500);

    return () => clearInterval(interval);
  }, []);

  function handleFormChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function handleContactSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      showToast("Please fill in all fields.");
      return;
    }

    addMessage(form);
    setForm({
      name: "",
      email: "",
      message: ""
    });

    showToast("Message sent successfully ✨");
  }

  return (
    <div className="overflow-x-clip">
      <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/75 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/75">
        <div className="mx-auto flex w-[min(1200px,calc(100%-2rem))] items-center justify-between py-4">
          <a href="#home" className="font-display text-xl font-bold">
            Moaaz
            <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
              .QA
            </span>
          </a>

          <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-600 dark:text-slate-300 lg:flex">
            <a href="#about" className="transition hover:text-emerald-500">About</a>
            <a href="#skills" className="transition hover:text-emerald-500">Skills</a>
            <a href="#projects" className="transition hover:text-emerald-500">Projects</a>
            <a href="#timeline" className="transition hover:text-emerald-500">Timeline</a>
            <a href="#analytics" className="transition hover:text-emerald-500">Analytics</a>
            <a href="#contact" className="transition hover:text-emerald-500">Contact</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-2.5 text-sm font-bold dark:border-white/10 dark:bg-white/5"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>

            {user ? (
              <button
                onClick={onAdminClick}
                className="rounded-2xl bg-gradient-to-r from-emerald-600 to-cyan-500 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/25 transition hover:-translate-y-0.5"
              >
                Dashboard
              </button>
            ) : (
              <button
                onClick={onLoginClick}
                className="rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-2.5 text-sm font-bold dark:border-white/10 dark:bg-white/5"
              >
                Admin
              </button>
            )}
          </div>
        </div>
      </header>

      <main>
        <Section id="home" className="pt-24">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.08
                }
              }
            }}
          >
            <motion.div
              variants={item}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/70 px-4 py-2 text-sm font-bold text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
            >
              ✨ Senior QA Engineer & Test Automation Architect
            </motion.div>

            <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
              <motion.div variants={item}>
                <p className="mb-3 font-bold text-emerald-600 dark:text-emerald-400">
                  Hello, I am
                </p>

                <h1 className="font-display text-5xl font-extrabold leading-[0.98] md:text-7xl">
                  {github?.data?.user?.name || "Moaaz Adel"}
                </h1>

                <h2 className="mt-4 min-h-[2.8rem] text-xl font-semibold text-slate-600 dark:text-slate-300 md:text-2xl">
                  <TypingRoles />
                </h2>

                <p className="mt-6 max-w-2xl leading-8 text-slate-600 dark:text-slate-300">
                  I build robust test automation frameworks, ensure software excellence, and deliver bug-free experiences at scale. Specializing in Playwright, Cypress, and CI/CD pipeline integration.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="#projects"
                    className="rounded-2xl bg-gradient-to-r from-emerald-600 to-cyan-500 px-5 py-3.5 font-bold text-white shadow-lg shadow-emerald-500/25 transition hover:-translate-y-1"
                  >
                    🚀 View Automation Projects
                  </a>

                  <a
                    href="#contact"
                    className="rounded-2xl border border-slate-200/70 bg-white/70 px-5 py-3.5 font-bold dark:border-white/10 dark:bg-white/5"
                  >
                    💬 Discuss QA Strategy
                  </a>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  {["GitHub", "LinkedIn", "Email", "Resume"].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-3 text-sm font-bold text-slate-600 transition hover:-translate-y-1 hover:border-emerald-400 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                    >
                      {social}
                    </a>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={item}>
                <Panel className="relative overflow-hidden text-center">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500" />

                  {github?.data?.user?.avatar_url ? (
                    <img
                      src={github.data.user.avatar_url}
                      alt={github.data.user.name || github.data.user.login}
                      className="mx-auto mb-5 h-28 w-28 rounded-[32px] object-cover shadow-2xl shadow-emerald-500/30 ring-4 ring-white/10"
                    />
                  ) : (
                    <div className="mx-auto mb-5 grid h-28 w-28 place-items-center rounded-[32px] bg-gradient-to-br from-emerald-600 to-cyan-500 text-3xl font-extrabold text-white shadow-2xl shadow-emerald-500/30">
                      {github?.loading ? "…" : "MA"}
                    </div>
                  )}

                  <h3 className="font-display text-2xl font-bold">
                    {github?.data?.user?.name || "Moaaz Adel"}
                  </h3>

                  {github?.data?.user?.login && (
                    <a
                      href={GITHUB_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 inline-block text-sm text-slate-500 transition hover:text-emerald-500 dark:text-slate-400"
                    >
                      @{github.data.user.login}
                    </a>
                  )}

                  <p className="mt-3 text-slate-600 dark:text-slate-300">
                    Senior QA Engineer | Remote Worldwide
                  </p>

                  <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-4 py-2 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-500" />
                    Open to Senior QA / Lead Roles
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-3">
                    <div className="rounded-3xl border border-slate-200/70 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
                      <strong className="block text-xl">
                        <Counter value={github?.data?.user?.public_repos || 0} />
                      </strong>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        Repos
                      </span>
                    </div>

                    <div className="rounded-3xl border border-slate-200/70 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
                      <strong className="block text-xl">
                        <Counter value={github?.data?.followers || 0} />
                      </strong>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        Followers
                      </span>
                    </div>

                    <div className="rounded-3xl border border-slate-200/70 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
                      <strong className="block text-xl">
                        <Counter value={github?.data?.totalStars || 0} />
                      </strong>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        Stars
                      </span>
                    </div>
                  </div>

                  <div className="mt-5">
                    <a
                      href={GITHUB_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-1 dark:bg-white dark:text-slate-900"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.83.58A12 12 0 0024 12c0-6.63-5.37-12-12-12z"/>
                      </svg>
                      View on GitHub
                    </a>
                  </div>
                </Panel>
              </motion.div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <Panel>
                <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-3xl font-extrabold text-transparent">
                  <Counter value={views} />
                </div>
                <p className="mt-2 text-slate-600 dark:text-slate-300">Profile Views</p>
              </Panel>

              <Panel>
                <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-3xl font-extrabold text-transparent">
                  <Counter value={500} suffix="+" />
                </div>
                <p className="mt-2 text-slate-600 dark:text-slate-300">Bugs Caught</p>
              </Panel>

              <Panel>
                <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-3xl font-extrabold text-transparent">
                  <Counter value={8500} suffix="+" />
                </div>
                <p className="mt-2 text-slate-600 dark:text-slate-300">Tests Automated</p>
              </Panel>

              <Panel>
                <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-3xl font-extrabold text-transparent">
                  <Counter value={2400} suffix="h" />
                </div>
                <p className="mt-2 text-slate-600 dark:text-slate-300">Manual Hours Saved</p>
              </Panel>
            </div>

            {/* GitHub Live Stats */}
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <Panel>
                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-500/15 text-xl text-emerald-500">
                    💻
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Top Language</p>
                    <p className="font-bold">
                      {github?.data?.languages?.[0]?.name || "TypeScript"}
                    </p>
                  </div>
                </div>
              </Panel>

              <Panel>
                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-500/15 text-xl text-cyan-500">
                    📅
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">On GitHub</p>
                    <p className="font-bold">{github?.data?.accountAge || "3"} years</p>
                  </div>
                </div>
              </Panel>

              <Panel>
                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-500/15 text-xl text-blue-500">
                    🏷️
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Focus Areas</p>
                    <p className="font-bold">
                      {github?.data?.topTopics?.length || 0} active topics
                    </p>
                  </div>
                </div>
              </Panel>
            </div>
          </motion.div>
        </Section>

        <Section id="about">
          <SectionHead eyebrow="About Me" title="Quality Assurance Overview" />

          <div className="grid gap-6 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <Panel className="h-full">
                <h3 className="mb-4 font-display text-xl font-bold">Who I Am</h3>

                <p className="leading-8 text-slate-600 dark:text-slate-300">
                  I am a Senior QA Engineer with deep expertise in building scalable test automation frameworks, designing comprehensive testing strategies, and ensuring software quality across web, mobile, and API layers. I specialize in transforming manual testing processes into automated, CI/CD-integrated pipelines.
                </p>

                <div className="mt-6 grid gap-4">
                  {[
                    {
                      icon: "🤖",
                      title: "Automation Architect",
                      text: "Design and implement Playwright, Cypress, and Selenium frameworks from scratch."
                    },
                    {
                      icon: "🔄",
                      title: "CI/CD Integration",
                      text: "Embed testing into GitHub Actions, Jenkins, and GitLab pipelines with quality gates."
                    },
                    {
                      icon: "📊",
                      title: "Quality Metrics",
                      text: "Track test coverage, defect density, automation ROI, and flaky test reduction."
                    }
                  ].map((feature) => (
                    <div
                      key={feature.title}
                      className="flex items-start gap-4 rounded-3xl border border-slate-200/70 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5"
                    >
                      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-emerald-600/20 to-cyan-500/20 text-xl">
                        {feature.icon}
                      </div>

                      <div>
                        <h4 className="font-bold">{feature.title}</h4>
                        <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                          {feature.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-2.5">
                  <Chip>E2E Testing</Chip>
                  <Chip>API Testing</Chip>
                  <Chip>Performance</Chip>
                  <Chip>Shift-Left Testing</Chip>
                  <Chip>ISTQB Certified</Chip>
                </div>
              </Panel>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.08 }}
            >
              <Panel className="h-full">
                <h3 className="mb-4 font-display text-xl font-bold">QA Maturity Growth</h3>

                <div className="h-[340px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={growthArea}>
                      <CartesianGrid stroke="currentColor" strokeOpacity={0.12} />
                      <XAxis
                        dataKey="month"
                        tick={{ fill: "currentColor", fontSize: 12 }}
                      />
                      <YAxis tick={{ fill: "currentColor", fontSize: 12 }} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#06b6d4"
                        fill="rgba(6, 182, 212, 0.16)"
                        strokeWidth={3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Panel>
            </motion.div>
          </div>
        </Section>

        <Section id="skills">
          <SectionHead eyebrow="Skills" title="Testing & Automation Expertise" />

          <div className="grid gap-6 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <Panel className="h-full">
                <h3 className="mb-4 font-display text-xl font-bold">QA Skill Radar</h3>

                <div className="h-[340px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="currentColor" strokeOpacity={0.16} />
                      <PolarAngleAxis
                        dataKey="skill"
                        tick={{ fill: "currentColor", fontSize: 12 }}
                      />
                      <Radar
                        dataKey="value"
                        stroke="#10b981"
                        fill="#10b981"
                        fillOpacity={0.22}
                        strokeWidth={3}
                      />
                      <Tooltip contentStyle={tooltipStyle} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </Panel>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.08 }}
            >
              <Panel className="h-full">
                <h3 className="mb-6 font-display text-xl font-bold">Core Competencies</h3>

                <div className="grid gap-6">
                  {skillBars.map((skill) => (
                    <div key={skill.name}>
                      <div className="mb-2 flex items-center justify-between font-semibold">
                        <span>{skill.name}</span>
                        <span className="text-slate-500 dark:text-slate-400">
                          {skill.level}%
                        </span>
                      </div>

                      <div className="h-3 overflow-hidden rounded-full bg-slate-200/80 dark:bg-white/10">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true, amount: 0.6 }}
                          transition={{ duration: 1.1, ease: "easeOut" }}
                          className="h-3 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Panel>
            </motion.div>
          </div>
        </Section>

        <Section id="projects">
          <SectionHead eyebrow="Projects" title="Featured Frameworks & Tools" />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="mb-8 flex flex-wrap gap-3"
          >
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`rounded-full px-5 py-3 text-sm font-bold transition ${
                  activeFilter === filter.value
                    ? "bg-gradient-to-r from-emerald-600 to-cyan-500 text-white shadow-lg shadow-emerald-500/25"
                    : "border border-slate-200/70 bg-white/70 text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </motion.div>

          <motion.div layout className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visibleProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.35 }}
                >
                  <Panel className="h-full overflow-hidden p-0">
                    <div
                      className={`grid h-44 place-items-center text-5xl text-white ${project.gradient}`}
                    >
                      {project.emoji}
                    </div>

                    <div className="p-6">
                      <h3 className="font-display text-xl font-bold">{project.title}</h3>

                      <p className="mt-3 min-h-[84px] leading-7 text-slate-600 dark:text-slate-300">
                        {project.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {(project.tags || []).map((tag) => (
                          <Chip key={tag}>{tag}</Chip>
                        ))}
                      </div>

                      <div className="mt-6 flex gap-3">
                        {project.githubUrl ? (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-xl border border-slate-200/70 bg-white/70 px-4 py-2.5 text-sm font-bold transition hover:-translate-y-1 hover:border-emerald-500 dark:border-white/10 dark:bg-white/5"
                          >
                            ⭐ View on GitHub
                          </a>
                        ) : (
                          <a
                            href="#"
                            className="rounded-xl border border-slate-200/70 bg-white/70 px-4 py-2.5 text-sm font-bold dark:border-white/10 dark:bg-white/5"
                          >
                            Case Study
                          </a>
                        )}
                      </div>
                    </div>
                  </Panel>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </Section>

        <Section id="timeline">
          <SectionHead eyebrow="Journey" title="Career & QA Evolution" />

          <div className="relative mx-auto max-w-[860px] pl-8">
            <div className="absolute bottom-2 left-2 top-2 w-[3px] rounded-full bg-gradient-to-b from-emerald-500 via-cyan-500 to-blue-500 opacity-70" />

            {timelineData.map((timeline, index) => (
              <motion.div
                key={timeline.year}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: index * 0.04 }}
                className="relative pb-10 pl-10"
              >
                <span className="absolute left-[-5px] top-1.5 h-4 w-4 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-[0_0_0_7px_rgba(16,185,129,0.15)]" />

                <span className="mb-3 inline-block rounded-full border border-slate-200/70 bg-white/70 px-4 py-2 text-sm font-bold text-emerald-600 dark:border-white/10 dark:bg-white/5 dark:text-emerald-400">
                  {timeline.year}
                </span>

                <h3 className="font-display text-2xl font-bold">{timeline.title}</h3>

                <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
                  {timeline.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section id="analytics">
          <SectionHead eyebrow="Analytics" title="Quality & Testing Insights" />

          <div className="grid gap-6 xl:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <Panel className="h-full">
                <h3 className="mb-4 font-display text-xl font-bold">Test Execution Volume</h3>

                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trafficArea}>
                      <CartesianGrid stroke="currentColor" strokeOpacity={0.12} />
                      <XAxis dataKey="day" tick={{ fill: "currentColor", fontSize: 12 }} />
                      <YAxis tick={{ fill: "currentColor", fontSize: 12 }} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Area
                        type="monotone"
                        dataKey="visitors"
                        stroke="#10b981"
                        fill="rgba(16, 185, 129, 0.16)"
                        strokeWidth={3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Panel>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.08 }}
            >
              <Panel className="h-full">
                <h3 className="mb-4 font-display text-xl font-bold">Automation Stack</h3>

                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={languageData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius="58%"
                        outerRadius="82%"
                        paddingAngle={5}
                        label
                      >
                        {[
                          "#10b981",
                          "#06b6d4",
                          "#22c55e",
                          "#f59e0b",
                          "#ef4444"
                        ].map((color) => (
                          <Cell key={color} fill={color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={tooltipStyle} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Panel>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.16 }}
            >
              <Panel className="h-full">
                <h3 className="mb-4 font-display text-xl font-bold">QA Achievements</h3>

                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={achievementBar}>
                      <CartesianGrid stroke="currentColor" strokeOpacity={0.12} />
                      <XAxis dataKey="name" tick={{ fill: "currentColor", fontSize: 12 }} />
                      <YAxis tick={{ fill: "currentColor", fontSize: 12 }} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Bar dataKey="count" radius={12}>
                        {[
                          "#10b981",
                          "#06b6d4",
                          "#22c55e",
                          "#f59e0b",
                          "#ef4444"
                        ].map((color) => (
                          <Cell key={color} fill={color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Panel>
            </motion.div>
          </div>
        </Section>

        <Section id="testimonials">
          <SectionHead eyebrow="Testimonials" title="What Teams & Leaders Say" />

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-[860px]"
          >
            <Panel className="text-center">
              <div className="mb-6 font-display text-6xl text-emerald-500/70">“</div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={testimonialIndex}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.35 }}
                >
                  <p className="mx-auto max-w-[720px] text-xl leading-9 text-slate-700 dark:text-slate-200">
                    {testimonials[testimonialIndex].quote}
                  </p>

                  <h4 className="mt-7 text-lg font-bold">
                    {testimonials[testimonialIndex].author}
                  </h4>

                  <p className="mt-1 text-slate-500 dark:text-slate-400">
                    {testimonials[testimonialIndex].role}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 flex items-center justify-center gap-4">
                <button
                  onClick={() =>
                    setTestimonialIndex(
                      (testimonialIndex - 1 + testimonials.length) % testimonials.length
                    )
                  }
                  className="h-11 w-11 rounded-2xl border border-slate-200/70 bg-white/70 font-bold dark:border-white/10 dark:bg-white/5"
                >
                  ←
                </button>

                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setTestimonialIndex(index)}
                      className={`h-2.5 rounded-full transition-all ${
                        index === testimonialIndex
                          ? "w-8 bg-gradient-to-r from-emerald-500 to-cyan-500"
                          : "w-2.5 bg-slate-300 dark:bg-white/20"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() =>
                    setTestimonialIndex((testimonialIndex + 1) % testimonials.length)
                  }
                  className="h-11 w-11 rounded-2xl border border-slate-200/70 bg-white/70 font-bold dark:border-white/10 dark:bg-white/5"
                >
                  →
                </button>
              </div>
            </Panel>
          </motion.div>
        </Section>

        <Section id="contact">
          <SectionHead eyebrow="Contact" title="Let's Elevate Your QA Strategy" />

          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <Panel className="h-full">
                <h3 className="mb-6 font-display text-xl font-bold">Contact Information</h3>

                <div className="grid gap-5">
                  {[
                    {
                      icon: "📧",
                      title: "Email",
                      value: "moaaz.adel.m@gmail.com"
                    },
                    {
                      icon: "📱",
                      title: "Mobile",
                      value: "+2 010 1407 4200"
                    },
                    {
                      icon: "🌍",
                      title: "Location",
                      value: "Remote (Available Worldwide)"
                    },
                    {
                      icon: "💼",
                      title: "Open To",
                      value: "Senior QA, QA Lead, Test Automation Architect, Consulting"
                    }
                  ].map((contact) => (
                    <div
                      key={contact.title}
                      className="flex items-start gap-4 rounded-3xl border border-slate-200/70 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5"
                    >
                      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-emerald-600/20 to-cyan-500/20 text-xl">
                        {contact.icon}
                      </div>

                      <div>
                        <h4 className="font-bold">{contact.title}</h4>
                        <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                          {contact.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-2.5">
                  <Chip>ISTQB Certified</Chip>
                  <Chip>Remote Friendly</Chip>
                  <Chip>GMT+2 Timezone</Chip>
                  <Chip>Immediate Availability</Chip>
                </div>
              </Panel>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.08 }}
            >
              <Panel className="h-full">
                <h3 className="mb-6 font-display text-xl font-bold">Send a Message</h3>

                <form onSubmit={handleContactSubmit} className="grid gap-5">
                  <div>
                    <label className="mb-2 block font-semibold">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleFormChange}
                      placeholder="Enter your name"
                      className="w-full rounded-2xl border border-slate-300/70 bg-white/75 px-4 py-3.5 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15 dark:border-white/10 dark:bg-white/5"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block font-semibold">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleFormChange}
                      placeholder="Enter your email"
                      className="w-full rounded-2xl border border-slate-300/70 bg-white/75 px-4 py-3.5 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15 dark:border-white/10 dark:bg-white/5"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block font-semibold">Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleFormChange}
                      placeholder="Let's discuss your QA challenges..."
                      className="min-h-[160px] w-full resize-y rounded-2xl border border-slate-300/70 bg-white/75 px-4 py-3.5 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15 dark:border-white/10 dark:bg-white/5"
                    />
                  </div>

                  <button
                    type="submit"
                    className="rounded-2xl bg-gradient-to-r from-emerald-600 to-cyan-500 px-5 py-4 font-bold text-white shadow-lg shadow-emerald-500/25 transition hover:-translate-y-1"
                  >
                    Send Message ✨
                  </button>
                </form>
              </Panel>
            </motion.div>
          </div>
        </Section>
      </main>

      <footer className="border-t border-slate-200/60 py-10 text-center text-slate-500 dark:border-white/10 dark:text-slate-400">
        © 2026 Moaaz Adel | Senior QA Engineer. Built with React, Tailwind CSS, Framer Motion, and Recharts.
      </footer>
    </div>
  );
}