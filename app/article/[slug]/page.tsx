import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { articles } from "@/lib/data";
import ShareOptions from "@/components/ShareOptions";
import ArticleCard from "@/components/ArticleCard";

interface PageProps {
  params: {
    slug: string;
  };
}

export default function ArticlePage({ params }: PageProps) {
  const article = articles.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  // Get related articles from same category
  const relatedArticles = articles
    .filter((a) => a.category.id === article.category.id && a.id !== article.id)
    .slice(0, 6);

  // Get more articles for right sidebar and footer
  const moreArticles = articles.filter((a) => a.id !== article.id).slice(0, 8);

  return (
    <main className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar - Share Options */}
          <div className="lg:col-span-3">
            <div className="sticky top-24">
              <ShareOptions />
            </div>
          </div>

          {/* Center Content - Article Details */}
          <div className="lg:col-span-6">
            <article className="space-y-8">
              {/* Article Header */}
              <header className="space-y-4">
                <div className="text-sm text-primary/80 font-medium">
                  {article.category.name}
                </div>
                <h1 className="text-3xl font-bold text-foreground md:text-4xl">
                  {article.title}
                </h1>
                {article.publishedAt && (
                  <div className="text-sm text-muted">
                    Published on{" "}
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </div>
                )}
              </header>

              {/* Featured Image */}
              {article.image && (
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Author Information */}
              {article.author && (
                <div className="flex items-center gap-4 p-4 border-b border-border">
                  {article.author.avatar && (
                    <img
                      src={article.author.avatar}
                      alt={article.author.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <div className="font-semibold">{article.author.name}</div>
                    <div className="text-sm text-muted">News Reporter</div>
                  </div>
                </div>
              )}

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-muted leading-relaxed mb-6">
                  {article.excerpt}
                </p>
                {article.content ? (
                  <div dangerouslySetInnerHTML={{ __html: article.content }} />
                ) : (
                  <>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <p>
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </p>
                    <p>
                      Sed ut perspiciatis unde omnis iste natus error sit
                      voluptatem accusantium doloremque laudantium, totam rem
                      aperiam, eaque ipsa quae ab illo inventore veritatis et
                      quasi architecto beatae vitae dicta sunt explicabo.
                    </p>
                    <p>
                      Nemo enim ipsam voluptatem quia voluptas sit aspernatur
                      aut odit aut fugit, sed quia consequuntur magni dolores
                      eos qui ratione voluptatem sequi nesciunt.
                    </p>
                  </>
                )}
              </div>
            </article>
          </div>

          {/* Right Sidebar - Read More News */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              <h3 className="text-xl font-bold border-b border-border pb-2">
                Read More News
              </h3>

              <div className="space-y-4">
                {moreArticles.slice(0, 4).map((newsArticle) => (
                  <div
                    key={newsArticle.id}
                    className="flex gap-3 border-b border-border pb-4 last:border-b-0"
                  >
                    <div className="flex-shrink-0">
                      <Link href={`/article/${newsArticle.slug}`}>
                        <div className="relative aspect-square w-20 overflow-hidden rounded-md">
                          <Image
                            src={newsArticle.image || "/placeholder.png"}
                            alt={newsArticle.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </Link>
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-primary/80 mb-1">
                        {newsArticle.category.name}
                      </div>
                      <Link href={`/article/${newsArticle.slug}`}>
                        <h4 className="font-medium text-sm line-clamp-2 hover:text-primary transition-colors">
                          {newsArticle.title}
                        </h4>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <section className="mt-12 border-t pt-8">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <ArticleCard key={relatedArticle.id} article={relatedArticle} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Footer Read More News Section */}
      <div className="mt-16 bg-muted/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center">More News</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {moreArticles.map((newsArticle) => (
              <ArticleCard key={newsArticle.id} article={newsArticle} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
