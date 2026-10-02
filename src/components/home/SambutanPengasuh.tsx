import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { contentRepo } from '@/repositories/content.repository';
import { Quote, ArrowRight, CheckCircle2, ShieldCheck, Award, Building2 } from 'lucide-react';
import { getUploadUrl } from '@/lib/uploads';

export default async function SambutanPengasuh() {
  const siteConfig = await contentRepo.getSiteConfig();
  const { leader, foundationLeaders = [] } = siteConfig;

  // Default foundation leaders if not provided
  const ketuaYayasan = foundationLeaders[0] || {
    name: 'Dr. H. Agus Suprayogi, ST., M.Si',
    role: 'Ketua Yayasan',
    title: 'Ketua Yayasan Lembaga Pendidikan Terpadu Cendekia Amanah',
    photoUrl: '/uploads/guru/dr-agus-suprayogi.jpg'
  };

  const penjaminMutu = foundationLeaders[1] || {
    name: 'K.H. Zaiyadi, M.Pd',
    role: 'Penjamin Mutu Pendidikan',
    title: 'Penjamin Mutu Pendidikan & Kurikulum Cendekia Amanah',
    photoUrl: '/uploads/guru/kh-zaiyadi.jpg'
  };

  return (
    <section id="sambutan" className="py-14 sm:py-16 bg-white border-y border-[#DDE6F1]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Main Row: KH. Cholil Nafis (Pengasuh) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Leader Photo with Decorative Card (5 cols on lg) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm">
              {/* Background gradient decorative card */}
              <div className="absolute inset-0 bg-linear-to-tr from-[#0B2F6B] to-[#D8232A] rounded-3xl transform -rotate-2 scale-98 opacity-90 shadow-xl" />

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
                    <p className="text-[11px] text-[#D8232A] font-bold">{leader.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sambutan Content (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#FDE8E9] text-[#D8232A] border border-[#FCA5A5]/40 uppercase tracking-wider">
                Sambutan Pengasuh
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B2F6B] tracking-tight leading-tight">
                Membangun Peradaban Mulia Melalui Pendidikan Berkah
              </h2>
            </div>

            {/* Quote Box */}
            <div className="relative pl-6 border-l-4 border-[#D8232A] space-y-3">
              <Quote className="w-8 h-8 text-[#FCA5A5] absolute -top-4 -left-3 opacity-60 pointer-events-none" />
              {leader.quote.map((p, idx) => (
                <p key={idx} className="text-sm sm:text-base text-[#5C6B7D] leading-relaxed italic">
                  &ldquo;{p}&rdquo;
                </p>
              ))}
            </div>

            {/* Bullets Highlight */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs text-[#28384A] font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#D8232A] shrink-0" />
                <span>Sanad Keilmuan Bersambung</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#28384A] font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#D8232A] shrink-0" />
                <span>Karakter & Akhlakul Karimah</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#28384A] font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#D8232A] shrink-0" />
                <span>Penguasaan Bahasa Internasional</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#28384A] font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#D8232A] shrink-0" />
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

        {/* 2 Kotak Pejabat Utama Yayasan Pendamping Pengasuh */}
        <div className="mt-12 sm:mt-14 pt-10 border-t border-[#DDE6F1]">
          {/* Header Sub-section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-6">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#D8232A]" />
              <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#0B2F6B]">
                Pejabat Utama Yayasan Pendamping Pengasuh
              </h3>
            </div>
            <p className="text-[11px] sm:text-xs text-[#64748B]">
              Sinergi kepemimpinan amanah dalam tata kelola institusi dan mutu pendidikan pesantren
            </p>
          </div>

          {/* 2 Sleek Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {/* Kotak 1: Dr. H. Agus Suprayogi, ST., M.Si - Ketua Yayasan */}
            <div className="relative group bg-linear-to-br from-white via-[#FAFBFD] to-[#F1F5F9] rounded-2xl p-4 sm:p-5 border border-[#DDE6F1] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              {/* Decorative accent top bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#D8232A] via-[#F59E0B] to-transparent opacity-80" />

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5">
                {/* Photo container */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-2xl overflow-hidden border-2 border-white shadow-md bg-gray-100 ring-1 ring-[#DDE6F1]">
                  <Image
                    src={getUploadUrl(ketuaYayasan.photoUrl)}
                    alt={ketuaYayasan.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100px, 120px"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 text-center sm:text-left">
                  {/* Position Badge */}
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-[#FDE8E9] text-[#D8232A] border border-[#FCA5A5]/50">
                      <ShieldCheck className="w-3 h-3 text-[#D8232A]" />
                      <span>{ketuaYayasan.role}</span>
                    </span>
                    <span className="text-[11px] font-bold text-[#64748B]">
                      Sebagai : <strong className="text-[#D8232A]">{ketuaYayasan.role}</strong>
                    </span>
                  </div>

                  {/* Name */}
                  <h4 className="text-base sm:text-lg font-black text-[#0B2F6B] tracking-tight mt-1.5 leading-snug group-hover:text-[#1F5FD0] transition-colors">
                    {ketuaYayasan.name}
                  </h4>

                  {/* Title / Description */}
                  <p className="text-xs text-[#5C6B7D] leading-relaxed mt-1 line-clamp-2">
                    {ketuaYayasan.title}
                  </p>

                  {/* Footer micro-tag */}
                  <div className="mt-3 pt-2.5 border-t border-[#E2E8F0]/70 flex items-center justify-center sm:justify-start gap-2 text-[11px] text-[#64748B]">
                    <Building2 className="w-3.5 h-3.5 text-[#D8232A] shrink-0" />
                    <span>Arah Strategis & Legalitas Yayasan</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Kotak 2: K.H. Zaiyadi, M.Pd - Penjamin Mutu Pendidikan */}
            <div className="relative group bg-linear-to-br from-white via-[#FAFBFD] to-[#F1F5F9] rounded-2xl p-4 sm:p-5 border border-[#DDE6F1] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              {/* Decorative accent top bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#0B2F6B] via-[#1F5FD0] to-transparent opacity-80" />

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5">
                {/* Photo container */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-2xl overflow-hidden border-2 border-white shadow-md bg-gray-100 ring-1 ring-[#DDE6F1]">
                  <Image
                    src={getUploadUrl(penjaminMutu.photoUrl)}
                    alt={penjaminMutu.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100px, 120px"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 text-center sm:text-left">
                  {/* Position Badge */}
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-[#EBF3FC] text-[#0B2F6B] border border-[#BFDBFE]">
                      <Award className="w-3 h-3 text-[#0B2F6B]" />
                      <span>{penjaminMutu.role}</span>
                    </span>
                    <span className="text-[11px] font-bold text-[#64748B]">
                      Sebagai : <strong className="text-[#0B2F6B]">{penjaminMutu.role}</strong>
                    </span>
                  </div>

                  {/* Name */}
                  <h4 className="text-base sm:text-lg font-black text-[#0B2F6B] tracking-tight mt-1.5 leading-snug group-hover:text-[#1F5FD0] transition-colors">
                    {penjaminMutu.name}
                  </h4>

                  {/* Title / Description */}
                  <p className="text-xs text-[#5C6B7D] leading-relaxed mt-1 line-clamp-2">
                    {penjaminMutu.title}
                  </p>

                  {/* Footer micro-tag */}
                  <div className="mt-3 pt-2.5 border-t border-[#E2E8F0]/70 flex items-center justify-center sm:justify-start gap-2 text-[11px] text-[#64748B]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0B2F6B] shrink-0" />
                    <span>Standarisasi Kurikulum & Mutu Pendidikan</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
