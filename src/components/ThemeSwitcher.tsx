import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Check, AlertTriangle } from "lucide-react";
import { useTheme } from "../ThemeContext";
import { themes } from "../themes";

export default function ThemeSwitcher({ onChange }: { onChange?: () => void }) {
  const { theme, setTheme, availableThemes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-modrinth-border hover:border-modrinth-green/50 hover:bg-modrinth-green/5 transition-all duration-300 text-sm"
        aria-label="Change theme"
        aria-haspopup="menu"
        type="button"
      >
        <Palette size={16} />
        <span className="hidden sm:inline">{themes[theme].name}</span>
        {theme === "light" && (
          <AlertTriangle size={14} className="text-white" aria-label="Light theme is very bright" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-64 py-2 bg-modrinth-card border border-modrinth-border rounded-xl shadow-xl z-50"
          >
            {availableThemes.map((themeKey) => {
              const themeConfig = themes[themeKey];
              const isActive = theme === themeKey;

              return (
                <button
                  key={themeKey}
                  onClick={() => {
                    setTheme(themeKey);
                    setIsOpen(false);
                    onChange?.();
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-modrinth-border/50 transition-colors duration-200 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded-full border-2 border-white/20 ${themeKey === "light" ? "bg-white" : ""}`}
                      style={{ backgroundColor: themeKey === "light" ? undefined : themeConfig.colors.primary }}
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium flex items-center gap-2">
                        {themeConfig.name}
                        {themeKey === "light" && (
                          <span className="ml-1 text-xs text-white/70">[W.I.P]</span>
                        )}
                      </span>
                      {themeKey === "light" && (
                        <span className="text-xs text-yellow-500 flex items-center gap-1">
                          <AlertTriangle size={10} />
                          Light mode is very bright
                        </span>
                      )}
                    </div>
                  </div>
                  {isActive && (
                    <Check size={16} className="text-modrinth-green" />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
