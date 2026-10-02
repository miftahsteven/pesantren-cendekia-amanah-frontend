import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { contentRepo } from '@/repositories/content.repository';
import EducationUnitPage from '@/components/unit/EducationUnitPage';

export const metadata: Metadata = {
  title: 'MDTA Cendekia Amanah — Madrasah Diniyah Takmiliyah Awaliyah',
  description:
    'MDTA Cendekia Amanah: Pendidikan agama Islam dasar non-formal sore, Baca Tulis Al-Qur\'an, aqidah Ahlussunnah, fiqih ibadah praktis, dan pembentukan akhlak mulia.',
  openGraph: {
    title: 'MDTA Cendekia Amanah — Madrasah Diniyah Takmiliyah Awaliyah',
    description:
      'Pendidikan agama Islam dasar sore hari untuk membina aqidah yang lurus, akhlak mulia, dan baca tulis Al-Qur\'an.',
    images: ['/images/galery/madrasah1.png']
  }
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function DiniyahPage() {
  const [unit, organizations] = await Promise.all([
    contentRepo.getEducationUnit('diniyah'),
    contentRepo.getOrganizationMembers('diniyah')
  ]);

  if (!unit) notFound();

  return <EducationUnitPage unit={unit} organizations={organizations} />;
}
