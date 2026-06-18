"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createSupabaseClient } from "@/lib/supabase";

const REDIRECT_FALLBACK = "/";

function isAllowedRedirect(redirect: string) {
  if (!redirect) return false;
  if (!redirect.startsWith("/")) return false;
  if (redirect.startsWith("//")) return false;
  if (redirect.includes("://")) return false;

  return (
    redirect === "/" ||
    redirect.startsWith("/onboarding") ||
    redirect.startsWith("/settings/billing") ||
    redirect.startsWith("/settings") ||
    redirect.startsWith("/dashboard")
  );
}

function sanitizeRedirect(rawRedirect: string | null) {
  const candidate = rawRedirect?.trim() || REDIRECT_FALLBACK;
  return isAllowedRedirect(candidate) ? candidate : REDIRECT_FALLBACK;
}

function MobileAuthHandoff() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [isSessionExpired, setIsSessionExpired] = useState(false);

  useEffect(() => {
    const run = async () => {
      const rawRedirect = searchParams.get("redirect");
      const redirectTo = sanitizeRedirect(rawRedirect);
      const hash = window.location.hash.startsWith("#")
        ? window.location.hash.slice(1)
        : window.location.hash;
      const params = new URLSearchParams(hash);
      const access_token = params.get("access_token");
      const refresh_token = params.get("refresh_token");

      if (!access_token || !refresh_token) {
        console.warn("[mobile-handoff] missing tokens", {
          hasAccessToken: Boolean(access_token),
          hasRefreshToken: Boolean(refresh_token),
          rawRedirect,
        });
        setError("Missing session tokens. Please sign in from the mobile app again.");
        setIsSessionExpired(true);
        return;
      }

      const supabase = createSupabaseClient();
      const { error: sessionError } = await supabase.auth.setSession({
        access_token,
        refresh_token,
      });

      if (sessionError) {
        console.error("[mobile-handoff] setSession failed", {
          message: sessionError.message,
          rawRedirect,
          redirectTo,
        });
        setError("Session expired, please reopen this page from the mobile app.");
        setIsSessionExpired(true);
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("Could not read your account. Please sign in from the mobile app again.");
        setIsSessionExpired(true);
        return;
      }

      // Drop any cached demo/workspace data from a prior session on this device.
      localStorage.removeItem("ansh-visitor-data");

      const profileRes = await fetch(`/api/profiles/${user.id}`);
      const destination = profileRes.ok ? redirectTo : "/onboarding";

      if (rawRedirect && redirectTo !== rawRedirect) {
        console.warn("[mobile-handoff] redirect blocked by allowlist", {
          rawRedirect,
          redirectTo,
        });
      }

      console.info("[mobile-handoff] success", { redirectTo: destination });
      router.replace(destination);
    };

    run();
  }, [router, searchParams]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <p className="text-sm font-semibold text-slate-900">Could not sign you in on web</p>
          <p className="mt-2 text-sm text-slate-500">{error}</p>
          {isSessionExpired && (
            <div className="mt-4 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
              >
                Retry handoff
              </button>
              <a
                href="/login"
                className="text-sm font-semibold text-slate-700 underline underline-offset-2"
              >
                Open login page
              </a>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <p className="text-sm font-semibold text-slate-600">Opening your workspace...</p>
    </div>
  );
}

export default function MobileAuthHandoffPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
          <p className="text-sm font-semibold text-slate-600">Opening your workspace...</p>
        </div>
      }
    >
      <MobileAuthHandoff />
    </Suspense>
  );
}
