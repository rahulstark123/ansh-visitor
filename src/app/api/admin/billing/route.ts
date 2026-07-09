import { NextResponse } from "next/server";
import { getBearerToken, isValidAdminSessionToken } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

function formatAmount(amount: number, currency: string) {
  const value = currency === "INR" ? amount / 100 : amount / 100;
  const symbol = currency === "INR" ? "₹" : "$";
  return `${symbol}${value.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function monthlyEquivalent(amount: number, billingCycle: string, currency: string) {
  const monthlyAmount = billingCycle === "yearly" ? amount / 12 : amount;
  return formatAmount(Math.round(monthlyAmount), currency);
}

export async function GET(request: Request) {
  const token = getBearerToken(request);
  if (!isValidAdminSessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [subscriptions, transactions, workspaceCounts] = await Promise.all([
      prisma.subscription.findMany({
        include: {
          workspace: {
            select: {
              id: true,
              name: true,
              plan: true,
            },
          },
          _count: { select: { transactions: true } },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.transaction.findMany({
        include: {
          workspace: { select: { id: true, name: true } },
          subscription: { select: { plan: true, billingCycle: true } },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.profile.groupBy({
        by: ["wid"],
        _count: { _all: true },
      }),
    ]);

    const seatsByWorkspace = new Map(
      workspaceCounts.map((row) => [row.wid, row._count._all]),
    );

    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const activeSubscriptions = subscriptions.filter((s) => s.status === "active");
    const pendingSubscriptions = subscriptions.filter((s) => s.status === "pending");
    const cancelledOrExpired = subscriptions.filter((s) =>
      ["cancelled", "expired", "failed"].includes(s.status),
    );
    const newThisMonth = subscriptions.filter((s) => s.createdAt >= monthStart);

    const monthlyRecurring = activeSubscriptions.reduce((sum, sub) => {
      const monthly = sub.billingCycle === "yearly" ? sub.amount / 12 : sub.amount;
      return sum + monthly;
    }, 0);

    const activeWorkspaceIds = new Set(activeSubscriptions.map((s) => s.wid));
    const totalSeatsActive = [...activeWorkspaceIds].reduce(
      (sum, wid) => sum + (seatsByWorkspace.get(wid) ?? 0),
      0,
    );
    const avgSeatsPerPlan =
      activeSubscriptions.length > 0
        ? totalSeatsActive / activeSubscriptions.length
        : 0;

    return NextResponse.json({
      summary: {
        activeSubscriptions: activeSubscriptions.length,
        totalSubscriptions: subscriptions.length,
        pendingSubscriptions: pendingSubscriptions.length,
        monthlyRecurring: formatAmount(Math.round(monthlyRecurring), "INR"),
        newThisMonth: newThisMonth.length,
        cancelledOrExpired: cancelledOrExpired.length,
        avgSeatsPerPlan: Number(avgSeatsPerPlan.toFixed(1)),
        activeWorkspaces: activeWorkspaceIds.size,
      },
      subscriptions: subscriptions.map((sub) => ({
        id: sub.id,
        workspaceId: sub.wid,
        workspaceName: sub.workspace.name || `Workspace #${sub.wid}`,
        plan: sub.plan,
        status: sub.status,
        seats: seatsByWorkspace.get(sub.wid) ?? 0,
        amount: formatAmount(sub.amount, sub.currency),
        billingCycle: sub.billingCycle,
        starts: sub.currentPeriodStart,
        expires: sub.currentPeriodEnd,
        transactionCount: sub._count.transactions,
        region: sub.region,
        createdAt: sub.createdAt,
      })),
      transactions: transactions.map((txn) => ({
        id: txn.id,
        workspaceId: txn.wid,
        workspaceName: txn.workspace.name || `Workspace #${txn.wid}`,
        plan: txn.subscription.plan,
        billingCycle: txn.subscription.billingCycle,
        razorpayOrderId: txn.razorpayOrderId,
        razorpayPaymentId: txn.razorpayPaymentId,
        amount: formatAmount(txn.amount, txn.currency),
        currency: txn.currency,
        status: txn.status,
        region: txn.region,
        failureReason: txn.failureReason,
        createdAt: txn.createdAt,
        verifiedAt: txn.verifiedAt,
      })),
    });
  } catch (error) {
    console.error("Admin billing fetch failed:", error);
    return NextResponse.json({ error: "Failed to load billing data" }, { status: 500 });
  }
}
