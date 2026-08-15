import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { contentRepo } from '@/repositories/content.repository';
import OpinionDetail from '@/components/opinion/OpinionDetail';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const opinion = await contentRepo.getOpinionBySlug(slug);

  if (!opinion) {
    return {
      title: 'Opini Tidak Ditemukan — Pesantren Cendekia Amanah'
    };
  }

  return {
    title: `${opinion.title} — Pesantren Cendekia Amanah`,
    description: opinion.excerpt,
    openGraph: {
      title: opinion.title,
      description: opinion.excerpt,
      images: [opinion.author.avatar],
      type: 'article',
      publishedTime: opinion.publishedAt,
      authors: [opinion.author.name]
    }
  };
}

export default async function OpinionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const opinion = await contentRepo.getOpinionBySlug(slug);

  if (!opinion) {
    notFound();
  }

  const allOpinions = await contentRepo.getOpinionArticles();
  const otherOpinions = allOpinions.filter((o) => o.id !== opinion.id);

  return <OpinionDetail opinion={opinion} otherOpinions={otherOpinions} />;
}
