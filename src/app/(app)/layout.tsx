import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AppSidebar from "@/components/AppSidebar";
import AccountPanel from "@/components/AccountPanel";
import BottomNav from "@/components/BottomNav";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="flex min-h-screen bg-[radial-gradient(circle_at_top_right,rgba(240,110,50,0.03),transparent_40%)]">
      <AppSidebar />
      <div className="app-main flex-1">
        <header className="sticky top-4 z-50 mb-8 flex items-center justify-between gap-4 rounded-2xl glass-card glass-card-hover px-5 py-3.5">
          <div className="space-y-0.5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-40"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Mission Control
            </h2>
            <p className="text-xs text-muted-foreground hidden sm:block font-medium opacity-85">
              Your private Rust intelligence workspace is live.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-green-500/20 bg-green-500/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-green-400">
              <span className="pulse-dot" />
              Secure Link
            </span>
            <AccountPanel />
          </div>
        </header>

        <main className="animate-in fade-in duration-500">{children}</main>
      </div>
      <BottomNav />
    </div>
  );
}
