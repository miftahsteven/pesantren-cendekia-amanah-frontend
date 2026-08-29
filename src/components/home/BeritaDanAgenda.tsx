import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { contentRepo } from '@/repositories/content.repository';
import { Calendar, ArrowRight } from 'lucide-react';
import { getUploadUrl } from '@/lib/uploads';

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
          <div className="lg:col-span-4 space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-black text-[#0B2F6B] tracking-tight uppercase">
                AGENDA KEGIATAN
              </h2>
              <Link
                href="/kontak"
                className="text-xs sm:text-sm font-bold text-[#1A4FA0] hover:text-[#0B2F6B] flex items-center gap-1 transition-colors"
              >
                <span>Lihat Semua</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Agenda Card List */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#DDE6F1] shadow-xs space-y-5">
              {agendas.map((agenda) => (
                <div
                  key={agenda.id}
                  className="flex items-start gap-4 pb-4 border-b border-[#F4F7FB] last:border-b-0 last:pb-0 group"
                >
                  {/* Soft Red/Pink Date Badge matching screenshot */}
                  <div className="w-12 h-14 rounded-xl bg-[#FDE8E9] text-[#D8232A] flex flex-col items-center justify-center shrink-0 border border-[#FCD2D4] group-hover:bg-[#D8232A] group-hover:text-white transition-colors duration-200 shadow-xs">
                    <span className="text-base sm:text-lg font-black leading-none">{agenda.day}</span>
                    <span className="text-[9px] font-extrabold uppercase tracking-wider mt-0.5">
                      {agenda.month}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="space-y-1 flex-1">
                    <h3 className="text-xs sm:text-sm font-bold text-[#0B2F6B] group-hover:text-[#1A4FA0] transition-colors leading-snug">
                      {agenda.title}
                    </h3>
                    <p className="text-[11px] text-[#7B8CA1]">
                      {agenda.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
