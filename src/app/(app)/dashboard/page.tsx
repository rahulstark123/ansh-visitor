"use client";

import { useState } from "react";
import { PageHeader } from "@/components/crm/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useVisitorStore } from "@/stores/visitor-store";
import {
  Users,
  Clock,
  LogOut,
  UserCheck,
  ShieldCheck,
  Scan,
} from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  GuestVerifyModal,
  type GuestVerifyMode,
} from "@/components/crm/guest-verify-modal";
import { ChartSkeleton } from "@/components/ui/page-skeletons";

const LobbyTrafficChart = dynamic(
  () =>
    import("@/components/crm/lobby-traffic-chart").then((m) => m.LobbyTrafficChart),
  {
    ssr: false,
    loading: () => <ChartSkeleton className="h-[220px] w-full" />,
  }
);

export default function DashboardPage() {
  const { visitors, currentUser } = useVisitorStore();
  const [verifyOpen, setVerifyOpen] = useState(false);
  const [verifyMode, setVerifyMode] = useState<GuestVerifyMode>("check-in");

  const openVerify = (mode: GuestVerifyMode) => {
    setVerifyMode(mode);
    setVerifyOpen(true);
  };

  // ─── Stats ─────────────────────────────────────────────────────────
  const activeCheckedIn = visitors.filter((v) => v.status === "CheckedIn");
  const expectedToday = visitors.filter((v) => v.status === "Expected");
  const checkedOutToday = visitors.filter((v) => v.status === "CheckedOut");
  const totalLogsCount = visitors.length;

  const purposeTotals: Record<string, number> = {};
  visitors.forEach((v) => {
    purposeTotals[v.purpose] = (purposeTotals[v.purpose] || 0) + 1;
  });
  const purposeColors: Record<string, string> = {
    Meeting: "#10b981",
    Interview: "#0ea5e9",
    Vendor: "#f59e0b",
    Delivery: "#ec4899",
    Other: "#64748b",
  };
  const purposesData = Object.entries(purposeTotals)
    .map(([name, value]) => ({
      name,
      value,
      color: purposeColors[name] || "#64748b",
    }))
    .sort((a, b) => b.value - a.value);
  const totalVisitorsForChart = visitors.length || 1;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <title>Lobby Dashboard | Ansh Visitor</title>
      <PageHeader
        eyebrow="Workspace Overview"
        title={`Welcome back, ${currentUser.name}`}
        description={`Manage active guests, issue pre-registered invitations, and oversee office traffic.`}
        toolbar={
          <>
            <Button
              type="button"
              variant="outline"
              className="h-11 shrink-0 gap-2 px-6 text-sm font-semibold border-rose-500/25 text-rose-600 hover:bg-rose-500/10 dark:text-rose-400"
              onClick={() => openVerify("check-out")}
            >
              <LogOut className="h-4 w-4" />
              Check Out
            </Button>
            <Button
              type="button"
              className="btn-primary h-11 shrink-0 gap-2 border-0 px-6"
              onClick={() => openVerify("check-in")}
            >
              <Scan className="h-4 w-4" />
              Check In
            </Button>
          </>
        }
      />

      {/* STATS GRID */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Total
                    </span>
                    <span className="text-sm font-extrabold text-slate-800 dark:text-white">
                      {visitors.length}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex h-36 w-36 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-900 border border-dashed border-border/60">
                  <span className="text-[10px] font-bold text-slate-400 text-center px-4">
                    No logged visits
                  </span>
                </div>
              )}

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

        <Card className="crm-card">
          <CardHeader className="border-b border-border/40 pb-4">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Lobby Traffic Trends
            </CardTitle>
            <CardDescription className="text-xs text-slate-400">
              Monthly visitor traffic volume inside the facility.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4 pb-2">
            <LobbyTrafficChart visitors={visitors} />
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
                          <Badge
                            variant="outline"
                            className="text-[9px] font-bold border-emerald-500/20 text-emerald-600 bg-emerald-500/5"
                          >
                            {visitor.badgeNumber}
                          </Badge>
                        )}
                      </div>
                      <span className="block text-[11px] text-slate-450 dark:text-slate-400 font-medium truncate">
                        {visitor.company || "Individual"} · Host:{" "}
                        <strong className="text-slate-600 dark:text-slate-350">
                          {visitor.hostName}
                        </strong>{" "}
                        · Purpose: {visitor.purpose}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-slate-450 font-bold">
                      In:{" "}
                      {new Date(visitor.checkedInAt || "").toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openVerify("check-out")}
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

      <GuestVerifyModal
        open={verifyOpen}
        onOpenChange={setVerifyOpen}
        mode={verifyMode}
      />

    </div>
  );
}
