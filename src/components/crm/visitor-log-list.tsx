"use client";

import { useState, useEffect, useMemo } from "react";
import { useVisitorStore, Visitor } from "@/stores/visitor-store";
import { QRCodeSVG } from "qrcode.react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Plus,
  Search,
  CheckCircle2,
  XCircle,
  Calendar,
  Contact,
  Building,
  UserCheck,
  LogOut,
  Clock,
  Printer,
  QrCode
} from "lucide-react";
import { PageHeader } from "./page-header";
import { formatQrValidUntil, isQrValid } from "@/lib/qr-validity";
import {
  GuestVerifyModal,
  type GuestVerifyMode,
} from "@/components/crm/guest-verify-modal";
import {
  ListPagination,
  paginateList,
} from "@/components/ui/list-pagination";

const VISITOR_PAGE_SIZE = 10;

interface VisitorLogListProps {
  filterType: "today" | "pre-registered" | "all";
}

export function VisitorLogList({ filterType }: VisitorLogListProps) {
  const { visitors, checkInVisitor, hosts, openRegisterGuest } = useVisitorStore();
  const [verifyOpen, setVerifyOpen] = useState(false);
  const [verifyMode, setVerifyMode] = useState<GuestVerifyMode>("check-in");
  
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [purposeFilter, setPurposeFilter] = useState("All");
  const [regTypeFilter, setRegTypeFilter] = useState<"All" | "Pre-registered" | "Walk-in">("All");
  const [currentPage, setCurrentPage] = useState(1);

  // Check In Confirm State
  const [confirmCheckInVisitor, setConfirmCheckInVisitor] = useState<Visitor | null>(null);
  const [confirmIdProofType, setConfirmIdProofType] = useState("");
  const [confirmIdProofNumber, setConfirmIdProofNumber] = useState("");

  // Print Pass state
  const [selectedPass, setSelectedPass] = useState<Visitor | null>(null);
  const [openPass, setOpenPass] = useState(false);

  // Filter visitors list based on tab
  const getFilteredVisitors = () => {
    let list = [...visitors];

    if (filterType === "today") {
      // CheckedIn or CheckedOut today
      list = list.filter(v => v.status === "CheckedIn" || v.status === "CheckedOut");
    }

    // Filter by registration type (pre-registered vs walk-in)
    if (regTypeFilter !== "All") {
      if (regTypeFilter === "Pre-registered") {
        list = list.filter((v) => !v.walkIn);
      } else if (regTypeFilter === "Walk-in") {
        list = list.filter((v) => v.walkIn);
      }
    }

    // Filter by search query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        v =>
          v.name.toLowerCase().includes(q) ||
          v.email.toLowerCase().includes(q) ||
          v.phone.includes(q) ||
          (v.company && v.company.toLowerCase().includes(q))
      );
    }

    // Filter by purpose
    if (purposeFilter !== "All") {
      list = list.filter(v => v.purpose === purposeFilter);
    }

    return list;
  };

  const filteredList = useMemo(() => getFilteredVisitors(), [
    visitors,
    filterType,
    regTypeFilter,
    searchQuery,
    purposeFilter,
  ]);

  const paginatedList = useMemo(
    () => paginateList(filteredList, currentPage, VISITOR_PAGE_SIZE),
    [filteredList, currentPage]
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, purposeFilter, regTypeFilter, filterType]);

  const handleConfirmCheckIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmCheckInVisitor) return;

    checkInVisitor(
      confirmCheckInVisitor.id,
      confirmIdProofType || undefined,
      confirmIdProofNumber || undefined
    );

    setConfirmCheckInVisitor(null);
    setConfirmIdProofType("");
    setConfirmIdProofNumber("");
  };

  const handlePrintPass = (visitor: Visitor) => {
    setSelectedPass(visitor);
    setOpenPass(true);
  };

  const formatDateTime = (dateStr?: string) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + " (" + new Date(dateStr).toLocaleDateString([], { month: 'short', day: 'numeric' }) + ")";
  };

  const getPageHeaderDescription = () => {
    if (filterType === "today") return "Browse visitors logged at the desk today.";
    if (filterType === "pre-registered") return "Overview of all registered guests, both pre-registered and walk-ins.";
    return "Complete history logs of all workspace visits.";
  };

  return (
    <div className="space-y-6 select-none animate-in fade-in duration-300">
      <PageHeader
        eyebrow="Visitor Operations"
        title={filterType === "today" ? "Today's Guests" : filterType === "pre-registered" ? "Registered Users" : "All Visitors Log"}
        description={getPageHeaderDescription()}
        action={{
          label: "Register Guest",
          icon: Plus,
          onClick: () => openRegisterGuest(),
        }}
      />

      {/* FILTER CONTROLS */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by visitor name, company, email, phone..."
            className="pl-10"
          />
        </div>
        {/* Registration Type Filter */}
        <div className="w-full sm:w-44">
          <Select
            value={regTypeFilter}
            onChange={(e) =>
              setRegTypeFilter(e.target.value as "All" | "Pre-registered" | "Walk-in")
            }
          >
            <option value="All">All Types</option>
            <option value="Pre-registered">Pre-registered</option>
            <option value="Walk-in">Walk In</option>
          </Select>
        </div>

        {/* Purpose Filter */}
        <div className="w-full sm:w-44">
          <Select value={purposeFilter} onChange={(e) => setPurposeFilter(e.target.value)}>
            <option value="All">All Purposes</option>
            <option value="Meeting">Meeting</option>
            <option value="Interview">Interview</option>
            <option value="Vendor">Vendor</option>
            <option value="Delivery">Delivery</option>
            <option value="Other">Other</option>
          </Select>
        </div>
      </div>

      {/* LOGS TABLE / LIST */}
      <Card className="crm-card">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm text-slate-655 dark:text-slate-300">
              <thead className="border-b border-border bg-slate-50/50 dark:bg-slate-900/40 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-6 py-4">Visitor</th>
                  <th className="px-6 py-4">Purpose</th>
                  <th className="px-6 py-4">Host Mapped</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Check-in / out</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {paginatedList.length > 0 ? (
                  paginatedList.map((v) => (
                    <tr key={v.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-800/10 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <span className="block font-bold text-slate-900 dark:text-white">
                            {v.name}
                          </span>
                          <span className="block text-[11px] text-slate-400">
                            {v.company || "Individual"} · {v.phone}
                          </span>
                          {v.idProofType && (
                            <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-1.5 py-0.5 rounded border border-slate-200/50 dark:border-slate-700/50">
                              Verified ID: {v.idProofType} ({v.idProofNumber || "Present"})
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-xs text-slate-700 dark:text-slate-200">
                        {v.purpose}
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <span className="block font-bold text-slate-800 dark:text-slate-250">
                            {v.hostName}
                          </span>
                          <span className="block text-[10px] text-slate-400 font-semibold uppercase">
                            Host
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {v.status === "CheckedIn" ? (
                          <Badge className="bg-emerald-500/10 text-emerald-600 border-0">
                            Checked In
                          </Badge>
                        ) : v.status === "CheckedOut" ? (
                          <Badge className="bg-slate-200 text-slate-655 dark:bg-slate-800 dark:text-slate-450 border-0">
                            Checked Out
                          </Badge>
                        ) : (
                          <Badge className="bg-amber-500/10 text-amber-600 border-0">
                            Expected
                          </Badge>
                        )}
                      </td>
                      <td className="px-6 py-4 text-xs">
                        <div className="space-y-0.5 text-slate-500">
                          {v.checkedInAt && (
                            <span className="block font-semibold">
                              In: {formatDateTime(v.checkedInAt)}
                            </span>
                          )}
                          {v.checkedOutAt && (
                            <span className="block font-semibold">
                              Out: {formatDateTime(v.checkedOutAt)}
                            </span>
                          )}
                          {!v.checkedInAt && (
                            <span className="text-[10px] uppercase font-bold text-slate-400">
                              Awaiting check-in
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {v.status === "Expected" && (
                            <Button
                              variant="outline"
                              size="xs"
                              className="border-emerald-500/20 text-emerald-500 hover:bg-emerald-500/10 cursor-pointer"
                              onClick={() => setConfirmCheckInVisitor(v)}
                            >
                              Check In
                            </Button>
                          )}
                          {v.status === "CheckedOut" && isQrValid(v.qrValidUntil) && (
                            <Button
                              variant="outline"
                              size="xs"
                              className="border-emerald-500/20 text-emerald-500 hover:bg-emerald-500/10 cursor-pointer"
                              onClick={() => setConfirmCheckInVisitor(v)}
                            >
                              Re-check In
                            </Button>
                          )}
                          {v.status === "CheckedIn" && (
                            <Button
                              variant="outline"
                              size="xs"
                              className="border-rose-500/20 text-rose-500 hover:bg-rose-500/10 cursor-pointer"
                              onClick={() => {
                                setVerifyMode("check-out");
                                setVerifyOpen(true);
                              }}
                            >
                              Check Out
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon-xs"
                            onClick={() => handlePrintPass(v)}
                            title="Print Pass / QR"
                            className="text-slate-400 hover:text-slate-800 dark:hover:text-white cursor-pointer"
                          >
                            <QrCode className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-slate-400 italic">
                      No matching visitor records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-6 pb-5">
            <ListPagination
              currentPage={currentPage}
              totalItems={filteredList.length}
              pageSize={VISITOR_PAGE_SIZE}
              onPageChange={setCurrentPage}
            />
          </div>
        </CardContent>
      </Card>

      {/* CHECK-IN CONFIRMATION DIALOG MODAL */}
      <Dialog open={confirmCheckInVisitor !== null} onOpenChange={(open) => { if (!open) setConfirmCheckInVisitor(null); }}>
        <DialogContent className="sm:max-w-[440px]">
          {confirmCheckInVisitor && (
            <form onSubmit={handleConfirmCheckIn} className="space-y-4 text-slate-800 dark:text-slate-100">
              <DialogHeader>
                <DialogTitle>Confirm Guest Arrival</DialogTitle>
                <DialogDescription>
                  Verify information for {confirmCheckInVisitor.name} before checking them into the building.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-2">
                <div className="rounded-xl border border-border/50 bg-slate-50/50 dark:bg-slate-900/50 p-4 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Visitor Name</span>
                    <span className="font-bold">{confirmCheckInVisitor.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Company</span>
                    <span className="font-bold">{confirmCheckInVisitor.company || "Individual"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Purpose</span>
                    <span className="font-bold">{confirmCheckInVisitor.purpose}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Host Mapped</span>
                    <span className="font-bold text-primary">{confirmCheckInVisitor.hostName}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                      Govt ID Card Type (Optional)
                    </label>
                    <Select
                      value={confirmIdProofType}
                      onChange={(e) => setConfirmIdProofType(e.target.value)}
                      className="mt-2 bg-card border-input text-foreground"
                    >
                      <option value="">No ID Card Provided</option>
                      <option value="Aadhaar Card">Aadhaar Card</option>
                      <option value="PAN Card">PAN Card</option>
                      <option value="Driving License">Driving License</option>
                      <option value="Passport">Passport</option>
                      <option value="Voter ID">Voter ID</option>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                      Govt ID Number (Optional)
                    </label>
                    <Input
                      value={confirmIdProofNumber}
                      onChange={(e) => setConfirmIdProofNumber(e.target.value)}
                      placeholder="e.g. ABCD1234E"
                      disabled={!confirmIdProofType}
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>

              <DialogFooter className="pt-2">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setConfirmCheckInVisitor(null)}
                  className="w-full sm:w-36 h-11 text-sm font-semibold cursor-pointer"
                >
                  Cancel
                </Button>
                <Button type="submit" className="w-full sm:w-36 h-11 text-sm font-semibold btn-primary border-0 cursor-pointer">
                  Verify & Check In
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* PASS MODAL PRINT PREVIEW */}
      <Dialog open={openPass} onOpenChange={setOpenPass}>
        <DialogContent className="sm:max-w-[400px] text-slate-800 dark:text-slate-100">
          {selectedPass && (
            <div className="space-y-6 py-2">
              <DialogHeader className="no-print">
                <DialogTitle className="text-center font-bold tracking-tight">ANSH VISITOR PASS</DialogTitle>
                <DialogDescription className="text-center text-xs text-slate-400">
                  Present this QR code at the reception desk entryway.
                </DialogDescription>
              </DialogHeader>

              {/* Pass Visual Card */}
              <div className="printable-pass rounded-2xl border border-slate-200 bg-slate-50/50 p-6 flex flex-col items-center dark:border-slate-800 dark:bg-slate-900/50">
                <div className="text-center w-full mb-2">
                  <h3 className="text-lg font-black tracking-tight">ANSH VISITOR PASS</h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Present this QR code at the reception desk entryway.
                  </p>
                </div>
                <div className="visitor-pass-qr-box h-44 w-44 rounded-xl border border-slate-200 bg-white flex flex-col items-center justify-center dark:border-slate-800 select-none shadow-sm gap-2">
                  <QRCodeSVG
                    value={selectedPass.qrCode || ""}
                    size={112}
                    bgColor="#ffffff"
                    fgColor="#0f172a"
                    level="M"
                  />
                  <span className="font-mono text-[11px] font-extrabold text-slate-500 tracking-wider">
                    Passcode: {selectedPass.qrCode}
                  </span>
                </div>

                <div className="mt-6 text-center space-y-2">
                  <h4 className="text-lg font-black text-slate-900 dark:text-white leading-tight">
                    {selectedPass.name}
                  </h4>
                  <span className="visitor-pass-purpose inline-flex rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-600">
                    {selectedPass.purpose}
                  </span>
                  <p className="text-xs text-slate-400">
                    Company: <strong className="text-slate-700 dark:text-slate-350">{selectedPass.company || "Individual"}</strong>
                  </p>
                  {selectedPass.qrValidUntil && (
                    <p className="text-xs text-slate-400">
                      Valid until:{" "}
                      <strong className="text-slate-700 dark:text-slate-350">
                        {formatQrValidUntil(selectedPass.qrValidUntil)}
                      </strong>
                    </p>
                  )}
                  <p className="text-xs text-slate-400">
                    Branch: <strong className="text-slate-700 dark:text-slate-350">{hosts.find((h) => h.id === selectedPass.hostId)?.officeBranch || "HQ - Bangalore"}</strong>
                  </p>
                  {selectedPass.idProofType && (
                    <p className="text-xs text-slate-400">
                      ID Proof: <strong className="text-slate-700 dark:text-slate-350">{selectedPass.idProofType} ({selectedPass.idProofNumber || "N/A"})</strong>
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-3 no-print">
                <Button
                  variant="outline"
                  className="flex-1 h-11 text-sm font-semibold cursor-pointer"
                  onClick={() => setOpenPass(false)}
                >
                  Close Pass
                </Button>
                <Button
                  className="btn-primary border-0 flex-1 h-11 text-sm font-semibold gap-2 cursor-pointer"
                  onClick={() => window.print()}
                >
                  <Printer className="h-4 w-4" />
                  Print Pass
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <GuestVerifyModal
        open={verifyOpen}
        onOpenChange={setVerifyOpen}
        mode={verifyMode}
      />
    </div>
  );
}
