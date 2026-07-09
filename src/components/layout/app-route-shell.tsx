"use client";

import { AppShell } from "@/components/layout/app-shell";

export function AppRouteShell({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
