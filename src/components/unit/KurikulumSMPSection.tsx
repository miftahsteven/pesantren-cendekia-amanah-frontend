import React from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import {
  BookOpen,
  Award,
  Laptop,
  Languages,
  CheckCircle2,
  Sparkles,
  Cpu,
  Layers,
  GraduationCap
} from 'lucide-react';

import { CurriculumItem } from '@/types';

const ICON_MAP: Record<string, any> = {
  BookOpen,
  Award,
  Laptop,
  Languages,
  CheckCircle2,
  Sparkles,
  Cpu,
  Layers,
  GraduationCap
};

interface KurikulumSMPSectionProps {
  items?: CurriculumItem[];
}

export default function KurikulumSMPSection({ items }: KurikulumSMPSectionProps) {
  const defaultPillars = [
    {
      title: 'Kurikulum Nasional Merdeka Terpadu',
      icon: BookOpen,
      badge: 'Standar Nasional & Karakter',
      color: 'blue',
      description:
        'Penerapan Kurikulum Merdeka yang disinergikan secara harmonis dengan nilai-nilai adab Islami, penguatan literasi-numerasi berstandar ANBK, dan pembelajaran berbasis projek (P5).',
      highlights: [
        'Projek Penguatan Profil Pelajar Pancasila (P5) tematik',
        'Differentiated learning sesuai gaya belajar & potensi siswa',
        'Praktikum terpadu sains, matematika, dan teknologi',
        'Asesmen formatif & diagnostik berkala untuk pemetaan prestasi'
      ]
    },
    {
      title: 'Tahfidz Al-Qur’an & Nilai Diniyah',
      icon: Award,
      badge: 'Tartil & Sanad Keilmuan',
      color: 'amber',
      description:
        'Program bimbingan tahfidz terstruktur dengan target mutqin Juz 28, 29, dan 30 (plus juz pilihan) yang diampu oleh musyrif tahfidz bersanad, dipadukan materi Fiqih dan Aqidah praktis.',
      highlights: [
        'Metode Talaqqi, Tasmi’, dan Ziyadah harian terarah',
        'Khataman tasmi’ berkala sekali duduk di hadapan wali santri',
        'Bimbingan tajwid standar Jazariyah & makharijul huruf',
        'Pembiasaan shalat berjamaah, dhuha, dan dzikir Ma’tsurat'
      ]
    },
    {
      title: 'Digital Smart Classroom & AI Literacy',
      icon: Laptop,
      badge: 'Teknologi & Inovasi 4.0',
      color: 'emerald',
      description:
        'Pemanfaatan interactive board, platform pembelajaran cerdas, dan pengenalan literasi komputasional sejak dini agar siswa cakap teknologi dan bijak berinternet.',
      highlights: [
        'Ruang kelas modern dengan Interactive Display Screen',
        'Pengenalan dasar Coding, Robotika, dan logika komputasi',
        'Ujian terstandar Computer-Based Testing (CBT)',
        'Edukasi etika digital & pemanfaatan Artificial Intelligence (AI)'
      ]
    },
    {
      title: 'Bilingual Classroom (Arab & Inggris)',
      icon: Languages,
      badge: 'Komunikasi Global',
      color: 'rose',
      description:
        'Pembiasaan bahasa internasional melalui Morning Vocabulary, English & Arabic Club, serta percakapan harian untuk melatih kepercayaan diri siswa di forum global.',
      highlights: [
        'Morning Talk & Daily Vocabulary Enrichment',
        'English & Arabic Public Speaking (Muhadhoroh)',
        'Pelatihan speech contest, storytelling, dan debat ilmiah',
        'Program pendampingan native speaker & foreign cultural exchange'
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

  const learningMethods = [
    {
      title: 'Experiential & Lab-Based Learning',
      subtitle: 'Praktikum & Eksplorasi Nyata',
      desc: 'Siswa diajak membuktikan teori sains di laboratorium IPA dan media digital, mengasah nalar analitis melalui riset mini dan observasi lapangan secara kolaboratif.'
    },
    {
      title: 'Personalized Academic & Character Mentoring',
      subtitle: 'Pendampingan Holistik',
      desc: 'Setiap siswa dibimbing wali kelas dan guru pembina asrama untuk memastikan keseimbangan antara pencapaian nilai akademik, adab pergaulan, dan kesehatan mental remaja.'
    },
    {
      title: 'Collaborative Parent Synergy',
      subtitle: 'Sinergi Sekolah & Keluarga',
      desc: 'Pelaporan perkembangan belajar dan hafalan Al-Qur’an secara transparan, diperkuat sesi konsultasi parenting berkala agar pendidikan di sekolah selaras dengan pengasuhan di rumah.'
    }
  ];

  return (
    <section id="kurikulum" className="py-14 sm:py-16 bg-[#F8FAFC] border-y border-[#DDE6F1] scroll-mt-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-12">
        <SectionHeader
          badge="Sistem Pembelajaran & Kurikulum"
          title="KURIKULUM SMP CENDEKIA AMANAH"
          subtitle="Perpaduan seimbang antara Kurikulum Nasional Kemendikbudristek (Kurikulum Merdeka), kedalaman nilai Islam & Tahfidz Al-Qur'an, literasi digital masa depan, dan wawasan komunikasi internasional."
          centered
        />

        {/* 4 Curriculum Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {curriculumPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const badgeBg =
              pillar.color === 'blue'
                ? 'bg-[#EBF3FF] text-[#1F5FD0] border-[#1F5FD0]/20'
                : pillar.color === 'amber'
                ? 'bg-[#FEF6E0] text-[#B88700] border-[#B88700]/20'
                : pillar.color === 'emerald'
                ? 'bg-[#E6F8F0] text-[#00875A] border-[#00875A]/20'
                : pillar.color === 'indigo'
                ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                : pillar.color === 'purple'
                ? 'bg-purple-50 text-purple-700 border-purple-200'
                : 'bg-[#FDE8E9] text-[#D8232A] border-[#D8232A]/20';

            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DDE6F1] shadow-xs hover-lift flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${badgeBg}`}>
                      {pillar.badge}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-[#F8FAFC] border border-[#DDE6F1] flex items-center justify-center text-[#0B2F6B]">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-[#0B2F6B] leading-snug">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#5C6B7D] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                {/* Highlights List */}
                <div className="pt-4 border-t border-[#DDE6F1]/80 space-y-2.5">
                  <h4 className="text-[11px] font-bold text-[#7B8CA1] uppercase tracking-wider">
                    Capaian & Keunggulan Program:
                  </h4>
                  <div className="space-y-2">
                    {pillar.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-[#28384A]">
                        <CheckCircle2 className="w-4 h-4 text-[#D8232A] shrink-0 mt-0.5" />
                        <span className="font-medium leading-relaxed">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Metode & Pendekatan Pembelajaran */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#DDE6F1] shadow-xs space-y-8">
          <div className="max-w-2xl mx-auto text-center space-y-2">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#EBF3FF] text-[#1F5FD0] uppercase tracking-wider">
              Pendekatan Edukasi
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-[#0B2F6B] tracking-tight">
              METODE PEMBELAJARAN INOVATIF & ADAPTIF
            </h3>
            <p className="text-xs sm:text-sm text-[#5C6B7D]">
              Strategi belajar yang menempatkan siswa sebagai subjek aktif dalam menggali pengetahuan, berkolaborasi, dan memecahkan persoalan nyata.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {learningMethods.map((m, i) => (
              <div
                key={i}
                className="p-5 sm:p-6 rounded-2xl bg-[#F8FAFC] border border-[#DDE6F1] space-y-3 hover:border-[#1F5FD0]/40 transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-[#0B2F6B] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  0{i + 1}
                </div>
                <h4 className="text-base font-bold text-[#0B2F6B]">{m.title}</h4>
                <p className="text-[11px] font-semibold text-[#D8232A] uppercase tracking-wider">{m.subtitle}</p>
                <p className="text-xs text-[#5C6B7D] leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
