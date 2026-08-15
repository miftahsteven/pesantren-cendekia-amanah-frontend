import React from 'react';
import { Metadata } from 'next';
import Breadcrumb from '@/components/common/Breadcrumb';
import PPDBWizard from '@/components/ppdb/PPDBWizard';
import GlobalCTA from '@/components/layout/GlobalCTA';

export const metadata: Metadata = {
  title: 'PPDB Online 2027/2028 — Pesantren Cendekia Amanah',
  description:
    'Penerimaan Peserta Didik Baru (PPDB) Online Pesantren Cendekia Amanah Tahun Ajaran 2027/2028 untuk unit Pesantren, SMP, SMA, dan Madrasah Diniyah.',
  openGraph: {
    title: 'PPDB Online 2027/2028 — Pesantren Cendekia Amanah',
    description:
      'Daftar online santri baru Cendekia Amanah dalam 3 langkah mudah.',
    images: ['/images/galery/sma8.png']
  }
};

export default function PPDBPage() {
  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Hero Section */}
      <section className="pt-4 sm:pt-6">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-4">
          <Breadcrumb items={[{ label: 'PPDB Online' }]} />

          {/* Hero Banner */}
          <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 text-white bg-linear-to-r from-[#0B2F6B] via-[#1A4FA0] to-[#0B2F6B] shadow-xl border border-[#12377E]">
            <div className="max-w-2xl space-y-3">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#D8232A] text-white uppercase tracking-wider shadow-xs">
                Tahun Ajaran 2027/2028
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                PENERIMAAN PESERTA DIDIK BARU
              </h1>
              <p className="text-sm sm:text-base text-white/85 leading-relaxed">
                Lengkapi formulir pendaftaran 3 langkah berikut untuk mendaftar di Pesantren, SMP Cendekia Amanah,
                SMA Cendekia Amanah, atau Madrasah Diniyah.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <PPDBWizard />
      </section>

      {/* Global Callout */}
      <GlobalCTA />
    </div>
  );
}
