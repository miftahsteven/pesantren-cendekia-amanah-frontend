import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  variant?: 'dark' | 'light';
}

export default function Breadcrumb({ items, variant = 'dark' }: BreadcrumbProps) {
  const isLight = variant === 'light';

  return (
    <nav aria-label="Breadcrumb" className="py-3">
      <ol className="flex items-center flex-wrap gap-1.5 text-xs">
        <li className="flex items-center">
          <Link
            href="/"
            className={`inline-flex items-center gap-1 transition-colors ${
              isLight ? 'text-white/70 hover:text-white' : 'text-[#7B8CA1] hover:text-[#1A4FA0]'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Beranda</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center">
              <ChevronRight
                className={`w-3.5 h-3.5 mx-1 shrink-0 ${isLight ? 'text-white/40' : 'text-[#B9C8DC]'}`}
              />
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={`transition-colors ${
                    isLight ? 'text-white/70 hover:text-white' : 'text-[#7B8CA1] hover:text-[#1A4FA0]'
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={`font-semibold line-clamp-1 max-w-[200px] sm:max-w-xs md:max-w-md ${
                    isLight ? 'text-white' : 'text-[#28384A]'
                  }`}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
