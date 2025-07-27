import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { copyFileSync, existsSync, mkdirSync } from "fs";

// Plugin to copy PDF.js worker during build
function copyPdfWorkerPlugin() {
  return {
    name: 'copy-pdf-worker',
    buildStart() {
      // Ensure public directory exists
      const publicDir = path.resolve(import.meta.dirname, "client/public");
      if (!existsSync(publicDir)) {
        mkdirSync(publicDir, { recursive: true });
      }
      
      // Copy PDF worker to public directory
      const workerSrc = path.resolve(import.meta.dirname, "node_modules/pdfjs-dist/build/pdf.worker.min.js");
      const workerDest = path.resolve(publicDir, "pdf.worker.min.js");
      
      if (existsSync(workerSrc)) {
        copyFileSync(workerSrc, workerDest);
        console.log('✅ PDF.js worker copied to public directory');
      } else {
        console.warn('⚠️ PDF.js worker not found at:', workerSrc);
      }
    },
    generateBundle() {
      // Also copy to build output directory
      const buildDir = path.resolve(import.meta.dirname, "dist/public");
      if (!existsSync(buildDir)) {
        mkdirSync(buildDir, { recursive: true });
      }
      
      const workerSrc = path.resolve(import.meta.dirname, "node_modules/pdfjs-dist/build/pdf.worker.min.js");
      const workerDest = path.resolve(buildDir, "pdf.worker.min.js");
      
      if (existsSync(workerSrc)) {
        copyFileSync(workerSrc, workerDest);
        console.log('✅ PDF.js worker copied to build directory');
      }
    }
  };
}

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    copyPdfWorkerPlugin(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'pdfjs': ['pdfjs-dist']
        }
      }
    },
    chunkSizeWarningLimit: 2000,
    assetsDir: 'assets',
  },
  server: {
    fs: {
      strict: false,
      allow: ['..', '../../node_modules'],
    },
    cors: {
      origin: true,
      credentials: true
    },
    middlewareMode: false,
  },
  optimizeDeps: {
    include: ['pdfjs-dist'],
    exclude: ['pdfjs-dist/build/pdf.worker.min.js']
  },
  worker: {
    format: 'es',
    plugins: () => [react()]
  },
  define: {
    global: 'globalThis',
    __PDF_WORKER_SRC__: JSON.stringify('/pdf.worker.min.js')
  },
  assetsInclude: ['**/*.wasm', '**/*.worker.js', '**/*.worker.min.js'],
  publicDir: path.resolve(import.meta.dirname, "client/public"),
});
