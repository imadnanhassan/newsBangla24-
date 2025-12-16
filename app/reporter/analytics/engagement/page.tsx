"use client";

export default function EngagementPage() {
  return (
    <div className="p-6 bg-slate-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">এনগেজমেন্ট</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-slate-800 border border-slate-600 rounded-lg">
          <h3 className="text-lg font-semibold">মোট মন্তব্য</h3>
          <p className="text-2xl font-bold text-cyan-400">1,200</p>
        </div>
        <div className="p-4 bg-slate-800 border border-slate-600 rounded-lg">
          <h3 className="text-lg font-semibold">মোট শেয়ার</h3>
          <p className="text-2xl font-bold text-cyan-400">300</p>
        </div>
        <div className="p-4 bg-slate-800 border border-slate-600 rounded-lg">
          <h3 className="text-lg font-semibold">মোট লাইক</h3>
          <p className="text-2xl font-bold text-cyan-400">5,000</p>
        </div>
      </div>
    </div>
  );
}
