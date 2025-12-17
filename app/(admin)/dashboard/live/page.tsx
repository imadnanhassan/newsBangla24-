import LiveNewsClient from "@/components/admin/LiveNewsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live News Management - NewsBangla24 Admin",
  description:
    "Manage live streams and real-time coverage for breaking news and events in the NewsBangla24 admin panel.",
  keywords:
    "live news, streaming, real-time, coverage, admin, management, NewsBangla24",
  robots: "noindex, nofollow", // Since it's admin
};

export default function LiveNewsPage() {
  return <LiveNewsClient />;
}
