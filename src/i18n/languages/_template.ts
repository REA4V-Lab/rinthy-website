// ============================================================
//  Translation Template — Copy this file to add a new language
// ============================================================
//
//  1. Duplicate this file and rename it to your language code
//     (e.g. `de.ts` for German, `es.ts` for Spanish, `fr.ts` for French)
//
//  2. Add your language code to `src/i18n/types.ts`:
//       export type Language = "en" | "ru" | "it" | "de";
//
//  3. Import and export it in `src/i18n/languages/index.ts`:
//       import { de } from "./de";
//       export const allTranslations = { en, ru, it, de };
//
//  4. Add the language button in `src/components/LanguageSwitcher.tsx`:
//       { code: "de", label: "DE" }
//
//  5. Replace every "TODO" below with the translated string.
//
// ============================================================

import type { Translations } from "../types";

export const TODO: Translations = {
  nav: {
    features: "TODO",
    screenshots: "TODO",
    howItWorks: "TODO",
    tech: "TODO",
    gitHub: "GitHub",
    discord: "Discord",
  },
  hero: {
    badge: "TODO",
    title: "TODO",
    titleGradient: "TODO",
    description: "TODO",
    downloadApk: "TODO",
    exploreFeatures: "TODO",
    stats: {
      fast: "TODO",
      secure: "TODO",
      native: "TODO",
    },
  },
  features: {
    badge: "TODO",
    title: "TODO",
    subtitle: "TODO",
    items: [
      { title: "TODO", desc: "TODO" },
      { title: "TODO", desc: "TODO" },
      { title: "TODO", desc: "TODO" },
      { title: "TODO", desc: "TODO" },
      { title: "TODO", desc: "TODO" },
      { title: "TODO", desc: "TODO" },
      { title: "TODO", desc: "TODO" },
      { title: "TODO", desc: "TODO" },
      { title: "TODO", desc: "TODO" },
    ],
  },
  screenshots: {
    badge: "TODO",
    title: "TODO",
    subtitle: "TODO",
    labels: {
      login: "TODO",
      dashboard: "TODO",
      analytics: "TODO",
    },
  },
  steps: {
    badge: "TODO",
    title: "TODO",
    subtitle: "TODO",
    items: [
      { step: "01", title: "TODO", desc: "TODO" },
      { step: "02", title: "TODO", desc: "TODO" },
      { step: "03", title: "TODO", desc: "TODO" },
    ],
  },
  techStack: {
    badge: "TODO",
    title: "TODO",
    subtitle: "TODO",
  },
  download: {
    badge: "TODO",
    title: "TODO",
    subtitle: "TODO",
    android: {
      title: "TODO",
      desc: "TODO",
      button: "TODO",
    },
    ios: {
      title: "TODO",
      desc: "TODO",
      button: "TODO",
    },
  },

  footer: {

    tagline: "TODO",
    madeWith: "TODO",
    madeBy: "TODO",
    disclaimer: "TODO",
    viewOnGitHub: "TODO",
    joinDiscord: "TODO",
  },
};

