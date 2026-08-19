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

export interface IContentRepository {
  getSiteConfig(): Promise<SiteConfig>;
  getEducationUnit(unitId: string): Promise<EducationUnit | null>;
  getAllEducationUnits(): Promise<EducationUnit[]>;
  getNewsArticles(category?: string, query?: string): Promise<NewsArticle[]>;
  getNewsBySlug(slug: string): Promise<NewsArticle | null>;
  getPopularNews(limit?: number): Promise<NewsArticle[]>;
  getRelatedNews(currentSlug: string, category: string, limit?: number): Promise<NewsArticle[]>;
  getOpinionArticles(): Promise<OpinionArticle[]>;
  getOpinionBySlug(slug: string): Promise<OpinionArticle | null>;
  getFeaturedOpinion(): Promise<OpinionArticle | null>;
  getAgendas(): Promise<Agenda[]>;
  getAchievements(unit?: string): Promise<Achievement[]>;
  getHomeAchievements(): Promise<Achievement[]>;
  getGalleryItems(category?: string): Promise<GalleryItem[]>;
  getTestimonials(): Promise<Testimonial[]>;
  getPartners(): Promise<Partner[]>;
  getBrochures(): Promise<Brochure[]>;
  getFAQs(): Promise<FAQ[]>;
  getContactInfo(): Promise<ContactInfo>;
  submitPPDB(data: PPDBFormData): Promise<PPDBSubmissionResult>;
}

export { apiContentRepo as contentRepo } from './api-content.repository';
