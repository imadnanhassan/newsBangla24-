import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";

export default function SingleArticlePage({
  params,
}: {
  params: { id: string };
}) {
  // Mock data - in a real app, this would come from an API or database
  const articles = [
    {
      id: "1",
      title: "Breaking News: Major Political Development",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      category: "Politics",
      reporter: "John Doe",
      date: "2023-12-13",
      image: "/path/to/image.jpg",
    },
    {
      id: "2",
      title: "World Cup Final: Exciting Match Recap",
      content:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      category: "Sports",
      reporter: "Jane Smith",
      date: "2023-12-12",
      image: "/path/to/image.jpg",
    },
  ];

  const article = articles.find((a) => a.id === params.id);

  if (!article) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>Category: {article.category}</span>
            <span>Reporter: {article.reporter}</span>
            <span>Date: {article.date}</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <Link
            href={`/admin/article/edit/${article.id}`}
            className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
          >
            Edit
          </Link>
          <Link
            href="/admin/article/list"
            className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
          >
            Back to List
          </Link>
        </div>
      </div>

      {article.image && (
        <div className="mb-6">
          <img
            src={article.image}
            alt={article.title}
            className="w-full max-h-96 object-cover rounded-lg"
          />
        </div>
      )}

      <div className="prose max-w-none">
        <p>{article.content}</p>
      </div>
    </div>
  );
}
