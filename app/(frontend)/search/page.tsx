"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { articles } from "@/lib/data";
import ArticleCard from "@/components/ArticleCard";
import type { Article } from "@/types";

function SearchContent() {
  const searchParams = useSearchParams();
  const [searchResults, setSearchResults] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = searchParams.get("q")?.toLowerCase() || "";
    setLoading(true);

    const timer = setTimeout(() => {
      if (!query) {
        setSearchResults([]);
        setLoading(false);
        return;
      }

      const results = articles.filter(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          article.excerpt.toLowerCase().includes(query) ||
          article.category.name.toLowerCase().includes(query)
      );

      setSearchResults(results);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchParams]);

  return (
    <main className="space-y-8 py-6">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold">Search Results</h1>
        {loading ? (
          <p className="text-muted-foreground">Searching...</p>
        ) : searchResults.length === 0 ? (
          <p className="text-muted-foreground">No results found</p>
        ) : (
          <p className="text-muted-foreground">
            Found {searchResults.length} articles matching your search
          </p>
        )}
      </section>

      {searchResults.length > 0 && (
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {searchResults.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </section>
      )}
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <SearchContent />
    </Suspense>
  );
}
