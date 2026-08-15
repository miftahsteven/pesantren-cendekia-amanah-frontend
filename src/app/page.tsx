import React from 'react';
import { Metadata } from 'next';
import HeroCarousel from '@/components/home/HeroCarousel';
import HeroCTAStats from '@/components/home/HeroCTAStats';
import UnitPendidikanCards from '@/components/home/UnitPendidikanCards';
import SambutanPengasuh from '@/components/home/SambutanPengasuh';
import BigStatistics from '@/components/home/BigStatistics';
import KeunggulanKami from '@/components/home/KeunggulanKami';
import BeritaDanAgenda from '@/components/home/BeritaDanAgenda';
import OpiniTerbaru from '@/components/home/OpiniTerbaru';
import PrestasiCarousel from '@/components/home/PrestasiCarousel';
import ProgramUnggulan from '@/components/home/ProgramUnggulan';
import GaleriKegiatan from '@/components/home/GaleriKegiatan';
import VideoProfilSection from '@/components/home/VideoProfilSection';
import TestimoniSection from '@/components/home/TestimoniSection';
import MitraKerjasama from '@/components/home/MitraKerjasama';
import PPDBBannerCTA from '@/components/home/PPDBBannerCTA';

export const metadata: Metadata = {
  title: 'Pesantren Cendekia Amanah — Lembaga Pendidikan Terpadu',
  description:
    'Website resmi Pesantren Cendekia Amanah: Pesantren, SMP Cendekia Amanah, SMA Cendekia Amanah, dan Madrasah Diniyah. Mencetak Generasi Qurani, Berprestasi, Berjiwa Pemimpin.',
  openGraph: {
    title: 'Pesantren Cendekia Amanah — Lembaga Pendidikan Terpadu',
    description:
      'Mencetak Generasi Qurani, Berprestasi, Berjiwa Pemimpin untuk Masa Depan Gemilang.',
    images: ['/images/galery/pesantren6.png']
  }
};

import { contentRepo } from '@/repositories/content.repository';

export default async function HomePage() {
  const achievements = await contentRepo.getAchievements();

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Top Banner Hero Carousel Section */}
      <section className="pt-4 sm:pt-6">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <HeroCarousel />
          <HeroCTAStats />
        </div>
      </section>

      {/* 4 Educational Units */}
      <UnitPendidikanCards />

      {/* Leader / Pengasuh Welcome Speech */}
      <SambutanPengasuh />

      {/* Big Institutional Statistics & Consultation Banner */}
      <BigStatistics />

      {/* Core Advantages / Keunggulan Kami */}
      <KeunggulanKami />

      {/* Combined Latest News (6 items) & Upcoming Agenda (Side-by-side in 1 Row) */}
      <BeritaDanAgenda />

      {/* Latest Opinions */}
      <OpiniTerbaru />

      {/* Student Achievements Slider */}
      <PrestasiCarousel initialAchievements={achievements} />

      {/* Flagship Programs */}
      <ProgramUnggulan />

      {/* Student Activity Gallery */}
      <GaleriKegiatan />

      {/* Profile Video & Virtual Tour CTA */}
      <VideoProfilSection />

      {/* Testimonials */}
      <TestimoniSection />

      {/* Institutional Partners */}
      <MitraKerjasama />

      {/* Final Bottom PPDB CTA */}
      <PPDBBannerCTA />
    </div>
  );
}
