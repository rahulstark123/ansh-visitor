"use client";

import { Smartphone } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StoreBadgeButtons } from "@/components/landing/store-badge-buttons";

type MobileAppLiveModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function MobileAppLiveModal({ open, onOpenChange }: MobileAppLiveModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="mb-2 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
            <Smartphone className="h-5 w-5" />
          </div>
          <DialogTitle>We&apos;re live on mobile</DialogTitle>
          <DialogDescription>
            ANSH Visitor is now on Android. Download the app from Google Play or Indus Appstore
            for QR check-in, visitor passes, and lobby desk management on the go.
          </DialogDescription>
        </DialogHeader>
        <StoreBadgeButtons className="justify-center pt-2" />
      </DialogContent>
    </Dialog>
  );
}
