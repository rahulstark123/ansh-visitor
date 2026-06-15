"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  getSectionFromPath,
  getSubNavForSection,
  getSectionMeta,
} from "@/config/navigation";
import { Badge } from "@/components/ui/badge";
import { useVisitorStore } from "@/stores/visitor-store";

export function SubSidebar() {
  const pathname = usePathname();
  const sectionId = getSectionFromPath(pathname);
  const subNav = getSubNavForSection(sectionId);
  const section = getSectionMeta(sectionId);
  
  const { visitors } = useVisitorStore();
  const checkedInCount = visitors.filter((v) => v.status === "CheckedIn").length;
  const expectedCount = visitors.filter((v) => v.status === "Expected").length;

  if (!subNav?.length || !section) return null;

  return (
    <aside className="flex h-full w-[220px] shrink-0 flex-col border-r border-border/50 bg-slate-50/50 dark:bg-slate-900/30 select-none">
      <div className="px-4 pb-4 pt-6">
        <div className="flex items-center gap-2">
          <section.icon
            className="h-4 w-4 text-primary"
            aria-hidden
          />
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
            {section.label}
          </p>
        </div>
        <p className="mt-1 text-xs font-medium text-slate-400">
          Views & filters
        </p>
      </div>
      <nav className="flex-1 space-y-1 px-3 pb-4">
        {subNav.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" &&
              pathname.startsWith(item.href + "/") &&
              !subNav.some((other) => other.id !== item.id && pathname.startsWith(other.href)));
          const Icon = item.icon;
          
          // Compute dynamic badge counts
          let displayBadge: string | undefined = undefined;
          if (item.id === "today-visitors") {
            displayBadge = checkedInCount > 0 ? String(checkedInCount) : undefined;
          } else if (item.id === "pre-registered") {
            displayBadge = expectedCount > 0 ? String(expectedCount) : undefined;
          }

          const itemClassName = cn(
            "flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-[13px] font-semibold transition-all duration-200 cursor-pointer",
            isActive
              ? "bg-white text-slate-950 shadow-sm ring-1 ring-slate-200 dark:bg-slate-800 dark:text-white dark:ring-slate-700"
              : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
          );

          return (
            <Link key={item.id} href={item.href} className={itemClassName}>
              <span className="flex items-center gap-2.5">
                <Icon className={cn("h-4 w-4 shrink-0 transition-opacity", isActive ? "opacity-100" : "opacity-60")} aria-hidden />
                {item.label}
              </span>
              {displayBadge && (
                <Badge
                  variant="secondary"
                  className={cn(
                    "h-5 border-0 px-2 text-[10px] font-bold rounded-full",
                    isActive ? "bg-primary text-primary-foreground" : "bg-slate-200 text-slate-650 dark:bg-slate-750 dark:text-slate-400"
                  )}
                >
                  {displayBadge}
                </Badge>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
