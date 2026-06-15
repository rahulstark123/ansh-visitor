import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ─── PATCH /api/visitors/[id]/check-out ──────────────────────────────
// Marks the visitor as CheckedOut and records the timestamp.
export async function PATCH(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const existing = await prisma.visitor.findUnique({
      where: { id },
      select: { status: true },
    });

    if (!existing) {
      return NextResponse.json({ error: "Visitor not found" }, { status: 404 });
    }

    if (existing.status !== "CheckedIn") {
      return NextResponse.json(
        { error: "Guest is not checked in" },
        { status: 400 }
      );
    }

    const visitor = await prisma.visitor.update({
      where: { id },
      data: {
        status: "CheckedOut",
        checkedOutAt: new Date(),
      },
      select: {
        id: true,
        status: true,
        checkedOutAt: true,
      },
    });

    return NextResponse.json({ visitor }, { status: 200 });
  } catch (err) {
    console.error("[PATCH /api/visitors/[id]/check-out]", err);
    return NextResponse.json({ error: "Failed to check out visitor" }, { status: 500 });
  }
}
