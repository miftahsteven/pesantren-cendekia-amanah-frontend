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

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function SMPPage() {
  const [unit, organizations] = await Promise.all([
    contentRepo.getEducationUnit('smp'),
    contentRepo.getOrganizationMembers('smp')
  ]);

  if (!unit) notFound();

  return <EducationUnitPage unit={unit} organizations={organizations} />;
}
