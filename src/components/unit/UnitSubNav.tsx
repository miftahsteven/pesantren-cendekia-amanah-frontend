'use client';

import React, { useState, useEffect } from 'react';

interface SubNavItem {
  label: string;
  href: string;
}

interface UnitSubNavProps {
  items: SubNavItem[];
}

export default function UnitSubNav({ items }: UnitSubNavProps) {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    // Initial hash check
    if (typeof window !== 'undefined' && window.location.hash) {
      setActiveSection(window.location.hash);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
      }
    );

    items.forEach((item) => {
      const id = item.href.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [items]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      setActiveSection(href);
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', href);
    }
  };

  return (
    <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#DDE6F1] shadow-xs py-2.5 transition-all">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5">
          <span className="text-[11px] font-bold text-[#7B8CA1] uppercase tracking-wider mr-2 shrink-0 hidden md:inline-block">
            Menu Unit:
          </span>
          {items.map((item) => {
            const isActive = activeSection === item.href;

            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#0B2F6B] text-white shadow-xs'
                    : 'bg-[#F4F7FB] text-[#28384A] hover:bg-[#EBF3FF] hover:text-[#1A4FA0]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
