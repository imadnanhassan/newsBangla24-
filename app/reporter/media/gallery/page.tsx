"use client";

export default function GalleryPage() {
  const images = [
    { id: 1, src: "/image1.jpg", alt: "ছবি 1" },
    { id: 2, src: "/image2.jpg", alt: "ছবি 2" },
  ];
  return (
    <div className="p-6 bg-slate-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">গ্যালারি</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="p-4 bg-slate-800 border border-slate-600 rounded-lg"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-32 object-cover rounded"
            />
            <p className="mt-2 text-center">{image.alt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
