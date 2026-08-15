import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { contentRepo } from '@/repositories/content.repository';
import ArticleDetail from '@/components/news/ArticleDetail';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await contentRepo.getNewsBySlug(slug);

  if (!article) {
    return {
      title: 'Artikel Tidak Ditemukan — Pesantren Cendekia Amanah'
    };
  }

  return {
    title: `${article.title} — Pesantren Cendekia Amanah`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.featuredImage],
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.author]
    }
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = await contentRepo.getNewsBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedNews = await contentRepo.getRelatedNews(article.slug, article.category, 3);

  return <ArticleDetail article={article} relatedNews={relatedNews} />;
}
