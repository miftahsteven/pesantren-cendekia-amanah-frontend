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
  UnitType,
  FacilityItem,
  OrganizationMember
} from '@/types';
import { IContentRepository } from './content.repository';
import { MockContentRepository } from './mock-content.repository';
import { apiGet, apiPost } from '@/lib/api-client';

export class ApiContentRepository implements IContentRepository {
  private fallback = new MockContentRepository();

  async getSiteConfig(): Promise<SiteConfig> {
    try {
      const res = await apiGet<{ setting: any; socialLinks: any[] }>('/site');
      if (res && res.setting) {
        return {
          name: res.setting.siteName,
          tagline: res.setting.siteTagline,
          subTagline: res.setting.subTagline,
          description: res.setting.siteDescription,
          foundingYear: res.setting.foundingYear,
          motto: res.setting.motto,
          leader: {
            name: res.setting.leaderName,
            role: res.setting.leaderRole,
            title: res.setting.leaderTitle,
            photoUrl: res.setting.leaderPhotoUrl,
            quote: res.setting.leaderQuotes || []
          }
        };
      }
      return this.fallback.getSiteConfig();
    } catch {
      return this.fallback.getSiteConfig();
    }
  }

  async getEducationUnit(unitId: string): Promise<EducationUnit | null> {
    try {
      const unit = await apiGet<any>(`/units/${unitId}`);
      if (unit) {
        return {
          id: unit.code as UnitType,
          name: unit.name,
          shortName: unit.shortName || unit.name,
          badge: unit.badge || '',
          tagline: unit.tagline || '',
          description: unit.profileBody || [],
          heroImage: unit.heroImage || '/uploads/gallery/pesantren6.png',
          iconName: 'Building2',
          colorTheme: '#0B2F6B',
          features: unit.features || [],
          bulletPoints: unit.curriculumBody || [],
          programs: unit.programs || [],
          facilities: unit.facilities || [],
          activities: unit.activities || [],
          achievements: Array.isArray(unit.achievements)
            ? unit.achievements.map((ach: any) => ({
                id: ach.id,
                title: ach.title,
                winner: ach.winner,
                category: ach.category,
                competition: ach.category,
                year: ach.year,
                badge: ach.badge,
                rank: ach.badge,
                unit: (ach.unit?.code || unit.code || unitId) as UnitType,
                image: ach.imageUrl || '/uploads/units/juara1.jpg'
              }))
            : [],
          testimonials: unit.testimonials || [],
          whatsappNumber: '6285776446468'
        };
      }
      return this.fallback.getEducationUnit(unitId);
    } catch {
      return this.fallback.getEducationUnit(unitId);
    }
  }

  async getAllEducationUnits(): Promise<EducationUnit[]> {
    try {
      const units = await apiGet<any[]>('/units');
      if (units && units.length > 0) {
        return units.map((unit) => ({
          id: unit.code as UnitType,
          name: unit.name,
          shortName: unit.shortName || unit.name,
          badge: unit.badge || '',
          tagline: unit.tagline || '',
          description: unit.profileBody || [],
          heroImage: unit.heroImage || '/uploads/gallery/pesantren6.png',
          iconName: 'Building2',
          colorTheme: '#0B2F6B',
          features: unit.features || [],
          bulletPoints: unit.curriculumBody || [],
          programs: unit.programs || [],
          facilities: unit.facilities || [],
          activities: unit.activities || [],
          achievements: unit.achievements || [],
          testimonials: unit.testimonials || [],
          whatsappNumber: '6285776446468'
        }));
      }
      return this.fallback.getAllEducationUnits();
    } catch {
      return this.fallback.getAllEducationUnits();
    }
  }

  async getFacilities(unitSlug?: string): Promise<FacilityItem[]> {
    try {
      const params = new URLSearchParams();
      if (unitSlug && unitSlug !== 'ALL') {
        params.append('unitSlug', unitSlug);
      }
      const queryStr = params.toString() ? `?${params.toString()}` : '';
      const res = await apiGet<FacilityItem[]>(`/facilities${queryStr}`);
      if (res && Array.isArray(res) && res.length > 0) {
        return res;
      }
      return this.fallback.getFacilities(unitSlug);
    } catch {
      return this.fallback.getFacilities(unitSlug);
    }
  }

  async getOrganizationMembers(unitSlug?: string): Promise<OrganizationMember[]> {
    try {
      const params = new URLSearchParams();
      if (unitSlug && unitSlug !== 'ALL') {
        params.append('unitSlug', unitSlug);
      }
      const queryStr = params.toString() ? `?${params.toString()}` : '';
      const res = await apiGet<OrganizationMember[]>(`/organizations${queryStr}`);
      if (res && Array.isArray(res) && res.length > 0) {
        return res;
      }
      return this.fallback.getOrganizationMembers(unitSlug);
    } catch {
      return this.fallback.getOrganizationMembers(unitSlug);
    }
  }

  async getNewsArticles(category?: string, query?: string): Promise<NewsArticle[]> {
    try {
      const params = new URLSearchParams();
      if (category && category !== 'Semua' && category !== 'Semua Berita') {
        params.append('category', category.toLowerCase());
      }
      if (query && query.trim() !== '') {
        params.append('q', query.trim());
      }
      params.append('limit', '50');

      const url = `/news?${params.toString()}`;
      const items = await apiGet<any[]>(url);

      if (items && items.length > 0) {
        return items.map((art) => ({
          id: art.id,
          slug: art.slug,
          title: art.title,
          excerpt: art.excerpt,
          content: art.content || [],
          category: (art.category?.name || 'Pesantren') as any,
          author: art.author || 'Redaksi Cendekia Amanah',
          publishedAt: art.publishedDateText || '10 Mei 2026',
          readTime: '4 menit baca',
          viewsCount: Number(art.viewsCount || 0),
          featuredImage: art.featuredImage || '/uploads/news/wisuda.jpg',
          tags: art.articleTags?.map((t: any) => t.tag?.name) || [],
          isPopular: art.isPopular,
          highlightQuote: art.highlightQuote
        }));
      }
      return this.fallback.getNewsArticles(category, query);
    } catch {
      return this.fallback.getNewsArticles(category, query);
    }
  }

  async getNewsBySlug(slug: string): Promise<NewsArticle | null> {
    try {
      const art = await apiGet<any>(`/news/${slug}`);
      if (art) {
        return {
          id: art.id,
          slug: art.slug,
          title: art.title,
          excerpt: art.excerpt,
          content: art.content || [],
          category: (art.category?.name || 'Pesantren') as any,
          author: art.author || 'Redaksi Cendekia Amanah',
          publishedAt: art.publishedDateText || '10 Mei 2026',
          readTime: '4 menit baca',
          viewsCount: Number(art.viewsCount || 0),
          featuredImage: art.featuredImage || '/uploads/news/wisuda.jpg',
          tags: art.articleTags?.map((t: any) => t.tag?.name) || [],
          isPopular: art.isPopular,
          highlightQuote: art.highlightQuote
        };
      }
      return this.fallback.getNewsBySlug(slug);
    } catch {
      return this.fallback.getNewsBySlug(slug);
    }
  }

  async getPopularNews(limit = 5): Promise<NewsArticle[]> {
    const list = await this.getNewsArticles();
    return list.filter((item) => item.isPopular).slice(0, limit);
  }

  async getRelatedNews(currentSlug: string, category: string, limit = 3): Promise<NewsArticle[]> {
    const list = await this.getNewsArticles();
    return list
      .filter((item) => item.slug !== currentSlug && (item.category === category || item.isPopular))
      .slice(0, limit);
  }

  async getOpinionArticles(): Promise<OpinionArticle[]> {
    try {
      const items = await apiGet<any[]>('/opinions');
      if (items && items.length > 0) {
        return items.map((op) => ({
          id: op.id,
          slug: op.slug,
          title: op.title,
          excerpt: op.excerpt,
          content: op.content || [],
          author: {
            name: op.author?.name || 'KH. Cholil Nafis, Lc., MA., Ph.D',
            role: op.author?.role || 'Pengasuh Pesantren Cendekia Amanah',
            avatar: op.author?.avatar || '/uploads/guru/leader.png'
          },
          publishedAt: op.publishedDateText || '12 Mei 2026',
          readTime: op.readTime || '5 menit baca',
          featuredImage: op.featuredImage,
          isFeatured: op.isFeatured,
          tags: op.tags || [],
          highlightQuote: op.highlightQuote
        }));
      }
      return this.fallback.getOpinionArticles();
    } catch {
      return this.fallback.getOpinionArticles();
    }
  }

  async getOpinionBySlug(slug: string): Promise<OpinionArticle | null> {
    try {
      const op = await apiGet<any>(`/opinions/${slug}`);
      if (op) {
        return {
          id: op.id,
          slug: op.slug,
          title: op.title,
          excerpt: op.excerpt,
          content: op.content || [],
          author: {
            name: op.author?.name || 'KH. Cholil Nafis, Lc., MA., Ph.D',
            role: op.author?.role || 'Pengasuh Pesantren Cendekia Amanah',
            avatar: op.author?.avatar || '/uploads/guru/leader.png'
          },
          publishedAt: op.publishedDateText || '12 Mei 2026',
          readTime: op.readTime || '5 menit baca',
          featuredImage: op.featuredImage,
          isFeatured: op.isFeatured,
          tags: op.tags || [],
          highlightQuote: op.highlightQuote
        };
      }
      return this.fallback.getOpinionBySlug(slug);
    } catch {
      return this.fallback.getOpinionBySlug(slug);
    }
  }

  async getFeaturedOpinion(): Promise<OpinionArticle | null> {
    const list = await this.getOpinionArticles();
    return list.find((item) => item.isFeatured) || list[0] || null;
  }

  async getAgendas(): Promise<Agenda[]> {
    try {
      const items = await apiGet<any[]>('/agendas');
      if (items && items.length > 0) {
        return items.map((ag) => ({
          id: ag.id,
          day: ag.day,
          month: ag.month,
          year: ag.year,
          title: ag.title,
          time: ag.time,
          location: ag.location,
          status: ag.status
        }));
      }
      return this.fallback.getAgendas();
    } catch {
      return this.fallback.getAgendas();
    }
  }

  async getAchievements(unit?: string): Promise<Achievement[]> {
    try {
      const url = unit && unit !== 'all' ? `/achievements?unit=${unit}` : '/achievements';
      const items = await apiGet<any[]>(url);
      if (Array.isArray(items)) {
        return items.map((ach) => ({
          id: ach.id,
          title: ach.title,
          winner: ach.winner,
          category: ach.category,
          competition: ach.category,
          year: ach.year,
          badge: ach.badge,
          rank: ach.badge,
          unit: ach.unit?.code || (unit && unit !== 'all' ? unit : 'Global'),
          image: ach.imageUrl || '/uploads/units/juara1.jpg'
        }));
      }
      return this.fallback.getAchievements(unit);
    } catch {
      return this.fallback.getAchievements(unit);
    }
  }

  async getHomeAchievements(): Promise<Achievement[]> {
    try {
      const units = ['pesantren', 'diniyah', 'smp', 'sma'];
      const results = await Promise.all(
        units.map((u) => this.getAchievements(u))
      );
      const combined: Achievement[] = [];
      results.forEach((list) => {
        combined.push(...list.slice(0, 2));
      });
      if (combined.length > 0) return combined;
      return this.fallback.getHomeAchievements();
    } catch {
      return this.fallback.getHomeAchievements();
    }
  }

  async getGalleryItems(category?: string): Promise<GalleryItem[]> {
    try {
      const url = category && category !== 'all' ? `/galleries?category=${category}` : '/galleries';
      const res = await apiGet<{ items: any[]; albums: any[] }>(url);
      if (res && res.items && res.items.length > 0) {
        return res.items.map((item) => ({
          id: item.id,
          title: item.title,
          category: item.category as any,
          image: item.imageUrl || '/uploads/gallery/pesantren1.png',
          date: '2026'
        }));
      }
      return this.fallback.getGalleryItems(category);
    } catch {
      return this.fallback.getGalleryItems(category);
    }
  }

  async getTestimonials(): Promise<Testimonial[]> {
    try {
      const items = await apiGet<any[]>('/testimonials');
      if (items && items.length > 0) {
        return items.map((t) => ({
          id: t.id,
          author: t.author,
          role: t.role,
          category: t.category as any,
          content: t.content,
          avatar: t.avatar || '/uploads/guru/guru1.png'
        }));
      }
      return this.fallback.getTestimonials();
    } catch {
      return this.fallback.getTestimonials();
    }
  }

  async getPartners(): Promise<Partner[]> {
    try {
      const items = await apiGet<any[]>('/partners');
      if (items && items.length > 0) {
        return items.map((p) => ({
          id: p.id,
          name: p.name,
          logo: p.logo,
          url: p.websiteUrl
        }));
      }
      return this.fallback.getPartners();
    } catch {
      return this.fallback.getPartners();
    }
  }

  async getBrochures(): Promise<Brochure[]> {
    try {
      const items = await apiGet<any[]>('/brochures');
      if (items && items.length > 0) {
        return items.map((b) => ({
          id: b.id,
          unit: (b.unit?.code || 'pesantren') as UnitType,
          title: b.title,
          subtitle: b.unitName,
          year: b.academicYear || '2027/2028',
          format: 'PDF Document',
          fileSize: b.fileSize,
          downloadUrl: b.fileUrl,
          status: b.status === 'AVAILABLE' ? 'available' : 'coming_soon'
        }));
      }
      return this.fallback.getBrochures();
    } catch {
      return this.fallback.getBrochures();
    }
  }

  async getFAQs(): Promise<FAQ[]> {
    try {
      const items = await apiGet<any[]>('/faqs');
      if (items && items.length > 0) {
        return items.map((f) => ({
          id: f.id,
          question: f.question,
          answer: f.answer,
          category: f.category
        }));
      }
      return this.fallback.getFAQs();
    } catch {
      return this.fallback.getFAQs();
    }
  }

  async getContactInfo(): Promise<ContactInfo> {
    return this.fallback.getContactInfo();
  }

  async submitPPDB(data: PPDBFormData): Promise<PPDBSubmissionResult> {
    try {
      const payload = {
        academicYear: '2027/2028',
        fullName: data.fullName,
        nisn: data.nisn,
        birthPlaceDate: data.birthPlaceDate,
        previousSchool: data.previousSchool,
        parentName: data.parentName,
        whatsapp: data.whatsapp,
        address: data.address,
        unitCode: data.selectedUnit,
        notes: data.notes
      };

      const res = await apiPost<{
        registrationNo: string;
        submittedAt: string;
        fullName: string;
        unitCode: string;
      }>('/ppdb/applications', payload);

      return {
        success: true,
        registrationNumber: res.registrationNo,
        submittedAt: res.submittedAt,
        data
      };
    } catch (err: any) {
      console.warn('API submitPPDB error, using fallback logic:', err);
      return this.fallback.submitPPDB(data);
    }
  }

  async submitContact(data: { name: string; email: string; message: string }): Promise<{ success: boolean; message: string }> {
    try {
      const res = await apiPost<{ id: string; createdAt: string }>('/contact', data);
      return {
        success: true,
        message: 'Pesan Anda telah berhasil dikirim ke sekretariat Pesantren Cendekia Amanah.'
      };
    } catch (err: any) {
      throw err;
    }
  }

  async subscribeNewsletter(email: string): Promise<{ success: boolean; message: string }> {
    try {
      await apiPost('/newsletter/subscribe', { email });
      return {
        success: true,
        message: 'Terima kasih telah berlangganan buletin kabar pesantren.'
      };
    } catch (err: any) {
      throw err;
    }
  }
}

export const apiContentRepo = new ApiContentRepository();
