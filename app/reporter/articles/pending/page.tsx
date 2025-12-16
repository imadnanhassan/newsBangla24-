"use client";

export default function PendingPage() {
  const pendings = [
    { id: 1, title: "পর্যালোচনায় নিবন্ধ 1", date: "2023-12-01" },
    { id: 2, title: "পর্যালোচনায় নিবন্ধ 2", date: "2023-12-02" },
  ];
  return (
    <div className="p-6 bg-slate-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">পর্যালোচনায় নিবন্ধ</h1>
      <div className="space-y-4">
        {pendings.map((pending) => (
          <div
            key={pending.id}
            className="p-4 bg-slate-800 border border-slate-600 rounded-lg"
          >
            <h2 className="text-lg font-semibold">{pending.title}</h2>
            <p className="text-slate-400">{pending.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
