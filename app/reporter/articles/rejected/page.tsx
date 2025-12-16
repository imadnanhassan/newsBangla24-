"use client";

export default function RejectedPage() {
  const rejecteds = [
    { id: 1, title: "প্রত্যাখ্যাত নিবন্ধ 1", date: "2023-12-01" },
    { id: 2, title: "প্রত্যাখ্যাত নিবন্ধ 2", date: "2023-12-02" },
  ];
  return (
    <div className="p-6 bg-slate-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">প্রত্যাখ্যাত নিবন্ধ</h1>
      <div className="space-y-4">
        {rejecteds.map((rejected) => (
          <div
            key={rejected.id}
            className="p-4 bg-slate-800 border border-slate-600 rounded-lg"
          >
            <h2 className="text-lg font-semibold">{rejected.title}</h2>
            <p className="text-slate-400">{rejected.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
