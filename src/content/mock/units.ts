import { EducationUnit } from '@/types';

export const educationUnits: Record<string, EducationUnit> = {
  pesantren: {
    id: 'pesantren',
    name: 'Pesantren Cendekia Amanah',
    shortName: 'Pesantren',
    badge: 'Boarding Pesantren',
    tagline: 'Mencetak Santri Hafidz, Berkarakter, dan Berakhlakul Karimah',
    heroImage: '/uploads/gallery/pesantren6.png',
    iconName: 'Mosque',
    colorTheme: 'blue',
    whatsappNumber: '6285776446468',
    bulletPoints: [
      'Tahfidz Al-Qur’an Bersanad & Mutqin',
      'Penguasaan Bahasa Arab & Kitab Kuning',
      'Pembinaan Karakter & Kepemimpinan Islami',
      'Lingkungan Asrama yang Nyaman & Terpadu'
    ],
    features: [
      {
        title: 'Tahfidz Al-Qur’an',
        description: 'Bimbingan intensif hafalan 30 juz dengan metode mutqin dan tartil bersama asatidz berpengalaman.',
        iconName: 'BookOpen'
      },
      {
        title: 'Bahasa Arab Aktif',
        description: 'Penerapan lingkungan berbahasa (Biah Lughawiyyah) sehari-hari dan kajian literatur kitab klasik.',
        iconName: 'Languages'
      },
      {
        title: 'Leadership & Character',
        description: 'Pembinaan kedisiplinan, kemandirian, kepemimpinan organisasi, serta kepekaan sosial santri.',
        iconName: 'ShieldCheck'
      },
      {
        title: 'Pembinaan Karakter',
        description: 'Penanaman adab, akhlak mulia, dan keteladanan ibadah harian berkesinambungan 24 jam.',
        iconName: 'HeartHandshake'
      }
    ],
    description: [
      'Pesantren Cendekia Amanah merupakan unit pendidikan berbasis pondok pesantren yang berfokus pada pembinaan Al-Qur’an, pendalaman ilmu-ilmu agama Islam, penguatan akademik, serta pengembangan karakter dan kepemimpinan santri.',
      'Dengan lingkungan yang asri, kondusif, dan sistem pembinaan terpadu di bawah asuhan langsung para ustadz dan ustadzah kompeten, kami berkomitmen melahirkan generasi muslim yang berilmu amaliyah, beramal ilmiah, berakhlak mulia, dan bermanfaat luas bagi umat.'
    ],
    programs: [
      {
        id: 'p-1',
        title: 'Tahfidz Al-Qur’an Intensif',
        description: 'Program hafalan Al-Qur’an terarah dengan target juz berjenjang, tasmi’, dan sertifikasi kelulusan.',
        iconName: 'BookOpen'
      },
      {
        id: 'p-2',
        title: 'Bahasa Arab & Inggris',
        description: 'Pengembangan kemampuan berbicara, mendengar, membaca, dan menulis dua bahasa internasional.',
        iconName: 'Languages'
      },
      {
        id: 'p-3',
        title: 'Kurikulum Dirasah Islamiyah',
        description: 'Pendalaman kitab-kitab dasar Aqidah, Fiqih Syafi’i, Akhlak, Tarikh Islam, dan Nahwu Sharaf.',
        iconName: 'Scroll'
      },
      {
        id: 'p-4',
        title: 'Pembinaan Adab & Karakter',
        description: 'Pendidikan akhlak praktis dalam kehidupan berasrama, shalat berjamaah, dan dzikir harian.',
        iconName: 'UserCheck'
      },
      {
        id: 'p-5',
        title: 'Leadership & Life Skills',
        description: 'Pelatihan kepemimpinan santri (OSIS/IPNU), public speaking, manajemen organisasi, dan kemandirian.',
        iconName: 'Award'
      },
      {
        id: 'p-6',
        title: 'Kajian Tematik & Halaqah',
        description: 'Kajian interaktif bersama pengasuh dan narasumber tamu membahas isu keislaman kontemporer.',
        iconName: 'Sparkles'
      }
    ],
    facilities: [
      { id: 'f-1', name: 'Masjid Jami & Aula Ibadah', image: '/uploads/gallery/pesantren1.png' },
      { id: 'f-2', name: 'Asrama Santri yang Nyaman & Bersih', image: '/uploads/gallery/pesantren2.png' },
      { id: 'f-3', name: 'Perpustakaan & Ruang Baca Kitab', image: '/uploads/gallery/pesantren3.png' },
      { id: 'f-4', name: 'Laboratorium Komputer & Digital', image: '/uploads/gallery/pesantren4.png' },
      { id: 'f-5', name: 'Sarana Olahraga & Lapangan Terpadu', image: '/uploads/gallery/pesantren5.png' },
      { id: 'f-6', name: 'Ruang Makan & Dapur Higienis', image: '/uploads/gallery/pesantren6.png' }
    ],
    activities: [
      { id: 'a-1', title: 'Halaqah Tahfidz & Tasmi’ Pagi & Sore', description: 'Setoran hafalan baru dan muraja’ah terjadwal setiap hari.' },
      { id: 'a-2', title: 'Sorogan & Bandongan Kitab Kuning', description: 'Kajian interaktif mendalami literatur Islam klasik bersama asatidz.' },
      { id: 'a-3', title: 'Muhadhoroh 3 Bahasa', description: 'Latihan pidato santri dalam Bahasa Arab, Inggris, dan Indonesia.' },
      { id: 'a-4', title: 'Shalat Berjamaah & Dzikir Bersama', description: 'Pembiasaan shalat 5 waktu tepat waktu dan qiyamul lail berjamaah.' },
      { id: 'a-5', title: 'Ekstrakurikuler Memanah & Hadrah', description: 'Pengembangan minat bakat seni islami, olahraga sunnah, dan bela diri.' }
    ]
  },
  smp: {
    id: 'smp',
    name: 'SMP Cendekia Amanah',
    shortName: 'SMP',
    badge: 'Boarding / Fullday School',
    tagline: 'Integrasi Kurikulum Nasional, Nilai Islami, dan Pembelajaran Digital',
    heroImage: '/uploads/gallery/smp1.png',
    iconName: 'GraduationCap',
    colorTheme: 'blue',
    whatsappNumber: '6285183368851',
    bulletPoints: [
      'Kurikulum Nasional Terpadu Nilai Islam',
      'Target Tahfidz Al-Qur’an Juz 29 & 30 + Pilihan',
      'Smart Classroom & Digital Learning System',
      'Pengembangan Bahasa Asing & Ekstrakurikuler Juara'
    ],
    features: [
      {
        title: 'Kurikulum Nasional Plus',
        description: 'Penguatan fondasi sains, matematika, dan literasi yang terpadu dengan adab dan nilai keislaman.',
        iconName: 'BookOpen'
      },
      {
        title: 'Tahfidz Al-Qur’an',
        description: 'Target capaian hafalan Al-Qur’an dengan bimbingan metode tartil dan tajwid yang terstandarisasi.',
        iconName: 'Award'
      },
      {
        title: 'Digital Learning',
        description: 'Pemanfaatan media pembelajaran modern, blended learning, dan pengenalan literasi komputasional.',
        iconName: 'Laptop'
      },
      {
        title: 'Bahasa Arab & Inggris',
        description: 'Program akselerasi kemampuan berkomunikasi aktif dalam percakapan sehari-hari.',
        iconName: 'Languages'
      }
    ],
    description: [
      'SMP Cendekia Amanah adalah lembaga pendidikan formal tingkat menengah pertama yang memadukan keunggulan kurikulum nasional dengan nilai-nilai Islam, tahfidz Al-Qur’an, penguasaan dwibahasa, serta pembelajaran berbasis teknologi.',
      'Kami berkomitmen mendampingi setiap siswa di masa transisi remajanya agar tumbuh menjadi pribadi yang cerdas intelektual, kokoh spiritual, santun dalam bersikap, dan siap menghadapi tantangan pendidikan lanjutan dengan percaya diri.'
    ],
    programs: [
      {
        id: 'p-1',
        title: 'Tahfidz & Tahsin Al-Qur’an',
        description: 'Program pembimbingan tilawah dan hafalan Al-Qur’an bertahap dengan evaluasi berkala.',
        iconName: 'BookOpen'
      },
      {
        id: 'p-2',
        title: 'Digital Smart Learning',
        description: 'Penggunaan perangkat digital interaktif untuk eksplorasi sains, matematika, dan proyek belajar.',
        iconName: 'Laptop'
      },
      {
        id: 'p-3',
        title: 'Bilingual Classroom Experience',
        description: 'Pembiasaan kosakata dan frasa komunikasi Bahasa Inggris dan Bahasa Arab di kelas.',
        iconName: 'Languages'
      },
      {
        id: 'p-4',
        title: 'Pembinaan Karakter & Akhlak',
        description: 'Penanaman budaya 5S (Senyum, Salam, Sapa, Sopan, Santun) dan shalat dhuha/dzuhur berjamaah.',
        iconName: 'HeartHandshake'
      },
      {
        id: 'p-5',
        title: 'Science & Robotics Club',
        description: 'Wadah eksplorasi praktikum IPA, eksperimen sains, dan pembuatan proyek robotika sederhana.',
        iconName: 'Cpu'
      },
      {
        id: 'p-6',
        title: 'Ekstrakurikuler Pilihan Beragam',
        description: 'Pramuka, Futsal, Basket, Memanah, Hadrah, English Club, dan Seni Kaligrafi.',
        iconName: 'Trophy'
      }
    ],
    facilities: [
      { id: 'f-1', name: 'Ruang Kelas Modern Ber-AC', image: '/uploads/gallery/smp1.png' },
      { id: 'f-2', name: 'Laboratorium IPA & Komputer', image: '/uploads/gallery/smp2.png' },
      { id: 'f-3', name: 'Perpustakaan & Media Center', image: '/uploads/gallery/smp3.png' },
      { id: 'f-4', name: 'Lapangan Olahraga Multifungsi', image: '/uploads/gallery/smp4.png' },
      { id: 'f-5', name: 'Masjid Sekolah & Ruang Ibadah', image: '/uploads/gallery/smp5.png' }
    ],
    activities: [
      { id: 'a-1', title: 'Praktikum IPA & Riset Sains Sederhana', description: 'Pengamatan nyata di laboratorium untuk memperkuat pemahaman materi.' },
      { id: 'a-2', title: 'Kajian Keislaman & Mentoring Santri', description: 'Bimbingan kelompok kecil penguatan aqidah dan motivasi belajar.' },
      { id: 'a-3', title: 'Perkemahan Pramuka & Leadership', description: 'Pelatihan kemandirian, kepanduan, dan kerjasama tim di alam terbuka.' },
      { id: 'a-4', title: 'Parenting & Class Meeting', description: 'Kolaborasi sinergis antara sekolah, siswa, dan orang tua santri.' },
      { id: 'a-5', title: 'Latihan Kompetisi Sains & MTQ', description: 'Pembinaan intensif menuju ajang kompetisi tingkat kota, provinsi, dan nasional.' }
    ]
  },
  sma: {
    id: 'sma',
    name: 'SMA Cendekia Amanah',
    shortName: 'SMA',
    badge: 'Boarding / Fullday School',
    tagline: 'Mempersiapkan Generasi Pemimpin, Saintis, dan Peneliti Menuju PTN & Global',
    heroImage: '/uploads/gallery/sma1.png',
    iconName: 'BookOpen',
    colorTheme: 'navy',
    whatsappNumber: '6285888663587',
    bulletPoints: [
      'Kurikulum Nasional & Penguatan Minat Bakat Riset',
      'Program Persiapan Sukses Masuk PTN Favorit & Luar Negeri',
      'Bimbingan Riset Ilmiah Remaja & Inovasi Teknologi',
      'Tahfidz Al-Qur’an Lanjutan & Pembinaan Karakter Pemimpin'
    ],
    features: [
      {
        title: 'Kurikulum & Keislaman',
        description: 'Sinergi kurikulum nasional berbasis kompetensi dengan penguatan wawasan keislaman komprehensif.',
        iconName: 'BookOpen'
      },
      {
        title: 'Tahfidz Al-Qur’an Lanjutan',
        description: 'Program pemeliharaan hafalan dan penambahan juz bagi calon hafiz-hafizah generasi bangsa.',
        iconName: 'Award'
      },
      {
        title: 'Research & Innovation',
        description: 'Budaya karya tulis ilmiah, eksperimen laboratorium, dan keikutsertaan kompetisi riset nasional.',
        iconName: 'Microscope'
      },
      {
        title: 'Persiapan PTN & Karir Global',
        description: 'Bimbingan intensif UTBK-SNBT, seleksi jalur prestasi (SNBP), dan pemetaan minat studi lanjut.',
        iconName: 'GraduationCap'
      }
    ],
    description: [
      'SMA Cendekia Amanah hadir sebagai lembaga pendidikan menengah atas yang memadukan kurikulum nasional bermutu tinggi dengan pendidikan karakter Islam yang kokoh, mengantarkan siswa menjadi pribadi yang berilmu tinggi, berdaya saing, dan berakhlak mulia.',
      'Dengan dukungan tenaga pengajar profesional, program pembinaan riset ilmiah, bimbingan intensif persiapan perguruan tinggi negeri (PTN) dan luar negeri, kami siap membekali generasi muda menyongsong masa depan gemilang.'
    ],
    programs: [
      {
        id: 'p-1',
        title: 'Academic Excellence & PTN Pathway',
        description: 'Pendampingan khusus persiapan seleksi masuk perguruan tinggi negeri terkemuka (UI, ITB, UGM, Unair, ITS, dll).',
        iconName: 'GraduationCap'
      },
      {
        id: 'p-2',
        title: 'Karya Tulis Ilmiah & Riset Remaja',
        description: 'Pembimbingan pembuatan paper riset ilmiah, inovasi terapan, dan kompetisi LKTI nasional.',
        iconName: 'Microscope'
      },
      {
        id: 'p-3',
        title: 'Tahfidz Al-Qur’an & Ulumul Syar’i',
        description: 'Pemantapan hafalan Al-Qur’an dan penguasaan kajian hukum serta pemikiran Islam kontemporer.',
        iconName: 'BookOpen'
      },
      {
        id: 'p-4',
        title: 'Leadership & Diplomatic Skills',
        description: 'Pelatihan public speaking, debat parlemen, kepemimpinan organisasi, dan kepemudaan.',
        iconName: 'Award'
      },
      {
        id: 'p-5',
        title: 'Language Proficiency (IELTS/TOAFL)',
        description: 'Persiapan sertifikasi kecakapan bahasa internasional untuk menunjang studi lanjut ke luar negeri.',
        iconName: 'Languages'
      },
      {
        id: 'p-6',
        title: 'Career & University Mentoring',
        description: 'Konseling minat dan bakat karir, try out berkala, serta kunjungan kampus (Campus Tour).',
        iconName: 'Briefcase'
      }
    ],
    facilities: [
      { id: 'f-1', name: 'Ruang Kelas Representatif & Multimedia', image: '/uploads/gallery/sma1.png' },
      { id: 'f-2', name: 'Laboratorium Biologi, Fisika, & Kimia', image: '/uploads/gallery/sma2.png' },
      { id: 'f-3', name: 'Laboratorium Komputer & Bahasa', image: '/uploads/gallery/sma3.png' },
      { id: 'f-4', name: 'Perpustakaan Digital & Corner Diskusi', image: '/uploads/gallery/sma4.png' },
      { id: 'f-5', name: 'Lapangan Olahraga & Gym Area', image: '/uploads/gallery/sma5.png' },
      { id: 'f-6', name: 'Masjid Kampus & Studio Audio Visual', image: '/uploads/gallery/sma6.png' }
    ],
    activities: [
      { id: 'a-1', title: 'Kegiatan Riset Ilmiah & Presentasi Paper', description: 'Siswa mempresentasikan hasil eksperimen dan penelitian terapan.' },
      { id: 'a-2', title: 'Try Out Intensif & Bimbingan UTBK', description: 'Pelatihan soal berstandar nasional dan bedah materi secara terstruktur.' },
      { id: 'a-3', title: 'Studi Kampus & Kuliah Pakar', description: 'Kunjungan ke berbagai perguruan tinggi favorit dan sharing session alumni.' },
      { id: 'a-4', title: 'Ekstrakurikuler Pilihan & OSIS', description: 'Organisasi siswa, debat ilmiah, jurnalistik, bela diri, dan paduan suara islami.' },
      { id: 'a-5', title: 'Bakti Sosial & Dakwah Masyarakat', description: 'Pengabdian santri di tengah masyarakat sebagai wujud kepedulian sosial.' }
    ]
  },
  diniyah: {
    id: 'diniyah',
    name: 'Madrasah Diniyah Takmiliyah Awaliyah',
    shortName: 'Diniyah',
    badge: 'Non Formal Sore',
    tagline: 'Fondasi Kokoh Aqidah, Akhlak, dan Baca Tulis Al-Qur’an Sejak Dini',
    heroImage: '/uploads/gallery/madrasah1.png',
    iconName: 'Award',
    colorTheme: 'green',
    whatsappNumber: '6285776446468',
    bulletPoints: [
      'Pendidikan Agama Islam Terstruktur Non-Formal Sore',
      'Metode Tartil & Tahsin Baca Tulis Al-Qur’an',
      'Pengajaran Fiqih Ibadah Praktis Sehari-Hari',
      'Penanaman Adab, Doa, dan Akhlak Mulia'
    ],
    features: [
      {
        title: 'Aqidah yang Lurus',
        description: 'Penanaman dasar-dasar keimanan yang kokoh sesuai tuntunan Ahlussunnah wal Jama’ah.',
        iconName: 'HeartHandshake'
      },
      {
        title: 'Fiqih Sehari-hari',
        description: 'Pembelajaran tata cara thaharah, wudhu, shalat, dan ibadah praktis yang benar.',
        iconName: 'BookOpen'
      },
      {
        title: 'Akhlak Mulia',
        description: 'Pembiasaan adab kepada orang tua, guru, teman, serta penghayatan nilai sopan santun.',
        iconName: 'ShieldCheck'
      },
      {
        title: 'Kitab Kuning Dasar',
        description: 'Pengenalan makna dan terjemahan dasar kitab akhlak (Taisirul Khalaq/Safinatun Najah).',
        iconName: 'Scroll'
      }
    ],
    description: [
      'Madrasah Diniyah Takmiliyah Awaliyah (MDTA) Cendekia Amanah merupakan lembaga pendidikan non formal yang memberikan pendidikan agama Islam dasar komprehensif bagi anak-anak dan santri di waktu sore hari.',
      'Pembelajaran menekankan pada pemahaman aqidah yang benar, keterampilan membaca dan menulis Al-Qur’an dengan makhraj yang fasih, pengamalan ibadah praktis, serta penanaman budi pekerti luhur sejak usia dini.'
    ],
    programs: [
      {
        id: 'p-1',
        title: 'Tahsin & Baca Tulis Al-Qur’an (BTQ)',
        description: 'Pembelajaran membaca Al-Qur’an dengan kaidah tajwid yang benar dan menulis huruf hijaiyah.',
        iconName: 'BookOpen'
      },
      {
        id: 'p-2',
        title: 'Dasar Aqidah & Rukun Iman',
        description: 'Pemahaman tauhid dan keimanan dengan pendekatan yang mudah dipahami anak-anak.',
        iconName: 'HeartHandshake'
      },
      {
        id: 'p-3',
        title: 'Praktik Fiqih Ibadah & Doa Harian',
        description: 'Bimbingan wudhu, shalat fardhu/sunnah, hafalan doa sehari-hari, dan surat-surat pendek.',
        iconName: 'Sparkles'
      },
      {
        id: 'p-4',
        title: 'Pendidikan Akhlak & Adab Islami',
        description: 'Penanaman rasa hormat kepada orang tua, guru, sesama teman, serta adab makan dan tidur.',
        iconName: 'UserCheck'
      },
      {
        id: 'p-5',
        title: 'Kisah Para Nabi & Sahabat (Tarikh)',
        description: 'Keteladanan sejarah perjuangan Rasulullah SAW dan para sahabat untuk inspirasi kebaikan.',
        iconName: 'Scroll'
      },
      {
        id: 'p-6',
        title: 'Bahasa Arab Dasar Anak',
        description: 'Pengenalan kosa kata sehari-hari, nama benda, angka, dan percakapan sederhana.',
        iconName: 'Languages'
      }
    ],
    facilities: [
      { id: 'f-1', name: 'Ruang Kelas Diniyah yang Nyaman', image: '/uploads/gallery/madrasah1.png' },
      { id: 'f-2', name: 'Perpustakaan Kitab & Cerita Islami', image: '/uploads/gallery/madrasah2.png' },
      { id: 'f-3', name: 'Masjid & Area Praktik Wudhu Terbuka', image: '/uploads/gallery/madrasah4.png' }
    ],
    activities: [
      { id: 'a-1', title: 'Halaqah Sorogan Iqro & Juz ‘Amma', description: 'Bimbingan membaca Al-Qur’an satu per satu dengan teliti.' },
      { id: 'a-2', title: 'Praktik Shalat Ashar Berjamaah', description: 'Pelatihan langsung tata cara shalat, adzan, dan iqamah bagi santri.' },
      { id: 'a-3', title: 'Hafalan Doa & Hadits Pilihan', description: 'Penyetoran hafalan doa harian dan adab islami.' },
      { id: 'a-4', title: 'Peringatan Hari Besar Islam (PHBI)', description: 'Pentas seni santri dan perlombaan islami di momen keagamaan.' },
      { id: 'a-5', title: 'Pesantren Kilat Ramadhan', description: 'Kegiatan intensif pembelajaran agama dan buka puasa bersama di bulan suci.' }
    ]
  }
};
