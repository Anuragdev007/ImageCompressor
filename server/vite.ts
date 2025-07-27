import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";

const viteLogger = createLogger();

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  // Add MIME type configuration for development
  app.use((req, res, next) => {
    if (req.path.endsWith('.js') || req.path.endsWith('.mjs')) {
      res.setHeader('Content-Type', 'application/javascript');
    } else if (req.path.endsWith('.worker.js') || req.path.endsWith('.worker.min.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
    next();
  });

  // Serve PDF.js worker specifically
  app.get('/pdf.worker.min.js', (req, res) => {
    const workerPath = path.resolve(
      import.meta.dirname,
      "..",
      "client",
      "public",
      "pdf.worker.min.js"
    );
    
    if (fs.existsSync(workerPath)) {
      res.setHeader('Content-Type', 'application/javascript');
      res.setHeader('Cache-Control', 'public, max-age=31536000');
      res.sendFile(workerPath);
    } else {
      log(`PDF worker not found at: ${workerPath}`, 'error');
      res.status(404).send('PDF Worker not found');
    }
  });

  app.use(vite.middlewares);

  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html",
      );

      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );

      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  // Configure MIME types for static files
  app.use((req, res, next) => {
    if (req.path.endsWith('.js') || req.path.endsWith('.mjs')) {
      res.setHeader('Content-Type', 'application/javascript');
    } else if (req.path.endsWith('.worker.js') || req.path.endsWith('.worker.min.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    } else if (req.path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
    next();
  });

  // Serve PDF.js worker specifically for production
  app.get('/pdf.worker.min.js', (req, res) => {
    const workerPath = path.join(distPath, 'pdf.worker.min.js');
    if (fs.existsSync(workerPath)) {
      res.setHeader('Content-Type', 'application/javascript');
      res.setHeader('Cache-Control', 'public, max-age=31536000');
      res.sendFile(workerPath);
    } else {
      res.status(404).send('PDF Worker not found');
    }
  });

  app.use(express.static(distPath, {
    setHeaders: (res, path) => {
      if (path.endsWith('.js') || path.endsWith('.mjs')) {
        res.setHeader('Content-Type', 'application/javascript');
      } else if (path.endsWith('.worker.js') || path.endsWith('.worker.min.js')) {
        res.setHeader('Content-Type', 'application/javascript');
      }
    }
  }));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
