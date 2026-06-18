export type WorkspacePlanTier = "free" | "pro" | "pro_trial";
export type BillingRegion = "IN" | "INTL";
export type BillingCycle = "monthly" | "yearly";

/** Flat Pro price for the entire workspace (not per user). */
export const PRO_PRICE_INR = 299;
export const PRO_PRICE_USD = 7;

export const YEARLY_DISCOUNT_PERCENT = 19;
export const MONTHS_PER_YEAR = 12;

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

export function getYearlyTotal(monthlyAmount: number): number {
  return Math.round(
    monthlyAmount * MONTHS_PER_YEAR * (1 - YEARLY_DISCOUNT_PERCENT / 100)
  );
}

export function getYearlyMonthlyEquivalent(monthlyAmount: number): number {
  return Math.round(getYearlyTotal(monthlyAmount) / MONTHS_PER_YEAR);
}

export function getYearlySavings(monthlyAmount: number): number {
  return monthlyAmount * MONTHS_PER_YEAR - getYearlyTotal(monthlyAmount);
}

export function getProPricing(
  region: BillingRegion,
  cycle: BillingCycle = "monthly"
) {
  const monthlyAmount = region === "IN" ? PRO_PRICE_INR : PRO_PRICE_USD;
  const format = region === "IN" ? formatINR : formatUSD;
  const yearlyTotal = getYearlyTotal(monthlyAmount);
  const yearlyMonthlyEq = getYearlyMonthlyEquivalent(monthlyAmount);
  const fullYearList = monthlyAmount * MONTHS_PER_YEAR;
  const savings = getYearlySavings(monthlyAmount);

  const shared = {
    region,
    currency: (region === "IN" ? "INR" : "USD") as "INR" | "USD",
    monthlyAmount,
    monthlyDisplay: format(monthlyAmount),
    yearlyTotal,
    yearlyTotalDisplay: format(yearlyTotal),
    yearlyMonthlyEquivalent: yearlyMonthlyEq,
    yearlyMonthlyEquivalentDisplay: format(yearlyMonthlyEq),
    fullYearListPrice: fullYearList,
    fullYearListPriceDisplay: format(fullYearList),
    savingsAmount: savings,
    savingsAmountDisplay: format(savings),
    savingsPercent: YEARLY_DISCOUNT_PERCENT,
  };

  if (cycle === "yearly") {
    return {
      ...shared,
      cycle,
      amount: yearlyTotal,
      amountMinor: yearlyTotal * 100,
      display: format(yearlyTotal),
      period: "/ year",
      label: `${format(yearlyTotal)}/year for entire app (save ${YEARLY_DISCOUNT_PERCENT}%)`,
    };
  }

  return {
    ...shared,
    cycle,
    amount: monthlyAmount,
    amountMinor:
      region === "IN" ? PRO_PRICE_INR_PAISA : PRO_PRICE_USD_CENTS,
    display: format(monthlyAmount),
    period: "/ month",
    label: `${format(monthlyAmount)}/month for entire app`,
  };
}

export function formatProPrice(
  region: BillingRegion,
  cycle: BillingCycle = "monthly"
): string {
  const pricing = getProPricing(region, cycle);
  return `${pricing.display}${pricing.period}`;
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

export function getRegionPricingLabel(
  region: BillingRegion,
  cycle: BillingCycle = "monthly"
): string {
  const pricing = getProPricing(region, cycle);
  if (region === "IN") {
    if (cycle === "yearly") {
      return `India pricing: ${pricing.display}/year (${pricing.yearlyMonthlyEquivalentDisplay}/mo · save ${YEARLY_DISCOUNT_PERCENT}%) · Detected region: IN`;
    }
    return `India pricing: ${pricing.monthlyDisplay}/month for entire app · Yearly ${pricing.yearlyTotalDisplay} (save ${YEARLY_DISCOUNT_PERCENT}%) · Detected region: IN`;
  }
  if (cycle === "yearly") {
    return `International pricing: ${pricing.display}/year (${pricing.yearlyMonthlyEquivalentDisplay}/mo · save ${YEARLY_DISCOUNT_PERCENT}%) · Detected region: Global`;
  }
  return `International pricing: ${pricing.monthlyDisplay}/month for entire app · Yearly ${pricing.yearlyTotalDisplay} (save ${YEARLY_DISCOUNT_PERCENT}%) · Detected region: Global`;
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


export function getSubscriptionPeriodDays(cycle: BillingCycle): number {
  return cycle === "yearly" ? 365 : 30;
}
