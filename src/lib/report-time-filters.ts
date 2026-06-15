import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  isWithinInterval,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subMonths,
  subWeeks,
} from "date-fns";
import type { Visitor } from "@/stores/visitor-store";

export type ReportTimePeriod =
  | "today"
  | "this_week"
  | "last_week"
  | "this_month"
  | "last_3_months"
  | "last_6_months"
  | "this_year"
  | "all_time";

export const REPORT_TIME_PERIOD_OPTIONS: {
  value: ReportTimePeriod;
  label: string;
}[] = [
  { value: "today", label: "Today" },
  { value: "this_week", label: "This Week" },
  { value: "last_week", label: "Last Week" },
  { value: "this_month", label: "This Month" },
  { value: "last_3_months", label: "Last 3 Months" },
  { value: "last_6_months", label: "Last 6 Months" },
  { value: "this_year", label: "This Year" },
  { value: "all_time", label: "All Time" },
];

const WEEK_OPTS = { weekStartsOn: 1 as const };

export function getReportPeriodLabel(period: ReportTimePeriod): string {
  return (
    REPORT_TIME_PERIOD_OPTIONS.find((o) => o.value === period)?.label ??
    "All Time"
  );
}

export function getReportDateRange(
  period: ReportTimePeriod
): { start: Date; end: Date } | null {
  const now = new Date();

  switch (period) {
    case "today":
      return { start: startOfDay(now), end: endOfDay(now) };
    case "this_week":
      return {
        start: startOfWeek(now, WEEK_OPTS),
        end: endOfWeek(now, WEEK_OPTS),
      };
    case "last_week": {
      const lastWeek = subWeeks(now, 1);
      return {
        start: startOfWeek(lastWeek, WEEK_OPTS),
        end: endOfWeek(lastWeek, WEEK_OPTS),
      };
    }
    case "this_month":
      return { start: startOfMonth(now), end: endOfMonth(now) };
    case "last_3_months":
      return { start: startOfDay(subMonths(now, 3)), end: endOfDay(now) };
    case "last_6_months":
      return { start: startOfDay(subMonths(now, 6)), end: endOfDay(now) };
    case "this_year":
      return { start: startOfYear(now), end: endOfYear(now) };
    case "all_time":
      return null;
  }
}

/** Primary activity date used for report filtering. */
export function getVisitorReportDate(visitor: Visitor): Date {
  if (visitor.checkedInAt) return new Date(visitor.checkedInAt);
  if (visitor.checkedOutAt) return new Date(visitor.checkedOutAt);
  return new Date(visitor.preRegisteredAt);
}

export function filterVisitorsByReportPeriod(
  visitors: Visitor[],
  period: ReportTimePeriod
): Visitor[] {
  const range = getReportDateRange(period);
  if (!range) return [...visitors];

  return visitors.filter((visitor) => {
    const activityDate = getVisitorReportDate(visitor);
    return isWithinInterval(activityDate, {
      start: range.start,
      end: range.end,
    });
  });
}

export function formatVisitDuration(
  inTime?: string,
  outTime?: string
): string {
  if (!inTime) return "-";
  if (!outTime) return "Still inside";

  const diff = new Date(outTime).getTime() - new Date(inTime).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  const remMins = mins % 60;
  return `${hrs}h ${remMins}m`;
}

export function getAverageVisitMinutes(visitors: Visitor[]): number | null {
  const completed = visitors.filter((v) => v.checkedInAt && v.checkedOutAt);
  if (completed.length === 0) return null;

  const totalMins = completed.reduce((sum, v) => {
    const diff =
      new Date(v.checkedOutAt!).getTime() - new Date(v.checkedInAt!).getTime();
    return sum + Math.floor(diff / 60000);
  }, 0);

  return Math.round(totalMins / completed.length);
}
