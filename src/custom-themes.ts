// ============================================================
//  Custom Theme Examples — Demonstrates how to create custom themes
//  Copy and modify these examples to create your own themes
// ============================================================

import { createTheme, createThemeFromPreset, createHarmoniousTheme } from './theme-sdk';
import { useTheme } from './ThemeContext';
import { useEffect } from 'react';

// Example 1: Basic custom theme
export const customRedTheme = createTheme({
  name: 'Crimson',
  base: 'dark',
  colors: {
    primary: '#dc2626', // Red-600
    secondary: '#f59e0b', // Amber-500
    background: '#1f2937', // Gray-800
    surface: '#374151', // Gray-700
  }
});

// Example 2: Theme from preset
export const customOceanTheme = createThemeFromPreset('ocean', {
  name: 'Deep Ocean',
  colors: {
    primary: '#0891b2', // Cyan-600
    background: '#0c4a6e', // Sky-900
  }
});

// Example 3: Harmonious theme
export const harmoniousPurpleTheme = createHarmoniousTheme('#8b5cf6', {
  name: 'Harmonious Purple',
  harmony: 'complementary'
});

// Example 4: Complete custom theme
export const cyberpunkTheme = createTheme({
  name: 'Cyberpunk',
  base: 'dark',
  colors: {
    primary: '#ff0080', // Hot pink
    secondary: '#00ffff', // Cyan
    background: '#0a0a0a', // Very dark
    surface: '#1a1a1a', // Dark gray
    text: '#ffffff',
    textMuted: '#888888',
  }
});

// Example 5: Light theme variant
export const lightMintTheme = createTheme({
  name: 'Mint Light',
  base: 'light',
  colors: {
    primary: '#10b981', // Emerald-500
    secondary: '#06b6d4', // Cyan-500
    background: '#f8fafc', // Very light gray
    surface: '#ffffff',
    text: '#1e293b', // Slate-800
    textMuted: '#64748b', // Slate-500
  }
});

// Hook to register custom themes at runtime
export function useCustomThemes() {
  const { registerRuntimeTheme } = useTheme();

  useEffect(() => {
    // Register all custom themes
    registerRuntimeTheme('crimson', customRedTheme);
    registerRuntimeTheme('deep-ocean', customOceanTheme);
    registerRuntimeTheme('harmonious-purple', harmoniousPurpleTheme);
    registerRuntimeTheme('cyberpunk', cyberpunkTheme);
    registerRuntimeTheme('mint-light', lightMintTheme);
  }, [registerRuntimeTheme]);
}

// Export all custom themes
export const customThemes = {
  crimson: customRedTheme,
  'deep-ocean': customOceanTheme,
  'harmonious-purple': harmoniousPurpleTheme,
  cyberpunk: cyberpunkTheme,
  'mint-light': lightMintTheme,
};

// Usage example component:
/*
import { useCustomThemes } from './custom-themes';

function App() {
  // Register custom themes when component mounts
  useCustomThemes();

  return (
    <div>
      {/* Your app content */}
    </div>
  );
}
*/
