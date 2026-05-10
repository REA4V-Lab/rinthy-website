import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FolderOpen,
  BarChart3,
  Package,
  Users,
  Bell,
  UserCircle,
  Palette,
  Wallet,
  Globe,
} from "lucide-react";
import { useTranslation } from "../i18n/I18nContext";
import { usePerformanceProfile } from "../hooks/usePerformanceProfile";

const featureIcons = [
  FolderOpen,
  BarChart3,
  Package,
  Users,
  Bell,
  UserCircle,
  Palette,
  Wallet,
  Globe,
];

function FeatureCard({
  icon: Icon,
  title,
  desc,
  index,
}: {
  icon: (typeof featureIcons)[0];
  title: string;
  desc: string;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { enableAnimations } = usePerformanceProfile();

  const animationProps = enableAnimations
    ? {
        initial: { opacity: 0, y: 40 },
        animate: inView ? { opacity: 1, y: 0 } : {},
        transition: {
          duration: 0.6,
          delay: index * 0.08,
          ease: [0.22, 1, 0.36, 1],
        },
      }
    : {};

  return (
    <motion.div
      ref={ref}
      {...animationProps}
      className="card group hover:border-modrinth-green/30 transition-all duration-500"
    >
      <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-modrinth-green/10 text-modrinth-green group-hover:bg-modrinth-green group-hover:text-modrinth-dark transition-all duration-300">
        <Icon size={20} strokeWidth={2} />
      </div>
      <h3 className="font-display font-semibold text-lg mb-3">{title}</h3>
      <p className="text-sm text-modrinth-muted leading-relaxed">{desc}</p>
    </motion.div>
  );
}

export default function Features() {
  const t = useTranslation();
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const { enableAnimations } = usePerformanceProfile();

  const headerAnimationProps = enableAnimations
    ? {
        initial: { opacity: 0, y: 30 },
        animate: headerInView ? { opacity: 1, y: 0 } : {},
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
      }
    : {};

  return (
    <section id="features" className="section">
      <div className="section-container">
        <motion.div
          ref={headerRef}
          {...headerAnimationProps}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1.5 rounded-full glass text-xs font-medium text-modrinth-green tracking-wide uppercase mb-6 border border-modrinth-green/20">
            {t.features.badge}
          </span>
          <h2 className="text-section-title mb-6">
            {t.features.title}
          </h2>
          <p className="text-section-subtitle max-w-2xl mx-auto">
            {t.features.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.features.items.map((feature, i) => (
            <FeatureCard
              key={feature.title}
              icon={featureIcons[i]}
              title={feature.title}
              desc={feature.desc}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
