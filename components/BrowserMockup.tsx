'use client';

import { useEffect, useState } from 'react';

interface BrowserMockupProps {
  images: string[];
  autoSlideInterval?: number; // 自動切換間隔（毫秒）
}

export function BrowserMockup({ images, autoSlideInterval = 3000 }: BrowserMockupProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [images.length, autoSlideInterval]);

  return (
    <div className="relative w-full">
      {/* Browser Frame - 簡潔淺色系 */}
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-200 backdrop-blur-sm">
        {/* Browser Header - 淺色系 */}
        <div className="bg-slate-50/80 px-4 py-3 flex items-center gap-2 border-b border-slate-200">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-slate-300"></div>
            <div className="w-3 h-3 rounded-full bg-slate-300"></div>
            <div className="w-3 h-3 rounded-full bg-slate-300"></div>
          </div>
          <div className="flex-1 mx-4 bg-white rounded-md px-4 py-1.5 text-xs text-slate-400 border border-slate-200 font-medium">
            <span>https://</span>
            <span className="text-slate-600">doris-ai-academy.com</span>
          </div>
        </div>

        {/* Browser Content - 圖片容器 */}
        <div className="relative overflow-hidden bg-white" style={{ aspectRatio: '16/10' }}>
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentIndex
                  ? 'translate-y-0 opacity-100'
                  : index < currentIndex
                  ? '-translate-y-full opacity-0'
                  : 'translate-y-full opacity-0'
              }`}
            >
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          ))}
          {/* 邊框裝飾 */}
          <div className="absolute inset-0 pointer-events-none border-t border-slate-100"></div>
        </div>
      </div>
    </div>
  );
}
