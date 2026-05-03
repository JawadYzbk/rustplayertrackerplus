"use client";

import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function RustPlusConnectPage() {
  useEffect(() => {
    const callbackUrl = `${window.location.origin}/rustplus/connect/callback`;
    const rustAppUrl = `https://companion-rust.facepunch.com/app?returnUrl=${encodeURIComponent(
      callbackUrl
    )}`;
    window.location.replace(rustAppUrl);
  }, []);

  return (
    <div className="flex min-h-[40vh] items-center justify-center px-6">
      <div className="rounded-xl border bg-card p-6 text-center">
        <Loader2 className="mx-auto mb-3 h-5 w-5 animate-spin text-primary" />
        <p className="text-sm">Redirecting to Rust+ login...</p>
      </div>
    </div>
  );
}
