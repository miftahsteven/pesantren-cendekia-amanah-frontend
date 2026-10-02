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
      { label: 'Profile Pesantren', href: '/pesantren#profil', description: 'Mengenal visi, keunggulan, dan profil pesantren' },
      { label: 'Kurikulum', href: '/pesantren#kurikulum', description: 'Dirasah Islamiyah, Tahfidz Al-Qur’an & Kitab Kuning' },
      { label: 'Program Unggulan', href: '/pesantren#program-unggulan', description: 'Program prioritas pembinaan santri berprestasi' },
      { label: 'Struktur Organisasi', href: '/pesantren#struktur-organisasi', description: 'Pengasuh & dewan asatidz pembina santri' },
      { label: 'Prestasi Santri', href: '/pesantren#prestasi-santri', description: 'Raihan kejuaraan & penghargaan santri' },
      { label: 'Kegiatan Santri', href: '/pesantren#kegiatan-santri', description: 'Rutinitas 24 jam & ekstrakurikuler kepesantrenan' }
    ]
  },
  {
    label: 'SMP',
    href: '/smp',
    children: [
      { label: 'Profile SMP', href: '/smp#profil', description: 'Visi, keunggulan & sambutan kepala sekolah' },
      { label: 'Kurikulum', href: '/smp#kurikulum', description: 'Kurikulum Merdeka, Tahfidz & Smart Classroom' },
      { label: 'Program Unggulan', href: '/smp#program-unggulan', description: 'Program prioritas pembinaan siswa berprestasi' },
      { label: 'Struktur Organisasi', href: '/smp#struktur-organisasi', description: 'Kepala sekolah & dewan pendidik SMP' },
      { label: 'Prestasi Siswa', href: '/smp#prestasi-siswa', description: 'Raihan kejuaraan akademik & non-akademik' },
      { label: 'Ekstrakurikuler', href: '/smp#ekstrakurikuler', description: 'Wadah minat, bakat, sains, & teknologi' },
      { label: 'Kalender Akademik 1 Semester', href: '/smp#kalender-akademik', description: 'Jadwal kegiatan akademik & ujian sekolah' }
    ]
  },
  {
    label: 'SMA',
    href: '/sma',
    children: [
      { label: 'Profile SMA', href: '/sma#profil', description: 'Visi, keunggulan & sambutan kepala sekolah' },
      { label: 'Kurikulum', href: '/sma#kurikulum', description: 'Kurikulum Merdeka, Riset Sains & Sukses PTN' },
      { label: 'Program Unggulan', href: '/sma#program-unggulan', description: 'Persiapan PTN Favorit & beasiswa luar negeri' },
      { label: 'Struktur Organisasi', href: '/sma#struktur-organisasi', description: 'Kepala sekolah & dewan pendidik SMA' },
      { label: 'Prestasi Siswa', href: '/sma#prestasi-siswa', description: 'Raihan kejuaraan olimpiade & riset ilmiah' },
      { label: 'Ekstrakurikuler', href: '/sma#ekstrakurikuler', description: 'Wadah minat, bakat, sains, & kepemimpinan' },
      { label: 'Kalender Akademik 1 Semester', href: '/sma#kalender-akademik', description: 'Jadwal UTBK, ujian & agenda akademik SMA' }
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
