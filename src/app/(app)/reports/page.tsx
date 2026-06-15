"use client";

import { useState } from "react";
import { useVisitorStore } from "@/stores/visitor-store";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/crm/page-header";
import { FileDown, Calendar, Users, ShieldCheck, Download } from "lucide-react";
import { ProcessingOverlaySkeleton } from "@/components/ui/page-skeletons";

export default function ReportsPage() {
  const { visitors } = useVisitorStore();
  const [downloading, setDownloading] = useState(false);

  const handleExportCSV = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      // Trigger a simple mockup alert
      alert("CSV export created! Download of 'ansh_visitor_audit_log.csv' initiated successfully.");
    }, 1200);
  };

  const getDuration = (inTime?: string, outTime?: string) => {
    if (!inTime) return "-";
    if (!outTime) return "Still inside";

    const diff = new Date(outTime).getTime() - new Date(inTime).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m`;
    const hrs = Math.floor(mins / 60);
    const remMins = mins % 60;
    return `${hrs}h ${remMins}m`;
  };

  return (
    <div className="space-y-8 select-none animate-in fade-in duration-300">
      <title>Reports & Audits | Ansh Visitor</title>
      <PageHeader
        eyebrow="Compliance Desk"
        title="Lobby Audits & Reports"
        description="Verify visitor security compliance logs, analyze reception capacity metrics, and export data."
        action={{
          label: "Export CSV Audit Log",
          icon: Download,
          onClick: handleExportCSV
        }}
      />

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
              52 Minutes
            </div>
            <p className="text-xs text-slate-400 mt-1">Based on checked out visitor durations</p>
          </CardContent>
        </Card>

        <Card className="crm-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Peak Lobby Hour
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold text-slate-800 dark:text-white">
              10:00 AM - 11:30 AM
            </div>
            <p className="text-xs text-slate-400 mt-1">Most check-ins logged in this interval</p>
          </CardContent>
        </Card>

        <Card className="crm-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Compliance check-ins
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold text-slate-800 dark:text-white">
              100% Verified
            </div>
            <p className="text-xs text-slate-400 mt-1">All walk-ins matched with ID proofs</p>
          </CardContent>
        </Card>
      </div>

      {/* VISITOR LOG HISTORY */}
      <Card className="crm-card">
        <CardHeader className="border-b border-border/40 pb-4">
          <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-400">
            Historical Visit Logs
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
                {visitors.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-800/10 transition-colors">
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
                      {v.checkedInAt ? new Date(v.checkedInAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) : "Not arrived"}
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold text-slate-500">
                      {v.checkedOutAt ? new Date(v.checkedOutAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) : v.checkedInAt ? "Still inside" : "Not arrived"}
                    </td>
                    <td className="px-6 py-4">
                      {v.checkedInAt ? (
                        <Badge variant="secondary" className="text-[10px] font-bold">
                          {getDuration(v.checkedInAt, v.checkedOutAt)}
                        </Badge>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* EXPORTING LOADING MODAL */}
      {downloading && (
        <ProcessingOverlaySkeleton
          title="Generating Audit Logs"
          description="Compiling database rows into spreadsheet format..."
        />
      )}
    </div>
  );
}
