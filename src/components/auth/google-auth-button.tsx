"use client";

import { useState } from "react";
import { signInWithGoogle } from "@/lib/auth/google";
import { toast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import { ButtonLoadingSkeleton } from "@/components/ui/page-skeletons";

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

interface GoogleAuthButtonProps {
  label: string;
  disabled?: boolean;
  className?: string;
}

export function GoogleAuthButton({
  label,
  disabled = false,
  className,
}: GoogleAuthButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Could not start Google sign-in";
      toast.error("Google sign-in failed", message);
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || loading}
      className={cn(
        "flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
        className
      )}
    >
      {loading ? (
        <ButtonLoadingSkeleton className="h-4 w-40 rounded bg-slate-300/50 dark:bg-slate-600/50" />
      ) : (
        <>
          <GoogleIcon className="h-5 w-5" />
          {label}
        </>
      )}
    </button>
  );
}

export function AuthDivider() {
  return (
    <div className="relative py-1">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t border-slate-200" />
      </div>
      <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest">
        <span className="bg-white px-3 text-slate-400">or continue with email</span>
      </div>
    </div>
  );
}
