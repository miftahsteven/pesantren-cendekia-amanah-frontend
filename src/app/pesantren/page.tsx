import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { contentRepo } from '@/repositories/content.repository';
import EducationUnitPage from '@/components/unit/EducationUnitPage';

export const metadata: Metadata = {
  title: 'Pesantren Cendekia Amanah — Program Tahfidz & Dirasah Islamiyah',
  description:
    'Unit Pondok Pesantren Cendekia Amanah: Program Tahfidz Al-Qur’an bersanad, Bahasa Arab aktif, penguasaan kitab kuning, dan pembinaan kepemimpinan santri 24 jam.',
  openGraph: {
    title: 'Pesantren Cendekia Amanah — Program Tahfidz & Dirasah Islamiyah',
    description:
      'Unit Pondok Pesantren Cendekia Amanah berfokus pada tahfidz 30 juz, bahasa Arab, dan pembinaan karakter islami.',
    images: ['/images/galery/pesantren6.png']
  }
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PesantrenPage() {
  const unit = await contentRepo.getEducationUnit('pesantren');
  if (!unit) notFound();

  return <EducationUnitPage unit={unit} />;
}
