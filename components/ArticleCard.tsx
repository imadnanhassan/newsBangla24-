import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/types";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group rounded-lg border border-border bg-card shadow-sm">
      <Link href={`/article/${article.slug}`} className="block">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-lg">
          {article.image && (
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          )}
        </div>
        <div className="space-y-2 p-4">
          <div className="text-xs font-medium text-primary/80">{article.category.name}</div>
          <h3 className="line-clamp-2 text-lg font-semibold text-foreground">
            {article.title}
          </h3>
          <p className="line-clamp-3 text-sm text-muted">{article.excerpt}</p>
        </div>
      </Link>
    </article>
  );
}

