"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  Server,
  Users,
  Clock,
} from "lucide-react";
import Logo from "@/app/Logo.png";
const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/servers",  label: "Servers",   icon: Server },
  { href: "/players",  label: "Players",   icon: Users },
  { href: "/sessions", label: "Sessions",  icon: Clock },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="app-sidebar bg-zinc-950/80 backdrop-blur-md border-r border-white/5 flex flex-col justify-between py-6 px-4 shadow-[10px_0_30px_rgba(0,0,0,0.3)]">
      <div>
        {/* Brand */}
        <div className="flex items-center gap-3 px-3 mb-8">
          <div className="relative p-0.5 rounded-xl bg-gradient-to-tr from-primary to-orange-400 shadow-md shrink-0">
            <Image src={Logo} alt="Logo" width={38} height={38} className="rounded-[10px] bg-black object-cover" />
          </div>
          <div className="leading-tight">
            <h1 className="text-base font-black text-foreground tracking-tight uppercase font-heading">
              Rust<span className="text-primary">Tracker+</span>
            </h1>
            <p className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase opacity-70">Intelligence</p>
          </div>
        </div>

        <Separator className="mb-6 opacity-40" />

        {/* Nav Header */}
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 px-3 mb-3 font-heading">
          Workspace
        </p>

        <nav className="flex flex-col gap-1.5">
          {navItems.map(({ href, label, icon: Icon, exact }) => {
            const active = exact ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all group duration-300",
                  active
                    ? "bg-primary/10 text-primary shadow-[inset_0_0_12px_rgba(240,110,50,0.06)] border border-primary/20"
                    : "text-muted-foreground/80 hover:bg-white/5 hover:text-foreground border border-transparent"
                )}
              >
                {/* Active Indicator Line */}
                {active && (
                  <span className="absolute left-0 top-1/4 bottom-1/4 w-1 rounded-r-md bg-primary shadow-[0_0_12px_var(--primary)]" />
                )}
                
                <Icon size={16} strokeWidth={active ? 2.5 : 2} className={cn(
                  "transition-transform group-hover:scale-110 duration-300",
                  active ? "text-primary" : "text-muted-foreground/60 group-hover:text-foreground"
                )} />
                <span className="font-heading">{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <div>
        <Separator className="mb-4 opacity-40" />
        <div className="px-3">
          <p className="text-[10px] font-semibold text-muted-foreground/50 leading-relaxed uppercase tracking-widest">
            Rust Player Intelligence
          </p>
          <p className="text-[9px] font-mono text-muted-foreground/30 mt-1 uppercase">
            v1.0.0 · BattleMetrics Sync
          </p>
        </div>
      </div>
    </aside>
  );
}
