import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isQrValid } from "@/lib/qr-validity";

// ─── PATCH /api/visitors/[id]/check-in ───────────────────────────────
// Atomically updates status → CheckedIn, assigns badge, records ID proof.
// Supports re-check-in with the same QR while the pass is still valid.
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

    const existing = await prisma.visitor.findUnique({
      where: { id },
      select: { status: true, qrValidUntil: true },
    });

    if (!existing) {
      return NextResponse.json({ error: "Visitor not found" }, { status: 404 });
    }

    if (!isQrValid(existing.qrValidUntil)) {
      return NextResponse.json(
        { error: "This QR pass has expired" },
        { status: 410 }
      );
    }

    if (existing.status === "CheckedIn") {
      return NextResponse.json(
        { error: "Guest is already checked in" },
        { status: 409 }
      );
    }

    if (existing.status !== "Expected" && existing.status !== "CheckedOut") {
      return NextResponse.json(
        { error: "Guest cannot be checked in" },
        { status: 400 }
      );
    }

    const badgeNumber = `BADGE-${Math.floor(100 + Math.random() * 900)}`;

    const visitor = await prisma.visitor.update({
      where: { id },
      data: {
        status: "CheckedIn",
        checkedInAt: new Date(),
        checkedOutAt: null,
        badgeNumber,
        idProofType: idProofType || undefined,
        idProofNumber: idProofNumber || undefined,
      },
      select: {
        id: true,
        status: true,
        checkedInAt: true,
        checkedOutAt: true,
        badgeNumber: true,
        idProofType: true,
        idProofNumber: true,
      },
    });

    return NextResponse.json({ visitor }, { status: 200 });
  } catch (err) {
    console.error("[PATCH /api/visitors/[id]/check-in]", err);
    return NextResponse.json({ error: "Failed to check in visitor" }, { status: 500 });
  }
}
