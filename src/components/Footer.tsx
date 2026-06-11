import { motion } from "framer-motion";
import { Heart, MessageCircle } from "lucide-react";
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
              <svg aria-hidden="true" viewBox="0 0 16 16" width="15" height="15" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>
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

            <a
              href="#donate"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
              aria-label="Donate"
            >
              <span className="text-modrinth-green group-hover:text-white transition-colors font-semibold">$</span>
              Donate
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
        <p className="mt-4 text-center text-xs text-modrinth-muted">
          {t.footer.cookiesNote}
        </p>
      </div>
    </footer>
  );
}
