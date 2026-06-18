"use client";

import {
  YEARLY_DISCOUNT_PERCENT,
  type BillingCycle,
} from "@/config/billing";
import { cn } from "@/lib/utils";

interface BillingCycleToggleProps {
  value: BillingCycle;
  onChange: (cycle: BillingCycle) => void;
  className?: string;
}

export function BillingCycleToggle({
  value,
  onChange,
  className,
}: BillingCycleToggleProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-border/60 bg-slate-100/80 p-1 dark:bg-slate-900/50",
        className
      )}
    >
      <button
        type="button"
        onClick={() => onChange("monthly")}
        className={cn(
          "rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all",
          value === "monthly"
            ? "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white"
            : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
        )}
      >
        Monthly
      </button>
      <button
        type="button"
        onClick={() => onChange("yearly")}
        className={cn(
          "rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1.5",
          value === "yearly"
            ? "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white"
            : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
        )}
      >
        Yearly
        <span className="rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[9px] font-black text-emerald-600 dark:text-emerald-400">
          -{YEARLY_DISCOUNT_PERCENT}%
        </span>
      </button>
    </div>
  );
}
