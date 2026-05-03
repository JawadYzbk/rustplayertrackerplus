"use client";

import { useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function RustPlusConnectCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = useMemo(() => {
    const direct =
      searchParams.get("token") ||
      searchParams.get("Token") ||
      searchParams.get("authToken") ||
      searchParams.get("authtoken");
    if (direct) return direct;

    // Some providers place values in hash fragment.
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
      return (
        hash.get("token") ||
        hash.get("Token") ||
        hash.get("authToken") ||
        hash.get("authtoken")
      );
    }

    return null;
  }, [searchParams]);

  useEffect(() => {
    if (token) {
      window.sessionStorage.setItem("rustplus_auth_token", token);
      router.replace("/servers");
      return;
    }

    // No token returned by Rust+, still return user to pairing page for manual fallback.
    const timer = window.setTimeout(() => {
      router.replace("/servers");
    }, 2500);
    return () => window.clearTimeout(timer);
  }, [router, token]);

  return (
    <div className="flex min-h-[40vh] items-center justify-center px-6">
      <div className="rounded-xl border bg-card p-6 text-center">
        <Loader2 className="mx-auto mb-3 h-5 w-5 animate-spin text-primary" />
        <p className="text-sm">
          {token
            ? "Token captured. Returning to Servers..."
            : "No token in callback. Returning to Servers for manual token input..."}
        </p>
      </div>
    </div>
  );
}
