"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/crm/page-header";
import {
  HelpTabBar,
  InteractiveGuides,
} from "@/components/help/interactive-guides";
import { SupportTicketDesk } from "@/components/help/support-ticket-desk";

function HelpCenterContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<"guides" | "tickets">("guides");

  useEffect(() => {
    if (searchParams.get("tab") === "tickets") {
      setActiveTab("tickets");
    }
  }, [searchParams]);

  return (
    <div className="space-y-8 select-none animate-in fade-in duration-300">
      <title>Help Center | Ansh Visitor</title>

      <PageHeader
        eyebrow="Help Center Support"
        title="Support & Guides Desk"
        description="Access tutorial logs and guides, or raise and track support tickets with our administration department."
      />

      <HelpTabBar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="pt-2">
        {activeTab === "guides" ? <InteractiveGuides /> : <SupportTicketDesk />}
      </div>
    </div>
  );
}

export default function HelpCenterPage() {
  return (
    <Suspense fallback={null}>
      <HelpCenterContent />
    </Suspense>
  );
}
