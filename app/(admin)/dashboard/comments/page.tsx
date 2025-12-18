import { Metadata } from "next";
import CommentsClient from "../../../../components/clients/CommentsClient";

export const metadata: Metadata = {
  title: "Comments Management - NewsBangla24 Admin",
  description:
    "Moderate and manage user comments across all articles for NewsBangla24.",
  keywords: "comments management, admin, moderation, user comments, articles",
};

export default function CommentsPage() {
  return <CommentsClient />;
}
