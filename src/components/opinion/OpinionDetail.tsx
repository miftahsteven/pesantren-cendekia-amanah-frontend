'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { OpinionArticle } from '@/types';
import Breadcrumb from '@/components/common/Breadcrumb';
import GlobalCTA from '@/components/layout/GlobalCTA';
import { FacebookIcon, WhatsAppIcon } from '@/components/common/SocialIcons';
import {
  Calendar,
  Clock,
  Quote,
  Share2,
  Check,
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { getUploadUrl } from '@/lib/uploads';

interface OpinionDetailProps {
  opinion: OpinionArticle;
  otherOpinions: OpinionArticle[];
}

export default function OpinionDetail({ opinion, otherOpinions }: OpinionDetailProps) {
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
      `https://api.whatsapp.com/send?text=${encodeURIComponent(opinion.title + ' ' + currentUrl)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Top Header & Breadcrumb */}
      <section className="pt-4 sm:pt-6">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 space-y-6">
          <Breadcrumb
            items={[
              { label: 'Opini', href: '/opini' },
              { label: opinion.title }
            ]}
          />

          {/* Article Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-xs text-[#7B8CA1]">
              <span className="px-3 py-1 rounded-full font-bold bg-[#EBF3FF] text-[#1A4FA0] border border-[#DDE6F1] uppercase tracking-wider">
                Kolom Opini
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#D8232A]" />
                {opinion.publishedAt}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {opinion.readTime}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B2F6B] tracking-tight leading-tight">
              {opinion.title}
            </h1>
          </div>

          {/* Author Spotlight Box */}
          <div className="p-5 rounded-2xl bg-white border border-[#DDE6F1] shadow-xs flex items-center gap-4">
            <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gray-100 border-2 border-[#D8232A] shrink-0">
              <Image
                src={getUploadUrl(opinion.author.avatar)}
                alt={opinion.author.name}
                fill
                className="object-cover object-top"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold text-[#0B2F6B]">{opinion.author.name}</h3>
                <UserCheck className="w-4 h-4 text-[#D8232A]" />
              </div>
              <p className="text-xs text-[#5C6B7D]">{opinion.author.role}</p>
            </div>
          </div>

          {/* Opinion Article Content */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#DDE6F1] shadow-xs space-y-6">
            <div className="prose prose-lg max-w-none text-[#28384A] leading-relaxed space-y-4 text-sm sm:text-base">
              {opinion.content.map((paragraph, index) => (
                <p key={index} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}

              {/* Quote Highlight */}
              {opinion.highlightQuote && (
                <div className="my-6 p-6 rounded-2xl bg-[#FDE8E9] border-l-4 border-[#D8232A] relative">
                  <Quote className="w-8 h-8 text-[#D8232A]/30 absolute top-3 right-3" />
                  <p className="text-base sm:text-lg font-bold text-[#0B2F6B] italic leading-relaxed">
                    {opinion.highlightQuote}
                  </p>
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="pt-6 border-t border-[#F4F7FB] flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-[#7B8CA1] uppercase tracking-wider mr-1">
                Topik:
              </span>
              {opinion.tags.map((tag) => (
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
                <span>Bagikan Opini Ini:</span>
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

      {/* Other Opinions Section */}
      {otherOpinions.length > 0 && (
        <section className="py-12 bg-white border-y border-[#DDE6F1]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B2F6B]">
                OPINI LAINNYA
              </h2>
              <Link
                href="/opini"
                className="text-xs sm:text-sm font-bold text-[#1A4FA0] hover:text-[#0B2F6B] flex items-center gap-1"
              >
                <span>Lihat Semua Opini</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherOpinions.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="bg-[#F4F7FB]/70 rounded-2xl p-6 border border-[#DDE6F1] shadow-xs hover-lift flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-2">
                    <h3 className="text-sm font-bold text-[#0B2F6B] group-hover:text-[#1A4FA0] transition-colors leading-snug line-clamp-2">
                      <Link href={`/opini/${item.slug}`}>{item.title}</Link>
                    </h3>
                    <p className="text-xs text-[#5C6B7D] line-clamp-2 leading-relaxed">
                      {item.excerpt}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#DDE6F1] flex items-center gap-3">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-100 shrink-0">
                      <Image
                        src={getUploadUrl(item.author.avatar)}
                        alt={item.author.name}
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="text-[11px] leading-tight">
                      <div className="font-bold text-[#28384A] line-clamp-1">{item.author.name}</div>
                      <div className="text-[#7B8CA1] text-[10px] line-clamp-1">{item.author.role}</div>
                    </div>
                  </div>
                </div>
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
