import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  computeQrValidUntil,
  type QrValidityPeriod,
} from "@/lib/qr-validity";

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
  qrValidUntil: true,
  walkIn: true,
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

// Generates a unique 6-digit uppercase alphanumeric code
async function generateUniqueQRCode(wid: number): Promise<string> {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let qrCode = "";
  let isUnique = false;

  while (!isUnique) {
    qrCode = "";
    for (let i = 0; i < 6; i++) {
      qrCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    // Check if this qrCode is already in use for the workspace
    const existing = await prisma.visitor.findFirst({
      where: {
        wid,
        qrCode,
      },
    });

    if (!existing) {
      isUnique = true;
    }
  }

  return qrCode;
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
      qrValidityPeriod = "24h",
    } = body;

    if (!name || !email || !phone || !hostId || !hostName) {
      return NextResponse.json({ error: "Missing required fields: name, email, phone, hostId, hostName" }, { status: 400 });
    }

    const qrCode = await generateUniqueQRCode(wid);
    const badgeNumber = walkIn
      ? `BADGE-${Math.floor(100 + Math.random() * 900)}`
      : undefined;

    const validPeriods: QrValidityPeriod[] = ["24h", "7d", "30d", "90d"];
    const period: QrValidityPeriod = validPeriods.includes(qrValidityPeriod)
      ? qrValidityPeriod
      : "24h";
    const qrValidUntil = walkIn ? undefined : computeQrValidUntil(period);

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
        qrValidUntil,
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
