import React from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import { contentRepo } from '@/repositories/content.repository';
import MitraSlider from '@/components/home/MitraSlider';

export default async function MitraKerjasama() {
  const partners = await contentRepo.getPartners();

  return (
    <section className="py-10 sm:py-12 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <SectionHeader
          badge="Jejaring & Sinergi"
          title="MITRA KERJA SAMA"
          subtitle="Bersinergi dengan kementerian, lembaga pendidikan tinggi, organisasi zakat, dan mitra strategis nasional."
          centered
        />

        <MitraSlider partners={partners} />
      </div>
    </section>
  );
}
