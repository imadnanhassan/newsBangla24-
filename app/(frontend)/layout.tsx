import MainHeader from "@/components/MainHeader";
import MainFooter from "@/components/MainFooter";
import SimpleBreakingNews from "@/components/SimpleBreakingNews";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "newsBangla24 - বাংলাদেশের শীর্ষস্থানীয় বাংলা নিউজ পোর্টাল",
  description:
    "বাংলাদেশের সর্বশেষ খবর, বিশ্লেষণ এবং মতামত। রাজনীতি, অর্থনীতি, খেলা, বিনোদন এবং প্রযুক্তি।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <MainHeader />
      <SimpleBreakingNews />
      <div className="mx-auto max-w-7xl px-4">{children}</div>
      <MainFooter />
    </div>
  );
}
