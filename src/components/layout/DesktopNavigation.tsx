'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { mainNavigation } from '@/content/mock/navigation';
import { ChevronDown, ArrowRight } from 'lucide-react';

export default function DesktopNavigation() {
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const isLinkActive = (href: string, hasChildren?: boolean) => {
    if (href === '/') {
      return pathname === '/';
    }
    if (hasChildren) {
      return pathname.startsWith(href);
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <div className="hidden lg:block bg-white border-b border-[#DDE6F1] shadow-xs">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex items-center justify-between h-20">
        {/* Brand Logo with generous right margin */}
        <Link href="/" className="flex items-center gap-3.5 shrink-0 mr-6 lg:mr-8 xl:mr-10 group">
          <div className="relative w-12 h-12 shrink-0">
            <Image
              src="/logo/main-logo.png"
              alt="Logo Pesantren Cendekia Amanah"
              width={48}
              height={48}
              className="object-contain w-auto h-full"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold tracking-widest text-[#17804A] uppercase leading-tight">
              Pesantren
            </span>
            <span className="text-lg font-black tracking-tight text-[#0B2F6B] leading-tight group-hover:text-[#1A4FA0] transition-colors">
              Cendekia Amanah
            </span>
            <span className="text-[9px] font-semibold text-[#7B8CA1] uppercase tracking-wider hidden xl:inline-block leading-tight">
              Lembaga Pendidikan Terpadu
            </span>
          </div>
        </Link>

        {/* Main Desktop Menu */}
        <nav className="flex items-center space-x-1 xl:space-x-1.5 shrink-0" aria-label="Main Navigation">
          {mainNavigation.map((item, index) => {
            const hasChildren = Boolean(item.children && item.children.length > 0);
            const active = isLinkActive(item.href, hasChildren);

            return (
              <div
                key={item.label}
                className="relative py-4"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Link
                  href={item.href}
                  className={`inline-flex items-center gap-1 px-2.5 xl:px-3 py-2 rounded-full text-xs xl:text-[13px] font-semibold whitespace-nowrap transition-all duration-200 ${
                    active
                      ? 'bg-[#1A4FA0] text-white shadow-xs'
                      : 'text-[#28384A] hover:text-[#1A4FA0] hover:bg-[#F4F7FB]'
                  }`}
                >
                  <span className="whitespace-nowrap">{item.label}</span>
                  {hasChildren && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
                        hoveredIndex === index ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </Link>

                {/* Dropdown Menu */}
                {hasChildren && hoveredIndex === index && (
                  <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-[#DDE6F1] py-2 z-50 animate-slide-down">
                    <div className="px-3 py-1.5 border-b border-[#F4F7FB] mb-1">
                      <p className="text-[11px] font-bold text-[#7B8CA1] uppercase tracking-wider">{item.label}</p>
                    </div>
                    {item.children?.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        className="block px-3.5 py-2 text-xs font-medium text-[#28384A] hover:text-[#1A4FA0] hover:bg-[#EBF3FF] transition-colors rounded-lg mx-1.5"
                      >
                        <div className="font-semibold">{subItem.label}</div>
                        {subItem.description && (
                          <div className="text-[11px] text-[#7B8CA1] font-normal line-clamp-1">
                            {subItem.description}
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* PPDB Button */}
        <div className="shrink-0 pl-3 xl:pl-4">
          <Link
            href="/ppdb"
            className="inline-flex items-center gap-1.5 xl:gap-2 px-4 xl:px-5 py-2.5 rounded-full text-xs xl:text-sm font-bold text-[#0B2F6B] bg-[#F0BD28] hover:bg-[#e0ad19] hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
          >
            <span>PPDB ONLINE</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </Link>
        </div>
      </div>
    </div>
  );
}
