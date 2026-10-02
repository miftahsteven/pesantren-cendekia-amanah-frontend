import React from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import { contentRepo } from '@/repositories/content.repository';
import GaleriSlider from './GaleriSlider';

export default async function GaleriKegiatan() {
  const galleryItems = await contentRepo.getGalleryItems();
  const hasMore = galleryItems.length > 10;

  return (
    <section id="galeri" className="py-14 sm:py-16 bg-white border-y border-[#DDE6F1]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <SectionHeader
          badge="Dokumentasi Santri"
          title="GALERI KEGIATAN"
          subtitle="Potret keseharian, suasana belajar, dan kegiatan santri di lingkungan Pesantren Cendekia Amanah."
          actionText={hasMore ? 'Lihat Semua Foto' : undefined}
          actionHref={hasMore ? '/galeri' : undefined}
        />

        <GaleriSlider galleryItems={galleryItems} />
      </div>
    </section>
  );
}

