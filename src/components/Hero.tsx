import { motion } from "framer-motion";
import { ArrowDown, Smartphone, Zap, Shield } from "lucide-react";
import { useTranslation } from "../i18n/I18nContext";
import { usePerformanceProfile } from "../hooks/usePerformanceProfile";

export default function Hero() {
  const t = useTranslation();
  const { enableAnimations } = usePerformanceProfile();

  const fadeUpVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  };
  // ste merde non va tutto buggy bruh

  const animationProps = enableAnimations
    ? fadeUpVariants
    : { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } };

  return (
    <section className="relative min-h-screen flex items-center pt-20 px-6 overflow-hidden">
      <div className="section-container w-full grid lg:grid-cols-2 gap-8 xs:gap-10 sm:gap-12 items-center">
        {/* Content */}
        <div className="space-y-6 xs:space-y-7 sm:space-y-8 z-10">
          <motion.div
            {...animationProps}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-modrinth-green tracking-wide uppercase border border-modrinth-green/20"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-modrinth-green animate-pulse" />
            {t.hero.badge}
          </motion.div>
          <motion.h1
            {...animationProps}
            transition={{
              duration: 0.6,
              delay: 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-hero"
          >
            {t.hero.title}
            <br />
            <span className="text-gradient">{t.hero.titleGradient}</span>
          </motion.h1>

          <motion.p
            {...animationProps}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-section-subtitle max-w-lg max-[420px]:text-base"
          >
            {t.hero.description}
          </motion.p>

          <motion.div
            {...animationProps}
            transition={{
              duration: 0.8,
              delay: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-wrap gap-3"
          >
            <a href="#download" className="btn-primary">
              <Smartphone size={16} />
              {t.hero.downloadApk}
            </a>
            <a href="#features" className="btn-secondary">
              {t.hero.exploreFeatures}
              {enableAnimations && (
                <ArrowDown size={14} className="animate-bounce" />
              )}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="flex items-center gap-6 pt-4"
          >
            {[
              { icon: Zap, label: t.hero.stats.fast },
              { icon: Shield, label: t.hero.stats.secure },
              { icon: Smartphone, label: t.hero.stats.native },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-modrinth-muted">
                <item.icon size={14} className="text-modrinth-green" />
                <span>{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Phone Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{
            duration: 1,
            delay: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative flex justify-center lg:justify-end perspective-1000"
        >
          <div className="relative w-full max-w-xs sm:max-w-sm mx-auto">
            <div className="absolute inset-0 bg-gradient-to-tr from-modrinth-green/20 to-transparent rounded-[3rem] blur-2xl" />
            <div className="relative bg-modrinth-card border border-modrinth-border rounded-[2.5rem] p-3 shadow-2xl glow-green touch-manipulation">
              <div className="bg-modrinth-dark rounded-[2rem] overflow-hidden aspect-[9/19] relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-20" />
                <div className="p-4 xs:p-5 pt-8 xs:pt-10 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                      <img src="/logo.png" alt="Rinthy" className="w-6 h-6" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-modrinth-border" />
                  </div>
                  <div className="space-y-3 mb-6">
                    <div className="h-3 w-3/4 bg-modrinth-border rounded-full" />
                    <div className="h-3 w-1/2 bg-modrinth-border rounded-full" />
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-20 rounded-2xl bg-modrinth-border/50" />
                    ))}
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="h-14 rounded-xl bg-modrinth-border/30 flex items-center px-4 gap-3">
                      <div className="w-8 h-8 rounded-lg bg-modrinth-border/20" />
                      <div className="space-y-1.5 flex-1">
                        <div className="h-2.5 w-2/3 bg-modrinth-border rounded-full" />
                        <div className="h-2 w-1/3 bg-modrinth-border/60 rounded-full" />
                      </div>
                    </div>
                    <div className="h-14 rounded-xl bg-modrinth-border/30 flex items-center px-4 gap-3">
                      <div className="w-8 h-8 rounded-lg bg-modrinth-border/20" />
                      <div className="space-y-1.5 flex-1">
                        <div className="h-2.5 w-1/2 bg-modrinth-border rounded-full" />
                        <div className="h-2 w-1/4 bg-modrinth-border/60 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {enableAnimations && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={20} className="text-modrinth-muted" />
        </motion.div>
      )}
    </section>
  );
}
