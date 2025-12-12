import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainHeader from "@/components/MainHeader";
import MainFooter from "@/components/MainFooter";
import BreakingNewsSection from "@/components/BreakingNewsSection";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    <html lang="bn">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <MainHeader />
        <BreakingNewsSection />
        <div className="mx-auto max-w-7xl px-4">{children}</div>
        <MainFooter />
      </body>
    </html>
  );
}
