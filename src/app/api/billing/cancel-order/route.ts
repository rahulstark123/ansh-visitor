import { NextRequest, NextResponse } from "next/server";
import { cancelPendingPayment } from "@/lib/billing-records";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { orderId, wid = 1 } = body as { orderId?: string; wid?: number };

    if (!orderId) {
      return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
    }

    const workspaceId = Number(wid) || 1;
    const transaction = await cancelPendingPayment({
      razorpayOrderId: orderId,
      wid: workspaceId,
    });

    if (!transaction) {
      return NextResponse.json(
        { error: "Pending payment order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        transaction: {
          id: transaction.id,
          status: transaction.status,
          orderId: transaction.razorpayOrderId,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("[POST /api/billing/cancel-order]", err);
    return NextResponse.json(
      { error: "Failed to cancel payment order" },
      { status: 500 }
    );
  }
}
