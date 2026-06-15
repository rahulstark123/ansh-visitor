import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ─── PATCH /api/profiles/[id] ─────────────────────────────────────────
// Partial update — only supplied fields are written. Auto-recomputes
// avatarInitials if name changes.
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { name, ...rest } = body;

    // Recompute initials only if name is being changed
    const avatarInitials = name
      ? (name as string)
          .split(" ")
          .map((n: string) => n[0] ?? "")
          .join("")
          .toUpperCase()
          .substring(0, 2)
      : undefined;

    const profile = await prisma.profile.update({
      where: { id },
      data: {
        ...(name ? { name, avatarInitials } : {}),
        ...rest,
      },
      select: {
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
      },
    });

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
