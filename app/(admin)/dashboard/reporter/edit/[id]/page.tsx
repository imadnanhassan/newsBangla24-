import React from "react";
import { notFound } from "next/navigation";

export default function EditReporterPage({
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
      bio: "Senior political correspondent with 10 years of experience.",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "234-567-8901",
      bio: "Sports journalist covering major international events.",
    },
    {
      id: "3",
      name: "Robert Johnson",
      email: "robert@example.com",
      phone: "345-678-9012",
      bio: "Technology reporter focusing on AI and innovation.",
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily@example.com",
      phone: "456-789-0123",
      bio: "Entertainment reporter covering film and television.",
    },
  ];

  const reporter = reporters.find((r) => r.id === params.id);

  if (!reporter) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Reporter</h1>
      <form className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={reporter.name}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={reporter.email}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            defaultValue={reporter.phone}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={4}
            defaultValue={reporter.bio}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="avatar"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Avatar
          </label>
          <input
            type="file"
            id="avatar"
            name="avatar"
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
            Update Reporter
          </button>
        </div>
      </form>
    </div>
  );
}
