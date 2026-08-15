'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig as defaultSiteConfig, socialLinks as defaultSocialLinks } from '@/content/mock/site';
import { contactInfo as defaultContactInfo } from '@/content/mock/contact';
import { ContactInfo } from '@/types';
import { useUI } from '@/context/UIContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  Globe,
  ArrowUpRight
} from 'lucide-react';
import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
  TikTokIcon
} from '@/components/common/SocialIcons';

export default function SiteFooter() {
  const { openBrochureModal, openVideoModal } = useUI();
  const [socials, setSocials] = useState<any[]>(defaultSocialLinks);
  const [contact, setContact] = useState<ContactInfo>(defaultContactInfo);

  useEffect(() => {
    async function loadFooterData() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
        const res = await fetch(`${apiUrl}/site`, { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            const { setting, socialLinks } = json.data;
            if (Array.isArray(socialLinks) && socialLinks.length > 0) {
              setSocials(
                socialLinks.map((s: any) => ({
                  platform: s.platform.toLowerCase(),
                  url: s.url,
                  name: s.platform,
                  handle: s.platform,
                  icon: s.platform
                }))
              );
            }
            if (setting) {
              setContact((prev) => ({
                ...prev,
                phone: setting.phone || prev.phone,
                whatsapp: setting.whatsapp || prev.whatsapp,
                email: setting.email || prev.email,
                address: {
                  ...prev.address,
                  fullText: setting.addressText || prev.address.fullText,
                  mapsLink: setting.mapsLink || prev.address.mapsLink
                }
              }));
            }
          }
        }
      } catch {
        // fallback
      }
    }
    loadFooterData();
  }, []);

  const renderSocialIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <InstagramIcon className="w-4 h-4" />;
      case 'facebook':
        return <FacebookIcon className="w-4 h-4" />;
      case 'youtube':
        return <YoutubeIcon className="w-4 h-4" />;
      case 'tiktok':
        return <TikTokIcon className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  return (
    <footer className="bg-[#0B2F6B] text-white pt-16 pb-8 border-t border-[#12377E]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Brand (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-12 h-12 shrink-0 bg-white/10 p-1.5 rounded-xl">
                <Image
                  src="/logo/main-logo.png"
                  alt="Logo Pesantren Cendekia Amanah"
                  width={40}
                  height={40}
                  className="object-contain w-auto h-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold tracking-widest text-[#8ED6A8] uppercase leading-tight">
                  Pesantren
                </span>
                <span className="text-lg font-black tracking-tight text-white leading-tight">
                  Cendekia Amanah
                </span>
              </div>
            </Link>

            <p className="text-xs text-white/75 leading-relaxed">
              Lembaga pendidikan Islam terpadu dengan unit Pesantren, SMP, SMA, dan Madrasah Diniyah yang berkomitmen
              mencetak generasi Qurani, berprestasi, dan berjiwa pemimpin.
            </p>

            {/* Social Media Links */}
            <div className="pt-2">
              <span className="text-[11px] font-semibold text-white/50 uppercase tracking-wider block mb-2.5">
                Media Sosial Kami:
              </span>
              <div className="flex items-center gap-2">
                {socials.map((item) => (
                  <a
                    key={item.platform}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#17804A] text-white flex items-center justify-center transition-all duration-200"
                    aria-label={`Kunjungi media sosial ${item.name}`}
                  >
                    {renderSocialIcon(item.platform)}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Menu Navigasi (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
              Menu Utama
            </h3>
            <ul className="space-y-2 text-xs text-white/80">
              <li>
                <Link href="/" className="hover:text-[#8ED6A8] transition-colors">Beranda</Link>
              </li>
              <li>
                <Link href="/pesantren" className="hover:text-[#8ED6A8] transition-colors">Pesantren</Link>
              </li>
              <li>
                <Link href="/smp" className="hover:text-[#8ED6A8] transition-colors">SMP Cendekia</Link>
              </li>
              <li>
                <Link href="/sma" className="hover:text-[#8ED6A8] transition-colors">SMA Cendekia</Link>
              </li>
              <li>
                <Link href="/diniyah" className="hover:text-[#8ED6A8] transition-colors">Madrasah Diniyah</Link>
              </li>
              <li>
                <Link href="/berita" className="hover:text-[#8ED6A8] transition-colors">Berita & Informasi</Link>
              </li>
              <li>
                <Link href="/opini" className="hover:text-[#8ED6A8] transition-colors">Opini & Gagasan</Link>
              </li>
              <li>
                <Link href="/kontak" className="hover:text-[#8ED6A8] transition-colors">Kontak</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Informasi & Layanan (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
              Informasi
            </h3>
            <ul className="space-y-2 text-xs text-white/80">
              <li>
                <Link href="/ppdb" className="text-[#F0BD28] font-semibold hover:underline flex items-center gap-1">
                  <span>PPDB Online</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <button
                  onClick={openBrochureModal}
                  className="hover:text-[#8ED6A8] transition-colors text-left"
                >
                  Unduh Brosur
                </button>
              </li>
              <li>
                <button
                  onClick={openVideoModal}
                  className="hover:text-[#8ED6A8] transition-colors text-left"
                >
                  Virtual Tour Pesantren
                </button>
              </li>
              <li>
                <a
                  href="https://cholilnafis.id/#konsultasi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#8ED6A8] transition-colors flex items-center gap-1"
                >
                  <span>Konsultasi Keislaman</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
              <li>
                <Link href="/kontak#faq" className="hover:text-[#8ED6A8] transition-colors">
                  Tanya Jawab (FAQ)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Kontak Kami (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
              Kontak Kami
            </h3>
            <ul className="space-y-2.5 text-xs text-white/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#8ED6A8] shrink-0 mt-0.5" />
                <span>{contact.address.fullText}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#8ED6A8] shrink-0" />
                <a href={`tel:${contact.whatsapp || '+6285776446468'}`} className="hover:text-white transition-colors">
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#8ED6A8] shrink-0" />
                <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors">
                  {contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#8ED6A8] shrink-0" />
                <span>{contact.workingHours}</span>
              </li>
            </ul>

            {/* Quick Map Link Preview */}
            <div className="pt-2">
              <a
                href={contact.address.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-[#F0BD28]" />
                <span>Buka Peta Lokasi (Google Maps)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© 2026 Lembaga Pendidikan Terpadu Cendekia Amanah. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link href="/kontak" className="hover:text-white transition-colors">
              Pusat Bantuan
            </Link>
            <span className="hover:text-white/80 cursor-default">Privacy Policy</span>
            <span className="hover:text-white/80 cursor-default">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
