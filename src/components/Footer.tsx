import { motion } from "framer-motion";
import { Github, Heart, MessageCircle } from "lucide-react";
import { useI18n } from "../i18n/I18nContext";
import { usePerformanceProfile } from "../hooks/usePerformanceProfile";

export default function Footer() {
  const { t } = useI18n();
  const { enableAnimations } = usePerformanceProfile();

  return (
    <footer className="relative border-t border-modrinth-border py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={enableAnimations ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: enableAnimations ? 0.7 : 0.01, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center">
              <img src="/logo.png" alt="Rinthy" className="w-5 h-5" />
            </div>
            <div>
              <span className="font-display font-bold text-lg">Rinthy</span>
              <p className="text-xs text-modrinth-muted">{t.footer.tagline}</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-modrinth-muted">
            <a
              href="https://github.com/imsawiq/Rinthy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Github size={15} />
              GitHub
            </a>
            <a
              href="https://discord.gg/wzXpC2C6Uu"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <MessageCircle size={15} />
              Discord
            </a>
          </div>
        </motion.div>

        <div className="mt-10 pt-8 border-t border-modrinth-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-modrinth-muted">
          <p className="flex flex-wrap items-center justify-center sm:justify-start gap-x-1.5 gap-y-1">
            <span>{t.footer.madeWith}</span>
            <Heart size={12} className="text-red-500 fill-red-500" />
            <span>{t.footer.rinthyBy}</span>
            <a
              href="https://github.com/imsawiq"
              target="_blank"
              rel="noopener noreferrer"
              className="text-modrinth-green hover:text-white transition-colors"
            >
              sawiq
            </a>
            <span>{t.footer.websiteBy}</span>
            <a
              href="https://github.com/EmanuelPlays"
              target="_blank"
              rel="noopener noreferrer"
              className="text-modrinth-green hover:text-white transition-colors"
            >
              EmanuelPlays
            </a>
          </p>
          <p>
            {t.footer.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
}
