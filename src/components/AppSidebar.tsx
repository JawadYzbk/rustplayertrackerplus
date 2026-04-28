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
    <aside className="app-sidebar">
      {/* Brand */}
      <div className="flex items-center gap-3 px-2 mb-6">
        <Image src={Logo} alt="Logo" width={36} height={36} className="rounded-xl bg-primary object-cover shadow-lg shrink-0" />
        <div className="leading-tight">
          <p className="text-sm font-bold text-foreground tracking-tight">RustTracker+</p>
          <p className="text-[10px] text-muted-foreground">Intelligence Platform</p>
        </div>
      </div>

      <Separator className="mb-4" />

      {/* Nav */}
      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-2 mb-2">
        Navigation
      </p>

      <nav className="flex flex-col gap-0.5">
        {navItems.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <Icon size={15} strokeWidth={active ? 2.5 : 2} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto">
        <Separator className="mb-3" />
        <p className="text-[10px] text-muted-foreground px-2 leading-relaxed">
          v1.0.0 · BattleMetrics API
        </p>
      </div>
    </aside>
  );
}
