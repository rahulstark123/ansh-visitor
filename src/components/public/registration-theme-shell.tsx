"use client";

import type { ReactNode } from "react";
import { Building2, MapPin, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getRegistrationDesignTheme,
  type RegistrationDesignTheme,
} from "@/config/registration-link-designs";

interface ThemeShellProps {
  themeId: RegistrationDesignTheme | string;
  workspaceName: string;
  officeBranch: string;
  hostName: string;
  hostDepartment?: string;
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function RegistrationThemeShell({
  themeId,
  workspaceName,
  officeBranch,
  hostName,
  hostDepartment,
  title,
  subtitle,
  children,
  footer,
}: ThemeShellProps) {
  const theme = getRegistrationDesignTheme(themeId);
  const id = themeId as RegistrationDesignTheme;

  if (id === "modern") {
    return (
      <div className={cn("min-h-screen w-full px-4 py-8", theme.preview.page)}>
        <div className="mx-auto w-full max-w-4xl">
          <div className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-indigo-100">
            <div className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-500 px-8 py-8 text-white">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/75">
                {workspaceName}
              </p>
              <h1 className="mt-2 text-3xl font-black leading-tight">{title}</h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/90">{subtitle}</p>
            </div>
            <div className="grid md:grid-cols-5">
              <aside className="border-b border-slate-100 bg-slate-50 p-6 md:col-span-2 md:border-b-0 md:border-r">
                <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-600">
                  Visit details
                </p>
                <ul className="mt-5 space-y-4 text-sm text-slate-600">
                  <li className="flex gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
                    <span>
                      <strong className="block text-slate-900">Branch</strong>
                      {officeBranch}
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <UserRound className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
                    <span>
                      <strong className="block text-slate-900">Your host</strong>
                      {hostName}
                      {hostDepartment ? ` · ${hostDepartment}` : ""}
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
                    <span>
                      <strong className="block text-slate-900">Workspace</strong>
                      {workspaceName}
                    </span>
                  </li>
                </ul>
                <ol className="mt-8 space-y-2 border-t border-slate-200 pt-6 text-xs text-slate-500">
                  <li className="flex gap-2"><span className="font-bold text-indigo-600">1.</span> Fill in your details</li>
                  <li className="flex gap-2"><span className="font-bold text-indigo-600">2.</span> Receive your QR pass</li>
                  <li className="flex gap-2"><span className="font-bold text-indigo-600">3.</span> Show it at reception</li>
                </ol>
              </aside>
              <main className="p-6 md:col-span-3 md:p-8">{children}</main>
            </div>
          </div>
          {footer}
        </div>
      </div>
    );
  }

  if (id === "minimal") {
    return (
      <div className={cn("min-h-screen w-full", theme.preview.page)}>
        <div className="mx-auto max-w-md px-6 py-16 sm:py-20">
          <header className="mb-12 border-b border-slate-200 pb-10">
            <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-slate-400">
              {workspaceName}
            </p>
            <h1 className="mt-4 text-4xl font-light tracking-tight text-slate-900">{title}</h1>
            <p className="mt-4 text-sm leading-relaxed text-slate-500">{subtitle}</p>
            <p className="mt-6 text-xs text-slate-400">
              {officeBranch} · Host: {hostName}
            </p>
          </header>
          {children}
          {footer}
        </div>
      </div>
    );
  }

  if (id === "bold") {
    return (
      <div className={cn("min-h-screen w-full px-4 py-10 text-white", theme.preview.page)}>
        <div className="mx-auto max-w-3xl">
          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            <div className="grid md:grid-cols-5">
              <aside className="flex flex-col justify-between bg-emerald-500 p-6 text-slate-950 md:col-span-2 md:p-8">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-950/70">
                    Visitor entry
                  </p>
                  <h1 className="mt-3 text-2xl font-black leading-tight">{title}</h1>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-emerald-950/80">
                    {subtitle}
                  </p>
                </div>
                <div className="mt-8 space-y-3 rounded-xl bg-emerald-600/30 p-4 text-sm">
                  <p><span className="font-black uppercase text-[10px] tracking-wider">Branch</span><br />{officeBranch}</p>
                  <p><span className="font-black uppercase text-[10px] tracking-wider">Host</span><br />{hostName}</p>
                  <p><span className="font-black uppercase text-[10px] tracking-wider">Company</span><br />{workspaceName}</p>
                </div>
              </aside>
              <main className="p-6 md:col-span-3 md:p-8">
                <p className="mb-6 text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                  Guest registration form
                </p>
                {children}
              </main>
            </div>
          </div>
          {footer}
        </div>
      </div>
    );
  }

  if (id === "glass") {
    return (
      <div className={cn("relative min-h-screen w-full overflow-hidden px-4 py-10", theme.preview.page)}>
        <div className="pointer-events-none absolute -left-20 top-20 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-10 h-72 w-72 rounded-full bg-orange-300/30 blur-3xl" />
        <div className="relative mx-auto max-w-lg">
          <div className="mb-4 flex flex-wrap justify-center gap-2">
            <span className="rounded-full border border-white/30 bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
              {officeBranch}
            </span>
            <span className="rounded-full border border-white/30 bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
              Host: {hostName}
            </span>
          </div>
          <div className={cn("rounded-3xl p-8 text-white", theme.preview.card)}>
            <div className="mb-6 text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/70">
                {workspaceName}
              </p>
              <h1 className="mt-2 text-2xl font-black">{title}</h1>
              <p className="mt-2 text-sm leading-relaxed text-white/80">{subtitle}</p>
            </div>
            {children}
          </div>
          {footer}
        </div>
      </div>
    );
  }

  // Classic — corporate card with accent stripe
  return (
    <div className={cn("min-h-screen w-full px-4 py-10", theme.preview.page)}>
      <div className="mx-auto max-w-lg">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
          <div className="flex min-h-full">
            <div className="w-1.5 shrink-0 bg-sky-600" aria-hidden />
            <div className="flex-1 p-8">
              <div className="mb-6 border-b border-slate-100 pb-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-sky-600">
                  {workspaceName}
                </p>
                <h1 className="mt-2 text-2xl font-black text-slate-900">{title}</h1>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{subtitle}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-md bg-sky-50 px-2 py-1 text-[10px] font-semibold text-sky-700">
                    {officeBranch}
                  </span>
                  <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-600">
                    Host: {hostName}
                  </span>
                </div>
              </div>
              {children}
            </div>
          </div>
        </div>
        {footer}
      </div>
    </div>
  );
}

export function ThemePreviewThumbnail({ themeId }: { themeId: RegistrationDesignTheme }) {
  if (themeId === "modern") {
    return (
      <div className="flex h-16 overflow-hidden rounded-xl border border-indigo-100 bg-white">
        <div className="w-1/3 bg-gradient-to-br from-indigo-500 to-sky-400" />
        <div className="flex flex-1 flex-col gap-1 p-2">
          <div className="h-1.5 w-2/3 rounded bg-slate-200" />
          <div className="h-1.5 w-full rounded bg-slate-100" />
          <div className="mt-auto h-2 w-1/2 rounded bg-indigo-500" />
        </div>
      </div>
    );
  }
  if (themeId === "minimal") {
    return (
      <div className="flex h-16 flex-col justify-between rounded-xl border border-slate-200 bg-white p-2">
        <div className="h-1 w-1/2 rounded bg-slate-300" />
        <div className="space-y-1">
          <div className="h-px w-full bg-slate-200" />
          <div className="h-px w-full bg-slate-200" />
          <div className="h-px w-3/4 bg-slate-200" />
        </div>
      </div>
    );
  }
  if (themeId === "bold") {
    return (
      <div className="flex h-16 overflow-hidden rounded-xl border border-slate-700 bg-slate-900">
        <div className="w-2/5 bg-emerald-500 p-1.5">
          <div className="h-1 w-full rounded bg-emerald-900/30" />
          <div className="mt-1 h-1 w-2/3 rounded bg-emerald-900/20" />
        </div>
        <div className="flex flex-1 flex-col gap-1 p-2">
          <div className="h-1 w-full rounded bg-slate-700" />
          <div className="h-1 w-full rounded bg-slate-700" />
        </div>
      </div>
    );
  }
  if (themeId === "glass") {
    return (
      <div className="relative h-16 overflow-hidden rounded-xl bg-gradient-to-br from-violet-500 to-orange-400 p-2">
        <div className="absolute inset-2 rounded-lg border border-white/30 bg-white/25 backdrop-blur-sm" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center gap-1">
          <div className="h-1 w-8 rounded-full bg-white/60" />
          <div className="h-1 w-12 rounded-full bg-white/40" />
        </div>
      </div>
    );
  }
  return (
    <div className="flex h-16 overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="w-1 bg-sky-500" />
      <div className="flex flex-1 flex-col gap-1.5 p-2">
        <div className="h-1.5 w-1/2 rounded bg-sky-100" />
        <div className="h-1 w-full rounded bg-slate-100" />
        <div className="h-1 w-4/5 rounded bg-slate-100" />
        <div className="mt-auto h-2 rounded bg-sky-500" />
      </div>
    </div>
  );
}
