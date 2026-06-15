"use client";

import { VisitorLogList } from "@/components/crm/visitor-log-list";

export default function TodayVisitorsPage() {
  return <VisitorLogList filterType="today" />;
}
