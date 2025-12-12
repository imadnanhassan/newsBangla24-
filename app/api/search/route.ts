import { NextResponse } from "next/server";
import { articles } from "@/lib/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";
  const limit = searchParams.get("limit") || "10";
  const page = searchParams.get("page") || "1";

  if (!query) {
    return NextResponse.json({
      success: false,
      error: "Search query is required",
    });
  }

  const searchTerm = query.toLowerCase();

  // Search in titles, excerpts, and categories
  const results = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm) ||
      article.excerpt.toLowerCase().includes(searchTerm) ||
      article.category.name.toLowerCase().includes(searchTerm) ||
      (article.author?.name.toLowerCase().includes(searchTerm) ?? false)
  );

  // Apply pagination
  const pageSize = parseInt(limit);
  const currentPage = parseInt(page);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedResults = results.slice(startIndex, startIndex + pageSize);

  return NextResponse.json({
    success: true,
    data: paginatedResults,
    total: results.length,
    page: currentPage,
    pageSize: pageSize,
    totalPages: Math.ceil(results.length / pageSize),
  });
}
