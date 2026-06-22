# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure & Module Organization

This is a React/Vite/TypeScript project for the Rinthy website (Modrinth mobile app landing page). Key architectural patterns:

- **Lazy loading**: Below-the-fold sections (Features, Screenshots, Steps, TechStack, Footer) are loaded via React.lazy/Suspense for performance
- **Internationalization**: Custom i18n system (`src/i18n/`) with language files in `src/i18n/languages/` accessed via `useTranslation()` hook
- **Theme system**: Light/dark theme management via `ThemeContext` (`src/ThemeContext.tsx`) with automatic light theme warning
- **Component organization**: UI components in `src/components/` grouped by feature; donation section has its own subdirectory
- **State management**: Uses React Context for global state (i18n, theme) rather than external libraries

## Build, Test, and Development Commands

Actual commands from package.json:

- `npm run dev` - Start Vite development server
- `npm run dev --host` - Start dev server accessible on network (useful for mobile testing)
- `npm run build` - TypeScript check then Vite production build
- `npm run preview` - Preview production build locally

No testing framework is currently configured. To add tests, consider Vitest or Jest with React Testing Library.

## Coding Style & Naming Conventions

Enforced via TypeScript strict mode (tsconfig.json):
- `strict: true` - Enables all strict type-checking options
- `noUnusedLocals: true` and `noUnusedParameters: true` - Reports unused variables/parameters
- `noFallthroughCasesInSwitch: true` - Prevents fallthrough in switch statements

Formatting:
- Uses Tailwind CSS utility classes for styling (see `src/index.css` and component JSX)
- Follows React/Vite naming conventions (PascalCase for components, camelCase for props/vars)
- File naming: `.tsx` for React components, `.ts` for logic files

## Additional Notes

- Internationalization strings are maintained in language-specific files under `src/i18n/languages/` (en.ts, fr.ts, it.ts, ru.ts)
- When adding UI strings, add them to all language files and use the `t.key.subkey` pattern in components
- The site uses custom themes defined in `src/themes.ts` and `src/custom-themes.ts`
- Performance monitoring: `usePerformanceProfile()` hook conditionally enables animations based on device capabilities
- When adding new strings to a language add them to `src/i18n/languages/template.ts`

# DEVELOPER


## Overview

This is the website for Rinthy, an unofficial mobile app for Modrinth developers. The website is built with React, TypeScript, Vite, and Tailwind CSS.

## Quick Start

```bash
npm install
npm run dev
```

## Project Structure

```
src/
├── components/          # React components
│   ├── Hero.tsx        # Main hero section
│   ├── Features.tsx    # Features grid
│   ├── DownloadSection.tsx # Download cards
│   ├── Navbar.tsx      # Navigation bar
│   ├── ThemeSwitcher.tsx # Theme selection
│   └── ...
├── i18n/               # Internationalization
│   ├── languages/      # Translation files
│   │   ├── en.ts       # English (source)
│   │   ├── ru.ts       # Russian
│   │   ├── it.ts       # Italian
│   │   ├── fr.ts       # French
│   │   └── _template.ts # Template for new languages
│   ├── I18nContext.tsx # i18n context and hooks
│   └── types.ts        # TypeScript types
├── themes.ts           # Theme configurations
├── ThemeContext.tsx    # Theme context and provider
├── theme-sdk.ts        # Theme creation utilities
├── hooks/              # Custom React hooks
└── index.css           # Global styles with component classes
```

## Key Improvements

### 🎨 **Theme System**
- **4 Built-in Themes**: Dark (default), Light, Blue, and Purple
- **Persistent Storage**: Theme preference saved in localStorage
- **CSS Custom Properties**: Dynamic theme variables
- **Smooth Transitions**: Animated theme switching
- **Custom Theme SDK**: Easy-to-use utilities for creating custom themes

**Adding a new theme:**
1. Add theme config to `src/themes.ts`
2. Update `Theme` type in `src/themes.ts`
3. Theme will automatically appear in switcher

### 🌍 **Simplified Translation Management**
- **Template File**: Created `_template.ts` for easy addition of new languages
- **Developer Guide**: Clear instructions for adding languages
- **No Type Updates**: Translations no longer require manual type file updates

### 📱 **Better Responsive Design**
- **Component Classes**: Reusable CSS component classes (`.btn-primary`, `.card`, `.section`, etc.)
- **Theme Variables**: All colors use CSS custom properties
- **Desktop Optimization**: Improved layouts for larger screens

### ⚡ **Simplified Components**
Components are now cleaner and easier to modify with separated concerns and performance considerations.

## Theme System

### Available Themes
- **Dark**: Default Modrinth-inspired dark theme
- **Light**: Clean light theme with proper contrast
- **Blue**: Twitter-inspired blue color scheme
- **Purple**: Modern purple gradient theme

### Creating Custom Themes

#### Method 1: Using the Theme SDK (Recommended)

The theme SDK provides helper functions to create themes easily:

```typescript
import { createTheme, registerTheme } from './theme-sdk';

// Create a custom theme
const myCustomTheme = createTheme({
  name: 'My Custom Theme',
  base: 'dark', // or 'light'
  colors: {
    primary: '#ff6b6b', // Your brand color
    secondary: '#4ecdc4', // Accent color
    background: '#2d3436', // Dark background
    surface: '#34495e', // Card/surface color
  }
});

// Register the theme
registerTheme('custom', myCustomTheme);
```

#### Method 2: Manual Theme Creation

1. **Define Theme Config** in `src/themes.ts`:
```typescript
export const themes: Record<Theme, ThemeConfig> = {
  // ... existing themes
  sunset: {
    name: "Sunset",
    colors: {
      background: "#1a1a2e",
      card: "#16213e",
      border: "#0f3460",
      text: "#e94560",
      textMuted: "#a8a8a8",
      primary: "#ff6b6b",
      primaryDark: "#1a1a2e",
      secondary: "#feca57",
      glassBg: "rgba(26, 26, 46, 0.6)",
      glassBorder: "rgba(233, 69, 96, 0.2)",
    },
  },
};
```

2. **Update Theme Type**:
```typescript
export type Theme = "dark" | "light" | "blue" | "purple" | "sunset";
```

#### Method 3: Using Theme Presets

Use the SDK's preset themes as starting points:

```typescript
import { createThemeFromPreset, registerTheme } from './theme-sdk';

// Create a theme based on a preset
const oceanTheme = createThemeFromPreset('ocean', {
  name: 'Ocean Blue',
  primary: '#00d4ff', // Override primary color
});

// Register it
registerTheme('ocean', oceanTheme);
```

#### Method 4: Runtime Theme Registration

For themes that should be available immediately without rebuilding:

```typescript
import { useCustomThemes } from './custom-themes';

function App() {
  // Register custom themes when component mounts
  useCustomThemes();

  return (
    <div>
      {/* Your app content - custom themes will now be available in theme switcher */}
    </div>
  );
}
```

### Theme SDK API

#### `createTheme(options)`

Creates a complete theme configuration from partial options:

```typescript
interface ThemeOptions {
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

const theme = createTheme({
  name: 'My Theme',
  base: 'dark',
  colors: {
    primary: '#your-color',
    // ... other colors
  }
});
```

#### `createThemeFromPreset(preset, overrides)`

Creates a theme based on predefined presets:

```typescript
const theme = createThemeFromPreset('monochrome', {
  name: 'Custom Mono',
  primary: '#000000'
});
```

#### `registerRuntimeTheme(key, themeConfig)` (via ThemeContext)

Registers a theme at runtime to make it available in the theme switcher:

```typescript
const { registerRuntimeTheme } = useTheme();
registerRuntimeTheme('mytheme', myThemeConfig);
```

#### Available Presets

- `monochrome`: Black and white theme
- `ocean`: Blue ocean-inspired colors
- `forest`: Green nature-inspired colors
- `sunset`: Warm sunset colors
- `neon`: Bright neon colors
- `pastel`: Soft pastel colors

### Advanced Theme Customization

#### Color Harmony

Use the SDK's color harmony functions:

```typescript
import { createHarmoniousTheme } from './theme-sdk';

const theme = createHarmoniousTheme('#ff6b6b', {
  name: 'Harmonious Red',
  harmony: 'complementary' // or 'triadic', 'analogous'
});
```

#### Theme Validation

Validate your theme configuration:

```typescript
import { validateTheme } from './theme-sdk';

const errors = validateTheme(myTheme);
if (errors.length > 0) {
  console.error('Theme validation errors:', errors);
}
```

#### Runtime Theme Registration

Use the `useCustomThemes` hook to register themes at runtime:

```typescript
import { useCustomThemes } from './custom-themes';

function MyComponent() {
  useCustomThemes(); // Registers all custom themes
  return <div>Custom themes are now available!</div>;
}
```

## Development Workflow

### Adding New Content

1. **New Section:** Create component in `src/components/`
2. **New Translation Keys:** Add to all language files and template
3. **New Styles:** Use existing component classes or add to `index.css`

### Modifying Existing Content

1. **Text Changes:** Edit language files directly
2. **Layout Changes:** Modify component JSX and classes
3. **Styling Changes:** Update Tailwind classes or CSS components

### Performance Considerations

- Components use lazy loading for below-the-fold content
- Animations respect `prefers-reduced-motion`
- Theme switching is optimized with CSS custom properties

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Contributing

1. Follow the existing code style
2. Use the component classes from `index.css`
3. Test translations in multiple languages
4. Test themes across different color schemes
5. Ensure responsive design works on mobile and desktop

## Adding a New Language

1. Copy `_template.ts` to `[code].ts` (e.g., `es.ts`)
2. Translate all strings
3. Add to `languages/index.ts`:
   ```ts
   import { es } from "./es";
   export const allTranslations = { en, ru, it, fr, es } as const;
   ```
4. Add language code to `types.ts`:
   ```ts
   export type Language = "en" | "ru" | "it" | "fr" | "es";
   ```

That's it! The new language will be automatically available in the language switcher.
