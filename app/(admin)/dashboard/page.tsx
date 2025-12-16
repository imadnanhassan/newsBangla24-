import { Metadata } from "next";
import DashboardClient from "../../../components/clients/DashboardClient";

export const metadata: Metadata = {
  title: "Dashboard - NewsBangla24 Admin",
  description:
    "Admin dashboard for managing NewsBangla24 content, analytics, and operations.",
  keywords: "dashboard, admin, news, management, analytics",
};

export default function DashboardPage() {
  return <DashboardClient />;
}
