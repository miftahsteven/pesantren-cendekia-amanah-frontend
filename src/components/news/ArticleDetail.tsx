'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NewsArticle } from '@/types';
import Breadcrumb from '@/components/common/Breadcrumb';
import GlobalCTA from '@/components/layout/GlobalCTA';
import { FacebookIcon, WhatsAppIcon } from '@/components/common/SocialIcons';
import {
  Calendar,
  Eye,
  User,
  Share2,
  Check,
  Quote,
  ArrowRight
} from 'lucide-react';
import { getUploadUrl } from '@/lib/uploads';

interface ArticleDetailProps {
  article: NewsArticle;
  relatedNews: NewsArticle[];
}

export default function ArticleDetail({ article, relatedNews }: ArticleDetailProps) {
  const [copied, setCopied] = useState(false);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const shareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const shareWhatsApp = () => {
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + ' ' + currentUrl)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const shareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(
        article.title
      )}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Top Header & Breadcrumb */}
      <section className="pt-4 sm:pt-6">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 space-y-6">
          <Breadcrumb
            items={[
              { label: 'Berita', href: '/berita' },
              { label: article.title }
            ]}
          />

          {/* Article Header */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FDE8E9] text-[#D8232A] border border-[#FCA5A5]/40 uppercase tracking-wider">
                {article.category}
              </span>
              <div className="flex items-center gap-4 text-xs text-[#7B8CA1]">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#D8232A]" />
                  {article.publishedAt}
                </span>
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#1A4FA0]" />
                  {article.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  {article.viewsCount} dibaca
                </span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B2F6B] tracking-tight leading-tight">
              {article.title}
            </h1>
          </div>

          {/* Featured Image */}
          <div className="relative h-72 sm:h-96 md:h-[460px] w-full rounded-3xl overflow-hidden shadow-xl border border-[#DDE6F1]">
            <Image
              src={getUploadUrl(article.featuredImage)}
              alt={article.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1000px) 100vw, 1000px"
            />
          </div>

          {/* Article Body */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#DDE6F1] shadow-xs space-y-6">
            <div className="prose prose-lg max-w-none text-[#28384A] leading-relaxed space-y-4 text-sm sm:text-base">
              {article.content.map((paragraph, index) => (
                <p key={index} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}

              {/* Highlight Quote if available */}
              {article.highlightQuote && (
                <div className="my-6 p-6 rounded-2xl bg-[#EBF3FF] border-l-4 border-[#1A4FA0] relative">
                  <Quote className="w-8 h-8 text-[#1A4FA0]/30 absolute top-3 right-3" />
                  <p className="text-base sm:text-lg font-bold text-[#0B2F6B] italic leading-relaxed">
                    {article.highlightQuote}
                  </p>
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="pt-6 border-t border-[#F4F7FB] flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-[#7B8CA1] uppercase tracking-wider mr-1">
                Tags:
              </span>
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-lg text-xs font-medium bg-[#F4F7FB] text-[#5C6B7D] border border-[#E6EDF6]"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Social Share Buttons */}
            <div className="pt-6 border-t border-[#DDE6F1] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0B2F6B]">
                <Share2 className="w-4 h-4 text-[#1A4FA0]" />
                <span>Bagikan Artikel Ini:</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={shareWhatsApp}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#25D366] hover:bg-[#1EBE5D] text-white flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>

                <button
                  onClick={shareFacebook}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#1877F2] hover:bg-blue-700 text-white flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <FacebookIcon className="w-3.5 h-3.5" />
                  <span>Facebook</span>
                </button>

                <button
                  onClick={shareTwitter}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-black hover:bg-gray-800 text-white flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <span>X (Twitter)</span>
                </button>

                <button
                  onClick={handleCopyLink}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 ${
                    copied
                      ? 'bg-[#FDE8E9] border-[#FCA5A5] text-[#D8232A]'
                      : 'bg-[#F4F7FB] border-[#DDE6F1] text-[#28384A] hover:bg-[#EBF3FF]'
                  }`}
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : null}
                  <span>{copied ? 'Tersalin!' : 'Salin Tautan'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related News Section */}
      {relatedNews.length > 0 && (
        <section className="py-12 bg-white border-y border-[#DDE6F1]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-8">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#D8232A] uppercase tracking-wider">
                  Rekomendasi Bacaan
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B2F6B]">
                  BERITA TERKAIT
                </h2>
              </div>
              <Link
                href="/berita"
                className="text-xs sm:text-sm font-bold text-[#1A4FA0] hover:text-[#0B2F6B] flex items-center gap-1"
              >
                <span>Lihat Semua</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedNews.map((item) => (
                <article
                  key={item.id}
                  className="bg-[#F4F7FB]/70 rounded-2xl border border-[#DDE6F1] overflow-hidden shadow-xs hover-lift flex flex-col justify-between group"
                >
                  <div className="relative h-44 w-full overflow-hidden bg-gray-100">
                    <Image
                      src={getUploadUrl(item.featuredImage)}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="350px"
                    />
                  </div>

                  <div className="p-5 space-y-2.5 flex-1 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <span className="text-[10px] text-[#7B8CA1] font-medium">
                        {item.publishedAt}
                      </span>
                      <h3 className="text-sm font-bold text-[#0B2F6B] group-hover:text-[#1A4FA0] transition-colors leading-snug line-clamp-2">
                        <Link href={`/berita/${item.slug}`}>{item.title}</Link>
                      </h3>
                    </div>

                    <Link
                      href={`/berita/${item.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#1A4FA0] group-hover:text-[#D8232A] transition-colors pt-2 border-t border-[#DDE6F1]"
                    >
                      <span>Baca Artikel</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Global CTA */}
      <GlobalCTA />
    </div>
  );
}
