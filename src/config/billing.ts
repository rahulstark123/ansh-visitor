export type WorkspacePlanTier = "free" | "pro" | "pro_trial";
export type BillingRegion = "IN" | "INTL";

/** Flat Pro price for the entire workspace (not per user). */
export const PRO_PRICE_INR = 299;
export const PRO_PRICE_USD = 7;

export const PRO_PRICE_INR_PAISA =
  Number(process.env.RAZORPAY_PRO_PLAN_AMOUNT_PAISA) || PRO_PRICE_INR * 100;
export const PRO_PRICE_USD_CENTS =
  Number(process.env.RAZORPAY_PRO_PLAN_AMOUNT_CENTS) || PRO_PRICE_USD * 100;

export const TRIAL_DAYS = 14;
export const FREE_MAX_TEAMMATES = 5;
export const FREE_MAX_VISITORS_MONTHLY = 100;
export const FREE_MAX_LOCATIONS = 1;
export const PRO_MAX_TEAMMATES = 500;

export const FREE_PLAN_FEATURES = [
  "Up to 5 teammates in directory",
  "100 visitor check-ins per month",
  "1 office branch location",
  "Lobby desk & QR guest passes",
  "Basic visitor log & host alerts",
  "Standard badge printing",
] as const;

export const FREE_PLAN_LIMITATIONS = [
  "No multi-branch analytics, custom badges, audit exports, or My Link pages",
] as const;

export const PRO_PLAN_FEATURES = [
  "Flat price — entire workspace, unlimited teammates",
  "Unlimited visitor check-ins & pre-registrations",
  "Multiple office branches & locations",
  "Custom public My Link pre-registration pages",
  "Custom badge designer & branding",
  "Advanced reports & audit log exports",
  "WhatsApp / SMS host arrival alerts",
  "Walk-in ID proof capture workflows",
  "Priority billing & support assistance",
] as const;

export const PLAN_COMPARISON_ROWS = [
  {
    feature: "Teammates limit",
    free: "Up to 5",
    pro: "Unlimited",
  },
  {
    feature: "Monthly visitor check-ins",
    free: "100 visitors",
    pro: "Unlimited",
  },
  {
    feature: "Office branch locations",
    free: "1 branch",
    pro: "Unlimited",
  },
  {
    feature: "QR passes & desk verification",
    free: true,
    pro: true,
  },
  {
    feature: "Host arrival notifications",
    free: true,
    pro: true,
  },
  {
    feature: "Custom badge designer",
    free: false,
    pro: true,
  },
  {
    feature: "My Link public pre-registration pages",
    free: false,
    pro: true,
  },
  {
    feature: "Reports & audit exports",
    free: false,
    pro: true,
  },
  {
    feature: "Multi-branch visitor analytics",
    free: false,
    pro: true,
  },
  {
    feature: "API & webhook integrations (Soon)",
    free: false,
    pro: "Soon",
  },
] as const;

export function detectRegionFromCountry(country: string | null): BillingRegion {
  return country?.toUpperCase() === "IN" ? "IN" : "INTL";
}

export function getProPricing(region: BillingRegion) {
  if (region === "IN") {
    return {
      region,
      currency: "INR" as const,
      amount: PRO_PRICE_INR,
      amountMinor: PRO_PRICE_INR_PAISA,
      display: `₹${PRO_PRICE_INR}`,
      period: "/ month",
      label: `₹${PRO_PRICE_INR}/month for entire app`,
    };
  }
  return {
    region,
    currency: "USD" as const,
    amount: PRO_PRICE_USD,
    amountMinor: PRO_PRICE_USD_CENTS,
    display: `$${PRO_PRICE_USD}`,
    period: "/ month",
    label: `$${PRO_PRICE_USD}/month for entire app`,
  };
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatUSD(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatProPrice(region: BillingRegion): string {
  const pricing = getProPricing(region);
  return `${pricing.display}${pricing.period}`;
}

export function getTrialEndDate(workspaceCreatedAt?: string | Date): Date {
  const base = workspaceCreatedAt ? new Date(workspaceCreatedAt) : new Date();
  const end = new Date(base);
  end.setDate(end.getDate() + TRIAL_DAYS);
  return end;
}

export function getTrialDaysLeft(trialEnd: Date): number {
  const diff = trialEnd.getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function getPlanDisplayName(tier: WorkspacePlanTier): string {
  if (tier === "pro") return "ANSH Visitor Pro";
  if (tier === "pro_trial") return "ANSH Visitor Pro Trial";
  return "ANSH Visitor Free";
}

export function getRegionPricingLabel(region: BillingRegion): string {
  if (region === "IN") {
    return `India pricing: ₹${PRO_PRICE_INR}/month for entire app · Detected region: IN`;
  }
  return `International pricing: $${PRO_PRICE_USD}/month for entire app · Detected region: Global`;
}
