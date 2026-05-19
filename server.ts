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

console.log(`[Server] Initializing...`);
console.log(`[Server] Environment: ${dev ? "development" : "production"}`);
console.log(`[Server] Port: ${port}`);
console.log(`[Server] Host: 0.0.0.0`);

const app = next({ dev, port });
const handle = app.getRequestHandler();
let isReady = false;

// ── Start HTTP server immediately to satisfy health checks ──────────────────
console.log(`[Server] Creating HTTP server...`);
const server = createServer((req, res) => {
  if (!isReady) {
    // Health checks or early traffic get a simple response until Next.js is ready
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Server is starting up... Please wait.");
    return;
  }

  const parsedUrl = parse(req.url ?? "/", true);
  void handle(req, res, parsedUrl);
});

console.log(`[Server] Attempting to listen on port ${port}...`);
server.listen(port, "0.0.0.0", () => {
  console.log(`[Server] SUCCESS: Listening on http://0.0.0.0:${port}`);

  // ── Prepare Next.js + Workers in background ────────────────────────────────
  app.prepare().then(() => {
    console.log("[Server] Next.js preparation complete.");
    isReady = true;
    
    // Start background worker
    startWorker();

    // Start Rust+ manager
    void startRustPlusManager();
    
    console.log("[Server] All systems operational.");
  }).catch((err) => {
    console.error("[Server] Failed to prepare Next.js app:", err);
    process.exit(1);
  });
});
