"use client";

import { useEffect, useState } from "react";
import {
  PublicRegistrationForm,
  type PublicRegistrationPageData,
} from "@/components/public/public-registration-form";
import { Skeleton } from "@/components/ui/skeleton";

export default function PublicRegisterPage({ slug }: { slug: string }) {
  const [pageData, setPageData] = useState<PublicRegistrationPageData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(`/api/public/register/${slug}`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Link not found");
        }
        if (!cancelled) setPageData(data.link);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load page");
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
        <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-lg">
          <h1 className="text-lg font-bold text-slate-900">Link unavailable</h1>
          <p className="mt-2 text-sm text-slate-500">{error}</p>
        </div>
      </div>
    );
  }

  if (!pageData) {
    return (
      <div className="min-h-screen bg-slate-100 px-4 py-10">
        <div className="mx-auto max-w-xl space-y-4">
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-96 w-full rounded-3xl" />
        </div>
      </div>
    );
  }

  return <PublicRegistrationForm pageData={pageData} />;
}
