export interface RazorpayCheckoutResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayCheckoutOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: { color?: string };
  handler: (response: RazorpayCheckoutResponse) => void;
  modal?: { ondismiss?: () => void };
}

interface RazorpayInstance {
  open: () => void;
  on: (event: string, handler: () => void) => void;
}

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayCheckoutOptions) => RazorpayInstance;
  }
}

export const PRO_CHECKOUT_DESCRIPTION = "ANSH Visitor Pro — entire workspace";

export function loadRazorpayScript(): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (window.Razorpay) return Promise.resolve(true);

  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export async function openRazorpayCheckout(options: {
  key: string;
  orderId: string;
  amountMinor: number;
  currency: string;
  name: string;
  email: string;
  description: string;
  onSuccess: (response: RazorpayCheckoutResponse) => void;
  onDismiss?: () => void;
}): Promise<void> {
  const loaded = await loadRazorpayScript();
  if (!loaded || !window.Razorpay) {
    throw new Error("Failed to load Razorpay checkout");
  }

  const rzp = new window.Razorpay({
    key: options.key,
    amount: options.amountMinor,
    currency: options.currency,
    name: "ANSH Visitor",
    description: options.description,
    order_id: options.orderId,
    prefill: {
      name: options.name,
      email: options.email,
    },
    theme: { color: "#0ea5e9" },
    handler: options.onSuccess,
    modal: { ondismiss: options.onDismiss },
  });

  rzp.open();
}
