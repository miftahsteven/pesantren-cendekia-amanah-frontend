'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  X,
  Image as ImageIcon
} from 'lucide-react';
import { getUploadUrl } from '@/lib/uploads';
import { GalleryItem } from '@/types';

interface GalleryViewerProps {
  initialItems: GalleryItem[];
}

export default function GalleryViewer({ initialItems }: GalleryViewerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [zoomedIndex, setZoomedIndex] = useState<number | null>(null);

  // Extract unique categories
  const categories = [
    'Semua',
    ...Array.from(new Set(initialItems.map((item) => item.category))).filter(Boolean)
  ];

  // Filter items based on category
  const filteredItems =
    selectedCategory === 'Semua'
      ? initialItems
      : initialItems.filter(
          (item) => item.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  // Lightbox navigation
  const handlePrevZoom = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setZoomedIndex((prev) =>
        prev !== null ? (prev > 0 ? prev - 1 : filteredItems.length - 1) : null
      );
    },
    [filteredItems.length]
  );

  const handleNextZoom = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setZoomedIndex((prev) =>
        prev !== null ? (prev < filteredItems.length - 1 ? prev + 1 : 0) : null
      );
    },
    [filteredItems.length]
  );

  const handleCloseZoom = useCallback(() => {
    setZoomedIndex(null);
  }, []);

  // Keyboard navigation
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

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [zoomedIndex, handleCloseZoom, handlePrevZoom, handleNextZoom]);

  const activeZoomItem = zoomedIndex !== null ? filteredItems[zoomedIndex] : null;

  return (
    <div className="w-full">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map((cat) => {
          const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
          return (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setZoomedIndex(null);
              }}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#0B2F6B] text-white shadow-md'
                  : 'bg-white text-[#28384A] border border-[#DDE6F1] hover:bg-[#F4F7FB] hover:text-[#0B2F6B]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Counter summary */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-[#5C6B7D] mb-6 px-1">
        <span>
          Menampilkan <strong className="text-[#0B2F6B]">{filteredItems.length}</strong> foto
          {selectedCategory !== 'Semua' && ` kategori ${selectedCategory}`}
        </span>
        <span className="hidden sm:inline text-xs text-[#8896A6]">
          Klik pada gambar untuk memperbesar (zoom)
        </span>
      </div>

      {/* Responsive Gallery Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-[#F4F7FB] rounded-2xl border border-dashed border-[#DDE6F1]">
          <ImageIcon className="w-12 h-12 text-[#8896A6] mx-auto mb-3" />
          <p className="text-sm font-semibold text-[#5C6B7D]">
            Belum ada dokumentasi untuk kategori ini.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setZoomedIndex(index)}
              className="relative aspect-4/3 sm:aspect-16/10 rounded-2xl overflow-hidden border border-[#DDE6F1] shadow-xs hover:shadow-lg transition-all duration-300 group cursor-pointer bg-slate-900"
              title={`Klik untuk zoom: ${item.title}`}
            >
              <Image
                src={getUploadUrl(item.image)}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Hover Zoom Icon */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 shadow-sm">
                <ZoomIn className="w-4 h-4" />
              </div>

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-4 space-y-1 text-white">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/20 shadow-xs">
                  <ImageIcon className="w-2.5 h-2.5" />
                  {item.category}
                </span>
                <h3 className="text-xs sm:text-sm font-bold text-white line-clamp-2 leading-snug group-hover:text-[#F0BD28] transition-colors">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Zoom Modal */}
      {activeZoomItem && (
        <div
          className="fixed inset-0 z-50 flex flex-col justify-between bg-black/92 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={handleCloseZoom}
        >
          {/* Top Bar */}
          <div
            className="flex items-center justify-between w-full max-w-5xl mx-auto z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/20">
                {activeZoomItem.category}
              </span>
              <span className="text-white/70 text-xs sm:text-sm font-medium">
                Foto {zoomedIndex! + 1} dari {filteredItems.length}
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
            <button
              onClick={handlePrevZoom}
              aria-label="Foto sebelumnya"
              className="absolute left-2 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

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
