import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";

export default function SingleReporterPage({
  params,
}: {
  params: { id: string };
}) {
  // Mock data - in a real app, this would come from an API or database
  const reporters = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
      bio: "Senior political correspondent with 10 years of experience covering national and international politics.",
      articles: 15,
      avatar: "/path/to/avatar.jpg",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "234-567-8901",
      bio: "Sports journalist with expertise in football, cricket, and Olympic events. Has covered 3 World Cups and 2 Olympic Games.",
      articles: 8,
      avatar: "/path/to/avatar.jpg",
    },
    {
      id: "3",
      name: "Robert Johnson",
      email: "robert@example.com",
      phone: "345-678-9012",
      bio: "Technology reporter focusing on artificial intelligence, blockchain, and emerging technologies. Former software engineer turned journalist.",
      articles: 22,
      avatar: "/path/to/avatar.jpg",
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily@example.com",
      phone: "456-789-0123",
      bio: "Entertainment reporter covering Hollywood, Bollywood, and international film industries. Specializes in celebrity interviews and film reviews.",
      articles: 5,
      avatar: "/path/to/avatar.jpg",
    },
  ];

  const reporter = reporters.find((r) => r.id === params.id);

  if (!reporter) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{reporter.name}</h1>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>Email: {reporter.email}</span>
            <span>Phone: {reporter.phone}</span>
            <span>Articles: {reporter.articles}</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <Link
            href={`/admin/reporter/edit/${reporter.id}`}
            className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
          >
            Edit
          </Link>
          <Link
            href="/admin/reporter/list"
            className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
          >
            Back to List
          </Link>
        </div>
      </div>

      {reporter.avatar && (
        <div className="mb-6 flex justify-center">
          <img
            src={reporter.avatar}
            alt={reporter.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
          />
        </div>
      )}

      <div className="prose max-w-none">
        <h2 className="text-xl font-semibold mb-3">Bio</h2>
        <p>{reporter.bio}</p>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Articles</h2>
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
        </div>
      </div>
    </div>
  );
}
