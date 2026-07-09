import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Secure Lobby & Visitor Management`,
    short_name: SITE_NAME,
    description:
      "QR visitor passes, desk check-in, ID verification, and guest logs for modern offices.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#10b981",
    icons: [
      {
        src: "/anshFavicon.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  };
}
