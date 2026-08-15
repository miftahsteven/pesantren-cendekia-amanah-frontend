import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SectionHeader from '@/components/common/SectionHeader';
import { contentRepo } from '@/repositories/content.repository';
import { Quote, ArrowRight, Calendar } from 'lucide-react';
import { getUploadUrl } from '@/lib/uploads';

export default async function OpiniTerbaru() {
  const allOpinions = await contentRepo.getOpinionArticles();
  const latestOpinions = allOpinions.slice(0, 3);

  return (
    <section className="py-14 sm:py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <SectionHeader
          badge="Kolom Pemikiran"
          title="OPINI TERBARU"
          subtitle="Gagasan pengasuh, asatidz, dan pendidik Cendekia Amanah seputar pendidikan Islam, karakter, dan pengasuhan anak."
          actionText="Lihat Semua Opini"
          actionHref="/opini"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestOpinions.map((opini) => (
            <article
              key={opini.id}
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-[#DDE6F1] shadow-xs hover-lift flex flex-col justify-between space-y-5 group relative overflow-hidden"
            >
              {/* Quote icon background watermark */}
              <Quote className="w-20 h-20 text-[#EBF3FF] absolute top-2 right-2 -z-0 pointer-events-none" />

              <div className="space-y-3 relative z-10">
                <div className="flex items-center gap-2 text-[11px] text-[#7B8CA1]">
                  <Calendar className="w-3.5 h-3.5 text-[#17804A]" />
                  <span>{opini.publishedAt}</span>
                  <span>•</span>
                  <span>{opini.readTime}</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#0B2F6B] group-hover:text-[#1A4FA0] transition-colors leading-snug">
                  <Link href={`/opini/${opini.slug}`}>{opini.title}</Link>
                </h3>

                <p className="text-xs sm:text-sm text-[#5C6B7D] leading-relaxed line-clamp-3">
                  {opini.excerpt}
                </p>
              </div>

              {/* Author Box & Action */}
              <div className="pt-4 border-t border-[#F4F7FB] flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100 border border-[#DDE6F1] shrink-0">
                    <Image
                      src={getUploadUrl(opini.author.avatar)}
                      alt={opini.author.name}
                      fill
                      className="object-cover object-top"
                      sizes="40px"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0B2F6B] leading-tight">{opini.author.name}</h4>
                    <p className="text-[10px] text-[#7B8CA1] leading-tight mt-0.5">{opini.author.role}</p>
                  </div>
                </div>

                <Link
                  href={`/opini/${opini.slug}`}
                  className="w-8 h-8 rounded-full bg-[#F4F7FB] text-[#0B2F6B] hover:bg-[#0B2F6B] hover:text-white flex items-center justify-center transition-colors"
                  aria-label={`Baca opini ${opini.title}`}
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
