import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // SEO Routes
  app.get("/robots.txt", (_req, res) => {
    res.type("text/plain").send(`User-agent: *
Allow: /

Sitemap: https://jpegcompressor.com/sitemap.xml`);
  });

  app.get("/sitemap.xml", (_req, res) => {
    const lastmod = new Date().toISOString().split('T')[0];
    res.type("application/xml").send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://jpegcompressor.com/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://jpegcompressor.com/compress</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://jpegcompressor.com/about</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://jpegcompressor.com/help</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://jpegcompressor.com/contact</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://jpegcompressor.com/privacy</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://jpegcompressor.com/terms</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>`);
  });

  const httpServer = createServer(app);
  return httpServer;
}
