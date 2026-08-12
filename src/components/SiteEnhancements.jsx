import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GITHUB_URL, impactTicker, navSections } from "../data";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed left-0 top-0 z-[60] h-1 w-full">
      <motion.div
        className="h-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-violet-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]"
        style={{ width: `${progress}%` }}
        layout
      />
    </div>
  );
}

export function ImpactTicker() {
  const items = [...impactTicker, ...impactTicker];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-emerald-500/5 via-cyan-500/5 to-violet-500/5 py-3.5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-slate-50 to-transparent dark:from-slate-950" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-slate-50 to-transparent dark:from-slate-950" />
      <div className="ticker-track flex w-max gap-10">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-bold text-slate-600 dark:text-slate-300"
          >
            <span className="text-emerald-500">◆</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          timeZone: "Africa/Cairo",
          hour: "2-digit",
          minute: "2-digit"
        })
      );
    };

    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/25 bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-700 dark:text-cyan-300"
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500" />
      </span>
      Cairo {time} · GMT+2
    </motion.span>
  );
}

export function FloatingActions({ showToast }) {
  const [open, setOpen] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText("moaaz.adel.m@gmail.com");
      showToast("Email copied! Mention BUGFREE2026 ✨");
    } catch {
      showToast("moaaz.adel.m@gmail.com");
    }
    setOpen(false);
  }

  async function copyPromo() {
    try {
      await navigator.clipboard.writeText("BUGFREE2026");
      showToast("Promo code BUGFREE2026 copied! 🏆");
    } catch {
      showToast("Promo code: BUGFREE2026");
    }
    setOpen(false);
  }

  const actions = [
    { label: "Email Me", icon: "📧", onClick: copyEmail },
    { label: "Promo Code", icon: "🏆", onClick: copyPromo },
    { label: "GitHub", icon: "🐙", href: GITHUB_URL },
    { label: "Contact", icon: "💬", href: "#contact" }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.92 }}
            className="flex flex-col gap-2"
          >
            {actions.map((action, i) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: i * 0.05 }}
              >
                {action.href ? (
                  <a
                    href={action.href}
                    target={action.href.startsWith("http") ? "_blank" : undefined}
                    rel={action.href.startsWith("http") ? "noreferrer" : undefined}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 rounded-2xl border border-slate-200/70 bg-white/90 px-4 py-2.5 text-sm font-bold shadow-xl backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-emerald-400 dark:border-white/10 dark:bg-slate-900/90"
                  >
                    <span>{action.icon}</span>
                    {action.label}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={action.onClick}
                    className="flex items-center gap-2 rounded-2xl border border-slate-200/70 bg-white/90 px-4 py-2.5 text-sm font-bold shadow-xl backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-emerald-400 dark:border-white/10 dark:bg-slate-900/90"
                  >
                    <span>{action.icon}</span>
                    {action.label}
                  </button>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 text-2xl text-white shadow-2xl shadow-emerald-500/40"
        aria-label="Quick actions menu"
      >
        {open ? "✕" : "⚡"}
      </motion.button>
    </div>
  );
}

export function ConfettiBurst({ active }) {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    if (!active) return;

    const colors = ["#10b981", "#06b6d4", "#8b5cf6", "#f59e0b", "#ec4899", "#3b82f6"];
    const timer = setTimeout(() => {
      setPieces(
        Array.from({ length: 48 }, (_, i) => ({
          id: i,
          left: `${Math.random() * 100}%`,
          delay: `${Math.random() * 0.6}s`,
          duration: `${2.2 + Math.random() * 1.5}s`,
          color: colors[i % colors.length],
          size: 6 + Math.random() * 6,
          rotate: Math.random() * 360
        }))
      );
    }, 0);

    return () => clearTimeout(timer);
  }, [active]);

  if (!active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[200] overflow-hidden">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece absolute top-0"
          style={{
            left: p.left,
            width: p.size,
            height: p.size * 0.6,
            backgroundColor: p.color,
            animationDelay: p.delay,
            animationDuration: p.duration,
            transform: `rotate(${p.rotate}deg)`
          }}
        />
      ))}
    </div>
  );
}

export function NavLinks({ activeSection, className = "" }) {
  return (
    <nav className={className}>
      {navSections
        .filter((s) => s.id !== "home")
        .map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`relative transition ${
              activeSection === section.id
                ? "text-emerald-500"
                : "hover:text-emerald-500"
            }`}
          >
            {section.label}
            {activeSection === section.id && (
              <motion.span
                layoutId="nav-dot"
                className="absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-emerald-500"
              />
            )}
          </a>
        ))}
    </nav>
  );
}
