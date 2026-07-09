"use client";

import { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import { CreditCard, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type BillingSummary = {
  activeSubscriptions: number;
  totalSubscriptions: number;
  pendingSubscriptions: number;
  monthlyRecurring: string;
  newThisMonth: number;
  cancelledOrExpired: number;
  avgSeatsPerPlan: number;
  activeWorkspaces: number;
};

type AdminSubscription = {
  id: string;
  workspaceId: number;
  workspaceName: string;
  plan: string;
  status: string;
  seats: number;
  amount: string;
  billingCycle: string;
  starts: string | null;
  expires: string | null;
  transactionCount: number;
};

type AdminTransaction = {
  id: string;
  workspaceName: string;
  plan: string;
  billingCycle: string;
  razorpayOrderId: string;
  razorpayPaymentId: string | null;
  amount: string;
  status: string;
  region: string;
  createdAt: string;
};

type BillingResponse = {
  summary: BillingSummary;
  subscriptions: AdminSubscription[];
  transactions: AdminTransaction[];
};

function statusBadgeClass(status: string) {
  switch (status) {
    case "active":
    case "success":
      return "bg-emerald-500/15 text-emerald-400 border-emerald-500/25";
    case "pending":
      return "bg-amber-500/15 text-amber-400 border-amber-500/25";
    case "cancelled":
    case "failed":
      return "bg-rose-500/15 text-rose-400 border-rose-500/25";
    case "expired":
      return "bg-slate-500/15 text-slate-400 border-slate-500/25";
    default:
      return "bg-violet-500/15 text-violet-300 border-violet-500/25";
  }
}

export function AdminSubscriptionsPanel({ token }: { token: string }) {
  const [billingView, setBillingView] = useState<"subscriptions" | "transactions">("subscriptions");
  const [data, setData] = useState<BillingResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadBilling = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/billing", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to load billing data");
      setData(await res.json());
    } catch {
      setError("Could not load subscriptions and transactions.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    void loadBilling();
  }, [loadBilling]);

  const summary = data?.summary;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-white">
            <CreditCard className="h-5 w-5 text-violet-400" />
            <h2 className="text-lg font-black tracking-tight">Subscriptions & Transactions</h2>
          </div>
          <p className="mt-1 text-sm text-slate-400">All workspace billing activity</p>
        </div>
        <Button
          type="button"
          onClick={() => void loadBilling()}
          className="h-10 rounded-xl border border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800"
        >
          <RefreshCw className={cn("mr-2 h-4 w-4", loading && "animate-spin")} />
          Refresh
        </Button>
      </div>

      <div className="inline-flex rounded-xl border border-slate-800 bg-slate-950 p-1">
        {(["subscriptions", "transactions"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setBillingView(tab)}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-bold capitalize transition-colors",
              billingView === tab
                ? "bg-violet-600 text-white"
                : "text-slate-400 hover:text-white",
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {summary && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: "Active Subscriptions",
              value: String(summary.activeSubscriptions),
              sub: `${summary.totalSubscriptions} total · ${summary.pendingSubscriptions} pending`,
            },
            {
              label: "Monthly Recurring",
              value: summary.monthlyRecurring,
              sub: "From active plans (monthly equiv.)",
            },
            {
              label: "New This Month",
              value: String(summary.newThisMonth),
              sub: `${summary.cancelledOrExpired} cancelled / expired`,
            },
            {
              label: "Avg Seats / Plan",
              value: String(summary.avgSeatsPerPlan),
              sub: `${summary.activeWorkspaces} active workspaces`,
            },
          ].map((card) => (
            <div
              key={card.label}
              className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5"
            >
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                {card.label}
              </p>
              <p className="mt-2 text-3xl font-black text-white">{card.value}</p>
              <p className="mt-1 text-xs text-slate-500">{card.sub}</p>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/80">
        {loading ? (
          <div className="px-6 py-16 text-center text-sm text-slate-500">Loading billing data…</div>
        ) : billingView === "subscriptions" ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-slate-800 bg-slate-900/60 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  {["Workspace", "Plan", "Status", "Seats", "Amount", "Cycle", "Starts", "Expires", "Txns"].map(
                    (col) => (
                      <th key={col} className="px-4 py-3">
                        {col}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {data?.subscriptions.length ? (
                  data.subscriptions.map((row) => (
                    <tr key={row.id} className="border-b border-slate-900 text-slate-300">
                      <td className="px-4 py-3 font-semibold text-white">{row.workspaceName}</td>
                      <td className="px-4 py-3 capitalize">{row.plan}</td>
                      <td className="px-4 py-3">
                        <Badge className={cn("border text-[10px] uppercase", statusBadgeClass(row.status))}>
                          {row.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">{row.seats}</td>
                      <td className="px-4 py-3">{row.amount}</td>
                      <td className="px-4 py-3 capitalize">{row.billingCycle}</td>
                      <td className="px-4 py-3">
                        {row.starts ? format(new Date(row.starts), "dd MMM yyyy") : "—"}
                      </td>
                      <td className="px-4 py-3">
                        {row.expires ? format(new Date(row.expires), "dd MMM yyyy") : "—"}
                      </td>
                      <td className="px-4 py-3">{row.transactionCount}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="px-4 py-16 text-center text-slate-500">
                      No subscriptions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-slate-800 bg-slate-900/60 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  {["Workspace", "Plan", "Order ID", "Payment ID", "Amount", "Status", "Region", "Date"].map(
                    (col) => (
                      <th key={col} className="px-4 py-3">
                        {col}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {data?.transactions.length ? (
                  data.transactions.map((row) => (
                    <tr key={row.id} className="border-b border-slate-900 text-slate-300">
                      <td className="px-4 py-3 font-semibold text-white">{row.workspaceName}</td>
                      <td className="px-4 py-3 capitalize">
                        {row.plan} · {row.billingCycle}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs">{row.razorpayOrderId}</td>
                      <td className="px-4 py-3 font-mono text-xs">{row.razorpayPaymentId || "—"}</td>
                      <td className="px-4 py-3">{row.amount}</td>
                      <td className="px-4 py-3">
                        <Badge className={cn("border text-[10px] uppercase", statusBadgeClass(row.status))}>
                          {row.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">{row.region}</td>
                      <td className="px-4 py-3">
                        {format(new Date(row.createdAt), "dd MMM yyyy, HH:mm")}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-4 py-16 text-center text-slate-500">
                      No transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
