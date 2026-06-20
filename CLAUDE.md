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