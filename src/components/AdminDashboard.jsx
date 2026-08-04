import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar
} from "recharts";
import { adminTraffic, achievementBar, projectGradients } from "../data";

const tooltipStyle = {
  background: "rgba(15, 23, 42, 0.92)",
  border: "1px solid rgba(148, 163, 184, 0.25)",
  borderRadius: 12,
  color: "#fff"
};

const inputClass =
  "w-full rounded-2xl border border-slate-300/70 bg-white/75 px-4 py-3.5 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/15 dark:border-white/10 dark:bg-white/5";

function Panel({ children, className = "" }) {
  return (
    <div
      className={`rounded-[28px] border border-slate-200/70 bg-white/70 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-white/5 ${className}`}
    >
      {children}
    </div>
  );
}

function StatCard({ icon, label, value, accent }) {
  return (
    <Panel>
      <div className="flex items-center gap-4">
        <div
          className={`grid h-12 w-12 place-items-center rounded-2xl text-xl ${accent}`}
        >
          {icon}
        </div>

        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
          <p className="text-2xl font-extrabold">{value}</p>
        </div>
      </div>
    </Panel>
  );
}

export default function AdminDashboard({
  user,
  theme,
  setTheme,
  onLogout,
  projects,
  setProjects,
  messages,
  setMessages,
  views,
  showToast
}) {
  const [showAddProject, setShowAddProject] = useState(false);

  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    category: "web",
    emoji: "🚀",
    gradient: projectGradients[0].value
  });

  const categoryCounts = ["web", "ui", "data", "mobile"].map((category) => ({
    name: category,
    value: projects.filter((project) => project.categories.includes(category)).length
  }));

  const unreadMessages = messages.filter((message) => message.status === "unread").length;

  function addProject(e) {
    e.preventDefault();

    if (!newProject.title.trim() || !newProject.description.trim()) {
      showToast("Please add project title and description.");
      return;
    }

    setProjects([
      {
        id: Date.now(),
        title: newProject.title,
        description: newProject.description,
        categories: [newProject.category],
        tags: [newProject.category],
        emoji: newProject.emoji,
        gradient: newProject.gradient,
        featured: false
      },
      ...projects
    ]);

    setNewProject({
      title: "",
      description: "",
      category: "web",
      emoji: "🚀",
      gradient: projectGradients[0].value
    });

    setShowAddProject(false);
    showToast("Project added successfully 🚀");
  }

  function deleteProject(id) {
    setProjects(projects.filter((project) => project.id !== id));
    showToast("Project deleted");
  }

  function toggleFeatured(id) {
    setProjects(
      projects.map((project) =>
        project.id === id
          ? {
              ...project,
              featured: !project.featured
            }
          : project
      )
    );
  }

  function toggleMessageStatus(id) {
    setMessages(
      messages.map((message) =>
        message.id === id
          ? {
              ...message,
              status: message.status === "read" ? "unread" : "read"
            }
          : message
      )
    );
  }

  function deleteMessage(id) {
    setMessages(messages.filter((message) => message.id !== id));
    showToast("Message deleted");
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/75 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/75">
        <div className="mx-auto flex w-[min(1300px,calc(100%-2rem))] flex-wrap items-center justify-between gap-4 py-4">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-400">
              Admin Dashboard
            </p>
            <h1 className="font-display text-2xl font-bold">
              Welcome, {user?.name || "Admin"}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-2.5 font-bold dark:border-white/10 dark:bg-white/5"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>

            <button
              onClick={onLogout}
              className="rounded-2xl bg-gradient-to-r from-rose-500 to-orange-500 px-4 py-2.5 font-bold text-white shadow-lg shadow-rose-500/25"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid w-[min(1300px,calc(100%-2rem))] gap-6 py-8">
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon="👁️"
            label="Profile Views"
            value={views}
            accent="bg-violet-500/15 text-violet-500"
          />

          <StatCard
            icon="📬"
            label="Messages"
            value={messages.length}
            accent="bg-cyan-500/15 text-cyan-500"
          />

          <StatCard
            icon="🚀"
            label="Projects"
            value={projects.length}
            accent="bg-emerald-500/15 text-emerald-500"
          />

          <StatCard
            icon="⭐"
            label="Featured Projects"
            value={projects.filter((project) => project.featured).length}
            accent="bg-amber-500/15 text-amber-500"
          />
        </section>

        <section className="grid gap-6 xl:grid-cols-3">
          <Panel>
            <h3 className="mb-4 font-display text-lg font-bold">Traffic & Leads</h3>

            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={adminTraffic}>
                  <CartesianGrid stroke="currentColor" strokeOpacity={0.12} />
                  <XAxis dataKey="month" tick={{ fill: "currentColor", fontSize: 12 }} />
                  <YAxis tick={{ fill: "currentColor", fontSize: 12 }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Area
                    type="monotone"
                    dataKey="views"
                    stroke="#7c3aed"
                    fill="rgba(124, 58, 237, 0.16)"
                    strokeWidth={3}
                  />
                  <Area
                    type="monotone"
                    dataKey="leads"
                    stroke="#06b6d4"
                    fill="rgba(6, 182, 212, 0.16)"
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          <Panel>
            <h3 className="mb-4 font-display text-lg font-bold">Project Categories</h3>

            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryCounts}
                    dataKey="value"
                    nameKey="name"
                    innerRadius="55%"
                    outerRadius="80%"
                    paddingAngle={5}
                    label
                  >
                    {[
                      "#7c3aed",
                      "#06b6d4",
                      "#22c55e",
                      "#f59e0b"
                    ].map((color) => (
                      <Cell key={color} fill={color} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          <Panel>
            <h3 className="mb-4 font-display text-lg font-bold">Achievement Summary</h3>

            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={achievementBar}>
                  <CartesianGrid stroke="currentColor" strokeOpacity={0.12} />
                  <XAxis dataKey="name" tick={{ fill: "currentColor", fontSize: 12 }} />
                  <YAxis tick={{ fill: "currentColor", fontSize: 12 }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="count" radius={12}>
                    {[
                      "#7c3aed",
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
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <Panel>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-xl font-bold">Project Manager</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Add, feature, or remove portfolio projects.
                </p>
              </div>

              <button
                onClick={() => setShowAddProject((prev) => !prev)}
                className="rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 px-4 py-3 font-bold text-white shadow-lg shadow-violet-500/25"
              >
                {showAddProject ? "Close Form" : "+ Add Project"}
              </button>
            </div>

            <AnimatePresence>
              {showAddProject && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  onSubmit={addProject}
                  className="mb-8 overflow-hidden"
                >
                  <div className="grid gap-4 rounded-[26px] border border-slate-200/70 bg-white/70 p-5 dark:border-white/10 dark:bg-white/5">
                    <div className="grid gap-4 md:grid-cols-2">
                      <input
                        value={newProject.title}
                        onChange={(e) =>
                          setNewProject({ ...newProject, title: e.target.value })
                        }
                        placeholder="Project title"
                        className={inputClass}
                      />

                      <input
                        value={newProject.emoji}
                        onChange={(e) =>
                          setNewProject({ ...newProject, emoji: e.target.value })
                        }
                        placeholder="Emoji icon"
                        className={inputClass}
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <select
                        value={newProject.category}
                        onChange={(e) =>
                          setNewProject({ ...newProject, category: e.target.value })
                        }
                        className={inputClass}
                      >
                        <option value="web">Web</option>
                        <option value="ui">UI/UX</option>
                        <option value="data">Data</option>
                        <option value="mobile">Mobile</option>
                      </select>

                      <select
                        value={newProject.gradient}
                        onChange={(e) =>
                          setNewProject({ ...newProject, gradient: e.target.value })
                        }
                        className={inputClass}
                      >
                        {projectGradients.map((gradient) => (
                          <option key={gradient.value} value={gradient.value}>
                            {gradient.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <textarea
                      value={newProject.description}
                      onChange={(e) =>
                        setNewProject({ ...newProject, description: e.target.value })
                      }
                      placeholder="Project description"
                      className={`${inputClass} min-h-[110px] resize-y`}
                    />

                    <div className="flex items-center gap-4">
                      <span className={`h-12 w-12 rounded-2xl ${newProject.gradient}`} />
                      <button
                        type="submit"
                        className="rounded-2xl bg-emerald-500 px-5 py-3.5 font-bold text-white shadow-lg shadow-emerald-500/25"
                      >
                        Save Project
                      </button>
                    </div>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            <div className="grid gap-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-[26px] border border-slate-200/70 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`grid h-14 w-14 place-items-center rounded-2xl text-2xl text-white ${project.gradient}`}
                    >
                      {project.emoji}
                    </div>

                    <div>
                      <h4 className="font-bold">{project.title}</h4>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        {project.categories.join(", ")}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => toggleFeatured(project.id)}
                      className={`rounded-xl px-3.5 py-2.5 text-sm font-bold ${
                        project.featured
                          ? "bg-amber-500/15 text-amber-500"
                          : "border border-slate-200/70 bg-white/70 dark:border-white/10 dark:bg-white/5"
                      }`}
                    >
                      {project.featured ? "Featured" : "Feature"}
                    </button>

                    <button
                      onClick={() => deleteProject(project.id)}
                      className="rounded-xl bg-rose-500/15 px-3.5 py-2.5 text-sm font-bold text-rose-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel>
            <div className="mb-6">
              <h3 className="font-display text-xl font-bold">Message Inbox</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {unreadMessages} unread message{unreadMessages === 1 ? "" : "s"}
              </p>
            </div>

            <div className="grid gap-4">
              {messages.length === 0 && (
                <div className="rounded-[26px] border border-dashed border-slate-300/70 p-8 text-center text-slate-500 dark:border-white/15 dark:text-slate-400">
                  No messages yet.
                </div>
              )}

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`rounded-[26px] border p-4 ${
                    message.status === "unread"
                      ? "border-violet-500/25 bg-violet-500/10"
                      : "border-slate-200/70 bg-white/70 dark:border-white/10 dark:bg-white/5"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h4 className="font-bold">{message.name}</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {message.email}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-extrabold uppercase ${
                        message.status === "unread"
                          ? "bg-violet-500/15 text-violet-500"
                          : "bg-emerald-500/15 text-emerald-500"
                      }`}
                    >
                      {message.status}
                    </span>
                  </div>

                  <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
                    {message.message}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs text-slate-400">{message.date}</span>

                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleMessageStatus(message.id)}
                        className="rounded-xl border border-slate-200/70 bg-white/70 px-3 py-2 text-xs font-bold dark:border-white/10 dark:bg-white/5"
                      >
                        Mark {message.status === "read" ? "Unread" : "Read"}
                      </button>

                      <button
                        onClick={() => deleteMessage(message.id)}
                        className="rounded-xl bg-rose-500/15 px-3 py-2 text-xs font-bold text-rose-500"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </section>
      </main>
    </div>
  );
}