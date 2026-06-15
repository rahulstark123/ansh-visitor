import { NextRequest, NextResponse } from "next/server";
import { createVisitorRecord, VISITOR_SELECT } from "@/lib/create-visitor";
import { prisma } from "@/lib/prisma";

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

    if (!hostId || !hostName) {
      return NextResponse.json(
        { error: "Missing required fields: hostId, hostName" },
        { status: 400 }
      );
    }

    const hasIdentity =
      Boolean(name?.trim()) ||
      Boolean(phone?.trim()) ||
      Boolean(email?.trim());

    if (!hasIdentity) {
      return NextResponse.json(
        { error: "Provide at least guest name, phone, or email" },
        { status: 400 }
      );
    }

    const visitor = await createVisitorRecord({
      name: name ?? "",
      email,
      phone,
      company,
      purpose,
      hostId,
      hostName,
      notes,
      idProofType,
      idProofNumber,
      wid,
      walkIn,
      qrValidityPeriod,
    });

    return NextResponse.json({ visitor }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/visitors]", err);
    return NextResponse.json({ error: "Failed to create visitor" }, { status: 500 });
  }
}
