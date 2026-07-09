import type { Metadata } from "next";
import {
  COMPANY_NAME,
  COMPANY_URL,
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  GOOGLE_SITE_VERIFICATION,
  SEO_KEYWORDS,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";
import { LANDING_FAQS, LANDING_FEATURES, WHAT_VISITOR_DOES } from "@/lib/landing-seo";

type PageMetadataOptions = {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
};

export function buildSiteMetadata(options: PageMetadataOptions = {}): Metadata {
  const title = options.title ?? DEFAULT_TITLE;
  const description = options.description ?? DEFAULT_DESCRIPTION;
  const canonical = options.path ? `${SITE_URL}${options.path}` : SITE_URL;
  const noIndex = options.noIndex ?? false;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: DEFAULT_TITLE,
      template: `%s | ${SITE_NAME}`,
    },
    description,
    applicationName: SITE_NAME,
    keywords: [...SEO_KEYWORDS],
    authors: [{ name: COMPANY_NAME, url: COMPANY_URL }],
    creator: COMPANY_NAME,
    publisher: SITE_NAME,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: canonical,
      siteName: SITE_NAME,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    icons: {
      icon: "/anshFavicon.png",
    },
    ...(GOOGLE_SITE_VERIFICATION
      ? { verification: { google: GOOGLE_SITE_VERIFICATION } }
      : {}),
  };
}

export function buildPageMetadata(options: PageMetadataOptions): Metadata {
  const title = options.title ?? DEFAULT_TITLE;
  const description = options.description ?? DEFAULT_DESCRIPTION;
  const base = buildSiteMetadata({ ...options, title, description });

  return {
    ...base,
    title,
    openGraph: {
      ...base.openGraph,
      title,
      description,
    },
    twitter: {
      ...base.twitter,
      title,
      description,
    },
  };
}

/** Standalone WebSite JSON-LD — controls Google site name in SERPs. */
export function buildWebSiteNameJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    alternateName: ["ANSH Visitor App"],
    url: `${SITE_URL}/`,
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function buildLandingJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        email: "hello@anshapps.com",
        parentOrganization: {
          "@type": "Organization",
          name: COMPANY_NAME,
          url: COMPANY_URL,
        },
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: SITE_NAME,
        headline: DEFAULT_TITLE,
        description: WHAT_VISITOR_DOES,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#software` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-IN",
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/#software`,
        name: SITE_NAME,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web, Android",
        url: SITE_URL,
        description: WHAT_VISITOR_DOES,
        featureList: [...LANDING_FEATURES],
        offers: [
          {
            "@type": "Offer",
            name: "Free",
            price: "0",
            priceCurrency: "INR",
            description: "Free forever with core visitor management features",
          },
          {
            "@type": "Offer",
            name: "Pro",
            price: "299",
            priceCurrency: "INR",
            description: "Flat monthly price for entire workspace with unlimited teammates",
          },
        ],
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: LANDING_FAQS.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };
}

export function jsonLdScript(data: Record<string, unknown>) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
