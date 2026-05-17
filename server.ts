/**
 * Custom Next.js Server
 * Boots Next.js app + background worker in a single Node.js process.
 * Run with: node --env-file=.env dist/server.js  (after build)
 * Dev: ts-node server.ts  or  tsx server.ts
 */

import "dotenv/config";
import { createServer } from "http";
import { parse } from "url";
import next from "next";
import { startWorker } from "./src/lib/worker";
import { startRustPlusManager } from "./src/lib/rustplus-manager";

const port = parseInt(process.env.PORT ?? "3000", 10);
const dev = process.env.NODE_ENV !== "production";

const app = next({ dev, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  // ── Start background worker ────────────────────────────────────────────────
  startWorker();

  // ── Start Rust+ manager ────────────────────────────────────────────────────
  void startRustPlusManager();

  // ── Start HTTP server ──────────────────────────────────────────────────────
  createServer((req, res) => {
    const parsedUrl = parse(req.url ?? "/", true);
    void handle(req, res, parsedUrl);
  }).listen(port, "0.0.0.0", () => {
    console.log(`[Server] Ready on http://0.0.0.0:${port} (${dev ? "dev" : "prod"})`);
  });
});
