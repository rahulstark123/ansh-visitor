"use client";

/**
 * Lightweight Toast System
 * Usage: import { toast } from "@/components/ui/toast"
 *   toast.success("Done!")
 *   toast.error("Something went wrong")
 *   toast.info("FYI...")
 *   toast.warning("Be careful")
 *
 * Mount <Toaster /> once in the root layout or providers.
 */

import { useEffect, useState, useCallback } from "react";
import { CheckCircle2, XCircle, Info, AlertTriangle, X } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────
type ToastType = "success" | "error" | "info" | "warning";

interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
}

// ─── Global event bus (no context needed) ─────────────────────────────────────
type Listener = (item: ToastItem) => void;
const listeners: Listener[] = [];

function emit(item: ToastItem) {
  listeners.forEach((fn) => fn(item));
}

function makeId() {
  return Math.random().toString(36).slice(2, 9);
}

// ─── Public API ───────────────────────────────────────────────────────────────
export const toast = {
  success(title: string, description?: string) {
    emit({ id: makeId(), type: "success", title, description });
  },
  error(title: string, description?: string) {
    emit({ id: makeId(), type: "error", title, description });
  },
  info(title: string, description?: string) {
    emit({ id: makeId(), type: "info", title, description });
  },
  warning(title: string, description?: string) {
    emit({ id: makeId(), type: "warning", title, description });
  },
};

// ─── Config per type ─────────────────────────────────────────────────────────
const CONFIG: Record<
  ToastType,
  { icon: React.ReactNode; bar: string; bg: string; border: string; title: string }
> = {
  success: {
    icon: <CheckCircle2 className="h-4 w-4 shrink-0" />,
    bar: "bg-emerald-500",
    bg: "bg-white dark:bg-slate-900",
    border: "border-emerald-500/30",
    title: "text-emerald-700 dark:text-emerald-400",
  },
  error: {
    icon: <XCircle className="h-4 w-4 shrink-0" />,
    bar: "bg-rose-500",
    bg: "bg-white dark:bg-slate-900",
    border: "border-rose-500/30",
    title: "text-rose-700 dark:text-rose-400",
  },
  info: {
    icon: <Info className="h-4 w-4 shrink-0" />,
    bar: "bg-blue-500",
    bg: "bg-white dark:bg-slate-900",
    border: "border-blue-500/30",
    title: "text-blue-700 dark:text-blue-400",
  },
  warning: {
    icon: <AlertTriangle className="h-4 w-4 shrink-0" />,
    bar: "bg-amber-500",
    bg: "bg-white dark:bg-slate-900",
    border: "border-amber-500/30",
    title: "text-amber-700 dark:text-amber-400",
  },
};

const AUTO_DISMISS_MS = 4500;

// ─── Single toast card ────────────────────────────────────────────────────────
function ToastCard({ item, onDismiss }: { item: ToastItem; onDismiss: (id: string) => void }) {
  const [visible, setVisible] = useState(false);
  const cfg = CONFIG[item.type];

  // Animate in
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  // Auto-dismiss
  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onDismiss(item.id), 300);
    }, AUTO_DISMISS_MS);
    return () => clearTimeout(t);
  }, [item.id, onDismiss]);

  const dismiss = () => {
    setVisible(false);
    setTimeout(() => onDismiss(item.id), 300);
  };

  return (
    <div
      className={cn(
        "relative flex w-full max-w-sm overflow-hidden rounded-xl border shadow-xl shadow-black/10 backdrop-blur-sm transition-all duration-300",
        cfg.bg,
        cfg.border,
        visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-95"
      )}
    >
      {/* Left accent bar */}
      <div className={cn("w-1 shrink-0 rounded-l-xl", cfg.bar)} />

      {/* Content */}
      <div className="flex flex-1 items-start gap-3 px-4 py-3.5">
        <span className={cn("mt-0.5", cfg.title)}>{cfg.icon}</span>
        <div className="flex-1 min-w-0">
          <p className={cn("text-sm font-bold leading-tight", cfg.title)}>{item.title}</p>
          {item.description && (
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 leading-snug">
              {item.description}
            </p>
          )}
        </div>
        <button
          onClick={dismiss}
          className="mt-0.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer shrink-0 transition-colors"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Progress bar */}
      <div
        className={cn("absolute bottom-0 left-1 right-0 h-0.5 origin-left rounded-full opacity-40", cfg.bar)}
        style={{
          animation: `shrink ${AUTO_DISMISS_MS}ms linear forwards`,
        }}
      />

      <style>{`
        @keyframes shrink {
          from { transform: scaleX(1); }
          to   { transform: scaleX(0); }
        }
      `}</style>
    </div>
  );
}

// ─── Toaster — mount this once in your layout ─────────────────────────────────
export function Toaster() {
  const [items, setItems] = useState<ToastItem[]>([]);

  const addItem = useCallback((item: ToastItem) => {
    setItems((prev) => [...prev.slice(-4), item]); // max 5 at once
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  useEffect(() => {
    listeners.push(addItem);
    return () => {
      const idx = listeners.indexOf(addItem);
      if (idx > -1) listeners.splice(idx, 1);
    };
  }, [addItem]);

  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2.5 items-end pointer-events-none">
      {items.map((item) => (
        <div key={item.id} className="pointer-events-auto w-full max-w-sm">
          <ToastCard item={item} onDismiss={removeItem} />
        </div>
      ))}
    </div>
  );
}
