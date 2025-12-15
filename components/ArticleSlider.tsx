"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
interface ArticleSliderProps {
  articles: any[];
  autoPlay?: boolean;
  interval?: number;
}

export default function ArticleSlider({
  articles,
  autoPlay = true,
  interval = 5000,
}: ArticleSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!autoPlay || articles.length <= 1) return;

    const timer = setInterval(() => {
      if (!isPaused) {
        setCurrentSlide((prev) => (prev + 1) % articles.length);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, articles.length, isPaused]);

  if (articles.length === 0) return null;

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + articles.length) % articles.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % articles.length);
  };

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slider container */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {articles.map((article, index) => (
          <div key={index} className="w-full shrink-0">
            <Link href={`/article/${article.slug}`} className="block">
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src={article.image_url || "/placeholder.png"}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-6">
                  <span className="bg-red-600 text-white px-3 py-1 rounded text-sm mb-2 w-fit">
                    {article.category.name}
                  </span>
                  <h3 className="text-white text-xl font-bold line-clamp-2 mb-2">
                    {article.title}
                  </h3>
                  <p className="text-white text-sm line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all z-10"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all z-10"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {articles.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentSlide === index ? "bg-white" : "bg-white bg-opacity-50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
