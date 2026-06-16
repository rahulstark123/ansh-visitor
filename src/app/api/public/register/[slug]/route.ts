import { NextRequest, NextResponse } from "next/server";
import { createVisitorRecord, PUBLIC_LINK_SELECT } from "@/lib/create-visitor";
import {
  fieldConfigFromLink,
  validateRegistrationPayload,
} from "@/lib/registration-link-fields";
import {
  PRO_FEATURE_TRIAL_EXPIRED_MESSAGE,
  workspaceHasProFeatureAccess,
} from "@/lib/plan-access";
import { prisma } from "@/lib/prisma";

type RouteContext = { params: Promise<{ slug: string }> };

// GET /api/public/register/[slug]
export async function GET(_req: NextRequest, context: RouteContext) {
  try {
    const { slug } = await context.params;

    const link = await prisma.publicRegistrationLink.findUnique({
      where: { slug },
      select: PUBLIC_LINK_SELECT,
    });

    if (!link || !link.enabled) {
      return NextResponse.json({ error: "Registration link not found" }, { status: 404 });
    }

    if (
      !workspaceHasProFeatureAccess(
        link.workspace.plan,
        link.workspace.createdAt
      )
    ) {
      return NextResponse.json(
        { error: PRO_FEATURE_TRIAL_EXPIRED_MESSAGE },
        { status: 403 }
      );
    }

    const employees = await prisma.profile.findMany({
      where: { wid: link.wid, status: "Active" },
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json(
      {
        link: {
          slug: link.slug,
          designTheme: link.designTheme,
          pageTitle: link.pageTitle,
          welcomeMessage: link.welcomeMessage,
          officeBranch: link.officeBranch,
          qrValidityPeriod: link.qrValidityPeriod,
          fieldConfig: fieldConfigFromLink(link),
          hostName: link.host.name,
          hostDepartment: link.host.department,
          workspaceName: link.workspace.name ?? "Workspace",
          employees: employees.map((profile) => ({
            id: profile.id,
            name: profile.name,
            email: profile.email,
            phone: profile.phoneNumber || undefined,
          })),
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("[GET /api/public/register/[slug]]", err);
    return NextResponse.json(
      { error: "Failed to load registration page" },
      { status: 500 }
    );
  }
}

// POST /api/public/register/[slug]
export async function POST(req: NextRequest, context: RouteContext) {
  try {
    const { slug } = await context.params;
    const body = await req.json();

    const link = await prisma.publicRegistrationLink.findUnique({
      where: { slug },
      select: {
        ...PUBLIC_LINK_SELECT,
        host: { select: { id: true, name: true } },
      },
    });

    if (!link || !link.enabled) {
      return NextResponse.json({ error: "Registration link not found" }, { status: 404 });
    }

    if (
      !workspaceHasProFeatureAccess(
        link.workspace.plan,
        link.workspace.createdAt
      )
    ) {
      return NextResponse.json(
        { error: PRO_FEATURE_TRIAL_EXPIRED_MESSAGE },
        { status: 403 }
      );
    }

    const fieldConfig = fieldConfigFromLink(link);
    const validationError = validateRegistrationPayload(body, fieldConfig);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const visitor = await createVisitorRecord({
      name: body.name ?? "",
      email: body.email,
      phone: body.phone,
      company: body.company,
      purpose: body.purpose,
      notes: body.notes,
      idProofType: body.idProofType,
      idProofNumber: body.idProofNumber,
      hostId: link.host.id,
      hostName: link.host.name,
      wid: link.wid,
      walkIn: false,
      qrValidityPeriod: link.qrValidityPeriod,
    });

    return NextResponse.json(
      {
        success: true,
        visitor: {
          id: visitor.id,
          name: visitor.name,
          email: visitor.email,
          phone: visitor.phone,
          company: visitor.company,
          purpose: visitor.purpose,
          qrCode: visitor.qrCode,
          qrValidUntil: visitor.qrValidUntil,
          hostName: visitor.hostName,
        },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[POST /api/public/register/[slug]]", err);
    return NextResponse.json(
      { error: "Failed to submit pre-registration" },
      { status: 500 }
    );
  }
}
