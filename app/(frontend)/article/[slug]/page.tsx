import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { articles } from "@/lib/data";
import { getArticleBySlug } from "@/lib/dummy-data";
import ShareOptions from "@/components/ShareOptions";
import ArticleCard from "@/components/ArticleCard";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${article.title} | newsBangla24`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: article.image_url ? [article.image_url] : [],
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.author.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: article.image_url ? [article.image_url] : [],
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  
  try {
    const article = getArticleBySlug(slug);

    if (!article) {
      notFound();
    }

  // Get related articles from same category
  const relatedArticles = articles
    .filter((a) => a.category.id === article.category.id && a.slug !== article.slug)
    .slice(0, 6);

  // Get more articles for right sidebar and footer
  const moreArticles = articles.filter((a) => a.slug !== article.slug).slice(0, 8);

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
              {/* Breadcrumb */}
              <nav className="flex items-center space-x-2 text-sm text-gray-600">
                <Link href="/" className="hover:text-red-600">হোম</Link>
                <span>/</span>
                <Link href={`/categories/${article.category.slug}`} className="hover:text-red-600">
                  {article.category.name}
                </Link>
                <span>/</span>
                <span className="text-gray-800">{article.title.substring(0, 30)}...</span>
              </nav>

              {/* Article Header */}
              <header className="space-y-4">
                <div className="flex items-center gap-3">
                  <span 
                    className="px-3 py-1 rounded-full text-sm font-medium text-white"
                    style={{ backgroundColor: article.category.color || '#ef4444' }}
                  >
                    {article.category.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(article.publishedAt || article.createdAt).toLocaleDateString('bn-BD', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <h1 className="text-3xl font-bold text-gray-800 md:text-4xl leading-tight">
                  {article.title}
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  {article.excerpt}
                </p>
              </header>

              {/* Featured Image */}
              {article.image_url && (
                <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src={article.image_url}
                    alt={article.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              {/* Author Information */}
              {article.author && (
                <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-lg border-l-4 border-red-600">
                  {article.author.avatar && (
                    <div className="relative w-16 h-16 overflow-hidden rounded-full">
                      <Image
                        src={article.author.avatar}
                        alt={article.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <div className="font-bold text-lg text-gray-800">{article.author.name}</div>
                    <div className="text-sm text-gray-600">{article.author.bio || 'সংবাদদাতা'}</div>
                    {article.author.email && (
                      <div className="text-sm text-gray-500">{article.author.email}</div>
                    )}
                  </div>
                </div>
              )}

              {/* Article Metadata */}
              <div className="flex items-center gap-6 py-4 border-y border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>{article.metadata.views.toLocaleString()} দর্শন</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span>{article.metadata.likes} পছন্দ</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  <span>{article.metadata.shares} শেয়ার</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{article.metadata.readingTime} মিনিট পড়ার সময়</span>
                </div>
              </div>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-700 prose-p:leading-relaxed">
                {article.content ? (
                  <div dangerouslySetInnerHTML={{ __html: article.content }} />
                ) : (
                  <div className="space-y-4">
                    <p>
                      এই সংবাদটি অত্যন্ত গুরুত্বপূর্ণ এবং দেশের জনগণের জন্য তাৎপর্যপূর্ণ। সংশ্লিষ্ট কর্তৃপক্ষ এই বিষয়ে বিস্তারিত তথ্য প্রদান করেছেন এবং আরও আপডেট শীঘ্রই আসবে।
                    </p>
                    <p>
                      বিশেষজ্ঞরা মনে করেন যে এই ঘটনার প্রভাব ব্যাপক হবে এবং এটি দেশের উন্নয়নে গুরুত্বপূর্ণ ভূমিকা পালন করবে। সরকারি এবং বেসরকারি উভয় পর্যায়ে এই বিষয়ে ব্যাপক আলোচনা চলছে।
                    </p>
                    <p>
                      আমরা এই বিষয়ে আরও তথ্য সংগ্রহ করে আপডেট প্রদান করব। পাঠকদের অনুরোধ করা হচ্ছে নিয়মিত আমাদের সাথে থাকার জন্য।
                    </p>
                  </div>
                )}
              </div>

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-800 mb-3">ট্যাগসমূহ:</h3>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag: any) => (
                      <span
                        key={tag.id}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
                      >
                        #{tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </article>
          </div>

          {/* Right Sidebar - Read More News */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              <h3 className="text-xl font-bold border-b border-red-600 pb-2 text-gray-800">
                আরও পড়ুন
              </h3>

              <div className="space-y-4">
                {moreArticles.slice(0, 4).map((newsArticle) => (
                  <div
                    key={newsArticle.id}
                    className="flex gap-3 border-b border-gray-200 pb-4 last:border-b-0"
                  >
                    <div className="shrink-0">
                      <Link href={`/article/${newsArticle.slug}`}>
                        <div className="relative aspect-square w-20 overflow-hidden rounded-md">
                          <Image
                            src={newsArticle.image_url || "/placeholder.png"}
                            alt={newsArticle.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </Link>
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-red-600 mb-1 font-medium">
                        {newsArticle.category.name}
                      </div>
                      <Link href={`/article/${newsArticle.slug}`}>
                        <h4 className="font-medium text-sm line-clamp-2 hover:text-red-600 transition-colors">
                          {newsArticle.title}
                        </h4>
                      </Link>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(newsArticle.publishedAt || newsArticle.createdAt).toLocaleDateString('bn-BD')}
                      </div>
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
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-l-4 border-red-600 pl-3">
              সম্পর্কিত সংবাদ
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <ArticleCard key={relatedArticle.id} article={relatedArticle} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Footer Read More News Section */}
      <div className="mt-16 bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center text-gray-800 border-l-4 border-red-600 pl-3">
            আরও সংবাদ
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {moreArticles.map((newsArticle) => (
              <ArticleCard key={newsArticle.id} article={newsArticle} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
  } catch (error) {
    console.error('Error loading article:', error);
    notFound();
  }
}