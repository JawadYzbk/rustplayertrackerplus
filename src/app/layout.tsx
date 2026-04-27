import type { Metadata } from "next";
import {
  ClerkProvider,
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import "./globals.css";
import AppSidebar from "@/components/AppSidebar";
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
  const { userId } = await auth();
  const isSignedIn = Boolean(userId);

  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <div className="flex min-h-screen">
            <AppSidebar />
            <div className="app-main flex-1">
              <header className="mb-6 flex items-center justify-between gap-4 rounded-2xl border bg-card/60 px-5 py-3">
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Account Navigation
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {isSignedIn
                      ? "You are signed in and ready to use Clerk."
                      : "Sign up here to create your first test user."}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="rounded-full border px-2.5 py-1 text-xs text-muted-foreground">
                    {isSignedIn ? "Signed in" : "Guest mode"}
                  </span>

                  <Show when="signed-out">
                    <SignInButton />
                    <SignUpButton />
                  </Show>

                  <Show when="signed-in">
                    <UserButton />
                  </Show>
                </div>
              </header>

              <main>{children}</main>
            </div>
          </div>
          <Toaster richColors theme="dark" />
        </ClerkProvider>
      </body>
    </html>
  );
}
