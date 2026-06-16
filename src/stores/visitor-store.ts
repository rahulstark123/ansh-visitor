import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { queuedLocalStorage } from "@/lib/safe-storage";
import { createSupabaseClient } from "@/lib/supabase";
import type { WorkspacePlanTier } from "@/config/billing";
import { getTrialDaysLeft, getTrialEndDate } from "@/config/billing";
import { toast } from "@/components/ui/toast";
import { QR_VALIDITY_OPTIONS, type QrValidityPeriod } from "@/lib/qr-validity";

export interface OfficeBranchMeta {
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  allowWfh: boolean;
}

export interface Host {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  avatarInitials: string;
  status: string;
  phone?: string;
  dob?: string;
  code?: string;
  joiningDate?: string;
  designation?: string;
  officeBranch?: string;
  workLocation?: string;
  reportingManager?: string;
  reportingHR?: string;
  personalEmail?: string;
  bloodGroup?: string;
  emergencyName?: string;
  emergencyPhone?: string;
  wid?: number;
}

export interface Visitor {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  purpose: "Interview" | "Meeting" | "Delivery" | "Vendor" | "Other";
  status: "Expected" | "CheckedIn" | "CheckedOut";
  hostId: string;
  hostName: string;
  checkedInAt?: string;
  checkedOutAt?: string;
  preRegisteredAt: string;
  badgeNumber?: string;
  qrCode?: string;
  qrValidUntil?: string;
  walkIn?: boolean;
  notes?: string;
  idProofType?: string;
  idProofNumber?: string;
}

interface VisitorState {
  currentUser: Host;
  hosts: Host[];
  visitors: Visitor[];
  plan: {
    name: string;
    visitorsCount: number;
    maxVisitors: number;
    locations: number;
  };
  workspacePlan: WorkspacePlanTier;
  workspaceCreatedAt: string | null;
  workspaceName: string;
  setWorkspacePlan: (plan: WorkspacePlanTier, createdAt?: string | null) => void;
  initialize: () => Promise<void>;
  switchUser: (hostId: string) => void;
  addVisitor: (
    visitorData: Omit<Visitor, "id" | "status" | "preRegisteredAt" | "qrCode" | "badgeNumber" | "qrValidUntil"> & {
      qrValidityPeriod?: QrValidityPeriod;
    }
  ) => Promise<Visitor | undefined>;
  checkInVisitor: (visitorId: string, idProofType?: string, idProofNumber?: string) => Promise<void>;
  checkOutVisitor: (visitorId: string) => Promise<void>;
  registerWalkIn: (walkInData: Omit<Visitor, "id" | "status" | "preRegisteredAt" | "qrCode" | "checkedInAt">) => Promise<void>;
  addHost: (hostData: Omit<Host, "id" | "avatarInitials" | "status" | "wid">) => Promise<void>;
  updateHost: (hostId: string, hostData: Partial<Host>) => Promise<void>;
  deleteHost: (hostId: string) => Promise<void>;
  updateCurrentUser: (hostData: Partial<Host>) => Promise<void>;
  departments: string[];
  designations: string[];
  officeBranches: string[];
  officeBranchMeta: Record<string, OfficeBranchMeta>;
  workLocations: string[];
  addDepartment: (dept: string) => void;
  deleteDepartment: (dept: string) => void;
  addDesignation: (desig: string) => void;
  deleteDesignation: (desig: string) => void;
  addOfficeBranch: (branch: string | OfficeBranchMeta) => void;
  deleteOfficeBranch: (branch: string) => void;
  addWorkLocation: (loc: string) => void;
  deleteWorkLocation: (loc: string) => void;
  registerGuestOpen: boolean;
  registerGuestPrefill: RegisterGuestPrefill | null;
  registerGuestRequestId: number;
  openRegisterGuest: (prefill?: RegisterGuestPrefill) => void;
  closeRegisterGuest: () => void;
}

export interface RegisterGuestPrefill {
  mode?: "pre-register" | "walk-in";
  isEmployee?: boolean;
  employeeId?: string;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
}

const SEEDED_HOSTS: Host[] = [
  {
    id: "host-1",
    name: "Vikram Raj",
    email: "vikram@ansh.com",
    role: "Admin",
    department: "HR & Operations",
    avatarInitials: "VR",
    status: "Active",
  },
  {
    id: "host-2",
    name: "Priya Sharma",
    email: "priya.sharma@ansh.com",
    role: "Manager",
    department: "Engineering",
    avatarInitials: "PS",
    status: "Active",
  },
  {
    id: "host-3",
    name: "Amit Patel",
    email: "amit.patel@ansh.com",
    role: "Employee",
    department: "Product Management",
    avatarInitials: "AP",
    status: "Active",
  },
  {
    id: "host-4",
    name: "Rohan Gupta",
    email: "rohan.gupta@ansh.com",
    role: "Employee",
    department: "Enterprise Sales",
    avatarInitials: "RG",
    status: "Active",
  },
];

const SEEDED_VISITORS: Visitor[] = [
  {
    id: "vis-1",
    name: "Aarav Mehta",
    email: "aarav.mehta@acme.com",
    phone: "+91 98765 43210",
    company: "Acme Corp",
    purpose: "Meeting",
    status: "CheckedIn",
    hostId: "host-1",
    hostName: "Vikram Raj",
    checkedInAt: new Date(new Date().setHours(9, 30, 0)).toISOString(),
    preRegisteredAt: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    badgeNumber: "BADGE-101",
    qrCode: "729481",
    walkIn: false,
    notes: "Lobby meeting regarding payroll solutions."
  },
  {
    id: "vis-2",
    name: "Ananya Roy",
    email: "ananya.roy@design.io",
    phone: "+91 91234 56789",
    company: "Pixel Studio",
    purpose: "Interview",
    status: "Expected",
    hostId: "host-2",
    hostName: "Priya Sharma",
    preRegisteredAt: new Date().toISOString(),
    qrCode: "839402",
    walkIn: false,
    notes: "Frontend Designer candidate round 2."
  },
  {
    id: "vis-3",
    name: "Kabir Singh",
    email: "kabir.singh@techcorp.in",
    phone: "+91 88888 77777",
    company: "TechCorp India",
    purpose: "Vendor",
    status: "CheckedOut",
    hostId: "host-3",
    hostName: "Amit Patel",
    checkedInAt: new Date(new Date().setHours(10, 0, 0)).toISOString(),
    checkedOutAt: new Date(new Date().setHours(11, 45, 0)).toISOString(),
    preRegisteredAt: new Date().toISOString(),
    badgeNumber: "BADGE-102",
    qrCode: "610293",
    walkIn: false,
    notes: "Consulting about server migrations."
  },
  {
    id: "vis-4",
    name: "Meera Nair",
    email: "meera.nair@logistic.com",
    phone: "+91 77777 66666",
    company: "Swift Logistics",
    purpose: "Delivery",
    status: "CheckedIn",
    hostId: "host-4",
    hostName: "Rohan Gupta",
    checkedInAt: new Date(new Date().setHours(11, 15, 0)).toISOString(),
    preRegisteredAt: new Date().toISOString(),
    badgeNumber: "BADGE-103",
    qrCode: "492015",
    walkIn: true,
    notes: "Delivering sample marketing banners."
  }
];

export const useVisitorStore = create<VisitorState>()(
  persist(
    (set, get) => ({
      currentUser: SEEDED_HOSTS[0],
      hosts: SEEDED_HOSTS,
      visitors: SEEDED_VISITORS,
      plan: {
        name: "Free Plan",
        visitorsCount: 15,
        maxVisitors: 100,
        locations: 1
      },
      workspacePlan: "pro_trial",
      workspaceCreatedAt: new Date().toISOString(),
      workspaceName: "Workspace",
      departments: ["Engineering", "HR & Operations", "Product Management", "Enterprise Sales"],
      designations: ["Software Engineer", "Senior Developer", "Product Manager", "HR Manager", "Operations Admin", "Security Officer", "Sales Director"],
      officeBranches: ["HQ - Bangalore", "Delhi Branch", "Mumbai Office"],
      officeBranchMeta: {
        "HQ - Bangalore": {
          name: "HQ - Bangalore",
          address: "Electronic City Phase 1, Hosur Road",
          city: "Bangalore",
          state: "Karnataka",
          pincode: "560100",
          allowWfh: true,
        },
        "Delhi Branch": {
          name: "Delhi Branch",
          address: "Connaught Place, Block A",
          city: "New Delhi",
          state: "Delhi",
          pincode: "110001",
          allowWfh: false,
        },
        "Mumbai Office": {
          name: "Mumbai Office",
          address: "Bandra Kurla Complex, G Block",
          city: "Mumbai",
          state: "Maharashtra",
          pincode: "400051",
          allowWfh: true,
        },
      },
      workLocations: ["Remote", "On-site", "Hybrid"],
      registerGuestOpen: false,
      registerGuestPrefill: null,
      registerGuestRequestId: 0,

      openRegisterGuest: (prefill) => {
        set((state) => ({
          registerGuestOpen: true,
          registerGuestPrefill: prefill ?? null,
          registerGuestRequestId: state.registerGuestRequestId + 1,
        }));
      },

      closeRegisterGuest: () => {
        set({
          registerGuestOpen: false,
          registerGuestPrefill: null,
        });
      },

      initialize: async () => {
        try {
          const supabase = createSupabaseClient();
          const { data: { user } } = await supabase.auth.getUser();

          if (!user) return;

          // 1. Fetch user's profile from database
          const profileRes = await fetch(`/api/profiles/${user.id}`);
          if (!profileRes.ok) return;
          const { profile: currentUserProfile } = await profileRes.json();
          const wid = currentUserProfile.wid ?? 1;

          // 2. Fetch workspace from database
          const workspaceRes = await fetch(`/api/workspace?wid=${wid}`);
          let workspacePlan: WorkspacePlanTier = "pro_trial";
          let workspaceCreatedAt: string | null = get().workspaceCreatedAt;
          let workspaceName = get().workspaceName;
          if (workspaceRes.ok) {
            const { workspace } = await workspaceRes.json();
            workspaceCreatedAt = workspace.createdAt;
            workspaceName = workspace.name ?? "Workspace";
            if (workspace.plan === "pro") {
              workspacePlan = "pro";
            } else if (workspace.plan === "pro_trial") {
              workspacePlan = "pro_trial";
            } else {
              const trialEnd = getTrialEndDate(workspace.createdAt);
              workspacePlan = getTrialDaysLeft(trialEnd) > 0 ? "pro_trial" : "free";
            }
          }

          // 3. Fetch workspace config from database
          const configRes = await fetch(`/api/workspace/config?wid=${wid}`);
          let configData = {};
          if (configRes.ok) {
            const { config } = await configRes.json();
            configData = {
              departments: config.departments,
              designations: config.designations,
              officeBranches: config.officeBranches,
              workLocations: config.workLocations,
            };
          }

          // 4. Fetch hosts from database
          const hostsRes = await fetch(`/api/profiles?wid=${wid}`);
          let hostsData = [];
          if (hostsRes.ok) {
            const { profiles } = await hostsRes.json();
            hostsData = profiles;
          }

          // 5. Fetch visitors from database
          const visitorsRes = await fetch(`/api/visitors?wid=${wid}`);
          let visitorsData = [];
          if (visitorsRes.ok) {
            const { visitors } = await visitorsRes.json();
            visitorsData = visitors;
          }

          const visitorsCount = visitorsData.length || get().visitors.length;
          const planName =
            workspacePlan === "pro"
              ? "Pro Plan"
              : workspacePlan === "pro_trial"
                ? "Pro Trial"
                : "Free Plan";

          set({
            currentUser: currentUserProfile,
            hosts: hostsData.length > 0 ? hostsData : get().hosts,
            visitors: visitorsData,
            workspacePlan,
            workspaceCreatedAt,
            workspaceName,
            plan: {
              name: planName,
              visitorsCount,
              maxVisitors: workspacePlan === "pro" ? 999999 : 100,
              locations: workspacePlan === "pro" ? 99 : 1,
            },
            ...configData,
          });
        } catch (err) {
          console.error("Failed to initialize visitor store from DB:", err);
        }
      },

      switchUser: (hostId) => {
        const host = get().hosts.find(h => h.id === hostId);
        if (host) {
          set({ currentUser: host });
        }
      },

      setWorkspacePlan: (plan, createdAt) => {
        const planName =
          plan === "pro" ? "Pro Plan" : plan === "pro_trial" ? "Pro Trial" : "Free Plan";
        set({
          workspacePlan: plan,
          workspaceCreatedAt: createdAt ?? get().workspaceCreatedAt,
          plan: {
            ...get().plan,
            name: planName,
            maxVisitors: plan === "pro" ? 999999 : 100,
            locations: plan === "pro" ? 99 : 1,
          },
        });
      },

      addVisitor: async (visitorData) => {
        try {
          const wid = get().currentUser?.wid ?? 1;
          const res = await fetch("/api/visitors", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...visitorData, wid, walkIn: false }),
          });
          if (res.ok) {
            const { visitor } = await res.json();
            set((state) => ({
              visitors: [visitor, ...state.visitors]
            }));
            const periodLabel =
              QR_VALIDITY_OPTIONS.find(
                (o) => o.value === visitorData.qrValidityPeriod
              )?.label ?? "24 Hours";
            toast.success(
              "Visitor pass issued",
              `${visitor.name} · Passcode ${visitor.qrCode} · Valid for ${periodLabel}`
            );
            return visitor;
          }
          const data = await res.json().catch(() => ({}));
          toast.error(
            "Could not issue pass",
            data.error || "Please try again."
          );
        } catch (err) {
          console.error("Failed to add visitor:", err);
          toast.error("Could not issue pass", "Network error. Please try again.");
        }
        return undefined;
      },

      checkInVisitor: async (visitorId, idProofType, idProofNumber) => {
        const existing = get().visitors.find((v) => v.id === visitorId);
        try {
          const res = await fetch(`/api/visitors/${visitorId}/check-in`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idProofType, idProofNumber }),
          });
          const data = await res.json().catch(() => ({}));
          if (!res.ok) {
            const message = data.error || "Failed to check in guest";
            toast.error("Check-in failed", message);
            throw new Error(message);
          }
          const { visitor } = data;
          set((state) => ({
            visitors: state.visitors.map((v) => {
              if (v.id === visitorId) {
                return {
                  ...v,
                  status: visitor.status,
                  checkedInAt: visitor.checkedInAt,
                  checkedOutAt: undefined,
                  badgeNumber: visitor.badgeNumber,
                  idProofType: visitor.idProofType,
                  idProofNumber: visitor.idProofNumber,
                  notes: v.notes
                    ? `${v.notes} (ID: ${idProofType || "checked"})`
                    : idProofType
                      ? `Verified via ${idProofType} (${idProofNumber || "N/A"})`
                      : "ID verified at desk.",
                };
              }
              return v;
            }),
          }));
          const guestName = existing?.name ?? "Guest";
          const badge = visitor.badgeNumber ? ` · Badge ${visitor.badgeNumber}` : "";
          toast.success(
            "Check-in complete",
            `${guestName} is now checked in${badge}.`
          );
        } catch (err) {
          console.error("Failed to check in visitor:", err);
          if (err instanceof TypeError) {
            toast.error("Check-in failed", "Network error. Please try again.");
          }
          throw err;
        }
      },

      checkOutVisitor: async (visitorId) => {
        const existing = get().visitors.find((v) => v.id === visitorId);
        try {
          const res = await fetch(`/api/visitors/${visitorId}/check-out`, {
            method: "PATCH",
          });
          const data = await res.json().catch(() => ({}));
          if (!res.ok) {
            const message = data.error || "Failed to check out guest";
            toast.error("Check-out failed", message);
            throw new Error(message);
          }
          const { visitor } = data;
          set((state) => ({
            visitors: state.visitors.map((v) =>
              v.id === visitorId
                ? {
                    ...v,
                    status: visitor.status,
                    checkedOutAt: visitor.checkedOutAt,
                  }
                : v
            ),
          }));
          toast.success(
            "Check-out complete",
            `${existing?.name ?? "Guest"} has left the building.`
          );
        } catch (err) {
          console.error("Failed to check out visitor:", err);
          if (err instanceof TypeError) {
            toast.error("Check-out failed", "Network error. Please try again.");
          }
          throw err;
        }
      },

      registerWalkIn: async (walkInData) => {
        try {
          const wid = get().currentUser?.wid ?? 1;
          const res = await fetch("/api/visitors", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...walkInData, wid, walkIn: true }),
          });
          if (res.ok) {
            const { visitor } = await res.json();
            set((state) => ({
              visitors: [visitor, ...state.visitors]
            }));
            toast.success(
              "Walk-in checked in",
              `${visitor.name} is checked in · Passcode ${visitor.qrCode}${
                visitor.badgeNumber ? ` · Badge ${visitor.badgeNumber}` : ""
              }`
            );
            return;
          }
          const data = await res.json().catch(() => ({}));
          toast.error(
            "Walk-in failed",
            data.error || "Could not register walk-in guest."
          );
        } catch (err) {
          console.error("Failed to register walk-in visitor:", err);
          toast.error("Walk-in failed", "Network error. Please try again.");
        }
      },

      addHost: async (hostData) => {
        try {
          const wid = get().currentUser?.wid ?? 1;
          const res = await fetch("/api/profiles", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...hostData, wid }),
          });
          if (res.ok) {
            const { profile } = await res.json();
            set((state) => ({
              hosts: [...state.hosts, profile]
            }));
          } else {
            console.error("Failed to add host api status:", res.status);
          }
        } catch (err) {
          console.error("Failed to add host:", err);
        }
      },

      updateHost: async (hostId, hostData) => {
        try {
          const res = await fetch(`/api/profiles/${hostId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(hostData),
          });
          if (res.ok) {
            const { profile } = await res.json();
            set((state) => ({
              hosts: state.hosts.map((h) => (h.id === hostId ? profile : h)),
              currentUser: state.currentUser.id === hostId ? profile : state.currentUser,
            }));
          }
        } catch (err) {
          console.error("Failed to update host:", err);
        }
      },

      deleteHost: async (hostId) => {
        const host = get().hosts.find((h) => h.id === hostId);
        try {
          const res = await fetch(`/api/profiles/${hostId}`, {
            method: "DELETE",
          });
          if (res.ok) {
            set((state) => ({
              hosts: state.hosts.filter((h) => h.id !== hostId),
            }));
            toast.success(
              "Teammate deleted",
              `${host?.name ?? "User"} was removed from the directory.`
            );
            return;
          }
          const data = await res.json().catch(() => ({}));
          toast.error(
            "Delete failed",
            data.error || "Could not remove teammate."
          );
        } catch (err) {
          console.error("Failed to delete host:", err);
          toast.error("Delete failed", "Network error. Please try again.");
        }
      },

      updateCurrentUser: async (hostData) => {
        const userId = get().currentUser?.id;
        if (!userId) return;
        await get().updateHost(userId, hostData);
      },

      addDepartment: (dept) => {
        if (!dept.trim() || get().departments.includes(dept.trim())) return;
        set((state) => ({ departments: [...state.departments, dept.trim()] }));
      },
      deleteDepartment: (dept) => {
        set((state) => ({ departments: state.departments.filter((d) => d !== dept) }));
      },
      addDesignation: (desig) => {
        if (!desig.trim() || get().designations.includes(desig.trim())) return;
        set((state) => ({ designations: [...state.designations, ...desig.split(",").map((s) => s.trim())] }));
      },
      deleteDesignation: (desig) => {
        set((state) => ({ designations: state.designations.filter((d) => d !== desig) }));
      },
      addOfficeBranch: (branch) => {
        const meta: OfficeBranchMeta =
          typeof branch === "string"
            ? {
                name: branch.trim(),
                address: "",
                city: "",
                state: "",
                pincode: "",
                allowWfh: false,
              }
            : branch;
        const name = meta.name.trim();
        if (!name || get().officeBranches.includes(name)) return;
        set((state) => ({
          officeBranches: [...state.officeBranches, name],
          officeBranchMeta: { ...state.officeBranchMeta, [name]: { ...meta, name } },
        }));
      },
      deleteOfficeBranch: (branch) => {
        set((state) => {
          const { [branch]: _, ...restMeta } = state.officeBranchMeta;
          return {
            officeBranches: state.officeBranches.filter((b) => b !== branch),
            officeBranchMeta: restMeta,
          };
        });
      },
      addWorkLocation: (loc) => {
        if (!loc.trim() || get().workLocations.includes(loc.trim())) return;
        set((state) => ({ workLocations: [...state.workLocations, loc.trim()] }));
      },
      deleteWorkLocation: (loc) => {
        set((state) => ({ workLocations: state.workLocations.filter((l) => l !== loc) }));
      }
    }),
    {
      name: "ansh-visitor-data",
      version: 3,
      migrate: (persisted, version) => {
        const state = persisted as Record<string, unknown>;
        if (version < 2 && state.officeBranches && !state.officeBranchMeta) {
          const branches = state.officeBranches as string[];
          state.officeBranchMeta = Object.fromEntries(
            branches.map((name) => [
              name,
              { name, address: "", city: "", state: "", pincode: "", allowWfh: false },
            ])
          );
        }
        if (version < 3) {
          state.workspacePlan = state.workspacePlan ?? "pro_trial";
          state.workspaceCreatedAt =
            state.workspaceCreatedAt ?? new Date().toISOString();
        }
        return state;
      },
      storage: createJSONStorage(() => queuedLocalStorage)
    }
  )
);
