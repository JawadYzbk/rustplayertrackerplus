import "dotenv/config";
import { defineConfig } from "prisma/config";

// Helper to ensure Supabase connections have required parameters
const fixUrl = (url?: string) => {
  if (!url) return url;
  let fixed = url;
  // Ensure project ID is in username for Supabase proxies if not present
  if (url.includes("supabase.com") && !url.includes(".yisxptnkkburzqfxwamd")) {
    fixed = fixed.replace(/postgres(?=[:@])/, "postgres.yisxptnkkburzqfxwamd");
  }
  // Ensure sslmode=require is present
  if (!fixed.includes("sslmode=")) {
    fixed += (fixed.includes("?") ? "&" : "?") + "sslmode=require";
  }
  return fixed;
};

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: fixUrl(process.env["DATABASE_URL"]),
    directUrl: fixUrl(process.env["DIRECT_URL"]),
  },
});
