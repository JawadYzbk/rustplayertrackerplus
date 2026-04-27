"use client";

import Image from "next/image";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export default function AccountPanel() {
  const { user, isLoaded } = useUser();

  if (!isLoaded || !user) {
    return null;
  }

  const displayName =
    user.fullName || user.username || user.primaryEmailAddress?.emailAddress || "Operator";
  const subtitle = user.primaryEmailAddress?.emailAddress || "Authorized account";
  const initials = getInitials(displayName) || "U";

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-3 rounded-full border bg-background/60 px-2.5 py-1.5">
        {user.imageUrl ? (
          <Image
            src={user.imageUrl}
            alt={displayName}
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
            {initials}
          </div>
        )}

        <div className="hidden text-left sm:block">
          <p className="max-w-40 truncate text-sm font-medium">{displayName}</p>
          <p className="max-w-44 truncate text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </div>

      <SignOutButton redirectUrl="/">
        <Button variant="outline" size="sm" className="gap-2">
          <LogOut className="h-4 w-4" />
          Sign out
        </Button>
      </SignOutButton>
    </div>
  );
}
