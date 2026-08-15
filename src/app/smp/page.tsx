import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { contentRepo } from '@/repositories/content.repository';
import EducationUnitPage from '@/components/unit/EducationUnitPage';

export const metadata: Metadata = {
  title: 'SMP Cendekia Amanah — Sekolah Menengah Pertama Islam Terpadu',
  description:
    'SMP Cendekia Amanah memadukan kurikulum nasional bermutu tinggi, tahfidz Al-Qur’an, pembelajaran digital smart classroom, dan program dwibahasa.',
  openGraph: {
    title: 'SMP Cendekia Amanah — Sekolah Menengah Pertama Islam Terpadu',
    description:
      'Perpaduan kurikulum nasional, tahfidz Al-Qur’an, dan digital learning modern.',
    images: ['/images/galery/smp1.png']
  }
};

export default async function SMPPage() {
  const unit = await contentRepo.getEducationUnit('smp');
  if (!unit) notFound();

  return <EducationUnitPage unit={unit} />;
}
