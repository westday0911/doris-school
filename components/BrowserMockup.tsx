'use client';

import { useEffect, useState } from 'react';

interface BrowserMockupProps {
  images: string[];
  autoSlideInterval?: number; // 自動切換間隔（毫秒）
}

export function BrowserMockup({ images, autoSlideInterval = 3000 }: BrowserMockupProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(images.length - 1);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setPrevIndex(currentIndex);
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [images.length, autoSlideInterval, currentIndex]);

  return (
    <div className="relative w-full">
      {/* Browser Frame - 科技深色系 */}
      <div className="bg-slate-900 rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden border border-white/10 backdrop-blur-xl">
        {/* Browser Header - 深色系 */}
        <div className="bg-slate-800/50 px-4 py-3 flex items-center gap-2 border-b border-white/5 backdrop-blur-md">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
          </div>
          <div className="flex-1 mx-4 bg-slate-950/50 rounded-lg px-4 py-1.5 text-xs text-slate-500 border border-white/5 font-medium flex items-center gap-2">
            <span className="opacity-40 text-[10px] tracking-tight">https://</span>
            <span className="text-slate-300">doris-ai-academy.com</span>
          </div>
        </div>

        {/* Browser Content - 圖片容器 */}
        <div className="relative overflow-hidden bg-slate-950" style={{ aspectRatio: '16/10' }}>
          {images.map((image, index) => {
            const isVisible = index === currentIndex || index === prevIndex;
            if (!isVisible) return null;

            return (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  index === currentIndex
                    ? 'translate-y-0 opacity-100 z-10'
                    : 'translate-y-[-100%] opacity-0 z-0'
                }`}
              >
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                />
              </div>
            );
          })}
          {/* 科技感掃描線 */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-blue-500/5 via-transparent to-transparent h-1/2 w-full animate-pulse"></div>
          <div className="absolute inset-0 pointer-events-none border-t border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"></div>
        </div>
      </div>
    </div>
  );
}
