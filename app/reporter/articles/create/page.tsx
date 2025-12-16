"use client";

export default function CreateArticlePage() {
  return (
    <div className="p-6 bg-slate-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">নতুন নিবন্ধ তৈরি করুন</h1>
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">শিরোনাম</label>
          <input
            type="text"
            className="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
            placeholder="নিবন্ধের শিরোনাম লিখুন"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">বিষয়বস্তু</label>
          <textarea
            rows={12}
            className="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
            placeholder="নিবন্ধের বিষয়বস্তু লিখুন"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">ক্যাটাগরি</label>
          <select className="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500">
            <option>রাজনীতি</option>
            <option>খেলা</option>
            <option>প্রযুক্তি</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-cyan-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-cyan-400 transition-colors"
        >
          নিবন্ধ জমা দিন
        </button>
      </form>
    </div>
  );
}
