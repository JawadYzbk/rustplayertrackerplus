import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "RustTracker+ · Player Intelligence Platform",
  description:
    "Advanced behavioral analytics and session tracking for Rust game servers powered by BattleMetrics.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          {children}
          <Toaster richColors theme="dark" />
        </ClerkProvider>
      </body>
    </html>
  );
}
