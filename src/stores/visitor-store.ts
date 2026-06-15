import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { queuedLocalStorage } from "@/lib/safe-storage";

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
  initialize: () => Promise<void>;
  switchUser: (hostId: string) => void;
  addVisitor: (visitorData: Omit<Visitor, "id" | "status" | "preRegisteredAt" | "qrCode" | "badgeNumber">) => void;
  checkInVisitor: (visitorId: string, idProofType?: string, idProofNumber?: string) => void;
  checkOutVisitor: (visitorId: string) => void;
  registerWalkIn: (walkInData: Omit<Visitor, "id" | "status" | "preRegisteredAt" | "qrCode" | "checkedInAt">) => void;
  addHost: (hostData: Omit<Host, "id" | "avatarInitials" | "status">) => void;
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

      initialize: async () => {
        // Mock async initialization delay
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            resolve();
          }, 400);
        });
      },

      switchUser: (hostId) => {
        const host = get().hosts.find(h => h.id === hostId);
        if (host) {
          set({ currentUser: host });
        }
      },

      addVisitor: (visitorData) => {
        const passCode = Math.floor(100000 + Math.random() * 900000).toString();
        const newVisitor: Visitor = {
          ...visitorData,
          id: `vis-${Math.random().toString(36).substring(2, 9)}`,
          status: "Expected",
          preRegisteredAt: new Date().toISOString(),
          qrCode: passCode
        };

        set((state) => ({
          visitors: [newVisitor, ...state.visitors]
        }));
      },

      checkInVisitor: (visitorId, idProofType, idProofNumber) => {
        set((state) => ({
          visitors: state.visitors.map((v) => {
            if (v.id === visitorId) {
              return {
                ...v,
                status: "CheckedIn",
                idProofType,
                idProofNumber,
                checkedInAt: new Date().toISOString(),
                badgeNumber: `BADGE-${Math.floor(100 + Math.random() * 900)}`,
                notes: v.notes 
                  ? `${v.notes} (ID: ${idProofType || "checked"})` 
                  : idProofType 
                    ? `Verified via ${idProofType} (${idProofNumber || "N/A"})` 
                    : "ID verified at desk."
              };
            }
            return v;
          })
        }));
      },

      checkOutVisitor: (visitorId) => {
        set((state) => ({
          visitors: state.visitors.map((v) => {
            if (v.id === visitorId) {
              return {
                ...v,
                status: "CheckedOut",
                checkedOutAt: new Date().toISOString()
              };
            }
            return v;
          })
        }));
      },

      registerWalkIn: (walkInData) => {
        const passCode = Math.floor(100000 + Math.random() * 900000).toString();
        const newVisitor: Visitor = {
          ...walkInData,
          id: `vis-${Math.random().toString(36).substring(2, 9)}`,
          status: "CheckedIn",
          preRegisteredAt: new Date().toISOString(),
          checkedInAt: new Date().toISOString(),
          qrCode: passCode,
          badgeNumber: `BADGE-${Math.floor(100 + Math.random() * 900)}`
        };

        set((state) => ({
          visitors: [newVisitor, ...state.visitors]
        }));
      },

      addHost: (hostData) => {
        const initials = hostData.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .substring(0, 2);

        const newHost: Host = {
          ...hostData,
          id: `host-${Math.random().toString(36).substring(2, 9)}`,
          avatarInitials: initials,
          status: "Active"
        };

        set((state) => ({
          hosts: [...state.hosts, newHost]
        }));
      }
    }),
    {
      name: "ansh-visitor-data",
      version: 1,
      storage: createJSONStorage(() => queuedLocalStorage)
    }
  )
);
