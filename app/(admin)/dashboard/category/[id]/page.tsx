import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";

export default function SingleCategoryPage({
  params,
}: {
  params: { id: string };
}) {
  // Mock data - in a real app, this would come from an API or database
  const categories = [
    {
      id: "1",
      name: "Politics",
      slug: "politics",
      description:
        "Comprehensive coverage of national and international political news, including elections, government policies, and political analysis.",
      parent: "News",
      articles: 42,
      icon: "/path/to/icon.svg",
    },
    {
      id: "2",
      name: "Sports",
      slug: "sports",
      description:
        "Latest updates and in-depth coverage of local and international sports events, including football, cricket, and Olympic sports.",
      parent: "News",
      articles: 28,
      icon: "/path/to/icon.svg",
    },
    {
      id: "3",
      name: "Technology",
      slug: "technology",
      description:
        "News and reviews about the latest technology trends, gadgets, software, and innovations in the tech industry.",
      parent: "News",
      articles: 15,
      icon: "/path/to/icon.svg",
    },
    {
      id: "4",
      name: "Entertainment",
      slug: "entertainment",
      description:
        "Coverage of film, television, music, and celebrity news from Hollywood, Bollywood, and international entertainment industries.",
      parent: "News",
      articles: 37,
      icon: "/path/to/icon.svg",
    },
    {
      id: "5",
      name: "Business",
      slug: "business",
      description:
        "Financial news, stock market updates, business analysis, and coverage of major corporations and economic trends.",
      parent: "News",
      articles: 21,
      icon: "/path/to/icon.svg",
    },
    {
      id: "6",
      name: "Health",
      slug: "health",
      description:
        "Health news, medical research updates, wellness tips, and information about diseases and treatments.",
      parent: "Features",
      articles: 18,
      icon: "/path/to/icon.svg",
    },
    {
      id: "7",
      name: "Travel",
      slug: "travel",
      description:
        "Travel guides, destination reviews, travel tips, and information about popular tourist attractions worldwide.",
      parent: "Features",
      articles: 12,
      icon: "/path/to/icon.svg",
    },
    {
      id: "8",
      name: "Food",
      slug: "food",
      description:
        "Recipes, restaurant reviews, food culture, and culinary trends from around the world.",
      parent: "Features",
      articles: 9,
      icon: "/path/to/icon.svg",
    },
  ];

  const category = categories.find((c) => c.id === params.id);

  if (!category) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>Slug: {category.slug}</span>
            <span>Parent: {category.parent || "None"}</span>
            <span>Articles: {category.articles}</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <Link
            href={`/admin/category/edit/${category.id}`}
            className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
          >
            Edit
          </Link>
          <Link
            href="/admin/category/list"
            className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
          >
            Back to List
          </Link>
        </div>
      </div>

      {category.icon && (
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
            <img
              src={category.icon}
              alt={category.name}
              className="w-12 h-12"
            />
          </div>
        </div>
      )}

      <div className="prose max-w-none mb-8">
        <h2 className="text-xl font-semibold mb-3">Description</h2>
        <p>{category.description}</p>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">
          Recent Articles in this Category
        </h2>
        <div className="space-y-3">
          <div className="p-3 border border-gray-200 rounded">
            <h3 className="font-medium">
              Major Political Development Analysis
            </h3>
            <p className="text-sm text-gray-500">
              Published on December 10, 2023
            </p>
          </div>
          <div className="p-3 border border-gray-200 rounded">
            <h3 className="font-medium">
              Exclusive Interview with Prime Minister
            </h3>
            <p className="text-sm text-gray-500">
              Published on December 5, 2023
            </p>
          </div>
          <div className="p-3 border border-gray-200 rounded">
            <h3 className="font-medium">Election Results and Analysis</h3>
            <p className="text-sm text-gray-500">
              Published on November 30, 2023
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
