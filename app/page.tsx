import { categories, articles } from "@/lib/data";
import Link from "next/link";
import ProthomAloArticleCard from "@/components/ProthomAloArticleCard";
import ArticleSlider from "@/components/ArticleSlider";
import NewsPortalVideoSection from "@/components/NewsPortalVideoSection";
import ImprovedMasonryGrid from "@/components/ImprovedMasonryGrid";
import BangladeshSection from "@/components/BangladeshSection";
import BreakingNewsSection from "@/components/BreakingNewsSection";

export default function Home() {
  // Get featured articles for different sections
  const featuredArticles = articles.slice(0, 8);
  const latestArticles = articles.slice(8, 16);
  const politicsArticles = articles
    .filter((a) => a.category.slug === "politics")
    .slice(0, 8);
  const businessArticles = articles
    .filter((a) => a.category.slug === "business")
    .slice(0, 8);
  const sportsArticles = articles
    .filter((a) => a.category.slug === "sports")
    .slice(0, 8);
  const techArticles = articles
    .filter((a) => a.category.slug === "tech")
    .slice(0, 8);
  const entertainmentArticles = articles
    .filter((a) => a.category.slug === "entertainment")
    .slice(0, 8);
  const healthArticles = articles
    .filter((a) => a.category.slug === "health")
    .slice(0, 8);
  const worldArticles = articles
    .filter((a) => a.category.slug === "world-news")
    .slice(0, 8);

  // Get video articles (using tech articles as placeholder for videos)
  const videoArticles = articles
    .filter((a) => a.category.slug === "tech")
    .slice(0, 6);

  return (
    <main className="py-6 space-y-8">
      {/* Section 1: Hero Section with Slider and Side Featured Articles */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Featured Article Slider */}
        <div className="lg:col-span-2">
          <ArticleSlider articles={featuredArticles.slice(0, 5)} />
        </div>

        {/* Side Featured Articles (3 news items) */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-800 border-l-4 border-red-600 pl-3">
            বিশেষ সংবাদ
          </h3>
          {featuredArticles.slice(1, 4).map((article) => (
            <ProthomAloArticleCard
              key={article.id}
              article={article}
              variant="small"
            />
          ))}
        </div>
      </section>

      {/* Section 2: Latest News Section */}
      <section>
        <h2 className="text-xl font-bold text-gray-800 border-l-4 border-red-600 pl-3 mb-4">
          সর্বশেষ খবর
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {latestArticles.map((article) => (
            <ProthomAloArticleCard
              key={article.id}
              article={article}
              variant="medium"
            />
          ))}
        </div>
      </section>

      {/* Section 3: News Portal Video Section */}
      <NewsPortalVideoSection videos={videoArticles} />

      {/* Section 4: Breaking News Section with Improved Slider */}
      <BreakingNewsSection />

      {/* Section 5: Improved Masonry Grid Section */}
      <ImprovedMasonryGrid
        articles={articles.slice(20, 30)}
        title="আরও পড়ুন"
        category="latest-news"
      />

      {/* Section 8: Bangladesh Section with Search and Filter */}
      <BangladeshSection
        articles={articles.filter(
          (a) =>
            a.category.slug === "country-news" || a.category.slug === "politics"
        )}
        categories={categories}
      />

      {/* Section 9: Politics Section with Horizontal Slider */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 border-l-4 border-red-600 pl-3">
            রাজনীতি
          </h2>
          <Link
            href="/categories/politics"
            className="text-red-600 hover:text-red-700 text-sm font-medium"
          >
            সব দেখুন →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {politicsArticles.map((article) => (
            <ProthomAloArticleCard
              key={article.id}
              article={article}
              variant="medium"
            />
          ))}
        </div>
      </section>

      {/* Section 10: Business Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 border-l-4 border-red-600 pl-3">
            অর্থনীতি
          </h2>
          <Link
            href="/categories/business"
            className="text-red-600 hover:text-red-700 text-sm font-medium"
          >
            সব দেখুন →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {businessArticles.slice(0, 6).map((article) => (
            <ProthomAloArticleCard
              key={article.id}
              article={article}
              variant="medium"
            />
          ))}
        </div>
      </section>

      {/* Section 11: Sports Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 border-l-4 border-red-600 pl-3">
            খেলা
          </h2>
          <Link
            href="/categories/sports"
            className="text-red-600 hover:text-red-700 text-sm font-medium"
          >
            সব দেখুন →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {sportsArticles.map((article) => (
            <ProthomAloArticleCard
              key={article.id}
              article={article}
              variant="medium"
            />
          ))}
        </div>
      </section>

      {/* Section 12: Technology Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 border-l-4 border-red-600 pl-3">
            প্রযুক্তি
          </h2>
          <Link
            href="/categories/tech"
            className="text-red-600 hover:text-red-700 text-sm font-medium"
          >
            সব দেখুন →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {techArticles.slice(0, 6).map((article) => (
            <ProthomAloArticleCard
              key={article.id}
              article={article}
              variant="medium"
            />
          ))}
        </div>
      </section>

      {/* Section 13: Entertainment Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 border-l-4 border-red-600 pl-3">
            বিনোদন
          </h2>
          <Link
            href="/categories/entertainment"
            className="text-red-600 hover:text-red-700 text-sm font-medium"
          >
            সব দেখুন →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {entertainmentArticles.map((article) => (
            <ProthomAloArticleCard
              key={article.id}
              article={article}
              variant="medium"
            />
          ))}
        </div>
      </section>

      {/* Section 14: Health & World News Combined Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Health Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800 border-l-4 border-red-600 pl-3">
              স্বাস্থ্য
            </h2>
            <Link
              href="/categories/health"
              className="text-red-600 hover:text-red-700 text-sm font-medium"
            >
              সব দেখুন →
            </Link>
          </div>
          <div className="space-y-4">
            {healthArticles.slice(0, 4).map((article) => (
              <ProthomAloArticleCard
                key={article.id}
                article={article}
                variant="small"
              />
            ))}
          </div>
        </div>

        {/* World News Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800 border-l-4 border-red-600 pl-3">
              আন্তর্জাতিক
            </h2>
            <Link
              href="/categories/world-news"
              className="text-red-600 hover:text-red-700 text-sm font-medium"
            >
              সব দেখুন →
            </Link>
          </div>
          <div className="space-y-4">
            {worldArticles.slice(0, 4).map((article) => (
              <ProthomAloArticleCard
                key={article.id}
                article={article}
                variant="small"
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
