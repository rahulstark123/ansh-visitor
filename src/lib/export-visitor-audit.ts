import * as XLSX from "xlsx";
import type { Visitor } from "@/stores/visitor-store";
import {
  formatVisitDuration,
  getReportPeriodLabel,
  getVisitorReportDate,
  type ReportTimePeriod,
} from "@/lib/report-time-filters";

function formatDateTime(value?: string): string {
  if (!value) return "";
  return new Date(value).toLocaleString([], {
    dateStyle: "short",
    timeStyle: "short",
  });
}

function slugifyPeriod(period: ReportTimePeriod): string {
  return period.replace(/_/g, "-");
}

export function exportVisitorsAuditToExcel(
  visitors: Visitor[],
  period: ReportTimePeriod
): void {
  const periodLabel = getReportPeriodLabel(period);

  const rows = visitors.map((v) => ({
    "Guest Name": v.name,
    Email: v.email,
    Phone: v.phone,
    Company: v.company || "Individual",
    Purpose: v.purpose,
    "Registration Type": v.walkIn ? "Walk-in" : "Pre-registered",
    Status: v.status,
    Host: v.hostName,
    "Passcode / QR": v.qrCode || "",
    Badge: v.badgeNumber || "",
    "ID Proof Type": v.idProofType || "",
    "ID Proof Number": v.idProofNumber || "",
    "Pre-registered At": formatDateTime(v.preRegisteredAt),
    "Check-In": formatDateTime(v.checkedInAt),
    "Check-Out": formatDateTime(v.checkedOutAt),
    Duration: formatVisitDuration(v.checkedInAt, v.checkedOutAt),
    "Activity Date": formatDateTime(getVisitorReportDate(v).toISOString()),
    Notes: v.notes || "",
  }));

  const worksheet =
    rows.length > 0
      ? XLSX.utils.json_to_sheet(rows)
      : XLSX.utils.aoa_to_sheet([
          [
            "Guest Name",
            "Email",
            "Phone",
            "Company",
            "Purpose",
            "Registration Type",
            "Status",
            "Host",
            "Passcode / QR",
            "Badge",
            "ID Proof Type",
            "ID Proof Number",
            "Pre-registered At",
            "Check-In",
            "Check-Out",
            "Duration",
            "Activity Date",
            "Notes",
          ],
        ]);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Visitor Audit Log");

  const meta = XLSX.utils.aoa_to_sheet([
    ["ANSH Visitor — Audit Log Export"],
    ["Time Period", periodLabel],
    ["Exported At", new Date().toLocaleString()],
    ["Total Records", String(visitors.length)],
  ]);
  XLSX.utils.book_append_sheet(workbook, meta, "Export Info");

  const filename = `ansh_visitor_audit_log_${slugifyPeriod(period)}_${new Date()
    .toISOString()
    .slice(0, 10)}.xlsx`;

  XLSX.writeFile(workbook, filename);
}
