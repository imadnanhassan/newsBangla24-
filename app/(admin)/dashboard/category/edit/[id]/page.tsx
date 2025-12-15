import React from "react";
import { notFound } from "next/navigation";

export default function EditCategoryPage({
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
      description: "National and international political news and analysis.",
      parent: "news",
    },
    {
      id: "2",
      name: "Sports",
      slug: "sports",
      description: "Coverage of local and international sports events.",
      parent: "news",
    },
    {
      id: "3",
      name: "Technology",
      slug: "technology",
      description: "Latest technology news, reviews, and trends.",
      parent: "news",
    },
    {
      id: "4",
      name: "Entertainment",
      slug: "entertainment",
      description: "Film, television, music, and celebrity news.",
      parent: "news",
    },
    {
      id: "5",
      name: "Business",
      slug: "business",
      description: "Financial news, market updates, and business analysis.",
      parent: "news",
    },
    {
      id: "6",
      name: "Health",
      slug: "health",
      description: "Health news, medical research, and wellness tips.",
      parent: "features",
    },
    {
      id: "7",
      name: "Travel",
      slug: "travel",
      description: "Travel guides, destination reviews, and travel tips.",
      parent: "features",
    },
    {
      id: "8",
      name: "Food",
      slug: "food",
      description: "Recipes, restaurant reviews, and food culture.",
      parent: "features",
    },
  ];

  const category = categories.find((c) => c.id === params.id);

  if (!category) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Category</h1>
      <form className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={category.name}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="slug"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Slug (URL-friendly)
          </label>
          <input
            type="text"
            id="slug"
            name="slug"
            defaultValue={category.slug}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            defaultValue={category.description}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="parent"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Parent Category (Optional)
          </label>
          <select
            id="parent"
            name="parent"
            defaultValue={category.parent}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">No parent category</option>
            <option value="news">News</option>
            <option value="features">Features</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="icon"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Icon (Optional)
          </label>
          <input
            type="file"
            id="icon"
            name="icon"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            accept="image/*"
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Update Category
          </button>
        </div>
      </form>
    </div>
  );
}
