import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { contentRepo } from '@/repositories/content.repository';
import Breadcrumb from '@/components/common/Breadcrumb';
import SectionHeader from '@/components/common/SectionHeader';
import GlobalCTA from '@/components/layout/GlobalCTA';
import { Quote, Calendar, Clock, ArrowRight, UserCheck } from 'lucide-react';
import { getUploadUrl } from '@/lib/uploads';

export const metadata: Metadata = {
  title: 'Opini & Gagasan — Pesantren Cendekia Amanah',
  description:
    'Kumpulan pemikiran, ulasan keagamaan, dan pandangan pengasuh serta asatidz Pesantren Cendekia Amanah tentang pendidikan Islam, sains, dan keluarga.',
  openGraph: {
    title: 'Opini & Gagasan — Pesantren Cendekia Amanah',
    description:
      'Gagasan pengasuh dan dewan guru seputar pendidikan Islam, karakter, dan pengasuhan anak.',
    images: ['/images/guru/leader.png']
  }
};

export default async function OpinionPage() {
  const opinions = await contentRepo.getOpinionArticles();
  const featuredOpinion = opinions.find((o) => o.isFeatured) || opinions[0];
  const otherOpinions = opinions.filter((o) => o.id !== featuredOpinion?.id);

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Hero Header */}
      <section className="pt-4 sm:pt-6">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-4">
          <Breadcrumb items={[{ label: 'Opini' }]} />

          {/* Hero Banner */}
          <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 text-white bg-linear-to-r from-[#0B2F6B] via-[#1A4FA0] to-[#0B2F6B] shadow-xl border border-[#12377E]">
            <div className="max-w-2xl space-y-3">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#17804A] text-white uppercase tracking-wider shadow-xs">
                Kolom Pemikiran
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                OPINI & GAGASAN
              </h1>
              <p className="text-sm sm:text-base text-white/85 leading-relaxed">
                Gagasan, pandangan, dan wawasan pengasuh, asatidz, serta dewan guru Cendekia Amanah seputar pendidikan
                Islam, pembinaan generasi, dan tantangan peradaban modern.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Opinion Spotlight (Opini Utama) */}
      {featuredOpinion && (
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#DDE6F1] shadow-md hover-lift">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Author Photo */}
              <div className="lg:col-span-4 flex justify-center">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden shadow-lg border-4 border-[#EBF3FF] bg-gray-100 shrink-0">
                  <Image
                    src={getUploadUrl(featuredOpinion.author.avatar)}
                    alt={featuredOpinion.author.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FEF8E8] text-[#D4A31C] border border-[#F0BD28]/40 uppercase tracking-wider">
                    Opini Utama
                  </span>
                  <span className="text-xs text-[#7B8CA1] flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#17804A]" />
                    {featuredOpinion.publishedAt}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0B2F6B] hover:text-[#1A4FA0] transition-colors leading-tight">
                  <Link href={`/opini/${featuredOpinion.slug}`}>
                    {featuredOpinion.title}
                  </Link>
                </h2>

                <p className="text-xs sm:text-sm text-[#5C6B7D] leading-relaxed line-clamp-3">
                  {featuredOpinion.excerpt}
                </p>

                {/* Author Info & CTA */}
                <div className="pt-4 border-t border-[#F4F7FB] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-[#17804A]" />
                    <div>
                      <h3 className="text-xs font-bold text-[#28384A]">{featuredOpinion.author.name}</h3>
                      <p className="text-[10px] text-[#7B8CA1]">{featuredOpinion.author.role}</p>
                    </div>
                  </div>

                  <Link
                    href={`/opini/${featuredOpinion.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-[#0B2F6B] hover:bg-[#1A4FA0] transition-all transform hover:-translate-y-0.5"
                  >
                    <span>Baca Artikel Penuh</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Opini Lainnya Grid */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-8">
        <SectionHeader
          badge="Koleksi Tulisan"
          title="OPINI LAINNYA"
          subtitle="Artikel ulasan dan pemikiran dari asatidz dan pendidik berbagai jenjang unit pendidikan Cendekia Amanah."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherOpinions.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-[#DDE6F1] shadow-xs hover-lift flex flex-col justify-between space-y-5 relative overflow-hidden group"
            >
              <Quote className="w-16 h-16 text-[#EBF3FF] absolute top-3 right-3 -z-0 pointer-events-none" />

              <div className="space-y-3 relative z-10">
                <div className="flex items-center gap-2 text-[11px] text-[#7B8CA1]">
                  <Calendar className="w-3 h-3 text-[#17804A]" />
                  <span>{item.publishedAt}</span>
                  <span>•</span>
                  <span>{item.readTime}</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#0B2F6B] group-hover:text-[#1A4FA0] transition-colors leading-snug line-clamp-2">
                  <Link href={`/opini/${item.slug}`}>{item.title}</Link>
                </h3>

                <p className="text-xs text-[#5C6B7D] leading-relaxed line-clamp-3">
                  {item.excerpt}
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-[#F4F7FB] flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100 border border-[#DDE6F1] shrink-0">
                    <Image
                      src={getUploadUrl(item.author.avatar)}
                      alt={item.author.name}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#28384A] line-clamp-1">{item.author.name}</h4>
                    <p className="text-[10px] text-[#7B8CA1] line-clamp-1">{item.author.role}</p>
                  </div>
                </div>

                <Link
                  href={`/opini/${item.slug}`}
                  className="p-2 rounded-full bg-[#EBF3FF] group-hover:bg-[#1A4FA0] text-[#1A4FA0] group-hover:text-white transition-colors"
                  aria-label={`Baca opini ${item.title}`}
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Global CTA */}
      <GlobalCTA />
    </div>
  );
}
