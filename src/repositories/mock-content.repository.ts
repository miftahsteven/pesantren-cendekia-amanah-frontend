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
  OrganizationMember
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

  async getAgendas(): Promise<Agenda[]> {
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
}

export const contentRepo = new MockContentRepository();
