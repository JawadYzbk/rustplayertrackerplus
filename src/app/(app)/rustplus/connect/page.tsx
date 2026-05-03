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
    const popup = window.open("https://companion-rust.facepunch.com/login", "_blank");
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
