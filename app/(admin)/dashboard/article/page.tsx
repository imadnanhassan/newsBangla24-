import { Metadata } from "next";
import ArticleManagementClient from "../../../../components/clients/ArticleManagementClient";

export const metadata: Metadata = {
  title: "Article Management - NewsBangla24 Admin",
  description:
    "Manage news articles, drafts, and publications for NewsBangla24.",
  keywords: "article management, admin, news, articles, drafts, publications",
};

export default function ArticleManagementPage() {
  return <ArticleManagementClient />;
}
