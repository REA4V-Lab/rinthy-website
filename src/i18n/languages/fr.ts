import type { Translations } from "../types";

export const fr: Translations = {
  nav: {

    features: "Fonctions",
    screenshots: "Captures",
    howItWorks: "Comment ça marche",
    download: "Télécharger",
    tech: "Tech",
    gitHub: "GitHub",
    discord: "Discord",
  },
  hero: {
    badge: "Application non officielle pour Modrinth",
    title: "Modrinth dans",
    titleGradient: "votre poche.",
    description:
      "Rinthy permet aux développeurs Modrinth de gérer leurs projets, suivre les statistiques et gérer les versions — le tout depuis leur téléphone. Aucun ordinateur requis.",
    downloadApk: "Télécharger",
    exploreFeatures: "Explorer les fonctions",
    stats: {
      fast: "Éclair de rapidité",
      secure: "OAuth sécurisé",
      native: "Sensation native",
    },
  },
  features: {
    badge: "Fonctions",
    title: "Tout ce dont vous avez besoin.",
    subtitle:
      "Une boîte à outils complète pour les développeurs Modrinth, repensée pour le mobile.",
    items: [
      {
        title: "Tableau de bord des projets",
        desc: "Parcourez et gérez tous vos projets Modrinth dans une liste claire.",
      },
      {
        title: "Analytiques",
        desc: "Suivez les téléchargements, les abonnés et les tendances d'engagement en temps réel.",
      },
      {
        title: "Gestion des versions",
        desc: "Visualisez, créez et modifiez les versions de vos projets depuis votre téléphone.",
      },
      {
        title: "Contrôle d'équipe",
        desc: "Ajoutez, supprimez et gérez les membres de l'équipe de vos projets en déplacement.",
      },
      {
        title: "Notifications",
        desc: "Restez au courant des alertes non lues sans ouvrir de navigateur.",
      },
      {
        title: "Édition du profil",
        desc: "Mettez à jour votre nom d'utilisateur, votre bio et votre avatar directement dans l'app.",
      },
      {
        title: "Apparence",
        desc: "Changez de thème et choisissez votre couleur d'accentuation pour une touche personnelle.",
      },
      {
        title: "Vue du solde",
        desc: "Consultez instantanément vos revenus Modrinth et l'état des paiements.",
      },
      {
        title: "RU / EN",
        desc: "Support complet du russe et de l'anglais intégré.",
      },
    ],
  },
  screenshots: {
    badge: "Captures d'écran",
    title: "Voyez-le en action.",
    subtitle: "Épuré, rapide et conçu pour le mobile.",
    labels: {
      login: "Connexion",
      dashboard: "Tableau de bord",
      analytics: "Analitiques",
    },
  },
  steps: {
    badge: "Comment ça marche",
    title: "Trois étapes vers la puissance.",
    subtitle:
      "Pas de configuration compliquée. Installaez, connectez-vous et c'est parti.",
    items: [
      {
        step: "01",
        title: "Obtenir l'app",
        desc: "Récupérez le dernier APK sur GitHub Releases ou compilez depuis les sources. C'est open source et gratuit à vie.",
      },
      {
        step: "02",
        title: "Se connecter",
        desc: "Utilisez Modrinth OAuth pour une connexion fluide, ou un jeton d'accès personnel si vous préférez.",
      },
      {
        step: "03",
        title: "Prendre le contrôle",
        desc: "Gérez vos projets, vérifiez vos statistiques, modifiez les versions et gérez votre équipe — tout depuis votre mobile.",
      },
    ],
  },
  techStack: {
    badge: "Stack Tech",
    title: "Construit avec des outils modernes.",
    subtitle:
      "Une stack légère et type-safe conçue pour la performance et la maintenabilité.",
  },
  download: {
    badge: "Obtenir l'application",
    title: "Télécharger Rinthy.",
    subtitle: "Disponible sur Android. Le support iOS est prévu.",
    android: {
      title: "Android",
      desc: "Téléchargement de l'APK via GitHub Releases",
      button: "Dernière version",
    },
    ios: {
      title: "iOS",
      desc: "Sortie sur l'App Store bientôt disponible",
      button: "Bientôt disponible",
    },
  },

  footer: {

    tagline: "Application Modrinth non officielle",
    madeWith: "Fait avec",
    rinthyBy: "Rinthy par",
    websiteBy: "Site par",
    disclaimer: "Non affilié à ou approuvé par Modrinth.",
    viewOnGitHub: "Voir sur GitHub",
    joinDiscord: "Rejoindre le Discord",
  },
};
