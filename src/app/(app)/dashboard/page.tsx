"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/crm/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useVisitorStore, Visitor } from "@/stores/visitor-store";
import {
  Users,
  Clock,
  LogOut,
  FolderSync,
  TrendingUp,
  UserCheck,
  CalendarCheck2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Loader2,
  Scan,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { visitors, checkOutVisitor, checkInVisitor, initialize, currentUser } = useVisitorStore();
  const [loading, setLoading] = useState(true);

  // Quick Scanner State
  const [openScanner, setOpenScanner] = useState(false);
  const [scanInput, setScanInput] = useState("");
  const [scannerSelectedVisitorId, setScannerSelectedVisitorId] = useState("");
  const [scannedVisitor, setScannedVisitor] = useState<Visitor | null>(null);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    const run = async () => {
      await initialize();
      setLoading(false);
    };
    run();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fast reset loop for success screens
  useEffect(() => {
    if (scannedVisitor) {
      const timer = setTimeout(() => {
        setScannedVisitor(null);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [scannedVisitor]);

  const handleQuickCheckIn = (visitorId: string) => {
    if (!visitorId) return;
    setScanning(true);
    setScannedVisitor(null);

    // High speed scan processing: 250ms delay
    setTimeout(() => {
      const visitor = visitors.find(v => v.id === visitorId);
      if (visitor) {
        checkInVisitor(visitor.id);
        setScannedVisitor({
          ...visitor,
          status: "CheckedIn",
          checkedInAt: new Date().toISOString(),
          badgeNumber: visitor.badgeNumber || `BADGE-${Math.floor(100 + Math.random() * 900)}`
        });
        setScanInput("");
        setScannerSelectedVisitorId("");
      }
      setScanning(false);
    }, 250);
  };

  const handleKeyPressScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scanInput.trim()) return;

    // Try finding expected visitor by QR code or Name
    const query = scanInput.trim().toLowerCase();
    const visitor = visitors.find(
      v =>
        v.status === "Expected" &&
        (v.qrCode?.toLowerCase() === query ||
          v.name.toLowerCase().includes(query) ||
          v.phone.includes(query))
    );

    if (visitor) {
      handleQuickCheckIn(visitor.id);
    } else {
      alert("No matching expected guest found. Please try again or select from the list.");
      setScanInput("");
    }
  };

  // Compute Stats
  const activeCheckedIn = visitors.filter(v => v.status === "CheckedIn");
  const expectedToday = visitors.filter(v => v.status === "Expected");
  const checkedOutToday = visitors.filter(v => v.status === "CheckedOut");
  const totalLogsCount = visitors.length;

  // Visit Purpose distributions
  const purposeTotals: Record<string, number> = {};
  visitors.forEach(v => {
    purposeTotals[v.purpose] = (purposeTotals[v.purpose] || 0) + 1;
  });

  const purposeColors: Record<string, string> = {
    Meeting: "#10b981", // Emerald
    Interview: "#0ea5e9", // Sapphire/Blue
    Vendor: "#f59e0b", // Amber
    Delivery: "#ec4899", // Pink
    Other: "#64748b", // Slate
  };

  const purposesData = Object.entries(purposeTotals).map(([name, value]) => ({
    name,
    value,
    color: purposeColors[name] || "#64748b",
  })).sort((a, b) => b.value - a.value);

  const totalVisitorsForChart = visitors.length || 1;

  // Monthly trends (mock visit counts per month)
  const monthlyVisitTotals: Record<string, number> = {
    "2026-01": 28,
    "2026-02": 35,
    "2026-03": 42,
    "2026-04": 38,
    "2026-05": 56,
    "2026-06": visitors.length + 48,
  };

  const last6Months = ["2026-01", "2026-02", "2026-03", "2026-04", "2026-05", "2026-06"];
  const trendData = last6Months.map(month => {
    const dateObj = new Date(month + "-02");
    const label = dateObj.toLocaleDateString("en-US", { month: "short" });
    return {
      month: label,
      count: monthlyVisitTotals[month] || 0,
    };
  });

  const maxTrendCount = Math.max(...trendData.map(d => d.count), 20);

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="space-y-3">
          <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded-lg" />
          <div className="h-8 w-64 bg-slate-200 dark:bg-slate-800 rounded-xl" />
          <div className="h-4 w-96 bg-slate-200 dark:bg-slate-800 rounded-lg" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="crm-card border border-border/40 opacity-70">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-3 w-28 bg-slate-200 dark:bg-slate-800 rounded" />
                  <div className="h-4 w-4 bg-slate-200 dark:bg-slate-800 rounded-full" />
                </div>
                <div className="h-8 w-36 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                <div className="h-3 w-44 bg-slate-200 dark:bg-slate-800 rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <title>Lobby Dashboard | Ansh Visitor</title>
      <PageHeader
        eyebrow="Workspace Overview"
        title={`Welcome back, ${currentUser.name}`}
        description={`Manage active guests, issue pre-registered invitations, and oversee office traffic.`}
        action={{
          label: "Quick Scan",
          icon: Scan,
          onClick: () => {
            setOpenScanner(true);
            setScanInput("");
            setScannedVisitor(null);
          }
        }}
      />

      {/* STATS GRID */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Active Guests */}
        <Card className="crm-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Checked-In Guests
            </CardTitle>
            <UserCheck className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold text-slate-800 dark:text-white">
              {activeCheckedIn.length} Active
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-emerald-500 font-semibold">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Currently in the building</span>
            </div>
          </CardContent>
        </Card>

        {/* Expected Arrivals */}
        <Card className="crm-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Expected Today
            </CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold text-slate-800 dark:text-white">
              {expectedToday.length} Expected
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
              <span>Pre-registered invitations today</span>
            </div>
          </CardContent>
        </Card>

        {/* Checked Out */}
        <Card className="crm-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Checked Out Today
            </CardTitle>
            <LogOut className="h-4 w-4 text-sky-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold text-slate-800 dark:text-white">
              {checkedOutToday.length} Out
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
              <span>Guests departed from building</span>
            </div>
          </CardContent>
        </Card>

        {/* Total Registered logs */}
        <Card className="crm-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Total Logged Visits
            </CardTitle>
            <Users className="h-4 w-4 text-pink-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold text-slate-800 dark:text-white">
              {totalLogsCount}
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
              <span>All historical visitor records</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CHARTS */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Donut Chart: Purpose */}
        <Card className="crm-card">
          <CardHeader className="border-b border-border/40 pb-4">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Visits by Purpose
            </CardTitle>
            <CardDescription className="text-xs text-slate-400">
              Distribution of visitor purposes in this location.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-around gap-6 sm:flex-row">
              {purposesData.length > 0 ? (
                <div className="relative h-36 w-36 shrink-0">
                  <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                    <circle
                      cx="18"
                      cy="18"
                      r="15.915"
                      fill="transparent"
                      stroke="var(--border)"
                      strokeWidth="2.5"
                      className="opacity-40"
                    />
                    {(() => {
                      let accumulatedPercent = 0;
                      return purposesData.map((purpose, idx) => {
                        const percent = (purpose.value / totalVisitorsForChart) * 100;
                        const strokeDasharray = `${percent} ${100 - percent}`;
                        const strokeDashoffset = 100 - accumulatedPercent + 25;
                        accumulatedPercent += percent;

                        return (
                          <circle
                            key={idx}
                            cx="18"
                            cy="18"
                            r="15.915"
                            fill="transparent"
                            stroke={purpose.color}
                            strokeWidth="3.2"
                            strokeDasharray={strokeDasharray}
                            strokeDashoffset={strokeDashoffset}
                            className="transition-all duration-500 hover:stroke-[4]"
                          />
                        );
                      });
                    })()}
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Total</span>
                    <span className="text-sm font-extrabold text-slate-800 dark:text-white">
                      {visitors.length}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex h-36 w-36 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-900 border border-dashed border-border/60">
                  <span className="text-[10px] font-bold text-slate-400 text-center px-4">No logged visits</span>
                </div>
              )}

              {/* Legends */}
              <div className="flex-1 space-y-3">
                {purposesData.length > 0 ? (
                  purposesData.map((purpose, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-2.5 w-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: purpose.color }}
                        />
                        <span className="font-semibold text-slate-655 dark:text-slate-300">
                          {purpose.name}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-slate-700 dark:text-slate-200 block">
                          {purpose.value} {purpose.value === 1 ? "visit" : "visits"}
                        </span>
                        <span className="text-[9px] text-slate-400 block -mt-0.5">
                          {Math.round((purpose.value / totalVisitorsForChart) * 100)}%
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 italic text-center py-6">
                    Visitor logs will compile breakdowns automatically.
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Traffic Trend Chart */}
        <Card className="crm-card">
          <CardHeader className="border-b border-border/40 pb-4">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Lobby Traffic Trends
            </CardTitle>
            <CardDescription className="text-xs text-slate-400">
              Monthly visitor traffic volume inside the facility.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-36 w-full flex items-end justify-between gap-4 pt-4 px-2">
              {trendData.map((d, i) => {
                const heightPercent = Math.max(10, (d.count / maxTrendCount) * 100);
                return (
                  <div key={i} className="flex flex-1 flex-col items-center gap-2 group/bar">
                    <div className="opacity-0 group-hover/bar:opacity-100 transition-opacity bg-slate-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded absolute -translate-y-7 pointer-events-none select-none dark:bg-white dark:text-slate-950 shadow">
                      {d.count} visits
                    </div>
                    <div className="w-full bg-slate-100 rounded-t-md dark:bg-slate-900/60 overflow-hidden flex items-end h-24">
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className="w-full bg-gradient-to-t from-emerald-500 to-teal-400 group-hover/bar:brightness-110 transition-all duration-500 rounded-t-md"
                      />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                      {d.month}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ACTIVE GUESTS LIST */}
      <Card className="crm-card">
        <CardHeader className="border-b border-border/40 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Active Checked-in Guests
              </CardTitle>
              <CardDescription className="text-xs text-slate-400 mt-1">
                Visitors currently inside the building. Ensure checkout upon exit.
              </CardDescription>
            </div>
            <Link href="/visitors" className="text-xs font-bold text-primary hover:underline">
              View all visitor logs
            </Link>
          </div>
        </CardHeader>
        <CardContent className="pt-4 px-0">
          <div className="divide-y divide-border/40 px-6">
            {activeCheckedIn.length > 0 ? (
              activeCheckedIn.map((visitor) => (
                <div key={visitor.id} className="py-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-xs font-extrabold text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-450 border border-emerald-500/10">
                      {visitor.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="block text-sm font-bold text-slate-800 dark:text-white truncate">
                          {visitor.name}
                        </span>
                        {visitor.badgeNumber && (
                          <Badge variant="outline" className="text-[9px] font-bold border-emerald-500/20 text-emerald-600 bg-emerald-500/5">
                            {visitor.badgeNumber}
                          </Badge>
                        )}
                      </div>
                      <span className="block text-[11px] text-slate-450 dark:text-slate-400 font-medium truncate">
                        {visitor.company || "Individual"} · Host: <strong className="text-slate-600 dark:text-slate-350">{visitor.hostName}</strong> · Purpose: {visitor.purpose}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-slate-450 font-bold">
                      In: {new Date(visitor.checkedInAt || "").toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => checkOutVisitor(visitor.id)}
                      className="text-xs border-rose-500/20 text-rose-500 hover:bg-rose-500/10 hover:text-rose-650 cursor-pointer"
                    >
                      Check Out
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-xs text-slate-400 italic">No guests are currently checked in.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* QUICK SCAN MODAL */}
      <Dialog open={openScanner} onOpenChange={setOpenScanner}>
        <DialogContent className="sm:max-w-[420px] text-slate-800 dark:text-slate-100">
          <DialogHeader>
            <DialogTitle>Quick Desk QR Scanner</DialogTitle>
            <DialogDescription>
              Verify guest invites instantly by typing/scanning the code, or select from the expected list.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-3 flex flex-col items-center">
            {/* Camera Viewport Border Box */}
            <div className="relative h-48 w-48 rounded-2xl border-4 border-slate-200 bg-slate-950 flex flex-col items-center justify-center overflow-hidden dark:border-slate-800 shadow-inner group">
              {/* Scan Laser Anim */}
              {scanning && (
                <div className="absolute inset-x-0 h-1 bg-emerald-500 shadow-[0_0_15px_#10b981] top-0 animate-[float_0.8s_ease-in-out_infinite]" />
              )}

              {/* Viewport Bracket Corners */}
              <div className="absolute top-3 left-3 h-4 w-4 border-t-2 border-l-2 border-emerald-500 rounded-tl-sm" />
              <div className="absolute top-3 right-3 h-4 w-4 border-t-2 border-r-2 border-emerald-500 rounded-tr-sm" />
              <div className="absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-emerald-500 rounded-bl-sm" />
              <div className="absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-emerald-500 rounded-br-sm" />

              {scanning ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-500 animate-pulse">
                    Verifying...
                  </span>
                </div>
              ) : scannedVisitor ? (
                <div className="flex flex-col items-center text-center p-3 gap-1 animate-in zoom-in-95 duration-150">
                  <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20 mb-1">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-500">
                    APPROVED
                  </span>
                  <h4 className="text-white font-bold text-xs truncate max-w-[140px]">
                    {scannedVisitor.name}
                  </h4>
                  <span className="text-[8px] text-slate-500 font-mono">
                    {scannedVisitor.badgeNumber}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Scan className="h-10 w-10 text-slate-700 dark:text-slate-655 transition-transform group-hover:scale-105" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">
                    Awaiting Scan
                  </span>
                </div>
              )}
            </div>

            {/* Controls form */}
            <form onSubmit={handleKeyPressScan} className="w-full space-y-4 pt-2">
              <div className="space-y-1">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  Select Guest to Instant Check-in
                </label>
                {visitors.filter(v => v.status === "Expected").length > 0 ? (
                  <Select
                    value={scannerSelectedVisitorId}
                    onChange={(e) => {
                      setScannerSelectedVisitorId(e.target.value);
                      handleQuickCheckIn(e.target.value);
                    }}
                    className="bg-card border-input text-foreground text-xs h-8"
                  >
                    <option value="">-- Choose Expected Guest --</option>
                    {visitors
                      .filter((v) => v.status === "Expected")
                      .map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.name} (Passcode: {v.qrCode})
                        </option>
                      ))}
                  </Select>
                ) : (
                  <p className="text-[11px] text-slate-400 italic py-1 text-center">
                    No expected guests remaining today.
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  Scan Input / Code Lookup
                </label>
                <div className="flex gap-2">
                  <Input
                    autoFocus
                    placeholder="Scan QR or enter name..."
                    value={scanInput}
                    onChange={(e) => setScanInput(e.target.value)}
                    className="h-8 text-xs flex-1 bg-card border-input text-foreground"
                  />
                  <Button type="submit" size="sm" className="btn-primary shrink-0 border-0 text-xs px-3">
                    Verify
                  </Button>
                </div>
              </div>
            </form>
          </div>

          <DialogFooter className="border-t border-border/40 pt-3">
            <Button
              variant="outline"
              type="button"
              onClick={() => setOpenScanner(false)}
              className="w-full sm:w-28 cursor-pointer text-xs h-7"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
