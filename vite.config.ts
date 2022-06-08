import legacy from "@vitejs/plugin-legacy";
import reactRefresh from "@vitejs/plugin-react-refresh";
import { fileURLToPath } from 'url'
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [legacy(), reactRefresh()],
  esbuild: {
    jsxInject: `import React from 'react'`, // automatically import React in jsx files
  },
  resolve: {
    alias: {
      // for TypeScript path alias import like : @/x/y/z
      "@": fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  preview: {
    port: 8082,
    host: true,
  },
  server: {
    port: 8082,
    host: true,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        secure: false,
        rewrite: path => path.replace(/^\/api/, ""),
      },
    },
  },
});
