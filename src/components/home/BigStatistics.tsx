import React from 'react';
import { Users, UserCheck, GraduationCap, Trophy, HelpCircle, ExternalLink, Award, BookOpen } from 'lucide-react';
import { apiGet } from '@/lib/api-client';

const defaultStats = [
  { value: '350+', label: 'Tenaga Pendidik & Asatidz', icon: UserCheck, desc: 'Guru & asatidz berkompeten lulusan PTN/Timur Tengah' },
  { value: '700+', label: 'Santri & Siswa Aktif', icon: Users, desc: 'Tersebar di Pesantren, SMP, SMA, dan Diniyah' },
  { value: '1500+', label: 'Alumni Berdaya', icon: GraduationCap, desc: 'Melanjutkan di PTN favorit, kampus luar negeri & dunia karir' },
  { value: '28+', label: 'Prestasi Tingkat Nasional', icon: Trophy, desc: 'Juara olimpiade sains, robotik, MTQ, dan karya ilmiah' }
];

const iconMapping: Record<string, any> = {
  teachers: UserCheck,
  students: Users,
  alumni: GraduationCap,
  achievements: Trophy,
  Users,
  UserCheck,
  GraduationCap,
  Trophy,
  Award,
  BookOpen
};

export default async function BigStatistics() {
  let stats = defaultStats;

  try {
    const dbStats = await apiGet<any[]>('/statistics?section=HOME_INSTITUTION');
    if (dbStats && Array.isArray(dbStats) && dbStats.length > 0) {
      stats = dbStats.slice(0, 4).map((item, idx) => ({
        value: item.value || defaultStats[idx % defaultStats.length].value,
        label: item.label || defaultStats[idx % defaultStats.length].label,
        icon: (item.icon && iconMapping[item.icon]) || defaultStats[idx % defaultStats.length].icon,
        desc: defaultStats[idx % defaultStats.length].desc
      }));
    }
  } catch {
    // fallback
  }

  return (
    <section className="py-14 sm:py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-10">
        {/* Big Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, idx) => {
            const Icon = item.icon;

            return (
              <div
                key={idx}
                className="bg-white p-6 sm:p-7 rounded-2xl sm:rounded-3xl border border-[#DDE6F1] shadow-xs hover-lift flex flex-col justify-between space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#EBF3FF] text-[#1A4FA0] flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-[#D8232A] bg-[#FDE8E9] px-2.5 py-1 rounded-full">
                    Cendekia Amanah
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-black text-[#0B2F6B] tracking-tight">
                    {item.value}
                  </div>
                  <div className="text-sm font-bold text-[#28384A]">
                    {item.label}
                  </div>
                  <p className="text-xs text-[#7B8CA1] leading-relaxed pt-1">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Konsultasi Keislaman Promo Banner */}
        <div className="bg-linear-to-r from-[#1F5FD0] to-[#12377E] rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center shrink-0 hidden sm:flex">
              <HelpCircle className="w-7 h-7 text-[#F0BD28]" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#FCA5A5] uppercase tracking-wider">
                Layanan Umat & Konseling
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Konsultasi Keislaman & Bimbingan Syariah
              </h3>
              <p className="text-xs sm:text-sm text-white/80 max-w-xl">
                Dapatkan bimbingan dan jawaban seputar fiqih, muamalah, dan problematika keluarga langsung dari para asatidz kami.
              </p>
            </div>
          </div>

          <a
            href="https://cholilnafis.id/#konsultasi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold text-[#0B2F6B] bg-[#F0BD28] hover:bg-[#e0ad19] shadow-md transition-all shrink-0 transform hover:-translate-y-0.5"
          >
            <span>Mulai Konsultasi</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
