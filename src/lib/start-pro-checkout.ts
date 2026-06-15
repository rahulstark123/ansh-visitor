import type { RazorpayCheckoutResponse } from "@/lib/razorpay-checkout";
import {
  openRazorpayCheckout,
  PRO_CHECKOUT_DESCRIPTION,
} from "@/lib/razorpay-checkout";
import { toast } from "@/components/ui/toast";

export async function startProCheckout(options: {
  wid: number;
  userName: string;
  userEmail: string;
  onSuccess: () => void;
  onDismiss?: () => void;
}): Promise<void> {
  const orderRes = await fetch("/api/billing/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ wid: options.wid }),
  });

  if (!orderRes.ok) {
    throw new Error("Could not create payment order");
  }

  const { orderId, amount, currency } = await orderRes.json();
  const publicKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  if (!publicKey) {
    throw new Error("Razorpay is not configured");
  }

  const cancelPendingOrder = async () => {
    try {
      await fetch("/api/billing/cancel-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, wid: options.wid }),
      });
    } catch {
      // Best-effort audit trail when checkout is dismissed
    }
  };

  await openRazorpayCheckout({
    key: publicKey,
    orderId,
    amountMinor: amount,
    currency,
    name: options.userName,
    email: options.userEmail,
    description: PRO_CHECKOUT_DESCRIPTION,
    onDismiss: async () => {
      await cancelPendingOrder();
      options.onDismiss?.();
    },
    onSuccess: async (response: RazorpayCheckoutResponse) => {
      try {
        const verifyRes = await fetch("/api/billing/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...response,
            wid: options.wid,
          }),
        });

        if (!verifyRes.ok) {
          throw new Error("Payment verification failed");
        }

        toast.success("Payment successful! Your Pro plan is now active.");
        options.onSuccess();
      } catch {
        toast.error(
          "Payment received but verification failed. Contact support."
        );
      }
    },
  });
}
