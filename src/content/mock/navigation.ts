import { NavigationItem } from '@/types';

export const mainNavigation: NavigationItem[] = [
  {
    label: 'Beranda',
    href: '/'
  },
  {
    label: 'Tentang Kami',
    href: '/tentang-kami',
    children: [
      { label: 'Profil Lembaga', href: '/tentang-kami#profil', description: 'Mengenal sejarah dan visi Cendekia Amanah' },
      { label: 'Visi & Misi', href: '/tentang-kami#visi-misi', description: 'Arah dan komitmen pendidikan terpadu' },
      { label: 'Sambutan Pengasuh', href: '/tentang-kami#sambutan', description: 'Pesan dari KH. Cholil Nafis, Lc., MA., Ph.D' },
      { label: 'Fasilitas Pesantren', href: '/tentang-kami#fasilitas', description: 'Sarana & prasarana kampus terpadu' }
    ]
  },
  {
    label: 'Pesantren',
    href: '/pesantren',
    children: [
      { label: 'Profil Pesantren', href: '/pesantren#profil' },
      { label: 'Program Unggulan', href: '/pesantren#program' },
      { label: 'Kurikulum & Kitab', href: '/pesantren#kurikulum' },
      { label: 'Kehidupan Santri', href: '/pesantren#kegiatan' },
      { label: 'Prestasi Santri', href: '/pesantren#prestasi' }
    ]
  },
  {
    label: 'SMP',
    href: '/smp',
    children: [
      { label: 'Profil SMP', href: '/smp#profil' },
      { label: 'Keunggulan Kurikulum', href: '/smp#keunggulan' },
      { label: 'Program Unggulan', href: '/smp#program' },
      { label: 'Struktur Organisasi', href: '/smp#organisasi' },
      { label: 'Ekstrakurikuler', href: '/smp#kegiatan' },
      { label: 'Prestasi Siswa', href: '/smp#prestasi' }
    ]
  },
  {
    label: 'SMA',
    href: '/sma',
    children: [
      { label: 'Profil SMA', href: '/sma#profil' },
      { label: 'Program Unggulan & PTN', href: '/sma#program' },
      { label: 'Struktur Organisasi', href: '/sma#organisasi' },
      { label: 'Kegiatan Riset & Siswa', href: '/sma#kegiatan' },
      { label: 'Prestasi Nasional', href: '/sma#prestasi' }
    ]
  },
  {
    label: 'Diniyah',
    href: '/diniyah',
    children: [
      { label: 'Profil Diniyah', href: '/diniyah#profil' },
      { label: 'Kurikulum Diniyah', href: '/diniyah#kurikulum' },
      { label: 'Program Pembelajaran', href: '/diniyah#program' },
      { label: 'Prestasi Santri', href: '/diniyah#prestasi' }
    ]
  },
  {
    label: 'Berita',
    href: '/berita'
  },
  {
    label: 'Opini',
    href: '/opini'
  },
  {
    label: 'Kontak',
    href: '/kontak'
  }
];

export const utilityNavLinks = {
  phone: {
    label: '+62-857-7644-6468',
    href: '/kontak'
  },
  consultation: {
    label: 'Konsultasi Keislaman',
    href: 'https://cholilnafis.id/#konsultasi',
    isExternal: true
  },
  brochure: {
    label: 'Unduh Brosur',
    action: 'open_brochure_modal'
  },
  virtualTour: {
    label: 'Virtual Tour',
    action: 'open_video_modal'
  }
};

export const unitShortcuts = [
  { id: 'pesantren', label: 'Pesantren', href: '/pesantren', icon: 'Mosque' },
  { id: 'smp', label: 'SMP Cendekia Amanah', href: '/smp', icon: 'GraduationCap' },
  { id: 'sma', label: 'SMA Cendekia Amanah', href: '/sma', icon: 'BookOpen' },
  { id: 'diniyah', label: 'Diniyah', href: '/diniyah', icon: 'Award' }
];
