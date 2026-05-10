import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import type { Theme, ThemeConfig } from "./themes";
import { themes } from "./themes";

interface ThemeContextValue {
  theme: Theme;
  themeConfig: ThemeConfig;
  setTheme: (theme: Theme) => void;
  availableThemes: Theme[];
  registerRuntimeTheme: (key: string, themeConfig: ThemeConfig) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const savedTheme = localStorage.getItem("rinthy-theme") as Theme;
      return savedTheme && savedTheme in themes ? savedTheme : "dark";
    } catch {
      return "dark";
    }
  });

  const [runtimeThemes, setRuntimeThemes] = useState<Record<string, ThemeConfig>>({});

  const allThemes = { ...themes, ...runtimeThemes };
  const themeConfig = allThemes[theme];

  useEffect(() => {
    // Apply theme to CSS custom properties
    const root = document.documentElement;
    const colors = themeConfig.colors;

    root.style.setProperty("--theme-background", colors.background);
    root.style.setProperty("--theme-card", colors.card);
    root.style.setProperty("--theme-border", colors.border);
    root.style.setProperty("--theme-text", colors.text);
    root.style.setProperty("--theme-text-muted", colors.textMuted);
    root.style.setProperty("--theme-primary", colors.primary);
    root.style.setProperty("--theme-primary-dark", colors.primaryDark);
    root.style.setProperty("--theme-secondary", colors.secondary);
    root.style.setProperty("--theme-glass-bg", colors.glassBg);
    root.style.setProperty("--theme-glass-border", colors.glassBorder);

    // Update body background
    document.body.style.backgroundColor = colors.background;

    // Save to localStorage
    try {
      localStorage.setItem("rinthy-theme", theme);
    } catch {}
  }, [theme, themeConfig]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  const registerRuntimeTheme = useCallback((key: string, themeConfig: ThemeConfig) => {
    setRuntimeThemes(prev => ({
      ...prev,
      [key]: themeConfig
    }));
  }, []);

  const availableThemes = Object.keys(allThemes) as Theme[];

  return (
    <ThemeContext.Provider value={{
      theme,
      themeConfig,
      setTheme,
      availableThemes,
      registerRuntimeTheme,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
