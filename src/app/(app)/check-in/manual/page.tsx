"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useVisitorStore } from "@/stores/visitor-store";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { PageHeader } from "@/components/crm/page-header";
import { UserCheck, ShieldCheck, Loader2 } from "lucide-react";

export default function ManualCheckInPage() {
  const router = useRouter();
  const { registerWalkIn, hosts, currentUser } = useVisitorStore();

  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestCompany, setGuestCompany] = useState("");
  const [guestPurpose, setGuestPurpose] = useState<any>("Meeting");
  const [guestHostId, setGuestHostId] = useState(currentUser.id);
  const [guestNotes, setGuestNotes] = useState("");
  const [guestIdProofType, setGuestIdProofType] = useState("");
  const [guestIdProofNumber, setGuestIdProofNumber] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail || !guestPhone) return;

    setLoading(true);

    setTimeout(() => {
      const host = hosts.find((h) => h.id === guestHostId) || currentUser;

      registerWalkIn({
        name: guestName,
        email: guestEmail,
        phone: guestPhone,
        company: guestCompany || undefined,
        purpose: guestPurpose,
        hostId: host.id,
        hostName: host.name,
        notes: guestNotes || undefined,
        idProofType: guestIdProofType || undefined,
        idProofNumber: guestIdProofNumber || undefined
      });

      setLoading(false);
      setSuccess(true);

      // Reset
      setGuestName("");
      setGuestEmail("");
      setGuestPhone("");
      setGuestCompany("");
      setGuestPurpose("Meeting");
      setGuestNotes("");
      setGuestIdProofType("");
      setGuestIdProofNumber("");

      setTimeout(() => {
        setSuccess(false);
        router.push("/dashboard");
      }, 1500);
    }, 800);
  };

  return (
    <div className="space-y-8 select-none animate-in fade-in duration-300">
      <title>Walk-in Check-in | Ansh Visitor</title>
      <PageHeader
        eyebrow="Reception Desk"
        title="Walk-in Registration"
        description="Manually register and check in visitor arrivals who do not have a pre-registered QR invitation pass."
      />

      <div className="max-w-xl mx-auto">
        <Card className="crm-card">
          <CardHeader className="border-b border-border/40 pb-4">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Visitor Information Form
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {success ? (
              <div className="flex flex-col items-center justify-center py-10 text-center animate-in zoom-in-95 duration-200">
                <div className="h-16 w-16 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center mb-4">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Visitor Checked In!
                </h3>
                <p className="text-xs text-slate-500 mt-2">
                  Lobby badge has been issued and host notification alert sent.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-slate-800 dark:text-slate-100">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                      Visitor Full Name
                    </label>
                    <Input
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="John Doe"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                      Company Name
                    </label>
                    <Input
                      value={guestCompany}
                      onChange={(e) => setGuestCompany(e.target.value)}
                      placeholder="Guest Company (Optional)"
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                      Contact Phone Number
                    </label>
                    <Input
                      required
                      type="tel"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                      Email Address
                    </label>
                    <Input
                      required
                      type="email"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      placeholder="john@example.com"
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
                      value={guestPurpose}
                      onChange={(e) => setGuestPurpose(e.target.value as any)}
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
                      Select Host Mapped
                    </label>
                    <Select
                      value={guestHostId}
                      onChange={(e) => setGuestHostId(e.target.value)}
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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                      Govt ID Card Type (Optional)
                    </label>
                    <Select
                      value={guestIdProofType}
                      onChange={(e) => setGuestIdProofType(e.target.value)}
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
                      value={guestIdProofNumber}
                      onChange={(e) => setGuestIdProofNumber(e.target.value)}
                      placeholder="e.g. ABCD1234E"
                      disabled={!guestIdProofType}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    Additional Notes
                  </label>
                  <textarea
                    value={guestNotes}
                    onChange={(e) => setGuestNotes(e.target.value)}
                    placeholder="Walk-in visitor notes..."
                    className="mt-2 block w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm text-foreground outline-none focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/20 dark:bg-slate-900/30 min-h-16"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary border-0 gap-2 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Logging visitor entry...
                      </>
                    ) : (
                      <>
                        <UserCheck className="h-4 w-4" />
                        Complete Walk-in Check-in
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
