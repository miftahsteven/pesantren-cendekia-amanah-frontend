import React from 'react';
import Image from 'next/image';
import SectionHeader from '@/components/common/SectionHeader';
import { contentRepo } from '@/repositories/content.repository';
import { Image as ImageIcon } from 'lucide-react';
import { getUploadUrl } from '@/lib/uploads';

export default async function GaleriKegiatan() {
  const galleryItems = await contentRepo.getGalleryItems();

  return (
    <section id="galeri" className="py-14 sm:py-16 bg-white border-y border-[#DDE6F1]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <SectionHeader
          badge="Dokumentasi Santri"
          title="GALERI KEGIATAN"
          subtitle="Potret keseharian, suasana belajar, dan kegiatan santri di lingkungan Pesantren Cendekia Amanah."
          actionText="Lihat Semua Foto"
          actionHref="/pesantren#galeri"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="relative h-64 sm:h-72 rounded-2xl sm:rounded-3xl overflow-hidden border border-[#DDE6F1] shadow-xs group hover-lift"
            >
              <Image
                src={getUploadUrl(item.image)}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#0B2F6B]/90 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Caption on Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 space-y-1 text-white">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#8ED6A8]">
                  <ImageIcon className="w-3 h-3" />
                  {item.category}
                </span>
                <h3 className="text-xs sm:text-sm font-bold text-white leading-snug">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
