import { createHmac } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import {
  completeSuccessfulPayment,
  markPaymentFailed,
} from "@/lib/billing-records";

export async function POST(req: NextRequest) {
  let razorpayOrderId: string | undefined;
  let razorpayPaymentId: string | undefined;
  let workspaceId = 1;

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

    razorpayOrderId = razorpay_order_id;
    razorpayPaymentId = razorpay_payment_id;
    workspaceId = Number(wid) || 1;

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
      await markPaymentFailed({
        razorpayOrderId: razorpay_order_id,
        wid: workspaceId,
        razorpayPaymentId: razorpay_payment_id,
        failureReason: "Invalid payment signature",
      });

      return NextResponse.json(
        { error: "Invalid payment signature" },
        { status: 400 }
      );
    }

    const result = await completeSuccessfulPayment({
      wid: workspaceId,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
    });

    return NextResponse.json(
      {
        success: true,
        workspace: result.workspace,
        payment: {
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id,
          transactionId: result.transaction.id,
          subscriptionId: result.transaction.subscriptionId,
          alreadyVerified: result.alreadyVerified,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("[POST /api/billing/verify-payment]", err);

    if (razorpayOrderId) {
      try {
        await markPaymentFailed({
          razorpayOrderId,
          wid: workspaceId,
          razorpayPaymentId,
          failureReason:
            err instanceof Error ? err.message : "Payment verification failed",
        });
      } catch (recordErr) {
        console.error("[POST /api/billing/verify-payment] record failure", recordErr);
      }
    }

    return NextResponse.json(
      { error: "Failed to verify payment" },
      { status: 500 }
    );
  }
}
