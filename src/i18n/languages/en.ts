// ============================================================
//  English (en) — Source / reference language
//  Keep this file up-to-date when adding new UI strings.
// ============================================================

import type { Translations } from "../types";

export const en: Translations = {
  nav: {
    features: "Features",
    screenshots: "Screenshots",
    howItWorks: "How it works",
    download: "Download",
    tech: "Tech",
    gitHub: "GitHub",
    discord: "Discord",
  },
  hero: {
    badge: "Unofficial app for Modrinth",
    title: "Modrinth in",
    titleGradient: "your pocket.",
    description:
      "Rinthy lets Modrinth developers manage projects, track analytics, and handle versions — all from their phone. No desktop required.",
    downloadApk: "Download",
    exploreFeatures: "Explore features",
    stats: {
      fast: "Lightning fast",
      secure: "Secure OAuth",
      native: "Native feel",
    },
  },
  features: {
    badge: "Features",
    title: "Everything you need.",
    subtitle: "A full toolkit for Modrinth developers, redesigned for mobile.",
    items: [
      { title: "Projects Dashboard", desc: "Browse and manage all your Modrinth projects in one clean list." },
      { title: "Analytics", desc: "Track downloads, follows, and engagement trends in real time." },
      { title: "Version Management", desc: "View, create, and edit project versions from your phone." },
      { title: "Team Control", desc: "Add, remove, and manage project team members on the go." },
      { title: "Notifications", desc: "Stay on top of unread alerts without opening a browser." },
      { title: "Profile Editing", desc: "Update username, bio, and avatar directly in the app." },
      { title: "Appearance", desc: "Switch themes and pick your accent color for a personal touch." },
      { title: "Balance View", desc: "Check your Modrinth earnings and payout status instantly." },
      { title: "RU / EN", desc: "Full Russian and English language support baked in." },
    ],
  },
  screenshots: {
    badge: "Screenshots",
    title: "See it in action.",
    subtitle: "Clean, fast, and purpose-built for mobile.",
    labels: {
      login: "Login",
      dashboard: "Dashboard",
      analytics: "Analytics",
    },
  },
  steps: {
    badge: "How it works",
    title: "Three steps to power.",
    subtitle: "No complicated setup. Just install, log in, and go.",
    items: [
      {
        step: "01",
        title: "Get the app",
        desc: "Grab the latest APK from GitHub Releases or build from source. It's open source and free forever.",
      },
      {
        step: "02",
        title: "Sign in",
        desc: "Use Modrinth OAuth for a seamless login, or fall back to a Personal Access Token if you prefer.",
      },
      {
        step: "03",
        title: "Take control",
        desc: "Manage projects, check analytics, edit versions, and handle your team — all from your phone.",
      },
    ],
  },
  techStack: {
    badge: "Tech Stack",
    title: "Built with modern tools.",
    subtitle: "A lightweight, type-safe stack designed for performance and maintainability.",
  },
  download: {
    badge: "Get the app",
    title: "Download Rinthy.",
    subtitle: "Available on Android. iOS support is on the roadmap.",
    android: {
      title: "Android",
      desc: "APK download via GitHub Releases",
      button: "Download Latest",
    },
    ios: {
      title: "iOS",
      desc: "App Store release coming soon",
      button: "Coming Soon",
    },
  },
  footer: {
    tagline: "Unofficial Modrinth app",

    madeWith: "Made with",
    rinthyBy: "Rinthy by",
    websiteBy: "Website by",
    disclaimer: "Not affiliated with or endorsed by Modrinth.",
    viewOnGitHub: "View on GitHub",
    joinDiscord: "Join Discord",
  },
};


