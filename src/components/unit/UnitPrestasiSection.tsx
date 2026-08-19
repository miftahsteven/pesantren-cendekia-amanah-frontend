'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Achievement, UnitType } from '@/types';
import { studentAchievements } from '@/content/mock/achievements';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { contentRepo } from '@/repositories/content.repository';
import { getUploadUrl } from '@/lib/uploads';

interface UnitPrestasiSectionProps {
  unitCode: UnitType | string;
  initialAchievements?: Achievement[];
}

export default function UnitPrestasiSection({
  unitCode,
  initialAchievements
}: UnitPrestasiSectionProps) {
  const [items, setItems] = useState<Achievement[]>(() => {
    if (initialAchievements && initialAchievements.length > 0) {
      return initialAchievements;
    }
    return studentAchievements.filter((a) => a.unit === unitCode);
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    contentRepo
      .getAchievements(unitCode)
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setItems(data);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, [unitCode]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // If no items at all
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="py-12 sm:py-14 bg-white border-y border-[#DDE6F1]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-8">
        {/* Section Header with Red Lines */}
        <div className="flex items-center justify-center gap-3 sm:gap-4">
          <span className="w-8 sm:w-12 h-0.5 bg-[#D8232A] rounded-full" />
          <h2 className="text-xl sm:text-2xl font-black text-[#0B2F6B] tracking-wider uppercase">
            PRESTASI SANTRI
          </h2>
          <span className="w-8 sm:w-12 h-0.5 bg-[#D8232A] rounded-full" />
        </div>

        {/* Carousel Container with Left/Right Buttons */}
        <div className="relative group">
          {/* Scroll Left Button */}
          <button
            onClick={() => scroll('left')}
            className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 border border-[#DDE6F1] hover:border-[#0B2F6B] text-[#0B2F6B] flex items-center justify-center transition-all shadow-md hover:scale-105"
            aria-label="Scroll ke kiri"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Horizontal Slider */}
          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar py-2 px-1 snap-x snap-mandatory"
          >
            {items.map((item) => (
              <div
                key={item.id}
                className="w-[230px] sm:w-[250px] h-[120px] sm:h-[128px] shrink-0 bg-white rounded-2xl sm:rounded-3xl border border-[#E6EDF6] shadow-xs hover:shadow-md hover-lift flex overflow-hidden snap-start group/card transition-all"
              >
                {/* Left Image / Badge Container */}
                <div className="w-20 sm:w-24 shrink-0 h-full bg-[#EDF3F9] p-1.5 flex items-center justify-center relative overflow-hidden group-hover/card:bg-[#E2EDF9] transition-colors">
                  {item.image ? (
                    <div className="relative w-full h-full rounded-xl overflow-hidden bg-white/60">
                      <Image
                        src={getUploadUrl(item.image)}
                        alt={item.title}
                        fill
                        className="object-cover group-hover/card:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 80px, 96px"
                      />
                    </div>
                  ) : (
                    <svg
                      className="w-7 h-7 sm:w-8 sm:h-8 text-[#1F5FD0]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="8" r="5" />
                      <path d="M8.21 13.89 7 22l5-3 5 3-1.21-8.11" />
                    </svg>
                  )}
                </div>

                {/* Right Text Container */}
                <div className="px-3 py-2.5 sm:py-3 flex-1 flex flex-col justify-between min-w-0 bg-white">
                  {/* Peringkat / Badge Juara */}
                  <h3 className="font-extrabold text-[#0B2F6B] text-[13px] sm:text-sm leading-tight truncate">
                    {item.badge || item.rank || 'Juara'}
                  </h3>

                  {/* Penjelasan / Nama Prestasi Terbaca Penuh */}
                  <p
                    className="text-[11px] sm:text-xs text-[#475569] font-medium leading-snug break-words my-auto py-0.5 line-clamp-3"
                    title={item.title}
                  >
                    {item.title}
                  </p>

                  {/* Tahun Perolehan */}
                  <span className="text-[10px] sm:text-[11px] text-[#94A3B8] font-semibold">
                    {item.year || '2026'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Right Button */}
          <button
            onClick={() => scroll('right')}
            className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 border border-[#DDE6F1] hover:border-[#0B2F6B] text-[#0B2F6B] flex items-center justify-center transition-all shadow-md hover:scale-105"
            aria-label="Scroll ke kanan"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
