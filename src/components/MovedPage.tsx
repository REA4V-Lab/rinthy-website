import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
  MapPin,
  Sparkles,
  Rocket,
  Compass,
  Globe,
  ShieldCheck,
  Loader2,
  Check,
} from "lucide-react";
import StatusBar from "./StatusBar";

const REDIRECT_URL = "https://ryntra.sawiq.org";
const REDIRECT_SECONDS = 10;

const headline = ["This", "website", "has", "moved"];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const word = {
  hidden: { opacity: 0, y: 40, rotateX: -90 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { type: "spring", stiffness: 120, damping: 14 },
  },
};

/* ---------- Floating particles ---------- */
function Particles({ count = 24 }: { count?: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 2 + Math.random() * 5,
        duration: 6 + Math.random() * 10,
        delay: Math.random() * 6,
        drift: (Math.random() - 0.5) * 120,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-modrinth-green"
          style={{ left: `${p.left}%`, width: p.size, height: p.size, bottom: -20 }}
          animate={{
            y: [0, -window.innerHeight - 100],
            x: [0, p.drift, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{ repeat: Infinity, duration: p.duration, delay: p.delay, ease: "linear" }}
        />
      ))}
    </div>
  );
}

/* ---------- Fake Bot Check ---------- */
type BotStage = "idle" | "scanning" | "done";

function BotCheck({ onVerified }: { onVerified: () => void }) {
  const [stage, setStage] = useState<BotStage>("idle");
  const [progress, setProgress] = useState(0);
  const [checked, setChecked] = useState(false);

  const startScan = () => {
    if (stage !== "idle") return;
    setChecked(true);
    setStage("scanning");
  };

  useEffect(() => {
    if (stage !== "scanning") return;
    const start = Date.now();
    const duration = 2600;
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const p = Math.min(100, (elapsed / duration) * 100);
      setProgress(p);
      if (p >= 100) {
        clearInterval(timer);
        setStage("done");
        setTimeout(onVerified, 500);
      }
    }, 50);
    return () => clearInterval(timer);
  }, [stage, onVerified]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 14 }}
      className="relative w-full max-w-md rounded-2xl glass-strong p-6 text-left overflow-hidden"
    >
      {/* animated gradient border */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl p-px bg-gradient-to-r from-modrinth-green via-theme-secondary to-modrinth-green animate-spin-slow" style={{ WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", maskComposite: "exclude" }} />

      <div className="relative">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-modrinth-green/10">
            {stage === "done" ? (
              <Check className="text-modrinth-green" size={22} />
            ) : stage === "scanning" ? (
              <Loader2 className="animate-spin text-modrinth-green" size={22} />
            ) : (
              <ShieldCheck className="text-modrinth-green" size={22} />
            )}
          </div>
          <div>
            <p className="font-display font-bold text-theme-text">
              {stage === "done" ? "Verified!" : "Verify you're human"}
            </p>
            <p className="text-xs text-modrinth-muted">
              {stage === "done"
                ? "Thanks — heading to the new home."
                : "Help us keep the new site safe."}
            </p>
          </div>
        </div>

        {/* Checkbox / scan area */}
        <div className="mt-5 rounded-xl border border-modrinth-border bg-theme-background/50 p-4">
          {stage !== "scanning" && stage !== "done" && (
            <button
              onClick={startScan}
              className="flex w-full items-center gap-3 text-left group"
            >
              <span
                className={`flex h-6 w-6 items-center justify-center rounded border-2 transition-all duration-300 ${
                  checked ? "border-modrinth-green bg-modrinth-green" : "border-modrinth-muted group-hover:border-modrinth-green"
                }`}
              >
                {checked && <Check size={14} className="text-modrinth-dark" />}
              </span>
<span className="text-sm text-theme-text">I&rsquo;m not a robot</span>
            </button>
          )}

          {stage === "scanning" && (
            <div className="py-2">
              <div className="flex items-center justify-between text-xs text-modrinth-muted mb-2">
                <span>Checking...</span>
                <span className="tabular-nums">{Math.round(progress)}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-modrinth-border">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-modrinth-green to-theme-secondary"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="relative mt-3 h-16 overflow-hidden rounded-lg bg-modrinth-border/40">
                <motion.div
                  className="absolute left-0 right-0 h-0.5 bg-modrinth-green shadow-[0_0_12px_#1BD96A]"
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut" }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-[10px] uppercase tracking-widest text-modrinth-muted">
                  Analyzing traffic
                </div>
              </div>
            </div>
          )}

          {stage === "done" && (
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
              className="flex items-center justify-center gap-2 py-3 text-modrinth-green"
            >
              <Check size={20} />
              <span className="font-semibold">Human confirmed</span>
            </motion.div>
          )}
</div>

      </div>
    </motion.div>
  );
}

/* ---------- Confetti ---------- */
function ConfettiBurst() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 60 }).map((_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 260,
        y: -Math.random() * 320 - 60,
        rotate: Math.random() * 720 - 360,
        color: ["#1BD96A", "#ffffff", "#5865F2", "#8A8A8A"][i % 4],
        size: 6 + Math.random() * 6,
        duration: 1.2 + Math.random() * 1,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute"
          style={{ width: p.size, height: p.size, backgroundColor: p.color }}
          initial={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
          animate={{ opacity: 0, x: p.x, y: p.y, rotate: p.rotate }}
          transition={{ duration: p.duration, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

/* ---------- Main Page ---------- */
export default function MovedPage() {
  const [countdown, setCountdown] = useState(REDIRECT_SECONDS);
  const [verified, setVerified] = useState(false);
  const [showBot, setShowBot] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto redirect timer (only started after verification)
  useEffect(() => {
    if (!verified) return;
    document.title = "Rinthy has moved → Ryntra";
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          window.location.href = REDIRECT_URL;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [verified]);

  // Mouse parallax on orbs
  const handleMouse = (e: React.MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 2;
    const y = (clientY / innerHeight - 0.5) * 2;
    el.style.setProperty("--px", `${x * 30}px`);
    el.style.setProperty("--py", `${y * 30}px`);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouse}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-theme-background text-theme-text selection:bg-modrinth-green selection:text-modrinth-dark"
    >
      {/* Animated conic gradient background */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "conic-gradient(from 0deg, #1BD96A 0%, transparent 20%, #5865F2 40%, transparent 60%, #1BD96A 80%, transparent 100%)",
          filter: "blur(80px)",
        }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
      />

      {/* Parallax orbs */}
      <motion.div className="pointer-events-none absolute inset-0" initial="hidden" animate="show">
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { duration: 1 } },
          }}
          className="absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-modrinth-green/30 blur-3xl"
          style={{ transform: "translate(var(--px), var(--py))" }}
          animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 12 }}
        />
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { duration: 1, delay: 0.3 } },
          }}
          className="absolute top-1/4 -right-40 h-[32rem] w-[32rem] rounded-full bg-theme-secondary/20 blur-3xl"
          style={{ transform: "translate(calc(var(--px) * -1), calc(var(--py) * -1))" }}
          animate={{ y: [0, 40, 0], x: [0, -30, 0] }}
          transition={{ repeat: Infinity, duration: 15 }}
        />
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { duration: 1, delay: 0.6 } },
          }}
          className="absolute -bottom-40 left-1/4 h-[26rem] w-[26rem] rounded-full bg-modrinth-green/20 blur-3xl"
          style={{ transform: "translate(var(--px), var(--py))" }}
          animate={{ y: [0, -40, 0], x: [0, 30, 0] }}
          transition={{ repeat: Infinity, duration: 10 }}
        />
      </motion.div>

      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #1BD96A 1px, transparent 1px), linear-gradient(to bottom, #1BD96A 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating particles */}
      <Particles />

      {/* Confetti when verified */}
      {verified && <ConfettiBurst key="confetti" />}

      <div className="relative z-10 px-6 py-12 text-center w-full max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          {!verified ? (
            <motion.div key="landing" exit={{ opacity: 0, scale: 0.9, y: -20 }}>
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 150, damping: 15 }}
                className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-medium text-modrinth-muted mb-10 glow-green-subtle"
              >
                <motion.span animate={{ rotate: [0, 20, -20, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                  <MapPin size={16} className="text-modrinth-green" />
                </motion.span>
We&rsquo;re on the move
                <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                  <Sparkles size={16} className="text-modrinth-green" />
                </motion.span>
              </motion.div>

              {/* Status bar for the new site */}
              <div className="mb-10 flex justify-center">
                <StatusBar />
              </div>

              {/* Headline */}
              <motion.h1
                variants={container}
                initial="hidden"
                animate="show"
                className="font-display font-black text-5xl sm:text-6xl lg:text-8xl leading-[1.05] tracking-tight"
              >
                {headline.map((w, i) => (
                  <motion.span
                    key={i}
                    variants={word}
                    className="inline-block mr-4 sm:mr-6 bg-gradient-to-r from-modrinth-green via-white to-modrinth-green bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer last:mr-0"
                  >
                    {w}
                  </motion.span>
                ))}
              </motion.h1>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
                className="mx-auto mt-6 h-1.5 w-36 rounded-full bg-gradient-to-r from-modrinth-green to-transparent glow-green"
              />

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
                className="mx-auto mt-6 max-w-xl text-lg sm:text-xl text-modrinth-muted leading-relaxed"
              >
                Rinthy is now <span className="font-semibold text-theme-text">Ryntra</span>. We&rsquo;ve
                opened the doors at our new home — come on over!
              </motion.p>

              {/* CTA to reveal bot check */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="mt-10 flex flex-col items-center gap-5"
              >
                <motion.button
                  onClick={() => setShowBot(true)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group btn-primary !px-9 !py-4 !text-lg glow-green-strong"
                >
                  <ShieldCheck size={20} />
                  Continue to the new site
                  <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
                </motion.button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div key="destination" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 120, damping: 14 }}>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight"
              >
                <span className="bg-gradient-to-r from-modrinth-green via-white to-modrinth-green bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
                  You&rsquo;re all set!
                </span>
              </motion.h2>

              <motion.a
                href={REDIRECT_URL}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="group mt-8 inline-flex items-center gap-3 rounded-full glass-strong px-6 py-3 text-lg font-semibold text-theme-text transition-colors duration-300 hover:border-modrinth-green glow-green-subtle"
              >
                <Globe size={20} className="text-modrinth-green" />
                <span className="text-modrinth-green">ryntra.sawiq.org</span>
                <ExternalLink size={20} className="text-modrinth-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </motion.a>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-10 flex flex-col items-center gap-5"
              >
                <motion.a
                  href={REDIRECT_URL}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group btn-primary !px-9 !py-4 !text-lg glow-green-strong"
                >
                  <Rocket size={20} />
                  Take me to the new site
                  <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
                </motion.a>

                <div className="flex items-center gap-2 text-sm text-modrinth-muted">
                  <Compass size={15} />
                  Redirecting automatically in{" "}
                  <motion.span
                    key={countdown}
                    initial={{ scale: 1.5 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="font-bold tabular-nums text-modrinth-green"
                  >
                    {countdown}s
                  </motion.span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bot check panel */}
        <div className="mt-10 flex justify-center">
          <AnimatePresence>
            {showBot && !verified && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <BotCheck onVerified={() => setVerified(true)} />
              </motion.div>
            )}
          </AnimatePresence>
</div>
      </div>
    </div>
  );
}
