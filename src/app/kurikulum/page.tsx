import React, { Suspense } from 'react';
import { Metadata } from 'next';
import Breadcrumb from '@/components/common/Breadcrumb';
import SectionHeader from '@/components/common/SectionHeader';
import GlobalCTA from '@/components/layout/GlobalCTA';
import { contentRepo } from '@/repositories/content.repository';
import CurriculumViewer from '@/components/curriculum/CurriculumViewer';

export const metadata: Metadata = {
  title: 'Kurikulum Pendidikan — Pesantren Cendekia Amanah',
  description:
    'Sistem dan pilar kurikulum terpadu seluruh unit pendidikan Pesantren Cendekia Amanah (Pesantren, SMP, SMA, dan MDTA).',
  openGraph: {
    title: 'Kurikulum Pendidikan — Pesantren Cendekia Amanah',
    description:
      'Perpaduan seimbang Kurikulum Nasional Merdeka, Tahfidz Al-Qur’an bersanad, literatur Turats Islam, literasi digital AI, dan akselerasi PTN.',
    images: ['/uploads/gallery/pesantren1.png']
  }
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function KurikulumPage() {
  const curriculums = await contentRepo.getCurriculums();

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* Breadcrumb Header */}
      <section className="bg-white border-b border-[#DDE6F1] py-4">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <Breadcrumb
            items={[
              { label: 'Beranda', href: '/' },
              { label: 'Kurikulum Pendidikan' }
            ]}
          />
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-10">
          <SectionHeader
            badge="Sistem Pembelajaran & Kurikulum Terpadu"
            title="KURIKULUM PENDIDIKAN CENDEKIA AMANAH"
            subtitle="Sinergi unggul antara kurikulum nasional berstandar Merdeka, kedalaman nilai-nilai Islam & Tahfidz Al-Qur'an bersanad, penguasaan bahasa internasional, literasi digital masa depan, dan kultur riset sains."
            centered
          />

          <Suspense
            fallback={
              <div className="bg-white rounded-3xl p-12 text-center border border-[#DDE6F1] animate-pulse">
                <div className="w-10 h-10 bg-slate-200 rounded-full mx-auto mb-4" />
                <div className="h-4 bg-slate-200 rounded max-w-xs mx-auto mb-2" />
                <div className="h-3 bg-slate-100 rounded max-w-sm mx-auto" />
              </div>
            }
          >
            <CurriculumViewer initialItems={curriculums} />
          </Suspense>
        </div>
      </section>

      {/* Global CTA */}
      <GlobalCTA />
    </main>
  );
}
