'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getUploadUrl } from '@/lib/uploads';
import { Partner } from '@/types';

interface MitraSliderProps {
  partners: Partner[];
}

export default function MitraSlider({ partners }: MitraSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const hasMoved = useRef(false);

  // Repeat partners array 4x for seamless infinite looping
  const displayPartners = [...partners, ...partners, ...partners, ...partners];

  // Auto-scroll ke kiri secara berkelanjutan
  useEffect(() => {
    const container = containerRef.current;
    if (!container || partners.length === 0) return;

    let animationFrameId: number;
    const speed = 0.85; // kecepatan scroll halus

    const step = () => {
      if (!isPaused && !isDragging.current && container) {
        container.scrollLeft += speed;

        // Reset loop seamlessly saat mencapai 2 set item
        const singleSetWidth = container.scrollWidth / 4;
        if (container.scrollLeft >= singleSetWidth * 2) {
          container.scrollLeft -= singleSetWidth;
        } else if (container.scrollLeft <= 5) {
          container.scrollLeft += singleSetWidth;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPaused, partners.length]);

  // Tombol navigasi manual kiri & kanan
  const handleScroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    const scrollAmount = 320;
    containerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  // Mouse click & drag manual
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    isDragging.current = true;
    hasMoved.current = false;
    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeftStart.current = containerRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    e.preventDefault();
    hasMoved.current = true;
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.4;
    containerRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <div
      className="relative group/slider w-full mt-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        isDragging.current = false;
      }}
    >
      {/* Tombol Manual Scroll ke Kiri */}
      <button
        onClick={() => handleScroll('left')}
        aria-label="Scroll Mitra ke Kiri"
        className="absolute -left-3 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 border border-[#DDE6F1] shadow-md flex items-center justify-center text-[#0B2F6B] hover:bg-[#0B2F6B] hover:text-white transition-all opacity-80 sm:opacity-0 sm:group-hover/slider:opacity-100 focus:opacity-100 cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Tombol Manual Scroll ke Kanan */}
      <button
        onClick={() => handleScroll('right')}
        aria-label="Scroll Mitra ke Kanan"
        className="absolute -right-3 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 border border-[#DDE6F1] shadow-md flex items-center justify-center text-[#0B2F6B] hover:bg-[#0B2F6B] hover:text-white transition-all opacity-80 sm:opacity-0 sm:group-hover/slider:opacity-100 focus:opacity-100 cursor-pointer"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Fade Gradients di Ujung Kiri dan Kanan */}
      <div className="absolute left-0 inset-y-0 w-8 sm:w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-8 sm:w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      {/* Container Scroll Horizontal Satu Baris */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="flex items-center gap-4 sm:gap-5 overflow-x-auto no-scrollbar py-2 px-1 cursor-grab active:cursor-grabbing select-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {displayPartners.map((partner, index) => (
          <div
            key={`${partner.id}-${index}`}
            className="w-36 sm:w-44 h-22 sm:h-24 p-3.5 sm:p-4 rounded-2xl border border-[#E6EDF6] bg-[#F4F7FB]/50 hover:bg-white hover:border-[#B9C8DC] hover:shadow-xs transition-all flex items-center justify-center shrink-0 group/card"
            title={partner.name}
          >
            <div className="relative w-full h-10 sm:h-12 grayscale opacity-70 group-hover/card:grayscale-0 group-hover/card:opacity-100 transition-all duration-300 transform group-hover/card:scale-105 pointer-events-none">
              <Image
                src={getUploadUrl(partner.logo)}
                alt={partner.name}
                fill
                className="object-contain"
                sizes="160px"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
