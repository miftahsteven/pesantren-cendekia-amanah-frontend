import React from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import {
  BookOpen,
  Scroll,
  HeartHandshake,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Languages,
  UserCheck
} from 'lucide-react';

import { CurriculumItem } from '@/types';

const ICON_MAP: Record<string, any> = {
  BookOpen,
  Scroll,
  HeartHandshake,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Languages,
  UserCheck
};

interface KurikulumMDTASectionProps {
  items?: CurriculumItem[];
}

export default function KurikulumMDTASection({ items }: KurikulumMDTASectionProps) {
  const defaultPillars = [
    {
      title: 'Baca Tulis Al-Qur\'an (BTQ) & Tahsin',
      icon: BookOpen,
      badge: 'Tartil & Tajwid',
      color: 'blue',
      description:
        'Bimbingan membaca Al-Qur\'an dengan kaidah tajwid yang benar menggunakan metode Iqro\' bertahap, disertai latihan menulis huruf hijaiyah dan pengenalan makhraj serta sifatul huruf.',
      highlights: [
        'Metode Iqro\' bertahap dari jilid 1 sampai Al-Qur\'an',
        'Pengenalan hukum tajwid dasar: idzhar, ikhfa\', idgham, iqlab',
        'Hafalan Juz \'Amma (Juz 30) dan surat-surat pilihan',
        'Latihan menulis huruf hijaiyah dan kaligrafi dasar'
      ]
    },
    {
      title: 'Aqidah Ahlussunnah wal Jama\'ah',
      icon: HeartHandshake,
      badge: 'Fondasi Keimanan',
      color: 'amber',
      description:
        'Penanaman dasar-dasar keimanan (Rukun Iman & Rukun Islam) dengan pendekatan yang mudah dipahami anak-anak, berdasarkan tuntunan Ahlussunnah wal Jama\'ah dan dalil-dalil shahih.',
      highlights: [
        'Pemahaman Rukun Iman enam perkara secara mendalam',
        'Pendalaman makna dua kalimat syahadat',
        'Kisah para Nabi & Rasul sebagai teladan keimanan',
        'Kitab rujukan: Aqidatul Awwam & Tijanud Darori'
      ]
    },
    {
      title: 'Fiqih Ibadah Praktis & Doa Harian',
      icon: ShieldCheck,
      badge: 'Ibadah & Amaliyah',
      color: 'emerald',
      description:
        'Pembelajaran tata cara ibadah yang benar sesuai mazhab Syafi\'i, mulai dari bersuci (thaharah), wudhu, shalat fardhu & sunnah, hingga puasa dan hafalan doa sehari-hari.',
      highlights: [
        'Praktik langsung wudhu, tayammum, dan mandi wajib',
        'Tata cara shalat fardhu, sunnah rawatib, dan shalat jenazah',
        'Hafalan bacaan shalat lengkap dengan artinya',
        'Kitab rujukan: Safinatun Najah & Sullamut Taufiq'
      ]
    },
    {
      title: 'Akhlak Mulia & Adab Islami',
      icon: Scroll,
      badge: 'Tarbiyah & Adab',
      color: 'rose',
      description:
        'Penanaman budi pekerti luhur, sopan santun kepada orang tua, guru, dan sesama, serta penghayatan nilai-nilai akhlak terpuji melalui keteladanan dan pembiasaan sehari-hari.',
      highlights: [
        'Adab kepada kedua orang tua, guru, dan teman sebaya',
        'Pembiasaan 5S: Senyum, Salam, Sapa, Sopan, Santun',
        'Kisah para Sahabat Nabi sebagai inspirasi akhlak',
        'Kitab rujukan: Taisirul Khalaq & Akhlaq Lil Banin'
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
      title: 'Metode Halaqah Sorogan',
      subtitle: 'Bimbingan Privat Satu per Satu',
      desc: 'Santri membaca Iqro\' atau Al-Qur\'an secara langsung di hadapan ustadz/ustadzah satu per satu untuk memastikan ketepatan makharijul huruf, tajwid, dan kelancaran bacaan.'
    },
    {
      title: 'Praktik Ibadah Langsung',
      subtitle: 'Learning by Doing',
      desc: 'Anak-anak berlatih wudhu, shalat berjamaah, adzan, dan iqamah secara langsung, sehingga pemahaman fiqih tidak hanya teori tetapi juga terbiasa dalam amaliah harian.'
    },
    {
      title: 'Kisah Teladan & Nasihat Hikmah',
      subtitle: 'Inspirasi dari Tarikh Islam',
      desc: 'Penyampaian materi aqidah dan akhlak melalui kisah perjalanan para Nabi, Sahabat, dan ulama shalih, agar anak-anak dapat meneladani nilai-nilai kebaikan dengan cara yang menarik.'
    }
  ];

  return (
    <section id="kurikulum" className="py-14 sm:py-16 bg-[#F8FAFC] border-y border-[#DDE6F1] scroll-mt-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-12">
        <SectionHeader
          badge="Sistem Pembelajaran & Kurikulum"
          title="KURIKULUM MDTA CENDEKIA AMANAH"
          subtitle="Kurikulum pendidikan agama Islam non-formal yang komprehensif, mencakup penguasaan Baca Tulis Al-Qur'an (BTQ), fondasi aqidah yang kokoh, fiqih ibadah praktis, dan pembentukan akhlak mulia sejak usia dini."
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
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#E6F8F0] text-[#00875A] uppercase tracking-wider">
              Pendekatan Edukasi
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-[#0B2F6B] tracking-tight">
              METODE PEMBELAJARAN DINIYAH TRADISIONAL & ADAPTIF
            </h3>
            <p className="text-xs sm:text-sm text-[#5C6B7D]">
              Pendekatan khas pesantren salafiyah yang terbukti efektif dalam membentuk karakter santri berakhlak mulia, cakap membaca kitab, dan gemar beribadah.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {learningMethods.map((m, i) => (
              <div
                key={i}
                className="p-5 sm:p-6 rounded-2xl bg-[#F8FAFC] border border-[#DDE6F1] space-y-3 hover:border-[#00875A]/40 transition-colors"
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
