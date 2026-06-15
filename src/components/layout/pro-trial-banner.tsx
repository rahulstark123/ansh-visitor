"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Sparkles, X } from "lucide-react";
import { useVisitorStore } from "@/stores/visitor-store";
import { useUiStore } from "@/stores/ui-store";
import { getTrialDaysLeft, getTrialEndDate } from "@/config/billing";

export function ProTrialBanner() {
  const { workspacePlan, workspaceCreatedAt } = useVisitorStore();
  const dismissed = useUiStore((s) => s.trialBannerDismissed);
  const setTrialBannerDismissed = useUiStore((s) => s.setTrialBannerDismissed);

  const trialDaysLeft = useMemo(() => {
    const trialEnd = getTrialEndDate(workspaceCreatedAt ?? undefined);
    return getTrialDaysLeft(trialEnd);
  }, [workspaceCreatedAt]);

  if (workspacePlan !== "pro_trial" || dismissed || trialDaysLeft <= 0) {
    return null;
  }

  const daysLabel =
    trialDaysLeft === 1 ? "1 day left" : `${trialDaysLeft} days left`;

  return (
    <div className="relative z-30 flex shrink-0 items-center justify-between gap-4 border-b border-sky-200/70 bg-sky-50 px-4 py-2.5 dark:border-sky-900/50 dark:bg-sky-950/40 sm:px-6">
      <div className="flex min-w-0 items-center gap-2.5 text-xs sm:text-[13px]">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400">
          <Sparkles className="h-3.5 w-3.5" />
        </span>
        <p className="min-w-0 leading-snug text-slate-600 dark:text-slate-300">
          <span className="font-bold text-sky-700 dark:text-sky-300">
            Pro trial active
          </span>
          <span className="text-slate-500 dark:text-slate-400">
            {" "}
            — all features unlocked · {daysLabel}
          </span>
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <Link
          href="/settings/billing"
          className="text-[10px] font-black uppercase tracking-widest text-sky-600 transition-colors hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
        >
          View Plans
        </Link>
        <button
          type="button"
          onClick={() => setTrialBannerDismissed(true)}
          className="rounded-md p-1 text-slate-400 transition-colors hover:bg-sky-100 hover:text-slate-600 dark:hover:bg-sky-900/50 dark:hover:text-slate-200 cursor-pointer"
          aria-label="Dismiss trial banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
