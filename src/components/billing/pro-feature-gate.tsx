"use client";

import { useState } from "react";
import { Lock, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlansModal } from "@/components/billing/plans-modal";
import { useVisitorStore } from "@/stores/visitor-store";
import { startProCheckout } from "@/lib/start-pro-checkout";
import { toast } from "@/components/ui/toast";
import type { WorkspacePlanTier } from "@/config/billing";
import { hasProFeatureAccess } from "@/lib/workspace-plan-tier";

interface ProFeatureGateProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function ProFeatureGate({
  title,
  description,
  children,
}: ProFeatureGateProps) {
  const {
    workspacePlan,
    workspaceCreatedAt,
    currentUser,
    setWorkspacePlan,
  } = useVisitorStore();
  const [plansOpen, setPlansOpen] = useState(false);
  const [subscribing, setSubscribing] = useState(false);

  if (hasProFeatureAccess(workspacePlan)) {
    return <>{children}</>;
  }

  const handleUpgrade = async () => {
    if (subscribing) return;
    setSubscribing(true);
    try {
      await startProCheckout({
        wid: currentUser.wid ?? 1,
        userName: currentUser.name,
        userEmail: currentUser.email,
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
    <>
      <Card className="crm-card overflow-hidden border-sky-200/60 dark:border-sky-900/40">
        <CardContent className="p-8">
          <div className="mx-auto flex max-w-lg flex-col items-center text-center">
            <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-600">
              <Lock className="h-7 w-7" />
            </span>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-sky-600">
              Pro Feature
            </p>
            <h2 className="mt-2 text-xl font-black text-slate-900 dark:text-white">
              {title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              {description}
            </p>
            <ul className="mt-5 space-y-2 text-left text-sm text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-sky-500" />
                Branded public pre-registration page with custom slug
              </li>
              <li className="flex items-start gap-2">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-sky-500" />
                5 page design themes and configurable form fields
              </li>
              <li className="flex items-start gap-2">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-sky-500" />
                Shareable link for guest self-registration with QR pass
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button
                className="btn-primary h-11 border-0 px-6"
                onClick={handleUpgrade}
                disabled={subscribing}
              >
                <Zap className="mr-2 h-4 w-4" />
                {subscribing ? "Starting checkout..." : "Upgrade to Pro"}
              </Button>
              <Button
                variant="outline"
                className="h-11 px-6"
                onClick={() => setPlansOpen(true)}
              >
                Compare Plans
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <PlansModal
        open={plansOpen}
        onOpenChange={setPlansOpen}
        currentTier={workspacePlan as WorkspacePlanTier}
        onSubscribe={handleUpgrade}
        subscribing={subscribing}
      />
    </>
  );
}
