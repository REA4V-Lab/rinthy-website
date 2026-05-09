import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { usePerformanceProfile } from "../hooks/usePerformanceProfile";
import { useI18n } from "../i18n/I18nContext";


function useItalianNow() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return useMemo(() => {
    try {
      const parts = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Europe/Rome",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).formatToParts(now);

      const get = (type: string) => parts.find((p) => p.type === type)?.value;
      const y = Number(get("year"));
      const m = Number(get("month"));
      const d = Number(get("day"));
      const hh = Number(get("hour"));
      const mm = Number(get("minute"));
      const ss = Number(get("second"));
      return new Date(Date.UTC(y, m - 1, d, hh, mm, ss));
    } catch {
      return now;
    }
  }, [now]);
}

function formatRemaining(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

// Use localStorage so navbar button + the section display the same countdown anchor.
function getOrCreateTargetMs(romeNowMs: number) {
  const key = "one_month_target_ms_v1";
  const raw = window.localStorage.getItem(key);
  if (raw) {
    const n = Number(raw);
    if (!Number.isNaN(n) && n > romeNowMs) return n;
  }
  const target = romeNowMs + 30 * 24 * 60 * 60 * 1000;
  window.localStorage.setItem(key, String(target));
  return target;
}

export default function OneMonthCountdownNavButton({ onJump }: { onJump: () => void }) {
  const { enableAnimations } = usePerformanceProfile();
  const { t } = useI18n();

  const romeNow = useItalianNow();

  const targetMs = useMemo(() => {
    return getOrCreateTargetMs(romeNow.getTime());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const remaining = useMemo(() => {
    return formatRemaining(targetMs - romeNow.getTime());
  }, [targetMs, romeNow]);




  const badge = useMemo(() => {

    return `${remaining.days}d ${String(remaining.hours).padStart(2, "0")}h`;
  }, [remaining.days, remaining.hours]);

  return (
    <motion.button
      type="button"
      onClick={onJump}
      className="px-4 py-2 rounded-lg border border-red-500/50 bg-red-500/5 hover:border-red-500 hover:bg-red-500/10 transition-all duration-300 text-red-400 text-sm touch-manipulation flex items-center gap-2"
      aria-label={t.shutdown?.navButtonTitle ?? "Shutdown"}
      title={t.shutdown?.navButtonTitle ?? "Shutdown"}
      initial={enableAnimations ? { opacity: 0, y: 6 } : undefined}
      animate={enableAnimations ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: enableAnimations ? 0.35 : 0.01 }}
    >
      <span>{t.shutdown?.navButtonPrefix ?? "Shutdown in:"}</span>


      <span className="shrink-0 rounded-xl px-2 py-1 text-xs border border-white/10 bg-black/20 text-white/90">
        {badge}
      </span>
    </motion.button>
  );
}

