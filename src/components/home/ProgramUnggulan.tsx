import React from 'react';
import Image from 'next/image';
import SectionHeader from '@/components/common/SectionHeader';
import { BookOpen, Globe2, ShieldCheck, Microscope, PlaneTakeoff } from 'lucide-react';
import { getUploadUrl } from '@/lib/uploads';
import { apiGet } from '@/lib/api-client';

const iconMap: Record<string, any> = {
  tahfidz: BookOpen,
  bilingual: Globe2,
  leadership: ShieldCheck,
  research: Microscope,
  exchange: PlaneTakeoff
};

const defaultPrograms = [
  {
    title: 'Tahfidz Al-Qur’an 30 Juz Bersanad',
    category: 'Spiritualitas & Karakter',
    image: '/uploads/gallery/pesantren1.png',
    icon: BookOpen
  },
  {
    title: 'Cambridge English & Bilingual Program',
    category: 'Bahasa Internasional',
    image: '/uploads/gallery/smp3.png',
    icon: Globe2
  },
  {
    title: 'Leadership Camp & Kepanduan',
    category: 'Kepemimpinan Mandiri',
    image: '/uploads/gallery/sma5.png',
    icon: ShieldCheck
  },
  {
    title: 'Research & Innovation Laboratory',
    category: 'Sains & Robotika',
    image: '/uploads/gallery/sma2.png',
    icon: Microscope
  },
  {
    title: 'Student Exchange & University Tour',
    category: 'Wawasan Global',
    image: '/uploads/gallery/sma3.png',
    icon: PlaneTakeoff
  }
];

export default async function ProgramUnggulan() {
  let programs = defaultPrograms;

  try {
    const dbProgs = await apiGet<any[]>('/featured-programs');
    if (dbProgs && Array.isArray(dbProgs) && dbProgs.length > 0) {
      programs = dbProgs.map((p, idx) => ({
        title: p.title || defaultPrograms[idx % defaultPrograms.length].title,
        category: p.category || defaultPrograms[idx % defaultPrograms.length].category,
        image: p.imageUrl || defaultPrograms[idx % defaultPrograms.length].image,
        icon: iconMap[p.iconKey] || defaultPrograms[idx % defaultPrograms.length].icon
      }));
    }
  } catch {
    // fallback
  }

  return (
    <section className="py-14 sm:py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <SectionHeader
          badge="Kurikulum Prioritas"
          title="PROGRAM UNGGULAN"
          subtitle="Pilar program pendidikan unggulan yang dirancang untuk mengoptimalkan potensi intelektual, spiritual, dan kepemimpinan santri."
          centered
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {programs.map((prog, idx) => {
            const Icon = prog.icon;

            return (
              <div
                key={idx}
                className="bg-white rounded-2xl sm:rounded-3xl border border-[#DDE6F1] overflow-hidden shadow-xs hover-lift flex flex-col group"
              >
                {/* Program Image */}
                <div className="relative h-44 w-full bg-gray-100 overflow-hidden">
                  <Image
                    src={getUploadUrl(prog.image)}
                    alt={prog.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 250px"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-white bg-[#0B2F6B]/90 backdrop-blur-xs px-2.5 py-0.5 rounded-full">
                      {prog.category}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-xl bg-[#EBF3FF] text-[#1F5FD0] flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-[#0B2F6B] group-hover:text-[#1F5FD0] transition-colors leading-snug line-clamp-2">
                      {prog.title}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
