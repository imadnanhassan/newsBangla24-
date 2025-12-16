"use client";

export default function PublishedPage() {
  const publisheds = [
    { id: 1, title: "প্রকাশিত নিবন্ধ 1", date: "2023-12-01" },
    { id: 2, title: "প্রকাশিত নিবন্ধ 2", date: "2023-12-02" },
  ];
  return (
    <div className="p-6 bg-slate-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">প্রকাশিত নিবন্ধ</h1>
      <div className="space-y-4">
        {publisheds.map((published) => (
          <div
            key={published.id}
            className="p-4 bg-slate-800 border border-slate-600 rounded-lg"
          >
            <h2 className="text-lg font-semibold">{published.title}</h2>
            <p className="text-slate-400">{published.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
