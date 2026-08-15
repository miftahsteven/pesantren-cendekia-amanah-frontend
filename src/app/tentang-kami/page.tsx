import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from '@/components/common/Breadcrumb';
import SectionHeader from '@/components/common/SectionHeader';
import GlobalCTA from '@/components/layout/GlobalCTA';
import SambutanPengasuh from '@/components/home/SambutanPengasuh';
import { siteConfig } from '@/content/mock/site';
import { getUploadUrl } from '@/lib/uploads';
import {
  CheckCircle2,
  Target,
  Compass,
  Award,
  ShieldCheck,
  Users,
  Building2,
  BookOpen,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tentang Kami — Pesantren Cendekia Amanah',
  description:
    'Profil, sejarah, visi misi, struktur kepengurusan, dan nilai luhur Lembaga Pendidikan Terpadu Pesantren Cendekia Amanah di bawah asuhan KH. Cholil Nafis, Ph.D.',
  openGraph: {
    title: 'Tentang Kami — Pesantren Cendekia Amanah',
    description:
      'Mengenal Lembaga Pendidikan Terpadu Cendekia Amanah: Mencetak Generasi Qurani, Berprestasi, dan Berjiwa Pemimpin.',
    images: ['/uploads/gallery/pesantren6.png']
  }
};

export default function TentangKamiPage() {
  const coreValues = [
    {
      icon: Sparkles,
      title: 'Qur’ani & Berkarakter',
      desc: 'Menjadikan Al-Qur’an dan Sunnah sebagai pedoman utama dalam pembentukan akhlak karimah dan kepribadian santri.'
    },
    {
      icon: Award,
      title: 'Unggul & Berprestasi',
      desc: 'Mendorong pencapaian akademik dan non-akademik tertinggi di tingkat nasional maupun internasional.'
    },
    {
      icon: Compass,
      title: 'Berjiwa Pemimpin',
      desc: 'Menanamkan jiwa kepemimpinan amanah, kemandirian, kedisiplinan, serta kepedulian sosial kemasyarakatan.'
    },
    {
      icon: ShieldCheck,
      title: 'Amanah & Berwawasan Global',
      desc: 'Menjaga integritas dan kepercayaan umat dengan menguasai bahasa internasional dan sains teknologi modern.'
    }
  ];

  const facilities = [
    {
      title: 'Masjid Jami’ Cendekia',
      desc: 'Pusat ibadah berjamaah, tahfidz Al-Qur’an, kajian kitab kuning, dan pembinaan spiritual santri.',
      image: '/uploads/gallery/pesantren1.png'
    },
    {
      title: 'Asrama Putra & Putri Representatif',
      desc: 'Hunian asrama bersih, nyaman, dan ber-AC dengan pengawasan asatidz/asatidzah 24 jam.',
      image: '/uploads/gallery/pesantren2.png'
    },
    {
      title: 'Laboratorium Sains & Komputer',
      desc: 'Fasilitas riset modern untuk menunjang pembelajaran sains terapan, robotik, dan literasi digital.',
      image: '/uploads/gallery/sma1.png'
    },
    {
      title: 'Smart Classroom & Perpustakaan',
      desc: 'Ruang kelas interaktif multimedia dan perpustakaan referensi kitab klasik serta buku modern.',
      image: '/uploads/gallery/smp1.png'
    }
  ];

  return (
    <div className="space-y-14 sm:space-y-16">
      {/* Hero Header */}
      <section className="pt-4 sm:pt-6">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-4">
          <Breadcrumb items={[{ label: 'Tentang Kami' }]} />

          {/* Hero Banner */}
          <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 text-white bg-linear-to-r from-[#0B2F6B] via-[#1A4FA0] to-[#0B2F6B] shadow-xl border border-[#12377E]">
            <div className="max-w-3xl space-y-3">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#17804A] text-white uppercase tracking-wider shadow-xs">
                Profil Institusi
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                TENTANG CENDEKIA AMANAH
              </h1>
              <p className="text-sm sm:text-base text-white/85 leading-relaxed">
                Lembaga Pendidikan Terpadu yang mengintegrasikan nilai-nilai kepesantrenan salaf, keunggulan kurikulum
                nasional, penguasaan sains teknologi, dan pembinaan karakter kepemimpinan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Profil Lembaga & Sejarah Singkat */}
      <section id="profil" className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#DDE6F1] shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold text-[#17804A] uppercase tracking-wider">
                Mengenal Lebih Dekat
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2F6B] leading-tight">
                Mendidik dengan Hati, Membangun Generasi Rabbani
              </h2>
              <p className="text-xs sm:text-sm text-[#5C6B7D] leading-relaxed">
                Didirikan pada tahun 2017 oleh <strong>KH. Cholil Nafis, Lc., MA., Ph.D</strong>, Pesantren Cendekia
                Amanah hadir sebagai ikhtiar menjawab tantangan zaman dengan menyajikan pendidikan Islam terpadu yang
                bermutu tinggi di kawasan Depok, Jawa Barat.
              </p>
              <p className="text-xs sm:text-sm text-[#5C6B7D] leading-relaxed">
                Kami membina empat unit pendidikan berkesinambungan: Pondok Pesantren Tahfidz & Dirasah Islamiyah, SMP
                Cendekia Amanah, SMA Cendekia Amanah, serta Madrasah Diniyah Takmiliyah Awaliyah (MDTA).
              </p>

              <div className="pt-2 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#F4F7FB] border border-[#DDE6F1]">
                  <div className="text-2xl font-black text-[#0B2F6B]">2017</div>
                  <div className="text-xs text-[#7B8CA1] font-medium">Tahun Berdiri</div>
                </div>
                <div className="p-4 rounded-2xl bg-[#EAF7EF] border border-[#8ED6A8]/40">
                  <div className="text-2xl font-black text-[#17804A]">4 Unit</div>
                  <div className="text-xs text-[#17804A] font-medium">Pendidikan Terpadu</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden shadow-lg border border-[#DDE6F1]">
                <Image
                  src={getUploadUrl('/uploads/gallery/pesantren6.png')}
                  alt="Kampus Pesantren Cendekia Amanah"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 600px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visi & Misi */}
      <section id="visi-misi" className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Visi */}
          <div className="bg-linear-to-br from-[#0B2F6B] to-[#1A4FA0] text-white p-8 sm:p-10 rounded-3xl shadow-md space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center text-[#F0BD28]">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold">Visi Kami</h3>
            <p className="text-sm text-white/90 leading-relaxed italic">
              &ldquo;Menjadi lembaga pendidikan Islam unggul dan terpercaya yang melahirkan generasi Qurani, berilmu
              luas, berakhlak mulia, dan berjiwa pemimpin untuk kemaslahatan umat dan bangsa.&rdquo;
            </p>
          </div>

          {/* Misi */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#DDE6F1] shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#EAF7EF] flex items-center justify-center text-[#17804A]">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-[#0B2F6B]">Misi Kami</h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#5C6B7D]">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#17804A] shrink-0 mt-0.5" />
                <span>Menyelenggarakan tahfidz Al-Qur’an dan pendalaman ilmu keislaman berbasis kitab turats.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#17804A] shrink-0 mt-0.5" />
                <span>Menerapkan kurikulum akademik modern terintegrasi sains, teknologi, dan bahasa asing.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#17804A] shrink-0 mt-0.5" />
                <span>Membina kepemimpinan santri melalui keteladanan, kedisiplinan asrama, dan organisasi.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#17804A] shrink-0 mt-0.5" />
                <span>Membangun jejaring kerjasama pendidikan dengan perguruan tinggi dalam dan luar negeri.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Nilai-Nilai Utama (Core Values) */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-8">
        <SectionHeader
          badge="Nilai Dasar"
          title="NILAI-NILAI UTAMA KAMI"
          subtitle="Pilar karakter yang menjadi landasan seluruh proses pendidikan di Cendekia Amanah."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl sm:rounded-3xl border border-[#DDE6F1] shadow-xs hover-lift space-y-3"
              >
                <div className="w-12 h-12 rounded-xl bg-[#EBF3FF] text-[#1A4FA0] flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-[#0B2F6B]">{val.title}</h4>
                <p className="text-xs text-[#5C6B7D] leading-relaxed">{val.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Sambutan Pengasuh */}
      <div id="sambutan">
        <SambutanPengasuh />
      </div>

      {/* Sarana & Fasilitas Lembaga */}
      <section id="fasilitas" className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-8">
        <SectionHeader
          badge="Sarana Prasarana"
          title="FASILITAS KAMPUS TERPADU"
          subtitle="Mendukung kegiatan belajar mengajar, tahfidz, riset, dan kehidupan asrama yang kondusif."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {facilities.map((fac, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-[#DDE6F1] overflow-hidden shadow-xs hover-lift flex flex-col sm:flex-row group"
            >
              <div className="relative h-48 sm:h-auto sm:w-2/5 shrink-0 overflow-hidden bg-gray-100">
                <Image
                  src={fac.image}
                  alt={fac.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="300px"
                />
              </div>
              <div className="p-6 space-y-2 flex-1 flex flex-col justify-center">
                <h4 className="text-base font-bold text-[#0B2F6B] group-hover:text-[#1A4FA0] transition-colors">
                  {fac.title}
                </h4>
                <p className="text-xs text-[#5C6B7D] leading-relaxed">{fac.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Unit Pendidikan Links */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="p-8 sm:p-10 rounded-3xl bg-[#F4F7FB] border border-[#DDE6F1] text-center space-y-6">
          <div className="space-y-2 max-w-xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-[#0B2F6B]">
              Jelajahi Unit Pendidikan Kami
            </h3>
            <p className="text-xs sm:text-sm text-[#5C6B7D]">
              Pelajari program unggulan dan kurikulum pada setiap jenjang pendidikan di Cendekia Amanah.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Pondok Pesantren', href: '/pesantren', desc: 'Tahfidz 30 Juz & Dirasah Islamiyah' },
              { name: 'SMP Cendekia Amanah', href: '/smp', desc: 'Kurikulum Nasional & Digital Smart Class' },
              { name: 'SMA Cendekia Amanah', href: '/sma', desc: 'Riset Ilmiah & Persiapan PTN Favorit' },
              { name: 'Madrasah Diniyah', href: '/diniyah', desc: 'Aqidah, Fiqih Ibadah & Tartil Sore' }
            ].map((u) => (
              <Link
                key={u.href}
                href={u.href}
                className="p-5 rounded-2xl bg-white border border-[#DDE6F1] shadow-xs hover:border-[#1A4FA0] hover-lift text-left group flex flex-col justify-between space-y-2"
              >
                <div>
                  <h4 className="text-sm font-bold text-[#0B2F6B] group-hover:text-[#1A4FA0] transition-colors">
                    {u.name}
                  </h4>
                  <p className="text-xs text-[#7B8CA1] leading-snug mt-1">{u.desc}</p>
                </div>
                <div className="inline-flex items-center gap-1 text-xs font-bold text-[#1A4FA0] group-hover:text-[#17804A] transition-colors pt-2">
                  <span>Lihat Detail</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Global CTA */}
      <GlobalCTA />
    </div>
  );
}
