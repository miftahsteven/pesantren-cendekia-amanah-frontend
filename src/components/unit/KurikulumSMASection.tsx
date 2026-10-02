import React from 'react';
import Link from 'next/link';
import SectionHeader from '@/components/common/SectionHeader';
import {
  BookOpen,
  GraduationCap,
  Microscope,
  Award,
  CheckCircle2,
  Sparkles,
  Compass,
  FileText,
  Target,
  ArrowRight
} from 'lucide-react';

import { CurriculumItem } from '@/types';

const ICON_MAP: Record<string, any> = {
  BookOpen,
  GraduationCap,
  Microscope,
  Award,
  CheckCircle2,
  Sparkles,
  Compass,
  FileText,
  Target
};

interface KurikulumSMASectionProps {
  items?: CurriculumItem[];
}

export default function KurikulumSMASection({ items }: KurikulumSMASectionProps) {
  const defaultPillars = [
    {
      title: 'Kurikulum Merdeka & Peminatan Lanjutan (Fase F)',
      icon: BookOpen,
      badge: 'Standar Nasional & Peminatan',
      color: 'blue',
      description:
        'Penerapan Kurikulum Merdeka Fase F yang fleksibel dan terarah, memfasilitasi pilihan mata pelajaran peminatan sesuai orientasi prodi perguruan tinggi (Kedokteran, Teknik, Sains Terapan, Humaniora, & Ekonomi Syariah).',
      highlights: [
        'Pemilihan rumpun mata pelajaran peminatan terarah sesuai minat studi',
        'Pembelajaran berpikir tingkat tinggi (Higher Order Thinking Skills / HOTS)',
        'Projek Penguatan Profil Pelajar Pancasila (P5) berbasis pengabdian',
        'Asesmen formatif & diagnostik berkala untuk optimalisasi nilai rapor SNBP'
      ]
    },
    {
      title: 'Program Akselerasi Sukses PTN & Beasiswa Global',
      icon: GraduationCap,
      badge: 'Tembus Kampus Impian',
      color: 'amber',
      description:
        'Program pendampingan komprehensif untuk mengantarkan santri menembus PTN Favorit (UI, ITB, UGM, Unair, ITS, IPB, dll) serta perguruan tinggi bergengsi luar negeri (Timur Tengah, Turki, Eropa, & Asia).',
      highlights: [
        'Bimbingan intensif UTBK-SNBT & pembedahan materi skolastik berkala',
        'Simulasi Try Out terstandar dengan analisis skor Item Response Theory (IRT)',
        'Bimbingan beasiswa Al-Azhar Kairo, Timur Tengah, dan beasiswa internasional',
        'Konsultasi pemetaan karir dan peluang passing grade jurusan PTN favorit'
      ]
    },
    {
      title: 'Karya Ilmiah Remaja (KIR) & Laboratorium Riset',
      icon: Microscope,
      badge: 'Kultur Riset & Sains',
      color: 'emerald',
      description:
        'Pengembangan nalar analitis dan daya cipta santri melalui riset ilmiah terpandu di laboratorium modern, penulisan artikel ilmiah, serta keikutsertaan dalam kompetisi sains nasional & internasional.',
      highlights: [
        'Bimbingan penyusunan Karya Tulis Ilmiah (KTI) syarat kelulusan',
        'Praktikum terpadu di Laboratorium Fisika, Kimia, Biologi, & Komputer',
        'Klinik pembinaan Olimpiade Sains Nasional (OSN) & Lomba Karya Ilmiah',
        'Pengembangan proyek digitalisasi, Internet of Things (IoT), dan kecerdasan buatan'
      ]
    },
    {
      title: 'Tahfidz Al-Qur’an Lanjutan & Kepemimpinan Santri',
      icon: Award,
      badge: 'Karakter & Spiritual Mutqin',
      color: 'rose',
      description:
        'Pemantapan hafalan Al-Qur’an mutqin hingga bersanad, pendalaman literatur Fiqih kontemporer dan Ushul Fiqih, serta latihan kepemimpinan manajerial berasrama.',
      highlights: [
        'Target hafalan Al-Qur’an mutqin bersanad bagi kelas takhasus',
        'Kajian Fiqih Muamalah, Ushul Fiqih, dan Hadits Tematik kepemimpinan',
        'Penguatan kemampuan diplomasi dan pidato 3 bahasa (Arab, Inggris, Indonesia)',
        'Organisasi santri mandiri untuk melatih kepemimpinan transformasional'
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

  const pathways = [
    {
      step: '01',
      title: 'Academic & Career Roadmapping',
      subtitle: 'Kelas X — Pemetaan Minat & Pondasi',
      desc: 'Pemetaan gaya belajar, asesmen bakat minat, penentuan arah peminatan rumpun ilmu, dan pemantapan pondasi akademik sains serta dasar-dasar riset.'
    },
    {
      step: '02',
      title: 'Scientific Research & Portfolio Building',
      subtitle: 'Kelas XI — Eksplorasi Riset & Prestasi',
      desc: 'Fokus pada penyusunan Karya Tulis Ilmiah (KTI), penguatan nilai rapor semester 1-4 untuk peluang SNBP, dan partisipasi intensif ajang olimpiade kejuaraan.'
    },
    {
      step: '03',
      title: 'Intensive Campus Drill & Scholarship Camp',
      subtitle: 'Kelas XII — Akselerasi PTN & Global',
      desc: 'Bimbingan kilat UTBK-SNBT, pemantapan passing grade, pendampingan seleksi berkas beasiswa luar negeri, dan simulasi wawancara kampus kedinasan/PTN.'
    }
  ];

  return (
    <section id="kurikulum" className="py-14 sm:py-16 bg-[#F8FAFC] border-y border-[#DDE6F1] scroll-mt-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-12">
        <SectionHeader
          badge="Sistem Pembelajaran & Kurikulum"
          title="KURIKULUM SMA CENDEKIA AMANAH"
          subtitle="Sinergi unggul antara Kurikulum Merdeka Kemendikbudristek Fase F, program bimbingan intensif tembus PTN & beasiswa luar negeri, kultur riset ilmiah remaja (KIR), dan pemantapan karakter Qurani."
          centered
        />

        {/* 4 Curriculum Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {curriculumPillars.slice(0, 4).map((pillar, idx) => {
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
                    Keunggulan & Capaian Lulusan:
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

        {/* Link Lihat Lainnya jika kurikulum lebih dari 4 */}
        {curriculumPillars.length > 4 && (
          <div className="flex justify-center pt-2">
            <Link
              href="/kurikulum?unit=sma"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white border border-[#1F5FD0]/30 text-[#1F5FD0] hover:bg-[#1F5FD0] hover:text-white font-bold text-xs sm:text-sm shadow-xs transition-all hover-lift"
            >
              <span>Lihat Kurikulum SMA Lainnya ({curriculumPillars.length - 4} pilar lagi)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* Peta Jalan Kelulusan & Karir (Roadmap) */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#DDE6F1] shadow-xs space-y-8">
          <div className="max-w-2xl mx-auto text-center space-y-2">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#EBF3FF] text-[#1F5FD0] uppercase tracking-wider">
              Peta Jalan Kelulusan
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-[#0B2F6B] tracking-tight">
              ROADMAP STRATEGIS MENUJU KAMPUS IMPIAN
            </h3>
            <p className="text-xs sm:text-sm text-[#5C6B7D]">
              Tahapan pendampingan akademik terstruktur selama 3 tahun masa pendidikan di SMA Cendekia Amanah.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pathways.map((m, i) => (
              <div
                key={i}
                className="p-5 sm:p-6 rounded-2xl bg-[#F8FAFC] border border-[#DDE6F1] space-y-3 hover:border-[#1F5FD0]/40 transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-[#0B2F6B] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  {m.step}
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
