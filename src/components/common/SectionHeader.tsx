import React from 'react';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  actionText?: string;
  actionHref?: string;
}

export default function SectionHeader({
  badge,
  title,
  subtitle,
  centered = false,
  actionText,
  actionHref
}: SectionHeaderProps) {
  return (
    <div
      className={`mb-10 sm:mb-12 ${
        centered
          ? 'text-center max-w-2xl mx-auto'
          : 'flex flex-col sm:flex-row sm:items-end justify-between gap-4'
      }`}
    >
      <div className="space-y-2">
        {badge && (
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#EBF3FF] text-[#1A4FA0] border border-[#DDE6F1]">
            {badge}
          </span>
        )}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2F6B] tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm sm:text-base text-[#5C6B7D] leading-relaxed max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>

      {actionText && actionHref && !centered && (
        <div className="shrink-0">
          <a
            href={actionHref}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1A4FA0] hover:text-[#0B2F6B] group transition-colors"
          >
            <span>{actionText}</span>
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      )}
    </div>
  );
}
