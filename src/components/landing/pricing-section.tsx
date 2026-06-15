"use client";

import Link from "next/link";
import {
  FREE_PLAN_FEATURES,
  FREE_PLAN_LIMITATIONS,
  PRO_PLAN_FEATURES,
  PLAN_COMPARISON_ROWS,
  FREE_MAX_TEAMMATES,
  formatProPrice,
  getRegionPricingLabel,
} from "@/config/billing";
import { useBillingRegion } from "@/hooks/use-billing-region";
import { InlineTextSkeleton } from "@/components/ui/page-skeletons";
import { CheckCircle, Check, X, Zap, Shield, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingSectionProps {
  isLoggedIn: boolean;
}

export function PricingSection({ isLoggedIn }: PricingSectionProps) {
  const { region, loading: regionLoading } = useBillingRegion();
  const proPriceLabel = formatProPrice(region);

  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <span className="text-xs font-black tracking-widest text-primary uppercase">
            Transparent Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Simple plans for every office
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-medium">
            Start free, then upgrade to Pro with one flat monthly price for your
            entire workspace — no per-user fees.
          </p>
          <p className="text-xs text-sky-600 dark:text-sky-400 font-medium pt-1">
            {regionLoading ? (
              <InlineTextSkeleton className="mx-auto h-3.5 w-44 rounded" />
            ) : (
              getRegionPricingLabel(region)
            )}
          </p>
        </div>

        <div className="grid gap-8 max-w-4xl mx-auto lg:grid-cols-2 mb-12">
          {/* Free */}
          <div className="crm-card p-8 flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500">
                  <Shield className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Plan
                  </p>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white leading-none">
                    Free
                  </h3>
                </div>
              </div>
              <div>
                <div className="flex items-baseline leading-none">
                  <span className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                    ₹0
                  </span>
                  <span className="text-xs text-slate-400 font-semibold ml-2">
                    / month
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Forever free · no credit card required
                </p>
              </div>
              <ul className="space-y-2.5">
                {FREE_PLAN_FEATURES.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-xs font-semibold text-slate-500"
                  >
                    <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
                {FREE_PLAN_LIMITATIONS.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-xs text-slate-400"
                  >
                    <X className="h-4 w-4 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href={isLoggedIn ? "/dashboard" : "/signup"}
              className="btn-primary w-full rounded-xl flex items-center justify-center font-bold text-xs uppercase tracking-wider cursor-pointer h-10"
            >
              {isLoggedIn ? "Go to Dashboard" : "Sign Up Free"}
            </Link>
          </div>

          {/* Pro */}
          <div className="crm-card p-8 flex flex-col justify-between space-y-6 border-2 border-sky-400/50 bg-sky-50/20 dark:bg-sky-950/10 relative overflow-hidden">
            <span className="absolute top-0 right-0 bg-sky-500 text-white font-black uppercase text-[8px] tracking-wider px-3 py-1 rounded-bl-xl">
              Recommended
            </span>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500 text-white">
                  <Zap className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Plan
                  </p>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white leading-none">
                    Pro
                  </h3>
                </div>
              </div>
              <div>
                <div className="flex items-baseline leading-none flex-wrap gap-x-2">
                  <span className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                    {regionLoading ? (
                      <InlineTextSkeleton className="inline-block h-10 w-24 rounded-lg align-middle" />
                    ) : (
                      proPriceLabel.replace("/ month", "")
                    )}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">
                    / month · entire app
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Flat price for your whole workspace — up to {FREE_MAX_TEAMMATES}{" "}
                  teammates on Free, unlimited on Pro
                </p>
              </div>
              <ul className="space-y-2.5">
                {PRO_PLAN_FEATURES.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-xs font-semibold text-slate-500"
                  >
                    <Check className="h-4 w-4 text-sky-500 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href={isLoggedIn ? "/settings/billing" : "/signup"}
              className="btn-primary w-full rounded-xl flex items-center justify-center font-bold text-xs uppercase tracking-wider cursor-pointer h-10 gap-1.5 border-0"
            >
              {isLoggedIn ? "Upgrade to Pro" : "Start Free Trial"}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Compare table */}
        <div className="max-w-4xl mx-auto rounded-2xl border border-border/60 overflow-hidden crm-card">
          <div className="px-5 py-4 border-b border-border/50 bg-slate-50/50 dark:bg-slate-900/30">
            <p className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-200">
              Compare Plans
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border/40 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  <th className="text-left px-5 py-3 font-bold">Feature</th>
                  <th className="text-center px-5 py-3 font-bold">Free</th>
                  <th className="text-center px-5 py-3 font-bold text-sky-600">
                    Pro
                  </th>
                </tr>
              </thead>
              <tbody>
                {PLAN_COMPARISON_ROWS.map((row) => (
                  <tr
                    key={row.feature}
                    className="border-b border-border/30 last:border-0"
                  >
                    <td className="px-5 py-3 font-medium text-slate-600 dark:text-slate-300">
                      {row.feature}
                    </td>
                    <td className="px-5 py-3 text-center">
                      {typeof row.free === "boolean" ? (
                        row.free ? (
                          <Check className="h-4 w-4 text-emerald-500 mx-auto" />
                        ) : (
                          <X className="h-4 w-4 text-slate-300 mx-auto" />
                        )
                      ) : (
                        <span className="text-slate-500">{row.free}</span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-center">
                      {typeof row.pro === "boolean" ? (
                        row.pro ? (
                          <Check className="h-4 w-4 text-sky-500 mx-auto" />
                        ) : (
                          <X className="h-4 w-4 text-slate-300 mx-auto" />
                        )
                      ) : (
                        <span className="font-semibold text-slate-700 dark:text-slate-200">
                          {row.pro}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-border/40 bg-slate-50/30 dark:bg-slate-900/20">
            <p className="text-[10px] text-muted-foreground">
              SSL encrypted · 99.9% uptime SLA · Secured by Razorpay
            </p>
            <Link
              href={isLoggedIn ? "/settings/billing" : "/signup"}
              className={cn(
                "btn-primary inline-flex items-center justify-center rounded-full h-9 px-5",
                "text-[10px] font-bold uppercase tracking-wider border-0 gap-1.5 shrink-0"
              )}
            >
              {isLoggedIn ? "Subscribe to Pro" : "Get Started"}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
