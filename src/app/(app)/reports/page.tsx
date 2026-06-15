"use client";

import { useMemo, useState } from "react";
import { useVisitorStore } from "@/stores/visitor-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { PageHeader } from "@/components/crm/page-header";
import { Download } from "lucide-react";
import { ProcessingOverlaySkeleton } from "@/components/ui/page-skeletons";
import { toast } from "@/components/ui/toast";
import {
  REPORT_TIME_PERIOD_OPTIONS,
  filterVisitorsByReportPeriod,
  formatVisitDuration,
  getAverageVisitMinutes,
  getReportPeriodLabel,
  type ReportTimePeriod,
} from "@/lib/report-time-filters";
import { exportVisitorsAuditToExcel } from "@/lib/export-visitor-audit";

export default function ReportsPage() {
  const { visitors } = useVisitorStore();
  const [timePeriod, setTimePeriod] = useState<ReportTimePeriod>("this_month");
  const [exporting, setExporting] = useState(false);

  const filteredVisitors = useMemo(
    () => filterVisitorsByReportPeriod(visitors, timePeriod),
    [visitors, timePeriod]
  );

  const avgMinutes = useMemo(
    () => getAverageVisitMinutes(filteredVisitors),
    [filteredVisitors]
  );

  const checkedInCount = useMemo(
    () =>
      filteredVisitors.filter(
        (v) => v.status === "CheckedIn" || v.status === "CheckedOut"
      ).length,
    [filteredVisitors]
  );

  const idVerifiedCount = useMemo(
    () => filteredVisitors.filter((v) => v.idProofType).length,
    [filteredVisitors]
  );

  const handleExportLogs = async () => {
    if (exporting) return;
    setExporting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 400));
      exportVisitorsAuditToExcel(filteredVisitors, timePeriod);
      toast.success(
        "Audit log exported",
        `${filteredVisitors.length} record${
          filteredVisitors.length === 1 ? "" : "s"
        } saved to Excel for ${getReportPeriodLabel(timePeriod).toLowerCase()}.`
      );
    } catch {
      toast.error("Export failed", "Could not generate the Excel file.");
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="space-y-8 select-none animate-in fade-in duration-300">
      <title>Reports & Audits | Ansh Visitor</title>
      <PageHeader
        eyebrow="Compliance Desk"
        title="Lobby Audits & Reports"
        description="Verify visitor security compliance logs, analyze reception capacity metrics, and export data."
        action={{
          label: "Export Logs",
          icon: Download,
          onClick: handleExportLogs,
        }}
      />

      {/* TIME FILTER */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="w-full sm:max-w-xs">
          <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Time Period
          </label>
          <Select
            value={timePeriod}
            onChange={(e) =>
              setTimePeriod(e.target.value as ReportTimePeriod)
            }
          >
            {REPORT_TIME_PERIOD_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
        </div>
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
          Showing{" "}
          <span className="text-slate-800 dark:text-slate-200">
            {filteredVisitors.length}
          </span>{" "}
          record{filteredVisitors.length === 1 ? "" : "s"} for{" "}
          <span className="text-slate-800 dark:text-slate-200">
            {getReportPeriodLabel(timePeriod)}
          </span>
        </p>
      </div>

      {/* ANALYTICS SUMMARY BOXES */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="crm-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Avg meeting duration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold text-slate-800 dark:text-white">
              {avgMinutes !== null ? `${avgMinutes} Minutes` : "—"}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Based on checked-out visits in this period
            </p>
          </CardContent>
        </Card>

        <Card className="crm-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Visits logged
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold text-slate-800 dark:text-white">
              {checkedInCount}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Guests who checked in during this period
            </p>
          </CardContent>
        </Card>

        <Card className="crm-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-400">
              ID verified entries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold text-slate-800 dark:text-white">
              {idVerifiedCount}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Visits with government ID proof on file
            </p>
          </CardContent>
        </Card>
      </div>

      {/* VISITOR LOG HISTORY */}
      <Card className="crm-card">
        <CardHeader className="border-b border-border/40 pb-4">
          <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-400">
            Historical Visit Logs — {getReportPeriodLabel(timePeriod)}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm text-slate-655 dark:text-slate-350">
              <thead className="border-b border-border bg-slate-50/50 dark:bg-slate-900/40 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-6 py-4">Guest</th>
                  <th className="px-6 py-4">Company</th>
                  <th className="px-6 py-4">Host Mapped</th>
                  <th className="px-6 py-4">Check-In</th>
                  <th className="px-6 py-4">Check-Out</th>
                  <th className="px-6 py-4">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {filteredVisitors.length > 0 ? (
                  filteredVisitors.map((v) => (
                    <tr
                      key={v.id}
                      className="hover:bg-slate-50/40 dark:hover:bg-slate-800/10 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <span className="block font-bold text-slate-900 dark:text-white">
                            {v.name}
                          </span>
                          <span className="block text-[10px] text-slate-450">
                            {v.email}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-200">
                        {v.company || "Individual"}
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-700 dark:text-slate-200">
                        {v.hostName}
                      </td>
                      <td className="px-6 py-4 text-xs font-semibold text-slate-500">
                        {v.checkedInAt
                          ? new Date(v.checkedInAt).toLocaleString([], {
                              dateStyle: "short",
                              timeStyle: "short",
                            })
                          : "Not arrived"}
                      </td>
                      <td className="px-6 py-4 text-xs font-semibold text-slate-500">
                        {v.checkedOutAt
                          ? new Date(v.checkedOutAt).toLocaleString([], {
                              dateStyle: "short",
                              timeStyle: "short",
                            })
                          : v.checkedInAt
                            ? "Still inside"
                            : "Not arrived"}
                      </td>
                      <td className="px-6 py-4">
                        {v.checkedInAt ? (
                          <Badge
                            variant="secondary"
                            className="text-[10px] font-bold"
                          >
                            {formatVisitDuration(
                              v.checkedInAt,
                              v.checkedOutAt
                            )}
                          </Badge>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-10 text-center text-slate-400 italic"
                    >
                      No visitor records found for{" "}
                      {getReportPeriodLabel(timePeriod).toLowerCase()}.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {exporting && (
        <ProcessingOverlaySkeleton
          title="Generating Audit Logs"
          description="Compiling filtered records into an Excel workbook..."
        />
      )}
    </div>
  );
}
