import { NextRequest, NextResponse } from "next/server";
import {
  detectRegionFromCountry,
  getProPricing,
} from "@/config/billing";
import { createPendingSubscriptionAndTransaction } from "@/lib/billing-records";
import { getRazorpay } from "@/lib/razorpay";

function getCountryFromRequest(req: NextRequest): string | null {
  return (
    req.headers.get("x-vercel-ip-country") ||
    req.headers.get("cf-ipcountry") ||
    req.headers.get("x-country-code") ||
    null
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { wid = 1 } = body as { wid?: number };

    const country = getCountryFromRequest(req);
    const region = detectRegionFromCountry(country);
    const pricing = getProPricing(region);

    const workspaceId = Number(wid) || 1;
    const razorpay = getRazorpay();
    const order = await razorpay.orders.create({
      amount: pricing.amountMinor,
      currency: pricing.currency,
      receipt: `visitor-pro-${workspaceId}-${Date.now()}`,
      notes: {
        wid: String(workspaceId),
        product: "ansh-visitor-pro",
        region,
        pricingModel: "flat-workspace",
      },
    });

    const { subscription, transaction } =
      await createPendingSubscriptionAndTransaction({
        wid: workspaceId,
        razorpayOrderId: order.id,
        amount: Number(order.amount),
        currency: order.currency ?? pricing.currency,
        region,
      });

    return NextResponse.json(
      {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        region,
        proPrice: pricing.amount,
        proPriceDisplay: pricing.display,
        subscriptionId: subscription.id,
        transactionId: transaction.id,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("[POST /api/billing/create-order]", err);
    return NextResponse.json(
      { error: "Failed to create payment order" },
      { status: 500 }
    );
  }
}
