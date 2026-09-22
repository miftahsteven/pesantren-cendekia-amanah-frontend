'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { getUploadUrl } from '@/lib/uploads';

export interface Slide {
  id: string;
  unit: string;
  title: string;
  subtitle: string;
  image: string;
  href: string;
  badge: string;
}

const defaultSlides: Slide[] = [
  {
    id: 'slide-pesantren',
    unit: 'Pesantren',
    title: 'Pesantren Cendekia Amanah',
    subtitle: 'Mencetak Santri Hafidz Al-Qur’an, Berkarakter Islami, dan Berjiwa Pemimpin',
    image: '/uploads/gallery/pesantren6.png',
    href: '/pesantren',
    badge: 'Unit Pondok Pesantren'
  },
  {
    id: 'slide-smp',
    unit: 'SMP',
    title: 'SMP Cendekia Amanah',
    subtitle: 'Perpaduan Kurikulum Nasional, Nilai-Nilai Islam, dan Pembelajaran Berbasis Digital',
    image: '/uploads/gallery/smp1.png',
    href: '/smp',
    badge: 'SMP Islam Terpadu'
  },
  {
    id: 'slide-sma',
    unit: 'SMA',
    title: 'SMA Cendekia Amanah',
    subtitle: 'Mempersiapkan Generasi Pemimpin, Saintis Riset, dan Sukses Menembus PTN Favorit',
    image: '/uploads/gallery/sma1.png',
    href: '/sma',
    badge: 'SMA Islam Unggulan'
  }
];

function formatSlidesData(data: any[]): Slide[] {
  if (!Array.isArray(data) || data.length === 0) return defaultSlides;
  return data.map((item: any) => ({
    id: item.id || `slide-${Math.random()}`,
    unit: item.badge || 'Pesantren',
    title: item.title,
    subtitle: item.subtitle || '',
    image: item.imageUrl || item.image || '/uploads/gallery/pesantren6.png',
    href: item.href || '/pesantren',
    badge: item.badge || 'Unit Pendidikan'
  }));
}

interface HeroCarouselProps {
  initialSlides?: any[];
}

export default function HeroCarousel({ initialSlides }: HeroCarouselProps) {
  const [slides, setSlides] = useState<Slide[]>(() => {
    if (initialSlides && initialSlides.length > 0) {
      return formatSlidesData(initialSlides);
    }
    return defaultSlides;
  });

  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    async function loadDynamicSlides() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api/v1';
        const res = await fetch(`${apiUrl}/hero-slides`, { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data) && json.data.length > 0) {
            setSlides(formatSlidesData(json.data));
          }
        }
      } catch {
        // Keep existing slides on error
      }
    }
    loadDynamicSlides();
  }, []);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5500);

    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl border border-[#DDE6F1] bg-slate-900"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="Banner Utama Pesantren Cendekia Amanah"
    >
      {/* Slider Container */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="w-full shrink-0 relative min-h-[360px] sm:min-h-[440px] md:min-h-[480px] lg:min-h-[520px] flex items-center"
            aria-hidden={current !== index}
          >
            {/* Background Image with Gentle Natural Scrim Overlay */}
            <div className="absolute inset-0 z-0">
              <Image
                src={getUploadUrl(slide.image)}
                alt={slide.title}
                fill
                priority={index === 0}
                unoptimized
                className="object-cover object-center"
                sizes="(max-width: 1280px) 100vw, 1280px"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  if (target.src && !target.src.includes('pesantren6.png')) {
                    target.src = '/images/galery/pesantren6.png';
                  }
                }}
              />
              {/* Soft directional scrim overlay: leaves the image clear and vibrant while preserving text contrast */}
              <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/35 to-transparent sm:bg-linear-to-r sm:from-black/65 sm:via-black/25 sm:to-transparent" />
            </div>

            {/* Slide Content with High-Legibility Typography */}
            <div className="relative z-10 max-w-2xl px-6 sm:px-12 py-10 sm:py-14 text-white space-y-3.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-[#D8232A] text-white shadow-md tracking-wider uppercase border border-white/20">
                <span>{slide.badge}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
                {slide.title}
              </h1>

              <p className="text-xs sm:text-sm md:text-base text-white/95 font-medium leading-relaxed max-w-xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]">
                {slide.subtitle}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <Link
                  href={slide.href}
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-[#1A4FA0] hover:bg-[#12377E] shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 border border-white/20"
                >
                  <span>Kunjungi Unit {slide.unit}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/ppdb"
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold text-[#0B2F6B] bg-[#F0BD28] hover:bg-[#e0ad19] shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 border border-white/20"
                >
                  <span>Daftar PPDB</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#0B2F6B] backdrop-blur-xs flex items-center justify-center transition-all shadow-md focus:outline-none cursor-pointer"
        aria-label="Slide sebelumnya"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#0B2F6B] backdrop-blur-xs flex items-center justify-center transition-all shadow-md focus:outline-none cursor-pointer"
        aria-label="Slide berikutnya"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/30 backdrop-blur-xs px-3 py-1.5 rounded-full">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
              current === index ? 'w-8 bg-[#F0BD28]' : 'w-2.5 bg-white/50 hover:bg-white'
            }`}
            aria-label={`Pindah ke banner slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
