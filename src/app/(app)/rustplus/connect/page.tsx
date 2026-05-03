"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
  }
}

export default function RustPlusConnectPage() {
  const [status, setStatus] = useState("Opening Rust+ login...");

  useEffect(() => {
    const callbackUrl = `${window.location.origin}/rustplus/connect/callback`;
    const rustAppUrl = `https://companion-rust.facepunch.com/app?returnUrl=${encodeURIComponent(
      callbackUrl
    )}`;
    const popup = window.open(rustAppUrl, "_blank");
    if (!popup) {
      return;
    }

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      window.close();
    };

    const interval = window.setInterval(() => {
      if (done) return;

      try {
        const popupWindow = popup as Window & {
          ReactNativeWebView?: { postMessage: (message: string) => void };
        };

        // Path 1: If returnUrl works and user gets redirected back to our origin, read token from query.
        if (popupWindow.location.origin === window.location.origin) {
          const token = new URLSearchParams(popupWindow.location.search).get("token");
          if (token && window.opener) {
            window.opener.postMessage(
              { type: "RUSTPLUS_AUTH_TOKEN", token },
              window.location.origin
            );
            setStatus("Rust+ callback received. Returning to app...");
            finish();
            return;
          }
        }

        // Path 2 (fallback): emulate Rust+ app bridge and capture Token via ReactNativeWebView.postMessage.
        if (!popupWindow.ReactNativeWebView) {
          popupWindow.ReactNativeWebView = {
            postMessage: (message: string) => {
              try {
                const auth = JSON.parse(message) as { Token?: string };
                if (auth.Token && window.opener) {
                  window.opener.postMessage(
                    { type: "RUSTPLUS_AUTH_TOKEN", token: auth.Token },
                    window.location.origin
                  );
                  setStatus("Rust+ login complete. Returning to app...");
                  finish();
                }
              } catch {
                // ignore malformed payloads
              }
            },
          };
        }
      } catch {
        // Cross-origin access can fail while navigating; keep retrying in the window.
      }

      if (popup.closed) {
        setStatus("Login window was closed before token was received.");
        window.clearInterval(interval);
      }
    }, 250);

    return () => {
      window.clearInterval(interval);
      if (!popup.closed) popup.close();
    };
  }, []);

  return (
    <div className="flex min-h-[40vh] items-center justify-center px-6">
      <div className="rounded-xl border bg-card p-6 text-center">
        <Loader2 className="mx-auto mb-3 h-5 w-5 animate-spin text-primary" />
        <p className="text-sm">{status}</p>
      </div>
    </div>
  );
}
