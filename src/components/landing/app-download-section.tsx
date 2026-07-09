"use client";

import { StoreBadgeButtons } from "@/components/landing/store-badge-buttons";

export function AppDownloadSection() {
  return (
    <section
      id="download"
      className="border-y border-slate-700/40 bg-slate-950 py-14"
    >
      <div className="container mx-auto px-6 text-center">
        <p className="text-xs font-black uppercase tracking-widest text-emerald-400">
          Now live on mobile
        </p>
        <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
          ANSH Visitor is on Android
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm font-medium text-slate-400">
          Download the app from Google Play or Indus Appstore.
        </p>
        <div className="mt-6 flex justify-center">
          <StoreBadgeButtons className="justify-center" />
        </div>
      </div>
    </section>
  );
}
