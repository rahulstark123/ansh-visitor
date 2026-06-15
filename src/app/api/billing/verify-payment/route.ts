import { createHmac } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      wid = 1,
    } = body as {
      razorpay_order_id?: string;
      razorpay_payment_id?: string;
      razorpay_signature?: string;
      wid?: number;
    };

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: "Missing payment verification fields" },
        { status: 400 }
      );
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      return NextResponse.json(
        { error: "Payment verification is not configured" },
        { status: 500 }
      );
    }

    const expectedSignature = createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { error: "Invalid payment signature" },
        { status: 400 }
      );
    }

    const workspaceId = Number(wid) || 1;
    const workspace = await prisma.workspace.update({
      where: { id: workspaceId },
      data: { plan: "pro" },
      select: { id: true, name: true, plan: true, createdAt: true },
    });

    return NextResponse.json(
      {
        success: true,
        workspace,
        payment: {
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("[POST /api/billing/verify-payment]", err);
    return NextResponse.json(
      { error: "Failed to verify payment" },
      { status: 500 }
    );
  }
}
