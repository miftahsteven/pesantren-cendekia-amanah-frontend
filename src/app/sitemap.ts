import { MetadataRoute } from 'next';
import { newsArticles } from '@/content/mock/news';
import { opinionArticles } from '@/content/mock/opinions';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://cendekiaamanah.sch.id';

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/tentang-kami`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/pesantren`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/smp`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/sma`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/diniyah`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/berita`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/opini`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/ppdb`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/kontak`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 }
  ];

  const newsRoutes: MetadataRoute.Sitemap = newsArticles.map((article) => ({
    url: `${baseUrl}/berita/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7
  }));

  const opinionRoutes: MetadataRoute.Sitemap = opinionArticles.map((opini) => ({
    url: `${baseUrl}/opini/${opini.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7
  }));

  return [...staticRoutes, ...newsRoutes, ...opinionRoutes];
}
