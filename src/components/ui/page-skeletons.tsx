import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PageHeaderSkeleton({
  action = false,
}: {
  action?: boolean;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="space-y-3">
        <Skeleton className="h-3 w-28 rounded-full" />
        <Skeleton className="h-8 w-56 max-w-full rounded-xl" />
        <Skeleton className="h-4 w-80 max-w-full rounded-lg" />
      </div>
      {action && <Skeleton className="h-10 w-36 shrink-0 rounded-full" />}
    </div>
  );
}

export function StatsCardsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="crm-card border border-border/40">
          <CardContent className="space-y-4 p-6">
            <div className="flex items-center justify-between">
              <Skeleton className="h-3 w-28 rounded" />
              <Skeleton className="h-8 w-8 rounded-xl" />
            </div>
            <Skeleton className="h-8 w-20 rounded-lg" />
            <Skeleton className="h-3 w-36 rounded" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function ChartSkeleton({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="mb-4 flex items-end justify-between gap-2 px-1">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton
            key={i}
            className="w-full rounded-t-md"
            style={{ height: `${48 + (i % 3) * 28}px` }}
          />
        ))}
      </div>
      <div className="flex justify-between px-1">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-2 w-8 rounded" />
        ))}
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <Card className="crm-card">
      <CardContent className="p-0">
        <div className="space-y-0 border-b border-border/40 px-6 py-4">
          <div className="flex gap-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-3 w-20 rounded" />
            ))}
          </div>
        </div>
        <div className="divide-y divide-border/40">
          {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className="flex items-center gap-6 px-6 py-4">
              <div className="min-w-0 flex-1 space-y-2">
                <Skeleton className="h-4 w-36 rounded" />
                <Skeleton className="h-3 w-48 rounded" />
              </div>
              <Skeleton className="h-4 w-16 rounded" />
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-4 w-28 rounded" />
              <Skeleton className="h-8 w-20 rounded-lg" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function FilterBarSkeleton() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <Skeleton className="h-10 flex-1 rounded-lg" />
      <Skeleton className="h-10 w-full rounded-lg sm:w-44" />
      <Skeleton className="h-10 w-full rounded-lg sm:w-44" />
    </div>
  );
}

export function DashboardPageSkeleton() {
  return (
    <div className="space-y-8">
      <PageHeaderSkeleton action />
      <StatsCardsSkeleton />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="crm-card lg:col-span-2">
          <CardContent className="space-y-4 p-6">
            <Skeleton className="h-5 w-40 rounded" />
            <Skeleton className="h-3 w-56 rounded" />
            <ChartSkeleton className="pt-2" />
          </CardContent>
        </Card>
        <Card className="crm-card">
          <CardContent className="space-y-4 p-6">
            <Skeleton className="h-5 w-32 rounded" />
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between gap-3">
                <Skeleton className="h-3 w-20 rounded" />
                <Skeleton className="h-2 flex-1 rounded-full" />
                <Skeleton className="h-3 w-8 rounded" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      <Card className="crm-card">
        <CardContent className="space-y-4 p-6">
          <Skeleton className="h-5 w-44 rounded" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-40 rounded" />
                  <Skeleton className="h-3 w-28 rounded" />
                </div>
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function TablePageSkeleton() {
  return (
    <div className="space-y-6">
      <PageHeaderSkeleton action />
      <FilterBarSkeleton />
      <TableSkeleton />
    </div>
  );
}

export function SettingsPageSkeleton() {
  return (
    <div className="space-y-8">
      <PageHeaderSkeleton />
      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <Card className="crm-card h-fit">
          <CardContent className="space-y-2 p-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-9 w-full rounded-lg" />
            ))}
          </CardContent>
        </Card>
        <Card className="crm-card">
          <CardContent className="space-y-6 p-6">
            <Skeleton className="h-6 w-48 rounded" />
            <div className="grid gap-4 sm:grid-cols-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-3 w-24 rounded" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
              ))}
            </div>
            <Skeleton className="h-10 w-32 rounded-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function BillingPageSkeleton() {
  return (
    <div className="space-y-8">
      <PageHeaderSkeleton action />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="crm-card lg:col-span-2">
          <CardContent className="space-y-6 p-6">
            <Skeleton className="h-6 w-40 rounded" />
            <Skeleton className="h-24 w-full rounded-2xl" />
            <Skeleton className="h-40 w-full rounded-xl" />
          </CardContent>
        </Card>
        <div className="space-y-6">
          <Card className="crm-card">
            <CardContent className="space-y-4 p-6">
              <Skeleton className="mx-auto h-14 w-14 rounded-2xl" />
              <Skeleton className="mx-auto h-5 w-32 rounded" />
              <Skeleton className="h-9 w-full rounded-full" />
            </CardContent>
          </Card>
          <Card className="crm-card">
            <CardContent className="space-y-4 p-6">
              <Skeleton className="mx-auto h-14 w-14 rounded-2xl" />
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-10 w-full rounded-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export function MyLinkPageSkeleton() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <PageHeaderSkeleton />
      <div className="grid gap-8 xl:grid-cols-2">
        <Card className="crm-card overflow-hidden">
          <div className="border-b border-border/40 px-6 py-4">
            <Skeleton className="h-4 w-36 rounded" />
          </div>
          <CardContent className="space-y-6 pt-6">
            <div className="rounded-2xl border border-sky-200/40 bg-sky-50/40 p-4 dark:border-sky-900/30 dark:bg-sky-950/10">
              <div className="flex gap-3">
                <Skeleton className="h-4 w-4 shrink-0 rounded" />
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-3 w-28 rounded" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                  <Skeleton className="h-3 w-full max-w-xs rounded" />
                  <div className="flex flex-wrap gap-2 pt-1">
                    <Skeleton className="h-8 w-24 rounded-lg" />
                    <Skeleton className="h-8 w-32 rounded-lg" />
                    <Skeleton className="h-8 w-20 rounded-lg" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-56 rounded" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[0, 1].map((i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-3 w-20 rounded" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <Skeleton className="h-3 w-28 rounded" />
              <Skeleton className="h-20 w-full rounded-lg" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-3 w-24 rounded" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>

            <div className="space-y-3">
              <Skeleton className="h-3 w-32 rounded" />
              <div className="grid gap-3 sm:grid-cols-2">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-20 w-full rounded-2xl" />
                ))}
              </div>
            </div>

            <div className="space-y-3 rounded-2xl border border-border/60 p-4">
              <Skeleton className="h-3 w-32 rounded" />
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between gap-3">
                  <Skeleton className="h-4 w-28 rounded" />
                  <Skeleton className="h-4 w-4 rounded" />
                </div>
              ))}
            </div>

            <Skeleton className="h-11 w-full rounded-xl" />
          </CardContent>
        </Card>

        <div className="overflow-hidden rounded-3xl border border-border/60">
          <div className="border-b border-border/50 bg-slate-50/80 px-4 py-3 dark:bg-slate-900/50">
            <Skeleton className="h-3 w-24 rounded" />
          </div>
          <div className="space-y-4 bg-slate-100 p-6 dark:bg-slate-900/30">
            <Skeleton className="mx-auto h-3 w-20 rounded" />
            <Skeleton className="mx-auto h-7 w-48 rounded-lg" />
            <Skeleton className="mx-auto h-4 w-64 max-w-full rounded" />
            <div className="mx-auto mt-4 max-w-sm space-y-4 rounded-2xl border border-border/40 bg-white p-6 dark:bg-card">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-3 w-24 rounded" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
              ))}
              <Skeleton className="h-11 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HelpPageSkeleton() {
  return (
    <div className="space-y-8">
      <PageHeaderSkeleton />
      <div className="flex gap-2">
        <Skeleton className="h-10 w-36 rounded-full" />
        <Skeleton className="h-10 w-40 rounded-full" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="crm-card">
            <CardContent className="space-y-3 p-5">
              <Skeleton className="h-10 w-10 rounded-xl" />
              <Skeleton className="h-5 w-3/4 rounded" />
              <Skeleton className="h-3 w-full rounded" />
              <Skeleton className="h-3 w-5/6 rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function AppShellSkeleton() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <aside className="flex h-full w-[72px] shrink-0 flex-col items-center gap-3 border-r border-border/50 bg-slate-50/80 p-3 dark:bg-slate-900/40">
        <Skeleton className="h-10 w-10 rounded-xl" />
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-10 rounded-xl" />
        ))}
      </aside>
      <aside className="flex h-full w-[220px] shrink-0 flex-col border-r border-border/50 bg-slate-50/50 p-4 dark:bg-slate-900/30">
        <Skeleton className="mb-6 h-5 w-32 rounded" />
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-full rounded-lg" />
          ))}
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <div className="flex h-16 items-center justify-between border-b border-border/50 px-6">
          <Skeleton className="h-9 w-64 max-w-[40vw] rounded-lg" />
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-24 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-xl" />
            <Skeleton className="h-10 w-32 rounded-xl" />
          </div>
        </div>
        <main className="mesh-gradient min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-7xl p-6 md:p-10 lg:p-12">
            <DashboardPageSkeleton />
          </div>
        </main>
      </div>
    </div>
  );
}

export function ProcessingOverlaySkeleton({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-sm rounded-3xl border border-white/[0.08] bg-slate-950/90 p-8 shadow-2xl backdrop-blur-xl animate-in zoom-in-95 duration-200">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10">
          <Skeleton className="h-8 w-8 rounded-lg bg-emerald-500/20" />
        </div>
        <Skeleton className="mx-auto mb-3 h-5 w-40 rounded bg-slate-700/80" />
        <Skeleton className="mx-auto mb-2 h-3 w-56 rounded bg-slate-800/80" />
        <Skeleton className="mx-auto h-3 w-44 rounded bg-slate-800/60" />
        <p className="sr-only">{title}</p>
        <p className="sr-only">{description}</p>
      </div>
    </div>
  );
}

export function ScannerSkeleton() {
  return (
    <div className="flex min-h-[240px] w-full flex-col items-center justify-center gap-4 rounded-lg border border-border/40 bg-slate-950/90 p-6">
      <Skeleton className="h-44 w-44 rounded-xl bg-slate-800/90" />
      <Skeleton className="h-3 w-36 rounded bg-slate-800/80" />
      <Skeleton className="h-2.5 w-48 rounded bg-slate-800/60" />
    </div>
  );
}

export function AuthFormSkeleton() {
  return (
    <div className="w-full max-w-[420px] space-y-6 rounded-[2rem] border border-white/5 bg-slate-950/80 p-10 shadow-2xl backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10">
        <Skeleton className="h-10 w-10 rounded-xl bg-emerald-500/20" />
      </div>
      <div className="space-y-3 text-center">
        <Skeleton className="mx-auto h-6 w-48 rounded bg-slate-800/90" />
        <Skeleton className="mx-auto h-4 w-56 rounded bg-slate-800/70" />
      </div>
      <div className="space-y-3 pt-2">
        <Skeleton className="h-10 w-full rounded-xl bg-slate-800/80" />
        <Skeleton className="h-10 w-full rounded-xl bg-slate-800/70" />
        <Skeleton className="h-11 w-full rounded-xl bg-emerald-500/20" />
      </div>
    </div>
  );
}

export function PassPreviewSkeleton() {
  return (
    <div className="w-full max-w-[270px] space-y-4 rounded-2xl border border-border/40 bg-card p-5 shadow-lg">
      <div className="space-y-2 text-center">
        <Skeleton className="mx-auto h-2 w-24 rounded" />
        <Skeleton className="mx-auto h-3 w-32 rounded" />
      </div>
      <Skeleton className="mx-auto h-32 w-32 rounded-xl" />
      <div className="space-y-2 text-center">
        <Skeleton className="mx-auto h-5 w-28 rounded-full" />
        <Skeleton className="mx-auto h-4 w-36 rounded" />
        <Skeleton className="mx-auto h-3 w-40 rounded" />
      </div>
      <Skeleton className="mx-auto h-4 w-32 rounded-full" />
    </div>
  );
}

export function ButtonLoadingSkeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <Skeleton
      className={className ?? "mx-auto h-3.5 w-24 rounded bg-primary-foreground/30"}
    />
  );
}

export function InlineTextSkeleton({
  className,
}: {
  className?: string;
}) {
  return <Skeleton className={className ?? "inline-block h-4 w-16 rounded align-middle"} />;
}
