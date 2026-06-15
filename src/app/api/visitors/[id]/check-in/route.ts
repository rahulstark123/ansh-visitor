import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ─── PATCH /api/visitors/[id]/check-in ───────────────────────────────
// Atomically updates status → CheckedIn, assigns badge, records ID proof.
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json().catch(() => ({}));
    const { idProofType, idProofNumber } = body as {
      idProofType?: string;
      idProofNumber?: string;
    };

    const badgeNumber = `BADGE-${Math.floor(100 + Math.random() * 900)}`;

    // Use $transaction to guarantee atomic update — if badge write fails,
    // the status change is also rolled back.
    const [visitor] = await prisma.$transaction([
      prisma.visitor.update({
        where: { id },
        data: {
          status: "CheckedIn",
          checkedInAt: new Date(),
          badgeNumber,
          idProofType: idProofType || undefined,
          idProofNumber: idProofNumber || undefined,
        },
        select: {
          id: true,
          status: true,
          checkedInAt: true,
          badgeNumber: true,
          idProofType: true,
          idProofNumber: true,
        },
      }),
    ]);

    return NextResponse.json({ visitor }, { status: 200 });
  } catch (err) {
    console.error("[PATCH /api/visitors/[id]/check-in]", err);
    return NextResponse.json({ error: "Failed to check in visitor" }, { status: 500 });
  }
}
