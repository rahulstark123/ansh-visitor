import type { LucideIcon } from "lucide-react";
import {
  FileText,
  QrCode,
  UserCheck,
  Building2,
} from "lucide-react";

export interface HelpGuide {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  iconClass: string;
  steps: string[];
}

export const HELP_GUIDES: HelpGuide[] = [
  {
    id: "pre-register",
    title: "How to Pre-register a Guest",
    description:
      "Learn how to invite visitors ahead of time, assign hosts, and send QR guest passes.",
    icon: FileText,
    iconClass: "bg-sky-500/10 text-sky-600",
    steps: [
      "Open Visitors Log → Registered Users or Today's Guests.",
      "Click Register Visitor and choose Pre-register mode.",
      "Enter guest name, email, phone, company, and visit purpose.",
      "Select the host employee who will receive arrival alerts.",
      "Submit — the guest receives a QR pass code for lobby check-in.",
    ],
  },
  {
    id: "desk-verify",
    title: "Verify Guests at the Desk",
    description:
      "Use the dashboard scanner to check in expected guests with QR codes or passcodes.",
    icon: QrCode,
    iconClass: "bg-indigo-500/10 text-indigo-600",
    steps: [
      "Open the Lobby Dashboard from the main navigation.",
      "Click Verify Guest to open the QR scanner or passcode entry.",
      "Scan the guest's QR pass or enter their 6-digit passcode.",
      "Confirm visitor details and complete ID proof if required.",
      "A badge number is assigned and the host is notified automatically.",
    ],
  },
  {
    id: "walk-in",
    title: "Managing Walk-in Visitors",
    description:
      "Register guests who arrive without pre-registration and capture ID proof at the desk.",
    icon: UserCheck,
    iconClass: "bg-violet-500/10 text-violet-600",
    steps: [
      "From Visitors Log, open Register Visitor and switch to Walk-in Entry.",
      "Collect visitor contact details and select purpose of visit.",
      "Map the guest to an available host in your directory.",
      "At check-in, record ID proof type and document number if enabled.",
      "Check out the visitor when they leave to complete the audit log.",
    ],
  },
  {
    id: "branches",
    title: "Office Branches & Team Setup",
    description:
      "Configure office locations, teammate branches, and workspace visitor protocols.",
    icon: Building2,
    iconClass: "bg-emerald-500/10 text-emerald-600",
    steps: [
      "Go to Settings → Company Settings to register office branches.",
      "Add branch name, address, city, state, and pincode for each location.",
      "In Team Directory, assign each host to their office branch.",
      "Set check-in protocols (ID proof, host approval) under Company Settings.",
      "Use Workspace Settings to manage departments and designations.",
    ],
  },
];

export const TICKET_CATEGORIES = [
  "IT Support",
  "Billing & Subscription",
  "Visitor Management",
  "Workspace Setup",
  "Badge & Passes",
  "Other",
] as const;

export const TICKET_PRIORITIES = ["Low", "Medium", "High", "Urgent"] as const;

export const TICKET_STATUSES = [
  "Open",
  "In Progress",
  "Resolved",
  "Closed",
] as const;

export type TicketCategory = (typeof TICKET_CATEGORIES)[number];
export type TicketPriority = (typeof TICKET_PRIORITIES)[number];
export type TicketStatus = (typeof TICKET_STATUSES)[number];
