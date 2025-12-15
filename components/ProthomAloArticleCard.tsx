import Link from "next/link";
import Image from "next/image";
interface ProthomAloArticleCardProps {
  article: any;
  variant?: "featured" | "large" | "medium" | "small";
}

export default function ProthomAloArticleCard({
  article,
  variant = "medium",
}: ProthomAloArticleCardProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case "featured":
        return {
          container: "col-span-2",
          image: "aspect-[16/9]",
          title: "text-xl font-bold",
          excerpt: "line-clamp-3",
          category: "text-sm",
        };
      case "large":
        return {
          container: "",
          image: "aspect-[16/9]",
          title: "text-lg font-bold",
          excerpt: "line-clamp-2",
          category: "text-sm",
        };
      case "small":
        return {
          container: "flex gap-3",
          image: "aspect-square w-24 flex-shrink-0",
          content: "flex-1 min-w-0",
          title: "text-sm font-semibold",
          excerpt: "line-clamp-2 text-xs",
          category: "text-xs",
        };
      default: // medium
        return {
          container: "",
          image: "aspect-[16/9]",
          title: "text-base font-bold",
          excerpt: "line-clamp-2",
          category: "text-xs",
        };
    }
  };

  const classes = getVariantClasses();

  return (
    <article
      className={`group border-b border-gray-200 pb-4 ${classes.container}`}
    >
      <Link href={`/article/${article.slug}`} className="block">
        <div className={variant === "small" ? "flex gap-3" : "block"}>
          <div className={`relative overflow-hidden ${classes.image}`}>
            <Image
              src={article.image_url || "/placeholder.png"}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <div className={`mt-2 ${classes.content || ""}`}>
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`bg-red-600 text-white px-2 py-1 rounded ${classes.category}`}
              >
                {article.category.name}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(article.publishedAt || "").toLocaleTimeString(
                  "bn-BD",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  }
                )}
              </span>
            </div>

            <h3 className={`text-gray-800 mb-1 ${classes.title}`}>
              {article.title}
            </h3>

            {article.excerpt && (
              <p className={`text-gray-600 mb-2 ${classes.excerpt}`}>
                {article.excerpt}
              </p>
            )}

            {article.author && (
              <div className="flex items-center gap-2 text-xs text-gray-500">
                {article.author.avatar && (
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    className="w-4 h-4 rounded-full"
                  />
                )}
                <span>{article.author.name}</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
