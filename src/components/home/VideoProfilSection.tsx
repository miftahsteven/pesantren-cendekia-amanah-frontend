'use client';

import React from 'react';
import Image from 'next/image';
import { useUI } from '@/context/UIContext';
import { Play } from 'lucide-react';

export default function VideoProfilSection() {
  const { openVideoModal } = useUI();

  return (
    <section className="py-14 sm:py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#DDE6F1] bg-[#0B2F6B]">
          {/* Background Cover Image */}
          <div className="relative h-72 sm:h-96 md:h-[420px] w-full">
            <Image
              src="/images/galery/pesantren6.png"
              alt="Video Profil Cendekia Amanah"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-[#0B2F6B]/75 backdrop-blur-[2px]" />
          </div>

          {/* Central Play Trigger & Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-4">
            <button
              onClick={openVideoModal}
              className="group relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#17804A] hover:bg-[#12643E] text-white shadow-2xl transition-all transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-white/40"
              aria-label="Putar Video Profil Pesantren Cendekia Amanah"
            >
              {/* Ripple Ring */}
              <span className="absolute inset-0 rounded-full bg-[#17804A] animate-ping opacity-30" />
              <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-white text-white translate-x-0.5" />
            </button>

            <div className="space-y-1.5 max-w-xl text-white">
              <span className="text-xs font-bold text-[#8ED6A8] uppercase tracking-widest block">
                Virtual Tour & Profil Kampus
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                Video Profil Cendekia Amanah
              </h2>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                Jelajahi sarana prasarana modern, aktivitas santri, dan kehangatan kebersamaan di lingkungan pesantren kami.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
