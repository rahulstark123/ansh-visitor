"use client";

import { QRCodeSVG } from "qrcode.react";
import { Printer, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DeskLinkQrModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  publicUrl: string;
  workspaceName: string;
  officeBranch: string;
  slug: string;
}

export function DeskLinkQrModal({
  open,
  onOpenChange,
  publicUrl,
  workspaceName,
  officeBranch,
  slug,
}: DeskLinkQrModalProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader className="no-print">
          <DialogTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5 text-sky-600" />
            Desk QR Code
          </DialogTitle>
          <DialogDescription>
            Print this QR and place it at your reception desk. Visitors scan it to open your
            pre-registration page.
          </DialogDescription>
        </DialogHeader>

        <div className="printable-desk-qr mx-auto w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 text-center text-slate-900 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-sky-600">
            {workspaceName}
          </p>
          <h3 className="mt-2 text-lg font-black tracking-tight">Scan to Pre-register</h3>
          <p className="mt-1 text-xs text-slate-500">{officeBranch}</p>

          <div className="desk-qr-code-box mx-auto mt-5 flex h-52 w-52 items-center justify-center rounded-2xl border border-slate-200 bg-white p-4">
            <QRCodeSVG value={publicUrl} size={168} bgColor="#ffffff" fgColor="#0f172a" level="M" />
          </div>

          <p className="mt-4 break-all font-mono text-[11px] font-semibold text-slate-600">
            /register/{slug}
          </p>
          <p className="mt-3 text-xs leading-relaxed text-slate-500">
            Point your phone camera at the QR code to open the guest registration form instantly.
          </p>
        </div>

        <DialogFooter className="no-print sm:justify-center">
          <Button type="button" className="btn-primary border-0 w-full sm:w-auto" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print for Desk
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function DeskLinkQrButton({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={onClick}
      disabled={disabled}
    >
      <QrCode className="mr-2 h-4 w-4" />
      Desk QR
    </Button>
  );
}
