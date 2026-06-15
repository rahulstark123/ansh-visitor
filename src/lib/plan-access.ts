import type { WorkspacePlanTier } from "@/config/billing";
import { prisma } from "@/lib/prisma";
import { resolveEffectiveWorkspacePlan } from "@/lib/workspace-plan-tier";

export {
  hasProFeatureAccess,
  workspaceHasProFeatureAccess,
  isPaidProPlan,
  resolveEffectiveWorkspacePlan,
  PRO_FEATURE_DENIED_MESSAGE,
  PRO_FEATURE_TRIAL_EXPIRED_MESSAGE,
} from "@/lib/workspace-plan-tier";

export async function getEffectiveWorkspacePlan(
  wid: number
): Promise<WorkspacePlanTier> {
  const workspace = await prisma.workspace.findUnique({
    where: { id: wid },
    select: { plan: true, createdAt: true },
  });

  if (!workspace) return "free";
  return resolveEffectiveWorkspacePlan(workspace.plan, workspace.createdAt);
}

/** @deprecated Use getEffectiveWorkspacePlan */
export async function getWorkspacePlan(wid: number): Promise<WorkspacePlanTier> {
  return getEffectiveWorkspacePlan(wid);
}
