import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';
import { apiGet } from '@/lib/api-client';
import { getUploadUrl } from '@/lib/uploads';

const defaultBanner = {
  badge: 'Kuota Terbatas — Gelombang II',
  title: 'PENERIMAAN PESERTA DIDIK BARU',
  academicYear: 'Tahun Ajaran 2027/2028 (Pesantren, SMP, SMA, Diniyah)',
  description:
    'Bergabunglah bersama keluarga besar Pesantren Cendekia Amanah. Dapatkan bimbingan tahfidz bersanad, kurikulum terpadu nasional, serta pembinaan kepemimpinan islami sejak dini.',
  features: [
    'Sistem Pendaftaran Online 3 Langkah',
    'Tersedia Beasiswa Tahfidz & Prestasi',
    'Pilihan Program Boarding / Fullday',
    'Konfirmasi Cepat via WhatsApp 24 Jam'
  ],
  primaryCtaText: 'DAFTAR SEKARANG',
  primaryCtaUrl: '/ppdb',
  secondaryCtaText: 'Alur & Panduan Pendaftaran',
  secondaryCtaUrl: '/kontak',
  imageUrl: '/images/galery/sma8.png',
  captionTitle: 'Cendekia Amanah',
  captionSubtitle: 'Generasi Qurani & Berprestasi'
};

export default async function PPDBBannerCTA() {
  let banner = defaultBanner;

  try {
    const res = await apiGet<any>('/site/ppdb-banner');
    if (res && res.title) {
      banner = {
        badge: res.badge || defaultBanner.badge,
        title: res.title || defaultBanner.title,
        academicYear: res.academicYear || defaultBanner.academicYear,
        description: res.description || defaultBanner.description,
        features: Array.isArray(res.features) && res.features.length > 0 ? res.features : defaultBanner.features,
        primaryCtaText: res.primaryCtaText || defaultBanner.primaryCtaText,
        primaryCtaUrl: res.primaryCtaUrl || defaultBanner.primaryCtaUrl,
        secondaryCtaText: res.secondaryCtaText || defaultBanner.secondaryCtaText,
        secondaryCtaUrl: res.secondaryCtaUrl || defaultBanner.secondaryCtaUrl,
        imageUrl: res.imageUrl || defaultBanner.imageUrl,
        captionTitle: res.captionTitle || defaultBanner.captionTitle,
        captionSubtitle: res.captionSubtitle || defaultBanner.captionSubtitle
      };
    }
  } catch {
    // Keep default
  }

  return (
    <section className="py-14 sm:py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-r from-[#0B2F6B] via-[#1A4FA0] to-[#0B2F6B] border border-[#12377E] text-white p-8 sm:p-12 lg:p-14">
          {/* Subtle Background Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D8232A]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F0BD28]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content (8 cols on lg) */}
            <div className="lg:col-span-8 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D8232A] text-white text-xs font-black tracking-wider uppercase shadow-md animate-pulse">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{banner.badge}</span>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                  {banner.title}
                </h2>
                <p className="text-lg sm:text-xl font-bold text-[#F0BD28]">
                  {banner.academicYear}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-white/85 max-w-2xl leading-relaxed">
                {banner.description}
              </p>

              {/* Benefits checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 max-w-xl mx-auto lg:mx-0">
                {banner.features.map((feat: string, i: number) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-semibold text-white/95">
                    <CheckCircle2 className="w-4 h-4 text-[#FCA5A5] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <Link
                  href={banner.primaryCtaUrl}
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-black text-sm sm:text-base text-[#0B2F6B] bg-[#F0BD28] hover:bg-[#e0ad19] shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 active:translate-y-0"
                >
                  <span>{banner.primaryCtaText}</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  href={banner.secondaryCtaUrl}
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-full font-bold text-sm text-white bg-white/15 hover:bg-white/25 border border-white/30 backdrop-blur-xs transition-all"
                >
                  <ShieldCheck className="w-4 h-4 text-[#FCA5A5]" />
                  <span>{banner.secondaryCtaText}</span>
                </Link>
              </div>
            </div>

            {/* Right Illustration/Photo (4 cols on lg) */}
            <div className="lg:col-span-4 hidden lg:flex justify-center">
              <div className="relative w-72 h-80 rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl bg-white/10">
                <Image
                  src={getUploadUrl(banner.imageUrl)}
                  alt="Santri Cendekia Amanah"
                  fill
                  className="object-cover object-top"
                  sizes="300px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B2F6B]/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-center p-3 rounded-2xl bg-white/90 backdrop-blur-md text-[#0B2F6B] shadow-md">
                  <span className="text-xs font-black block">{banner.captionTitle}</span>
                  <span className="text-[10px] text-[#D8232A] font-bold">{banner.captionSubtitle}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
