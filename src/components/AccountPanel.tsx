"use client";

import { SignOutButton, UserButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AccountPanel() {
  return (
    <div className="flex items-center gap-3">
      <div className="rounded-full border bg-background/60 p-1">
        <UserButton />
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
