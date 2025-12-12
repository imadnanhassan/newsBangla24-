import { NextResponse } from "next/server";
import { articles } from "@/lib/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const limit = searchParams.get("limit");
  const page = searchParams.get("page");

  let filteredArticles = [...articles];

  // Filter by category if provided
  if (category) {
    filteredArticles = filteredArticles.filter(
      (article) => article.category.slug === category
    );
  }

  // Apply pagination
  const pageSize = limit ? parseInt(limit) : 10;
  const currentPage = page ? parseInt(page) : 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedArticles = filteredArticles.slice(
    startIndex,
    startIndex + pageSize
  );

  return NextResponse.json({
    success: true,
    data: paginatedArticles,
    total: filteredArticles.length,
    page: currentPage,
    pageSize: pageSize,
    totalPages: Math.ceil(filteredArticles.length / pageSize),
  });
}
