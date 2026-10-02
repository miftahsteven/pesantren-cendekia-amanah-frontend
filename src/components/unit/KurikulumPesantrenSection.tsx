import React from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import {
  BookOpen,
  Scroll,
  Languages,
  Award,
  CheckCircle2,
  Sparkles,
  BookmarkCheck,
  GraduationCap
} from 'lucide-react';

import { CurriculumItem } from '@/types';

const ICON_MAP: Record<string, any> = {
  BookOpen,
  Scroll,
  Languages,
  Award,
  CheckCircle2,
  Sparkles,
  BookmarkCheck,
  GraduationCap
};

interface KurikulumPesantrenSectionProps {
  items?: CurriculumItem[];
}

export default function KurikulumPesantrenSection({ items }: KurikulumPesantrenSectionProps) {
  const defaultPillars = [
    {
      title: 'Tahfidz Al-Qur’an Bersanad 30 Juz',
      icon: BookOpen,
      badge: 'Tahfidz & Tajwid',
      color: 'blue',
      description:
        'Bimbingan hafalan Al-Qur’an intensif dengan metode Talaqqi & Tasmi’ bersanad resmi Jazariyah, setoran harian (ziyadah), muraja’ah berkala, dan sertifikasi kelulusan tahfidz.',
      highlights: [
        'Target hafalan bertahap & terukur',
        'Metode Talaqqi face-to-face bersama muhaffidz bersanad',
        'Khataman & Tasmi’ 5 s.d. 30 Juz sekali duduk',
        'Pembinaan makhorijul huruf & tartil Al-Qur’an'
      ]
    },
    {
      title: 'Dirasah Islamiyah (Kitab Kuning / Turats)',
      icon: Scroll,
      badge: 'Turats Salaf',
      color: 'amber',
      description:
        'Pendalaman literatur klasik Islam bermazhab Syafi’i dengan sanad keilmuan yang bersambung langsung kepada para ulama mu’allif kitab hingga Rasulullah SAW.',
      highlights: [
        'Aqidah: Aqidatul Awwam, Tijanud Darori, Jawahirul Kalamiyah',
        'Fiqih: Safinatun Najah, Sullamut Taufiq, Fathul Qorib',
        'Akhlak: Taisirul Khalaq, Akhlaq Lil Banin, Ta’limul Muta’allim',
        'Gramatika: Matan Al-Jurumiyyah, Al-Amtsilah At-Tashrifiyyah'
      ]
    },
    {
      title: 'Biah Lughawiyyah (Bahasa Arab & Inggris Aktif)',
      icon: Languages,
      badge: 'Lingkungan Berbahasa',
      color: 'emerald',
      description:
        'Penerapan lingkungan asrama dwibahasa yang dinamis untuk membiasakan santri cakap berkomunikasi secara lisan dan tulisan dalam percakapan sehari-hari dan forum resmi.',
      highlights: [
        'Muhadatsah yaumiyyah (percakapan tematik harian)',
        'Muhadhoroh 3 Bahasa (latihan pidato Arab, Inggris, Indonesia)',
        'Mufrodat yaumiyyah (pengayaan kosakata setiap hari)',
        'Latihan insya’ (menulis artikel & essai bahasa Arab)'
      ]
    },
    {
      title: 'Pembinaan Akhlak, Adab & Karakter 24 Jam',
      icon: Award,
      badge: 'Tarbiyah & Adab',
      color: 'rose',
      description:
        'Penanaman nilai-nilai adab santri, kemandirian hidup berasrama, kedisiplinan ibadah, kepemimpinan organisasi, serta kepekaan sosial kemasyarakatan.',
      highlights: [
        'Shalat lima waktu berjamaah di masjid & Qiyamul Lail',
        'Dzikir & wirid harian Al-Ma’tsurat / Ratibul Haddad',
        'Latihan kepemimpinan santri (OSIS, IPNU/IPPNU)',
        'Bimbingan konseling dan asuhan asatidz pembina asrama'
      ]
    }
  ];

  const curriculumPillars = items && items.length > 0
    ? items.map((it) => ({
        title: it.title,
        icon: (it.icon && ICON_MAP[it.icon]) || BookOpen,
        badge: it.badge || 'Pilar Kurikulum',
        color: it.color || 'blue',
        description: it.description,
        highlights: it.highlights || []
      }))
    : defaultPillars;

  const methodologyItems = [
    {
      title: 'Metode Sorogan',
      subtitle: 'Setoran Privat & Terarah',
      desc: 'Santri membaca dan memaknai kitab secara mandiri langsung di hadapan ustadz satu per satu untuk memastikan pemahaman harakat, terjemahan lafadz, dan maksud teks.'
    },
    {
      title: 'Metode Bandongan (Wetonan)',
      subtitle: 'Kajian Klasikal Kolektif',
      desc: 'Pengasuh atau masyaikh membacakan, menerjemahkan, dan mensyarah kitab secara mendalam, sementara para santri menyimak serta mencatat makna (ngesahi gandul).'
    },
    {
      title: 'Halaqah Bahtsul Masail',
      subtitle: 'Musyawarah Ilmiah Santri',
      desc: 'Forum diskusi santri tingkat lanjut untuk membedah dan mencari solusi atas persoalan fiqih dan isu keislaman kekinian berdasarkan rujukan dalil kitab-kitab salaf mu’tabar.'
    }
  ];

  return (
    <section id="kurikulum" className="py-14 sm:py-16 bg-[#F8FAFC] border-y border-[#DDE6F1] scroll-mt-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-12">
        <SectionHeader
          badge="Sistem Pembelajaran & Dirasah"
          title="KURIKULUM PESANTREN"
          subtitle="Perpaduan unggul antara kajian Turats (Kitab Kuning klasik bermazhab Syafi’i), Tahfidz Al-Qur’an bersanad mutqin, penguasaan Bahasa Arab aktif, serta integrasi pendidikan formal modern."
          centered
        />

        {/* 4 Core Curriculum Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {curriculumPillars.map((item, idx) => {
            const Icon = item.icon;

            return (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-[#DDE6F1] p-6 sm:p-8 shadow-xs hover-lift flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#EBF3FF] text-[#1A4FA0] border border-[#DDE6F1] uppercase tracking-wider">
                      <BookmarkCheck className="w-3.5 h-3.5" />
                      {item.badge}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-[#0B2F6B] text-white flex items-center justify-center shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-[#0B2F6B] leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#5C6B7D] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Highlights List */}
                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <span className="text-[11px] font-bold text-[#7B8CA1] uppercase tracking-wider block">
                    Capaian & Materi Pokok:
                  </span>
                  {item.highlights.map((hl, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2.5 text-xs text-[#28384A] font-medium leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#1A4FA0] shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Metodologi Belajar Khas Pesantren */}
        <div className="bg-white rounded-3xl border border-[#DDE6F1] p-6 sm:p-10 shadow-xs space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-[#FDE8E9] text-[#D8232A] uppercase tracking-wider">
              <GraduationCap className="w-3.5 h-3.5" />
              Metodologi Pembelajaran Salaf
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-[#0B2F6B]">
              Metode Belajar Otentik Khas Pesantren
            </h3>
            <p className="text-xs sm:text-sm text-[#5C6B7D]">
              Menjaga tradisi transmisi keilmuan Islam yang bersanad melalui perjumpaan langsung antara guru dan murid.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
            {methodologyItems.map((met, mIdx) => (
              <div
                key={mIdx}
                className="bg-[#F8FAFC] rounded-2xl p-5 border border-[#E6EDF6] space-y-2.5"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#0B2F6B] text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {mIdx + 1}
                  </span>
                  <h4 className="text-sm font-bold text-[#0B2F6B]">{met.title}</h4>
                </div>
                <span className="text-[11px] font-bold text-[#D8232A] uppercase tracking-wider block">
                  {met.subtitle}
                </span>
                <p className="text-xs text-[#5C6B7D] leading-relaxed">
                  {met.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
