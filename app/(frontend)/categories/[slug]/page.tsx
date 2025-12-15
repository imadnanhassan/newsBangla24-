import { notFound } from "next/navigation";
import CategoryNav from "@/components/CategoryNav";
import ProthomAloArticleCard from "@/components/ProthomAloArticleCard";
import { categories, articles, articlesByCategory } from "@/lib/data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const categoryArticles = articlesByCategory[category.slug] || [];

  // Sort articles by date (newest first)
  const sortedArticles = [...categoryArticles].sort(
    (a, b) =>
      new Date(b.publishedAt || "").getTime() -
      new Date(a.publishedAt || "").getTime()
  );

  // Get featured article (newest)
  const featuredArticle = sortedArticles[0];
  // Get top articles (next 3 newest)
  const topArticles = sortedArticles.slice(1, 4);
  // Get remaining articles
  const remainingArticles = sortedArticles.slice(4);

  return (
    <main className="py-6">
      {/* Category Header with Prothom Alo Style */}
      <section className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-gray-800 border-l-4 border-red-600 pl-3">
            {category.name}
          </h1>
          <div className="flex items-center gap-4">
            <span className="bg-red-600 text-white px-3 py-1 rounded text-sm font-medium">
              {categoryArticles.length} টি সংবাদ
            </span>
          </div>
        </div>
        <CategoryNav categories={categories} />
      </section>

      {/* Featured Article Section - Prothom Alo Style */}
      {featuredArticle && (
        <section className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="lg:col-span-1">
              <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden shadow-lg border border-red-600/20">
                <img
                  src={featuredArticle.image_url || "/placeholder.png"}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-red-600 text-white px-3 py-1 rounded text-sm font-medium">
                      ফিচার্ড
                    </span>
                    <span className="text-white text-sm">
                      {new Date(
                        featuredArticle.publishedAt || ""
                      ).toLocaleDateString("bn-BD", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <h2 className="text-white text-2xl font-bold line-clamp-2 mb-2">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-white text-sm line-clamp-2 mb-4">
                    {featuredArticle.excerpt}
                  </p>
                  <a
                    href={`/article/${featuredArticle.id}`}
                    className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors w-fit"
                  >
                    <span>পড়ুন</span>
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
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1 space-y-4">
              {topArticles.map((article) => (
                <ProthomAloArticleCard
                  key={article.id}
                  article={article}
                  variant="small"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Articles Grid - Prothom Alo Style */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {remainingArticles.map((article) => (
          <ProthomAloArticleCard
            key={article.id}
            article={article}
            variant="medium"
          />
        ))}
      </section>

      {/* Pagination or Load More (placeholder) */}
      {remainingArticles.length > 0 && (
        <div className="mt-8 text-center">
          <button className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl">
            <span className="font-medium">আরও দেখুন</span>
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
          </button>
        </div>
      )}
    </main>
  );
}
