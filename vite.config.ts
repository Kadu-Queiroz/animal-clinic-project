import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const isGitHubPages = process.env.NODE_ENV === 'production';

export default defineConfig({
  plugins: [react()],

  server: {
    port: 5173,
    strictPort: true, // 🔒 Evita fallback para outra porta
    hmr: false, // 🚫 Desativa WebSocket do HMR (ver observação abaixo)
    watch: {
      usePolling: true, // 🛠️ Alternativa estável em sistemas com bugs de FS
      interval: 100, // 👂 Ajusta o intervalo de polling para reduzir carga
    },
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@types': path.resolve(__dirname, 'src/types'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@context': path.resolve(__dirname, 'src/context'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@routes': path.resolve(__dirname, 'src/routes'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@config': path.resolve(__dirname, 'src/config'),
      '@pages': path.resolve(__dirname, 'src/pages'),
    },
  },

  optimizeDeps: {
    exclude: ['lucide-react'],
  },

  build: {
    outDir: 'dist',
    sourcemap: true,
    assetsDir: 'assets',
    emptyOutDir: true,
  },

  publicDir: 'public',
  base: isGitHubPages ? '/animal-clinic-project/' : '/',
});
