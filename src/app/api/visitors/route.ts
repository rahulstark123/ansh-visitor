import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ─── Visitor field selector (reuse to avoid over-fetching) ───────────
const VISITOR_SELECT = {
  id: true,
  name: true,
  email: true,
  phone: true,
  company: true,
  purpose: true,
  status: true,
  hostId: true,
  hostName: true,
  checkedInAt: true,
  checkedOutAt: true,
  preRegisteredAt: true,
  idProofType: true,
  idProofNumber: true,
  badgeNumber: true,
  qrCode: true,
  notes: true,
  wid: true,
} as const;

// ─── GET /api/visitors?wid=1&status=Expected ─────────────────────────
// Uses compound index (wid, status) when status filter is provided.
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const wid = Number(searchParams.get("wid") ?? 1);
    const status = searchParams.get("status");

    const visitors = await prisma.visitor.findMany({
      where: {
        wid,
        ...(status && status !== "all" ? { status } : {}),
      },
      select: VISITOR_SELECT,
      orderBy: { preRegisteredAt: "desc" },
    });

    return NextResponse.json({ visitors }, { status: 200 });
  } catch (err) {
    console.error("[GET /api/visitors]", err);
    return NextResponse.json({ error: "Failed to fetch visitors" }, { status: 500 });
  }
}

// ─── POST /api/visitors ───────────────────────────────────────────────
// Creates a pre-registered visitor (Expected) or walk-in (CheckedIn).
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      company,
      purpose,
      hostId,
      hostName,
      notes,
      idProofType,
      idProofNumber,
      wid = 1,
      walkIn = false,
    } = body;

    if (!name || !email || !phone || !hostId || !hostName) {
      return NextResponse.json({ error: "Missing required fields: name, email, phone, hostId, hostName" }, { status: 400 });
    }

    const qrCode = Math.floor(100000 + Math.random() * 900000).toString();
    const badgeNumber = walkIn
      ? `BADGE-${Math.floor(100 + Math.random() * 900)}`
      : undefined;

    const visitor = await prisma.visitor.create({
      data: {
        name,
        email,
        phone,
        company: company || undefined,
        purpose,
        hostId,
        hostName,
        notes: notes || undefined,
        idProofType: idProofType || undefined,
        idProofNumber: idProofNumber || undefined,
        wid,
        status: walkIn ? "CheckedIn" : "Expected",
        qrCode,
        badgeNumber,
        checkedInAt: walkIn ? new Date() : undefined,
      },
      select: VISITOR_SELECT,
    });

    return NextResponse.json({ visitor }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/visitors]", err);
    return NextResponse.json({ error: "Failed to create visitor" }, { status: 500 });
  }
}
