import { Metadata } from "next";
import UserDashboardClient from "../../../components/clients/UserDashboardClient";

export const metadata: Metadata = {
  title: "User Dashboard - NewsBangla24",
  description: "User dashboard for managing saved articles and preferences.",
  keywords: "user dashboard, saved articles, preferences, news",
};

export default function UserDashboardPage() {
  return <UserDashboardClient />;
}
