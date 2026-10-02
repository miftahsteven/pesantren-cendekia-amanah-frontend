import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { EducationUnit, OrganizationMember, Agenda } from '@/types';
import Breadcrumb from '@/components/common/Breadcrumb';
import SectionHeader from '@/components/common/SectionHeader';
import UnitPrestasiSection from '@/components/unit/UnitPrestasiSection';
import UnitOrganizationSection from '@/components/unit/UnitOrganizationSection';
import KurikulumPesantrenSection from '@/components/unit/KurikulumPesantrenSection';
import KurikulumSMPSection from '@/components/unit/KurikulumSMPSection';
import KurikulumSMASection from '@/components/unit/KurikulumSMASection';
import KalenderAkademikSection from '@/components/unit/KalenderAkademikSection';
import SambutanKepalaUnitSection from '@/components/unit/SambutanKepalaUnitSection';
import UnitSubNav from '@/components/unit/UnitSubNav';
import TestimoniSection from '@/components/home/TestimoniSection';
import GlobalCTA from '@/components/layout/GlobalCTA';
import {
  BookOpen,
  Languages,
  ShieldCheck,
  HeartHandshake,
  GraduationCap,
  Award,
  Laptop,
  Microscope,
  Scroll,
  UserCheck,
  Sparkles,
  Building2,
  Phone,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { getUploadUrl } from '@/lib/uploads';

interface EducationUnitPageProps {
  unit: EducationUnit;
  organizations?: OrganizationMember[];
  agendas?: Agenda[];
}

export default function EducationUnitPage({ unit, organizations, agendas }: EducationUnitPageProps) {
  const getFeatureIcon = (name: string) => {
    switch (name) {
      case 'BookOpen':
        return BookOpen;
      case 'Languages':
        return Languages;
      case 'ShieldCheck':
        return ShieldCheck;
      case 'HeartHandshake':
        return HeartHandshake;
      case 'GraduationCap':
        return GraduationCap;
      case 'Award':
        return Award;
      case 'Laptop':
        return Laptop;
      case 'Microscope':
        return Microscope;
      case 'Scroll':
        return Scroll;
      case 'UserCheck':
        return UserCheck;
      default:
        return Sparkles;
    }
  };

  const unitSwitchList = [
    { id: 'pesantren', label: 'Pesantren', href: '/pesantren' },
    { id: 'smp', label: 'SMP Cendekia Amanah', href: '/smp' },
    { id: 'sma', label: 'SMA Cendekia Amanah', href: '/sma' },
    { id: 'diniyah', label: 'Madrasah Diniyah', href: '/diniyah' }
  ];

  const isPesantren = unit.id === 'pesantren';
  const isSMP = unit.id === 'smp';
  const isSMA = unit.id === 'sma';
  const isDiniyah = unit.id === 'diniyah';

  // Submenu items matching user specifications
  const subNavItems = isPesantren
    ? [
        { label: 'Profile Pesantren', href: '#profil' },
        { label: 'Kurikulum', href: '#kurikulum' },
        { label: 'Program Unggulan', href: '#program-unggulan' },
        { label: 'Struktur Organisasi', href: '#struktur-organisasi' },
        { label: 'Prestasi Santri', href: '#prestasi-santri' },
        { label: 'Kegiatan Santri', href: '#kegiatan-santri' }
      ]
    : isSMP
    ? [
        { label: 'Profile SMP', href: '#profil' },
        { label: 'Kurikulum', href: '#kurikulum' },
        { label: 'Program Unggulan', href: '#program-unggulan' },
        { label: 'Struktur Organisasi', href: '#struktur-organisasi' },
        { label: 'Prestasi Siswa', href: '#prestasi-siswa' },
        { label: 'Ekstrakurikuler', href: '#ekstrakurikuler' },
        { label: 'Kalender Akademik 1 Semester', href: '#kalender-akademik' }
      ]
    : isSMA
    ? [
        { label: 'Profile SMA', href: '#profil' },
        { label: 'Kurikulum', href: '#kurikulum' },
        { label: 'Program Unggulan', href: '#program-unggulan' },
        { label: 'Struktur Organisasi', href: '#struktur-organisasi' },
        { label: 'Prestasi Siswa', href: '#prestasi-siswa' },
        { label: 'Ekstrakurikuler', href: '#ekstrakurikuler' },
        { label: 'Kalender Akademik 1 Semester', href: '#kalender-akademik' }
      ]
    : [
        { label: `Profil ${unit.shortName || unit.name}`, href: '#profil' },
        { label: 'Program Pembelajaran', href: '#program' },
        { label: 'Struktur Organisasi', href: '#organisasi' },
        { label: 'Prestasi Siswa', href: '#prestasi' },
        { label: 'Kegiatan Siswa', href: '#kegiatan' }
      ];

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Top Header & Breadcrumb */}
      <section className="pt-4 sm:pt-6">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-4">
          <Breadcrumb items={[{ label: unit.name }]} />

          {/* Unit Hero Banner */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#DDE6F1] bg-[#0B2F6B]">
            <div className="relative h-64 sm:h-80 md:h-96 w-full">
              <Image
                src={getUploadUrl(unit.heroImage || '/uploads/gallery/pesantren6.png')}
                alt={unit.name}
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
              <div className="absolute inset-0 bg-linear-to-r from-[#0B2F6B]/90 via-[#0B2F6B]/70 to-[#0B2F6B]/30" />
            </div>

            {/* Banner Text Overlay */}
            <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 text-white space-y-3 max-w-3xl">
              <span className="inline-block self-start px-3 py-1 rounded-full text-xs font-bold bg-[#D8232A] text-white uppercase tracking-wider shadow-xs">
                {unit.badge}
              </span>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
                {unit.name}
              </h1>
              <p className="text-xs sm:text-base text-white/90 leading-relaxed drop-shadow-xs">
                {unit.tagline}
              </p>
            </div>
          </div>

          {/* Unit Switcher Bar (Chips) */}
          <div className="bg-white p-3 rounded-2xl border border-[#DDE6F1] shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              <span className="text-[10px] font-bold text-[#7B8CA1] uppercase tracking-wider mr-1 shrink-0">
                Pindah Unit:
              </span>
              {unitSwitchList.map((item) => {
                const isActive = item.id === unit.id;

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                      isActive
                        ? 'bg-[#1A4FA0] text-white shadow-xs'
                        : 'bg-[#F4F7FB] text-[#28384A] hover:bg-[#EBF3FF] hover:text-[#1A4FA0]'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/kontak"
                className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#28384A] bg-[#F4F7FB] hover:bg-gray-200 transition-colors"
              >
                <Phone className="w-3 h-3 text-[#D8232A]" />
                <span>Kontak</span>
              </Link>
              <Link
                href="/ppdb"
                className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-bold text-[#0B2F6B] bg-[#F0BD28] hover:bg-[#e0ad19] shadow-xs transition-colors"
              >
                <span>Daftar PPDB</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Unit Submenu Navigation Bar */}
      <UnitSubNav items={subNavItems} />

      {/* 4 Feature Pills */}
      <section>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {unit.features.map((feat, idx) => {
              const Icon = getFeatureIcon(feat.iconName);

              return (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-2xl border border-[#DDE6F1] shadow-xs hover-lift flex items-start gap-4"
                >
                  <div className="p-3 rounded-xl bg-[#EBF3FF] text-[#1A4FA0] shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-[#0B2F6B] leading-snug">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-[#5C6B7D] leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 1. Unit Profil Section */}
      <div id="profile" className="scroll-mt-24" />
      <section id="profil" className="py-12 bg-white border-y border-[#DDE6F1] scroll-mt-24">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#FDE8E9] text-[#D8232A] border border-[#FCA5A5]/40 uppercase tracking-wider">
                  Mengenal Lebih Dekat
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2F6B] tracking-tight">
                  PROFIL {unit.name.toUpperCase()}
                </h2>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-[#5C6B7D] leading-relaxed">
                {unit.description.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {/* Bullet Highlights */}
              <div className="space-y-2.5 pt-2">
                {unit.bulletPoints.map((bp, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#28384A]">
                    <CheckCircle2 className="w-4 h-4 text-[#D8232A] shrink-0" />
                    <span>{bp}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative h-80 sm:h-96 w-full rounded-3xl overflow-hidden shadow-xl border border-[#DDE6F1]">
                <Image
                  src={getUploadUrl(unit.heroImage)}
                  alt={unit.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
              </div>
            </div>
          </div>

          {/* Sambutan Kepala Unit (Khusus Unit SMP & SMA) */}
          {(isSMP || isSMA || Boolean(unit.welcomeName)) && <SambutanKepalaUnitSection unit={unit} />}
        </div>
      </section>

      {/* 2. Kurikulum Section (Pesantren, SMP, & SMA) */}
      {isPesantren && <KurikulumPesantrenSection />}
      {isSMP && <KurikulumSMPSection />}
      {isSMA && <KurikulumSMASection />}

      {/* 3. Program Unggulan Unit */}
      <div id="program-unggulan" className="scroll-mt-24" />
      <section id="program" className="scroll-mt-24">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-8">
          <SectionHeader
            badge="Kurikulum & Pembinaan"
            title={
              isPesantren
                ? 'PROGRAM UNGGULAN PESANTREN'
                : isSMP
                ? 'PROGRAM UNGGULAN SMP'
                : isSMA
                ? 'PROGRAM UNGGULAN SMA'
                : 'PROGRAM PEMBELAJARAN'
            }
            subtitle={
              isSMA
                ? 'Program unggulan komprehensif untuk persiapan sukses menembus Perguruan Tinggi Negeri (PTN) favorit, kedinasan, kampus luar negeri, serta kepemimpinan Islami.'
                : `Ragam program prioritas yang dirancang khusus untuk mengoptimalkan potensi ${isSMP ? 'siswa' : 'santri'} di ${unit.name}.`
            }
            centered
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {unit.programs.map((prog) => {
              const Icon = getFeatureIcon(prog.iconName || 'BookOpen');

              return (
                <div
                  key={prog.id}
                  className="bg-white p-6 rounded-2xl border border-[#DDE6F1] shadow-xs hover-lift flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-[#EBF3FF] text-[#1A4FA0] flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-[#0B2F6B]">
                      {prog.title}
                    </h3>
                    <p className="text-xs text-[#5C6B7D] leading-relaxed">
                      {prog.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Struktur Organisasi & Tenaga Pendidik */}
      {organizations && organizations.length > 0 && (
        <UnitOrganizationSection
          unitName={unit.shortName || unit.name}
          members={organizations}
        />
      )}

      {/* 5. Prestasi Siswa / Santri */}
      <UnitPrestasiSection unitCode={unit.id} initialAchievements={unit.achievements} />

      {/* 6. Kegiatan Santri / Ekstrakurikuler */}
      <div id="kegiatan-santri" className="scroll-mt-24" />
      <div id="ekstrakurikuler" className="scroll-mt-24" />
      <section id="kegiatan" className="scroll-mt-24">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-8">
          <SectionHeader
            badge={isSMP || isSMA ? 'Bakat & Minat Siswa' : 'Aktivitas Keseharian'}
            title={
              isPesantren
                ? 'KEGIATAN SANTRI PESANTREN'
                : isSMP
                ? 'EKSTRAKURIKULER SMP'
                : isSMA
                ? 'EKSTRAKURIKULER SMA'
                : 'KEGIATAN SANTRI & SISWA'
            }
            subtitle={
              isSMA
                ? 'Wadah eksplorasi minat bakat, riset ilmiah (KIR), kepemimpinan OSIS & MPK, olimpiade sains, olahraga prestasi, seni Islam, dan bahasa asing siswa SMA Cendekia Amanah.'
                : isSMP
                ? 'Wadah eksplorasi potensi bakat, kepanduan pramuka, riset sains & robotika, seni Islam, dan kebugaran jasmani siswa SMP Cendekia Amanah.'
                : 'Keseimbangan antara rutinitas ibadah, eksplorasi akademik, dan pengembangan bakat kepemimpinan.'
            }
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {unit.activities.map((act) => (
              <div
                key={act.id}
                className="bg-white p-5 rounded-2xl border border-[#DDE6F1] shadow-xs hover-lift space-y-2"
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#FDE8E9] text-[#D8232A] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-[#0B2F6B] leading-snug">
                    {act.title}
                  </h3>
                </div>
                <p className="text-xs text-[#5C6B7D] leading-relaxed pl-9">
                  {act.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Kalender Akademik 1 Semester (Khusus Unit SMP & SMA) */}
      {(isSMP || isSMA) && <KalenderAkademikSection unitCode={unit.id} initialAgendas={agendas} />}

      {/* Testimoni */}
      <TestimoniSection />

      {/* Global CTA */}
      <GlobalCTA theme={isDiniyah ? 'green' : 'blue'} />
    </div>
  );
}

