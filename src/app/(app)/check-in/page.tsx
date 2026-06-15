"use client";

import { useState } from "react";
import { useVisitorStore, Visitor } from "@/stores/visitor-store";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { PageHeader } from "@/components/crm/page-header";
import { QrCode, Scan, ShieldCheck, Loader2, Sparkles } from "lucide-react";
import Link from "next/link";

export default function CheckInKioskPage() {
  const { visitors, checkInVisitor } = useVisitorStore();
  const expectedVisitors = visitors.filter((v) => v.status === "Expected");

  const [selectedVisitorId, setSelectedVisitorId] = useState("");
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<Visitor | null>(null);

  const handleSimulateScan = () => {
    if (!selectedVisitorId) return;

    setScanning(true);
    setScanResult(null);

    // Simulate scanning delay
    setTimeout(() => {
      const visitor = visitors.find((v) => v.id === selectedVisitorId);
      if (visitor) {
        checkInVisitor(visitor.id);
        setScanResult(visitor);
      }
      setScanning(false);
    }, 1500);
  };

  return (
    <div className="space-y-8 select-none animate-in fade-in duration-300">
      <title>Lobby QR Kiosk | Ansh Visitor</title>
      <PageHeader
        eyebrow="Reception Kiosk"
        title="Lobby QR Scanner"
        description="Simulate scanning guest invite QR passes for automated entrance check-in."
      />

      <div className="grid gap-8 lg:grid-cols-5">
        {/* SCANNER VIEWPORT */}
        <Card className="crm-card lg:col-span-3 overflow-hidden">
          <CardHeader className="border-b border-border/40 pb-4 bg-slate-50/50 dark:bg-slate-900/40">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Lobby Scanner Camera (Simulated)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-8 flex flex-col items-center">
            {/* Camera Viewport Border Box */}
            <div className="relative h-64 w-64 rounded-3xl border-4 border-slate-200 bg-slate-950 flex flex-col items-center justify-center overflow-hidden dark:border-slate-800 shadow-inner group">
              {/* Scan Laser Anim */}
              {scanning && (
                <div className="absolute inset-x-0 h-1 bg-emerald-500 shadow-[0_0_15px_#10b981] top-0 animate-[float_1.5s_ease-in-out_infinite]" />
              )}

              {/* Viewport Bracket Corners */}
              <div className="absolute top-4 left-4 h-6 w-6 border-t-2 border-l-2 border-emerald-500 rounded-tl-md" />
              <div className="absolute top-4 right-4 h-6 w-6 border-t-2 border-r-2 border-emerald-500 rounded-tr-md" />
              <div className="absolute bottom-4 left-4 h-6 w-6 border-b-2 border-l-2 border-emerald-500 rounded-bl-md" />
              <div className="absolute bottom-4 right-4 h-6 w-6 border-b-2 border-r-2 border-emerald-500 rounded-br-md" />

              {scanning ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="h-10 w-10 animate-spin text-emerald-500" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 animate-pulse">
                    Reading QR Code...
                  </span>
                </div>
              ) : scanResult ? (
                <div className="flex flex-col items-center text-center p-4 gap-2 animate-in zoom-in-95 duration-200">
                  <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20 mb-2">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">
                    ACCESS APPROVED
                  </span>
                  <h4 className="text-white font-bold text-sm">
                    {scanResult.name}
                  </h4>
                  <span className="text-[9px] text-slate-500">
                    Badge Issued · Host Notified
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <QrCode className="h-14 w-14 text-slate-700 dark:text-slate-600 transition-transform group-hover:scale-105" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    Awaiting QR Pass
                  </span>
                </div>
              )}
            </div>

            {/* Scan Simulation Controls */}
            <div className="mt-8 w-full max-w-sm space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                  Select Pre-registered Guest to Scan
                </label>
                {expectedVisitors.length > 0 ? (
                  <Select
                    value={selectedVisitorId}
                    onChange={(e) => {
                      setSelectedVisitorId(e.target.value);
                      setScanResult(null);
                    }}
                  >
                    <option value="">-- Choose Expected Visitor --</option>
                    {expectedVisitors.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.name} (Passcode: {v.qrCode})
                      </option>
                    ))}
                  </Select>
                ) : (
                  <p className="text-xs text-slate-400 italic py-2">
                    No expected visitors scheduled. Pre-register a guest first.
                  </p>
                )}
              </div>

              <Button
                disabled={!selectedVisitorId || scanning}
                onClick={handleSimulateScan}
                className="w-full btn-primary border-0 gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {scanning ? "Processing..." : "Simulate QR Scan"}
              </Button>

              <div className="text-center pt-2">
                <Link
                  href="/check-in/manual"
                  className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
                >
                  No QR Code? Register Manually
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* DETAILS SIDEBAR */}
        <Card className="crm-card lg:col-span-2">
          <CardHeader className="border-b border-border/40 pb-4">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Scan Logs Info
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {scanResult ? (
              <div className="space-y-5 animate-in fade-in duration-300">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-bold text-sm">
                    {scanResult.name.substring(0,2).toUpperCase()}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                      {scanResult.name}
                    </h4>
                    <span className="text-[10px] text-slate-400">
                      Pre-registered QR code checked
                    </span>
                  </div>
                </div>

                <div className="divide-y divide-border/40 text-xs space-y-3">
                  <div className="flex justify-between pt-3">
                    <span className="text-slate-400">Company</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{scanResult.company || "Individual"}</span>
                  </div>
                  <div className="flex justify-between pt-3">
                    <span className="text-slate-400">Phone</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{scanResult.phone}</span>
                  </div>
                  <div className="flex justify-between pt-3">
                    <span className="text-slate-400">Visit Purpose</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{scanResult.purpose}</span>
                  </div>
                  <div className="flex justify-between pt-3">
                    <span className="text-slate-400">Host Contacted</span>
                    <span className="font-bold text-emerald-500">{scanResult.hostName}</span>
                  </div>
                  <div className="flex justify-between pt-3">
                    <span className="text-slate-400">Badge Code Assigned</span>
                    <span className="font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-bold text-slate-800 dark:text-slate-250">
                      {scanResult.badgeNumber}
                    </span>
                  </div>
                </div>

                <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-4 flex gap-2">
                  <Sparkles className="h-5 w-5 text-emerald-500 shrink-0" />
                  <p className="text-[11px] leading-normal text-emerald-600 dark:text-emerald-450 font-medium">
                    Host notification has been fired! A WhatsApp and Slack alert has been dispatched to <strong>{scanResult.hostName}</strong>.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-16 text-slate-400 space-y-2">
                <Scan className="h-10 w-10 text-slate-350 dark:text-slate-700 mx-auto" />
                <p className="text-xs italic">
                  Select a guest and trigger a simulated scan to verify security pass outputs.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
