import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity, CheckCircle2, XCircle, Loader2 } from "lucide-react";

const TARGET = "https://ryntra.sawiq.org";
const CHECK_INTERVAL_MS = 30000; // re-check every 30s

type Status = "checking" | "up" | "down";

async function checkSite(): Promise<boolean> {
  try {
    // Use no-cors so we can detect reachability regardless of CORS headers.
    // fetch rejects on network/DNS errors, so a resolved promise = site is up.
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    await fetch(TARGET, { mode: "no-cors", cache: "no-store", signal: controller.signal });
    clearTimeout(timeout);
    return true;
  } catch {
    return false;
  }
}

export default function StatusBar() {
  const [status, setStatus] = useState<Status>("checking");
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);

  const runCheck = useCallback(async () => {
    setStatus("checking");
    const ok = await checkSite();
    setStatus(ok ? "up" : "down");
    setUpdatedAt(new Date());
  }, []);

  useEffect(() => {
    runCheck();
    const interval = setInterval(runCheck, CHECK_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [runCheck]);

  const isUp = status === "up";
  const isDown = status === "down";
  const isChecking = status === "checking";

  const dotColor = isUp
    ? "bg-modrinth-green"
    : isDown
    ? "bg-red-500"
    : "bg-modrinth-muted";

  const label = isUp
    ? "All systems operational"
    : isDown
    ? "The new site appears to be down"
    : "Checking status…";

  const statusText = isUp ? "UP" : isDown ? "DOWN" : "CHECKING";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="inline-flex items-center gap-3 rounded-full glass-strong px-5 py-2.5 glow-green-subtle"
      title={
        updatedAt
          ? `Last checked: ${updatedAt.toLocaleTimeString()}`
          : "Checking availability"
      }
    >
      <Activity size={16} className="text-modrinth-muted" />

      <span className="flex items-center gap-2 text-sm font-medium text-theme-text">
        <span className="relative flex h-2.5 w-2.5">
          {isChecking && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-modrinth-green opacity-75" />
          )}
          {isUp && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-modrinth-green opacity-60" />
          )}
          <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${dotColor}`} />
        </span>
        ryntra.sawiq.org
      </span>

      <span
        className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold tracking-wide ${
          isUp
            ? "bg-modrinth-green/15 text-modrinth-green"
            : isDown
            ? "bg-red-500/15 text-red-400"
            : "bg-modrinth-border text-modrinth-muted"
        }`}
      >
        {isUp && <CheckCircle2 size={13} />}
        {isDown && <XCircle size={13} />}
        {isChecking && <Loader2 size={13} className="animate-spin" />}
        {statusText}
      </span>

      <span className="text-xs text-modrinth-muted">{label}</span>
    </motion.div>
  );
}
