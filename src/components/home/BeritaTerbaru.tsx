import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SectionHeader from '@/components/common/SectionHeader';
import { contentRepo } from '@/repositories/content.repository';
import { Calendar, ArrowRight, Eye } from 'lucide-react';
import { getUploadUrl } from '@/lib/uploads';

export default async function BeritaTerbaru() {
  const allNews = await contentRepo.getNewsArticles();
  const latestNews = allNews.slice(0, 4);

  return (
    <section className="py-14 sm:py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <SectionHeader
          badge="Kabar & Aktivitas"
          title="BERITA TERBARU"
          subtitle="Informasi dan kabar terkini seputar kegiatan akademik, prestasi santri, dan dinamika pesantren."
          actionText="Lihat Semua Berita"
          actionHref="/berita"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestNews.map((news) => (
            <article
              key={news.id}
              className="bg-white rounded-2xl sm:rounded-3xl border border-[#DDE6F1] overflow-hidden shadow-xs hover-lift flex flex-col group"
            >
              {/* Image Thumbnail */}
              <div className="relative h-44 w-full overflow-hidden bg-gray-100">
                <Image
                  src={getUploadUrl(news.featuredImage)}
                  alt={news.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                {/* Category Badge */}
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/90 text-[#17804A] backdrop-blur-xs shadow-xs uppercase tracking-wider">
                  {news.category}
                </span>
              </div>

              {/* Content Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-[#7B8CA1]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#17804A]" />
                      {news.publishedAt}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3 text-[#7B8CA1]" />
                      {news.viewsCount}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[#0B2F6B] group-hover:text-[#1A4FA0] transition-colors leading-snug line-clamp-2">
                    <Link href={`/berita/${news.slug}`}>{news.title}</Link>
                  </h3>

                  <p className="text-xs text-[#5C6B7D] leading-relaxed line-clamp-2">
                    {news.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F4F7FB]">
                  <Link
                    href={`/berita/${news.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#1A4FA0] group-hover:text-[#17804A] transition-colors"
                  >
                    <span>Baca Selengkapnya</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
