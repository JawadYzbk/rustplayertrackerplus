import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AppSidebar from "@/components/AppSidebar";

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
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="app-main flex-1">
        <header className="mb-6 flex items-center justify-between gap-4 rounded-2xl border bg-card/60 px-5 py-3">
          <div>
            <p className="text-sm font-semibold text-foreground">
              Mission Control
            </p>
            <p className="text-xs text-muted-foreground">
              Your private Rust intelligence workspace is live.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="rounded-full border px-2.5 py-1 text-xs text-muted-foreground">
              Authorized
            </span>
            <UserButton afterSignOutUrl="/" />
          </div>
        </header>

        <main>{children}</main>
      </div>
    </div>
  );
}
