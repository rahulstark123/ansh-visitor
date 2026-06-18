"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { PageHeader } from "@/components/crm/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlansModal } from "@/components/billing/plans-modal";
import { BillingCycleToggle } from "@/components/billing/billing-cycle-toggle";
import { useVisitorStore } from "@/stores/visitor-store";
import { useBillingRegion } from "@/hooks/use-billing-region";
import { startProCheckout } from "@/lib/start-pro-checkout";
import {
  PRO_MAX_TEAMMATES,
  FREE_MAX_TEAMMATES,
  getPlanDisplayName,
  getTrialDaysLeft,
  getTrialEndDate,
  getProPricing,
  type BillingCycle,
} from "@/config/billing";
import {
  ArrowUpRight,
  BadgeIndianRupee,
  HelpCircle,
  Shield,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/toast";
import { ButtonLoadingSkeleton, InlineTextSkeleton } from "@/components/ui/page-skeletons";

export default function BillingPage() {
  const {
    hosts,
    currentUser,
    workspacePlan,
    workspaceCreatedAt,
    setWorkspacePlan,
    plan,
  } = useVisitorStore();

  const { region, loading: regionLoading } = useBillingRegion();
  const [plansOpen, setPlansOpen] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

  const pricing = getProPricing(region, billingCycle);
  const isYearly = billingCycle === "yearly";

  const teamSize = Math.max(hosts.length, 1);
  const wid = currentUser.wid ?? 1;

  const trialEnd = useMemo(
    () => getTrialEndDate(workspaceCreatedAt ?? undefined),
    [workspaceCreatedAt]
  );
  const trialDaysLeft = getTrialDaysLeft(trialEnd);
  const trialEndLabel = format(trialEnd, "d MMMM yyyy");

  const isPro = workspacePlan === "pro";
  const isTrial = workspacePlan === "pro_trial";
  const teamPercent = Math.min(
    100,
    Math.round((teamSize / PRO_MAX_TEAMMATES) * 100)
  );

  const renewalDate = format(
    new Date(
      Date.now() + (isYearly ? 365 : 30) * 24 * 60 * 60 * 1000
    ),
    "d MMMM yyyy"
  );

  const handleUpgrade = async (cycle: BillingCycle = billingCycle) => {
    if (isPro || subscribing) return;
    setSubscribing(true);
    try {
      await startProCheckout({
        wid,
        userName: currentUser.name,
        userEmail: currentUser.email,
        billingCycle: cycle,
        onSuccess: () => setWorkspacePlan("pro", workspaceCreatedAt),
        onDismiss: () => setSubscribing(false),
      });
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to start checkout"
      );
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <div className="space-y-8 select-none animate-in fade-in duration-300">
      <title>Billing | Ansh Visitor</title>

      <PageHeader
        eyebrow="Financial Settings"
        title="Billing Page"
        description="Review your active ANSH Visitor subscription plan and view payment invoices. Pro is a flat price for your entire workspace — monthly or yearly with 19% off."
        toolbar={
          <div className="flex flex-wrap items-center gap-2">
            <BillingCycleToggle
              value={billingCycle}
              onChange={setBillingCycle}
            />
            <Button
              type="button"
              disabled={isPro || subscribing}
              className="btn-primary rounded-full h-10 px-5 gap-2 border-0 text-xs font-bold uppercase tracking-wider"
              onClick={() => handleUpgrade()}
            >
              {subscribing ? (
                <ButtonLoadingSkeleton />
              ) : (
                <>
                  Subscribe {isYearly ? "Yearly" : "Monthly"}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="rounded-full h-10 px-5 text-xs font-bold uppercase tracking-wider border-sky-300 text-sky-700 dark:text-sky-300 hover:bg-sky-50 dark:hover:bg-sky-950/30"
              onClick={() => setPlansOpen(true)}
            >
              Check our Plans
            </Button>
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="crm-card overflow-hidden">
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                    Current Plan
                  </p>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                    {getPlanDisplayName(workspacePlan)}
                  </h2>
                </div>
                {isTrial && (
                  <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-sky-100 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider">
                    <Shield className="h-3.5 w-3.5" />
                    Trial · {trialDaysLeft}d left
                  </span>
                )}
                {isPro && (
                  <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider">
                    <Zap className="h-3.5 w-3.5" />
                    Active Pro
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                    Pricing Rate
                  </p>
                  <p className="text-3xl font-black text-slate-900 dark:text-white">
                    {isPro
                      ? regionLoading
                        ? <InlineTextSkeleton className="inline-block h-8 w-24 rounded-lg align-middle" />
                        : pricing.display
                      : "₹0"}
                    <span className="text-sm font-semibold text-muted-foreground">
                      {isPro ? (isYearly ? "/yr" : "/mo") : ""}
                    </span>
                  </p>
                  {!isPro && !regionLoading && (
                    <p className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                      {isYearly
                        ? `${pricing.yearlyMonthlyEquivalentDisplay}/mo effective · save ${pricing.savingsAmountDisplay}`
                        : `Yearly ${pricing.yearlyTotalDisplay} · save ${pricing.savingsPercent}%`}
                    </p>
                  )}
                  <p className="text-[10px] text-muted-foreground mt-1">
                    Flat price · entire app
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                    Billing Cycle
                  </p>
                  <p className="text-lg font-bold text-slate-800 dark:text-slate-100">
                    {isYearly ? "Yearly" : "Monthly"}
                  </p>
                  {!isPro && isYearly && !regionLoading && (
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {pricing.fullYearListPriceDisplay} list · you pay{" "}
                      {pricing.yearlyTotalDisplay}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                    Next Renewal Date
                  </p>
                  <p className="text-lg font-bold text-slate-800 dark:text-slate-100">
                    {isTrial ? trialEndLabel : renewalDate}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-600 dark:text-slate-300">
                    Team Directory Usage
                  </span>
                  <span className="text-slate-500">
                    {teamSize} teammates registered ({teamPercent}% of cap)
                  </span>
                </div>
                <div className="h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-sky-400 to-sky-600 transition-all duration-500"
                    style={{ width: `${Math.max(teamPercent, 2)}%` }}
                  />
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed pt-1">
                  Pro includes unlimited teammates. Your workspace currently has{" "}
                  {teamSize} registered host{teamSize !== 1 ? "s" : ""}.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="crm-card">
            <CardHeader className="border-b border-border/40 pb-4">
              <div className="flex items-center gap-2">
                <BadgeIndianRupee className="h-4 w-4 text-primary" />
                <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Invoice History
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="hidden sm:grid grid-cols-5 gap-4 px-6 py-3 border-b border-border/30 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                <span>Invoice ID</span>
                <span>Billing Date</span>
                <span className="col-span-2">Description</span>
                <span className="text-right">Amount · Status</span>
              </div>
              <div className="px-6 py-16 text-center">
                <p className="text-sm text-muted-foreground italic">
                  No invoices yet. Upgrade to Pro to see payment history here.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="crm-card">
            <CardHeader className="border-b border-border/40 pb-4">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Available Tiers
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-5 space-y-4">
              <div className="rounded-2xl border border-border/50 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-slate-800 dark:text-slate-100">
                    Free
                  </span>
                  <span className="font-black text-slate-900 dark:text-white">
                    ₹0
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Core visitor logging for small teams — up to {FREE_MAX_TEAMMATES}{" "}
                  teammates, {plan.maxVisitors} visitor check-ins/month, 1 branch.
                </p>
              </div>

              <div
                className={cn(
                  "rounded-2xl border-2 p-4 relative",
                  isPro || isTrial
                    ? "border-sky-400/70 bg-sky-50/30 dark:bg-sky-950/20"
                    : "border-border/50"
                )}
              >
                {(isPro || isTrial) && (
                  <span className="absolute -top-2.5 right-4 rounded-full bg-sky-500 text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5">
                    Current
                  </span>
                )}
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-slate-800 dark:text-slate-100">
                    Pro Edition
                  </span>
                  <span className="font-black text-slate-900 dark:text-white">
                    {regionLoading ? (
                      <InlineTextSkeleton className="inline-block h-5 w-20 rounded align-middle" />
                    ) : (
                      `${pricing.display}${isYearly ? "/yr" : "/mo"}`
                    )}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-1">
                  Flat price for your entire workspace — unlimited visitors,
                  branches, custom badges, and audit exports.
                </p>
                {!regionLoading && (
                  <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mb-4">
                    {isYearly
                      ? `Billed once at ${pricing.yearlyTotalDisplay} (${pricing.yearlyMonthlyEquivalentDisplay}/mo · ${pricing.savingsPercent}% off vs monthly)`
                      : `Pay yearly ${pricing.yearlyTotalDisplay} and save ${pricing.savingsAmountDisplay} (${pricing.savingsPercent}%)`}
                  </p>
                )}
                {!isPro && (
                  <Button
                    type="button"
                    disabled={subscribing}
                    className="btn-primary w-full rounded-full h-9 text-[10px] font-bold uppercase tracking-wider border-0 gap-1.5"
                    onClick={() => handleUpgrade()}
                  >
                    {subscribing ? (
                      <ButtonLoadingSkeleton />
                    ) : (
                      "Upgrade to Pro"
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="crm-card">
            <CardContent className="p-6 text-center space-y-4">
              <span className="flex h-14 w-14 mx-auto items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800/60 text-slate-400">
                <HelpCircle className="h-7 w-7" />
              </span>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-slate-100">
                  Need Billing Assistance?
                </h3>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  If you have questions about invoice details, custom setups, or
                  payment channels, get in touch with our billing team.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                className="w-full rounded-full h-10 text-[10px] font-bold uppercase tracking-wider"
                render={<Link href="/help?tab=tickets" />}
              >
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <PlansModal
        open={plansOpen}
        onOpenChange={setPlansOpen}
        currentTier={workspacePlan}
        onSubscribe={(cycle) => {
          setBillingCycle(cycle);
          handleUpgrade(cycle);
        }}
        subscribing={subscribing}
      />
    </div>
  );
}
