import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";

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
  

  const dotColor = isUp
    ? "bg-modrinth-green"
    : isDown
    ? "bg-red-500"
    : "bg-zinc-500";

  const statusText = isUp ? "Online" : isDown ? "Offline" : "Checking";

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3.5 py-1.5 backdrop-blur-md"
      title={
        updatedAt
          ? `Last checked: ${updatedAt.toLocaleTimeString()}`
          : "Checking availability"
      }
    >
      <span className="relative flex h-2 w-2">
        {!isDown && (
          <span
            className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${
              isUp ? "bg-modrinth-green" : "bg-zinc-400"
            }`}
          />
        )}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${dotColor}`} />
      </span>

      <span className="text-[11px] font-medium tracking-wide text-white/70">
        ryntra.sawiq.org
      </span>

      <span className="h-3 w-px bg-white/10" />

      <span
        className={`text-[10px] font-semibold tracking-wide ${
          isUp
            ? "text-modrinth-green"
            : isDown
            ? "text-red-400"
            : "text-zinc-400"
        }`}
      >
        {statusText}
      </span>
    </motion.div>
  );
}
