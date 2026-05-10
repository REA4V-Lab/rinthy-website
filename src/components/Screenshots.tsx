import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { useI18n } from "../i18n/I18nContext";
import { usePerformanceProfile } from "../hooks/usePerformanceProfile";

const screenshots = [
  {
    src: "https://raw.githubusercontent.com/imsawiq/Rinthy/main/docs/screenshots/login.png",
    key: "login",
  },
  {
    src: "https://raw.githubusercontent.com/imsawiq/Rinthy/main/docs/screenshots/developer-panel.png",
    key: "dashboard",
  },
  {
    src: "https://raw.githubusercontent.com/imsawiq/Rinthy/main/docs/screenshots/analytics.png",
    key: "analytics",
  },
];

export default function Screenshots() {
  const { t } = useI18n();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const { enableAnimations, enableGlows } = usePerformanceProfile();

  const next = () => setActive((a) => (a + 1) % screenshots.length);
  const prev = () => setActive((a) => (a - 1 + screenshots.length) % screenshots.length);

  return (
    <section id="screenshots" className="relative py-20 sm:py-24 lg:py-28 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={enableAnimations ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: enableAnimations ? 0.7 : 0.01, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10 lg:mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-xs font-medium text-modrinth-green tracking-wide uppercase mb-5">
            {t.screenshots.badge}
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl mb-4">
            {t.screenshots.title}
          </h2>
          <p className="text-modrinth-muted max-w-xl mx-auto text-base sm:text-lg">
            {t.screenshots.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={enableAnimations ? { opacity: 0, y: 40 } : { opacity: 1, y: 0 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: enableAnimations ? 0.8 : 0.01, delay: enableAnimations ? 0.15 : 0, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="flex items-center justify-center gap-4 md:gap-6">
            <button
              onClick={prev}
              className="hidden md:flex w-12 h-12 rounded-full glass items-center justify-center hover:bg-white/10 transition-colors shrink-0"
              aria-label="Previous"
            >
              <ChevronLeft size={20} />
            </button>

            <div className={`relative w-full max-w-[18rem] sm:max-w-xs lg:max-w-[20rem] aspect-[9/19] rounded-[2rem] bg-modrinth-card border border-modrinth-border p-2.5 shadow-2xl overflow-hidden ${enableGlows ? "glow-green" : "glow-green-subtle"}`}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-20" />
              {enableAnimations ? (
                <AnimatePresence mode="wait">
                  <motion.img
                    key={active}
                    src={screenshots[active].src}
                    alt={t.screenshots.labels[screenshots[active].key as keyof typeof t.screenshots.labels]}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover rounded-[2rem] cursor-pointer"
                    onClick={() => setLightbox(active)}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                    loading="lazy"
                    decoding="async"
                  />
                </AnimatePresence>
              ) : (
                <img
                  key={active}
                  src={screenshots[active].src}
                  alt={t.screenshots.labels[screenshots[active].key as keyof typeof t.screenshots.labels]}
                  className="w-full h-full object-cover rounded-[2rem] cursor-pointer"
                  onClick={() => setLightbox(active)}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                  loading="lazy"
                  decoding="async"
                />
              )}
              <button
                onClick={() => setLightbox(active)}
                className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur flex items-center justify-center hover:bg-black/80 transition-colors z-20"
                aria-label="Expand"
              >
                <Maximize2 size={14} />
              </button>
            </div>

            <button
              onClick={next}
              className="hidden md:flex w-12 h-12 rounded-full glass items-center justify-center hover:bg-white/10 transition-colors shrink-0"
              aria-label="Next"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="flex items-center justify-center gap-3 mt-8">
            {screenshots.map((s, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`relative h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? "w-10 bg-modrinth-green" : "w-4 bg-modrinth-border hover:bg-white/20"
                }`}
                aria-label={t.screenshots.labels[s.key as keyof typeof t.screenshots.labels]}
              />
            ))}
          </div>

          <div className="flex md:hidden items-center justify-center gap-4 mt-4">
            <button
              onClick={prev}
              className="w-11 h-11 min-h-[44px] rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors touch-manipulation"
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="w-11 h-11 min-h-[44px] rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors touch-manipulation"
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>

      {enableAnimations && lightbox !== null && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setLightbox(null)}
          >
            <motion.img
              src={screenshots[lightbox].src}
              alt={t.screenshots.labels[screenshots[lightbox].key as keyof typeof t.screenshots.labels]}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="max-h-[85vh] max-w-full rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              loading="lazy"
              decoding="async"
            />
          </motion.div>
        </AnimatePresence>
      )}

      {!enableAnimations && lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <img
            src={screenshots[lightbox].src}
            alt={t.screenshots.labels[screenshots[lightbox].key as keyof typeof t.screenshots.labels]}
            className="max-h-[85vh] max-w-full rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            loading="lazy"
            decoding="async"
          />
        </div>
      )}
    </section>
  );
}

