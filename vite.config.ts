import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Porta do servidor de desenvolvimento
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
  base: "/animal-clinic-project/", 
});