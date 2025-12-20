import { Metadata } from "next";
import ProfileClient from "./ProfileClient";

export const metadata: Metadata = {
  title: "রিপোর্টার প্রোফাইল - NewsBangla24",
  description:
    "আমার প্রোফাইল দেখুন এবং সম্পাদনা করুন। সংবাদকর্মী হিসেবে আমার তথ্য, অর্জন এবং পরিসংখ্যান।",
  keywords: [
    "রিপোর্টার প্রোফাইল",
    "সংবাদকর্মী",
    "NewsBangla24",
    "বাংলা সংবাদ",
    "প্রোফাইল",
  ],
  openGraph: {
    title: "রিপোর্টার প্রোফাইল - NewsBangla24",
    description:
      "আমার প্রোফাইল দেখুন এবং সম্পাদনা করুন। সংবাদকর্মী হিসেবে আমার তথ্য, অর্জন এবং পরিসংখ্যান।",
    url: "http://localhost:3000/reporter/profile",
    siteName: "NewsBangla24",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "রিপোর্টার প্রোফাইল - NewsBangla24",
    description:
      "আমার প্রোফাইল দেখুন এবং সম্পাদনা করুন। সংবাদকর্মী হিসেবে আমার তথ্য, অর্জন এবং পরিসংখ্যান।",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "structured-data": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      name: "রিপোর্টার প্রোফাইল",
      description: "সংবাদকর্মীর প্রোফাইল পেজ",
      url: "http://localhost:3000/reporter/profile",
      mainEntity: {
        "@type": "Person",
        name: "সংবাদকর্মী",
        jobTitle: "রিপোর্টার",
        worksFor: {
          "@type": "Organization",
          name: "NewsBangla24",
        },
      },
    }),
  },
};

export default function ProfilePage() {
  return <ProfileClient />;
}
