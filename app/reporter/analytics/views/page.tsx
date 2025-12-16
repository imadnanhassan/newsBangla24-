"use client";

export default function ViewsPage() {
  return (
    <div className="p-6 bg-slate-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">ভিউ রিপোর্ট</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-slate-800 border border-slate-600 rounded-lg">
          <h3 className="text-lg font-semibold">মোট ভিউ</h3>
          <p className="text-2xl font-bold text-cyan-400">10,000</p>
        </div>
        <div className="p-4 bg-slate-800 border border-slate-600 rounded-lg">
          <h3 className="text-lg font-semibold">আজকের ভিউ</h3>
          <p className="text-2xl font-bold text-cyan-400">500</p>
        </div>
        <div className="p-4 bg-slate-800 border border-slate-600 rounded-lg">
          <h3 className="text-lg font-semibold">গড় ভিউ</h3>
          <p className="text-2xl font-bold text-cyan-400">333</p>
        </div>
      </div>
    </div>
  );
}
