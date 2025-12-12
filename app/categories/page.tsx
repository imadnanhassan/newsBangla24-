import Link from "next/link";
import { categories } from "@/lib/data";

export default function Categories() {
  return (
    <main className="py-6">
      {/* Category Header - Prothom Alo Style */}
      <section className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-gray-800 border-l-4 border-red-600 pl-3">
            Categories
          </h1>
        </div>
        <p className="text-gray-600 mb-6">
          Browse news by category - stay updated with the latest developments in
          politics, business, sports, technology, and more.
        </p>
      </section>

      {/* Categories Grid - Prothom Alo Style */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="group block rounded-lg overflow-hidden shadow-lg border border-red-600/10 hover:shadow-xl transition-all duration-300"
          >
            <div className="relative aspect-video bg-gradient-to-br from-red-600/10 to-red-800/20">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-lg transform -rotate-12">
                  {category.name}
                </div>
              </div>
            </div>
            <div className="p-4 bg-white">
              <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-red-600 transition-colors">
                {category.name}
              </h2>
              <p className="text-gray-600 text-sm">
                Latest news and updates in {category.name.toLowerCase()}
              </p>
              <div className="mt-3 flex justify-end">
                <span className="inline-flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded text-sm font-medium">
                  <span>বিস্তারিত</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
