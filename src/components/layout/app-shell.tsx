"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { SubSidebar } from "./sub-sidebar";
import { MainSidebar } from "./main-sidebar";
import { AppHeader } from "./app-header";
import { ProTrialBanner } from "./pro-trial-banner";
import { useVisitorStore } from "@/stores/visitor-store";
import { createSupabaseClient } from "@/lib/supabase";
import { AppContentSkeleton } from "@/components/ui/page-skeletons";
import { Monitor } from "lucide-react";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileSize, setIsMobileSize] = useState(false);
  const [appReady, setAppReady] = useState(false);
  const initialize = useVisitorStore((s) => s.initialize);
  const hasChecked = useRef(false);

  useEffect(() => {
    if (hasChecked.current) return;
    hasChecked.current = true;

    const checkAuth = async () => {
      try {
        const supabase = createSupabaseClient();

        // getUser() validates the JWT on the server — safer than getSession()
        const { data: { user }, error } = await supabase.auth.getUser();

        if (error || !user) {
          router.push("/login");
          return;
        }

        try {
          await initialize();
        } catch (err) {
          console.error("Store initialization failed:", err);
        }

        setAppReady(true);
      } catch {
        router.push("/login");
      }
    };

    checkAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
    };
  }, []);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");

    const handleMobileChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobileSize(e.matches);
    };

    handleMobileChange(mobileQuery);
    mobileQuery.addEventListener("change", handleMobileChange);
    return () => mobileQuery.removeEventListener("change", handleMobileChange);
  }, []);

  // Suppress unused variable warning
  void pathname;

  if (!appReady) {
    return (
      <div className="flex h-screen overflow-hidden bg-background">
        <MainSidebar />
        <SubSidebar />
        <AppContentSkeleton />
      </div>
    );
  }

  if (isMobileSize) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center bg-slate-50 px-6 py-16 text-center dark:bg-slate-950 animate-in fade-in duration-300 select-none text-slate-800 dark:text-slate-200">
        <div className="relative mb-8 flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-emerald-50 text-emerald-600 shadow-xl shadow-emerald-500/10 dark:bg-emerald-950/30 dark:text-emerald-450">
          <Monitor className="h-10 w-10" />
          <div className="absolute -right-1 -top-1 flex h-6 w-6 animate-bounce items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-lg shadow-primary/25">
            ★
          </div>
        </div>

        <h2 className="max-w-xs text-xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
          Best on Desktop
        </h2>

        <p className="mt-4 max-w-xs text-xs leading-relaxed text-slate-500 dark:text-slate-400">
          Ansh Visitor is optimized for desktop screen widths. Please open it on a larger display monitor for the complete reception workflow experience.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <MainSidebar />
      <SubSidebar />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <ProTrialBanner />
        <AppHeader />
        <main className="mesh-gradient min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <div className="mx-auto w-full max-w-7xl p-6 md:p-10 lg:p-12">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
