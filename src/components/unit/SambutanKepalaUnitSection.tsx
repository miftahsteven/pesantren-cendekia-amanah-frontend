import React from 'react';
import Image from 'next/image';
import { EducationUnit } from '@/types';
import { getUploadUrl } from '@/lib/uploads';
import { Quote, Award, Sparkles, CheckCircle2 } from 'lucide-react';

interface SambutanKepalaUnitSectionProps {
  unit: EducationUnit;
}

export default function SambutanKepalaUnitSection({ unit }: SambutanKepalaUnitSectionProps) {
  const name = unit.welcomeName || 'Ust. Sodik, SQ., S.Ud., ME., Gr';
  const role = unit.welcomeRole || `Kepala Sekolah ${unit.name}`;
  const photo = unit.welcomePhoto || '/uploads/gallery/kartu-unit-pendidikan-ustadz-sodik-smp-pesantren-cendekia-amanah-1790831920585.jpg';
  const quote =
    unit.welcomeQuote ||
    'Membimbing Generasi Remaja Berkarakter Qurani, Berprestasi Akademik, dan Berwawasan Global di Era Digital.';
  const message =
    unit.welcomeMessage ||
    `Assalamu’alaikum Warahmatullahi Wabarakatuh.

Selamat datang di Sekolah Menengah Pertama (SMP) Cendekia Amanah. Kami berkomitmen untuk menghadirkan ekosistem pendidikan yang memadukan keunggulan akademik Kurikulum Nasional Merdeka dengan kedalaman nilai-nilai Islam, Al-Qur'an, dan pembentukan adab santri.

Di SMP Cendekia Amanah, setiap siswa didampingi untuk menemukan potensi terbaiknya melalui pembelajaran interaktif berbasis digital smart classroom, pembiasaan hafalan Al-Qur'an bersanad, pembinaan karakter kemandirian santri, serta penguasaan bahasa internasional (Arab & Inggris). Kami percaya bahwa masa transisi remaja adalah fase emas untuk menanamkan pondasi aqidah yang kokoh sekaligus mengasah nalar kritis dan daya cipta inovatif.

Bersama para pendidik yang berdedikasi dan fasilitas pendukung yang memadai, kami siap membersamai putra-putri Anda menjadi pribadi yang bertaqwa, cerdas, berprestasi, dan siap memimpin masa depan peradaban Islam.

Wassalamu’alaikum Warahmatullahi Wabarakatuh.`;

  const paragraphs = message.split('\n\n').filter(Boolean);

  return (
    <div className="mt-10 bg-linear-to-br from-white via-[#F8FAFC] to-[#F1F5F9] rounded-3xl p-6 sm:p-10 border border-[#DDE6F1] shadow-md relative overflow-hidden">
      {/* Decorative Brand Accent Background */}
      <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[#1A4FA0]/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-[#D8232A]/5 blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Left Column: Leader Photo Card */}
        <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4">
          <div className="relative w-52 sm:w-60 h-64 sm:h-72 rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-[#0B2F6B]">
            <Image
              src={getUploadUrl(photo)}
              alt={name}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 240px, 280px"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-3 inset-x-3 text-white">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-extrabold bg-[#D8232A] text-white uppercase tracking-wider shadow-xs">
                Kepala Sekolah
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <h4 className="text-base sm:text-lg font-black text-[#0B2F6B] leading-snug">
              {name}
            </h4>
            <p className="text-xs font-semibold text-[#D8232A]">{role}</p>
          </div>
        </div>

        {/* Right Column: Sambutan Content */}
        <div className="lg:col-span-8 space-y-5">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-[#EBF3FF] text-[#1F5FD0] border border-[#1F5FD0]/20">
              <Sparkles className="w-3.5 h-3.5 text-[#D8232A]" />
              <span>Sambutan Kepala Unit SMP</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-[#0B2F6B] tracking-tight">
              Membangun Fondasi Karakter & Nalar Unggul Remaja
            </h3>
          </div>

          {/* Highlight Quote Box */}
          <div className="relative p-4 sm:p-5 rounded-2xl bg-white border-l-4 border-[#D8232A] shadow-xs space-y-2">
            <Quote className="w-6 h-6 text-[#D8232A]/30 absolute top-3 right-3" />
            <p className="text-xs sm:text-sm font-semibold italic text-[#0B2F6B] leading-relaxed">
              &ldquo;{quote}&rdquo;
            </p>
          </div>

          {/* Multi-paragraph Message */}
          <div className="space-y-3 text-xs sm:text-sm text-[#475569] leading-relaxed">
            {paragraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {/* Signature / Badge Footer */}
          <div className="pt-3 border-t border-[#DDE6F1] flex items-center justify-between text-xs text-[#64748B]">
            <span className="flex items-center gap-1.5 font-bold text-[#0B2F6B]">
              <Award className="w-4 h-4 text-[#D8232A]" />
              SMP Cendekia Amanah
            </span>
            <span className="text-[11px] font-medium text-gray-500">Tahun Ajaran 2026/2027</span>
          </div>
        </div>
      </div>
    </div>
  );
}
