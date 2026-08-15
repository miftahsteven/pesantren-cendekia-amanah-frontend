import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { contentRepo } from '@/repositories/content.repository';
import { Quote, ArrowRight, CheckCircle2 } from 'lucide-react';
import { getUploadUrl } from '@/lib/uploads';

export default async function SambutanPengasuh() {
  const siteConfig = await contentRepo.getSiteConfig();
  const { leader } = siteConfig;

  return (
    <section id="sambutan" className="py-14 sm:py-16 bg-white border-y border-[#DDE6F1]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Leader Photo with Decorative Card (5 cols on lg) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm">
              {/* Background gradient decorative card */}
              <div className="absolute inset-0 bg-linear-to-tr from-[#0B2F6B] to-[#17804A] rounded-3xl transform -rotate-2 scale-98 opacity-90 shadow-xl" />

              {/* Main Photo Card */}
              <div className="relative bg-white rounded-3xl p-3 sm:p-4 border border-[#DDE6F1] shadow-xl overflow-hidden">
                <div className="relative h-96 w-full rounded-2xl overflow-hidden bg-gray-100">
                  <Image
                    src={getUploadUrl(leader.photoUrl)}
                    alt={leader.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#0B2F6B]/80 via-transparent to-transparent" />

                  {/* Floating Name Badge */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-3 border border-white/40 shadow-md">
                    <p className="text-xs font-black text-[#0B2F6B] tracking-tight">{leader.name}</p>
                    <p className="text-[11px] text-[#17804A] font-bold">{leader.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sambutan Content (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#EAF7EF] text-[#17804A] border border-[#8ED6A8]/40 uppercase tracking-wider">
                Sambutan Pengasuh
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B2F6B] tracking-tight leading-tight">
                Membangun Peradaban Mulia Melalui Pendidikan Berkah
              </h2>
            </div>

            {/* Quote Box */}
            <div className="relative pl-6 border-l-4 border-[#17804A] space-y-3">
              <Quote className="w-8 h-8 text-[#8ED6A8] absolute -top-4 -left-3 opacity-60 pointer-events-none" />
              {leader.quote.map((p, idx) => (
                <p key={idx} className="text-sm sm:text-base text-[#5C6B7D] leading-relaxed italic">
                  &ldquo;{p}&rdquo;
                </p>
              ))}
            </div>

            {/* Bullets Highlight */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs text-[#28384A] font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#17804A] shrink-0" />
                <span>Sanad Keilmuan Bersambung</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#28384A] font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#17804A] shrink-0" />
                <span>Karakter & Akhlakul Karimah</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#28384A] font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#17804A] shrink-0" />
                <span>Penguasaan Bahasa Internasional</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#28384A] font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#17804A] shrink-0" />
                <span>Prestasi Akademik Unggulan</span>
              </div>
            </div>

            {/* CTA Actions */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/tentang-kami#sambutan"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-xs sm:text-sm text-white bg-[#0B2F6B] hover:bg-[#1A4FA0] shadow-md hover:shadow-lg transition-all"
              >
                <span>Baca Profil Pengasuh Selengkapnya</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
