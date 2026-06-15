import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Profile select definition including wid
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
  wid: true,
} as const;

// ─── GET /api/profiles/[id] ───────────────────────────────────────────
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const profile = await prisma.profile.findUnique({
      where: { id },
      select: PROFILE_SELECT,
    });

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    // Map phoneNumber to phone for frontend store compatibility
    const mappedProfile = {
      ...profile,
      phone: profile.phoneNumber || undefined,
    };

    return NextResponse.json({ profile: mappedProfile }, { status: 200 });
  } catch (err) {
    console.error("[GET /api/profiles/[id]]", err);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

// ─── PATCH /api/profiles/[id] ─────────────────────────────────────────
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const {
      name,
      email,
      role,
      department,
      designation,
      officeBranch,
      workLocation,
      phone,
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
      status,
    } = body;

    const avatarInitials = name
      ? (name as string)
          .split(" ")
          .map((n: string) => n[0] ?? "")
          .join("")
          .toUpperCase()
          .substring(0, 2)
      : undefined;

    // Build sanitised payload containing only valid schema keys
    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (avatarInitials !== undefined) updateData.avatarInitials = avatarInitials;
    if (email !== undefined) updateData.email = email;
    if (role !== undefined) updateData.role = role;
    if (department !== undefined) updateData.department = department;
    if (designation !== undefined) updateData.designation = designation;
    if (officeBranch !== undefined) updateData.officeBranch = officeBranch;
    if (workLocation !== undefined) updateData.workLocation = workLocation;
    
    // Map either phone or phoneNumber to database phoneNumber field
    if (phone !== undefined) updateData.phoneNumber = phone;
    else if (phoneNumber !== undefined) updateData.phoneNumber = phoneNumber;

    if (personalEmail !== undefined) updateData.personalEmail = personalEmail;
    if (bloodGroup !== undefined) updateData.bloodGroup = bloodGroup;
    if (dob !== undefined) updateData.dob = dob;
    if (code !== undefined) updateData.code = code;
    if (joiningDate !== undefined) updateData.joiningDate = joiningDate;
    if (reportingManager !== undefined) updateData.reportingManager = reportingManager;
    if (reportingHR !== undefined) updateData.reportingHR = reportingHR;
    if (emergencyName !== undefined) updateData.emergencyName = emergencyName;
    if (emergencyPhone !== undefined) updateData.emergencyPhone = emergencyPhone;
    if (status !== undefined) updateData.status = status;

    const updatedProfile = await prisma.profile.update({
      where: { id },
      data: updateData,
    });

    const profile = {
      ...updatedProfile,
      phone: updatedProfile.phoneNumber || undefined,
    };

    return NextResponse.json({ profile }, { status: 200 });
  } catch (err) {
    console.error("[PATCH /api/profiles/[id]]", err);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}

// ─── DELETE /api/profiles/[id] ────────────────────────────────────────
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.profile.delete({ where: { id } });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[DELETE /api/profiles/[id]]", err);
    return NextResponse.json({ error: "Failed to delete profile" }, { status: 500 });
  }
}
