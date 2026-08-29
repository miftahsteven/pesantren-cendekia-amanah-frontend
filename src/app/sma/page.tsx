import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { contentRepo } from '@/repositories/content.repository';
import EducationUnitPage from '@/components/unit/EducationUnitPage';

export const metadata: Metadata = {
  title: 'SMA Cendekia Amanah — Sekolah Menengah Atas Berbasis Riset & PTN',
  description:
    'SMA Cendekia Amanah: Program persiapan intensif sukses menembus PTN favorit, pembimbingan riset karya ilmiah remaja, inovasi teknologi, dan tahfidz lanjutan.',
  openGraph: {
    title: 'SMA Cendekia Amanah — Sekolah Menengah Atas Berbasis Riset & PTN',
    description:
      'Mempersiapkan saintis muda, peneliti, dan pemimpin masa depan menuju PTN dan perguruan tinggi dunia.',
    images: ['/images/galery/sma1.png']
  }
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function SMAPage() {
  const [unit, organizations] = await Promise.all([
    contentRepo.getEducationUnit('sma'),
    contentRepo.getOrganizationMembers('sma')
  ]);

  if (!unit) notFound();

  return <EducationUnitPage unit={unit} organizations={organizations} />;
}
