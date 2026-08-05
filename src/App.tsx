import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from "./ThemeContext";
import MovedPage from "./components/MovedPage";

export default function App() {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-theme-background selection:bg-modrinth-green selection:text-modrinth-dark safe-top safe-bottom touch-manipulation">
        <MovedPage />
        <SpeedInsights />
        <Analytics />
      </div>
    </ThemeProvider>
  );
}

