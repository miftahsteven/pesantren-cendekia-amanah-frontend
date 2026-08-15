import { SiteConfig, SocialLink } from '@/types';

export const siteConfig: SiteConfig = {
  name: 'Pesantren Cendekia Amanah',
  tagline: 'LEMBAGA PENDIDIKAN TERPADU',
  subTagline: 'Mencetak Generasi Qurani, Berprestasi, Berjiwa Pemimpin',
  description:
    'Lembaga pendidikan Islam terpadu dengan unit Pesantren, SMP, SMA, dan Madrasah Diniyah yang berkomitmen melahirkan generasi unggul, berakhlak mulia, dan berwawasan global.',
  foundingYear: 2017,
  motto: 'Mencetak Generasi Qurani, Berprestasi, Berjiwa Pemimpin untuk Masa Depan Gemilang',
  leader: {
    name: 'KH. Cholil Nafis, Lc., MA., Ph.D',
    role: 'Pengasuh Pesantren Cendekia Amanah',
    title: 'Ketua MUI Bidang Dakwah & Ukhuwah / Dosen Pascasarjana UI',
    photoUrl: '/uploads/guru/leader.png',
    quote: [
      'Alhamdulillah, segala puji bagi Allah SWT atas limpahan rahmat dan karunia-Nya sehingga Lembaga Pendidikan Terpadu Cendekia Amanah terus berkomitmen mencetak generasi Qurani, berilmu, berakhlak mulia, dan berjiwa pemimpin.',
      'Dengan perpaduan kurikulum nasional dan nilai-nilai luhur kepesantrenan, kami mendidik santri dan siswa untuk siap bersaing di kancah global tanpa kehilangan jati diri keislamannya.',
      'Semoga Allah SWT senantiasa memberikan keberkahan dan kemudahan dalam setiap langkah kita mendidik dan membimbing putra-putri terbaik bangsa.'
    ]
  }
};

export const socialLinks: SocialLink[] = [
  {
    platform: 'facebook',
    name: 'Facebook',
    url: 'https://web.facebook.com/pesantren.cendekiaamanah.7',
    handle: 'pesantren.cendekiaamanah.7',
    icon: 'facebook'
  },
  {
    platform: 'instagram',
    name: 'Instagram',
    url: 'https://instagram.com/pesantren.cendikia.amanah',
    handle: '@pesantren.cendikia.amanah',
    icon: 'instagram'
  },
  {
    platform: 'youtube',
    name: 'YouTube',
    url: 'https://youtube.com/@amanahtv1035',
    handle: '@amanahtv1035',
    icon: 'youtube'
  },
  {
    platform: 'tiktok',
    name: 'TikTok',
    url: 'https://tiktok.com/@p.cendekia.amanah',
    handle: '@p.cendekia.amanah',
    icon: 'tiktok'
  }
];
