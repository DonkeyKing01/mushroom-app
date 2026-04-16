import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Netlify serves this app from the site root, so production assets
  // must be emitted with root-relative URLs instead of a repo subpath.
  base: '/',

  plugins: [react()],
  optimizeDeps: {
    include: ["lucide-react", "framer-motion", "recharts"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          ui: ["lucide-react", "framer-motion"],
          charts: ["recharts"],
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: '0.0.0.0', // 允许局域网访问
    port: 5173,
    proxy: {
      // Proxy for Volcano Engine API to avoid CORS issues
      '/api/volcano': {
        target: 'https://ai-gateway.vei.volces.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/volcano/, ''),
        secure: true,
        // Ensure all headers are forwarded correctly
        headers: {
          'Host': 'ai-gateway.vei.volces.com',
        },
      },
      // Proxy for upload API
      '/api/upload': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path,
      },
    },
  },
}));
