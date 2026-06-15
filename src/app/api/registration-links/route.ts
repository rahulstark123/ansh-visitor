import { NextRequest, NextResponse } from "next/server";
import { REGISTRATION_DESIGN_THEME_IDS } from "@/config/registration-link-designs";
import {
  getEffectiveWorkspacePlan,
  hasProFeatureAccess,
  PRO_FEATURE_DENIED_MESSAGE,
  PRO_FEATURE_TRIAL_EXPIRED_MESSAGE,
  workspaceHasProFeatureAccess,
} from "@/lib/plan-access";
import { prisma } from "@/lib/prisma";
import {
  buildSlugBase,
  generateUniqueSlug,
  isValidSlug,
} from "@/lib/registration-link-slug";

const LINK_SELECT = {
  id: true,
  slug: true,
  wid: true,
  hostId: true,
  officeBranch: true,
  enabled: true,
  designTheme: true,
  pageTitle: true,
  welcomeMessage: true,
  qrValidityPeriod: true,
  fieldNameRequired: true,
  fieldPhoneRequired: true,
  fieldEmailRequired: true,
  fieldPurposeRequired: true,
  fieldIdProofRequired: true,
  fieldCompanyEnabled: true,
  fieldCompanyRequired: true,
  fieldNotesEnabled: true,
  fieldNotesRequired: true,
  createdAt: true,
  updatedAt: true,
} as const;

function parseFieldConfig(body: Record<string, unknown>) {
  return {
    fieldNameRequired: Boolean(body.fieldNameRequired ?? true),
    fieldPhoneRequired: Boolean(body.fieldPhoneRequired ?? false),
    fieldEmailRequired: Boolean(body.fieldEmailRequired ?? false),
    fieldPurposeRequired: Boolean(body.fieldPurposeRequired ?? false),
    fieldIdProofRequired: Boolean(body.fieldIdProofRequired ?? false),
    fieldCompanyEnabled: Boolean(body.fieldCompanyEnabled ?? true),
    fieldCompanyRequired: Boolean(body.fieldCompanyRequired ?? false),
    fieldNotesEnabled: Boolean(body.fieldNotesEnabled ?? true),
    fieldNotesRequired: Boolean(body.fieldNotesRequired ?? false),
  };
}

// GET /api/registration-links?wid=1&hostId=...
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const wid = Number(searchParams.get("wid") ?? 1);
    const hostId = searchParams.get("hostId");

    if (!hostId) {
      return NextResponse.json({ error: "hostId is required" }, { status: 400 });
    }

    const link = await prisma.publicRegistrationLink.findUnique({
      where: { wid_hostId: { wid, hostId } },
      select: LINK_SELECT,
    });

    const workspace = await prisma.workspace.findUnique({
      where: { id: wid },
      select: { name: true, plan: true, createdAt: true },
    });

    const host = await prisma.profile.findUnique({
      where: { id: hostId },
      select: { officeBranch: true, name: true },
    });

    const suggestedSlug = buildSlugBase(
      workspace?.name ?? "workspace",
      host?.officeBranch ?? "main-office"
    );

    const effectivePlan = workspace
      ? await getEffectiveWorkspacePlan(wid)
      : "free";

    return NextResponse.json(
      {
        link,
        suggestedSlug,
        workspaceName: workspace?.name ?? "Workspace",
        hostBranch: host?.officeBranch ?? "Main Office",
        workspacePlan: effectivePlan,
        proRequired: !hasProFeatureAccess(effectivePlan),
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("[GET /api/registration-links]", err);
    return NextResponse.json(
      { error: "Failed to fetch registration link" },
      { status: 500 }
    );
  }
}

// POST /api/registration-links — create or update host link
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      wid = 1,
      hostId,
      officeBranch,
      enabled = true,
      designTheme = "classic",
      pageTitle,
      welcomeMessage,
      qrValidityPeriod = "24h",
    } = body as Record<string, unknown>;

    if (!hostId || typeof hostId !== "string") {
      return NextResponse.json({ error: "hostId is required" }, { status: 400 });
    }

    const workspaceId = Number(wid) || 1;
    const effectivePlan = await getEffectiveWorkspacePlan(workspaceId);

    if (!hasProFeatureAccess(effectivePlan)) {
      return NextResponse.json(
        {
          error:
            effectivePlan === "free"
              ? PRO_FEATURE_TRIAL_EXPIRED_MESSAGE
              : PRO_FEATURE_DENIED_MESSAGE,
          proRequired: true,
        },
        { status: 403 }
      );
    }

    const workspace = await prisma.workspace.findUnique({
      where: { id: workspaceId },
      select: { name: true },
    });

    const host = await prisma.profile.findUnique({
      where: { id: hostId },
      select: { officeBranch: true, wid: true },
    });

    if (!host || host.wid !== workspaceId) {
      return NextResponse.json({ error: "Host not found in workspace" }, { status: 404 });
    }

    const branchName =
      (typeof officeBranch === "string" && officeBranch.trim()) ||
      host.officeBranch ||
      "Main Office";

    const existing = await prisma.publicRegistrationLink.findUnique({
      where: { wid_hostId: { wid: workspaceId, hostId } },
      select: { id: true, slug: true },
    });

    const slugInput = existing
      ? existing.slug
      : buildSlugBase(workspace?.name ?? "workspace", branchName);

    const theme = REGISTRATION_DESIGN_THEME_IDS.includes(
      String(designTheme) as (typeof REGISTRATION_DESIGN_THEME_IDS)[number]
    )
      ? String(designTheme)
      : "classic";

    const fieldConfig = parseFieldConfig(body);

    let slug = slugInput;
    if (!existing) {
      if (!isValidSlug(slug)) {
        slug = await generateUniqueSlug(
          buildSlugBase(workspace?.name ?? "workspace", branchName)
        );
      } else {
        const slugOwner = await prisma.publicRegistrationLink.findUnique({
          where: { slug },
          select: { id: true },
        });
        if (slugOwner) {
          slug = await generateUniqueSlug(slugInput);
        }
      }
    }

    const data = {
      slug,
      officeBranch: branchName,
      enabled: Boolean(enabled),
      designTheme: theme,
      pageTitle: typeof pageTitle === "string" ? pageTitle : null,
      welcomeMessage: typeof welcomeMessage === "string" ? welcomeMessage : null,
      qrValidityPeriod: typeof qrValidityPeriod === "string" ? qrValidityPeriod : "24h",
      ...fieldConfig,
    };

    const link = existing
      ? await prisma.publicRegistrationLink.update({
          where: { id: existing.id },
          data,
          select: LINK_SELECT,
        })
      : await prisma.publicRegistrationLink.create({
          data: {
            wid: workspaceId,
            hostId,
            ...data,
          },
          select: LINK_SELECT,
        });

    return NextResponse.json({ link }, { status: existing ? 200 : 201 });
  } catch (err) {
    console.error("[POST /api/registration-links]", err);
    return NextResponse.json(
      { error: "Failed to save registration link" },
      { status: 500 }
    );
  }
}
