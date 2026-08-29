'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FacilityItem } from '@/types';
import SectionHeader from '@/components/common/SectionHeader';
import { getUploadUrl } from '@/lib/uploads';
import { Building2, Sparkles, CheckCircle2 } from 'lucide-react';

interface Props {
  initialFacilities: FacilityItem[];
}

export default function FasilitasPesantrenSection({ initialFacilities }: Props) {
  const [selectedUnit, setSelectedUnit] = useState<string>('ALL');

  const unitFilters = [
    { id: 'ALL', label: 'Semua Fasilitas' },
    { id: 'pesantren', label: 'Pesantren' },
    { id: 'smp', label: 'SMP Cendekia' },
    { id: 'sma', label: 'SMA Cendekia' },
    { id: 'diniyah', label: 'Madrasah Diniyah' }
  ];

  const filtered = selectedUnit === 'ALL'
    ? initialFacilities
    : initialFacilities.filter(
        (f) => f.unitSlug?.toLowerCase() === selectedUnit.toLowerCase() || f.unitId === selectedUnit
      );

  return (
    <section id="fasilitas" className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-8 scroll-mt-24">
      <SectionHeader
        badge="Sarana & Prasarana Terpadu"
        title="FASILITAS PESANTREN CENDEKIA AMANAH"
        subtitle="Mendukung kegiatan belajar mengajar, tahfidz Al-Qur'an, riset sains, pembinaan karakter, dan kehidupan asrama yang kondusif & asri."
      />

      {/* Filter Tabs */}
      <div className="flex items-center justify-center sm:justify-start gap-2 overflow-x-auto no-scrollbar py-1">
        {unitFilters.map((tab) => {
          const isActive = selectedUnit === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedUnit(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-[#1A4FA0] text-white shadow-sm'
                  : 'bg-white text-[#28384A] border border-[#DDE6F1] hover:bg-[#F4F7FB] hover:border-[#B9C8DC]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Facilities Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#DDE6F1] p-12 text-center text-[#64748B]">
          <Building2 className="w-12 h-12 mx-auto mb-3 text-[#1A4FA0]/40" />
          <p className="font-semibold text-sm">Belum ada fasilitas yang ditampilkan untuk kategori ini.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((fac, idx) => (
            <div
              key={fac.id || idx}
              className="bg-white rounded-3xl border border-[#DDE6F1] overflow-hidden shadow-xs hover-lift flex flex-col group transition-all duration-300"
            >
              <div className="relative h-52 w-full overflow-hidden bg-gray-100">
                <Image
                  src={getUploadUrl(fac.imageUrl)}
                  alt={fac.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

                {fac.unitBadge && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90 text-[#0B2F6B] backdrop-blur-xs shadow-xs uppercase tracking-wider">
                    {fac.unitBadge}
                  </span>
                )}
              </div>

              <div className="p-6 space-y-2 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <h4 className="text-base font-bold text-[#0B2F6B] group-hover:text-[#1A4FA0] transition-colors leading-snug">
                    {fac.name}
                  </h4>
                  <p className="text-xs text-[#5C6B7D] leading-relaxed line-clamp-3">
                    {fac.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F4F7FB] flex items-center justify-between text-[11px] text-[#7B8CA1] font-semibold">
                  <span className="flex items-center gap-1 text-[#D8232A]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Tersedia & Terawat
                  </span>
                  <span>{fac.unitShortName || 'Pesantren'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
