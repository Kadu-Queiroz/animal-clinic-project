import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const isGitHubPages = process.env.NODE_ENV === "production";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "src/assets"),
    },
  },
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    assetsDir: "assets",
    emptyOutDir: true,
  },
  publicDir: "public",
  base: isGitHubPages ? "/animal-clinic-project/" : "/",
});