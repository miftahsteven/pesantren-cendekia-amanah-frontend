'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { mainNavigation, unitShortcuts } from '@/content/mock/navigation';
import { useUI } from '@/context/UIContext';
import { Menu, X, ChevronDown, ArrowRight, Download, Play, Phone, ExternalLink } from 'lucide-react';

export default function MobileNavigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const { openBrochureModal, openVideoModal } = useUI();

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleExpand = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="lg:hidden bg-white border-b border-[#DDE6F1] sticky top-0 z-40">
      {/* Mobile Top Bar */}
      <div className="px-4 py-3 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="relative w-10 h-10 shrink-0">
            <Image
              src="/logo/main-logo.png"
              alt="Logo Pesantren Cendekia Amanah"
              width={40}
              height={40}
              className="object-contain w-auto h-full"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold tracking-wider text-[#17804A] uppercase leading-tight">
              Pesantren
            </span>
            <span className="text-base font-black tracking-tight text-[#0B2F6B] leading-tight">
              Cendekia Amanah
            </span>
          </div>
        </Link>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <Link
            href="/ppdb"
            className="px-3 py-1.5 rounded-full text-xs font-bold text-[#0B2F6B] bg-[#F0BD28] hover:bg-[#e0ad19] transition-colors"
          >
            PPDB
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg text-[#0B2F6B] hover:bg-[#F4F7FB] transition-colors"
            aria-label={isOpen ? 'Tutup navigasi' : 'Buka navigasi'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Slide-down / Drawer Navigation */}
      {isOpen && (
        <div className="fixed inset-0 top-[61px] bg-black/50 z-40 animate-fade-in" onClick={() => setIsOpen(false)}>
          <div
            className="bg-white w-full max-h-[calc(100vh-61px)] overflow-y-auto pb-10 border-b border-[#DDE6F1] shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Menu List */}
            <nav className="p-4 space-y-1 divide-y divide-[#F4F7FB]">
              {mainNavigation.map((item, index) => {
                const hasChildren = Boolean(item.children && item.children.length > 0);
                const isExpanded = expandedIndex === index;
                const active = pathname === item.href || (hasChildren && pathname.startsWith(item.href));

                return (
                  <div key={item.label} className="pt-2">
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        className={`block py-2 text-sm font-semibold transition-colors flex-1 ${
                          active ? 'text-[#1A4FA0] font-bold' : 'text-[#28384A]'
                        }`}
                      >
                        {item.label}
                      </Link>

                      {hasChildren && (
                        <button
                          onClick={() => toggleExpand(index)}
                          className="p-2 text-[#7B8CA1] hover:text-[#0B2F6B]"
                          aria-label={`Toggle sub-menu ${item.label}`}
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isExpanded ? 'rotate-180 text-[#1A4FA0]' : ''
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    {/* Submenu Accordion */}
                    {hasChildren && isExpanded && (
                      <div className="pl-4 py-1 space-y-1 bg-[#F4F7FB]/70 rounded-lg mb-2">
                        {item.children?.map((subItem) => (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            className="block py-1.5 px-2 text-xs font-medium text-[#5C6B7D] hover:text-[#1A4FA0] hover:bg-white rounded"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Quick Actions at bottom */}
            <div className="p-4 bg-[#F4F7FB] border-t border-[#DDE6F1] space-y-3 mt-auto">
              <Link
                href="/ppdb"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-[#0B2F6B] bg-[#F0BD28] hover:bg-[#e0ad19] shadow-sm"
              >
                <span>DAFTAR PPDB ONLINE</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    openBrochureModal();
                  }}
                  className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-white border border-[#DDE6F1] text-[#28384A] font-medium"
                >
                  <Download className="w-3.5 h-3.5 text-[#17804A]" />
                  <span>Unduh Brosur</span>
                </button>

                <button
                  onClick={() => {
                    setIsOpen(false);
                    openVideoModal();
                  }}
                  className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-white border border-[#DDE6F1] text-[#28384A] font-medium"
                >
                  <Play className="w-3.5 h-3.5 fill-[#1A4FA0] text-[#1A4FA0]" />
                  <span>Virtual Tour</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-[#5C6B7D] pt-2 border-t border-[#DDE6F1]">
                <Link href="/kontak" className="flex items-center gap-1 hover:text-[#0B2F6B]">
                  <Phone className="w-3.5 h-3.5 text-[#17804A]" />
                  <span>Kontak Kami</span>
                </Link>
                <a
                  href="https://cholilnafis.id/#konsultasi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[#1F5FD0]"
                >
                  <span>Konsultasi</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
