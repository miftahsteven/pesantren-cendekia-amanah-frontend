import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SectionHeader from '@/components/common/SectionHeader';
import { contentRepo } from '@/repositories/content.repository';
import { Building2, GraduationCap, BookOpen, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { getUploadUrl } from '@/lib/uploads';

const iconMap: Record<string, any> = {
  pesantren: Building2,
  smp: GraduationCap,
  sma: BookOpen,
  diniyah: Award
};

const defaultPoints: Record<string, string[]> = {
  pesantren: [
    'Tahfidz Al-Qur’an Bersanad',
    'Bahasa Arab & Kitab Kuning',
    'Leadership & Karakter Mandiri',
    'Pembinaan Adab 24 Jam'
  ],
  smp: [
    'Kurikulum Nasional Unggulan',
    'Tahfidz Al-Qur’an Juz 29 & 30',
    'Digital Smart Learning',
    'Ekstrakurikuler Robotik & Sains'
  ],
  sma: [
    'Persiapan Sukses Tembus PTN',
    'Research & Innovation Club',
    'Entrepreneurship Santri',
    'Tahfidz Lanjutan & Kepemimpinan'
  ],
  diniyah: [
    'Fiqih Ibadah & Ushul Fiqh',
    'Fondasi Aqidah & Akhlak',
    'Kajian Dasar Kitab Kuning',
    'Tahsin & Bimbingan Tartil BTQ'
  ]
};

export default async function UnitPendidikanCards() {
  const dbUnits = await contentRepo.getAllEducationUnits();

  const units = dbUnits.map((u) => {
    const code = u.id || 'pesantren';
    return {
      id: code,
      name: u.name,
      fullName: u.shortName || u.name,
      badge: u.badge || 'Unggulan',
      image: u.heroImage || '/uploads/gallery/pesantren6.png',
      icon: iconMap[code] || Building2,
      href: `/${code}`,
      points: u.bulletPoints && u.bulletPoints.length > 0 ? u.bulletPoints : (defaultPoints[code] || [])
    };
  });

  return (
    <section className="py-14 sm:py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <SectionHeader
          badge="Jenjang Pendidikan"
          title="UNIT PENDIDIKAN"
          subtitle="Pilihan program pendidikan Islam terpadu yang komprehensif untuk membimbing putra-putri Anda meraih masa depan terbaik."
          actionText="Bandingkan Semua Unit"
          actionHref="/pesantren"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {units.map((unit) => {
            const Icon = unit.icon;

            return (
              <div
                key={unit.id}
                className="bg-white rounded-2xl sm:rounded-3xl border border-[#DDE6F1] overflow-hidden shadow-xs hover-lift flex flex-col group"
              >
                {/* Card Image */}
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={getUploadUrl(unit.image)}
                    alt={unit.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Badge */}
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90 text-[#0B2F6B] backdrop-blur-xs shadow-xs uppercase tracking-wider">
                    {unit.badge}
                  </span>

                  {/* Unit Icon Float */}
                  <div className="absolute bottom-3 right-3 w-10 h-10 rounded-xl bg-white text-[#1A4FA0] shadow-md flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-[#0B2F6B] group-hover:text-[#1A4FA0] transition-colors leading-snug">
                      {unit.name}
                    </h3>

                    {/* Bullet Points */}
                    <ul className="space-y-2 text-xs text-[#5C6B7D]">
                      {unit.points.map((point, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#17804A] shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Action Link */}
                  <div className="pt-3 border-t border-[#F4F7FB]">
                    <Link
                      href={unit.href}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1A4FA0] group-hover:text-[#17804A] transition-colors"
                    >
                      <span>Lihat Selengkapnya</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
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
