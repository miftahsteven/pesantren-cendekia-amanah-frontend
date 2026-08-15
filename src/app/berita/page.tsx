import React from 'react';
import { Metadata } from 'next';
import { contentRepo } from '@/repositories/content.repository';
import Breadcrumb from '@/components/common/Breadcrumb';
import NewsListInteractive from '@/components/news/NewsListInteractive';
import GlobalCTA from '@/components/layout/GlobalCTA';

export const metadata: Metadata = {
  title: 'Berita & Informasi — Pesantren Cendekia Amanah',
  description:
    'Kabar terkini seputar kegiatan belajar, prestasi santri, agenda dakwah, dan informasi resmi di lingkungan Pesantren Cendekia Amanah.',
  openGraph: {
    title: 'Berita & Informasi — Pesantren Cendekia Amanah',
    description:
      'Kabar terkini kegiatan dan prestasi Pesantren Cendekia Amanah.',
    images: ['/images/news/wisuda.jpg']
  }
};

export default async function NewsPage() {
  const allArticles = await contentRepo.getNewsArticles();
  const popularArticles = await contentRepo.getPopularNews(5);

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Hero Header */}
      <section className="pt-4 sm:pt-6">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-4">
          <Breadcrumb items={[{ label: 'Berita' }]} />

          {/* Hero Banner */}
          <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 text-white bg-linear-to-r from-[#0B2F6B] via-[#1A4FA0] to-[#0B2F6B] shadow-xl border border-[#12377E]">
            <div className="max-w-2xl space-y-3">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#17804A] text-white uppercase tracking-wider shadow-xs">
                Kabar Cendekia
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                BERITA & INFORMASI
              </h1>
              <p className="text-sm sm:text-base text-white/85 leading-relaxed">
                Informasi terbaru seputar kegiatan, prestasi santri, inovasi akademik, dan agenda di lingkungan Lembaga
                Pendidikan Terpadu Cendekia Amanah.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive News Grid & Sidebar */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <NewsListInteractive
          initialArticles={allArticles}
          popularArticles={popularArticles}
        />
      </section>

      {/* Global Callout */}
      <GlobalCTA />
    </div>
  );
}
