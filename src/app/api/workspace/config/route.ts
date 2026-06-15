import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ─── GET /api/workspace/config?wid=1 ────────────────────────────────
// Returns the workspace's option lists. Creates default config if
// it doesn't exist yet (upsert — safe to call on first boot).
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const wid = Number(searchParams.get("wid") ?? 1);

    const config = await prisma.workspaceConfig.upsert({
      where: { wid },
      create: { wid }, // will use schema @default values for arrays
      update: {},      // no-op if it already exists
      select: {
        departments: true,
        designations: true,
        officeBranches: true,
        workLocations: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ config }, { status: 200 });
  } catch (err) {
    console.error("[GET /api/workspace/config]", err);
    return NextResponse.json({ error: "Failed to fetch workspace config" }, { status: 500 });
  }
}

// ─── PATCH /api/workspace/config ─────────────────────────────────────
// Partial update — only provided arrays are overwritten.
// Body: { wid, departments?, designations?, officeBranches?, workLocations? }
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { wid = 1, departments, designations, officeBranches, workLocations } = body;

    const data: Record<string, string[]> = {};
    if (departments) data.departments = departments;
    if (designations) data.designations = designations;
    if (officeBranches) data.officeBranches = officeBranches;
    if (workLocations) data.workLocations = workLocations;

    const config = await prisma.workspaceConfig.upsert({
      where: { wid },
      create: { wid, ...data },
      update: data,
      select: {
        departments: true,
        designations: true,
        officeBranches: true,
        workLocations: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ config }, { status: 200 });
  } catch (err) {
    console.error("[PATCH /api/workspace/config]", err);
    return NextResponse.json({ error: "Failed to update workspace config" }, { status: 500 });
  }
}
