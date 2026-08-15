import React from 'react';
import Image from 'next/image';
import SectionHeader from '@/components/common/SectionHeader';
import { contentRepo } from '@/repositories/content.repository';
import { getUploadUrl } from '@/lib/uploads';

export default async function MitraKerjasama() {
  const partners = await contentRepo.getPartners();

  return (
    <section className="py-14 sm:py-16 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <SectionHeader
          badge="Jejaring & Sinergi"
          title="MITRA KERJA SAMA"
          subtitle="Bersinergi dengan kementerian, lembaga pendidikan tinggi, organisasi zakat, dan mitra strategis nasional."
          centered
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6 items-center">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="p-4 rounded-2xl border border-[#E6EDF6] bg-[#F4F7FB]/50 hover:bg-white hover:border-[#B9C8DC] hover:shadow-xs transition-all flex items-center justify-center h-24 group"
              title={partner.name}
            >
              <div className="relative w-full h-12 grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105">
                <Image
                  src={getUploadUrl(partner.logo)}
                  alt={partner.name}
                  fill
                  className="object-contain"
                  sizes="120px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
