'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  X,
  ArrowRight,
  Image as ImageIcon
} from 'lucide-react';
import { getUploadUrl } from '@/lib/uploads';
import { GalleryItem } from '@/types';

interface GaleriSliderProps {
  galleryItems: GalleryItem[];
}

export default function GaleriSlider({ galleryItems }: GaleriSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Mouse drag states
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const hasMoved = useRef(false);

  // Zoom / Lightbox modal state
  const [zoomedIndex, setZoomedIndex] = useState<number | null>(null);

  // Requirement: Dibatasi cukup 10 Gambar
  const displayItems = galleryItems.slice(0, 10);
  // Requirement: Button "Lihat Lainnya" jika gambar galeri di database > 10
  const hasMore = galleryItems.length > 10;
  const remainingCount = galleryItems.length - 10;

  // Check scroll position to enable/disable arrow buttons
  const updateScrollButtons = useCallback(() => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  useEffect(() => {
    updateScrollButtons();
    window.addEventListener('resize', updateScrollButtons);
    return () => window.removeEventListener('resize', updateScrollButtons);
  }, [updateScrollButtons, displayItems.length]);

  // Smooth scroll manual with buttons
  const handleScroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    const scrollAmount = 340;
    containerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    isDragging.current = true;
    hasMoved.current = false;
    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeftStart.current = containerRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    const x = e.pageX - containerRef.current.offsetLeft;
    const distance = x - startX.current;
    if (Math.abs(distance) > 5) {
      hasMoved.current = true;
      e.preventDefault();
      containerRef.current.scrollLeft = scrollLeftStart.current - distance * 1.2;
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    setTimeout(() => {
      hasMoved.current = false;
    }, 50);
  };

  // Lightbox Zoom Navigation
  const handlePrevZoom = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setZoomedIndex((prev) =>
        prev !== null ? (prev > 0 ? prev - 1 : displayItems.length - 1) : null
      );
    },
    [displayItems.length]
  );

  const handleNextZoom = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setZoomedIndex((prev) =>
        prev !== null ? (prev < displayItems.length - 1 ? prev + 1 : 0) : null
      );
    },
    [displayItems.length]
  );

  const handleCloseZoom = useCallback(() => {
    setZoomedIndex(null);
  }, []);

  // Keyboard navigation inside Zoom Modal
  useEffect(() => {
    if (zoomedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseZoom();
      } else if (e.key === 'ArrowLeft') {
        handlePrevZoom();
      } else if (e.key === 'ArrowRight') {
        handleNextZoom();
      }
    };

    // Lock body scroll when zoom modal is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [zoomedIndex, handleCloseZoom, handlePrevZoom, handleNextZoom]);

  const activeZoomItem = zoomedIndex !== null ? displayItems[zoomedIndex] : null;

  return (
    <div className="relative w-full">
      {/* Top Controls: Manual Scroll Arrows & Counter */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2 text-xs font-medium text-[#5C6B7D]">
          <span className="inline-block w-2 h-2 rounded-full bg-[#1A4FA0]" />
          <span>
            Menampilkan <strong className="text-[#0B2F6B]">{displayItems.length}</strong> foto terpilih
            {hasMore && (
              <span className="text-[#8896A6]"> (dari {galleryItems.length} total)</span>
            )}
          </span>
        </div>

        {/* Manual Scroller Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleScroll('left')}
            disabled={!canScrollLeft}
            aria-label="Geser ke kiri"
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
              canScrollLeft
                ? 'bg-white text-[#0B2F6B] border-[#DDE6F1] hover:bg-[#0B2F6B] hover:text-white shadow-xs'
                : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-50'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleScroll('right')}
            disabled={!canScrollRight}
            aria-label="Geser ke kanan"
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
              canScrollRight
                ? 'bg-white text-[#0B2F6B] border-[#DDE6F1] hover:bg-[#0B2F6B] hover:text-white shadow-xs'
                : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-50'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroller Track */}
      <div className="relative group/track">
        {/* Floating Side Arrow: Left */}
        {canScrollLeft && (
          <button
            onClick={() => handleScroll('left')}
            aria-label="Scroll Galeri Kiri"
            className="absolute -left-3 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/95 backdrop-blur-xs border border-[#DDE6F1] shadow-md flex items-center justify-center text-[#0B2F6B] hover:bg-[#0B2F6B] hover:text-white transition-all cursor-pointer hidden sm:flex"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Floating Side Arrow: Right */}
        {canScrollRight && (
          <button
            onClick={() => handleScroll('right')}
            aria-label="Scroll Galeri Kanan"
            className="absolute -right-3 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/95 backdrop-blur-xs border border-[#DDE6F1] shadow-md flex items-center justify-center text-[#0B2F6B] hover:bg-[#0B2F6B] hover:text-white transition-all cursor-pointer hidden sm:flex"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        {/* Scroll Container */}
        <div
          ref={containerRef}
          onScroll={updateScrollButtons}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="flex items-center gap-4 sm:gap-5 overflow-x-auto no-scrollbar py-2 px-1 cursor-grab active:cursor-grabbing select-none scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {displayItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => {
                if (!hasMoved.current) {
                  setZoomedIndex(index);
                }
              }}
              className="relative w-64 sm:w-72 md:w-80 h-44 sm:h-48 md:h-52 shrink-0 rounded-2xl overflow-hidden border border-[#DDE6F1] shadow-xs hover:shadow-lg transition-all duration-300 group cursor-pointer bg-slate-900"
              title={`Klik untuk memperbesar: ${item.title}`}
            >
              {/* Photo Image */}
              <Image
                src={getUploadUrl(item.image)}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                sizes="(max-width: 640px) 260px, (max-width: 768px) 290px, 320px"
              />

              {/* Gradient Dark Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Zoom In Indicator Badge on Hover */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 shadow-sm pointer-events-none">
                <ZoomIn className="w-4 h-4" />
              </div>

              {/* Caption Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 space-y-1 text-white pointer-events-none">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/20 shadow-xs">
                  <ImageIcon className="w-2.5 h-2.5" />
                  {item.category}
                </span>
                <h3 className="text-xs sm:text-sm font-bold text-white line-clamp-1 leading-snug group-hover:text-[#F0BD28] transition-colors">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}

          {/* End Card in Scroller (If Database > 10 items) */}
          {hasMore && (
            <Link
              href="/galeri"
              className="w-52 sm:w-60 h-44 sm:h-48 md:h-52 shrink-0 rounded-2xl border-2 border-dashed border-[#B9C8DC] hover:border-[#0B2F6B] bg-[#F4F7FB]/80 hover:bg-[#EBF3FF] transition-all flex flex-col items-center justify-center text-center p-5 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-[#0B2F6B]/10 group-hover:bg-[#0B2F6B] text-[#0B2F6B] group-hover:text-white flex items-center justify-center transition-colors mb-3 shadow-xs">
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
              <span className="text-sm font-bold text-[#0B2F6B]">Lihat Semua Galeri</span>
              <span className="text-xs text-[#5C6B7D] mt-1 font-medium">
                +{remainingCount} foto lainnya
              </span>
            </Link>
          )}
        </div>
      </div>

      {/* Button "Lihat Lainnya" jika gambar galeri di database > 10 */}
      {hasMore && (
        <div className="mt-8 flex justify-center">
          <Link
            href="/galeri"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#0B2F6B] hover:bg-[#071E43] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all group cursor-pointer"
          >
            <span>Lihat Galeri Lainnya ({remainingCount} Foto Lagi)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      )}

      {/* Lightbox Zoom Modal */}
      {activeZoomItem && (
        <div
          className="fixed inset-0 z-50 flex flex-col justify-between bg-black/92 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={handleCloseZoom}
        >
          {/* Top Bar: Info & Close Button */}
          <div
            className="flex items-center justify-between w-full max-w-5xl mx-auto z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/20">
                {activeZoomItem.category}
              </span>
              <span className="text-white/70 text-xs sm:text-sm font-medium">
                Foto {zoomedIndex! + 1} dari {displayItems.length}
              </span>
            </div>

            <button
              onClick={handleCloseZoom}
              aria-label="Tutup preview zoom"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Center Image with Prev / Next Navigation Arrows */}
          <div
            className="relative flex items-center justify-center flex-1 my-2 max-w-5xl w-full mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Image Button */}
            <button
              onClick={handlePrevZoom}
              aria-label="Foto sebelumnya"
              className="absolute left-2 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Main Zoomed Image */}
            <div className="relative w-full h-[62vh] sm:h-[72vh] flex items-center justify-center">
              <Image
                src={getUploadUrl(activeZoomItem.image)}
                alt={activeZoomItem.title}
                fill
                priority
                className="object-contain rounded-xl select-none"
                sizes="(max-width: 1280px) 100vw, 1200px"
              />
            </div>

            {/* Next Image Button */}
            <button
              onClick={handleNextZoom}
              aria-label="Foto selanjutnya"
              className="absolute right-2 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Bar: Title & Caption */}
          <div
            className="w-full max-w-3xl mx-auto text-center z-10 space-y-1"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="text-base sm:text-lg font-bold text-white leading-tight">
              {activeZoomItem.title}
            </h4>
            <p className="text-xs text-white/60">
              Gunakan tombol panah keyboard (← / →) untuk berpindah atau Esc untuk menutup.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
