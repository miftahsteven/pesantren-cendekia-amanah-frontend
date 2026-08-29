'use client';

import React from 'react';
import Link from 'next/link';
import { useUI } from '@/context/UIContext';
import { MessageSquare, HelpCircle, ExternalLink, ArrowRight } from 'lucide-react';

interface GlobalCTAProps {
  theme?: 'blue' | 'green';
}

export default function GlobalCTA({ theme = 'blue' }: GlobalCTAProps) {
  const { toggleWhatsAppPanel } = useUI();

  const isGreen = theme === 'green';

  return (
    <section className="py-14 sm:py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div
          className={`relative overflow-hidden rounded-3xl p-8 sm:p-12 text-white shadow-xl ${
            isGreen
              ? 'bg-linear-to-r from-[#B81C22] via-[#D8232A] to-[#B81C22]'
              : 'bg-linear-to-r from-[#0B2F6B] via-[#1A4FA0] to-[#0B2F6B]'
          }`}
        >
          {/* Subtle background circles */}
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white/5 blur-2xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-white/5 blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-center lg:text-left space-y-3">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-white/15 text-white tracking-wider uppercase backdrop-blur-xs">
                Pusat Informasi & Konsultasi
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Butuh Informasi Lebih Lanjut?
              </h2>
              <p className="text-sm sm:text-base text-white/85 leading-relaxed">
                Tim layanan dan asatidz Pesantren Cendekia Amanah siap mendampingi Anda untuk konsultasi keislaman,
                jadwal kunjungan, dan pendaftaran santri baru.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3.5 shrink-0 w-full sm:w-auto">
              <a
                href="https://cholilnafis.id/#konsultasi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-xs sm:text-sm text-[#0B2F6B] bg-[#F0BD28] hover:bg-[#e0ad19] hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Konsultasi Keislaman</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>

              <button
                onClick={toggleWhatsAppPanel}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-xs sm:text-sm text-white bg-white/15 hover:bg-white/25 border border-white/30 backdrop-blur-xs transition-all transform hover:-translate-y-0.5"
              >
                <MessageSquare className="w-4 h-4 text-[#FCA5A5]" />
                <span>Chat WhatsApp Unit</span>
              </button>

              <Link
                href="/ppdb"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3.5 rounded-full font-bold text-xs sm:text-sm text-white bg-[#D8232A] hover:bg-[#B81C22] shadow-sm transition-all"
              >
                <span>Daftar PPDB</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
