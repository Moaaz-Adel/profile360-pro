import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useLocalStorage from "./hooks/useLocalStorage";
import useGitHub from "./hooks/useGitHub";
import PublicSite from "./components/PublicSite";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import { initialProjects, seedMessages } from "./data";

export default function App() {
  const [theme, setTheme] = useLocalStorage("p360-theme", "dark");
  const [user, setUser] = useLocalStorage("p360-user", null);
  const [page, setPage] = useState("site");

  const [projects, setProjects] = useLocalStorage("p360-projects", initialProjects);
  const [messages, setMessages] = useLocalStorage("p360-messages", seedMessages);
  const [views, setViews] = useLocalStorage("p360-views", 1863);
  const [toast, setToast] = useState("");

  // 🆕 Pull real GitHub data
  const github = useGitHub();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    const timer = setTimeout(() => setToast(""), 3200);
    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (page === "site") {
      setViews((prev) => Number(prev) + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function showToast(message) {
    setToast(message);
  }

  function handleLogin(email, password) {
    if (email.trim().toLowerCase() === "admin@profile360.com" && password === "admin123") {
      setUser({
        name: "Admin",
        email: "admin@profile360.com",
        role: "admin"
      });
      setPage("admin");
      showToast("Welcome back, Admin 👋");
    } else {
      showToast("Use admin@profile360.com / admin123");
    }
  }

  function handleLogout() {
    setUser(null);
    setPage("site");
    showToast("Logged out successfully");
  }

  function addMessage(message) {
    setMessages((prev) => [
      {
        id: Date.now(),
        status: "unread",
        date: new Date().toLocaleString(),
        ...message
      },
      ...prev
    ]);
  }

  return (
    <div className="relative min-h-screen overflow-x-clip bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute left-1/3 top-1/4 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
      </div>

      <AnimatePresence mode="wait">
        {page === "site" && (
          <motion.div
            key="site"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
          >
            <PublicSite
              theme={theme}
              setTheme={setTheme}
              user={user}
              projects={projects}
              views={views}
              addMessage={addMessage}
              showToast={showToast}
              onLoginClick={() => setPage("login")}
              onAdminClick={() => setPage(user ? "admin" : "login")}
              github={github}
            />
          </motion.div>
        )}

        {page === "login" && (
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
          >
            <Login onLogin={handleLogin} onBack={() => setPage("site")} />
          </motion.div>
        )}

        {page === "admin" && user && (
          <motion.div
            key="admin"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
          >
            <AdminDashboard
              user={user}
              theme={theme}
              setTheme={setTheme}
              onLogout={handleLogout}
              projects={projects}
              setProjects={setProjects}
              messages={messages}
              setMessages={setMessages}
              views={views}
              showToast={showToast}
              github={github}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-5 left-1/2 z-[100] -translate-x-1/2 rounded-2xl border border-white/10 bg-slate-900/90 px-5 py-3 text-sm text-white shadow-2xl backdrop-blur"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}