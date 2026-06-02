import React, { useState, useEffect, useRef, useCallback } from "react";
import { useI18n } from "../i18n/I18nContext";
import type { Language } from "../i18n/types";
import { ChevronDown } from "lucide-react";

const languages: { code: Language; label: string; icon: React.ReactNode }[] = [
  { code: "en" as Language, label: "EN", icon: null },
  { code: "ru" as Language, label: "RU", icon: null },
  { code: "it" as Language, label: "IT", icon: null },
  { code: "fr" as Language, label: "FR", icon: null },
];



const LanguageSwitcherInner = function LanguageSwitcher({ onSelect }: { onSelect?: () => void }) {
  const { lang, setLang } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find((l) => l.code === lang)?.label || "EN";

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleSelect = useCallback((code: Language) => {
    setLang(code);
    setIsOpen(false);
    onSelect?.();
  }, [setLang, onSelect]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const reducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Toggle Button */}
      <button
        onClick={handleToggle}
        className="group flex items-center gap-1 px-3 py-1.5 rounded-lg border border-modrinth-border bg-white/5 backdrop-blur-sm hover:border-modrinth-green/50 hover:bg-modrinth-green/5 transition-all duration-300 text-xs font-medium"
        aria-label={`Current language: ${currentLanguage}, toggle menu`}
        aria-haspopup="menu"
        type="button"

      >
        <span className="flex items-center gap-2">
          <span className="text-base leading-none">
            {languages.find((l) => l.code === lang)?.icon}
          </span>
          <span className="font-medium">{currentLanguage}</span>
        </span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-300 ease-in-out ${isOpen ? "rotate-180" : ""}`}
        />

      </button>

      {/* Dropdown Menu - Smooth Animation */}
      <div 
        className={`absolute right-0 mt-1.5 w-28 rounded-xl border border-modrinth-border shadow-2xl backdrop-blur-md overflow-hidden z-50 glass-strong ${
          reducedMotion 
            ? '' 
            : isOpen 
              ? 'opacity-100 scale-100 translate-y-0 shadow-glow-green' 
              : 'opacity-0 scale-95 -translate-y-1 pointer-events-none'
        } transition-all duration-200 ease-out origin-top-right`}
      >
        {languages.map(({ code, label }) => (
          <button
            key={code}
            onClick={() => handleSelect(code)}
            className={`w-full text-left first:rounded-t-xl last:rounded-b-xl px-3 py-2 text-xs font-medium transition-all duration-200 flex items-center justify-between hover:bg-white/10 ${
              lang === code
                ? "bg-modrinth-green/15 text-modrinth-green font-semibold shadow-glow-green-strong"
                : "text-modrinth-muted hover:text-white"
            }`}
            aria-label={`Switch to ${label}`}
          >
            <div className="flex items-center gap-2">
              <span className="text-base leading-none">{languages.find((l) => l.code === code)?.icon}</span>
              <span>{label}</span>
            </div>
            {lang === code && <div className="w-2 h-2 bg-current rounded-full" />}
          </button>
        ))}
      </div>

    </div>
  );
};

export default React.memo(LanguageSwitcherInner);

