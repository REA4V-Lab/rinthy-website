import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import compression from "vite-plugin-compression";

export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: "brotliCompress",
      ext: ".br",
      threshold: 1024,
    }),
    compression({
      algorithm: "gzip",
      ext: ".gz",
      threshold: 1024,
    }),
  ],
  build: {
    target: ["es2020", "edge88", "firefox78", "chrome87", "safari14"],
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name]-[hash]-rinthy-live.js",
        chunkFileNames: "assets/[name]-[hash]-rinthy-live.js",
        assetFileNames: "assets/[name]-[hash]-rinthy-live[extname]",
        manualChunks(id: string) {
          if (id.includes("node_modules/framer-motion")) return "motion";
          if (id.includes("node_modules/lucide-react")) return "icons";
          if (id.includes("node_modules/react-dom")) return "vendor";
          if (id.includes("node_modules/react/")) return "vendor";
        },
      },
    },
  },
});

