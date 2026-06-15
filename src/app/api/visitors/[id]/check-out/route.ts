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
