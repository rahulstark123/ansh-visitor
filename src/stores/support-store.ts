import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { queuedLocalStorage } from "@/lib/safe-storage";
import type {
  TicketCategory,
  TicketPriority,
  TicketStatus,
} from "@/config/help-guides";

export interface SupportTicket {
  id: string;
  subject: string;
  category: TicketCategory;
  priority: TicketPriority;
  description: string;
  status: TicketStatus;
  createdBy: string;
  createdByName: string;
  wid: number;
  createdAt: string;
  attachmentNames: string[];
}

interface SupportState {
  tickets: SupportTicket[];
  addTicket: (
    ticket: Omit<SupportTicket, "id" | "createdAt" | "status">
  ) => void;
  updateTicketStatus: (id: string, status: TicketStatus) => void;
}

export const useSupportStore = create<SupportState>()(
  persist(
    (set) => ({
      tickets: [],
      addTicket: (ticket) => {
        const entry: SupportTicket = {
          ...ticket,
          id: `TKT-${Date.now().toString(36).toUpperCase()}`,
          status: "Open",
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ tickets: [entry, ...state.tickets] }));
      },
      updateTicketStatus: (id, status) => {
        set((state) => ({
          tickets: state.tickets.map((t) =>
            t.id === id ? { ...t, status } : t
          ),
        }));
      },
    }),
    {
      name: "ansh-visitor-support",
      storage: createJSONStorage(() => queuedLocalStorage),
    }
  )
);
