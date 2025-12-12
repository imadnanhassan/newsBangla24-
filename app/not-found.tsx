import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-red-100 rounded-full mx-auto mb-6">
            <div className="text-6xl font-bold text-red-600">
              4<span className="text-red-400">0</span>4
            </div>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          দুঃখিত, আপনি যে পৃষ্ঠাটি খুঁজছেন তা পাওয়া যায়নি বা সরানো হয়েছে।
          আপনি যে লিঙ্কটি অনুসরণ করেছেন তা ভুল হতে পারে বা পৃষ্ঠাটি আর উপলব্ধ
          নাও থাকতে পারে।
        </p>

        {/* Search and Navigation Options */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl font-medium"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            হোমপেজে ফিরুন
          </Link>

          <Link
            href="/categories"
            className="inline-flex items-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors shadow-lg hover:shadow-xl font-medium"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            সব বিভাগ দেখুন
          </Link>
        </div>

        {/* Popular Categories */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            জনপ্রিয় বিভাগসমূহ
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              {
                name: "রাজনীতি",
                slug: "politics",
                color: "bg-blue-100 text-blue-800",
              },
              {
                name: "অর্থনীতি",
                slug: "business",
                color: "bg-green-100 text-green-800",
              },
              {
                name: "খেলা",
                slug: "sports",
                color: "bg-purple-100 text-purple-800",
              },
              {
                name: "প্রযুক্তি",
                slug: "tech",
                color: "bg-indigo-100 text-indigo-800",
              },
              {
                name: "বিনোদন",
                slug: "entertainment",
                color: "bg-pink-100 text-pink-800",
              },
              {
                name: "স্বাস্থ্য",
                slug: "health",
                color: "bg-teal-100 text-teal-800",
              },
            ].map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className={`${category.color} px-4 py-2 rounded-full font-medium hover:opacity-90 transition-opacity`}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Featured News Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            সর্বশেষ সংবাদ
          </h2>
          <p className="text-gray-600 mb-6">
            আপনি যে সংবাদটি খুঁজছেন না পেলেও, এখানে কিছু সর্বশেষ সংবাদ রয়েছে যা
            আপনার আগ্রহী হতে পারে:
          </p>

          {/* This would normally show actual articles, but for 404 page we'll show placeholder */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="aspect-video bg-gray-200 rounded-md mb-3 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
