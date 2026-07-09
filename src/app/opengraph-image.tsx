import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

export const runtime = "edge";
export const alt = `${SITE_NAME} — Secure Lobby & Visitor Management`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px",
          background: "linear-gradient(135deg, #022c22 0%, #0f172a 55%, #042f2e 100%)",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: "#34d399",
            marginBottom: 24,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          visitor.anshapps.com
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            lineHeight: 1.05,
            marginBottom: 28,
            color: "#ffffff",
          }}
        >
          {SITE_NAME}
        </div>
        <div
          style={{
            fontSize: 34,
            fontWeight: 600,
            lineHeight: 1.35,
            color: "#cbd5e1",
            maxWidth: 900,
          }}
        >
          Secure lobby management with QR passes, desk check-in, and visitor logs for MSME teams.
        </div>
      </div>
    ),
    { ...size },
  );
}
