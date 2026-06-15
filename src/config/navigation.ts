import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  UsersRound,
  UserCheck,
  BarChart3,
  Settings,
  User,
  Building,
  QrCode,
  ClipboardList,
  Contact,
  BadgeCent,
  Users
} from "lucide-react";

export type NavSectionId =
  | "dashboard"
  | "visitors"
  | "check-in"
  | "team"
  | "reports"
  | "settings";

export interface SubNavItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

export interface MainNavItem {
  id: NavSectionId;
  label: string;
  href: string;
  icon: LucideIcon;
  subNav?: SubNavItem[];
}

export const mainNav: MainNavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "visitors",
    label: "Visitors Log",
    href: "/visitors",
    icon: UsersRound,
    subNav: [
      { id: "today-visitors", label: "Today's Guests", href: "/visitors", icon: Contact },
      { id: "pre-registered", label: "Pre-registered", href: "/visitors/pre-registered", icon: ClipboardList },
      { id: "all-visitors", label: "All Visitors Log", href: "/visitors/all", icon: UsersRound },
    ],
  },
  {
    id: "check-in",
    label: "Check-in Kiosk",
    href: "/check-in",
    icon: UserCheck,
    subNav: [
      { id: "kiosk-scan", label: "QR Code Scan", href: "/check-in", icon: QrCode },
      { id: "kiosk-manual", label: "Manual Entry", href: "/check-in/manual", icon: User },
    ],
  },
  {
    id: "team",
    label: "Team Directory",
    href: "/team",
    icon: Users,
  },
  {
    id: "reports",
    label: "Reports & Audits",
    href: "/reports",
    icon: BarChart3,
  },
  {
    id: "settings",
    label: "Settings",
    href: "/settings/profile",
    icon: Settings,
    subNav: [
      { id: "profile", label: "Profile Settings", href: "/settings/profile", icon: User },
      { id: "company", label: "Company Settings", href: "/settings/company", icon: Building },
      { id: "badge", label: "Badge Customizer", href: "/settings/badge", icon: BadgeCent },
    ],
  },
];

export function getSectionFromPath(pathname: string): NavSectionId {
  if (pathname === "/dashboard" || pathname === "/") return "dashboard";
  const segment = pathname.split("/")[1] as NavSectionId;
  const match = mainNav.find((item) => item.id === segment);
  return match?.id ?? "dashboard";
}

export function getSubNavForSection(sectionId: NavSectionId): SubNavItem[] | undefined {
  return mainNav.find((item) => item.id === sectionId)?.subNav;
}

export function getSectionMeta(sectionId: NavSectionId) {
  return mainNav.find((item) => item.id === sectionId);
}
