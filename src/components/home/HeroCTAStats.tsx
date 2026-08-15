'use client';

import React from 'react';
import Link from 'next/link';
import { useUI } from '@/context/UIContext';
import { ArrowRight, Play, Users, Award, GraduationCap, BookOpen } from 'lucide-react';

export default function HeroCTAStats() {
  const { openVideoModal } = useUI();

  const stats = [
    { value: '1500+', label: 'Alumni', icon: Users },
    { value: '500+', label: 'Santri Aktif', icon: GraduationCap },
    { value: '95%', label: 'Lulus PTN', icon: Award },
    { value: '25', label: 'Guru Tahfidz', icon: BookOpen }
  ];

  return (
    <div className="space-y-8 pt-6 pb-2">
      {/* Action Buttons & Motto */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 sm:p-8 bg-white rounded-2xl sm:rounded-3xl border border-[#DDE6F1] shadow-xs">
        <div className="space-y-1.5 text-center md:text-left">
          <span className="text-xs font-bold text-[#17804A] tracking-wider uppercase">
            Penerimaan Santri & Siswa Baru 2027/2028
          </span>
          <p className="text-base sm:text-lg font-bold text-[#0B2F6B] leading-relaxed max-w-xl">
            Mencetak Generasi Qurani, Berprestasi, Berjiwa Pemimpin untuk Masa Depan Gemilang.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3.5 shrink-0">
          <Link
            href="/ppdb"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold text-white bg-[#1A4FA0] hover:bg-[#12377E] shadow-sm hover:shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>DAFTAR SEKARANG</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            onClick={openVideoModal}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold text-[#17804A] bg-white border-2 border-[#17804A] hover:bg-[#EAF7EF] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Play className="w-4 h-4 fill-[#17804A]" />
            <span>VIRTUAL TOUR</span>
          </button>
        </div>
      </div>

      {/* Hero Stats Grid (Blue Gradient Panel) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;

          return (
            <div
              key={idx}
              className="bg-linear-to-br from-[#0B2F6B] to-[#1A4FA0] p-5 sm:p-6 rounded-2xl border border-[#12377E] text-white shadow-sm flex items-center gap-4 hover-lift"
            >
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
                <Icon className="w-6 h-6 text-[#8ED6A8]" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-none">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-white/80 font-medium mt-1">
                  {stat.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
