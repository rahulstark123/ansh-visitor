"use client";

import {
  FREE_PLAN_FEATURES,
  FREE_PLAN_LIMITATIONS,
  PRO_PLAN_FEATURES,
  FREE_MAX_TEAMMATES,
  formatProPrice,
  getRegionPricingLabel,
} from "@/config/billing";
import { useBillingRegion } from "@/hooks/use-billing-region";
import { InlineTextSkeleton } from "@/components/ui/page-skeletons";
import { CheckCircle, Check, X, Zap, Shield } from "lucide-react";

export function PricingSection() {  const { region, loading: regionLoading } = useBillingRegion();
  const proPriceLabel = formatProPrice(region);

  return (
    <section
      id="pricing"
      className="py-24 border-b border-slate-700/40"
      style={{ background: "linear-gradient(135deg, oklch(0.13 0.02 220) 0%, oklch(0.15 0.025 160) 100%)" }}
    >
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <span className="text-xs font-black tracking-widest text-emerald-400 uppercase">
            Transparent Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Simple plans for every office
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-medium">
            Start free, then upgrade to Pro with one flat monthly price for your
            entire workspace — no per-user fees.
          </p>
          <p className="text-xs text-sky-400 font-medium pt-1">
            {regionLoading ? (
              <InlineTextSkeleton className="mx-auto h-3.5 w-44 rounded bg-slate-700/80" />
            ) : (
              getRegionPricingLabel(region)
            )}
          </p>
        </div>

        <div className="grid gap-8 max-w-4xl mx-auto lg:grid-cols-2 mb-12">
          {/* Free */}
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/40 p-8 relative overflow-hidden hover:border-emerald-500/30 transition-colors">
            <div className="space-y-4">              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                  <Shield className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    Plan
                  </p>
                  <h3 className="text-lg font-black text-white leading-none">
                    Free
                  </h3>
                </div>
              </div>
              <div>
                <div className="flex items-baseline leading-none">
                  <span className="text-4xl font-black tracking-tight text-white">
                    ₹0
                  </span>
                  <span className="text-xs text-slate-400 font-semibold ml-2">
                    / month
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Forever free · no credit card required
                </p>
              </div>
              <ul className="space-y-2.5">
                {FREE_PLAN_FEATURES.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-xs font-semibold text-slate-400"
                  >
                    <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
                {FREE_PLAN_LIMITATIONS.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-xs text-slate-500"
                  >
                    <X className="h-4 w-4 shrink-0 mt-0.5 text-slate-600" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Pro */}
          <div className="rounded-2xl border-2 border-sky-500/40 bg-sky-950/20 p-8 relative overflow-hidden hover:border-sky-400/50 transition-colors">            <span className="absolute top-0 right-0 bg-sky-500 text-white font-black uppercase text-[8px] tracking-wider px-3 py-1 rounded-bl-xl">
              Recommended
            </span>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500 text-white">
                  <Zap className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    Plan
                  </p>
                  <h3 className="text-lg font-black text-white leading-none">
                    Pro
                  </h3>
                </div>
              </div>
              <div>
                <div className="flex items-baseline leading-none flex-wrap gap-x-2">
                  <span className="text-4xl font-black tracking-tight text-white">
                    {regionLoading ? (
                      <InlineTextSkeleton className="inline-block h-10 w-24 rounded-lg align-middle bg-slate-700/80" />
                    ) : (
                      proPriceLabel.replace("/ month", "")
                    )}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">
                    / month · entire app
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Flat price for your whole workspace — up to {FREE_MAX_TEAMMATES}{" "}
                  teammates on Free, unlimited on Pro
                </p>
              </div>
              <ul className="space-y-2.5">
                {PRO_PLAN_FEATURES.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-xs font-semibold text-slate-400"
                  >
                    <Check className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>      </div>
    </section>
  );
}
