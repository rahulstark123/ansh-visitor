import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/signup", "/login", "/privacy", "/terms"],
      disallow: [
        "/api/",
        "/dashboard",
        "/dashboard/",
        "/settings/",
        "/adminpanel",
        "/adminpanel/",
        "/visitors/",
        "/team/",
        "/reports/",
        "/help/",
        "/onboarding/",
        "/our-apps/",
        "/register/",
        "/auth/",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
