"use client";

import { useState } from "react";
import { useVisitorStore, Visitor } from "@/stores/visitor-store";
import { cn } from "@/lib/utils";
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

interface VisitorLogListProps {
  filterType: "today" | "pre-registered" | "all";
}

export function VisitorLogList({ filterType }: VisitorLogListProps) {
  const { visitors, addVisitor, checkInVisitor, checkOutVisitor, registerWalkIn, hosts, currentUser } = useVisitorStore();
  
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [purposeFilter, setPurposeFilter] = useState("All");

  // Dialog State
  const [openRegister, setOpenRegister] = useState(false);
  const [regMode, setRegMode] = useState<"pre-register" | "walk-in">("pre-register");
  const [newGuestName, setNewGuestName] = useState("");
  const [newGuestEmail, setNewGuestEmail] = useState("");
  const [newGuestPhone, setNewGuestPhone] = useState("");
  const [newGuestCompany, setNewGuestCompany] = useState("");
  const [newGuestPurpose, setNewGuestPurpose] = useState<any>("Meeting");
  const [newGuestHostId, setNewGuestHostId] = useState(currentUser.id);
  const [newGuestNotes, setNewGuestNotes] = useState("");
  const [newGuestIdProofType, setNewGuestIdProofType] = useState("");
  const [newGuestIdProofNumber, setNewGuestIdProofNumber] = useState("");

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
    } else if (filterType === "pre-registered") {
      // Expected invitations
      list = list.filter(v => v.status === "Expected");
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

  const filteredList = getFilteredVisitors();

  const handleCreateInvitation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuestName || !newGuestEmail || !newGuestPhone) return;

    const host = hosts.find(h => h.id === newGuestHostId) || currentUser;

    if (regMode === "walk-in") {
      registerWalkIn({
        name: newGuestName,
        email: newGuestEmail,
        phone: newGuestPhone,
        company: newGuestCompany || undefined,
        purpose: newGuestPurpose,
        hostId: host.id,
        hostName: host.name,
        notes: newGuestNotes || undefined,
        idProofType: newGuestIdProofType || undefined,
        idProofNumber: newGuestIdProofNumber || undefined
      });
    } else {
      addVisitor({
        name: newGuestName,
        email: newGuestEmail,
        phone: newGuestPhone,
        company: newGuestCompany || undefined,
        purpose: newGuestPurpose,
        hostId: host.id,
        hostName: host.name,
        notes: newGuestNotes || undefined,
        idProofType: newGuestIdProofType || undefined,
        idProofNumber: newGuestIdProofNumber || undefined
      });
    }

    // Reset Form
    setNewGuestName("");
    setNewGuestEmail("");
    setNewGuestPhone("");
    setNewGuestCompany("");
    setNewGuestPurpose("Meeting");
    setNewGuestNotes("");
    setNewGuestIdProofType("");
    setNewGuestIdProofNumber("");
    setOpenRegister(false);
  };

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
    if (filterType === "pre-registered") return "Overview of expected invitations sent to scheduled guests.";
    return "Complete history logs of all workspace visits.";
  };

  return (
    <div className="space-y-6 select-none animate-in fade-in duration-300">
      <PageHeader
        eyebrow="Visitor Operations"
        title={filterType === "today" ? "Today's Guests" : filterType === "pre-registered" ? "Pre-registered" : "All Visitors Log"}
        description={getPageHeaderDescription()}
        action={{
          label: "Register Guest",
          icon: Plus,
          onClick: () => setOpenRegister(true)
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
                {filteredList.length > 0 ? (
                  filteredList.map((v) => (
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
                          {v.status === "CheckedIn" && (
                            <Button
                              variant="outline"
                              size="xs"
                              className="border-rose-500/20 text-rose-500 hover:bg-rose-500/10 cursor-pointer"
                              onClick={() => checkOutVisitor(v.id)}
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
        </CardContent>
      </Card>

      {/* PRE-REGISTER / WALK-IN DIALOG MODAL */}
      <Dialog open={openRegister} onOpenChange={setOpenRegister}>
        <DialogContent className="sm:max-w-[480px]">
          <form onSubmit={handleCreateInvitation} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Register Guest</DialogTitle>
              <DialogDescription>
                Schedule a pre-registered entry pass, or perform an immediate desk walk-in check-in.
              </DialogDescription>
            </DialogHeader>

            {/* Mode Tabs */}
            <div className="flex border-b border-border/60 mb-2">
              <button
                type="button"
                className={cn(
                  "flex-1 pb-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer",
                  regMode === "pre-register"
                    ? "border-primary text-primary"
                    : "border-transparent text-slate-400 dark:text-slate-550 hover:text-slate-600 dark:hover:text-slate-300"
                )}
                onClick={() => setRegMode("pre-register")}
              >
                Pre-register (Expected)
              </button>
              <button
                type="button"
                className={cn(
                  "flex-1 pb-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer",
                  regMode === "walk-in"
                    ? "border-primary text-primary"
                    : "border-transparent text-slate-400 dark:text-slate-550 hover:text-slate-600 dark:hover:text-slate-300"
                )}
                onClick={() => setRegMode("walk-in")}
              >
                Walk-in Entry (Check In)
              </button>
            </div>

            <div className="space-y-4 py-2 text-slate-800 dark:text-slate-100">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    Guest Full Name
                  </label>
                  <Input
                    required
                    value={newGuestName}
                    onChange={(e) => setNewGuestName(e.target.value)}
                    placeholder="Jane Doe"
                    className="mt-2"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    Guest Company Name
                  </label>
                  <Input
                    value={newGuestCompany}
                    onChange={(e) => setNewGuestCompany(e.target.value)}
                    placeholder="Acme Corp"
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    Guest Phone Number
                  </label>
                  <Input
                    required
                    type="tel"
                    value={newGuestPhone}
                    onChange={(e) => setNewGuestPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="mt-2"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    Guest Email
                  </label>
                  <Input
                    required
                    type="email"
                    value={newGuestEmail}
                    onChange={(e) => setNewGuestEmail(e.target.value)}
                    placeholder="jane@company.com"
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    Visit Purpose
                  </label>
                  <Select
                    value={newGuestPurpose}
                    onChange={(e) => setNewGuestPurpose(e.target.value as any)}
                    className="mt-2 bg-card border-input text-foreground"
                  >
                    <option value="Meeting">Meeting</option>
                    <option value="Interview">Interview</option>
                    <option value="Vendor">Vendor</option>
                    <option value="Delivery">Delivery</option>
                    <option value="Other">Other</option>
                  </Select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    Host Mapped
                  </label>
                  <Select
                    value={newGuestHostId}
                    onChange={(e) => setNewGuestHostId(e.target.value)}
                    className="mt-2 bg-card border-input text-foreground"
                  >
                    {hosts.map((h) => (
                      <option key={h.id} value={h.id}>
                        {h.name} ({h.department})
                      </option>
                    ))}
                  </Select>
                </div>
              </div>

              {/* Optional Govt ID Card */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    Govt ID Card Type (Optional)
                  </label>
                  <Select
                    value={newGuestIdProofType}
                    onChange={(e) => setNewGuestIdProofType(e.target.value)}
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
                    value={newGuestIdProofNumber}
                    onChange={(e) => setNewGuestIdProofNumber(e.target.value)}
                    placeholder="e.g. ABCD1234E"
                    disabled={!newGuestIdProofType}
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  Special Notes
                </label>
                <textarea
                  value={newGuestNotes}
                  onChange={(e) => setNewGuestNotes(e.target.value)}
                  placeholder="Need visual board access or parking slot..."
                  className="mt-2 block w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm text-foreground outline-none focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/20 dark:bg-slate-900/30 min-h-16"
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                type="button"
                onClick={() => setOpenRegister(false)}
                className="w-full sm:w-36 h-11 text-sm font-semibold cursor-pointer"
              >
                Cancel
              </Button>
              <Button type="submit" className="w-full sm:w-36 h-11 text-sm font-semibold btn-primary border-0 cursor-pointer">
                {regMode === "walk-in" ? "Check In Now" : "Issue QR Pass"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

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
              <DialogHeader>
                <DialogTitle className="text-center font-bold tracking-tight">ANSH VISITOR PASS</DialogTitle>
                <DialogDescription className="text-center text-xs text-slate-400">
                  Present this QR code at the reception desk entryway.
                </DialogDescription>
              </DialogHeader>

              {/* Pass Visual Card */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 flex flex-col items-center dark:border-slate-800 dark:bg-slate-900/50">
                <div className="h-44 w-44 rounded-xl border border-slate-200 bg-white flex flex-col items-center justify-center dark:border-slate-800 select-none shadow-sm gap-2">
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
                  <span className="inline-flex rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-600">
                    {selectedPass.purpose}
                  </span>
                  <p className="text-xs text-slate-400">
                    Company: <strong className="text-slate-700 dark:text-slate-350">{selectedPass.company || "Individual"}</strong>
                  </p>
                  <p className="text-xs text-slate-400">
                    Host: <strong className="text-slate-700 dark:text-slate-350">{selectedPass.hostName}</strong>
                  </p>
                  {selectedPass.idProofType && (
                    <p className="text-xs text-slate-400">
                      ID Proof: <strong className="text-slate-700 dark:text-slate-350">{selectedPass.idProofType} ({selectedPass.idProofNumber || "N/A"})</strong>
                    </p>
                  )}
                  {selectedPass.badgeNumber && (
                    <div className="mt-2 text-xs font-bold text-slate-655 dark:text-slate-300">
                      Assigned Badge: <span className="bg-slate-200 dark:bg-slate-850 px-2 py-0.5 rounded font-mono border border-slate-300/40">{selectedPass.badgeNumber}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
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
    </div>
  );
}
