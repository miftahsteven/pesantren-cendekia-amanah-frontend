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
  PPDBSubmissionResult
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
