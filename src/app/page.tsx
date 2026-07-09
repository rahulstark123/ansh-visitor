import { LandingPageClient } from "@/components/landing/landing-page-client";
import { LandingSeoContent } from "@/components/landing/landing-seo-content";
import {
  buildLandingJsonLd,
  buildWebSiteNameJsonLd,
  buildPageMetadata,
  jsonLdScript,
} from "@/lib/seo";

export const metadata = buildPageMetadata({ path: "/" });

export default function LandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(buildWebSiteNameJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(buildLandingJsonLd()) }}
      />
      <LandingSeoContent />
      <LandingPageClient />
    </>
  );
}
