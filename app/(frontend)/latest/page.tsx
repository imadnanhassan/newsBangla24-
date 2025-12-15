import { articles } from "@/lib/data";
import ArticleCard from "@/components/ArticleCard";

export default function LatestNews() {
  // Sort articles by published date (newest first)
  const sortedArticles = [...articles].sort((a, b) => {
    return (
      new Date(b.publishedAt || 0).getTime() -
      new Date(a.publishedAt || 0).getTime()
    );
  });

  return (
    <main className="space-y-8 py-6">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold">Latest News</h1>
        <p className="text-muted-foreground">
          Stay updated with the newest articles
        </p>
      </section>

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sortedArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </section>
    </main>
  );
}
