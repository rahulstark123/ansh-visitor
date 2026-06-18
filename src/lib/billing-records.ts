import type { BillingCycle, BillingRegion } from "@/config/billing";
import { getSubscriptionPeriodDays } from "@/config/billing";
import { prisma } from "@/lib/prisma";

export type BillingRecordStatus =
  | "pending"
  | "success"
  | "failed"
  | "cancelled"
  | "active"
  | "expired";

export const SUBSCRIPTION_PERIOD_DAYS = 30;

export async function createPendingSubscriptionAndTransaction(options: {
  wid: number;
  razorpayOrderId: string;
  amount: number;
  currency: string;
  region: BillingRegion;
  billingCycle?: BillingCycle;
}) {
  const subscription = await prisma.subscription.create({
    data: {
      wid: options.wid,
      plan: "pro",
      status: "pending",
      amount: options.amount,
      currency: options.currency,
      region: options.region,
      billingCycle: options.billingCycle ?? "monthly",
    },
  });

  const transaction = await prisma.transaction.create({
    data: {
      wid: options.wid,
      subscriptionId: subscription.id,
      razorpayOrderId: options.razorpayOrderId,
      amount: options.amount,
      currency: options.currency,
      region: options.region,
      status: "pending",
    },
  });

  return { subscription, transaction };
}

export async function completeSuccessfulPayment(options: {
  wid: number;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  billingCycle?: BillingCycle;
}) {
  const now = new Date();
  const periodEnd = new Date(now);

  return prisma.$transaction(async (tx) => {
    const transaction = await tx.transaction.findUnique({
      where: { razorpayOrderId: options.razorpayOrderId },
      include: { subscription: true },
    });

    if (!transaction || transaction.wid !== options.wid) {
      throw new Error("Payment order not found for this workspace");
    }

    const billingCycle =
      options.billingCycle ??
      (transaction.subscription.billingCycle as BillingCycle) ??
      "monthly";
    periodEnd.setDate(
      periodEnd.getDate() + getSubscriptionPeriodDays(billingCycle)
    );

    if (transaction.status === "success") {
      const workspace = await tx.workspace.findUniqueOrThrow({
        where: { id: options.wid },
        select: { id: true, name: true, plan: true, createdAt: true },
      });
      return { workspace, transaction, alreadyVerified: true as const };
    }

    const updatedTransaction = await tx.transaction.update({
      where: { id: transaction.id },
      data: {
        status: "success",
        razorpayPaymentId: options.razorpayPaymentId,
        verifiedAt: now,
        failureReason: null,
      },
    });

    await tx.subscription.update({
      where: { id: transaction.subscriptionId },
      data: {
        status: "active",
        billingCycle,
        currentPeriodStart: now,
        currentPeriodEnd: periodEnd,
        cancelledAt: null,
      },
    });

    const workspace = await tx.workspace.update({
      where: { id: options.wid },
      data: { plan: "pro" },
      select: { id: true, name: true, plan: true, createdAt: true },
    });

    return {
      workspace,
      transaction: updatedTransaction,
      alreadyVerified: false as const,
    };
  });
}

export async function markPaymentFailed(options: {
  razorpayOrderId: string;
  wid?: number;
  razorpayPaymentId?: string;
  failureReason: string;
}) {
  const transaction = await prisma.transaction.findUnique({
    where: { razorpayOrderId: options.razorpayOrderId },
  });

  if (!transaction) return null;
  if (options.wid !== undefined && transaction.wid !== options.wid) return null;
  if (transaction.status === "success") return transaction;

  return prisma.$transaction(async (tx) => {
    const updatedTransaction = await tx.transaction.update({
      where: { id: transaction.id },
      data: {
        status: "failed",
        failureReason: options.failureReason,
        razorpayPaymentId: options.razorpayPaymentId ?? transaction.razorpayPaymentId,
      },
    });

    await tx.subscription.update({
      where: { id: transaction.subscriptionId },
      data: { status: "failed" },
    });

    return updatedTransaction;
  });
}

export async function cancelPendingPayment(options: {
  razorpayOrderId: string;
  wid: number;
}) {
  const transaction = await prisma.transaction.findUnique({
    where: { razorpayOrderId: options.razorpayOrderId },
  });

  if (!transaction || transaction.wid !== options.wid) return null;
  if (transaction.status !== "pending") return transaction;

  return prisma.$transaction(async (tx) => {
    const updatedTransaction = await tx.transaction.update({
      where: { id: transaction.id },
      data: { status: "cancelled", failureReason: "Checkout dismissed by user" },
    });

    await tx.subscription.update({
      where: { id: transaction.subscriptionId },
      data: { status: "cancelled", cancelledAt: new Date() },
    });

    return updatedTransaction;
  });
}
