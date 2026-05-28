/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    'glass-simple',
    'glass-strong-simple',
    'glow-green-subtle',
    'glow-green-strong-subtle',
  ],
  theme: {
    screens: {
      'xs': '475px',
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        sans: ["Geist", "system-ui", "sans-serif"],
        display: ["Geist", "system-ui", "sans-serif"],
      },
      colors: {
        modrinth: {
          green: "var(--theme-primary)",
          dark: "var(--theme-primary-dark)",
          card: "var(--theme-card)",
          border: "var(--theme-border)",
          muted: "var(--theme-text-muted)",
        },
        theme: {
          background: "var(--theme-background)",
          card: "var(--theme-card)",
          border: "var(--theme-border)",
          text: "var(--theme-text)",
          "text-muted": "var(--theme-text-muted)",
          primary: "var(--theme-primary)",
          "primary-dark": "var(--theme-primary-dark)",
          secondary: "var(--theme-secondary)",
        },
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 20s linear infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
