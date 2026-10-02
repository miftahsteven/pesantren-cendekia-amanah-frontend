import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { contentRepo } from '@/repositories/content.repository';
import { Calendar, ArrowRight, Clock, MapPin } from 'lucide-react';
import { getUploadUrl } from '@/lib/uploads';
import { Agenda } from '@/types';

function formatMonth3(monthStr?: string): string {
  if (!monthStr) return '';
  const m = monthStr.trim().toUpperCase();
  if (m.startsWith('AGU') || m.startsWith('AUG')) return 'AGU';
  if (m.startsWith('OKT') || m.startsWith('OCT')) return 'OKT';
  if (m.startsWith('DES') || m.startsWith('DEC')) return 'DES';
  if (m.startsWith('MEI') || m.startsWith('MAY')) return 'MEI';
  if (m.startsWith('JAN')) return 'JAN';
  if (m.startsWith('FEB')) return 'FEB';
  if (m.startsWith('MAR')) return 'MAR';
  if (m.startsWith('APR')) return 'APR';
  if (m.startsWith('JUN')) return 'JUN';
  if (m.startsWith('JUL')) return 'JUL';
  if (m.startsWith('SEP')) return 'SEP';
  if (m.startsWith('NOV')) return 'NOV';
  return m.slice(0, 3);
}

function getAgendaUnitBadge(agenda: Agenda) {
  const code = (agenda.unit?.code || agenda.unitId || '').toLowerCase();
  const unitName = (agenda.unit?.shortName || agenda.unit?.name || '').toLowerCase();

  if (code.includes('sma') || unitName.includes('sma')) {
    return {
      label: 'SMA',
      className: 'bg-indigo-50 text-indigo-700 border-indigo-200/80'
    };
  }
  if (code.includes('smp') || unitName.includes('smp')) {
    return {
      label: 'SMP',
      className: 'bg-blue-50 text-blue-700 border-blue-200/80'
    };
  }
  if (code.includes('pesantren') || unitName.includes('pesantren')) {
    return {
      label: 'Pesantren',
      className: 'bg-emerald-50 text-emerald-700 border-emerald-200/80'
    };
  }
  if (
    code.includes('diniyah') ||
    code.includes('mdta') ||
    unitName.includes('mdta') ||
    unitName.includes('diniyah')
  ) {
    return {
      label: 'MDTA',
      className: 'bg-amber-50 text-amber-700 border-amber-200/80'
    };
  }

  // Fallback keywords in title or category if unit is not linked
  const text = `${agenda.title || ''} ${agenda.category || ''}`.toLowerCase();
  if (
    text.includes('sma') ||
    text.includes('snbp') ||
    text.includes('utbk') ||
    text.includes('kti') ||
    text.includes('lkti') ||
    text.includes('ptn')
  ) {
    return {
      label: 'SMA',
      className: 'bg-indigo-50 text-indigo-700 border-indigo-200/80'
    };
  }
  if (text.includes('smp') || text.includes('kelas 8') || text.includes('robotika')) {
    return {
      label: 'SMP',
      className: 'bg-blue-50 text-blue-700 border-blue-200/80'
    };
  }
  if (
    text.includes('santri') ||
    text.includes('pesantren') ||
    text.includes('tahfidz') ||
    text.includes('bahasa arab') ||
    text.includes('kitab')
  ) {
    return {
      label: 'Pesantren',
      className: 'bg-emerald-50 text-emerald-700 border-emerald-200/80'
    };
  }
  if (text.includes('diniyah') || text.includes('mdta') || text.includes('btq')) {
    return {
      label: 'MDTA',
      className: 'bg-amber-50 text-amber-700 border-amber-200/80'
    };
  }

  return {
    label: 'Semua Unit',
    className: 'bg-gray-100 text-gray-600 border-gray-200'
  };
}

export default async function BeritaDanAgenda() {
  const [allNews, agendas] = await Promise.all([
    contentRepo.getNewsArticles(),
    contentRepo.getAgendas()
  ]);

  // Limited to 6 latest updated news as requested
  const latestNews = allNews.slice(0, 6);

  return (
    <section className="py-12 sm:py-16 bg-[#F4F7FB]/40">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: BERITA TERBARU (8 cols on lg) */}
          <div className="lg:col-span-8 space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-black text-[#0B2F6B] tracking-tight uppercase">
                BERITA TERBARU
              </h2>
              <Link
                href="/berita"
                className="text-xs sm:text-sm font-bold text-[#1A4FA0] hover:text-[#0B2F6B] flex items-center gap-1 transition-colors"
              >
                <span>Lihat Semua</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* 6 News Grid (3 columns x 2 rows on desktop) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
              {latestNews.map((news) => (
                <article
                  key={news.id}
                  className="bg-white rounded-2xl border border-[#DDE6F1] overflow-hidden shadow-xs hover-lift flex flex-col justify-between group"
                >
                  {/* Thumbnail */}
                  <div className="relative h-36 w-full overflow-hidden bg-gray-100">
                    <Image
                      src={getUploadUrl(news.featuredImage)}
                      alt={news.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                    />
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-[9px] font-bold bg-white/95 text-[#D8232A] backdrop-blur-xs shadow-xs uppercase tracking-wider">
                      {news.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <h3 className="text-xs sm:text-sm font-bold text-[#0B2F6B] group-hover:text-[#1A4FA0] transition-colors leading-snug line-clamp-2">
                        <Link href={`/berita/${news.slug}`}>{news.title}</Link>
                      </h3>

                      <p className="text-[11px] text-[#5C6B7D] leading-relaxed line-clamp-3">
                        {news.excerpt}
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-[#F4F7FB] flex items-center gap-1 text-[10px] text-[#7B8CA1]">
                      <Calendar className="w-3 h-3 text-[#D8232A]" />
                      <span>{news.publishedAt}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* RIGHT: AGENDA KEGIATAN (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-5 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-[#0B2F6B] tracking-tight uppercase">
                  AGENDA KEGIATAN
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#EBF3FF] text-[#1A4FA0] border border-[#DDE6F1]">
                  {agendas.length}
                </span>
              </div>
              <Link
                href="/kontak"
                className="text-xs sm:text-sm font-bold text-[#1A4FA0] hover:text-[#0B2F6B] flex items-center gap-1 transition-colors"
              >
                <span>Lihat Semua</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Agenda Card List with internal scroll container matching news height */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#DDE6F1] shadow-xs flex flex-col h-[650px] max-h-[650px]">
              <div className="flex-1 overflow-y-auto pr-1.5 space-y-4 agenda-scroll">
                {agendas.map((agenda) => {
                  const unitBadge = getAgendaUnitBadge(agenda);

                  return (
                    <div
                      key={agenda.id}
                      className="flex items-start gap-3.5 pb-4 border-b border-[#F4F7FB] last:border-b-0 last:pb-0 group"
                    >
                      {/* 3-Char Month Date Badge */}
                      <div className="w-12 h-13 sm:w-13 sm:h-14 rounded-2xl bg-[#FDE8E9] text-[#D8232A] flex flex-col items-center justify-center shrink-0 border border-[#FCD2D4] group-hover:bg-[#D8232A] group-hover:text-white transition-colors duration-200 shadow-xs">
                        <span className="text-base sm:text-lg font-black leading-none">
                          {agenda.day}
                        </span>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider mt-1">
                          {formatMonth3(agenda.month)}
                        </span>
                      </div>

                      {/* Details */}
                      <div className="space-y-1.5 flex-1 min-w-0">
                        {/* Unit & Category Badges */}
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider border ${unitBadge.className}`}
                          >
                            {unitBadge.label}
                          </span>
                          {agenda.category && (
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-[#F8FAFC] text-[#5C6B7D] border border-[#DDE6F1]">
                              {agenda.category}
                            </span>
                          )}
                        </div>

                        <h3 className="text-xs sm:text-sm font-bold text-[#0B2F6B] group-hover:text-[#1A4FA0] transition-colors leading-snug line-clamp-2">
                          {agenda.title}
                        </h3>

                        <div className="flex items-center gap-3 text-[11px] text-[#7B8CA1]">
                          <span className="flex items-center gap-1 shrink-0">
                            <Clock className="w-3 h-3 text-[#1F5FD0]" />
                            <span>{agenda.time}</span>
                          </span>
                          {agenda.location && (
                            <span className="hidden xl:flex items-center gap-1 truncate text-[10px]">
                              <MapPin className="w-3 h-3 text-[#D8232A] shrink-0" />
                              <span className="truncate">{agenda.location}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Box Footer Indicator */}
              <div className="pt-3 mt-1 border-t border-[#F4F7FB] flex items-center justify-between text-[11px] text-[#7B8CA1] shrink-0">
                <span className="flex items-center gap-1.5 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-[#D8232A]" />
                  <span>Jadwal Terpadu Seluruh Unit</span>
                </span>
                <span className="text-[10px] text-[#A0AEC0] italic hidden sm:inline">
                  Scroll agenda ↓
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
