import React from 'react';
import {
  BookOpen,
  Home,
  Monitor,
  Languages,
  ScanFace,
  Crown,
  FlaskConical
} from 'lucide-react';
import { apiGet } from '@/lib/api-client';

const iconMap: Record<string, any> = {
  tahfidz: BookOpen,
  boarding: Home,
  digital: Monitor,
  bilingual: Languages,
  character: ScanFace,
  leadership: Crown,
  steam: FlaskConical
};

const defaultFeatures = [
  { title: "Tahfidz Al-Qur’an", icon: BookOpen },
  { title: 'Boarding System', icon: Home },
  { title: 'Digital Learning', icon: Monitor },
  { title: 'Bahasa Arab & Inggris', icon: Languages },
  { title: 'Character Building', icon: ScanFace },
  { title: 'Leadership', icon: Crown },
  { title: 'STEAM Education', icon: FlaskConical }
];

export default async function KeunggulanKami() {
  let features = defaultFeatures;

  try {
    const dbFeats = await apiGet<any[]>('/site-features');
    if (dbFeats && Array.isArray(dbFeats) && dbFeats.length > 0) {
      features = dbFeats.map((f, idx) => ({
        title: f.title || defaultFeatures[idx % defaultFeatures.length].title,
        icon: iconMap[f.iconKey] || defaultFeatures[idx % defaultFeatures.length].icon
      }));
    }
  } catch {
    // fallback
  }

  return (
    <section className="py-10 sm:py-14 bg-white border-y border-[#DDE6F1]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Section Heading with Red Wing Lines matching prototype */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10">
          <span className="w-8 sm:w-12 h-[2.5px] bg-[#D8232A] rounded-full inline-block" />
          <h2 className="text-xl sm:text-2xl font-black text-[#0B2F6B] tracking-wider uppercase">
            KEUNGGULAN KAMI
          </h2>
          <span className="w-8 sm:w-12 h-[2.5px] bg-[#D8232A] rounded-full inline-block" />
        </div>

        {/* 1 Single Row on Desktop (7 columns) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-3.5 lg:gap-4">
          {features.map((feat, idx) => {
            const Icon = feat.icon;

            return (
              <div
                key={idx}
                className="group flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-[#DDE6F1] bg-[#F8FAFC] hover:bg-white hover:border-[#1F5FD0] hover:shadow-md transition-all duration-200 text-center min-h-[110px] sm:min-h-[120px]"
              >
                {/* Icon Container */}
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white border border-[#DDE6F1] group-hover:border-[#1F5FD0]/30 group-hover:bg-[#EBF3FF] flex items-center justify-center text-[#0B2F6B] group-hover:text-[#1F5FD0] transition-colors mb-2 shadow-xs shrink-0">
                  <Icon className="w-5 h-5" />
                </div>

                {/* Title */}
                <span className="text-[11px] sm:text-xs font-bold text-[#1A293B] group-hover:text-[#0B2F6B] line-clamp-2 leading-tight">
                  {feat.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
