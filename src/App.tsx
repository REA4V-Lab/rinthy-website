import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import { Suspense, lazy } from "react";
import { I18nProvider } from "./i18n/I18nContext";
import { ThemeProvider, useTheme } from "./ThemeContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import DownloadSection from "./components/DownloadSection";
import GradientOrbs from "./components/GradientOrbs";
import { AlertTriangle } from "lucide-react";
import DonatePage from "./components/donate/DonatePage";


// Lazy-load below-the-fold sections for better performance
const Features = lazy(() => import("./components/Features"));
const Screenshots = lazy(() => import("./components/Screenshots"));
const Steps = lazy(() => import("./components/Steps"));
const TechStack = lazy(() => import("./components/TechStack"));
const Footer = lazy(() => import("./components/Footer"));





function LoadingFallback() {
  return <div className="h-96 flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-modrinth-green"></div>
  </div>;
}

function LightThemeWarning() {
  const { theme, setTheme } = useTheme();

  if (theme !== "light") return null;

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 bg-yellow-500 text-yellow-900 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm font-medium">
      <AlertTriangle size={16} />
      Light theme is very bright and may cause eye strain. Consider switching to dark theme for a better experience.
      <button
        onClick={() => setTheme("dark")}
        className="ml-2 underline hover:no-underline"
      >
        Switch to dark
      </button>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <div className="relative min-h-screen bg-theme-background text-theme-text overflow-x-hidden safe-top safe-bottom selection:bg-modrinth-green selection:text-modrinth-dark touch-manipulation">
          <LightThemeWarning />
          <GradientOrbs />
          <Navbar />

          <main>
            {typeof window !== "undefined" && window.location.pathname === "/donate" ? (
              <DonatePage />
            ) : (
              <>
                <Hero />


                <Suspense fallback={<LoadingFallback />}>
                  <Features />
                </Suspense>

                <Suspense fallback={<LoadingFallback />}>
                  <Screenshots />
                </Suspense>

                <Suspense fallback={<LoadingFallback />}>
                  <Steps />
                </Suspense>

                <DownloadSection />

                <Suspense fallback={<LoadingFallback />}>
                  <TechStack />
                </Suspense>

                <Suspense fallback={<LoadingFallback />}>
                  <Footer />
                </Suspense>
              </>
            )}
          </main>






          <SpeedInsights />


          <Analytics />
        </div>
      </I18nProvider>
    </ThemeProvider>
  );
}
