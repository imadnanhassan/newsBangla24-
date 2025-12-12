import Link from "next/link";
import type { Category } from "@/types";

export default function CategoryNav({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <div className="no-scrollbar -mx-4 overflow-x-auto px-4">
      <div className="flex items-center gap-3">
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/categories/${c.slug}`}
            className="rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground hover:bg-card"
          >
            {c.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
