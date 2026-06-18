import type { Visitor } from "@/stores/visitor-store";

export const PURPOSE_COLORS: Record<string, string> = {
  Meeting: "#10b981",
  Interview: "#0ea5e9",
  Vendor: "#f59e0b",
  Delivery: "#ec4899",
  Other: "#64748b",
};

export type PurposeChartSlice = {
  name: string;
  value: number;
  color: string;
  percent: number;
};

export function buildPurposeChartData(visitors: Visitor[]): PurposeChartSlice[] {
  const purposeTotals: Record<string, number> = {};
  visitors.forEach((visitor) => {
    purposeTotals[visitor.purpose] = (purposeTotals[visitor.purpose] || 0) + 1;
  });

  const total = visitors.length;
  if (total === 0) return [];

  return Object.entries(purposeTotals)
    .map(([name, value]) => ({
      name,
      value,
      color: PURPOSE_COLORS[name] || "#64748b",
      percent: (value / total) * 100,
    }))
    .sort((a, b) => b.value - a.value);
}
