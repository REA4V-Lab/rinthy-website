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

  // Intl-driven: convert the local clock to the current time in Europe/Rome.
  const romeDate = useMemo(() => {
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

      // Create a Date representing the Rome wall-clock time.
      return new Date(Date.UTC(y, m - 1, d, hh, mm, ss));
    } catch {
      return now;
    }
  }, [now]);

  return romeDate;
}

function formatRemaining(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

export default function OneMonthCountdownSection() {
  const { enableAnimations } = usePerformanceProfile();
  const { t } = useI18n();


  const romeNow = useItalianNow();

  // “1 month” countdown anchor (synced with navbar) stored in localStorage.
  const [targetMs, setTargetMs] = useState<number | null>(null);

  useEffect(() => {
    const key = "one_month_target_ms_v1";
    const raw = window.localStorage.getItem(key);
    const romeNowMs = romeNow.getTime();

    if (raw) {
      const n = Number(raw);
      if (!Number.isNaN(n) && n > romeNowMs) {
        setTargetMs(n);
        return;
      }
    }

    const target = romeNowMs + 30 * 24 * 60 * 60 * 1000;
    window.localStorage.setItem(key, String(target));
    setTargetMs(target);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const remaining = useMemo(() => {
    if (targetMs == null) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return formatRemaining(targetMs - romeNow.getTime());
  }, [targetMs, romeNow]);

  const isDone =
    remaining.days === 0 &&
    remaining.hours === 0 &&
    remaining.minutes === 0 &&
    remaining.seconds === 0;

  const headline = useMemo(
    () =>
      isDone
        ? t.shutdown?.sectionHeadlineDone ?? "The month is over."
        : t.shutdown?.sectionHeadlinePending ?? "Countdown to website shutdown (Italy time):",
    [
      isDone,
      t.shutdown?.sectionHeadlineDone,
      t.shutdown?.sectionHeadlinePending,
    ]
  );


  return (
    <section id="one-month" className="relative py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={enableAnimations ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: enableAnimations ? 0.7 : 0.01, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-xs font-medium text-red-500 tracking-wide uppercase mb-5">
            {t.shutdown?.sectionPill ?? "Shutdown"}
          </span>

          <h2 className="font-display font-bold text-4xl sm:text-5xl mb-5">{headline}</h2>
          <p className="text-modrinth-muted max-w-xl mx-auto text-lg">
          </p>
        </motion.div>

        <motion.div
          initial={enableAnimations ? { opacity: 0, scale: 0.98 } : { opacity: 1, scale: 1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: enableAnimations ? 0.6 : 0.01 }}
          className="rounded-3xl border border-white/10 bg-black/40 glass-strong px-6 py-8"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Days", value: remaining.days },
              { label: "Hours", value: remaining.hours },
              { label: "Minutes", value: remaining.minutes },
              { label: "Seconds", value: remaining.seconds },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-display font-bold text-white">{item.value}</div>
                <div className="text-xs sm:text-sm text-modrinth-muted mt-1">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center">
            <div className="h-px w-full bg-gradient-to-r from-modrinth-green/0 via-modrinth-green/30 to-modrinth-green/0" />
          </div>

          <div className="mt-6 text-center text-sm text-modrinth-muted">
            <div>
              Timezone: <span className="text-white/90">Europe/Rome</span>
            </div>
            <div className="mt-2">
              <span className="text-white/90">Website will shut down because imsawiq will host it on his server,</span>
            </div>
            <div className="mt-1">the website will be up until further notice</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

