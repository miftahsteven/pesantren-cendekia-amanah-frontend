import { Brochure } from '@/types';

export const brochures: Brochure[] = [
  {
    id: 'brochure-sma',
    unit: 'sma',
    title: 'SMA Cendekia Amanah',
    subtitle: 'Pamflet & Rincian Kurikulum SPMB SMA 2027/2028',
    year: '2027/2028',
    format: 'PDF',
    fileSize: '3.4 MB',
    downloadUrl: '#',
    status: 'available'
  },
  {
    id: 'brochure-diniyah',
    unit: 'diniyah',
    title: 'Madrasah Diniyah (MDTA)',
    subtitle: 'Brosur Program Pembelajaran Sore Santri 2026/2027',
    year: '2026/2027',
    format: 'PDF',
    fileSize: '2.1 MB',
    downloadUrl: '#',
    status: 'available'
  },
  {
    id: 'brochure-smp',
    unit: 'smp',
    title: 'SMP Cendekia Amanah',
    subtitle: 'Brosur & Rincian Program Unggulan SMP 2027/2028',
    year: '2027/2028',
    format: 'PDF',
    fileSize: 'Segera',
    status: 'coming_soon'
  },
  {
    id: 'brochure-pesantren',
    unit: 'pesantren',
    title: 'Pesantren Cendekia Amanah',
    subtitle: 'Brosur Asrama & Program Tahfidz 30 Juz',
    year: '2027/2028',
    format: 'PDF',
    fileSize: 'Sedang Disiapkan',
    status: 'coming_soon'
  }
];
