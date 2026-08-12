import { useCallback, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { flashCards } from "../data";

const cardFilters = [
  { label: "All", value: "all" },
  { label: "Projects", value: "projects" },
  { label: "Automation", value: "automation" },
  { label: "Impact", value: "impact" },
  { label: "Career", value: "career" },
  { label: "AI & DevOps", value: "ai-devops" },
  { label: "CI/CD", value: "cicd" }
];

function FlashCard({ card, index, isFlipped, onFlip }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48, rotateX: -12 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group flash-card-perspective"
    >
      <div className={`relative rounded-[28px] transition-shadow duration-500 group-hover:shadow-2xl ${card.glow}`}>
        <div className={`rounded-[26px] bg-gradient-to-br ${card.gradient} p-[1.5px]`}>
          <button
            type="button"
            onClick={onFlip}
            aria-pressed={isFlipped}
            aria-label={`Experience: ${card.front}. ${isFlipped ? "Showing details" : "Tap to see details"}`}
            className="flash-card-scene relative h-[300px] w-full rounded-[25px] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
          >
            <div className={`flash-card-inner h-full w-full ${isFlipped ? "is-flipped" : ""}`}>
              {/* Front */}
              <div className="flash-card-face flash-card-front overflow-hidden rounded-[25px] border border-white/20 bg-white/90 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/90">
                <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-white/40 to-transparent blur-2xl dark:from-white/10" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" />

                <div className="relative flex h-full flex-col">
                  <div className="flex items-start justify-between">
                    <span className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r ${card.gradient} px-3 py-1 text-xs font-bold text-white shadow-lg`}>
                      {card.tag}
                    </span>
                    <span className="text-3xl drop-shadow-sm">{card.icon}</span>
                  </div>

                  <p className="mt-auto font-display text-lg font-bold leading-snug text-slate-800 dark:text-white md:text-xl">
                    {card.front}
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                    Tap for details
                  </div>
                </div>
              </div>

              {/* Back */}
              <div className={`flash-card-face flash-card-back overflow-hidden rounded-[25px] bg-gradient-to-br ${card.gradient} p-6 text-white shadow-inner`}>
                <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMyIgY3k9IjMiIHI9IjEiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-60" />
                <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

                <div className="relative flex h-full flex-col">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-bold backdrop-blur-sm">
                      My Experience
                    </span>
                    <span className="text-2xl opacity-80">{card.icon}</span>
                  </div>

                  <p className="mt-auto text-base leading-relaxed text-white/95 md:text-[15px]">
                    {card.back}
                  </p>

                  <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-white/60">
                    Tap to go back
                  </div>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function FlashCards() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [flippedIds, setFlippedIds] = useState(new Set());
  const [shuffleKey, setShuffleKey] = useState(0);

  const filtered = useMemo(() => {
    const base =
      activeCategory === "all"
        ? flashCards
        : flashCards.filter((c) => c.category === activeCategory);

    if (shuffleKey === 0) return base;

    const shuffled = [...base];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, [activeCategory, shuffleKey]);

  const flippedCount = useMemo(
    () => filtered.filter((c) => flippedIds.has(c.id)).length,
    [filtered, flippedIds]
  );

  const toggleFlip = useCallback((id) => {
    setFlippedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleShuffle = () => {
    setFlippedIds(new Set());
    setShuffleKey((k) => k + 1);
  };

  const handleReset = () => setFlippedIds(new Set());

  return (
    <section id="flashcards" className="mx-auto w-[min(1160px,calc(100%-2rem))] py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55 }}
        className="mb-10"
      >
        <span className="mb-3 inline-block text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
          My Story
        </span>
        <h2 className="font-display text-3xl font-bold md:text-5xl">
          Moaaz&apos;s Experience Cards
        </h2>
        <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
          Each card is a chapter from my career — projects I shipped, automation
          wins I delivered, and impact I made. Flip to read the full story.
        </p>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex flex-wrap gap-2">
          {cardFilters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => {
                setActiveCategory(filter.value);
                setFlippedIds(new Set());
              }}
              className={`rounded-full px-4 py-2.5 text-sm font-bold transition ${
                activeCategory === filter.value
                  ? "bg-gradient-to-r from-emerald-600 to-cyan-500 text-white shadow-lg shadow-emerald-500/25"
                  : "border border-slate-200/70 bg-white/70 text-slate-600 hover:border-emerald-400 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleShuffle}
            className="rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-2.5 text-sm font-bold transition hover:-translate-y-0.5 hover:border-violet-400 dark:border-white/10 dark:bg-white/5"
          >
            🔀 Shuffle
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-2.5 text-sm font-bold transition hover:-translate-y-0.5 hover:border-rose-400 dark:border-white/10 dark:bg-white/5"
          >
            ↺ Reset
          </button>
        </div>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0.8 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <div className="mb-2 flex items-center justify-between text-sm font-semibold">
          <span className="text-slate-500 dark:text-slate-400">
            {flippedCount} of {filtered.length} explored
          </span>
          <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
            {filtered.length ? Math.round((flippedCount / filtered.length) * 100) : 0}% complete
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-200/80 dark:bg-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-violet-500"
            animate={{ width: `${filtered.length ? (flippedCount / filtered.length) * 100 : 0}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </motion.div>

      {/* Card grid */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={`${activeCategory}-${shuffleKey}`}
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((card, index) => (
            <FlashCard
              key={card.id}
              card={card}
              index={index}
              isFlipped={flippedIds.has(card.id)}
              onFlip={() => toggleFlip(card.id)}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {flippedCount === filtered.length && filtered.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="mt-10 rounded-[28px] border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-violet-500/10 p-6 text-center backdrop-blur-xl"
        >
          <p className="font-display text-xl font-bold">
            🎉 You&apos;ve explored my full deck!
          </p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Shuffle for another round, or reach out at moaaz.adel.m@gmail.com — mention BUGFREE2026.
          </p>
        </motion.div>
      )}
    </section>
  );
}
