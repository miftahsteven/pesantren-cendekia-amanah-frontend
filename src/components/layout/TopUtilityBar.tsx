'use client';

import React from 'react';
import Link from 'next/link';
import { useUI } from '@/context/UIContext';
import { Phone, ExternalLink, Download, Play } from 'lucide-react';

export default function TopUtilityBar() {
  const { openBrochureModal, openVideoModal } = useUI();

  return (
    <div className="bg-[#0B2F6B] text-white text-[11px] sm:text-xs border-b border-[#12377E]/80 hidden md:block">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex items-center justify-between h-9">
        {/* Left Side: Welcome / Tagline Info (No duplicate unit links) */}
        <div className="flex items-center gap-2 text-white/90">
          <span className="text-[#8ED6A8] font-bold uppercase tracking-wider text-[10px]">
            Cendekia Amanah
          </span>
          <span className="text-white/40">•</span>
          <span className="text-white/80 text-[11px]">
            Mencetak Generasi Qurani, Berprestasi, dan Berjiwa Pemimpin
          </span>
        </div>

        {/* Right Side: Quick Action Links */}
        <div className="flex items-center space-x-4 shrink-0">
          <Link
            href="/kontak"
            className="inline-flex items-center gap-1 text-white/80 hover:text-white transition-colors"
          >
            <Phone className="w-3 h-3 text-[#8ED6A8]" />
            <span>+62-857-7644-6468</span>
          </Link>

          <a
            href="https://cholilnafis.id/#konsultasi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-white/80 hover:text-[#F0BD28] transition-colors"
          >
            <span>Konsultasi Keislaman</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-70" />
          </a>

          <button
            onClick={openBrochureModal}
            className="inline-flex items-center gap-1 text-white/80 hover:text-white transition-colors"
          >
            <Download className="w-3 h-3 text-[#8ED6A8]" />
            <span>Unduh Brosur</span>
          </button>

          <button
            onClick={openVideoModal}
            className="inline-flex items-center gap-1 text-white/80 hover:text-[#8ED6A8] transition-colors"
          >
            <Play className="w-3 h-3 fill-[#8ED6A8] text-[#8ED6A8]" />
            <span>Virtual Tour</span>
          </button>
        </div>
      </div>
    </div>
  );
}
