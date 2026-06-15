"use client";

import { useMemo, useRef, useState } from "react";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useSupportStore } from "@/stores/support-store";
import { useVisitorStore } from "@/stores/visitor-store";
import {
  TICKET_CATEGORIES,
  TICKET_PRIORITIES,
  TICKET_STATUSES,
  type TicketCategory,
  type TicketPriority,
  type TicketStatus,
} from "@/config/help-guides";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/toast";
import {
  Plus,
  Paperclip,
  Search,
  HelpCircle,
  X,
} from "lucide-react";

const MAX_ATTACHMENTS = 3;

export function SupportTicketDesk() {
  const { currentUser } = useVisitorStore();
  const { tickets, addTicket } = useSupportStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState<TicketCategory>("IT Support");
  const [priority, setPriority] = useState<TicketPriority>("Medium");
  const [description, setDescription] = useState("");
  const [attachments, setAttachments] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<TicketStatus | "All">("All");

  const wid = currentUser.wid ?? 1;

  const handleAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    const remaining = MAX_ATTACHMENTS - attachments.length;
    const toAdd = files.slice(0, remaining).map((f) => f.name);
    if (files.length > remaining) {
      toast.warning(`Maximum ${MAX_ATTACHMENTS} attachments allowed`);
    }
    setAttachments((prev) => [...prev, ...toAdd].slice(0, MAX_ATTACHMENTS));
    e.target.value = "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) {
      toast.error("Subject and description are required");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      addTicket({
        subject: subject.trim(),
        category,
        priority,
        description: description.trim(),
        createdBy: currentUser.id,
        createdByName: currentUser.name,
        wid,
        attachmentNames: attachments,
      });
      toast.success("Support ticket submitted successfully");
      setSubject("");
      setDescription("");
      setCategory("IT Support");
      setPriority("Medium");
      setAttachments([]);
      setSubmitting(false);
    }, 400);
  };

  const filteredTickets = useMemo(() => {
    let list = tickets.filter((t) => t.createdBy === currentUser.id);

    if (statusFilter !== "All") {
      list = list.filter((t) => t.status === statusFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (t) =>
          t.subject.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.id.toLowerCase().includes(q)
      );
    }

    return list.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [tickets, currentUser.id, statusFilter, searchQuery]);

  const priorityColor = (p: TicketPriority) => {
    if (p === "Urgent") return "bg-rose-500/10 text-rose-600";
    if (p === "High") return "bg-amber-500/10 text-amber-600";
    if (p === "Medium") return "bg-sky-500/10 text-sky-600";
    return "bg-slate-500/10 text-slate-600";
  };

  const statusColor = (s: TicketStatus) => {
    if (s === "Open") return "bg-sky-500/10 text-sky-600";
    if (s === "In Progress") return "bg-amber-500/10 text-amber-600";
    if (s === "Resolved") return "bg-emerald-500/10 text-emerald-600";
    return "bg-slate-500/10 text-slate-500";
  };

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      {/* Raise ticket form */}
      <Card className="crm-card lg:col-span-2 h-fit">
        <CardContent className="p-6">
          <h2 className="text-sm font-black uppercase tracking-wider text-slate-800 dark:text-slate-100 mb-1">
            Raise a Support Ticket
          </h2>
          <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
            Log issues with visitor workflows, billing, or workspace configuration.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                Subject
              </label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. QR scanner not reading guest passes"
                className="h-10 rounded-xl"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                  Category
                </label>
                <Select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value as TicketCategory)
                  }
                  className="h-10 rounded-xl"
                >
                  {TICKET_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                  Priority
                </label>
                <Select
                  value={priority}
                  onChange={(e) =>
                    setPriority(e.target.value as TicketPriority)
                  }
                  className="h-10 rounded-xl"
                >
                  {TICKET_PRIORITIES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please provide full details of the issue..."
                rows={5}
                required
                className={cn(
                  "w-full min-w-0 rounded-xl border border-input bg-transparent px-3 py-2.5 text-sm transition-colors outline-none",
                  "placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                  "dark:bg-input/30 resize-none"
                )}
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                Attachments (max {MAX_ATTACHMENTS}, images compressed)
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf"
                multiple
                className="hidden"
                onChange={handleAttach}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={attachments.length >= MAX_ATTACHMENTS}
                className={cn(
                  "w-full flex items-center justify-center gap-2 h-11 rounded-xl border-2 border-dashed border-border/60",
                  "text-xs font-semibold text-slate-500 hover:border-sky-400/50 hover:text-sky-600 transition-colors cursor-pointer",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
              >
                <Paperclip className="h-4 w-4" />
                Attach Files (Max {MAX_ATTACHMENTS})
              </button>
              {attachments.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {attachments.map((name) => (
                    <li
                      key={name}
                      className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/40 rounded-lg px-2.5 py-1.5"
                    >
                      <span className="truncate">{name}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setAttachments((prev) =>
                            prev.filter((n) => n !== name)
                          )
                        }
                        className="text-slate-400 hover:text-rose-500 cursor-pointer p-0.5"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full h-11 rounded-xl border-0 gap-2 text-[11px] font-black uppercase tracking-wider"
            >
              <Plus className="h-4 w-4" />
              Submit Support Ticket
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Ticket list */}
      <Card className="crm-card lg:col-span-3 flex flex-col min-h-[520px]">
        <CardContent className="p-0 flex flex-col flex-1">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between p-4 border-b border-border/40">
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-500 shrink-0">
              My Tickets
            </p>

            <div className="flex flex-1 gap-2 sm:max-w-md sm:ml-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tickets..."
                  className="pl-9 h-9 rounded-xl text-xs"
                />
              </div>
              <Select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as TicketStatus | "All")
                }
                className="h-9 w-32 rounded-xl text-xs"
              >
                <option value="All">All Status</option>
                {TICKET_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div className="flex-1 p-4">
            {filteredTickets.length > 0 ? (
              <div className="space-y-3">
                {filteredTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="rounded-2xl border border-border/50 p-4 hover:border-sky-300/40 transition-colors"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {ticket.id}
                        </p>
                        <h3 className="font-bold text-slate-900 dark:text-white truncate">
                          {ticket.subject}
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        <Badge
                          className={cn(
                            "border-0 text-[10px] font-bold",
                            statusColor(ticket.status)
                          )}
                        >
                          {ticket.status}
                        </Badge>
                        <Badge
                          className={cn(
                            "border-0 text-[10px] font-bold",
                            priorityColor(ticket.priority)
                          )}
                        >
                          {ticket.priority}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                      {ticket.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-semibold text-slate-400">
                      <span>{ticket.category}</span>
                      <span>·</span>
                      <span>{ticket.createdByName}</span>
                      <span>·</span>
                      <span>
                        {format(new Date(ticket.createdAt), "d MMM yyyy, h:mm a")}
                      </span>
                      {ticket.attachmentNames.length > 0 && (
                        <>
                          <span>·</span>
                          <span className="inline-flex items-center gap-1">
                            <Paperclip className="h-3 w-3" />
                            {ticket.attachmentNames.length} file
                            {ticket.attachmentNames.length !== 1 ? "s" : ""}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800/50 text-slate-300 dark:text-slate-600 mb-4">
                  <HelpCircle className="h-8 w-8" />
                </span>
                <p className="text-sm text-muted-foreground italic">
                  No tickets found matching current filters.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
