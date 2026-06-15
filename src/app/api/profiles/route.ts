import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ─── Profile field selector ───────────────────────────────────────────
const PROFILE_SELECT = {
  id: true,
  name: true,
  email: true,
  role: true,
  department: true,
  designation: true,
  officeBranch: true,
  workLocation: true,
  avatarInitials: true,
  status: true,
  phoneNumber: true,
  personalEmail: true,
  bloodGroup: true,
  dob: true,
  code: true,
  joiningDate: true,
  reportingManager: true,
  reportingHR: true,
  emergencyName: true,
  emergencyPhone: true,
  createdAt: true,
  wid: true,
} as const;

// ─── GET /api/profiles?wid=1 ─────────────────────────────────────────
// Uses index on wid — fast workspace-scoped team list.
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const wid = Number(searchParams.get("wid") ?? 1);

    const profiles = await prisma.profile.findMany({
      where: { wid },
      select: PROFILE_SELECT,
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json({ profiles }, { status: 200 });
  } catch (err) {
    console.error("[GET /api/profiles]", err);
    return NextResponse.json({ error: "Failed to fetch profiles" }, { status: 500 });
  }
}

// ─── POST /api/profiles ───────────────────────────────────────────────
// Adds a new team member. `id` can be supplied (Supabase auth UUID)
// or will be auto-generated.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      id,
      name,
      email,
      role,
      department,
      designation,
      officeBranch,
      workLocation,
      phoneNumber,
      personalEmail,
      bloodGroup,
      dob,
      code,
      joiningDate,
      reportingManager,
      reportingHR,
      emergencyName,
      emergencyPhone,
      wid = 1,
    } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Missing required fields: name, email" },
        { status: 400 }
      );
    }

    const avatarInitials = name
      .split(" ")
      .map((n: string) => n[0] ?? "")
      .join("")
      .toUpperCase()
      .substring(0, 2);

    const profile = await prisma.profile.create({
      data: {
        id: id ?? `profile-${Date.now()}`,
        name,
        email,
        role: role ?? "Employee",
        department: department ?? "General",
        designation,
        officeBranch,
        workLocation,
        phoneNumber,
        personalEmail,
        bloodGroup,
        dob,
        code,
        joiningDate,
        reportingManager,
        reportingHR,
        emergencyName,
        emergencyPhone,
        avatarInitials,
        wid,
      },
      select: PROFILE_SELECT,
    });

    return NextResponse.json({ profile }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/profiles]", err);
    return NextResponse.json({ error: "Failed to create profile" }, { status: 500 });
  }
}
