import { NextRequest, NextResponse } from "next/server";
import {
  detectRegionFromCountry,
  getProPricing,
} from "@/config/billing";

function getCountryFromRequest(req: NextRequest): string | null {
  return (
    req.headers.get("x-vercel-ip-country") ||
    req.headers.get("cf-ipcountry") ||
    req.headers.get("x-country-code") ||
    null
  );
}

export async function GET(req: NextRequest) {
  const country = getCountryFromRequest(req);
  const region = detectRegionFromCountry(country);
  const pricing = getProPricing(region);

  return NextResponse.json({
    country: country ?? (region === "IN" ? "IN" : "US"),
    region,
    currency: pricing.currency,
    proPrice: pricing.amount,
    proPriceDisplay: pricing.display,
    proPriceLabel: pricing.label,
  });
}
