"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Search, ChevronDown, LogOut, User, UsersRound, UserCheck, Settings, Loader2, BarChart3 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createSupabaseClient } from "@/lib/supabase";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useVisitorStore } from "@/stores/visitor-store";

export function AppHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const { currentUser, plan } = useVisitorStore();

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<any>(null);

  const handleMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsOpen(false);
    }, 150);
    setHoverTimeout(timeout);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, [hoverTimeout]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    const supabase = createSupabaseClient();
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  // Compute a human-readable title based on current path
  const getPageTitle = () => {
    if (pathname.startsWith("/dashboard")) return "Lobby Dashboard";
    if (pathname.startsWith("/visitors")) return "Visitors Management";
    if (pathname.startsWith("/check-in")) return "Self-Serve Lobby Kiosk";
    if (pathname.startsWith("/reports")) return "Audits & Log Reports";
    if (pathname.startsWith("/settings")) return "Workspace Customizer";
    return "Workspace";
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center border-b border-border/50 bg-background/80 px-6 backdrop-blur-xl gap-4">
      {/* Title */}
      <div className="flex items-center gap-2.5">
        <h2 className="text-sm font-extrabold tracking-tight text-slate-800 dark:text-white uppercase">
          {getPageTitle()}
        </h2>
      </div>

      <div className="flex-1" />

      {/* Action Toolbar */}
      <div className="flex shrink-0 items-center gap-3">
        {/* Plan Badge */}
        <Link
          href="/settings/profile"
          className="hidden sm:inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-450 px-2.5 py-1 text-[9px] font-black uppercase tracking-widest transition-colors hover:opacity-90"
          title="View plan details"
        >
          {plan.name}
        </Link>

        {/* User profile Dropdown */}
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white py-1 pl-1 pr-3 shadow-sm transition-all hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
          >
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src="/logoAnshapps.png" alt={currentUser.name} className="object-cover" />
              <AvatarFallback className="rounded-lg bg-primary text-[11px] font-bold text-primary-foreground">
                {currentUser.avatarInitials}
              </AvatarFallback>
            </Avatar>
            <div className="hidden min-w-0 flex-col text-left sm:flex">
              <p className="truncate text-sm font-bold text-slate-900 dark:text-white max-w-[120px]">
                {currentUser.name}
              </p>
              <p className="truncate text-[10px] font-bold uppercase tracking-wider text-primary">
                {currentUser.role}
              </p>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400 shrink-0" />
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            sideOffset={8} 
            className="w-56 bg-card/95 dark:bg-slate-950/95 shadow-2xl backdrop-blur-md border border-border dark:border-slate-800 p-1.5 space-y-0.5 select-none animate-in fade-in slide-in-from-top-1 duration-150"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* User Details info */}
            <div className="px-2.5 py-2 flex items-center gap-2.5 border-b border-border/40 mb-1">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-[11px] font-bold text-primary-foreground">
                {currentUser.avatarInitials}
              </span>
              <div className="min-w-0 flex-1">
                <span className="block truncate text-xs font-bold text-slate-900 dark:text-white leading-tight">
                  {currentUser.name}
                </span>
                <span className="block truncate text-[10px] font-bold uppercase tracking-wider text-primary leading-none mt-0.5">
                  {currentUser.role} · {currentUser.department}
                </span>
              </div>
            </div>

            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-[9px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 px-2.5 py-1 block">
                Shortcuts
              </DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => router.push("/visitors")}
                className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-350 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-all cursor-pointer outline-none"
              >
                <UsersRound className="h-4 w-4 text-slate-400 shrink-0" />
                <span className="font-semibold">Visitors Log</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.push("/check-in")}
                className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-350 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-all cursor-pointer outline-none"
              >
                <UserCheck className="h-4 w-4 text-slate-400 shrink-0" />
                <span className="font-semibold">Lobby Kiosk</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.push("/reports")}
                className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-350 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-all cursor-pointer outline-none"
              >
                <BarChart3 className="h-4 w-4 text-slate-400 shrink-0" />
                <span className="font-semibold">Reports & Logs</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.push("/settings/profile")}
                className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-350 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-all cursor-pointer outline-none"
              >
                <Settings className="h-4 w-4 text-slate-400 shrink-0" />
                <span className="font-semibold">Account Settings</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="bg-border/40 dark:bg-slate-800/50 my-1" />

            <DropdownMenuItem
              onClick={handleLogout}
              className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs transition-all text-rose-500 hover:bg-rose-500/10 cursor-pointer outline-none font-bold"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              <span>Log out Session</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Standalone Logout Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLogout}
          className="h-10 w-10 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-500/10 dark:text-slate-400 dark:hover:bg-rose-950/30 transition-colors"
          title="Log out"
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>

      {/* Premium logout transition overlay */}
      {isLoggingOut && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-3xl border border-white/[0.08] bg-slate-950/90 p-8 text-center shadow-2xl backdrop-blur-xl animate-in zoom-in-95 duration-200 text-slate-200">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-500 mx-auto mb-4" />
            <h3 className="text-base font-bold text-white mb-2">Signing Out</h3>
            <p className="text-xs text-slate-500">Securing your session logs...</p>
          </div>
        </div>
      )}
    </header>
  );
}
