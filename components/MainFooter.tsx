import Link from "next/link";

export default function MainFooter() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">প</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  newsBangla24
                </h3>
                <p className="text-sm text-gray-600">News Bangla 24</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              বাংলাদেশের শীর্ষস্থানীয় বাংলা নিউজ পোর্টাল। সর্বশেষ খবর, বিশ্লেষণ
              এবং মতামত।
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">দ্রুত লিংক</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-red-600 transition-colors"
                >
                  হোম
                </Link>
              </li>
              <li>
                <Link
                  href="/latest"
                  className="text-gray-600 hover:text-red-600 transition-colors"
                >
                  সর্বশেষ
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-gray-600 hover:text-red-600 transition-colors"
                >
                  ক্যাটাগরি
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-red-600 transition-colors"
                >
                  আমাদের সম্পর্কে
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-red-600 transition-colors"
                >
                  যোগাযোগ
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">ক্যাটাগরি</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/categories/politics"
                  className="text-gray-600 hover:text-red-600 transition-colors"
                >
                  রাজনীতি
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/business"
                  className="text-gray-600 hover:text-red-600 transition-colors"
                >
                  অর্থনীতি
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/sports"
                  className="text-gray-600 hover:text-red-600 transition-colors"
                >
                  খেলা
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/tech"
                  className="text-gray-600 hover:text-red-600 transition-colors"
                >
                  প্রযুক্তি
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/entertainment"
                  className="text-gray-600 hover:text-red-600 transition-colors"
                >
                  বিনোদন
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">যোগাযোগ</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p>newsBangla24</p>
              <p>মিডিয়া হাউস, প্লট#৩৭১/এ</p>
              <p>তেজগাঁও শিল্প এলাকা, ঢাকা-১২০৮</p>
              <p>ফোন: +880 2 8158888</p>
              <p>ইমেইল: info@newsbangla24.com</p>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} newsBangla24। সর্বস্বত্ব সংরক্ষিত।
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Link href="#" className="text-gray-600 hover:text-red-600 text-sm">
              গোপনীয়তা নীতি
            </Link>
            <Link href="#" className="text-gray-600 hover:text-red-600 text-sm">
              ব্যবহারের শর্তাবলী
            </Link>
            <Link href="#" className="text-gray-600 hover:text-red-600 text-sm">
              বিজ্ঞাপন
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
