"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Html5Qrcode, Html5QrcodeScannerState } from "html5-qrcode";
import { ScannerSkeleton } from "@/components/ui/page-skeletons";

interface QRScannerProps {
  onScan: (code: string) => void;
  active: boolean;
}

// Module-level variables to coordinate camera access across mounts/renders
let globalScanner: Html5Qrcode | null = null;
let stopInProgressPromise: Promise<void> = Promise.resolve();

const stopGlobalScanner = () => {
  stopInProgressPromise = stopInProgressPromise.then(async () => {
    if (globalScanner) {
      try {
        const state = globalScanner.getState();
        if (
          state === Html5QrcodeScannerState.SCANNING ||
          state === Html5QrcodeScannerState.PAUSED
        ) {
          await globalScanner.stop();
        }
      } catch (e) {
        console.error("Error stopping global scanner:", e);
      }
      try {
        globalScanner.clear();
      } catch (e) {
        console.error("Error clearing global scanner:", e);
      }
      globalScanner = null;
    }
  });
  return stopInProgressPromise;
};

export function QRScanner({ onScan, active }: QRScannerProps) {
  const [error, setError] = useState<string | null>(null);
  const [isStarting, setIsStarting] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const onScanRef = useRef(onScan);
  onScanRef.current = onScan;

  useEffect(() => {
    if (!active) {
      stopGlobalScanner();
      return;
    }

    let isCurrent = true;

    const startScanner = async () => {
      // 1. Wait a tick so the DOM container is rendered
      await new Promise((r) => setTimeout(r, 250));
      if (!isCurrent) return;

      setIsStarting(true);
      setError(null);

      try {
        // 2. Stop and clear any previous scanner and wait for it to complete
        await stopGlobalScanner();
        if (!isCurrent) return;

        // 3. Make sure the container element exists in the DOM
        const el = document.getElementById("qr-scanner-element");
        if (!el) {
          setError("Scanner container not found. Please try again.");
          setIsStarting(false);
          return;
        }

        // 4. Create and start the new scanner instance
        const qrScanner = new Html5Qrcode("qr-scanner-element");
        globalScanner = qrScanner;

        const cameras = await Html5Qrcode.getCameras();
        if (!isCurrent) {
          await stopGlobalScanner();
          return;
        }

        if (!cameras || cameras.length === 0) {
          setError("No camera found on this device.");
          setIsStarting(false);
          return;
        }

        // Prefer back/environment camera for mobile
        const backCamera = cameras.find(
          (c) =>
            c.label.toLowerCase().includes("back") ||
            c.label.toLowerCase().includes("rear") ||
            c.label.toLowerCase().includes("environment")
        );
        const cameraId = backCamera?.id || cameras[0].id;

        await qrScanner.start(
          cameraId,
          {
            fps: 10,
            qrbox: { width: 200, height: 200 },
            aspectRatio: 1.0,
          },
          (decodedText) => {
            if (isCurrent) {
              onScanRef.current(decodedText.trim());
            }
          },
          () => {
            // quiet - frame without QR code
          }
        );

        if (!isCurrent) {
          await stopGlobalScanner();
          return;
        }

        setIsStarting(false);
        setIsRunning(true);
      } catch (err) {
        if (isCurrent) {
          const msg =
            err instanceof Error ? err.message : "Camera access denied.";
          if (
            msg.toLowerCase().includes("permission") ||
            msg.toLowerCase().includes("denied") ||
            msg.toLowerCase().includes("notallowed")
          ) {
            setError(
              "Camera permission denied. Please allow camera access in your browser settings, then try again."
            );
          } else {
            setError(msg || "Failed to start camera. Use passcode instead.");
          }
          setIsStarting(false);
        }
      }
    };

    startScanner();

    return () => {
      isCurrent = false;
      setIsStarting(false);
      setIsRunning(false);
      stopGlobalScanner();
    };
  }, [active]);

  return (
    <div className="relative w-full" style={{ minHeight: 240 }}>
      {/* The scanner container MUST always be in the DOM */}
      <div
        id="qr-scanner-element"
        className="w-full"
        style={{
          minHeight: 240,
          display: error ? "none" : "block",
        }}
      />

      {/* Loading overlay – shown on top of the container while camera starts */}
      {isStarting && !error && (
        <div className="absolute inset-0 z-10 overflow-hidden rounded-lg">
          <ScannerSkeleton />
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-slate-950 rounded-lg px-6">
          <div className="h-12 w-12 rounded-full bg-rose-500/10 flex items-center justify-center border border-rose-500/20">
            <svg className="h-5 w-5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l-4 4m0-4l4 4m6-4a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-rose-400 text-[11px] font-semibold leading-relaxed text-center max-w-[260px]">
            {error}
          </p>
          <p className="text-slate-500 text-[10px]">
            Switch to the Passcode tab instead.
          </p>
        </div>
      )}
    </div>
  );
}
