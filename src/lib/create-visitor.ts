import { prisma } from "@/lib/prisma";
import {
  computeQrValidUntil,
  type QrValidityPeriod,
} from "@/lib/qr-validity";

export const VISITOR_SELECT = {
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

async function generateUniqueQRCode(wid: number): Promise<string> {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  while (true) {
    let qrCode = "";
    for (let i = 0; i < 6; i++) {
      qrCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    const existing = await prisma.visitor.findFirst({
      where: { wid, qrCode },
      select: { id: true },
    });

    if (!existing) return qrCode;
  }
}

export interface CreateVisitorInput {
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  purpose?: string;
  hostId: string;
  hostName: string;
  notes?: string;
  idProofType?: string;
  idProofNumber?: string;
  wid?: number;
  walkIn?: boolean;
  qrValidityPeriod?: QrValidityPeriod | string;
}

export async function createVisitorRecord(input: CreateVisitorInput) {
  const wid = input.wid ?? 1;
  const walkIn = input.walkIn ?? false;
  const validPeriods: QrValidityPeriod[] = ["24h", "7d", "30d", "90d"];
  const period: QrValidityPeriod = validPeriods.includes(
    input.qrValidityPeriod as QrValidityPeriod
  )
    ? (input.qrValidityPeriod as QrValidityPeriod)
    : "24h";

  const qrCode = await generateUniqueQRCode(wid);
  const qrValidUntil = walkIn ? undefined : computeQrValidUntil(period);

  return prisma.visitor.create({
    data: {
      name: input.name.trim() || "Guest",
      email: input.email?.trim() || "",
      phone: input.phone?.trim() || "",
      company: input.company?.trim() || undefined,
      purpose: input.purpose?.trim() || "Meeting",
      hostId: input.hostId,
      hostName: input.hostName,
      notes: input.notes?.trim() || undefined,
      idProofType: input.idProofType?.trim() || undefined,
      idProofNumber: input.idProofNumber?.trim() || undefined,
      wid,
      status: walkIn ? "CheckedIn" : "Expected",
      qrCode,
      qrValidUntil,
      checkedInAt: walkIn ? new Date() : undefined,
      walkIn,
    },
    select: VISITOR_SELECT,
  });
}

export const PUBLIC_LINK_SELECT = {
  id: true,
  slug: true,
  wid: true,
  hostId: true,
  officeBranch: true,
  enabled: true,
  designTheme: true,
  pageTitle: true,
  welcomeMessage: true,
  qrValidityPeriod: true,
  fieldNameRequired: true,
  fieldPhoneRequired: true,
  fieldEmailRequired: true,
  fieldPurposeRequired: true,
  fieldIdProofRequired: true,
  fieldCompanyEnabled: true,
  fieldCompanyRequired: true,
  fieldNotesEnabled: true,
  fieldNotesRequired: true,
  host: {
    select: {
      id: true,
      name: true,
      department: true,
      officeBranch: true,
    },
  },
  workspace: {
    select: {
      id: true,
      name: true,
      plan: true,
      createdAt: true,
    },
  },
} as const;
