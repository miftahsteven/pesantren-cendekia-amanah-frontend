import { Testimonial } from '@/types';

export const testimonials: Testimonial[] = [
  {
    id: 'testi-1',
    author: 'Bapak Andi Pratama',
    role: 'Wali Santri SMP & Pesantren',
    category: 'Orang Tua Santri',
    content:
      'Sekolah ini sangat amanah dan mampu mendidik anak-anak kami menjadi pribadi yang berakhlak mulia, disiplin, dan berprestasi. Perkembangan hafalan Al-Qur’an dan kemandirian ananda sangat membahagiakan kami.',
    avatar: '/uploads/guru/guru5.png',
    rating: 5
  },
  {
    id: 'testi-2',
    author: 'Ahmad Fauzan, S.T.',
    role: 'Alumni SMA Cendekia Amanah 2021 (Kini Software Engineer)',
    category: 'Alumni',
    content:
      'Ilmu, adab, dan tempaan kepemimpinan yang saya dapatkan selama berasrama di Cendekia Amanah menjadi bekal utama saya menembus PTN impian dan berkarir profesional dengan percaya diri.',
    avatar: '/uploads/guru/guru6.png',
    rating: 5
  },
  {
    id: 'testi-3',
    author: 'Prof. Dr. H. Nasaruddin Umar, MA',
    role: 'Imam Besar Masjid Istiqlal / Menteri Agama RI',
    category: 'Tokoh Pendidikan',
    content:
      'Cendekia Amanah adalah lembaga pendidikan Islam terpadu yang memadukan kedalaman spiritualitas kepesantrenan dengan kecerdasan sains modern. Sangat layak menjadi teladan dan rujukan umat.',
    avatar: '/uploads/guru/guru7.png',
    rating: 5
  }
];
