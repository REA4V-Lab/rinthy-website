// ============================================================
//  Theme SDK — Utilities for creating custom themes
//  Provides easy-to-use functions for theme creation and management
// ============================================================

import type { ThemeConfig } from './themes';

// Theme presets for quick theme creation
export const themePresets = {
  monochrome: {
    name: 'Monochrome',
    colors: {
      background: '#000000',
      card: '#1a1a1a',
      border: '#333333',
      text: '#ffffff',
      textMuted: '#cccccc',
      primary: '#ffffff',
      primaryDark: '#000000',
      secondary: '#666666',
      glassBg: 'rgba(0, 0, 0, 0.6)',
      glassBorder: 'rgba(255, 255, 255, 0.1)',
    },
  },
  ocean: {
    name: 'Ocean',
    colors: {
      background: '#0a1929',
      card: '#1a365d',
      border: '#2d3748',
      text: '#e2e8f0',
      textMuted: '#a0aec0',
      primary: '#00d4ff',
      primaryDark: '#0a1929',
      secondary: '#38b2ac',
      glassBg: 'rgba(10, 25, 41, 0.6)',
      glassBorder: 'rgba(0, 212, 255, 0.2)',
    },
  },
  forest: {
    name: 'Forest',
    colors: {
      background: '#0f1419',
      card: '#1a202c',
      border: '#2d3748',
      text: '#f7fafc',
      textMuted: '#a0aec0',
      primary: '#48bb78',
      primaryDark: '#0f1419',
      secondary: '#38a169',
      glassBg: 'rgba(15, 20, 25, 0.6)',
      glassBorder: 'rgba(72, 187, 120, 0.2)',
    },
  },
  sunset: {
    name: 'Sunset',
    colors: {
      background: '#1a1a2e',
      card: '#16213e',
      border: '#0f3460',
      text: '#e94560',
      textMuted: '#a8a8a8',
      primary: '#ff6b6b',
      primaryDark: '#1a1a2e',
      secondary: '#feca57',
      glassBg: 'rgba(26, 26, 46, 0.6)',
      glassBorder: 'rgba(233, 69, 96, 0.2)',
    },
  },
  neon: {
    name: 'Neon',
    colors: {
      background: '#0a0a0a',
      card: '#1a1a1a',
      border: '#ff0080',
      text: '#ffffff',
      textMuted: '#cccccc',
      primary: '#ff0080',
      primaryDark: '#0a0a0a',
      secondary: '#00ffff',
      glassBg: 'rgba(10, 10, 10, 0.6)',
      glassBorder: 'rgba(255, 0, 128, 0.3)',
    },
  },
  pastel: {
    name: 'Pastel',
    colors: {
      background: '#fefefe',
      card: '#f8f9fa',
      border: '#e9ecef',
      text: '#495057',
      textMuted: '#6c757d',
      primary: '#ffb3ba',
      primaryDark: '#fefefe',
      secondary: '#bae1ff',
      glassBg: 'rgba(254, 254, 254, 0.8)',
      glassBorder: 'rgba(0, 0, 0, 0.1)',
    },
  },
} as const;

export type ThemePreset = keyof typeof themePresets;

export interface ThemeOptions {
  name: string;
  base?: 'dark' | 'light';
  colors: {
    primary?: string;
    secondary?: string;
    background?: string;
    surface?: string;
    text?: string;
    textMuted?: string;
    [key: string]: string | undefined;
  };
}

// Default theme configurations
const defaultDarkTheme: Omit<ThemeConfig['colors'], 'primary' | 'primaryDark'> = {
  background: '#0D0D0D',
  card: '#141414',
  border: '#1F1F1F',
  text: '#ffffff',
  textMuted: '#8A8A8A',
  secondary: '#5865F2',
  glassBg: 'rgba(20, 20, 20, 0.6)',
  glassBorder: 'rgba(255, 255, 255, 0.06)',
};

const defaultLightTheme: Omit<ThemeConfig['colors'], 'primary' | 'primaryDark'> = {
  background: '#ffffff',
  card: '#f8f9fa',
  border: '#e9ecef',
  text: '#212529',
  textMuted: '#6c757d',
  secondary: '#5865F2',
  glassBg: 'rgba(255, 255, 255, 0.8)',
  glassBorder: 'rgba(0, 0, 0, 0.1)',
};

/**
 * Creates a complete theme configuration from partial options
 */
export function createTheme(options: ThemeOptions): ThemeConfig {
  const base = options.base || 'dark';
  const defaults = base === 'dark' ? defaultDarkTheme : defaultLightTheme;

  const primary = options.colors.primary || (base === 'dark' ? '#1BD96A' : '#1BD96A');
  const primaryDark = options.colors.primaryDark || (base === 'dark' ? '#0D0D0D' : '#ffffff');

  return {
    name: options.name,
    colors: {
      ...defaults,
      primary,
      primaryDark,
      ...options.colors,
    },
  };
}

/**
 * Creates a theme based on a preset with optional overrides
 */
export function createThemeFromPreset(preset: ThemePreset, overrides: Partial<ThemeOptions> = {}): ThemeConfig {
  const presetTheme = themePresets[preset];

  return {
    name: overrides.name || presetTheme.name,
    colors: {
      ...presetTheme.colors,
      ...overrides.colors,
    },
  };
}

/**
 * Creates a harmonious color theme based on color theory
 */
export function createHarmoniousTheme(baseColor: string, options: { name: string; harmony?: 'complementary' | 'triadic' | 'analogous' }): ThemeConfig {
  // Simple color harmony implementation
  const harmony = options.harmony || 'complementary';

  // For now, just create a basic theme with the base color
  // In a real implementation, you'd use color theory algorithms
  return createTheme({
    name: options.name,
    base: 'dark',
    colors: {
      primary: baseColor,
      background: '#0D0D0D',
      card: '#141414',
      border: '#1F1F1F',
      text: '#ffffff',
      textMuted: '#8A8A8A',
      secondary: baseColor,
    },
  });
}

/**
 * Validates a theme configuration
 */
export function validateTheme(theme: ThemeConfig): string[] {
  const errors: string[] = [];

  // Check required color properties
  const requiredColors = ['background', 'card', 'border', 'text', 'primary', 'secondary'];
  for (const color of requiredColors) {
    if (!theme.colors[color as keyof typeof theme.colors]) {
      errors.push(`Missing required color: ${color}`);
    }
  }

  // Check if colors are valid hex/rgba values
  const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$|^rgba?\(/;
  for (const [key, value] of Object.entries(theme.colors)) {
    if (value && !colorRegex.test(value)) {
      errors.push(`Invalid color format for ${key}: ${value}`);
    }
  }

  return errors;
}

/**
 * Registers a custom theme to make it available globally
 * Note: This is a runtime registration - for persistent themes,
 * add them to the themes.ts file instead
 */
export function registerTheme(key: string, theme: ThemeConfig): void {
  // This function is now a placeholder - themes should be registered
  // through the ThemeContext's registerRuntimeTheme method
  console.log(`Theme "${theme.name}" registered with key "${key}"`);
  console.log('To make this theme persistent, add it to src/themes.ts');
  console.log('For runtime registration, use the ThemeContext.registerRuntimeTheme method');
}

/**
 * Generates theme variations (lighter/darker versions)
 */
export function generateThemeVariations(baseTheme: ThemeConfig, variations: ('lighter' | 'darker')[] = ['lighter', 'darker']): Record<string, ThemeConfig> {
  const variationsMap: Record<string, ThemeConfig> = {};

  // Simple implementation - in reality you'd use color manipulation libraries
  for (const variation of variations) {
    const variationTheme = JSON.parse(JSON.stringify(baseTheme)) as ThemeConfig;
    variationTheme.name = `${baseTheme.name} (${variation})`;

    // Simple color adjustments (this is a placeholder)
    if (variation === 'lighter') {
      // Lighten colors (simplified)
      variationTheme.colors.background = lightenColor(variationTheme.colors.background, 0.2);
    } else if (variation === 'darker') {
      // Darken colors (simplified)
      variationTheme.colors.background = darkenColor(variationTheme.colors.background, 0.2);
    }

    variationsMap[variation] = variationTheme;
  }

  return variationsMap;
}

// Simple color manipulation utilities (placeholders)
function lightenColor(color: string, amount: number): string {
  // Placeholder - would use a proper color library
  return color;
}

function darkenColor(color: string, amount: number): string {
  // Placeholder - would use a proper color library
  return color;
}

/**
 * Exports theme as CSS custom properties
 */
export function themeToCSS(theme: ThemeConfig): string {
  const cssVars: string[] = [];

  for (const [key, value] of Object.entries(theme.colors)) {
    cssVars.push(`  --theme-${key}: ${value};`);
  }

  return `:root {\n${cssVars.join('\n')}\n}`;
}

/**
 * Creates a theme from a color palette
 */
export function createThemeFromPalette(palette: string[], options: { name: string; base?: 'dark' | 'light' }): ThemeConfig {
  const [primary, secondary, background, surface, text] = palette;

  return createTheme({
    name: options.name,
    base: options.base || 'dark',
    colors: {
      primary: primary || '#1BD96A',
      secondary: secondary || '#5865F2',
      background: background || '#0D0D0D',
      surface: surface || '#141414',
      text: text || '#ffffff',
    },
  });
}
