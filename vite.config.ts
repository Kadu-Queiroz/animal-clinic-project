import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // Importe o módulo path

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Porta do servidor de desenvolvimento
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Alias para o diretório src
      "@assets": path.resolve(__dirname, "./src/assets"), // Alias para o diretório assets
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
  base: "/animal-clinic-project/",
});