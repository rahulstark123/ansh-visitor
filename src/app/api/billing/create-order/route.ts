import { NextRequest, NextResponse } from "next/server";
import {
  detectRegionFromCountry,
  getProPricing,
} from "@/config/billing";
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

    const razorpay = getRazorpay();
    const order = await razorpay.orders.create({
      amount: pricing.amountMinor,
      currency: pricing.currency,
      receipt: `visitor-pro-${wid}-${Date.now()}`,
      notes: {
        wid: String(wid),
        product: "ansh-visitor-pro",
        region,
        pricingModel: "flat-workspace",
      },
    });

    return NextResponse.json(
      {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        region,
        proPrice: pricing.amount,
        proPriceDisplay: pricing.display,
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
