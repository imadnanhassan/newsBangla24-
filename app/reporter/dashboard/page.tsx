import { Metadata } from "next";
import ReporterDashboardClient from "../../../components/clients/ReporterDashboardClient";

export const metadata: Metadata = {
  title: "Reporter Dashboard - NewsBangla24",
  description: "Reporter dashboard for managing articles and content creation.",
  keywords: "reporter, dashboard, articles, news, content",
};

export default function ReporterDashboardPage() {
  return <ReporterDashboardClient />;
}
