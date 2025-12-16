"use client";

export default function UploadPage() {
  return (
    <div className="p-6 bg-slate-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">ছবি আপলোড</h1>
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            ছবি নির্বাচন করুন
          </label>
          <input
            type="file"
            accept="image/*"
            className="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg text-white"
          />
        </div>
        <button
          type="submit"
          className="bg-cyan-500 text-black px-6 py-3 rounded-lg font-semibold"
        >
          আপলোড করুন
        </button>
      </form>
    </div>
  );
}
