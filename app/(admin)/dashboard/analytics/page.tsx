import { Metadata } from "next";
import AnalyticsClient from "../../../../components/clients/AnalyticsClient";

export const metadata: Metadata = {
  title: "Analytics - NewsBangla24 Admin",
  description:
    "View detailed analytics and performance metrics for NewsBangla24.",
  keywords: "analytics, performance, metrics, admin, news",
};

export default function AnalyticsPage() {
  return <AnalyticsClient />;
}
