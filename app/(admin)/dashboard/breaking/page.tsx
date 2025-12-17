import BreakingNewsClient from "@/components/admin/BreakingNewsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Breaking News Management - NewsBangla24 Admin",
  description:
    "Create and manage urgent news alerts that capture immediate attention in the NewsBangla24 admin panel.",
  keywords: "breaking news, alerts, admin, management, NewsBangla24",
  robots: "noindex, nofollow",
};

export default function BreakingNewsPage() {
  return <BreakingNewsClient />;
}
