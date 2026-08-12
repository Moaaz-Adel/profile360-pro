import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  caseStudies,
  pipelineSteps,
  bugGraveyard,
  toolOrbs,
  services,
  compareRows,
  certifications,
  talksAndArticles,
  blogNotes,
  openSourceRepos,
  availabilitySlots,
  qaLabMetrics,
  resumeVariants,
  breakDemoFields,
  CALENDLY_URL,
  EMAIL,
  WHATSAPP_URL,
  LINKEDIN_URL
} from "../data/portfolioExtras";
import { GITHUB_URL } from "../data";

function SectionShell({ id, eyebrow, title, subtitle, children }) {
  return (
    <section id={id} className="mx-auto w-[min(1160px,calc(100%-2rem))] py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        className="mb-10"
      >
        <span className="mb-3 inline-block text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
          {eyebrow}
        </span>
        <h2 className="font-display text-3xl font-bold md:text-5xl">{title}</h2>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">{subtitle}</p>
        )}
      </motion.div>
      {children}
    </section>
  );
}

function Panel({ children, className = "" }) {
  return (
    <div className={`rounded-[28px] border border-slate-200/70 bg-white/70 p-7 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-white/5 ${className}`}>
      {children}
    </div>
  );
}

/* 11 — Availability strip */
export function AvailabilityStrip() {
  const openDays = availabilitySlots.filter((d) => d.open);
  const next = openDays[0];

  return (
    <div className="border-b border-emerald-500/20 bg-gradient-to-r from-emerald-500/10 via-cyan-500/5 to-violet-500/10 py-2.5">
      <div className="mx-auto flex w-[min(1160px,calc(100%-2rem))] flex-wrap items-center justify-center gap-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
        <span className="inline-flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          Available for intro calls
        </span>
        <span className="text-slate-400">·</span>
        <span>Next slot: {next?.day} {next?.slots[0]} GMT+2</span>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-emerald-600 px-4 py-1 text-white transition hover:bg-emerald-500"
        >
          Book 15 min →
        </a>
      </div>
    </div>
  );
}

/* 10 — Video intro placeholder */
export function VideoIntro({ terminalMode }) {
  const [open, setOpen] = useState(false);

  if (terminalMode) {
    return (
      <div className="mb-8 rounded-2xl border border-emerald-500/30 bg-slate-950 p-4 font-mono text-sm text-emerald-400">
        <p>$ moaaz --intro --format=video</p>
        <p className="mt-2 text-slate-400">[ Video intro loading... Press ⚡ FAB to connect ]</p>
      </div>
    );
  }

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.02 }}
        className="group relative mb-8 w-full overflow-hidden rounded-[28px] border border-slate-200/70 dark:border-white/10"
      >
        <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950">
          <div className="text-center">
            <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-white/10 text-3xl backdrop-blur transition group-hover:scale-110">
              ▶
            </div>
            <p className="font-display text-lg font-bold text-white">30-sec intro — Meet Moaaz</p>
            <p className="mt-1 text-sm text-slate-400">Senior QA Engineer · Test Automation Architect</p>
          </div>
        </div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl rounded-[28px] bg-slate-900 p-8 text-center text-white"
            >
              <p className="text-4xl">🎬</p>
              <h3 className="mt-4 font-display text-2xl font-bold">Video intro coming soon</h3>
              <p className="mt-2 text-slate-400">
                Meanwhile, book a live 15-min intro call or email me directly.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="rounded-2xl bg-emerald-600 px-5 py-3 font-bold">
                  WhatsApp Me
                </a>
                <a href={`mailto:${EMAIL}`} className="rounded-2xl border border-white/20 px-5 py-3 font-bold">
                  Email Me
                </a>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="mt-4 text-sm text-slate-500 hover:text-white">
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* 1 — Case Studies */
export function CaseStudiesSection() {
  const [active, setActive] = useState(caseStudies[0].id);
  const study = caseStudies.find((s) => s.id === active);

  return (
    <SectionShell
      id="case-studies"
      eyebrow="Deep Dives"
      title="Case Studies"
      subtitle="Real problems, real stacks, measurable outcomes — not vanity projects."
    >
      <div className="mb-6 flex flex-wrap gap-2">
        {caseStudies.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActive(s.id)}
            className={`rounded-full px-4 py-2.5 text-sm font-bold transition ${
              active === s.id
                ? "bg-gradient-to-r from-emerald-600 to-cyan-500 text-white shadow-lg"
                : "border border-slate-200/70 bg-white/70 dark:border-white/10 dark:bg-white/5"
            }`}
          >
            {s.emoji} {s.title}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={study.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
        >
          <Panel>
            <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
              <div>
                <h3 className="font-display text-2xl font-bold">{study.title}</h3>
                <div className="mt-6 space-y-4">
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-rose-500">Problem</h4>
                    <p className="mt-1 leading-7 text-slate-600 dark:text-slate-300">{study.problem}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-cyan-500">Approach</h4>
                    <p className="mt-1 leading-7 text-slate-600 dark:text-slate-300">{study.approach}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-500">Outcome</h4>
                    <p className="mt-1 leading-7 text-slate-600 dark:text-slate-300">{study.outcome}</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {study.stack.map((t) => (
                    <span key={t} className="rounded-full border border-slate-200/70 bg-white/70 px-3 py-1 text-sm font-semibold dark:border-white/10 dark:bg-white/5">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid gap-4">
                {study.metrics.map((m) => (
                  <div
                    key={m.label}
                    className={`rounded-3xl bg-gradient-to-br ${study.gradient} p-6 text-white shadow-xl`}
                  >
                    <p className="text-sm font-semibold opacity-90">{m.label}</p>
                    <p className="font-display text-4xl font-extrabold">{m.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </Panel>
        </motion.div>
      </AnimatePresence>
    </SectionShell>
  );
}

/* 2 — QA Lab Dashboard */
export function QALabSection({ github }) {
  const m = qaLabMetrics;

  return (
    <SectionShell
      id="qa-lab"
      eyebrow="Live Telemetry"
      title="QA Command Center"
      subtitle="How I think about quality — metrics, pipeline health, and test pyramid balance."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Flaky Rate", value: `${m.flakyRate}%`, icon: "🎯", color: "text-emerald-500" },
          { label: "Automation", value: `${m.automationRate}%`, icon: "🤖", color: "text-cyan-500" },
          { label: "Bugs Caught", value: `${m.bugsCaught}+`, icon: "🐛", color: "text-rose-500" },
          { label: "Pipeline", value: m.pipelineStatus, icon: "✅", color: "text-emerald-500" }
        ].map((stat) => (
          <Panel key={stat.label} className="text-center">
            <div className="text-3xl">{stat.icon}</div>
            <p className={`mt-2 font-display text-3xl font-extrabold ${stat.color}`}>{stat.value}</p>
            <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
          </Panel>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel>
          <h3 className="mb-4 font-display text-xl font-bold">Test Pyramid</h3>
          {Object.entries(m.coverage).map(([layer, pct]) => (
            <div key={layer} className="mb-4">
              <div className="mb-1 flex justify-between text-sm font-semibold capitalize">
                <span>{layer}</span>
                <span>{pct}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-200/80 dark:bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${pct}%` }}
                  viewport={{ once: true }}
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                />
              </div>
            </div>
          ))}
          <p className="mt-2 text-xs text-slate-500">Last pipeline run: {m.lastRun}</p>
        </Panel>

        <Panel>
          <h3 className="mb-4 font-display text-xl font-bold">GitHub Activity</h3>
          {github?.loading ? (
            <p className="text-slate-500">Syncing GitHub telemetry…</p>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-slate-200/70 p-4 dark:border-white/10">
                <p className="text-2xl font-bold">{github?.data?.user?.public_repos || 0}</p>
                <p className="text-sm text-slate-500">Public Repos</p>
              </div>
              <div className="rounded-2xl border border-slate-200/70 p-4 dark:border-white/10">
                <p className="text-2xl font-bold">{github?.data?.totalStars || 0}</p>
                <p className="text-sm text-slate-500">Total Stars</p>
              </div>
              <div className="rounded-2xl border border-slate-200/70 p-4 dark:border-white/10">
                <p className="text-2xl font-bold">{github?.data?.followers || 0}</p>
                <p className="text-sm text-slate-500">Followers</p>
              </div>
              <div className="rounded-2xl border border-slate-200/70 p-4 dark:border-white/10">
                <p className="text-2xl font-bold">{github?.data?.accountAge || "3+"} yr</p>
                <p className="text-sm text-slate-500">On GitHub</p>
              </div>
            </div>
          )}
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="mt-4 inline-block text-sm font-bold text-emerald-500 hover:underline">
            View GitHub profile →
          </a>
          <GitHubHeatmapSection github={github} />
        </Panel>
      </div>
    </SectionShell>
  );
}

/* 5 — CI/CD Pipeline */
export function PipelineSection() {
  const [hovered, setHovered] = useState(null);
  const step = pipelineSteps.find((s) => s.id === hovered);

  return (
    <SectionShell
      id="pipeline"
      eyebrow="Architecture"
      title="My CI/CD Quality Pipeline"
      subtitle="Hover each node to see the tooling I use to embed quality into every release."
    >
      <Panel>
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-0">
          {pipelineSteps.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <motion.button
                type="button"
                onMouseEnter={() => setHovered(s.id)}
                onMouseLeave={() => setHovered(null)}
                whileHover={{ scale: 1.08 }}
                className={`grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br ${s.color} text-center text-white shadow-lg md:h-24 md:w-24`}
              >
                <span className="text-2xl">{s.icon}</span>
              </motion.button>
              {i < pipelineSteps.length - 1 && (
                <span className="hidden px-1 text-2xl text-emerald-500 md:inline">→</span>
              )}
            </div>
          ))}
        </div>
        <AnimatePresence mode="wait">
          {step && (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 rounded-2xl border border-emerald-500/25 bg-emerald-500/10 p-4 text-center"
            >
              <p className="font-bold">{step.label}</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">Tooling: {step.tool}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </Panel>
    </SectionShell>
  );
}

/* 6 — Bug Graveyard */
export function BugGraveyardSection() {
  return (
    <SectionShell
      id="bug-graveyard"
      eyebrow="The Bug Graveyard"
      title="Bugs I Buried Before Production"
      subtitle="Anonymized wins — the defects that never reached your users."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {bugGraveyard.map((bug, i) => (
          <motion.div
            key={bug.id}
            initial={{ opacity: 0, x: i % 2 ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <Panel className="relative overflow-hidden">
              <div className="absolute right-4 top-4 text-4xl opacity-20">🪦</div>
              <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                bug.severity === "P0" ? "bg-rose-500/20 text-rose-600" : "bg-amber-500/20 text-amber-600"
              }`}>
                {bug.severity}
              </span>
              <h3 className="mt-2 font-display text-lg font-bold">{bug.title}</h3>
              <p className="mt-1 text-sm text-slate-500">{bug.category} · Caught in {bug.caught}</p>
              <p className="mt-3 text-sm font-semibold text-emerald-600 dark:text-emerald-400">{bug.impact}</p>
            </Panel>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}

/* 7 — Tool Orbs */
export function ToolOrbsSection() {
  const [selected, setSelected] = useState(toolOrbs[0]);

  return (
    <SectionShell
      id="tool-orbs"
      eyebrow="The Arsenal"
      title="Tool Proficiency Orbs"
      subtitle="Click an orb to see how I use each tool in production."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="grid grid-cols-4 gap-4">
          {toolOrbs.map((tool) => (
            <motion.button
              key={tool.name}
              type="button"
              onClick={() => setSelected(tool)}
              whileHover={{ scale: 1.1, y: -4 }}
              className={`flex flex-col items-center gap-2 rounded-3xl border p-4 transition ${
                selected.name === tool.name
                  ? "border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/20"
                  : "border-slate-200/70 bg-white/70 dark:border-white/10 dark:bg-white/5"
              }`}
            >
              <span className="text-3xl">{tool.icon}</span>
              <span className="text-xs font-bold">{tool.name}</span>
            </motion.button>
          ))}
        </div>
        <Panel>
          <div className="flex items-center gap-4">
            <span className="text-5xl">{selected.icon}</span>
            <div>
              <h3 className="font-display text-2xl font-bold">{selected.name}</h3>
              <p className="text-emerald-500">{selected.level}% proficiency</p>
            </div>
          </div>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200/80 dark:bg-white/10">
            <motion.div
              key={selected.name}
              initial={{ width: 0 }}
              animate={{ width: `${selected.level}%` }}
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500"
            />
          </div>
          <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">{selected.note}</p>
        </Panel>
      </div>
    </SectionShell>
  );
}

/* 8 — Break my portfolio demo */
export function BreakPortfolioDemo({ showToast }) {
  const [form, setForm] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [foundBugs, setFoundBugs] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    const bugs = [];
    if (form.email && !form.email.includes("@")) bugs.push(breakDemoFields[0].bug);
    if (form.age && (Number(form.age) < 0 || Number(form.age) > 120)) bugs.push(breakDemoFields[1].bug);
    if (form.password && form.password.length < 8) bugs.push(breakDemoFields[2].bug);
    setFoundBugs(bugs);
    setSubmitted(true);
    if (bugs.length >= 2) showToast?.("🏆 Bug hunter! You found the intentional defects.");
  }

  return (
    <SectionShell
      id="break-demo"
      eyebrow="Meta QA Demo"
      title="Break My Portfolio"
      subtitle="This form has intentional bugs. Can you find them all?"
    >
      <Panel className="max-w-lg">
        <form onSubmit={handleSubmit} className="grid gap-4">
          {breakDemoFields.map((field) => (
            <div key={field.id}>
              <label className="mb-1 block text-sm font-bold">{field.label}</label>
              <input
                type={field.type}
                value={form[field.id] || ""}
                onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
                className="w-full rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-3 dark:border-white/10 dark:bg-white/5"
              />
            </div>
          ))}
          <button type="submit" className="rounded-2xl bg-gradient-to-r from-rose-600 to-orange-500 px-5 py-3 font-bold text-white">
            Submit (if you dare)
          </button>
        </form>
        {submitted && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4">
            <p className="font-bold text-rose-600">Bugs found: {foundBugs.length}/3</p>
            <ul className="mt-2 space-y-1 text-sm">
              {foundBugs.map((b) => (
                <li key={b}>🐛 {b}</li>
              ))}
            </ul>
            {foundBugs.length < 3 && (
              <p className="mt-2 text-sm text-slate-500">Keep hunting — try invalid email, negative age, or short password.</p>
            )}
          </motion.div>
        )}
      </Panel>
    </SectionShell>
  );
}

/* 4 — Services */
export function ServicesSection() {
  return (
    <SectionShell
      id="services"
      eyebrow="Consulting"
      title="QA Services"
      subtitle="Need a quality boost? Here's how I can help your team."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {services.map((svc, i) => (
          <motion.div
            key={svc.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <Panel className="h-full">
              <span className="text-4xl">{svc.icon}</span>
              <h3 className="mt-4 font-display text-xl font-bold">{svc.title}</h3>
              <p className="mt-2 leading-7 text-slate-600 dark:text-slate-300">{svc.description}</p>
              <div className="mt-4 flex items-center justify-between text-sm font-bold">
                <span className="text-emerald-600">{svc.price}</span>
                <span className="text-slate-500">{svc.duration}</span>
              </div>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block rounded-2xl border border-emerald-500/30 px-4 py-2 text-sm font-bold text-emerald-600 transition hover:bg-emerald-500/10"
              >
                Inquire →
              </a>
            </Panel>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}

/* 14 — Compare table */
export function CompareSection() {
  return (
    <SectionShell
      id="compare"
      eyebrow="Why Me"
      title="Moaaz vs Typical QA Hire"
      subtitle="Side-by-side — because your time is valuable."
    >
      <Panel className="overflow-x-auto p-0">
        <table className="w-full min-w-[500px] text-left">
          <thead>
            <tr className="border-b border-slate-200/70 dark:border-white/10">
              <th className="p-4 font-bold">Metric</th>
              <th className="p-4 font-bold text-slate-500">Typical</th>
              <th className="p-4 font-bold text-emerald-600">Moaaz</th>
            </tr>
          </thead>
          <tbody>
            {compareRows.map((row) => (
              <tr key={row.feature} className="border-b border-slate-200/50 dark:border-white/5">
                <td className="p-4 font-semibold">{row.feature}</td>
                <td className="p-4 text-slate-500">{row.typical}</td>
                <td className="p-4 font-bold text-emerald-600 dark:text-emerald-400">{row.moaaz}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </SectionShell>
  );
}

/* 13 — Certifications shelf */
export function CertificationsSection() {
  return (
    <SectionShell
      id="certifications"
      eyebrow="Credentials"
      title="Certifications & Talks"
      subtitle="Verified skills and community contributions."
    >
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {certifications.map((cert) => (
          <a
            key={cert.name}
            href={cert.verify}
            target={cert.verify.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="rounded-[28px] border border-slate-200/70 bg-white/70 p-5 text-center transition hover:-translate-y-1 hover:border-emerald-400 dark:border-white/10 dark:bg-white/5"
          >
            <span className="text-4xl">{cert.icon}</span>
            <h3 className="mt-3 font-bold">{cert.name}</h3>
            <p className="text-sm text-slate-500">{cert.issuer} · {cert.year}</p>
          </a>
        ))}
      </div>
      <div className="grid gap-3">
        {talksAndArticles.map((item) => (
          <a
            key={item.title}
            href={item.link}
            className="flex items-center justify-between rounded-2xl border border-slate-200/70 bg-white/70 px-5 py-4 transition hover:border-emerald-400 dark:border-white/10 dark:bg-white/5"
          >
            <div>
              <span className="text-xs font-bold uppercase text-emerald-600">{item.type}</span>
              <p className="font-bold">{item.title}</p>
            </div>
            <span className="text-sm text-slate-500">{item.year}</span>
          </a>
        ))}
      </div>
    </SectionShell>
  );
}

/* 15 — Blog notes */
export function BlogSection() {
  return (
    <SectionShell
      id="blog"
      eyebrow="QA Notes"
      title="Blog & Insights"
      subtitle="Short, practical posts on automation, CI/CD, and quality strategy."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {blogNotes.map((post, i) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
          >
            <Panel className="h-full transition hover:-translate-y-1 hover:border-emerald-400">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <span key={t} className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-bold text-emerald-600">
                    {t}
                  </span>
                ))}
              </div>
              <h3 className="mt-4 font-display text-xl font-bold">{post.title}</h3>
              <p className="mt-2 leading-7 text-slate-600 dark:text-slate-300">{post.excerpt}</p>
              <p className="mt-4 text-sm text-slate-500">{post.date} · {post.readTime} read</p>
            </Panel>
          </motion.article>
        ))}
      </div>
    </SectionShell>
  );
}

/* 16 — Open source map */
export function OpenSourceSection({ github }) {
  const repos = github?.data?.originalRepos?.slice(0, 5) || openSourceRepos;

  return (
    <SectionShell
      id="opensource"
      eyebrow="Open Source"
      title="Repository Map"
      subtitle="Public repos linked to the skills I bring to your team."
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {(Array.isArray(repos) && repos[0]?.html_url ? repos : openSourceRepos).map((repo) => {
          const name = repo.name;
          const url = repo.html_url || repo.url;
          const lang = repo.language || repo.skill;
          const stars = repo.stargazers_count ?? repo.stars;

          return (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noreferrer"
              className="rounded-[28px] border border-slate-200/70 bg-white/70 p-5 transition hover:-translate-y-1 hover:border-emerald-400 dark:border-white/10 dark:bg-white/5"
            >
              <h3 className="font-display font-bold">{name}</h3>
              <p className="mt-1 text-sm text-slate-500">{lang}</p>
              {typeof stars === "number" && (
                <p className="mt-2 text-sm font-bold text-amber-500">⭐ {stars}</p>
              )}
            </a>
          );
        })}
      </div>
    </SectionShell>
  );
}

/* 3 — Resume section */
export function ResumeSection() {
  const [variant, setVariant] = useState("qa");
  const r = resumeVariants[variant];

  function handlePrint() {
    window.print();
  }

  return (
    <SectionShell
      id="resume"
      eyebrow="CV"
      title="Interactive Resume"
      subtitle="Toggle emphasis, then print or save as PDF."
    >
      <div className="mb-6 flex flex-wrap gap-2">
        {Object.entries(resumeVariants).map(([key, v]) => (
          <button
            key={key}
            type="button"
            onClick={() => setVariant(key)}
            className={`rounded-full px-4 py-2.5 text-sm font-bold transition ${
              variant === key
                ? "bg-gradient-to-r from-emerald-600 to-cyan-500 text-white"
                : "border border-slate-200/70 bg-white/70 dark:border-white/10 dark:bg-white/5"
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>

      <Panel id="printable-resume">
        <div className="border-b border-slate-200/70 pb-6 dark:border-white/10">
          <h3 className="font-display text-3xl font-bold">Moaaz Adel</h3>
          <p className="mt-1 text-lg font-semibold text-emerald-600">{r.label}</p>
          <p className="mt-1 text-sm text-slate-500">{EMAIL} · Remote GMT+2</p>
        </div>
        <p className="mt-6 leading-8 text-slate-600 dark:text-slate-300">{r.summary}</p>
        <div className="mt-6">
          <h4 className="font-bold">Core Highlights</h4>
          <ul className="mt-2 grid gap-2 sm:grid-cols-2">
            {r.highlights.map((h) => (
              <li key={h} className="flex items-center gap-2 text-sm">
                <span className="text-emerald-500">✓</span> {h}
              </li>
            ))}
          </ul>
        </div>
      </Panel>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handlePrint}
          className="rounded-2xl bg-gradient-to-r from-emerald-600 to-cyan-500 px-5 py-3 font-bold text-white shadow-lg"
        >
          🖨️ Print / Save as PDF
        </button>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noreferrer"
          className="rounded-2xl border border-slate-200/70 px-5 py-3 font-bold dark:border-white/10"
        >
          LinkedIn →
        </a>
      </div>
    </SectionShell>
  );
}

/* 9 — GitHub heatmap placeholder using contribution-style grid */
export function GitHubHeatmapSection({ github }) {
  const weeks = 12;
  const days = 7;
  const cells = Array.from({ length: weeks * days }, (_, i) => ({
    id: i,
    level: (i * 7 + 3) % 4
  }));

  return (
    <div className="mt-6">
      <h4 className="mb-3 font-bold">Contribution-style Activity</h4>
      <div className="flex flex-wrap gap-1">
        {cells.map((c) => (
          <div
            key={c.id}
            className={`h-3 w-3 rounded-sm ${
              ["bg-slate-200/50 dark:bg-white/5", "bg-emerald-500/30", "bg-emerald-500/60", "bg-emerald-500"][c.level]
            }`}
          />
        ))}
      </div>
      {github?.data?.user && (
        <p className="mt-2 text-xs text-slate-500">
          @{github.data.user.login} · {github.data.user.public_repos} repos active
        </p>
      )}
    </div>
  );
}
