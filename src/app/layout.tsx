import type { Metadata } from "next";
import "./globals.css";
import AppSidebar from "@/components/AppSidebar";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "RustTracker+ · Player Intelligence Platform",
  description:
    "Advanced behavioral analytics and session tracking for Rust game servers powered by BattleMetrics.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen">
          <AppSidebar />
          <main className="app-main flex-1">{children}</main>
        </div>
        <Toaster richColors theme="dark" />
      </body>
    </html>
  );
}
