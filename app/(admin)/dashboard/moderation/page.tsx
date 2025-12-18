import { Metadata } from "next";
import ModerationClient from "../../../../components/clients/ModerationClient";

export const metadata: Metadata = {
  title: "Content Moderation - NewsBangla24 Admin",
  description:
    "Review and moderate reported content to maintain community standards for NewsBangla24.",
  keywords:
    "content moderation, admin, reported content, community standards, moderation queue",
};

export default function ModerationPage() {
  return <ModerationClient />;
}
