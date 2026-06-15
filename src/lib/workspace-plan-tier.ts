import type { WorkspacePlanTier } from "@/config/billing";
import {
  getTrialDaysLeft,
  getTrialEndDate,
  TRIAL_DAYS,
} from "@/config/billing";

/** Maps stored DB plan + workspace age to the tier the app should enforce. */
export function resolveEffectiveWorkspacePlan(
  storedPlan: string,
  createdAt: Date | string
): WorkspacePlanTier {
  if (storedPlan === "pro") return "pro";
  if (storedPlan === "pro_trial") return "pro_trial";

  const trialEnd = getTrialEndDate(createdAt);
  if (getTrialDaysLeft(trialEnd) > 0) {
    return "pro_trial";
  }

  return "free";
}

export function hasProFeatureAccess(
  plan: string | null | undefined
): plan is "pro" | "pro_trial" {
  return plan === "pro" || plan === "pro_trial";
}

export function workspaceHasProFeatureAccess(
  storedPlan: string,
  createdAt: Date | string
): boolean {
  return hasProFeatureAccess(resolveEffectiveWorkspacePlan(storedPlan, createdAt));
}

export function isPaidProPlan(plan: string | null | undefined): boolean {
  return plan === "pro";
}

export const PRO_FEATURE_DENIED_MESSAGE =
  `My Link is available on Pro and during the ${TRIAL_DAYS}-day free trial. Upgrade to create and share public pre-registration pages.`;

export const PRO_FEATURE_TRIAL_EXPIRED_MESSAGE =
  `Your ${TRIAL_DAYS}-day Pro trial has ended. Upgrade to keep using My Link and other Pro features.`;
