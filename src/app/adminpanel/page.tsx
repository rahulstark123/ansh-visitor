"use client";

import { useState, useEffect, useMemo } from "react";
import { format } from "date-fns";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import {
  Lock,
  Mail,
  LayoutDashboard,
  MessageSquare,
  LogOut,
  Search,
  Filter,
  Paperclip,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight,
  Send,
  RefreshCw,
  FolderDot,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useSupportStore, type SupportTicket, type TicketReply } from "@/stores/support-store";
import { toast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

// HSL theme colors for Recharts
const COLORS = {
  Open: "#38bdf8",        // Sky
  "In Progress": "#fbbf24", // Amber
  Resolved: "#34d399",    // Emerald
  Closed: "#94a3b8",      // Slate
};

const PRIORITY_COLORS = {
  Low: "#a7f3d0",
  Medium: "#bae6fd",
  High: "#fde68a",
  Urgent: "#fecaca",
};

export default function AdminPanel() {
  const { tickets, updateTicketStatus, addReply } = useSupportStore();

  // Authentication State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");

  // Tab State
  const [activeTab, setActiveTab] = useState<"dashboard" | "messages">("dashboard");

  // Selection & Form State in Messages Tab
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [statusUpdate, setStatusUpdate] = useState<string>("");

  // Filters for Ticket List
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");

  // Mount safety check for Recharts hydration
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check session storage for existing auth
    if (typeof window !== "undefined") {
      const auth = sessionStorage.getItem("admin_auth");
      if (auth === "true") {
        setIsAuthenticated(true);
      }
    }
  }, []);

  // Handle Login submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "visitor@anshapps.com" && password === "Rahul@123") {
      setIsAuthenticated(true);
      setAuthError("");
      toast.success("Welcome back, Rahul!");
      if (typeof window !== "undefined") {
        sessionStorage.setItem("admin_auth", "true");
      }
    } else {
      setAuthError("Invalid email or password");
      toast.error("Authentication failed. Please verify credentials.");
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("admin_auth");
    }
    toast.success("Successfully logged out");
  };

  // Memoized filter list of tickets
  const filteredTickets = useMemo(() => {
    let list = [...tickets];

    if (statusFilter !== "All") {
      list = list.filter((t) => t.status === statusFilter);
    }
    if (categoryFilter !== "All") {
      list = list.filter((t) => t.category === categoryFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (t) =>
          t.subject.toLowerCase().includes(q) ||
          t.id.toLowerCase().includes(q) ||
          t.createdByName.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q)
      );
    }

    // Sort by newest first
    return list.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [tickets, statusFilter, categoryFilter, searchQuery]);

  // Selected ticket data
  const selectedTicket = useMemo(() => {
    return tickets.find((t) => t.id === selectedTicketId) || null;
  }, [tickets, selectedTicketId]);

  // Auto-set status update state when ticket selection changes
  useEffect(() => {
    if (selectedTicket) {
      setStatusUpdate(selectedTicket.status);
    }
  }, [selectedTicketId, selectedTicket]);

  // Dashboard Stats Calculations
  const stats = useMemo(() => {
    const total = tickets.length;
    const open = tickets.filter((t) => t.status === "Open").length;
    const inProgress = tickets.filter((t) => t.status === "In Progress").length;
    const resolved = tickets.filter((t) => t.status === "Resolved").length;
    const closed = tickets.filter((t) => t.status === "Closed").length;

    // Category breakdown data
    const categoriesMap: Record<string, number> = {};
    const prioritiesMap: Record<string, number> = {
      Low: 0,
      Medium: 0,
      High: 0,
      Urgent: 0,
    };

    tickets.forEach((t) => {
      categoriesMap[t.category] = (categoriesMap[t.category] || 0) + 1;
      prioritiesMap[t.priority] = (prioritiesMap[t.priority] || 0) + 1;
    });

    const categoryData = Object.entries(categoriesMap).map(([name, count]) => ({
      name,
      count,
    }));

    const priorityData = Object.entries(prioritiesMap).map(([name, count]) => ({
      name,
      count,
    }));

    const statusPieData = [
      { name: "Open", value: open, color: COLORS.Open },
      { name: "In Progress", value: inProgress, color: COLORS["In Progress"] },
      { name: "Resolved", value: resolved, color: COLORS.Resolved },
      { name: "Closed", value: closed, color: COLORS.Closed },
    ].filter((d) => d.value > 0);

    return {
      total,
      open,
      inProgress,
      resolved,
      closed,
      categoryData,
      priorityData,
      statusPieData,
    };
  }, [tickets]);

  // Handle Admin Reply Submission
  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicketId || !replyMessage.trim()) {
      toast.error("Please enter a reply message");
      return;
    }

    // Add reply to store
    addReply(selectedTicketId, {
      sender: "Admin",
      senderName: "Ansh Support",
      message: replyMessage.trim(),
    });

    // Update status if it changed
    if (statusUpdate && statusUpdate !== selectedTicket?.status) {
      updateTicketStatus(selectedTicketId, statusUpdate as any);
    }

    toast.success("Reply submitted successfully");
    setReplyMessage("");
  };

  // Helper colors for UI badges
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-sky-500/10 text-sky-600 border border-sky-200 dark:border-sky-500/20";
      case "In Progress":
        return "bg-amber-500/10 text-amber-600 border border-amber-200 dark:border-amber-500/20";
      case "Resolved":
        return "bg-emerald-500/10 text-emerald-600 border border-emerald-200 dark:border-emerald-500/20";
      case "Closed":
        return "bg-slate-500/10 text-slate-500 border border-slate-200 dark:border-slate-500/20";
      default:
        return "";
    }
  };

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case "Urgent":
        return "bg-rose-500/10 text-rose-600 border border-rose-200 dark:border-rose-500/20";
      case "High":
        return "bg-orange-500/10 text-orange-600 border border-orange-200 dark:border-orange-500/20";
      case "Medium":
        return "bg-sky-500/10 text-sky-600 border border-sky-200 dark:border-sky-500/20";
      default:
        return "bg-slate-500/10 text-slate-600 border border-slate-200 dark:border-slate-500/20";
    }
  };

  // Login Page View
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900/60 p-4 font-sans select-none relative overflow-hidden transition-colors duration-300">
        {/* Glow backgrounds */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in-95 duration-500">
          <div className="flex flex-col items-center mb-8">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-primary to-sky-400 flex items-center justify-center text-white shadow-xl shadow-primary/20 mb-3">
              <Lock className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-slate-800 dark:text-white">
              Ansh Support Admin
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              Enter your administrative credentials to manage tickets
            </p>
          </div>

          <Card className="border-0 shadow-2xl bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl rounded-3xl overflow-hidden">
            <CardContent className="p-8">
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400" />
                    <Input
                      type="email"
                      required
                      placeholder="visitor@anshapps.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-11 h-12 rounded-xl border-border/80 focus-visible:ring-primary/20 focus-visible:border-primary text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400" />
                    <Input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-11 h-12 rounded-xl border-border/80 focus-visible:ring-primary/20 focus-visible:border-primary text-sm"
                    />
                  </div>
                </div>

                {authError && (
                  <p className="text-xs font-semibold text-rose-500 bg-rose-500/10 p-3 rounded-xl flex items-center gap-2 animate-pulse">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {authError}
                  </p>
                )}

                <Button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-sky-500 text-white font-bold hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.01] active:scale-[0.99] transition-all border-0 text-xs tracking-wider uppercase"
                >
                  Verify Admin Access
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Admin Dashboard/Messages Main Panel
  return (
    <div className="min-h-screen flex bg-slate-50/50 dark:bg-slate-900/40 font-sans text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <title>Admin Support Dashboard | Ansh Visitor</title>

      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-border/60 bg-white dark:bg-slate-950/70 backdrop-blur-xl flex flex-col shrink-0">
        {/* Brand Header */}
        <div className="h-16 px-6 border-b border-border/50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-primary to-sky-400 flex items-center justify-center text-white shadow font-bold text-sm">
              A
            </div>
            <div>
              <p className="font-extrabold text-sm tracking-tight text-slate-800 dark:text-white leading-none">
                Ansh Apps
              </p>
              <span className="text-[10px] font-bold text-primary tracking-widest uppercase">
                Support Admin
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex-1 px-4 py-6 space-y-1.5">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer",
              activeTab === "dashboard"
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/50 hover:text-slate-800 dark:hover:text-white"
            )}
          >
            <LayoutDashboard className="h-4.5 w-4.5" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer relative",
              activeTab === "messages"
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/50 hover:text-slate-800 dark:hover:text-white"
            )}
          >
            <MessageSquare className="h-4.5 w-4.5" />
            <span>Messages</span>
            {stats.open > 0 && (
              <span className="absolute right-4 px-1.5 py-0.5 rounded-full bg-rose-500 text-[9px] font-black text-white leading-none">
                {stats.open}
              </span>
            )}
          </button>
        </nav>

        {/* Footer Admin Info & Logout */}
        <div className="p-4 border-t border-border/50">
          <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl mb-3">
            <div className="h-9 w-9 rounded-lg bg-sky-500/10 text-sky-600 flex items-center justify-center font-black text-xs">
              R
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-800 dark:text-white truncate">
                Rahul Stark
              </p>
              <p className="text-[10px] text-muted-foreground truncate">
                visitor@anshapps.com
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 h-10 rounded-xl text-xs font-bold text-rose-500 bg-rose-500/5 hover:bg-rose-500/10 active:scale-[0.99] border-0 transition-all cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Panel Viewport */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 border-b border-border/60 bg-white/70 dark:bg-slate-950/60 backdrop-blur-xl px-8 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
              {activeTab === "dashboard" ? "Dashboard Analytics" : "Messages Workspace"}
            </h2>
            <p className="text-xs text-muted-foreground">
              {activeTab === "dashboard"
                ? "Overview of incoming issues & team resolution performance"
                : `Manage and reply to customer inquiries (${filteredTickets.length} tickets matching filters)`}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
              Live Sync
            </span>
          </div>
        </header>

        {/* Tab Workspace */}
        <div className="flex-1 overflow-y-auto p-8">
          {activeTab === "dashboard" ? (
            /* ==================== DASHBOARD TAB ==================== */
            <div className="space-y-8 animate-in fade-in duration-300">
              {/* Stats KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                <Card className="crm-card border border-border/40 shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Total Issues
                      </p>
                      <h3 className="text-2xl font-black mt-1 text-slate-800 dark:text-white">
                        {stats.total}
                      </h3>
                    </div>
                    <span className="h-11 w-11 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-400">
                      <FolderDot className="h-5 w-5" />
                    </span>
                  </CardContent>
                </Card>

                <Card className="crm-card border border-border/40 shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-sky-400">
                        Open Status
                      </p>
                      <h3 className="text-2xl font-black mt-1 text-sky-600">
                        {stats.open}
                      </h3>
                    </div>
                    <span className="h-11 w-11 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-600">
                      <AlertCircle className="h-5 w-5" />
                    </span>
                  </CardContent>
                </Card>

                <Card className="crm-card border border-border/40 shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                        In Progress
                      </p>
                      <h3 className="text-2xl font-black mt-1 text-amber-500">
                        {stats.inProgress}
                      </h3>
                    </div>
                    <span className="h-11 w-11 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                      <Clock className="h-5 w-5" />
                    </span>
                  </CardContent>
                </Card>

                <Card className="crm-card border border-border/40 shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                        Resolved
                      </p>
                      <h3 className="text-2xl font-black mt-1 text-emerald-600">
                        {stats.resolved}
                      </h3>
                    </div>
                    <span className="h-11 w-11 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                      <CheckCircle2 className="h-5 w-5" />
                    </span>
                  </CardContent>
                </Card>
              </div>

              {/* Recharts Grid */}
              {mounted && (
                <div className="grid gap-6 lg:grid-cols-3">
                  {/* Status Pie Chart */}
                  <Card className="crm-card border border-border/40 rounded-2xl lg:col-span-1 min-h-[350px] flex flex-col justify-between">
                    <CardContent className="p-6 flex flex-col h-full">
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-4">
                        Ticket Status Distribution
                      </h4>
                      {stats.total > 0 ? (
                        <div className="flex-1 flex flex-col justify-center items-center">
                          <div className="h-44 w-full relative">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={stats.statusPieData}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={50}
                                  outerRadius={70}
                                  paddingAngle={4}
                                  dataKey="value"
                                >
                                  {stats.statusPieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                  ))}
                                </Pie>
                                <Tooltip
                                  contentStyle={{
                                    backgroundColor: "rgba(15, 23, 42, 0.9)",
                                    border: "none",
                                    borderRadius: "8px",
                                    color: "#fff",
                                    fontSize: "11px",
                                  }}
                                />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                          <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-[10px] font-bold mt-4">
                            {stats.statusPieData.map((d) => (
                              <div key={d.name} className="flex items-center gap-1.5">
                                <span
                                  className="h-2.5 w-2.5 rounded-full"
                                  style={{ backgroundColor: d.color }}
                                />
                                <span className="text-slate-500 dark:text-slate-400">
                                  {d.name}:
                                </span>
                                <span className="text-slate-800 dark:text-white">
                                  {d.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="flex-1 flex items-center justify-center text-xs text-muted-foreground italic">
                          No ticket data available
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Category Bar Chart */}
                  <Card className="crm-card border border-border/40 rounded-2xl lg:col-span-2 min-h-[350px]">
                    <CardContent className="p-6 h-full flex flex-col">
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-4">
                        Issues by Category
                      </h4>
                      {stats.categoryData.length > 0 ? (
                        <div className="flex-1 h-56 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <RechartsBarChart
                              data={stats.categoryData}
                              margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-800" />
                              <XAxis
                                dataKey="name"
                                tickLine={false}
                                axisLine={false}
                                tick={{ fontSize: 10, fill: "#94a3b8", fontWeight: 600 }}
                              />
                              <YAxis
                                tickLine={false}
                                axisLine={false}
                                allowDecimals={false}
                                tick={{ fontSize: 10, fill: "#94a3b8" }}
                              />
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "rgba(15, 23, 42, 0.9)",
                                  border: "none",
                                  borderRadius: "8px",
                                  color: "#fff",
                                  fontSize: "11px",
                                }}
                              />
                              <Bar dataKey="count" fill="#38bdf8" radius={[6, 6, 0, 0]} maxBarSize={35} />
                            </RechartsBarChart>
                          </ResponsiveContainer>
                        </div>
                      ) : (
                        <div className="flex-1 flex items-center justify-center text-xs text-muted-foreground italic">
                          No category data available
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Priorities Breakdown Card */}
              {mounted && stats.total > 0 && (
                <Card className="crm-card border border-border/40 rounded-2xl">
                  <CardContent className="p-6">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-4">
                      Severity & Priority Level Breakdown
                    </h4>
                    <div className="h-52 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={stats.priorityData}
                          margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-800" />
                          <XAxis
                            dataKey="name"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 10, fill: "#94a3b8", fontWeight: 600 }}
                          />
                          <YAxis
                            tickLine={false}
                            axisLine={false}
                            allowDecimals={false}
                            tick={{ fontSize: 10, fill: "#94a3b8" }}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "rgba(15, 23, 42, 0.9)",
                              border: "none",
                              borderRadius: "8px",
                              color: "#fff",
                              fontSize: "11px",
                            }}
                          />
                          <defs>
                            <linearGradient id="colorPriority" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#bae6fd" stopOpacity={0.8} />
                              <stop offset="95%" stopColor="#bae6fd" stopOpacity={0.1} />
                            </linearGradient>
                          </defs>
                          <Area
                            type="monotone"
                            dataKey="count"
                            stroke="#38bdf8"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorPriority)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            /* ==================== MESSAGES TAB ==================== */
            <div className="h-[calc(100vh-12rem)] flex gap-6 animate-in fade-in duration-300">
              {/* Left Column: Filterable Ticket List */}
              <div className="w-80 flex flex-col border border-border/50 bg-white dark:bg-slate-950/40 rounded-2xl overflow-hidden shrink-0">
                {/* Search & Filter Header */}
                <div className="p-4 border-b border-border/40 space-y-2.5 bg-slate-50/20 dark:bg-slate-950/10">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search tickets or user..."
                      className="pl-9 h-8.5 rounded-lg text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="h-8.5 rounded-lg text-[10px] font-bold"
                    >
                      <option value="All">All Status</option>
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                      <option value="Closed">Closed</option>
                    </Select>

                    <Select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="h-8.5 rounded-lg text-[10px] font-bold"
                    >
                      <option value="All">All Category</option>
                      <option value="IT Support">IT Support</option>
                      <option value="Billing & Subscription">Billing & Sub</option>
                      <option value="Visitor Management">Visitor Mgmt</option>
                      <option value="Workspace Setup">Workspace Setup</option>
                      <option value="Badge & Passes">Badge & Passes</option>
                      <option value="Other">Other</option>
                    </Select>
                  </div>
                </div>

                {/* Ticket Items Scroll Box */}
                <div className="flex-1 overflow-y-auto divide-y divide-border/30 p-2 space-y-1">
                  {filteredTickets.length > 0 ? (
                    filteredTickets.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setSelectedTicketId(t.id)}
                        className={cn(
                          "w-full text-left p-3.5 rounded-xl transition-all cursor-pointer border flex flex-col gap-1.5",
                          selectedTicketId === t.id
                            ? "bg-primary/5 dark:bg-primary/10 border-primary/40 dark:border-primary/30"
                            : "border-transparent hover:bg-slate-50 dark:hover:bg-slate-900/30"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black text-slate-400 dark:text-slate-500">
                            {t.id}
                          </span>
                          <span className="text-[9px] text-slate-400 font-semibold">
                            {format(new Date(t.createdAt), "d MMM, h:mm a")}
                          </span>
                        </div>

                        <h4 className="text-xs font-bold text-slate-800 dark:text-white truncate">
                          {t.subject}
                        </h4>

                        <p className="text-[10px] text-muted-foreground line-clamp-1">
                          {t.description}
                        </p>

                        <div className="flex items-center justify-between mt-1">
                          <span className="text-[9px] font-bold text-slate-400">
                            {t.createdByName}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <Badge className={cn("text-[9px] font-bold border-0 px-1.5 py-0.5", getStatusBadgeClass(t.status))}>
                              {t.status}
                            </Badge>
                            <Badge className={cn("text-[9px] font-bold border-0 px-1.5 py-0.5", getPriorityBadgeClass(t.priority))}>
                              {t.priority}
                            </Badge>
                          </div>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="py-12 text-center text-xs text-muted-foreground italic">
                      No support tickets found
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Ticket Detail Workspace */}
              <div className="flex-1 flex flex-col border border-border/50 bg-white dark:bg-slate-950/40 rounded-2xl overflow-hidden">
                {selectedTicket ? (
                  <div className="flex-1 flex flex-col min-h-0">
                    {/* Header Detail */}
                    <div className="p-5 border-b border-border/40 bg-slate-50/20 dark:bg-slate-950/10 flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-primary">
                            {selectedTicket.id}
                          </span>
                          <span className="text-slate-300 dark:text-slate-700">|</span>
                          <span className="text-[10px] font-semibold text-slate-400">
                            Category: {selectedTicket.category}
                          </span>
                        </div>
                        <h3 className="font-extrabold text-slate-800 dark:text-white mt-1">
                          {selectedTicket.subject}
                        </h3>
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          Submitted by <span className="font-bold text-slate-600 dark:text-slate-300">{selectedTicket.createdByName}</span> on {format(new Date(selectedTicket.createdAt), "d MMMM yyyy, h:mm a")}
                        </p>
                      </div>

                      {/* Ticket Status Quick Selector */}
                      <div className="flex items-center gap-2.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 shrink-0">
                          Update Status:
                        </label>
                        <Select
                          value={statusUpdate}
                          onChange={(e) => {
                            const newStatus = e.target.value;
                            setStatusUpdate(newStatus);
                            updateTicketStatus(selectedTicket.id, newStatus as any);
                            toast.success(`Ticket status changed to ${newStatus}`);
                          }}
                          className="h-8.5 w-36 rounded-lg text-xs font-bold"
                        >
                          <option value="Open">Open</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Resolved">Resolved</option>
                          <option value="Closed">Closed</option>
                        </Select>
                      </div>
                    </div>

                    {/* Replies & Conversations Stream */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/20 dark:bg-slate-900/10">
                      {/* Ticket Initial Message / Description */}
                      <div className="flex items-start gap-3.5 max-w-[85%]">
                        <div className="h-8 w-8 rounded-lg bg-sky-500/10 text-sky-600 flex items-center justify-center font-black text-xs shrink-0">
                          {selectedTicket.createdByName[0]?.toUpperCase() || "U"}
                        </div>
                        <div className="bg-white dark:bg-slate-900 border border-border/50 rounded-2xl rounded-tl-none p-4 shadow-sm">
                          <p className="text-xs font-bold text-slate-400 mb-1.5">
                            {selectedTicket.createdByName} (User Inquiry)
                          </p>
                          <p className="text-sm text-slate-700 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">
                            {selectedTicket.description}
                          </p>

                          {/* Attachments list if any */}
                          {selectedTicket.attachmentNames && selectedTicket.attachmentNames.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-border/40">
                              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5 mb-2">
                                <Paperclip className="h-3 w-3" />
                                Attachments ({selectedTicket.attachmentNames.length})
                              </p>
                              <ul className="space-y-1">
                                {selectedTicket.attachmentNames.map((name) => (
                                  <li
                                    key={name}
                                    className="inline-flex items-center gap-2 text-xs text-primary font-semibold hover:underline bg-slate-50 dark:bg-slate-950/40 px-2.5 py-1 rounded-lg border border-border/40 mr-2"
                                  >
                                    <span>{name}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Reply threads */}
                      {selectedTicket.replies && selectedTicket.replies.length > 0 ? (
                        selectedTicket.replies.map((reply: TicketReply) => {
                          const isAdmin = reply.sender === "Admin";
                          return (
                            <div
                              key={reply.id}
                              className={cn(
                                "flex items-start gap-3.5 max-w-[85%]",
                                isAdmin ? "ml-auto flex-row-reverse" : ""
                              )}
                            >
                              <div
                                className={cn(
                                  "h-8 w-8 rounded-lg flex items-center justify-center font-black text-xs shrink-0",
                                  isAdmin
                                    ? "bg-primary/10 text-primary"
                                    : "bg-sky-500/10 text-sky-600"
                                )}
                              >
                                {isAdmin ? "AD" : reply.senderName[0]?.toUpperCase() || "U"}
                              </div>
                              <div
                                className={cn(
                                  "border rounded-2xl p-4 shadow-sm",
                                  isAdmin
                                    ? "bg-primary border-primary text-white rounded-tr-none"
                                    : "bg-white dark:bg-slate-900 border-border/50 rounded-tl-none"
                                )}
                              >
                                <p
                                  className={cn(
                                    "text-[10px] font-bold mb-1.5",
                                    isAdmin
                                      ? "text-white/70"
                                      : "text-slate-400"
                                  )}
                                >
                                  {reply.senderName} ({isAdmin ? "Support Admin" : "User Response"})
                                </p>
                                <p
                                  className={cn(
                                    "text-sm whitespace-pre-wrap leading-relaxed",
                                    isAdmin ? "text-white" : "text-slate-700 dark:text-slate-200"
                                  )}
                                >
                                  {reply.message}
                                </p>
                                <span
                                  className={cn(
                                    "block text-[8px] font-semibold text-right mt-1.5",
                                    isAdmin ? "text-white/60" : "text-slate-400"
                                  )}
                                >
                                  {format(new Date(reply.createdAt), "d MMM, h:mm a")}
                                </span>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="py-8 text-center text-xs text-muted-foreground italic">
                          No replies posted yet. Compose a message below to start the support stream.
                        </div>
                      )}
                    </div>

                    {/* Compose Reply Form */}
                    <div className="p-4 border-t border-border/40 bg-white dark:bg-slate-950/60 backdrop-blur-xl">
                      <form onSubmit={handleSendReply} className="flex gap-3">
                        <textarea
                          value={replyMessage}
                          onChange={(e) => setReplyMessage(e.target.value)}
                          placeholder="Type your official support response here..."
                          rows={2}
                          required
                          className={cn(
                            "flex-1 min-w-0 rounded-xl border border-border bg-slate-50 dark:bg-slate-900/40 px-3.5 py-2.5 text-sm transition-colors outline-none",
                            "placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20",
                            "dark:border-border/50 resize-none h-16"
                          )}
                        />
                        <div className="flex flex-col gap-2 shrink-0">
                          <Button
                            type="submit"
                            className="btn-primary h-16 px-4 rounded-xl gap-2 font-bold text-xs uppercase tracking-wider shrink-0"
                          >
                            <Send className="h-4 w-4" />
                            Send
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                    <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-900 text-slate-300 dark:text-slate-700 mb-4 animate-bounce">
                      <MessageSquare className="h-8 w-8" />
                    </span>
                    <h3 className="font-extrabold text-slate-800 dark:text-white">
                      No Ticket Selected
                    </h3>
                    <p className="text-xs text-muted-foreground max-w-xs mt-1">
                      Choose an active support ticket from the list on the left to read inquiries and send replies.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
