import {
  SiteConfig,
  EducationUnit,
  NewsArticle,
  OpinionArticle,
  Agenda,
  Achievement,
  GalleryItem,
  Testimonial,
  Partner,
  Brochure,
  FAQ,
  ContactInfo,
  PPDBFormData,
  PPDBSubmissionResult,
  FacilityItem,
  OrganizationMember,
  CurriculumItem,
  PpdbLink
} from '@/types';
import { IContentRepository } from './content.repository';
import { siteConfig } from '@/content/mock/site';
import { educationUnits } from '@/content/mock/units';
import { newsArticles } from '@/content/mock/news';
import { opinionArticles } from '@/content/mock/opinions';
import { agendas } from '@/content/mock/agenda';
import { studentAchievements } from '@/content/mock/achievements';
import { galleryItems } from '@/content/mock/gallery';
import { testimonials } from '@/content/mock/testimonials';
import { partners } from '@/content/mock/partners';
import { brochures } from '@/content/mock/brochures';
import { faqs } from '@/content/mock/faq';
import { contactInfo } from '@/content/mock/contact';

export class MockContentRepository implements IContentRepository {
  async getSiteConfig(): Promise<SiteConfig> {
    return siteConfig;
  }

  async getEducationUnit(unitId: string): Promise<EducationUnit | null> {
    const unit = educationUnits[unitId];
    if (!unit) return null;
    return {
      ...unit,
      achievements: studentAchievements.filter((item) => item.unit === unitId)
    };
  }

  async getAllEducationUnits(): Promise<EducationUnit[]> {
    return Object.values(educationUnits).map((unit) => ({
      ...unit,
      achievements: studentAchievements.filter((item) => item.unit === unit.id)
    }));
  }

  async getCurriculums(unitSlug?: string): Promise<CurriculumItem[]> {
    const allCurriculums: CurriculumItem[] = [
      // SMP
      {
        id: 'mock-curr-smp-1',
        unitSlug: 'smp',
        unitName: 'SMP Cendekia Amanah',
        unitShortName: 'SMP',
        title: 'Kurikulum Nasional Merdeka Terpadu',
        badge: 'Standar Nasional & Karakter',
        icon: 'BookOpen',
        color: 'blue',
        description: 'Penerapan Kurikulum Merdeka yang disinergikan secara harmonis dengan nilai-nilai adab Islami, penguatan literasi-numerasi berstandar ANBK, dan pembelajaran berbasis projek (P5).',
        highlights: [
          'Projek Penguatan Profil Pelajar Pancasila (P5) tematik',
          'Differentiated learning sesuai gaya belajar & potensi siswa',
          'Praktikum terpadu sains, matematika, dan teknologi',
          'Asesmen formatif & diagnostik berkala untuk pemetaan prestasi'
        ],
        sortOrder: 1,
        isActive: true
      },
      {
        id: 'mock-curr-smp-2',
        unitSlug: 'smp',
        unitName: 'SMP Cendekia Amanah',
        unitShortName: 'SMP',
        title: 'Tahfidz Al-Qur’an & Nilai Diniyah',
        badge: 'Tartil & Sanad Keilmuan',
        icon: 'Award',
        color: 'amber',
        description: 'Program bimbingan tahfidz terstruktur dengan target mutqin Juz 28, 29, dan 30 (plus juz pilihan) yang diampu oleh musyrif tahfidz bersanad, dipadukan materi Fiqih dan Aqidah praktis.',
        highlights: [
          'Metode Talaqqi, Tasmi’, dan Ziyadah harian terarah',
          'Khataman tasmi’ berkala sekali duduk di hadapan wali santri',
          'Bimbingan tajwid standar Jazariyah & makharijul huruf',
          'Pembiasaan shalat berjamaah, dhuha, dan dzikir Ma’tsurat'
        ],
        sortOrder: 2,
        isActive: true
      },
      {
        id: 'mock-curr-smp-3',
        unitSlug: 'smp',
        unitName: 'SMP Cendekia Amanah',
        unitShortName: 'SMP',
        title: 'Digital Smart Classroom & AI Literacy',
        badge: 'Teknologi & Inovasi 4.0',
        icon: 'Laptop',
        color: 'emerald',
        description: 'Pemanfaatan interactive board, platform pembelajaran cerdas, dan pengenalan literasi komputasional sejak dini agar siswa cakap teknologi dan bijak berinternet.',
        highlights: [
          'Ruang kelas modern dengan Interactive Display Screen',
          'Pengenalan dasar Coding, Robotika, dan logika komputasi',
          'Ujian terstandar Computer-Based Testing (CBT)',
          'Edukasi etika digital & pemanfaatan Artificial Intelligence (AI)'
        ],
        sortOrder: 3,
        isActive: true
      },
      {
        id: 'mock-curr-smp-4',
        unitSlug: 'smp',
        unitName: 'SMP Cendekia Amanah',
        unitShortName: 'SMP',
        title: 'Bilingual Classroom (Arab & Inggris)',
        badge: 'Komunikasi Global',
        icon: 'Languages',
        color: 'rose',
        description: 'Pembiasaan bahasa internasional melalui Morning Vocabulary, English & Arabic Club, serta percakapan harian untuk melatih kepercayaan diri siswa di forum global.',
        highlights: [
          'Morning Talk & Daily Vocabulary Enrichment',
          'English & Arabic Public Speaking (Muhadhoroh)',
          'Pelatihan speech contest, storytelling, dan debat ilmiah',
          'Program pendampingan native speaker & foreign cultural exchange'
        ],
        sortOrder: 4,
        isActive: true
      },

      // SMA
      {
        id: 'mock-curr-sma-1',
        unitSlug: 'sma',
        unitName: 'SMA Cendekia Amanah',
        unitShortName: 'SMA',
        title: 'Kurikulum Merdeka & Peminatan Lanjutan (Fase F)',
        badge: 'Standar Nasional & Peminatan',
        icon: 'BookOpen',
        color: 'blue',
        description: 'Penerapan Kurikulum Merdeka Fase F yang fleksibel dan terarah, memfasilitasi pilihan mata pelajaran peminatan sesuai orientasi prodi perguruan tinggi (Kedokteran, Teknik, Sains Terapan, Humaniora, & Ekonomi Syariah).',
        highlights: [
          'Pemilihan rumpun mata pelajaran peminatan terarah sesuai minat studi',
          'Pembelajaran berpikir tingkat tinggi (Higher Order Thinking Skills / HOTS)',
          'Projek Penguatan Profil Pelajar Pancasila (P5) berbasis pengabdian',
          'Asesmen formatif & diagnostik berkala untuk optimalisasi nilai rapor SNBP'
        ],
        sortOrder: 1,
        isActive: true
      },
      {
        id: 'mock-curr-sma-2',
        unitSlug: 'sma',
        unitName: 'SMA Cendekia Amanah',
        unitShortName: 'SMA',
        title: 'Program Akselerasi Sukses PTN & Beasiswa Global',
        badge: 'Tembus Kampus Impian',
        icon: 'GraduationCap',
        color: 'amber',
        description: 'Program pendampingan komprehensif untuk mengantarkan santri menembus PTN Favorit serta perguruan tinggi bergengsi luar negeri.',
        highlights: [
          'Bimbingan intensif UTBK-SNBT & pembedahan materi skolastik berkala',
          'Simulasi Try Out terstandar dengan analisis skor Item Response Theory (IRT)',
          'Bimbingan beasiswa Al-Azhar Kairo, Timur Tengah, dan beasiswa internasional',
          'Konsultasi pemetaan karir dan peluang passing grade jurusan PTN favorit'
        ],
        sortOrder: 2,
        isActive: true
      },
      {
        id: 'mock-curr-sma-3',
        unitSlug: 'sma',
        unitName: 'SMA Cendekia Amanah',
        unitShortName: 'SMA',
        title: 'Karya Ilmiah Remaja (KIR) & Laboratorium Riset',
        badge: 'Kultur Riset & Sains',
        icon: 'Microscope',
        color: 'emerald',
        description: 'Pengembangan nalar analitis dan daya cipta santri melalui riset ilmiah terpandu di laboratorium modern, penulisan artikel ilmiah, serta keikutsertaan dalam kompetisi sains.',
        highlights: [
          'Bimbingan penyusunan Karya Tulis Ilmiah (KTI) syarat kelulusan',
          'Praktikum terpadu di Laboratorium Fisika, Kimia, Biologi, & Komputer',
          'Klinik pembinaan Olimpiade Sains Nasional (OSN) & Lomba Karya Ilmiah',
          'Pengembangan proyek digitalisasi, Internet of Things (IoT), dan kecerdasan buatan'
        ],
        sortOrder: 3,
        isActive: true
      },
      {
        id: 'mock-curr-sma-4',
        unitSlug: 'sma',
        unitName: 'SMA Cendekia Amanah',
        unitShortName: 'SMA',
        title: 'Tahfidz Al-Qur’an Lanjutan & Kepemimpinan Santri',
        badge: 'Karakter & Spiritual Mutqin',
        icon: 'Award',
        color: 'rose',
        description: 'Pemantapan hafalan Al-Qur’an mutqin hingga bersanad, pendalaman literatur Fiqih kontemporer dan Ushul Fiqih, serta latihan kepemimpinan manajerial berasrama.',
        highlights: [
          'Target hafalan Al-Qur’an mutqin bersanad bagi kelas takhasus',
          'Kajian Fiqih Muamalah, Ushul Fiqih, dan Hadits Tematik kepemimpinan',
          'Penguatan kemampuan diplomasi dan pidato 3 bahasa (Arab, Inggris, Indonesia)',
          'Organisasi santri mandiri untuk melatih kepemimpinan transformasional'
        ],
        sortOrder: 4,
        isActive: true
      },

      // Pesantren
      {
        id: 'mock-curr-pes-1',
        unitSlug: 'pesantren',
        unitName: 'Pesantren Cendekia Amanah',
        unitShortName: 'Pesantren',
        title: 'Tahfidz Al-Qur’an Bersanad 30 Juz',
        badge: 'Tahfidz & Tajwid',
        icon: 'BookOpen',
        color: 'blue',
        description: 'Bimbingan hafalan Al-Qur’an intensif dengan metode Talaqqi & Tasmi’ bersanad resmi Jazariyah, setoran harian (ziyadah), muraja’ah berkala, dan sertifikasi kelulusan tahfidz.',
        highlights: [
          'Target hafalan bertahap & terukur',
          'Metode Talaqqi face-to-face bersama muhaffidz bersanad',
          'Khataman & Tasmi’ 5 s.d. 30 Juz sekali duduk',
          'Pembinaan makhorijul huruf & tartil Al-Qur’an'
        ],
        sortOrder: 1,
        isActive: true
      },
      {
        id: 'mock-curr-pes-2',
        unitSlug: 'pesantren',
        unitName: 'Pesantren Cendekia Amanah',
        unitShortName: 'Pesantren',
        title: 'Dirasah Islamiyah (Kitab Kuning / Turats)',
        badge: 'Turats Salaf',
        icon: 'Scroll',
        color: 'amber',
        description: 'Pendalaman literatur klasik Islam bermazhab Syafi’i dengan sanad keilmuan yang bersambung langsung kepada para ulama mu’allif kitab hingga Rasulullah SAW.',
        highlights: [
          'Aqidah: Aqidatul Awwam, Tijanud Darori, Jawahirul Kalamiyah',
          'Fiqih: Safinatun Najah, Sullamut Taufiq, Fathul Qorib',
          'Akhlak: Taisirul Khalaq, Akhlaq Lil Banin, Ta’limul Muta’allim',
          'Gramatika: Matan Al-Jurumiyyah, Al-Amtsilah At-Tashrifiyyah'
        ],
        sortOrder: 2,
        isActive: true
      },
      {
        id: 'mock-curr-pes-3',
        unitSlug: 'pesantren',
        unitName: 'Pesantren Cendekia Amanah',
        unitShortName: 'Pesantren',
        title: 'Biah Lughawiyyah (Bahasa Arab & Inggris Aktif)',
        badge: 'Lingkungan Berbahasa',
        icon: 'Languages',
        color: 'emerald',
        description: 'Penerapan lingkungan asrama dwibahasa yang dinamis untuk membiasakan santri cakap berkomunikasi secara lisan dan tulisan dalam percakapan sehari-hari dan forum resmi.',
        highlights: [
          'Muhadatsah yaumiyyah (percakapan tematik harian)',
          'Muhadhoroh 3 Bahasa (latihan pidato Arab, Inggris, Indonesia)',
          'Mufrodat yaumiyyah (pengayaan kosakata setiap hari)',
          'Latihan insya’ (menulis artikel & essai bahasa Arab)'
        ],
        sortOrder: 3,
        isActive: true
      },
      {
        id: 'mock-curr-pes-4',
        unitSlug: 'pesantren',
        unitName: 'Pesantren Cendekia Amanah',
        unitShortName: 'Pesantren',
        title: 'Pembinaan Akhlak, Adab & Karakter 24 Jam',
        badge: 'Tarbiyah & Adab',
        icon: 'Award',
        color: 'rose',
        description: 'Penanaman nilai-nilai adab santri, kemandirian hidup berasrama, kedisiplinan ibadah, kepemimpinan organisasi, serta kepekaan sosial kemasyarakatan.',
        highlights: [
          'Shalat lima waktu berjamaah di masjid & Qiyamul Lail',
          'Dzikir & wirid harian Al-Ma’tsurat / Ratibul Haddad',
          'Latihan kepemimpinan santri (OSIS, IPNU/IPPNU)',
          'Bimbingan konseling dan asuhan asatidz pembina asrama'
        ],
        sortOrder: 4,
        isActive: true
      },

      // MDTA
      {
        id: 'mock-curr-diniyah-1',
        unitSlug: 'diniyah',
        unitName: 'Madrasah Diniyah Takmiliyah Awaliyah',
        unitShortName: 'MDTA',
        title: "Baca Tulis Al-Qur'an (BTQ) & Tahsin",
        badge: 'Tartil & Tajwid',
        icon: 'BookOpen',
        color: 'blue',
        description: "Bimbingan membaca Al-Qur'an dengan kaidah tajwid yang benar menggunakan metode Iqro' bertahap, disertai latihan menulis huruf hijaiyah dan pengenalan makhraj serta sifatul huruf.",
        highlights: [
          "Metode Iqro' bertahap dari jilid 1 sampai Al-Qur'an",
          "Pengenalan hukum tajwid dasar: idzhar, ikhfa', idgham, iqlab",
          "Hafalan Juz 'Amma (Juz 30) dan surat-surat pilihan",
          "Latihan menulis huruf hijaiyah dan kaligrafi dasar"
        ],
        sortOrder: 1,
        isActive: true
      },
      {
        id: 'mock-curr-diniyah-2',
        unitSlug: 'diniyah',
        unitName: 'Madrasah Diniyah Takmiliyah Awaliyah',
        unitShortName: 'MDTA',
        title: "Aqidah Ahlussunnah wal Jama'ah",
        badge: 'Fondasi Keimanan',
        icon: 'HeartHandshake',
        color: 'amber',
        description: 'Penanaman dasar-dasar keimanan (Rukun Iman & Rukun Islam) dengan pendekatan yang mudah dipahami anak-anak, berdasarkan tuntunan Ahlussunnah wal Jama\'ah dan dalil-dalil shahih.',
        highlights: [
          'Pemahaman Rukun Iman enam perkara secara mendalam',
          'Pendalaman makna dua kalimat syahadat',
          'Kisah para Nabi & Rasul sebagai teladan keimanan',
          'Kitab rujukan: Aqidatul Awwam & Tijanud Darori'
        ],
        sortOrder: 2,
        isActive: true
      },
      {
        id: 'mock-curr-diniyah-3',
        unitSlug: 'diniyah',
        unitName: 'Madrasah Diniyah Takmiliyah Awaliyah',
        unitShortName: 'MDTA',
        title: 'Fiqih Ibadah Praktis & Doa Harian',
        badge: 'Ibadah & Amaliyah',
        icon: 'ShieldCheck',
        color: 'emerald',
        description: 'Pembelajaran tata cara ibadah yang benar sesuai mazhab Syafi\'i, mulai dari bersuci (thaharah), wudhu, shalat fardhu & sunnah, hingga puasa dan hafalan doa sehari-hari.',
        highlights: [
          'Praktik langsung wudhu, tayammum, dan mandi wajib',
          'Tata cara shalat fardhu, sunnah rawatib, dan shalat jenazah',
          'Hafalan bacaan shalat lengkap dengan artinya',
          'Kitab rujukan: Safinatun Najah & Sullamut Taufiq'
        ],
        sortOrder: 3,
        isActive: true
      },
      {
        id: 'mock-curr-diniyah-4',
        unitSlug: 'diniyah',
        unitName: 'Madrasah Diniyah Takmiliyah Awaliyah',
        unitShortName: 'MDTA',
        title: 'Akhlak Mulia & Adab Islami',
        badge: 'Tarbiyah & Adab',
        icon: 'Scroll',
        color: 'rose',
        description: 'Penanaman budi pekerti luhur, sopan santun kepada orang tua, guru, dan sesama, serta penghayatan nilai-nilai akhlak terpuji melalui keteladanan dan pembiasaan sehari-hari.',
        highlights: [
          'Adab kepada kedua orang tua, guru, dan teman sebaya',
          'Pembiasaan 5S: Senyum, Salam, Sapa, Sopan, Santun',
          'Kisah para Sahabat Nabi sebagai inspirasi akhlak',
          'Kitab rujukan: Taisirul Khalaq & Akhlaq Lil Banin'
        ],
        sortOrder: 4,
        isActive: true
      }
    ];

    if (!unitSlug || unitSlug === 'ALL' || unitSlug === 'all') {
      return allCurriculums;
    }

    const targetSlug = unitSlug.toLowerCase() === 'mdta' ? 'diniyah' : unitSlug.toLowerCase();
    return allCurriculums.filter(
      (c) => c.unitSlug?.toLowerCase() === targetSlug
    );
  }

  async getFacilities(unitSlug?: string): Promise<FacilityItem[]> {
    const allFacilities: FacilityItem[] = [];
    Object.values(educationUnits).forEach((unit) => {
      if (unitSlug && unitSlug !== 'ALL' && unit.id !== unitSlug) return;
      unit.facilities.forEach((fac, idx) => {
        allFacilities.push({
          id: fac.id || `${unit.id}-fac-${idx}`,
          name: fac.name,
          description: fac.description || `Sarana prasarana penunjang kegiatan di ${unit.name}.`,
          imageUrl: fac.image || '/uploads/gallery/pesantren1.png',
          unitId: unit.id,
          unitName: unit.name,
          unitShortName: unit.shortName,
          unitSlug: unit.id,
          unitBadge: unit.badge,
          sortOrder: idx + 1,
          isActive: true
        });
      });
    });
    return allFacilities;
  }

  async getOrganizationMembers(unitSlug?: string): Promise<OrganizationMember[]> {
    const mockList: OrganizationMember[] = [
      // SMP
      {
        id: 'smp-org-1',
        name: 'Ust. H. Nurul Huda, S.Pd.I., M.Pd.',
        position: 'Kepala Sekolah SMP Cendekia',
        category: 'Pimpinan & Manajemen',
        level: 1,
        photoUrl: '/uploads/gallery/guru1.png',
        nip: 'NIY. 20180901001',
        education: 'S2 Manajemen Pendidikan Islam - UIN Syarif Hidayatullah',
        bio: 'Berpengalaman lebih dari 15 tahun dalam manajemen pendidikan terpadu dan pembinaan akhlak santri usia remaja.',
        sortOrder: 1,
        isActive: true,
        unitSlug: 'smp',
        unitName: 'SMP Pesantren Cendekia Amanah'
      },
      {
        id: 'smp-org-2',
        name: 'Ustz. Siti Rahmah, S.Pd., Gr.',
        position: 'Wakil Kepala Bidang Kurikulum',
        category: 'Pimpinan & Manajemen',
        level: 2,
        photoUrl: '/uploads/gallery/guru2.png',
        nip: 'NIY. 20190701015',
        education: 'S1 Pendidikan Matematika - Universitas Negeri Jakarta (UNJ)',
        bio: 'Pengembang kurikulum integrasi Sains & Tahfidz serta koordinator program Olimpiade Sains Nasional (OSN).',
        sortOrder: 2,
        isActive: true,
        unitSlug: 'smp',
        unitName: 'SMP Pesantren Cendekia Amanah'
      },
      {
        id: 'smp-org-3',
        name: 'Ust. Muhammad Rizki, S.Kom., M.T.',
        position: 'Wakil Kepala Bidang Kesiswaan & IT',
        category: 'Pimpinan & Manajemen',
        level: 2,
        photoUrl: '/uploads/gallery/guru3.png',
        nip: 'NIY. 20200801024',
        education: 'S2 Informatika - Institut Teknologi Bandung (ITB)',
        bio: 'Pembina kegiatan ekstrakurikuler robotik, coding santri, dan kedisiplinan asrama putra.',
        sortOrder: 3,
        isActive: true,
        unitSlug: 'smp',
        unitName: 'SMP Pesantren Cendekia Amanah'
      },
      {
        id: 'smp-org-4',
        name: 'Ust. Ahmad Fauzan, Lc., M.Ag.',
        position: 'Koordinator Tahfidz & Bahasa Arab',
        category: 'Dewan Guru & Pengajar',
        level: 3,
        photoUrl: '/uploads/gallery/guru4.png',
        nip: 'NIY. 20190101008',
        education: "S1 Al-Azhar University Kairo, S2 Ilmu Al-Qur'an",
        bio: 'Pengampu Tahsin bersanad Jazariyah, pembimbing mutqin 30 juz santri SMP.',
        sortOrder: 4,
        isActive: true,
        unitSlug: 'smp',
        unitName: 'SMP Pesantren Cendekia Amanah'
      },
      {
        id: 'smp-org-5',
        name: 'Ustz. Dewi Lestari, S.Si., M.Pd.',
        position: 'Guru IPA & Pembina Riset Junior',
        category: 'Dewan Guru & Pengajar',
        level: 3,
        photoUrl: '/uploads/gallery/guru5.png',
        nip: 'NIY. 20210701032',
        education: 'S1 Biologi - Universitas Indonesia',
        bio: 'Membimbing riset sains lingkungan santri dan praktikum laboratorium terpadu.',
        sortOrder: 5,
        isActive: true,
        unitSlug: 'smp',
        unitName: 'SMP Pesantren Cendekia Amanah'
      },
      {
        id: 'smp-org-6',
        name: 'Ust. Farhan Pratama, S.Pd.',
        position: 'Wali Kelas VII & Guru Bahasa Inggris',
        category: 'Wali Kelas & Kesiswaan',
        level: 3,
        photoUrl: '/uploads/gallery/guru6.png',
        nip: 'NIY. 20220801041',
        education: 'S1 Pendidikan Bahasa Inggris - UPI Bandung',
        bio: 'Mentor program English Camp & Native Speaking Practice santri baru.',
        sortOrder: 6,
        isActive: true,
        unitSlug: 'smp',
        unitName: 'SMP Pesantren Cendekia Amanah'
      },
      // SMA
      {
        id: 'sma-org-1',
        name: 'Dr. H. Muhammad Ilyas, M.Ag.',
        position: 'Kepala Sekolah SMA Cendekia',
        category: 'Pimpinan & Manajemen',
        level: 1,
        photoUrl: '/uploads/gallery/guru1.png',
        nip: 'NIY. 20170801002',
        education: 'Doktor Manajemen Pendidikan Islam - Pascasarjana UIN',
        bio: 'Fokus pada kepemimpinan transformasional, keunggulan riset, dan kelulusan santri ke PTN Favorit serta Luar Negeri.',
        sortOrder: 1,
        isActive: true,
        unitSlug: 'sma',
        unitName: 'SMA Pesantren Cendekia Amanah'
      },
      {
        id: 'sma-org-2',
        name: 'Ust. Bambang Kurniawan, M.Si.',
        position: 'Wakil Kepala Bidang Kurikulum & PTN',
        category: 'Pimpinan & Manajemen',
        level: 2,
        photoUrl: '/uploads/gallery/guru2.png',
        nip: 'NIY. 20180701011',
        education: 'Magister Fisika Terapan - Institut Teknologi Sepuluh Nopember (ITS)',
        bio: 'Koordinator bimbingan intensif UTBK-SNBT dan seleksi beasiswa internasional (Timur Tengah, Turki, Eropa).',
        sortOrder: 2,
        isActive: true,
        unitSlug: 'sma',
        unitName: 'SMA Pesantren Cendekia Amanah'
      },
      {
        id: 'sma-org-3',
        name: 'Ustz. Dra. Hj. Nurul Inayah, M.Pd.',
        position: 'Wakil Kepala Bidang Kesiswaan & Kedisiplinan',
        category: 'Pimpinan & Manajemen',
        level: 2,
        photoUrl: '/uploads/gallery/guru3.png',
        nip: 'NIY. 20180901019',
        education: 'S2 Bimbingan & Konseling Remaja - UNJ',
        bio: 'Pendamping psikologis, pembina organisasi santri (OSIS/IPNU/IPPNU), dan keputrian.',
        sortOrder: 3,
        isActive: true,
        unitSlug: 'sma',
        unitName: 'SMA Pesantren Cendekia Amanah'
      },
      {
        id: 'sma-org-4',
        name: 'Ust. Dr. Arif Rahman Hakim, Lc., M.H.I.',
        position: 'Koordinator Kajian Turats & Bahtsul Masail',
        category: 'Dewan Guru & Pengajar',
        level: 3,
        photoUrl: '/uploads/gallery/guru4.png',
        nip: 'NIY. 20190101007',
        education: 'Doktor Syariah & Hukum Islam - UIN Sunan Kalijaga',
        bio: "Pengampu kitab Fathul Qorib, Fathul Mu'in, dan metodologi istinbath hukum Islam modern.",
        sortOrder: 4,
        isActive: true,
        unitSlug: 'sma',
        unitName: 'SMA Pesantren Cendekia Amanah'
      },
      {
        id: 'sma-org-5',
        name: 'Ustz. Ratna Sari, S.Kom., M.Cs.',
        position: 'Guru Sains Komputer & AI Literacy',
        category: 'Dewan Guru & Pengajar',
        level: 3,
        photoUrl: '/uploads/gallery/guru5.png',
        nip: 'NIY. 20210801037',
        education: 'S2 Ilmu Komputer - Universitas Gadjah Mada (UGM)',
        bio: 'Pengajar Web Development, Python Data Science, dan pembimbing Lomba Karya Ilmiah Remaja (LKIR).',
        sortOrder: 5,
        isActive: true,
        unitSlug: 'sma',
        unitName: 'SMA Pesantren Cendekia Amanah'
      },
      {
        id: 'sma-org-6',
        name: 'Ust. Hendra Wijaya, S.Pd.',
        position: 'Wali Kelas XII & Guru Sosiologi',
        category: 'Wali Kelas & Kesiswaan',
        level: 3,
        photoUrl: '/uploads/gallery/guru6.png',
        nip: 'NIY. 20200801028',
        education: 'S1 Pendidikan Sosiologi - Universitas Negeri Malang',
        bio: 'Wali kelas sukses mengantarkan santri angkatan kelulusan ke berbagai universitas negeri favorit.',
        sortOrder: 6,
        isActive: true,
        unitSlug: 'sma',
        unitName: 'SMA Pesantren Cendekia Amanah'
      },
      // PESANTREN
      {
        id: 'pes-org-1',
        name: 'KH. M. Cholil Nafis, Lc., M.A., Ph.D.',
        position: 'Pengasuh Pesantren Cendekia Amanah',
        category: 'Pimpinan & Pengasuh',
        level: 1,
        photoUrl: '/uploads/gallery/guru1.png',
        nip: 'Pengasuh Utama',
        education: 'Ph.D Universiti Malaya | S1 Al-Azhar University Kairo',
        bio: 'Ketua MUI Pusat, Dosen Pascasarjana UI & UIN Jakarta, pembina generasi Qurani dan kepemimpinan umat.',
        sortOrder: 1,
        isActive: true,
        unitSlug: 'pesantren',
        unitName: 'Pesantren Cendekia Amanah'
      },
      {
        id: 'pes-org-2',
        name: 'Dr. KH. M. Ilyas, M.Ag.',
        position: 'Direktur Pendidikan & Kepesantrenan',
        category: 'Pimpinan & Pengasuh',
        level: 2,
        photoUrl: '/uploads/gallery/guru2.png',
        nip: 'NIY. 20170801001',
        education: 'Doktor Manajemen Pendidikan Islam - UIN Jakarta',
        bio: 'Mengarahkan integrasi kurikulum kepesantrenan dan pembinaan kemandirian santri 24 jam.',
        sortOrder: 2,
        isActive: true,
        unitSlug: 'pesantren',
        unitName: 'Pesantren Cendekia Amanah'
      },
      {
        id: 'pes-org-3',
        name: 'Ust. H. Ahmad Fauzan, Lc., M.Ag.',
        position: 'Koordinator Tahfidz Al-Qur’an & Bahasa Arab',
        category: 'Pimpinan & Pengasuh',
        level: 2,
        photoUrl: '/uploads/gallery/guru3.png',
        nip: 'NIY. 20180901003',
        education: 'S1 Al-Azhar University Kairo, S2 Ilmu Al-Qur’an',
        bio: 'Pemegang sanad Qira’at Hafsh ‘an ‘Ashim, pembina tahfidz mutqin 30 juz dan Biah Lughawiyyah.',
        sortOrder: 3,
        isActive: true,
        unitSlug: 'pesantren',
        unitName: 'Pesantren Cendekia Amanah'
      },
      {
        id: 'pes-org-4',
        name: 'Ust. Dr. Arif Rahman Hakim, Lc., M.H.I.',
        position: 'Koordinator Kajian Turats & Bahtsul Masail',
        category: 'Dewan Asatidz & Pengajar',
        level: 2,
        photoUrl: '/uploads/gallery/guru4.png',
        nip: 'NIY. 20190101007',
        education: 'Doktor Syariah & Hukum Islam - UIN Sunan Kalijaga',
        bio: 'Pengampu kajian Fathul Qorib, Fiqih Perbandingan Mazhab, dan metodologi istinbath hukum Islam kontemporer.',
        sortOrder: 4,
        isActive: true,
        unitSlug: 'pesantren',
        unitName: 'Pesantren Cendekia Amanah'
      },
      {
        id: 'pes-org-5',
        name: 'Ust. Muhammad Rizki Al-Hafidz, S.Ag.',
        position: 'Kepala Asrama & Pengasuhan Santri Putra',
        category: 'Pengasuhan & Keasramaan',
        level: 3,
        photoUrl: '/uploads/gallery/guru5.png',
        nip: 'NIY. 20200801025',
        education: 'S1 Ilmu Al-Qur’an & Tafsir - PTIQ Jakarta',
        bio: 'Hafidz 30 Juz bersanad, penanggung jawab kedisiplinan, qiyamul lail, dan pembiasaan adab santri putra.',
        sortOrder: 5,
        isActive: true,
        unitSlug: 'pesantren',
        unitName: 'Pesantren Cendekia Amanah'
      },
      {
        id: 'pes-org-6',
        name: 'Ustz. Hj. Siti Fatimah, S.Th.I., M.Pd.',
        position: 'Kepala Pengasuhan & Keasramaan Santri Putri',
        category: 'Pengasuhan & Keasramaan',
        level: 3,
        photoUrl: '/uploads/gallery/guru6.png',
        nip: 'NIY. 20210701033',
        education: 'S2 Pendidikan Islam - Universitas Ibn Khaldun (UIKA)',
        bio: 'Pembina asrama putri, pengampu kajian keputrian Fiqih Nisa, dan pembina halaqah tahfidz santriwati.',
        sortOrder: 6,
        isActive: true,
        unitSlug: 'pesantren',
        unitName: 'Pesantren Cendekia Amanah'
      }
    ];

    if (unitSlug && unitSlug !== 'ALL') {
      return mockList.filter((m) => m.unitSlug === unitSlug);
    }
    return mockList;
  }

  async getNewsArticles(category?: string, query?: string): Promise<NewsArticle[]> {
    let list = [...newsArticles];

    if (category && category !== 'Semua' && category !== 'Semua Berita') {
      list = list.filter((item) => item.category.toLowerCase() === category.toLowerCase());
    }

    if (query && query.trim() !== '') {
      const q = query.toLowerCase().trim();
      list = list.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.excerpt.toLowerCase().includes(q) ||
          item.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    return list;
  }

  async getNewsBySlug(slug: string): Promise<NewsArticle | null> {
    return newsArticles.find((item) => item.slug === slug) || null;
  }

  async getPopularNews(limit = 5): Promise<NewsArticle[]> {
    const popular = newsArticles.filter((item) => item.isPopular);
    return popular.slice(0, limit);
  }

  async getRelatedNews(currentSlug: string, category: string, limit = 3): Promise<NewsArticle[]> {
    return newsArticles
      .filter((item) => item.slug !== currentSlug && (item.category === category || item.isPopular))
      .slice(0, limit);
  }

  async getOpinionArticles(): Promise<OpinionArticle[]> {
    return opinionArticles;
  }

  async getOpinionBySlug(slug: string): Promise<OpinionArticle | null> {
    return opinionArticles.find((item) => item.slug === slug) || null;
  }

  async getFeaturedOpinion(): Promise<OpinionArticle | null> {
    return opinionArticles.find((item) => item.isFeatured) || opinionArticles[0] || null;
  }

  async getAgendas(unit?: string): Promise<Agenda[]> {
    if (unit && unit !== 'all') {
      return agendas.filter((item) => (item as any).unit === unit || item.unitId === unit);
    }
    return agendas;
  }

  async getAchievements(unit?: string): Promise<Achievement[]> {
    if (unit && unit !== 'all') {
      return studentAchievements.filter((item) => item.unit === unit);
    }
    return studentAchievements;
  }

  async getHomeAchievements(): Promise<Achievement[]> {
    const units: ('pesantren' | 'diniyah' | 'smp' | 'sma')[] = ['pesantren', 'diniyah', 'smp', 'sma'];
    const result: Achievement[] = [];
    for (const u of units) {
      const items = studentAchievements.filter((item) => item.unit === u).slice(0, 2);
      result.push(...items);
    }
    return result.length > 0 ? result : studentAchievements.slice(0, 8);
  }

  async getGalleryItems(category?: string): Promise<GalleryItem[]> {
    if (category && category !== 'all') {
      return galleryItems.filter((item) => item.category === category);
    }
    return galleryItems;
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return testimonials;
  }

  async getPartners(): Promise<Partner[]> {
    return partners;
  }

  async getBrochures(): Promise<Brochure[]> {
    return brochures;
  }

  async getFAQs(): Promise<FAQ[]> {
    return faqs;
  }

  async getContactInfo(): Promise<ContactInfo> {
    return contactInfo;
  }

  async submitPPDB(data: PPDBFormData): Promise<PPDBSubmissionResult> {
    // Generate deterministic registration number: CA-2027-XXXX
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const regNo = `CA-2027-${randomNum}`;

    return {
      success: true,
      registrationNumber: regNo,
      submittedAt: new Date().toISOString(),
      data
    };
  }

  async getPpdbLinks(): Promise<PpdbLink[]> {
    return [
      {
        id: 'mock-ppdb-sma',
        unitCode: 'sma',
        unitName: 'SMA Cendekia Amanah',
        title: 'SPMB 2027-2028 SMA PCA',
        description: 'Pendaftaran Peserta Didik Baru Jenjang SMA Boarding / Fullday School TP. 2027/2028',
        formUrl: 'https://bit.ly/SPMB_SMAPCA_27-28',
        academicYear: '2027/2028',
        badge: 'Boarding & Fullday',
        isActive: true,
        sortOrder: 1
      },
      {
        id: 'mock-ppdb-smp',
        unitCode: 'smp',
        unitName: 'SMP Cendekia Amanah',
        title: 'SPMB 2027-2028 SMP PCA',
        description: 'Pendaftaran Peserta Didik Baru Jenjang SMP Boarding / Fullday School TP. 2027/2028',
        formUrl: 'https://forms.gle/VTSESWSS3CzPFf7C6',
        academicYear: '2027/2028',
        badge: 'Boarding & Fullday',
        isActive: true,
        sortOrder: 2
      },
      {
        id: 'mock-ppdb-mdta',
        unitCode: 'mdta',
        unitName: 'Madrasah Diniyah (MDTA / MDTU)',
        title: 'SPMB 2027-2028 MDTA',
        description: 'Formulir Pendaftaran MDTU Cendekia Amanah (Pendidikan Keagamaan Non-Formal Sore)',
        formUrl: 'https://forms.gle/mBt9EyWuqf76ifsj9',
        academicYear: '2027/2028',
        badge: 'Non-Formal Sore',
        isActive: true,
        sortOrder: 3
      },
      {
        id: 'mock-ppdb-pesantren',
        unitCode: 'pesantren',
        unitName: 'Pesantren Cendekia Amanah',
        title: 'Pendaftaran Santri Pesantren 2027/2028',
        description: 'Program Kepesantrenan Terpadu, Tahfidz Al-Quran Bersanad, dan Bahasa Internasional',
        formUrl: 'https://bit.ly/SPMB_SMAPCA_27-28',
        academicYear: '2027/2028',
        badge: 'Boarding Pesantren',
        isActive: true,
        sortOrder: 4
      }
    ];
  }
}

export const contentRepo = new MockContentRepository();
