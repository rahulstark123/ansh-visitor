"use client";

import { useState } from "react";
import { PageHeader } from "@/components/crm/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { HELP_GUIDES } from "@/config/help-guides";
import { cn } from "@/lib/utils";
import { FileText, HelpCircle, ArrowRight } from "lucide-react";
import type { HelpGuide } from "@/config/help-guides";

export function InteractiveGuides() {
  const [activeGuide, setActiveGuide] = useState<HelpGuide | null>(null);

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        {HELP_GUIDES.map((guide) => {
          const Icon = guide.icon;
          return (
            <Card
              key={guide.id}
              className="crm-card group hover:border-sky-300/60 dark:hover:border-sky-700/50 transition-all duration-200"
            >
              <CardContent className="p-6 flex flex-col h-full min-h-[200px]">
                <div className="flex items-start gap-4 mb-4">
                  <span
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
                      guide.iconClass
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                      {guide.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                      {guide.description}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveGuide(guide)}
                  className="mt-auto inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors cursor-pointer w-fit"
                >
                  Launch Interactive Guide
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Dialog
        open={activeGuide !== null}
        onOpenChange={(open) => {
          if (!open) setActiveGuide(null);
        }}
      >
        <DialogContent className="sm:max-w-[520px] rounded-2xl">
          {activeGuide && (
            <>
              <DialogHeader>
                <DialogTitle className="text-lg font-bold pr-8">
                  {activeGuide.title}
                </DialogTitle>
                <DialogDescription className="text-sm leading-relaxed">
                  {activeGuide.description}
                </DialogDescription>
              </DialogHeader>
              <ol className="space-y-3 mt-2">
                {activeGuide.steps.map((step, i) => (
                  <li
                    key={step}
                    className="flex gap-3 text-sm text-slate-600 dark:text-slate-300"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-500/10 text-sky-600 text-xs font-bold">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export function HelpTabBar({
  activeTab,
  onTabChange,
}: {
  activeTab: "guides" | "tickets";
  onTabChange: (tab: "guides" | "tickets") => void;
}) {
  return (
    <div className="flex gap-8 border-b border-border/60">
      <button
        type="button"
        onClick={() => onTabChange("guides")}
        className={cn(
          "flex items-center gap-2 pb-3 text-xs font-black uppercase tracking-wider transition-colors cursor-pointer border-b-2 -mb-px",
          activeTab === "guides"
            ? "border-sky-500 text-sky-600 dark:text-sky-400"
            : "border-transparent text-slate-400 hover:text-slate-600"
        )}
      >
        <FileText className="h-4 w-4" />
        Interactive Guides
      </button>
      <button
        type="button"
        onClick={() => onTabChange("tickets")}
        className={cn(
          "flex items-center gap-2 pb-3 text-xs font-black uppercase tracking-wider transition-colors cursor-pointer border-b-2 -mb-px",
          activeTab === "tickets"
            ? "border-sky-500 text-sky-600 dark:text-sky-400"
            : "border-transparent text-slate-400 hover:text-slate-600"
        )}
      >
        <HelpCircle className="h-4 w-4" />
        Support Ticket Desk
      </button>
    </div>
  );
}
