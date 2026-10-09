import express, { type Express } from "express";
import fs from "node:fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";

// Development and production use the same public-page renderer. Text inserted in
// the document head is escaped here; React serializes and escapes the page body.
type RenderPage = (url: string) => Promise<{
  markup: string;
  meta: { title: string; description: string; status: number; noindex?: boolean };
}>;

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function setMeta(html: string, attribute: "name" | "property", key: string, content: string) {
  const safeKey = escapeHtml(key);
  const tag = `<meta ${attribute}="${safeKey}" content="${escapeHtml(content)}" />`;
  const pattern = new RegExp(`<meta\\s+${attribute}="${safeKey}"[^>]*>`, "i");
  if (pattern.test(html)) return html.replace(pattern, tag);
  return html.replace("</head>", `  ${tag}\n  </head>`);
}

function renderDocument(template: string, markup: string, meta: { title: string; description: string; noindex?: boolean }) {
  let html = template.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(meta.title)}</title>`);
  html = setMeta(html, "name", "description", meta.description);
  html = setMeta(html, "property", "og:title", meta.title);
  html = setMeta(html, "property", "og:description", meta.description);
  html = setMeta(html, "name", "twitter:card", "summary");
  html = setMeta(html, "name", "twitter:title", meta.title);
  html = setMeta(html, "name", "twitter:description", meta.description);
  if (meta.noindex) html = setMeta(html, "name", "robots", "noindex,follow");
  else html = html.replace(/\s*<meta\s+name="robots"[^>]*>/i, "");
  if (!html.includes('<div id="root"></div>')) throw new Error("The CoreFixIT HTML template is missing its app root.");
  return html.replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = { middlewareMode: true, hmr: { server }, allowedHosts: true as const };
  const vite = await createViteServer({ ...viteConfig, configFile: false, server: serverOptions, appType: "custom" });
  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path.resolve(import.meta.dirname, "../..", "client", "index.html");
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace('src="/src/main.tsx"', `src="/src/main.tsx?v=${nanoid()}"`);
      const renderer = await vite.ssrLoadModule("/src/entry-server.tsx") as { renderPage: RenderPage };
      const result = await renderer.renderPage(url);
      const page = await vite.transformIndexHtml(url, renderDocument(template, result.markup, result.meta));
      res.status(result.meta.status).set({ "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" }).end(page);
    } catch (error) {
      vite.ssrFixStacktrace(error as Error);
      next(error);
    }
  });
}

export async function serveStatic(app: Express) {
  const distPath = path.resolve(import.meta.dirname, "public");
  const indexPath = path.resolve(distPath, "index.html");
  const rendererPath = path.resolve(import.meta.dirname, "server", "entry-server.js");
  if (!fs.existsSync(distPath)) console.error(`Could not find the build directory: ${distPath}, make sure to build the client first`);
  if (!fs.existsSync(rendererPath)) throw new Error(`Could not find the built CoreFixIT page renderer: ${rendererPath}`);
  const renderer = await import(pathToFileURL(rendererPath).href) as { renderPage: RenderPage };
  app.use(express.static(distPath, { index: false }));
  app.use("*", async (req, res, next) => {
    try {
      const [template, result] = await Promise.all([
        fs.promises.readFile(indexPath, "utf-8"),
        renderer.renderPage(req.originalUrl),
      ]);
      res.status(result.meta.status).set({ "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=0, must-revalidate" }).end(renderDocument(template, result.markup, result.meta));
    } catch (error) {
      next(error);
    }
  });
}
