'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useUI } from '@/context/UIContext';
import { getUploadUrl } from '@/lib/uploads';
import { ExternalLink } from 'lucide-react';

interface BannerData {
  id?: string;
  title?: string;
  imageUrl: string;
  primaryCtaUrl?: string;
  isActive?: boolean;
}

interface PPDBBannerClientProps {
  banner: BannerData;
}

export default function PPDBBannerClient({ banner }: PPDBBannerClientProps) {
  const { openPpdbModal } = useUI();

  if (banner.isActive === false) {
    return null;
  }

  const targetUrl = banner.primaryCtaUrl?.trim() || '/ppdb';
  const isModalTrigger = targetUrl === '#modal' || targetUrl === '#ppdb-modal';
  const isExternal =
    targetUrl.startsWith('http://') ||
    targetUrl.startsWith('https://') ||
    targetUrl.startsWith('//');

  const resolvedImageUrl = getUploadUrl(banner.imageUrl);
  const altText =
    banner.title ||
    'Sistem Penerimaan Murid Baru (SPMB) SMP Pesantren Cendekia Amanah Tahun Ajaran 2027/2028';

  const content = (
    <div className="relative w-full aspect-[4/1] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200/80 bg-slate-900 group">
      <Image
        src={resolvedImageUrl}
        alt={altText}
        fill
        priority
        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-[1.01]"
        sizes="(max-width: 1280px) 100vw, 1280px"
      />
      {/* Subtle overlay hover effect */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none" />

      {/* Floating subtle badge indicator on hover */}
      <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#0B2F6B] text-[11px] sm:text-xs font-bold shadow-md">
        <span>Buka Formulir</span>
        <ExternalLink className="w-3.5 h-3.5" />
      </div>
    </div>
  );

  return (
    <section className="py-8 sm:py-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {isModalTrigger ? (
          <button
            type="button"
            onClick={openPpdbModal}
            className="w-full text-left cursor-pointer focus:outline-none"
            aria-label={altText}
          >
            {content}
          </button>
        ) : isExternal ? (
          <a
            href={targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full focus:outline-none"
            aria-label={altText}
          >
            {content}
          </a>
        ) : (
          <Link href={targetUrl} className="block w-full focus:outline-none" aria-label={altText}>
            {content}
          </Link>
        )}
      </div>
    </section>
  );
}
