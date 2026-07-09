export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://visitor.anshapps.com";

export const SITE_NAME = "ANSH Visitor";
export const COMPANY_NAME = "ANSH Apps";
export const COMPANY_URL = "https://anshapps.com";

export const DEFAULT_TITLE =
  "ANSH Visitor — Secure Lobby & Visitor Management for MSME Teams";

export const DEFAULT_DESCRIPTION =
  "ANSH Visitor is a modern visitor management system for offices, schools, and businesses. QR guest passes, desk check-in, ID verification, and visitor logs — free forever at visitor.anshapps.com.";

export const SEO_KEYWORDS = [
  "ANSH Visitor",
  "visitor management system",
  "lobby management software",
  "visitor check-in app",
  "QR visitor pass",
  "office visitor log",
  "MSME visitor management",
  "visitor.anshapps.com",
  "digital visitor register",
  "front desk visitor software",
  "India visitor management",
] as const;

export const GOOGLE_SITE_VERIFICATION = process.env.GOOGLE_SITE_VERIFICATION;

export const SUPPORT_EMAIL = "hello@anshapps.com";
