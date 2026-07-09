import { MOBILE_APP_STORES } from "@/config/mobile-app";

export function GooglePlayBadge({ href = MOBILE_APP_STORES.googlePlay }: { href?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block transition-transform hover:scale-[1.03] hover:opacity-95"
      aria-label="Get ANSH Visitor on Google Play"
    >
      <img
        src="/google-play-badge.png"
        alt="Get it on Google Play"
        className="h-14 w-auto"
        width={646}
        height={250}
      />
    </a>
  );
}

export function IndusAppStoreBadge({ href = MOBILE_APP_STORES.indusAppStore }: { href?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-14 items-center justify-center rounded-[7px] border border-white/20 bg-black px-4 transition-transform hover:scale-[1.03] hover:border-orange-500/35"
      aria-label="Download ANSH Visitor on Indus Appstore"
    >
      <img
        src="/indus-appstore-logo.svg"
        alt="Download on Indus Appstore"
        className="h-10 w-auto"
        width={205}
        height={97}
      />
    </a>
  );
}

export function StoreBadgeButtons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center ${className}`}>
      <GooglePlayBadge />
      <IndusAppStoreBadge />
    </div>
  );
}
