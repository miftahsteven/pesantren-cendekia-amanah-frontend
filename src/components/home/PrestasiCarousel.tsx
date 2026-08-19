'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import SectionHeader from '@/components/common/SectionHeader';
import { Achievement } from '@/types';
import { studentAchievements } from '@/content/mock/achievements';
import { Trophy, ChevronLeft, ChevronRight, Medal } from 'lucide-react';
import { getUploadUrl } from '@/lib/uploads';
import { contentRepo } from '@/repositories/content.repository';

interface PrestasiCarouselProps {
  initialAchievements?: Achievement[];
}

export default function PrestasiCarousel({ initialAchievements }: PrestasiCarouselProps) {
  const [items, setItems] = useState<Achievement[]>(initialAchievements || studentAchievements);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    contentRepo
      .getHomeAchievements()
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setItems(data);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

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

  return (
    <section className="py-14 sm:py-16 bg-[#F4F7FB]/60 border-y border-[#DDE6F1]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#FEF8E8] text-[#D4A31C] border border-[#F0BD28]/40 uppercase tracking-wider">
              Prestasi Santri & Siswa
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2F6B] tracking-tight">
              PRESTASI GEMILANG
            </h2>
            <p className="text-sm sm:text-base text-[#5C6B7D]">
              Capaian prestasi membanggakan santri dan siswa Cendekia Amanah di kancah daerah dan nasional.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full bg-white border border-[#DDE6F1] hover:border-[#0B2F6B] text-[#0B2F6B] flex items-center justify-center transition-colors shadow-xs"
              aria-label="Scroll prestasi ke kiri"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full bg-[#0B2F6B] hover:bg-[#1A4FA0] text-white flex items-center justify-center transition-colors shadow-xs"
              aria-label="Scroll prestasi ke kanan"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto no-scrollbar pb-4 pt-1 snap-x snap-mandatory"
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="w-[280px] sm:w-[320px] shrink-0 bg-white rounded-2xl sm:rounded-3xl border border-[#DDE6F1] overflow-hidden shadow-xs hover-lift flex flex-col justify-between snap-start group"
            >
              {/* Photo */}
              <div className="relative h-44 w-full bg-gray-100 overflow-hidden">
                {item.image ? (
                  <Image
                    src={getUploadUrl(item.image)}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="320px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#EBF3FF] text-[#1A4FA0]">
                    <Trophy className="w-12 h-12" />
                  </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

                {/* Rank Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#F0BD28] text-[#0B2F6B] shadow-sm">
                  <Medal className="w-3.5 h-3.5" />
                  <span>{item.badge || item.rank || 'Juara'}</span>
                </div>

                <span className="absolute bottom-3 right-3 text-xs font-bold text-white bg-black/40 backdrop-blur-xs px-2.5 py-0.5 rounded-md">
                  {item.year || '2026'}
                </span>
              </div>

              {/* Info */}
              <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-[#17804A] uppercase tracking-wider">
                    {item.unit ? `Unit ${item.unit}` : 'Tingkat Nasional'}
                  </span>
                  <h3 className="text-sm font-bold text-[#0B2F6B] leading-snug line-clamp-2" title={item.title}>
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs text-[#5C6B7D] line-clamp-2 pt-1 border-t border-[#F4F7FB]">
                  {item.category ? (item.winner ? `${item.category} • ${item.winner}` : item.category) : (item.winner || item.competition || '')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
