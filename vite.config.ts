import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  // User/organization GitHub Pages site (jdnarvaez.github.io) is served from the
  // domain root, so the base path stays "/".
  base: '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // TypeScript path alias: @/x/y/z -> src/x/y/z
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  preview: {
    port: 8082,
    host: true,
  },
  server: {
    port: 8082,
    host: true,
  },
});
