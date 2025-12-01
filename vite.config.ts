import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    
    // Base path para GitHub Pages
    // En GitHub Pages, necesitamos el nombre del repositorio como base path
    // Para desarrollo local, usar '/' funciona bien
    const base = env.VITE_BASE_PATH || (process.env.NODE_ENV === 'production' ? '/FlashMaster-Chile/' : '/');
    
    return {
      base,
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.PIXABAY_API_KEY': JSON.stringify(env.PIXABAY_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
