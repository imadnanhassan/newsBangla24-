import { Metadata } from "next";
import SettingsClient from "../../../../components/clients/SettingsClient";

export const metadata: Metadata = {
  title: "Settings - NewsBangla24 Admin",
  description:
    "Manage site configuration, appearance, security, and notification settings for NewsBangla24.",
  keywords:
    "settings, configuration, admin, site settings, preferences, security",
};

export default function SettingsPage() {
  return <SettingsClient />;
}
