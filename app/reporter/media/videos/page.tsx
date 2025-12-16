"use client";

export default function VideosPage() {
  const videos = [
    { id: 1, title: "ভিডিও 1", date: "2023-12-01" },
    { id: 2, title: "ভিডিও 2", date: "2023-12-02" },
  ];
  return (
    <div className="p-6 bg-slate-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">ভিডিও</h1>
      <div className="space-y-4">
        {videos.map((video) => (
          <div
            key={video.id}
            className="p-4 bg-slate-800 border border-slate-600 rounded-lg"
          >
            <h2 className="text-lg font-semibold">{video.title}</h2>
            <p className="text-slate-400">{video.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
