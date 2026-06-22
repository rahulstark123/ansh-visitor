import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { queuedLocalStorage } from "@/lib/safe-storage";
import type {
  TicketCategory,
  TicketPriority,
  TicketStatus,
} from "@/config/help-guides";

export interface TicketReply {
  id: string;
  sender: "Admin" | "User";
  senderName: string;
  message: string;
  createdAt: string;
}

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
  replies?: TicketReply[];
}

interface SupportState {
  tickets: SupportTicket[];
  addTicket: (
    ticket: Omit<SupportTicket, "id" | "createdAt" | "status" | "replies">
  ) => void;
  updateTicketStatus: (id: string, status: TicketStatus) => void;
  addReply: (ticketId: string, reply: Omit<TicketReply, "id" | "createdAt">) => void;
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
          replies: [],
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
      addReply: (ticketId, reply) => {
        const entry: TicketReply = {
          ...reply,
          id: `RP-${Date.now().toString(36).toUpperCase()}`,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          tickets: state.tickets.map((t) =>
            t.id === ticketId
              ? { ...t, replies: [...(t.replies ?? []), entry] }
              : t
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
