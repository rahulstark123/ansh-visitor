"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useVisitorStore, type Visitor } from "@/stores/visitor-store";
import { isQrValid } from "@/lib/qr-validity";
import { ButtonLoadingSkeleton } from "@/components/ui/page-skeletons";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Scan,
  CheckCircle2,
  Camera,
  KeyRound,
  AlertCircle,
  LogIn,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const QRScanner = dynamic(
  () => import("@/components/crm/qr-scanner").then((m) => m.QRScanner),
  { ssr: false, loading: () => null }
);

export type GuestVerifyMode = "check-in" | "check-out";

type ScanTab = "camera" | "passcode";

interface GuestVerifyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: GuestVerifyMode;
}

function matchesVisitorQuery(v: Visitor, query: string) {
  return (
    v.qrCode?.toLowerCase() === query ||
    v.name.toLowerCase().includes(query) ||
    v.phone.replace(/\s/g, "").includes(query.replace(/\s/g, ""))
  );
}

export function GuestVerifyModal({
  open,
  onOpenChange,
  mode,
}: GuestVerifyModalProps) {
  const { visitors, checkInVisitor, checkOutVisitor } = useVisitorStore();
  const [scanTab, setScanTab] = useState<ScanTab>("camera");
  const [passcodeInput, setPasscodeInput] = useState("");
  const [scannedVisitor, setScannedVisitor] = useState<Visitor | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);

  const isCheckIn = mode === "check-in";

  useEffect(() => {
    if (open && scanTab === "camera") {
      setCameraActive(true);
    } else {
      setCameraActive(false);
    }
  }, [open, scanTab]);

  useEffect(() => {
    if (!open) {
      setScanTab("camera");
      setPasscodeInput("");
      setScannedVisitor(null);
      setScanError(null);
      setVerifying(false);
      setCameraActive(false);
    }
  }, [open]);

  useEffect(() => {
    if (scannedVisitor) {
      const timer = setTimeout(() => {
        setScannedVisitor(null);
        setScanError(null);
        onOpenChange(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [scannedVisitor, onOpenChange]);

  const handleVerify = useCallback(
    async (code: string) => {
      if (!code.trim() || verifying) return;
      setVerifying(true);
      setScanError(null);
      setScannedVisitor(null);

      const query = code.trim().toLowerCase();

      if (isCheckIn) {
        const expiredVisitor = visitors.find(
          (v) => matchesVisitorQuery(v, query) && !isQrValid(v.qrValidUntil)
        );
        if (expiredVisitor) {
          setScanError(
            "This QR pass has expired. Please register the guest again."
          );
          setVerifying(false);
          return;
        }

        const alreadyIn = visitors.find(
          (v) => matchesVisitorQuery(v, query) && v.status === "CheckedIn"
        );
        if (alreadyIn) {
          setScanError(`${alreadyIn.name} is already checked in.`);
          setVerifying(false);
          return;
        }

        const visitor = visitors.find(
          (v) =>
            matchesVisitorQuery(v, query) &&
            isQrValid(v.qrValidUntil) &&
            (v.status === "Expected" || v.status === "CheckedOut")
        );

        if (!visitor) {
          setScanError(
            "No matching guest found for check-in. Please try again."
          );
          setVerifying(false);
          return;
        }

        try {
          await checkInVisitor(visitor.id);
          setScannedVisitor({
            ...visitor,
            status: "CheckedIn",
            checkedInAt: new Date().toISOString(),
            badgeNumber:
              visitor.badgeNumber ||
              `BADGE-${Math.floor(100 + Math.random() * 900)}`,
          });
          setPasscodeInput("");
          setCameraActive(false);
        } catch {
          setScanError("Check-in failed. Please try again.");
        } finally {
          setVerifying(false);
        }
        return;
      }

      // Check-out flow
      const visitor = visitors.find(
        (v) => matchesVisitorQuery(v, query) && v.status === "CheckedIn"
      );

      if (!visitor) {
        const matched = visitors.find((v) => matchesVisitorQuery(v, query));
        if (matched) {
          setScanError(
            matched.status === "CheckedOut"
              ? `${matched.name} is already checked out.`
              : `${matched.name} is not checked in yet.`
          );
        } else {
          setScanError(
            "No checked-in guest found for this passcode. Please try again."
          );
        }
        setVerifying(false);
        return;
      }

      try {
        await checkOutVisitor(visitor.id);
        setScannedVisitor({
          ...visitor,
          status: "CheckedOut",
          checkedOutAt: new Date().toISOString(),
        });
        setPasscodeInput("");
        setCameraActive(false);
      } catch {
        setScanError("Check-out failed. Please try again.");
      } finally {
        setVerifying(false);
      }
    },
    [visitors, verifying, checkInVisitor, checkOutVisitor, isCheckIn]
  );

  const handleQRScan = useCallback(
    (code: string) => {
      if (!verifying && !scannedVisitor) {
        handleVerify(code);
      }
    },
    [handleVerify, verifying, scannedVisitor]
  );

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleVerify(passcodeInput);
  };

  const quickSelectGuests = visitors.filter((v) =>
    isCheckIn
      ? isQrValid(v.qrValidUntil) &&
        (v.status === "Expected" || v.status === "CheckedOut")
      : v.status === "CheckedIn"
  );

  const accent = isCheckIn
    ? {
        header: "from-emerald-600 via-teal-600 to-cyan-600",
        tabActive: "text-emerald-700",
        bracket: "border-emerald-500",
        laser: "bg-emerald-500 shadow-[0_0_12px_3px_rgba(16,185,129,0.5)]",
        verifying: "bg-emerald-500/20",
        successRing: "bg-emerald-500/10 border-emerald-500/30",
        successText: "text-emerald-500",
        successBadge: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
        quickHover:
          "hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:border-emerald-500/30 group-hover:text-emerald-600 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-950",
        icon: LogIn,
        title: "Verify Check-in",
        description:
          "Scan the guest's QR code or enter their passcode to check them in.",
        successLabel: "✓ Access Granted",
        successFooter: "Successfully checked in · Closing shortly…",
        verifyLabel: "Check In",
      }
    : {
        header: "from-rose-600 via-red-600 to-orange-600",
        tabActive: "text-rose-700",
        bracket: "border-rose-500",
        laser: "bg-rose-500 shadow-[0_0_12px_3px_rgba(244,63,94,0.5)]",
        verifying: "bg-rose-500/20",
        successRing: "bg-rose-500/10 border-rose-500/30",
        successText: "text-rose-500",
        successBadge: "bg-rose-500/10 text-rose-600 border-rose-500/20",
        quickHover:
          "hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:border-rose-500/30 group-hover:text-rose-600 group-hover:bg-rose-100 dark:group-hover:bg-rose-950",
        icon: LogOut,
        title: "Verify Check-out",
        description:
          "Scan the guest's QR code or enter their passcode to check them out.",
        successLabel: "✓ Departure Verified",
        successFooter: "Successfully checked out · Closing shortly…",
        verifyLabel: "Check Out",
      };

  const ModeIcon = accent.icon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden bg-white dark:bg-slate-950 border border-border/60 shadow-2xl">
        <div
          className={cn(
            "relative bg-gradient-to-br px-6 pt-6 pb-8 text-white overflow-hidden",
            accent.header
          )}
        >
          <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-white/10 blur-xl" />

          <DialogHeader className="relative z-10">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center">
                <ModeIcon className="h-4 w-4 text-white" />
              </div>
              <DialogTitle className="text-lg font-extrabold text-white tracking-tight">
                {accent.title}
              </DialogTitle>
            </div>
            <DialogDescription className="text-white/70 text-[11px] font-medium">
              {accent.description}
            </DialogDescription>
          </DialogHeader>

          <div className="relative z-10 mt-4 flex bg-white/15 rounded-xl p-1 w-fit gap-1">
            <button
              type="button"
              onClick={() => {
                setScanTab("camera");
                setScanError(null);
              }}
              className={cn(
                "flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[11px] font-bold transition-all",
                scanTab === "camera"
                  ? cn("bg-white shadow", accent.tabActive)
                  : "text-white/80 hover:text-white hover:bg-white/10"
              )}
            >
              <Camera className="h-3 w-3" />
              Camera Scan
            </button>
            <button
              type="button"
              onClick={() => {
                setScanTab("passcode");
                setScanError(null);
                setCameraActive(false);
              }}
              className={cn(
                "flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[11px] font-bold transition-all",
                scanTab === "passcode"
                  ? cn("bg-white shadow", accent.tabActive)
                  : "text-white/80 hover:text-white hover:bg-white/10"
              )}
            >
              <KeyRound className="h-3 w-3" />
              Passcode
            </button>
          </div>
        </div>

        <div className="px-6 pt-5 pb-6 space-y-5">
          {scannedVisitor && (
            <div className="flex flex-col items-center gap-3 py-4 animate-in zoom-in-95 duration-200">
              <div
                className={cn(
                  "h-16 w-16 rounded-full border-2 flex items-center justify-center",
                  accent.successRing
                )}
              >
                <CheckCircle2 className={cn("h-8 w-8", accent.successText)} />
              </div>
              <div className="text-center">
                <p
                  className={cn(
                    "text-[10px] font-bold uppercase tracking-widest mb-1",
                    accent.successText
                  )}
                >
                  {accent.successLabel}
                </p>
                <h3 className="text-lg font-extrabold text-slate-800 dark:text-white">
                  {scannedVisitor.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {scannedVisitor.company || "Individual"} ·{" "}
                  {scannedVisitor.purpose}
                </p>
                {scannedVisitor.badgeNumber && (
                  <Badge
                    className={cn(
                      "mt-2 font-bold text-[10px] border",
                      accent.successBadge
                    )}
                  >
                    {scannedVisitor.badgeNumber}
                  </Badge>
                )}
              </div>
              <p className="text-[10px] text-slate-400">{accent.successFooter}</p>
            </div>
          )}

          {!scannedVisitor && scanTab === "camera" && (
            <div className="space-y-4">
              <div
                className="relative overflow-hidden rounded-2xl border border-border/50 bg-slate-950 shadow-inner"
                style={{ minHeight: 260 }}
              >
                <div
                  className={cn(
                    "pointer-events-none absolute top-3 left-3 h-6 w-6 border-t-[3px] border-l-[3px] rounded-tl z-10",
                    accent.bracket
                  )}
                />
                <div
                  className={cn(
                    "pointer-events-none absolute top-3 right-3 h-6 w-6 border-t-[3px] border-r-[3px] rounded-tr z-10",
                    accent.bracket
                  )}
                />
                <div
                  className={cn(
                    "pointer-events-none absolute bottom-3 left-3 h-6 w-6 border-b-[3px] border-l-[3px] rounded-bl z-10",
                    accent.bracket
                  )}
                />
                <div
                  className={cn(
                    "pointer-events-none absolute bottom-3 right-3 h-6 w-6 border-b-[3px] border-r-[3px] rounded-br z-10",
                    accent.bracket
                  )}
                />

                {cameraActive && !verifying && (
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-x-4 h-0.5 z-10 rounded-full",
                      accent.laser
                    )}
                    style={{ animation: "scanLine 2s ease-in-out infinite" }}
                  />
                )}

                {verifying && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-slate-950/80 backdrop-blur-sm">
                    <Skeleton
                      className={cn("h-10 w-10 rounded-xl", accent.verifying)}
                    />
                    <Skeleton
                      className={cn("h-2.5 w-24 rounded", accent.verifying)}
                    />
                  </div>
                )}

                <div className="w-full">
                  <QRScanner onScan={handleQRScan} active={cameraActive} />
                </div>
              </div>

              <p className="text-center text-[10px] text-slate-400">
                Point your camera at the guest&apos;s QR code. Verification runs
                automatically.
              </p>
            </div>
          )}

          {!scannedVisitor && scanTab === "passcode" && (
            <div className="space-y-4">
              <form onSubmit={handlePasscodeSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    Enter Passcode
                  </label>
                  <div className="flex gap-2">
                    <Input
                      autoFocus
                      placeholder="Enter 6-digit passcode…"
                      value={passcodeInput}
                      onChange={(e) => {
                        setPasscodeInput(e.target.value);
                        setScanError(null);
                      }}
                      className="h-10 text-sm flex-1 bg-slate-50 dark:bg-slate-900/60 border-border/60 text-foreground font-mono tracking-wider"
                      disabled={verifying}
                    />
                    <Button
                      type="submit"
                      className="btn-primary shrink-0 border-0 h-10 px-4 text-sm font-bold"
                      disabled={verifying || !passcodeInput.trim()}
                    >
                      {verifying ? (
                        <ButtonLoadingSkeleton />
                      ) : (
                        accent.verifyLabel
                      )}
                    </Button>
                  </div>
                </div>

                {quickSelectGuests.length > 0 && (
                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                      Or Quick-Select Guest
                    </label>
                    <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1 scrollbar-thin">
                      {quickSelectGuests.map((v) => (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() =>
                            !verifying && handleVerify(v.qrCode || v.name)
                          }
                          disabled={verifying}
                          className={cn(
                            "w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl border border-border/50 bg-slate-50 dark:bg-slate-900/50 transition-all text-left group disabled:opacity-50",
                            accent.quickHover
                          )}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div
                              className={cn(
                                "h-7 w-7 shrink-0 rounded-lg flex items-center justify-center text-[9px] font-extrabold",
                                isCheckIn
                                  ? "bg-amber-500/10 text-amber-600"
                                  : "bg-emerald-500/10 text-emerald-600"
                              )}
                            >
                              {v.name.substring(0, 2).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-slate-800 dark:text-white truncate">
                                {v.name}
                              </p>
                              <p className="text-[9px] text-slate-400 truncate">
                                {v.company || "Individual"} · {v.purpose}
                              </p>
                            </div>
                          </div>
                          <span className="shrink-0 text-[9px] font-mono font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                            {v.qrCode}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {quickSelectGuests.length === 0 && (
                  <p className="text-center text-[11px] text-slate-400 italic py-2">
                    {isCheckIn
                      ? "No guests available for check-in."
                      : "No guests currently checked in."}
                  </p>
                )}
              </form>
            </div>
          )}

          {scanError && !scannedVisitor && (
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200/60 dark:border-rose-500/20">
              <AlertCircle className="h-4 w-4 text-rose-500 shrink-0" />
              <p className="text-xs font-semibold text-rose-600 dark:text-rose-400">
                {scanError}
              </p>
            </div>
          )}

          <div className="flex justify-end pt-1 border-t border-border/30">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer h-8"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
