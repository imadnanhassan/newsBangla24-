import { Metadata } from "next";
import NotificationsClient from "../../../../components/clients/NotificationsClient";

export const metadata: Metadata = {
  title: "Notifications Management - NewsBangla24 Admin",
  description:
    "Create and manage push notifications and alerts for NewsBangla24 users.",
  keywords:
    "notifications management, admin, push notifications, alerts, messaging",
};

export default function NotificationsPage() {
  return <NotificationsClient />;
}
