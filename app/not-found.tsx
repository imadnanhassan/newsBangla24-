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

       
      </div>
    </main>
  );
}
