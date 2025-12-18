import { Metadata } from "next";
import TrendingClient from "../../../../components/clients/TrendingClient";

export const metadata: Metadata = {
  title: "Trending Analytics - NewsBangla24 Admin",
  description:
    "Monitor trending topics and popular content performance for NewsBangla24.",
  keywords:
    "trending analytics, admin, trending topics, popular content, engagement",
};

export default function TrendingPage() {
  return <TrendingClient />;
}
