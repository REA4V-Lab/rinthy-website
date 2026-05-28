// ============================================================
//  Theme System — Color schemes and theme management
// ============================================================

export type Theme = "dark" | "light" | "blue" | "purple";


export interface ThemeConfig {
  name: string;
  colors: {
    // Background colors
    background: string;
    card: string;
    border: string;

    // Text colors
    text: string;
    textMuted: string;

    // Accent colors
    primary: string;
    primaryDark: string;
    secondary: string;

    // Glass effects
    glassBg: string;
    glassBorder: string;
  };
}


export const themes: Record<Theme, ThemeConfig> = {

  dark: {
    name: "Dark",
    colors: {
      background: "#0D0D0D",
      card: "#141414",
      border: "#1F1F1F",
      text: "#ffffff",
      textMuted: "#8A8A8A",
      primary: "#1BD96A",
      primaryDark: "#0D0D0D",
      secondary: "#5865F2",
      glassBg: "rgba(20, 20, 20, 0.6)",
      glassBorder: "rgba(255, 255, 255, 0.06)",
    },
  },
  light: {
    name: "Light",
    colors: {
      background: "#ffffff",
      card: "#f8f9fa",
      border: "#e9ecef",
      text: "#212529",
      textMuted: "#6c757d",
      primary: "#1BD96A",
      primaryDark: "#ffffff",
      secondary: "#5865F2",
      glassBg: "rgba(255, 255, 255, 0.8)",
      glassBorder: "rgba(0, 0, 0, 0.1)",
    },
  },
  blue: {
    name: "Blue",
    colors: {
      background: "#0f1419",
      card: "#1a2332",
      border: "#2a3c50",
      text: "#ffffff",
      textMuted: "#8a9ba8",
      primary: "#1DA1F2",
      primaryDark: "#0f1419",
      secondary: "#657786",
      glassBg: "rgba(26, 35, 50, 0.6)",
      glassBorder: "rgba(255, 255, 255, 0.08)",
    },
  },
  purple: {
    name: "Purple",
    colors: {
      background: "#0d0b14",
      card: "#1a1525",
      border: "#2a1f3d",
      text: "#ffffff",
      textMuted: "#9d8bb9",
      primary: "#8B5CF6",
      primaryDark: "#0d0b14",
      secondary: "#6366f1",
      glassBg: "rgba(26, 21, 37, 0.6)",
      glassBorder: "rgba(255, 255, 255, 0.08)",
    },
  },

};

