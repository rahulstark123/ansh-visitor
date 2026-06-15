"use client";

import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Visitor } from "@/stores/visitor-store";

interface LobbyTrafficChartProps {
  visitors: Visitor[];
}

interface MonthPoint {
  month: string;
  fullMonth: string;
  visits: number;
  checkIns: number;
}

function buildMonthlySeries(visitors: Visitor[]): MonthPoint[] {
  const now = new Date();
  const points: MonthPoint[] = [];

  for (let offset = 5; offset >= 0; offset--) {
    const monthStart = new Date(now.getFullYear(), now.getMonth() - offset, 1);
    const year = monthStart.getFullYear();
    const monthIdx = monthStart.getMonth();

    let visits = 0;
    let checkIns = 0;

    for (const visitor of visitors) {
      const checkedIn = visitor.checkedInAt
        ? new Date(visitor.checkedInAt)
        : null;
      const registered = visitor.preRegisteredAt
        ? new Date(visitor.preRegisteredAt)
        : null;

      const trafficDate = checkedIn ?? registered;
      if (!trafficDate) continue;

      if (trafficDate.getFullYear() === year && trafficDate.getMonth() === monthIdx) {
        visits += 1;
      }
      if (
        checkedIn &&
        checkedIn.getFullYear() === year &&
        checkedIn.getMonth() === monthIdx
      ) {
        checkIns += 1;
      }
    }

    points.push({
      month: monthStart.toLocaleDateString("en-US", { month: "short" }),
      fullMonth: monthStart.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      }),
      visits,
      checkIns,
    });
  }

  return points;
}

function TrafficTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: MonthPoint }[];
}) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload;

  return (
    <div className="rounded-xl border border-border/60 bg-card px-3 py-2.5 shadow-lg text-xs">
      <p className="font-bold text-slate-800 dark:text-slate-100 mb-1">
        {point.fullMonth}
      </p>
      <p className="text-slate-600 dark:text-slate-300">
        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
          {point.visits}
        </span>{" "}
        visitor log{point.visits !== 1 ? "s" : ""}
      </p>
      <p className="text-slate-500 dark:text-slate-400 mt-0.5">
        {point.checkIns} checked in
      </p>
    </div>
  );
}

export function LobbyTrafficChart({ visitors }: LobbyTrafficChartProps) {
  const data = useMemo(() => buildMonthlySeries(visitors), [visitors]);
  const peak = Math.max(...data.map((d) => d.visits), 1);
  const yMax = Math.ceil(peak * 1.15);

  const totalSixMonths = data.reduce((sum, d) => sum + d.visits, 0);
  const avgPerMonth = totalSixMonths > 0 ? Math.round(totalSixMonths / 6) : 0;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-slate-400 px-1">
        <span>Last 6 months</span>
        <span>
          Avg{" "}
          <span className="text-slate-600 dark:text-slate-300 font-bold">
            {avgPerMonth}
          </span>
          / mo
        </span>
      </div>

      <div className="h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 12, right: 4, left: -8, bottom: 0 }}
            barCategoryGap="18%"
          >
            <defs>
              <linearGradient id="lobbyBarFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2dd4bf" stopOpacity={0.95} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0.85} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              stroke="currentColor"
              className="text-slate-200/80 dark:text-slate-800/80"
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fontWeight: 600, fill: "#94a3b8" }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
              domain={[0, yMax]}
              tick={{ fontSize: 10, fill: "#94a3b8" }}
              width={32}
            />
            <Tooltip
              content={<TrafficTooltip />}
              cursor={{ fill: "rgba(16, 185, 129, 0.06)" }}
            />
            <Bar
              dataKey="visits"
              name="Visitors"
              fill="url(#lobbyBarFill)"
              radius={[8, 8, 0, 0]}
              maxBarSize={44}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
