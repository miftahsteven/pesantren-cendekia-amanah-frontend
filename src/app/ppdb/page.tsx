import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  GraduationCap, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  MessageCircleQuestion, 
  ShieldCheck, 
  Calendar
} from 'lucide-react';
import Breadcrumb from '@/components/common/Breadcrumb';
import GlobalCTA from '@/components/layout/GlobalCTA';
import { contentRepo } from '@/repositories/content.repository';
import { PpdbLink } from '@/types';

export const metadata: Metadata = {
  title: 'PPDB Online 2027/2028 — Pesantren Cendekia Amanah',
  description:
    'Penerimaan Peserta Didik Baru (PPDB) Online Pesantren Cendekia Amanah Tahun Ajaran 2027/2028 untuk unit Pesantren, SMP, SMA, dan Madrasah Diniyah.',
  openGraph: {
    title: 'PPDB Online 2027/2028 — Pesantren Cendekia Amanah',
    description:
      'Daftar online santri baru Cendekia Amanah. Pilih formulir pendaftaran resmi per unit.',
    images: ['/images/galery/sma8.png']
  }
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const unitGradients: Record<string, { bg: string; border: string; badge: string; iconBg: string }> = {
  sma: {
    bg: 'from-[#0B2F6B]/5 via-white to-blue-50/30',
    border: 'border-blue-100 hover:border-[#0B2F6B]/40',
    badge: 'bg-[#0B2F6B] text-white',
    iconBg: 'bg-[#0B2F6B] text-white'
  },
  smp: {
    bg: 'from-emerald-950/5 via-white to-emerald-50/30',
    border: 'border-emerald-100 hover:border-emerald-600/40',
    badge: 'bg-emerald-700 text-white',
    iconBg: 'bg-emerald-600 text-white'
  },
  mdta: {
    bg: 'from-amber-950/5 via-white to-amber-50/30',
    border: 'border-amber-100 hover:border-amber-600/40',
    badge: 'bg-amber-600 text-white',
    iconBg: 'bg-amber-500 text-white'
  },
  pesantren: {
    bg: 'from-indigo-950/5 via-white to-indigo-50/30',
    border: 'border-indigo-100 hover:border-indigo-600/40',
    badge: 'bg-indigo-700 text-white',
    iconBg: 'bg-indigo-600 text-white'
  }
};

export default async function PPDBPage() {
  let links: PpdbLink[] = [];
  try {
    links = await contentRepo.getPpdbLinks();
  } catch (err) {
    console.error('Failed to load PPDB links on page:', err);
  }

  // Filter only active
  const activeLinks = (links && links.length > 0)
    ? links.filter((l) => l.isActive)
    : [];

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Hero Section */}
      <section className="pt-4 sm:pt-6">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-4">
          <Breadcrumb items={[{ label: 'PPDB Online' }]} />

          {/* Hero Banner */}
          <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 text-white bg-linear-to-r from-[#0B2F6B] via-[#1A4FA0] to-[#0B2F6B] shadow-xl border border-[#12377E]">
            <div className="max-w-2xl space-y-3">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#D8232A] text-white uppercase tracking-wider shadow-xs">
                Tahun Ajaran 2027/2028
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                PENERIMAAN PESERTA DIDIK BARU
              </h1>
              <p className="text-sm sm:text-base text-white/85 leading-relaxed">
                Pilih jenjang pendidikan yang dituju di bawah ini untuk langsung mengisi formulir pendaftaran resmi Pesantren Cendekia Amanah secara online.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Direct Registration Form Cards per Unit */}
      {activeLinks.length > 0 && (
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-100 pb-5">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#0B2F6B] uppercase mb-1">
                  <Sparkles className="w-4 h-4 text-[#F0BD28]" />
                  PILIHAN JENJANG PENDIDIKAN
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2F6B]">
                  Pendaftaran SPMB 2027/2028
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Klik tombol pada jenjang yang diinginkan untuk membuka formulir pendaftaran resmi (Google Form).
                </p>
              </div>

              <a
                href="https://wa.me/628111976077?text=Halo%20Admin%20PPDB%20Cendekia%20Amanah,%20saya%20ingin%20konsultasi%20pendaftaran%20santri%20baru"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors w-fit"
              >
                <MessageCircleQuestion className="w-4 h-4 text-emerald-600" />
                Konsultasi Pendaftaran via WhatsApp
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeLinks.map((item) => {
                const colors = unitGradients[item.unitCode] || unitGradients.sma;
                return (
                  <div
                    key={item.id || item.unitCode}
                    className={`group relative rounded-2xl border p-6 bg-linear-to-br ${colors.bg} ${colors.border} transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between`}
                  >
                    <div className="space-y-4">
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2">
                        <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${colors.badge}`}>
                          {item.badge || item.unitName}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] font-semibold text-gray-500 bg-white/80 px-2 py-0.5 rounded-md border border-gray-100">
                          <Calendar className="w-3 h-3 text-[#0B2F6B]" />
                          <span>{item.academicYear || '2027/2028'}</span>
                        </div>
                      </div>

                      {/* Title & Description */}
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#0B2F6B] transition-colors leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-xs text-gray-600 mt-2 line-clamp-3 leading-relaxed">
                          {item.description || 'Penerimaan santri baru terpadu dengan kurikulum nasional dan nilai-nilai kepesantrenan.'}
                        </p>
                      </div>

                      {/* Benefits bullets */}
                      <div className="pt-2 border-t border-gray-100/80 space-y-1.5 text-xs text-gray-500">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>Formulir pendaftaran resmi & terverifikasi</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#0B2F6B] shrink-0" />
                          <span>Konfirmasi cepat panitia PPDB</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-6">
                      <a
                        href={item.formUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm bg-linear-to-r from-[#0B2F6B] to-[#12377E] hover:from-[#12377E] hover:to-[#0B2F6B] text-white shadow-md hover:shadow-lg transition-all transform active:scale-98"
                      >
                        <span>Buka Formulir Pendaftaran</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Global Callout */}
      <GlobalCTA />
    </div>
  );
}

