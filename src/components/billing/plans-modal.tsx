"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  PLAN_COMPARISON_ROWS,
  FREE_PLAN_FEATURES,
  FREE_PLAN_LIMITATIONS,
  PRO_PLAN_FEATURES,
  formatProPrice,
  getRegionPricingLabel,
  type WorkspacePlanTier,
} from "@/config/billing";
import { useBillingRegion } from "@/hooks/use-billing-region";
import {
  Zap,
  Shield,
  Check,
  X,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ButtonLoadingSkeleton, InlineTextSkeleton } from "@/components/ui/page-skeletons";

interface PlansModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentTier: WorkspacePlanTier;
  onSubscribe: () => void;
  subscribing?: boolean;
}

export function PlansModal({
  open,
  onOpenChange,
  currentTier,
  onSubscribe,
  subscribing = false,
}: PlansModalProps) {
  const { region, loading: regionLoading } = useBillingRegion();
  const isPro = currentTier === "pro" || currentTier === "pro_trial";
  const proPriceLabel = formatProPrice(region);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[920px] p-0 overflow-hidden rounded-2xl max-h-[92vh] overflow-y-auto">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/50 space-y-3">
          <div className="flex items-start gap-3 pr-8">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600">
              <Zap className="h-5 w-5" />
            </span>
            <div>
              <DialogTitle className="text-base font-extrabold uppercase tracking-wide text-slate-700 dark:text-slate-200">
                Upgrade Subscription Plan
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground mt-1 leading-relaxed max-w-xl">
                Compare our plans and upgrade to unlock multi-branch visitor
                management, unlimited check-ins, My Link pages, custom badges, and audit
                exports for your entire workspace.
              </DialogDescription>
            </div>
          </div>

          <p className="text-xs text-sky-600 dark:text-sky-400 font-medium">
            {regionLoading ? (
              <InlineTextSkeleton className="inline-block h-3.5 w-44 rounded align-middle" />
            ) : (
              getRegionPricingLabel(region)
            )}
          </p>
        </DialogHeader>

        <div className="px-6 py-5 grid gap-4 sm:grid-cols-2">
          {/* Free */}
          <div className="rounded-2xl border border-border/60 bg-white dark:bg-card p-5 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500">
                <Shield className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Plan
                </p>
                <p className="text-lg font-bold text-slate-900 dark:text-white">
                  Free
                </p>
              </div>
            </div>
            <div className="mb-4">
              <span className="text-3xl font-black text-slate-900 dark:text-white">
                ₹0
              </span>
              <p className="text-xs text-muted-foreground mt-1">
                Forever free · no credit card required
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              disabled
              className="w-full rounded-full h-10 text-[10px] font-bold uppercase tracking-wider mb-5"
            >
              Downgrade Unavailable
            </Button>
            <ul className="space-y-2.5 flex-1">
              {FREE_PLAN_FEATURES.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300"
                >
                  <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
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

          {/* Pro */}
          <div
            className={cn(
              "rounded-2xl border-2 p-5 flex flex-col relative",
              isPro
                ? "border-emerald-400/60 bg-emerald-50/20 dark:bg-emerald-950/10"
                : "border-sky-400/60 bg-sky-50/20 dark:bg-sky-950/10"
            )}
          >
            {isPro && (
              <span className="absolute top-4 right-4 rounded-full bg-emerald-500 text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-1">
                Active
              </span>
            )}
            <div className="flex items-center gap-3 mb-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500 text-white">
                <Zap className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Plan
                </p>
                <p className="text-lg font-bold text-slate-900 dark:text-white">
                  Pro
                </p>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-slate-900 dark:text-white">
                  {regionLoading ? (
                    <InlineTextSkeleton className="inline-block h-10 w-24 rounded-lg align-middle" />
                  ) : (
                    proPriceLabel.replace("/ month", "")
                  )}
                </span>
                <span className="text-sm text-muted-foreground">/ month</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Flat price for your entire workspace — unlimited teammates
              </p>
            </div>
            <Button
              type="button"
              disabled={subscribing || isPro}
              className="btn-primary w-full rounded-full h-10 text-[10px] font-bold uppercase tracking-wider mb-5 border-0 gap-1.5"
              onClick={() => {
                onOpenChange(false);
                onSubscribe();
              }}
            >
              {subscribing ? (
                <ButtonLoadingSkeleton />
              ) : (
                <>
                  Subscribe to Pro
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </>
              )}
            </Button>
            <ul className="space-y-2.5 flex-1">
              {PRO_PLAN_FEATURES.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300"
                >
                  <Check className="h-4 w-4 text-sky-500 shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Compare table */}
        <div className="px-6 pb-6">
          <div className="rounded-2xl border border-border/60 overflow-hidden">
            <div className="px-4 py-3 border-b border-border/50 bg-slate-50/50 dark:bg-slate-900/30">
              <p className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-200">
                Compare Plans
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border/40 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    <th className="text-left px-4 py-3 font-bold">Feature</th>
                    <th className="text-center px-4 py-3 font-bold">Free</th>
                    <th className="text-center px-4 py-3 font-bold text-sky-600">
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
                      <td className="px-4 py-3 font-medium text-slate-600 dark:text-slate-300">
                        {row.feature}
                      </td>
                      <td className="px-4 py-3 text-center">
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
                      <td className="px-4 py-3 text-center">
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
            <div className="px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-border/40 bg-slate-50/30 dark:bg-slate-900/20">
              <p className="text-[10px] text-muted-foreground">
                SSL encrypted · 99.9% uptime SLA · Secured by Razorpay
              </p>
              <Button
                type="button"
                disabled={subscribing || isPro}
                className="btn-primary rounded-full h-9 px-5 text-[10px] font-bold uppercase tracking-wider border-0 gap-1.5 shrink-0"
                onClick={() => {
                  onOpenChange(false);
                  onSubscribe();
                }}
              >
                {subscribing ? (
                  <ButtonLoadingSkeleton />
                ) : (
                  <>
                    Subscribe to Pro
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
