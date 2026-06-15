import type { RegistrationDesignTheme } from "@/config/registration-link-designs";

export type FieldStyleVariant = RegistrationDesignTheme;

export function getFieldStyles(variant: FieldStyleVariant) {
  const baseLabel = "block font-bold uppercase tracking-widest";

  switch (variant) {
    case "minimal":
      return {
        label: cn(baseLabel, "text-[11px] text-slate-400 mb-3"),
        input: "mt-0 border-0 border-b border-slate-300 rounded-none px-0 shadow-none bg-transparent focus-visible:ring-0 focus-visible:border-slate-900",
        select: "mt-0 border-0 border-b border-slate-300 rounded-none px-0 shadow-none bg-transparent focus-visible:ring-0",
        textarea:
          "mt-0 min-h-24 border-0 border-b border-slate-300 rounded-none px-0 shadow-none bg-transparent focus-visible:ring-0 resize-none",
        formSpacing: "space-y-8",
        gridSpacing: "grid gap-8 sm:grid-cols-2",
      };
    case "bold":
      return {
        label: cn(baseLabel, "text-[10px] text-emerald-400/90 mb-2"),
        input:
          "mt-2 border-slate-700 bg-slate-950/50 text-white placeholder:text-slate-500 rounded-lg",
        select:
          "mt-2 border-slate-700 bg-slate-950/50 text-white rounded-lg",
        textarea:
          "mt-2 min-h-20 border-slate-700 bg-slate-950/50 text-white placeholder:text-slate-500 rounded-lg resize-none",
        formSpacing: "space-y-5",
        gridSpacing: "grid gap-5 sm:grid-cols-2",
      };
    case "glass":
      return {
        label: cn(baseLabel, "text-[10px] text-white/80 mb-2"),
        input:
          "mt-2 border-white/30 bg-white/10 text-white placeholder:text-white/50 rounded-xl backdrop-blur-sm",
        select:
          "mt-2 border-white/30 bg-white/10 text-white rounded-xl backdrop-blur-sm",
        textarea:
          "mt-2 min-h-20 border-white/30 bg-white/10 text-white placeholder:text-white/50 rounded-xl backdrop-blur-sm resize-none",
        formSpacing: "space-y-4",
        gridSpacing: "grid gap-4 sm:grid-cols-2",
      };
    case "modern":
      return {
        label: cn(baseLabel, "text-[10px] text-slate-400 mb-2"),
        input: "mt-2 rounded-xl border-slate-200 bg-white shadow-sm",
        select: "mt-2 rounded-xl border-slate-200 bg-white shadow-sm",
        textarea:
          "mt-2 min-h-20 rounded-xl border-slate-200 bg-white shadow-sm resize-none",
        formSpacing: "space-y-4",
        gridSpacing: "grid gap-4 sm:grid-cols-2",
      };
    default:
      return {
        label: cn(baseLabel, "text-[10px] text-slate-500 mb-2"),
        input: "mt-2 rounded-xl border-slate-200 bg-white",
        select: "mt-2 rounded-xl border-slate-200 bg-white",
        textarea:
          "mt-2 min-h-20 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm resize-none",
        formSpacing: "space-y-4",
        gridSpacing: "grid gap-4 sm:grid-cols-2",
      };
  }
}

function cn(...parts: (string | false | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

export { cn };
