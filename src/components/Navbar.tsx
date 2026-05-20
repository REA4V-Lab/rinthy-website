import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Menu, X, Github, MessageCircle } from "lucide-react";
import { useTranslation } from "../i18n/I18nContext";
import { usePerformanceProfile } from "../hooks/usePerformanceProfile";
import { useTheme } from "../ThemeContext";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Navbar() {
  const t = useTranslation();
  const { theme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { enableAnimations, enableBlur } = usePerformanceProfile();

  const navLinks = useMemo(
    () => [
      { label: t.nav.features, href: "#features" },
      { label: t.nav.screenshots, href: "#screenshots" },
      { label: t.nav.howItWorks, href: "#how-it-works" },
      { label: t.nav.download, href: "#download" },
      { label: t.nav.tech, href: "#tech" },
    ],
    [t.nav]
  );

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Theme-aware navbar background
  const getNavbarBackground = () => {
    if (enableBlur) {
      return scrolled || mobileOpen
        ? "glass-strong"
        : theme === "light"
        ? "bg-white/80 backdrop-blur-md md:bg-transparent md:backdrop-blur-0"
        : "bg-modrinth-dark/72 backdrop-blur-md md:bg-transparent md:backdrop-blur-0";
    }

    return scrolled || mobileOpen
      ? "glass-strong-simple"
      : theme === "light"
      ? "bg-white/95 md:bg-transparent"
      : "bg-modrinth-dark/95 md:bg-transparent";
  };

  return (
    <motion.nav
      initial={enableAnimations ? { y: -80 } : { y: 0 }}
      animate={{ y: 0 }}
      transition={{ duration: enableAnimations ? 0.6 : 0.01, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 ${getNavbarBackground()} border-b border-modrinth-border/50 md:border-b-0`}
    >
      <div className="section-container py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
              theme === "light" ? "bg-gray-100" : "bg-modrinth-card"
            }`}
          >
            <img src="/logo.png" alt="Rinthy" className="w-5 h-5" />
          </div>
          <span
            className={`font-display font-bold text-xl tracking-tight ${
              theme === "light" ? "text-gray-900" : "text-white"
            }`}
          >
            Rinthy
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors duration-300 relative group ${
                theme === "light"
                  ? "text-gray-600 hover:text-gray-900"
                  : "text-modrinth-muted hover:text-white"
              }`}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-modrinth-green group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://github.com/imsawiq/Rinthy"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-compact group min-h-[44px] min-w-[44px]"
            aria-label="View on GitHub"
          >
            <Github size={14} />
            <span className="hidden lg:inline">{t.nav.gitHub}</span>
          </a>
          <a
            href="https://discord.gg/wzXpC2C6Uu"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-compact group min-h-[44px] min-w-[44px]"
            aria-label="Join Discord"
          >
            <MessageCircle size={14} />
            <span className="hidden lg:inline">{t.nav.discord}</span>
          </a>
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden p-3 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg transition-colors ${
            theme === "light" ? "hover:bg-gray-100" : "hover:bg-white/5"
          }`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={enableAnimations ? { opacity: 0, height: 0 } : { opacity: 1, height: "auto" }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className={`md:hidden border-t border-modrinth-border ${enableBlur ? "glass-strong" : "glass-strong-simple"}`}
        >
          <div className="px-6 py-6 flex flex-col gap-5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`transition-colors py-3 min-h-[44px] flex items-center text-base ${
                  theme === "light"
                    ? "text-gray-600 hover:text-gray-900"
                    : "text-modrinth-muted hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}

            <div className="flex flex-col gap-3 pt-3 border-t border-modrinth-border">
              <a
                href="https://github.com/imsawiq/Rinthy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-modrinth-green py-3 px-3 rounded-lg hover:bg-modrinth-green/10 transition-colors"
              >
                <Github size={18} />
                <span className="font-medium">{t.footer.viewOnGitHub}</span>
              </a>
              <a
                href="https://discord.gg/wzXpC2C6Uu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#5865F2] py-3 px-3 rounded-lg hover:bg-[#5865F2]/10 transition-colors"
              >
                <MessageCircle size={18} />
                <span className="font-medium">{t.footer.joinDiscord}</span>
              </a>
              <div className="pt-2">
                <LanguageSwitcher />
                <ThemeSwitcher />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

