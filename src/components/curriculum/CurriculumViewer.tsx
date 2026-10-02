'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  BookOpen,
  Award,
  Laptop,
  Languages,
  Scroll,
  GraduationCap,
  Microscope,
  Cpu,
  HeartHandshake,
  ShieldCheck,
  Globe,
  Briefcase,
  Sparkles,
  CheckCircle2,
  Search,
  ArrowRight,
  Filter,
  School,
  X
} from 'lucide-react';
import { CurriculumItem } from '@/types';

const ICON_MAP: Record<string, any> = {
  BookOpen,
  Award,
  Laptop,
  Languages,
  Scroll,
  GraduationCap,
  Microscope,
  Cpu,
  HeartHandshake,
  ShieldCheck,
  Globe,
  Briefcase,
  Sparkles
};

const UNIT_TABS = [
  { id: 'ALL', label: 'Semua Unit', badge: 'Semua' },
  { id: 'pesantren', label: 'Pesantren', badge: 'Pesantren' },
  { id: 'smp', label: 'SMP Cendekia Amanah', badge: 'SMP' },
  { id: 'sma', label: 'SMA Cendekia Amanah', badge: 'SMA' },
  { id: 'diniyah', label: 'MDTA', badge: 'MDTA' }
];

interface CurriculumViewerProps {
  initialItems: CurriculumItem[];
}

export default function CurriculumViewer({ initialItems }: CurriculumViewerProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const urlUnit = searchParams.get('unit');
  const initialSelectedUnit = useMemo(() => {
    if (!urlUnit) return 'ALL';
    const lower = urlUnit.toLowerCase();
    if (lower === 'mdta' || lower === 'diniyah') return 'diniyah';
    if (lower === 'smp') return 'smp';
    if (lower === 'sma') return 'sma';
    if (lower === 'pesantren') return 'pesantren';
    return 'ALL';
  }, [urlUnit]);

  const [selectedUnit, setSelectedUnit] = useState<string>(initialSelectedUnit);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    if (urlUnit) {
      const lower = urlUnit.toLowerCase();
      if (lower === 'mdta' || lower === 'diniyah') setSelectedUnit('diniyah');
      else if (lower === 'smp') setSelectedUnit('smp');
      else if (lower === 'sma') setSelectedUnit('sma');
      else if (lower === 'pesantren') setSelectedUnit('pesantren');
    }
  }, [urlUnit]);

  const handleTabChange = (unitId: string) => {
    setSelectedUnit(unitId);
    if (unitId === 'ALL') {
      router.replace('/kurikulum', { scroll: false });
    } else {
      router.replace(`/kurikulum?unit=${unitId}`, { scroll: false });
    }
  };

  const filteredItems = useMemo(() => {
    return initialItems.filter((item) => {
      // Unit filter
      if (selectedUnit !== 'ALL') {
        const itemUnit = (item.unitSlug || item.unitCode || '').toLowerCase();
        const normSelected = selectedUnit.toLowerCase();
        const matchUnit =
          normSelected === 'diniyah'
            ? itemUnit === 'diniyah' || itemUnit === 'mdta'
            : itemUnit === normSelected;
        if (!matchUnit) return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const titleMatch = item.title?.toLowerCase().includes(q);
        const descMatch = item.description?.toLowerCase().includes(q);
        const badgeMatch = item.badge?.toLowerCase().includes(q);
        const highlightMatch = item.highlights?.some((h) => h.toLowerCase().includes(q));
        const unitMatch = item.unitName?.toLowerCase().includes(q);
        return titleMatch || descMatch || badgeMatch || highlightMatch || unitMatch;
      }

      return true;
    });
  }, [initialItems, selectedUnit, searchQuery]);

  // Helper for Unit Badge styling
  const renderUnitBadge = (item: CurriculumItem) => {
    const slug = (item.unitSlug || item.unitCode || '').toLowerCase();
    const name = item.unitShortName || item.unitName || 'Unit';

    if (slug.includes('sma')) {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
          Unit SMA
        </span>
      );
    }
    if (slug.includes('smp')) {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
          Unit SMP
        </span>
      );
    }
    if (slug.includes('pesantren')) {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
          Unit Pesantren
        </span>
      );
    }
    if (slug.includes('diniyah') || slug.includes('mdta')) {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
          Unit MDTA
        </span>
      );
    }

    return (
      <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-50 text-slate-700 border border-slate-200">
        {name}
      </span>
    );
  };

  const getPillarColorClasses = (color?: string) => {
    switch (color) {
      case 'amber':
        return {
          badge: 'bg-[#FEF6E0] text-[#B88700] border-[#B88700]/30',
          iconBg: 'bg-[#FEF6E0] text-[#B88700] border-[#B88700]/30'
        };
      case 'emerald':
        return {
          badge: 'bg-[#E6F8F0] text-[#00875A] border-[#00875A]/30',
          iconBg: 'bg-[#E6F8F0] text-[#00875A] border-[#00875A]/30'
        };
      case 'rose':
        return {
          badge: 'bg-[#FDE8E9] text-[#D8232A] border-[#D8232A]/30',
          iconBg: 'bg-[#FDE8E9] text-[#D8232A] border-[#D8232A]/30'
        };
      case 'indigo':
        return {
          badge: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          iconBg: 'bg-indigo-50 text-indigo-700 border-indigo-200'
        };
      case 'purple':
        return {
          badge: 'bg-purple-50 text-purple-700 border-purple-200',
          iconBg: 'bg-purple-50 text-purple-700 border-purple-200'
        };
      case 'blue':
      default:
        return {
          badge: 'bg-[#EBF3FF] text-[#1F5FD0] border-[#1F5FD0]/30',
          iconBg: 'bg-[#EBF3FF] text-[#1F5FD0] border-[#1F5FD0]/30'
        };
    }
  };

  return (
    <div className="space-y-8">
      {/* Filter and Search Controls */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#DDE6F1] shadow-xs space-y-4">
        {/* Top: Unit Filter Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {UNIT_TABS.map((tab) => {
              const isSelected = selectedUnit === tab.id;
              const count =
                tab.id === 'ALL'
                  ? initialItems.length
                  : initialItems.filter((it) => {
                      const u = (it.unitSlug || it.unitCode || '').toLowerCase();
                      return tab.id === 'diniyah'
                        ? u === 'diniyah' || u === 'mdta'
                        : u === tab.id;
                    }).length;

              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#0B2F6B] text-white shadow-md shadow-[#0B2F6B]/15'
                      : 'bg-[#F8FAFC] text-[#5C6B7D] hover:bg-[#EBF3FF] hover:text-[#0B2F6B] border border-[#DDE6F1]'
                  }`}
                >
                  <School className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-[#E2E8F0] text-[#475569]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom: Search Input & Active Filter Indicator */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#DDE6F1]">
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 text-[#7B8CA1] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kurikulum, materi, atau kata kunci..."
              className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm bg-[#F8FAFC] border border-[#DDE6F1] rounded-2xl focus:outline-none focus:border-[#1F5FD0] focus:bg-white transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="text-xs text-[#5C6B7D] font-medium w-full sm:w-auto text-left sm:text-right">
            Menampilkan <span className="font-bold text-[#0B2F6B]">{filteredItems.length}</span> pilar kurikulum
          </div>
        </div>
      </div>

      {/* Grid of Curriculums */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#DDE6F1] space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#EBF3FF] text-[#1F5FD0] mx-auto flex items-center justify-center">
            <Filter className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-[#0B2F6B]">
            Tidak Ada Kurikulum yang Cocok
          </h3>
          <p className="text-xs sm:text-sm text-[#5C6B7D]">
            Tidak ditemukan data kurikulum untuk kriteria pencarian & filter saat ini.
          </p>
          <button
            onClick={() => {
              setSelectedUnit('ALL');
              setSearchQuery('');
              router.replace('/kurikulum', { scroll: false });
            }}
            className="px-5 py-2.5 rounded-xl bg-[#0B2F6B] text-white text-xs font-bold shadow-xs hover:bg-[#1A4FA0] transition-colors cursor-pointer"
          >
            Reset Semua Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredItems.map((item) => {
            const Icon = (item.icon && ICON_MAP[item.icon]) || BookOpen;
            const colors = getPillarColorClasses(item.color);
            const unitSlug = (item.unitSlug || item.unitCode || 'smp').toLowerCase();
            const unitPageHref = `/${unitSlug === 'diniyah' ? 'diniyah' : unitSlug}#kurikulum`;

            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DDE6F1] shadow-xs hover-lift flex flex-col justify-between space-y-6 transition-all"
              >
                <div className="space-y-4">
                  {/* Top: Badges & Icon */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      {renderUnitBadge(item)}
                      {item.badge && (
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${colors.badge}`}>
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${colors.iconBg}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Title & Unit Name */}
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-[#0B2F6B] leading-snug">
                      {item.title}
                    </h3>
                    {item.unitName && (
                      <p className="text-xs font-semibold text-[#7B8CA1]">
                        {item.unitName}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#5C6B7D] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Highlights List */}
                <div className="pt-4 border-t border-[#DDE6F1]/80 space-y-3">
                  <h4 className="text-[11px] font-bold text-[#7B8CA1] uppercase tracking-wider">
                    Capaian & Keunggulan Program:
                  </h4>
                  <div className="space-y-2">
                    {item.highlights?.map((h, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-[#28384A]">
                        <CheckCircle2 className="w-4 h-4 text-[#D8232A] shrink-0 mt-0.5" />
                        <span className="font-medium leading-relaxed">{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Unit Link */}
                  <div className="pt-3 flex items-center justify-between">
                    <Link
                      href={unitPageHref}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1F5FD0] hover:text-[#0B2F6B] transition-colors"
                    >
                      <span>Lihat Halaman Unit Lengkap</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
