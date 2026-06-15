export type QrValidityPeriod = "24h" | "7d" | "30d" | "90d";

export const QR_VALIDITY_OPTIONS: {
  value: QrValidityPeriod;
  label: string;
  description: string;
}[] = [
  { value: "24h", label: "24 Hours", description: "Single-day visit" },
  { value: "7d", label: "1 Week", description: "Re-use pass for 7 days" },
  { value: "30d", label: "30 Days", description: "Re-use pass for 30 days" },
  { value: "90d", label: "90 Days", description: "Re-use pass for 90 days" },
];

export function computeQrValidUntil(
  period: QrValidityPeriod,
  from: Date = new Date()
): Date {
  const d = new Date(from);
  switch (period) {
    case "24h":
      d.setHours(d.getHours() + 24);
      break;
    case "7d":
      d.setDate(d.getDate() + 7);
      break;
    case "30d":
      d.setDate(d.getDate() + 30);
      break;
    case "90d":
      d.setDate(d.getDate() + 90);
      break;
  }
  return d;
}

export function isQrValid(qrValidUntil?: string | Date | null): boolean {
  if (!qrValidUntil) return true;
  return new Date(qrValidUntil) > new Date();
}

export function formatQrValidUntil(qrValidUntil?: string | Date | null): string {
  if (!qrValidUntil) return "No expiry";
  return new Date(qrValidUntil).toLocaleDateString([], {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
