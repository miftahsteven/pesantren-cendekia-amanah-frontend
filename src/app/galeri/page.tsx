import React from 'react';
import { Metadata } from 'next';
import Breadcrumb from '@/components/common/Breadcrumb';
import SectionHeader from '@/components/common/SectionHeader';
import GlobalCTA from '@/components/layout/GlobalCTA';
import { contentRepo } from '@/repositories/content.repository';
import GalleryViewer from '@/components/gallery/GalleryViewer';

export const metadata: Metadata = {
  title: 'Galeri Kegiatan & Dokumentasi — Pesantren Cendekia Amanah',
  description:
    'Potret kegiatan santri, suasana pembelajaran, fasilitas, dan dokumentasi program di lingkungan Pesantren Cendekia Amanah.',
  openGraph: {
    title: 'Galeri Kegiatan & Dokumentasi — Pesantren Cendekia Amanah',
    description:
      'Dokumentasi lengkap aktivitas santri dan peserta didik Pesantren Cendekia Amanah.',
    images: ['/uploads/gallery/pesantren1.png']
  }
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function GaleriPage() {
  const galleryItems = await contentRepo.getGalleryItems();

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* Breadcrumb Header */}
      <section className="bg-white border-b border-[#DDE6F1] py-4">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <Breadcrumb
            items={[
              { label: 'Beranda', href: '/' },
              { label: 'Galeri Kegiatan' }
            ]}
          />
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <SectionHeader
            badge="Dokumentasi & Potret Santri"
            title="GALERI KEGIATAN SANTRI"
            subtitle="Kumpulan arsip foto suasana belajar, halaqah Quran, ekstrakurikuler, dan kegiatan keseharian santri Pesantren Cendekia Amanah."
            centered
          />

          <GalleryViewer initialItems={galleryItems} />
        </div>
      </section>

      {/* Global CTA */}
      <GlobalCTA />
    </main>
  );
}
