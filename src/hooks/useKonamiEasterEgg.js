import { useEffect } from "react";

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"
];

export default function useKonamiEasterEgg(showToast) {
  useEffect(() => {
    const buffer = [];

    function onKeyDown(e) {
      buffer.push(e.key);
      if (buffer.length > KONAMI.length) buffer.shift();

      if (buffer.join(",") === KONAMI.join(",")) {
        showToast("🏆 Achievement unlocked! Code: BUGFREE2026 — email me to claim your QA consult.");
        buffer.length = 0;
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showToast]);
}
