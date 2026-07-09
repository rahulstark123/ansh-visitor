import { NextResponse } from "next/server";
import {
  createAdminSessionToken,
  validateAdminCredentials,
  type AdminCredentials,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AdminCredentials;

    if (!validateAdminCredentials(body)) {
      return NextResponse.json({ error: "Invalid admin credentials" }, { status: 401 });
    }

    return NextResponse.json({ token: createAdminSessionToken() });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
