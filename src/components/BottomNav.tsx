"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Server, Users, Clock } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/servers",  label: "Servers",   icon: Server },
  { href: "/players",  label: "Players",   icon: Users },
  { href: "/sessions", label: "Sessions",  icon: Clock },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t bg-card/90 pb-safe pt-2 px-2 backdrop-blur-md">
      {navItems.map(({ href, label, icon: Icon, exact }) => {
        const active = exact ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex flex-col items-center justify-center w-16 py-1 gap-1 text-xs transition-colors",
              active ? "text-primary" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon size={20} strokeWidth={active ? 2.5 : 2} />
            <span className="font-medium scale-90">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}