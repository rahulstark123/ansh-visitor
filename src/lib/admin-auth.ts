import { createHmac, timingSafeEqual } from "crypto";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "visitor@anshapps.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "Rahul@123";
const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE ?? "Khushi@Simran";
const ADMIN_PIN = process.env.ADMIN_PIN ?? "30042026";
const SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET ?? "visitor-admin-session-secret";

export type AdminCredentials = {
  email: string;
  password: string;
  passcode: string;
  pin: string;
};

export function validateAdminCredentials(credentials: AdminCredentials): boolean {
  return (
    credentials.email.trim() === ADMIN_EMAIL &&
    credentials.password === ADMIN_PASSWORD &&
    credentials.passcode === ADMIN_PASSCODE &&
    credentials.pin === ADMIN_PIN
  );
}

export function createAdminSessionToken(): string {
  return createHmac("sha256", SESSION_SECRET).update("admin-session").digest("hex");
}

export function isValidAdminSessionToken(token: string | null | undefined): boolean {
  if (!token) return false;
  const expected = createAdminSessionToken();
  if (token.length !== expected.length) return false;
  try {
    return timingSafeEqual(Buffer.from(token), Buffer.from(expected));
  } catch {
    return false;
  }
}

export function getBearerToken(request: Request): string | null {
  const header = request.headers.get("authorization");
  if (!header?.startsWith("Bearer ")) return null;
  return header.slice(7).trim() || null;
}
