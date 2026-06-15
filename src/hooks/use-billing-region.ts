"use client";

import { useEffect, useState } from "react";
import type { BillingRegion } from "@/config/billing";
import { detectRegionFromCountry, getProPricing } from "@/config/billing";

interface BillingRegionState {
  region: BillingRegion;
  country: string;
  proPriceLabel: string;
  proPriceDisplay: string;
  loading: boolean;
}

export function useBillingRegion(): BillingRegionState {
  const [state, setState] = useState<BillingRegionState>({
    region: "IN",
    country: "IN",
    proPriceLabel: getProPricing("IN").label,
    proPriceDisplay: getProPricing("IN").display,
    loading: true,
  });

  useEffect(() => {
    let cancelled = false;

    fetch("/api/billing/region")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled) return;
        if (data?.region) {
          const region = data.region as BillingRegion;
          const pricing = getProPricing(region);
          setState({
            region,
            country: data.country ?? (region === "IN" ? "IN" : "US"),
            proPriceLabel: data.proPriceLabel ?? pricing.label,
            proPriceDisplay: data.proPriceDisplay ?? pricing.display,
            loading: false,
          });
          return;
        }
        throw new Error("No region data");
      })
      .catch(() => {
        if (cancelled) return;
        const fallbackRegion = detectRegionFromCountry(
          Intl.DateTimeFormat().resolvedOptions().timeZone?.includes("Kolkata")
            ? "IN"
            : null
        );
        const pricing = getProPricing(fallbackRegion);
        setState({
          region: fallbackRegion,
          country: fallbackRegion === "IN" ? "IN" : "US",
          proPriceLabel: pricing.label,
          proPriceDisplay: pricing.display,
          loading: false,
        });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
