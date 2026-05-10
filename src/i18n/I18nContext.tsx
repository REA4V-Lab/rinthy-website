import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import type { Language, Translations } from "./types";
import { allTranslations } from "./languages";

const supportedLanguages = Object.keys(allTranslations) as Language[];

function isSupportedLanguage(value: string | null): value is Language {
  return Boolean(value && supportedLanguages.includes(value as Language));
}

function detectBrowserLanguage(): Language {
  if (typeof navigator === "undefined") return "en";

  const candidates = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];

  for (const candidate of candidates) {
    const baseCode = candidate.toLowerCase().split("-")[0];
    if (isSupportedLanguage(baseCode)) return baseCode;
  }

  return "en";
}

interface I18nContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
  supportedLanguages: Language[];
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    try {
      const savedLang = localStorage.getItem("rinthy-lang");
      return isSupportedLanguage(savedLang) ? savedLang : detectBrowserLanguage();
    } catch {
      return detectBrowserLanguage();
    }
  });

  const [t, setT] = useState<Translations>(allTranslations[lang]);

  useEffect(() => {
    setT(allTranslations[lang]);
    document.documentElement.lang = lang;
  }, [lang]);

  const changeLang = useCallback((newLang: Language) => {
    setLang(newLang);
    try {
      localStorage.setItem("rinthy-lang", newLang);
    } catch {}
  }, []);

  return (
    <I18nContext.Provider value={{
      lang,
      setLang: changeLang,
      t,
      supportedLanguages
    }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}

// Helper hook for easier translation access
export function useTranslation() {
  const { t } = useI18n();
  return t;
}
