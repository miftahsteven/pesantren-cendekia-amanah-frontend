import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { contentRepo } from '@/repositories/content.repository';
import EducationUnitPage from '@/components/unit/EducationUnitPage';

export const metadata: Metadata = {
  title: 'Madrasah Diniyah Cendekia Amanah — Fondasi Aqidah & Akhlak Santri',
  description:
    'Madrasah Diniyah Takmiliyah Awaliyah (MDTA) Cendekia Amanah: Pendidikan agama Islam dasar non-formal sore, pengenalan kitab kuning, fiqih ibadah praktis, dan tartil Al-Qur’an.',
  openGraph: {
    title: 'Madrasah Diniyah Cendekia Amanah — Fondasi Aqidah & Akhlak Santri',
    description:
      'Pendidikan agama Islam dasar sore hari untuk membina aqidah yang lurus, akhlak mulia, dan baca tulis Al-Qur’an.',
    images: ['/images/galery/madrasah1.png']
  }
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function DiniyahPage() {
  const unit = await contentRepo.getEducationUnit('diniyah');
  if (!unit) notFound();

  return <EducationUnitPage unit={unit} />;
}
