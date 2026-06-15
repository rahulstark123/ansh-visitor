import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ─── GET /api/workspace?wid=1 ────────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const wid = Number(searchParams.get("wid") ?? 1);

    const workspace = await prisma.workspace.findUnique({
      where: { id: wid },
      select: { id: true, name: true, plan: true, createdAt: true },
    });

    if (!workspace) {
      return NextResponse.json({ error: "Workspace not found" }, { status: 404 });
    }

    return NextResponse.json({ workspace }, { status: 200 });
  } catch (err) {
    console.error("[GET /api/workspace]", err);
    return NextResponse.json({ error: "Failed to fetch workspace" }, { status: 500 });
  }
}

// ─── POST /api/workspace ─────────────────────────────────────────────
// Creates the initial workspace (called once on first boot / onboarding).
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { name = "My Workspace", plan = "free" } = body as {
      name?: string;
      plan?: string;
    };

    // upsert id=1 so we always have a default workspace
    const workspace = await prisma.workspace.upsert({
      where: { id: 1 },
      create: { id: 1, name, plan },
      update: { name, plan },
      select: { id: true, name: true, plan: true, createdAt: true },
    });

    // Also ensure the WorkspaceConfig row exists
    await prisma.workspaceConfig.upsert({
      where: { wid: workspace.id },
      create: { wid: workspace.id },
      update: {},
    });

    return NextResponse.json({ workspace }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/workspace]", err);
    return NextResponse.json({ error: "Failed to create workspace" }, { status: 500 });
  }
}
