import React from 'react';
import Image from 'next/image';
import SectionHeader from '@/components/common/SectionHeader';
import { contentRepo } from '@/repositories/content.repository';
import { Quote, Star, Award, CheckCircle2 } from 'lucide-react';
import { getUploadUrl } from '@/lib/uploads';
import { Testimonial } from '@/types';

const defaultTokoh: Testimonial = {
  id: 'tokoh-default',
  author: 'KH. Miftachul Achyar',
  role: "Rais 'Aam Pengurus Besar Nahdlatul Ulama (PBNU)",
  category: 'Tokoh',
  content:
    'Waduh, ini pesantren ini tanpa didoakan saja sudah sedemikian pesatnya. Nah, kalau didoakan, habis semua yang lain! Pesantren Cendekia Amanah adalah ikhtiar nyata memadukan ilmu agama, adab kepesantrenan, dan sains modern untuk mencetak generasi ulama intelektual.',
  avatar: '/uploads/guru/miftachul_akhyar-1790912556633.jpg',
  rating: 5
};

const defaultUmum: Testimonial[] = [
  {
    id: 'testi-1',
    author: 'Bapak Andi Pratama',
    role: 'Wali Santri SMP & Pesantren',
    category: 'Orang Tua Santri',
    content:
      'Sekolah ini sangat amanah dan mampu mendidik anak-anak kami menjadi pribadi yang berakhlak mulia, disiplin, dan berprestasi. Perkembangan hafalan Al-Qur’an dan kemandirian ananda sangat membahagiakan kami.',
    avatar: '/uploads/guru/guru5.png',
    rating: 5
  },
  {
    id: 'testi-2',
    author: 'Ahmad Fauzan, S.T.',
    role: 'Alumni SMA Cendekia Amanah 2021 (Kini Software Engineer)',
    category: 'Alumni',
    content:
      'Ilmu, adab, dan tempaan kepemimpinan yang saya dapatkan selama berasrama di Cendekia Amanah menjadi bekal utama saya menembus PTN impian dan berkarir profesional dengan percaya diri.',
    avatar: '/uploads/guru/guru6.png',
    rating: 5
  },
  {
    id: 'testi-3',
    author: 'Prof. Dr. H. Nasaruddin Umar, MA',
    role: 'Imam Besar Masjid Istiqlal / Menteri Agama RI',
    category: 'Tokoh Pendidikan',
    content:
      'Cendekia Amanah adalah lembaga pendidikan Islam terpadu yang memadukan kedalaman spiritualitas kepesantrenan dengan kecerdasan sains modern. Sangat layak menjadi teladan dan rujukan umat.',
    avatar: '/uploads/guru/kh-nasarudin-1790912662845.jpg',
    rating: 5
  }
];

export default async function TestimoniSection() {
  const testimonials = await contentRepo.getTestimonials();

  // Find Tokoh testimonial (author contains Miftah or category is Tokoh)
  const tokoh =
    testimonials.find(
      (t) =>
        t.category?.toLowerCase() === 'tokoh' ||
        t.author?.toLowerCase().includes('miftah')
    ) || defaultTokoh;

  // Filter General testimonials (excluding the chosen tokoh)
  const generalTestimonials = testimonials.filter((t) => t.id !== tokoh.id);
  const umum = generalTestimonials.length >= 3 ? generalTestimonials.slice(0, 3) : defaultUmum;

  const cleanQuote = (text: string) => text.replace(/^["“”\s]+|["“”\s]+$/g, '');

  return (
    <section className="py-10 sm:py-12 bg-[#F4F7FB]/50 border-y border-[#DDE6F1]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <SectionHeader
          badge="Apresiasi & Kesan"
          title="KATA MEREKA"
          subtitle="Testimoni tulus dari tokoh nasional, para orang tua santri, dan alumni tentang dedikasi serta mutu pendidikan Pesantren Cendekia Amanah."
          centered
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch mt-8">
          {/* Box Sebelah Kiri - Kategori TOKOH (Foto di atas, testimoni di bawah, ukuran profesional dan tidak terlalu besar) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-[#0B2F6B] text-white rounded-2xl border border-[#1E4A96]/60 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between h-full group">
              {/* 1. Foto Tokoh di Atas (Bersih, Wajah Tidak Tertutup Teks) */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900 shrink-0">
                <Image
                  src={getUploadUrl(tokoh.avatar)}
                  alt={tokoh.author}
                  fill
                  className="object-cover object-top sm:object-[center_15%] transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  priority
                />
                {/* Gradasi lembut di bagian bawah foto agar menyatu ke area testimoni */}
                <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#0B2F6B] to-transparent pointer-events-none" />

                {/* Badge Mengambang di Atas Foto */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none z-10">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#D8232A] text-white shadow-md">
                    <Award className="w-3 h-3 text-[#F0BD28]" />
                    <span>Tokoh Nasional</span>
                  </span>
                  <div className="flex items-center gap-0.5 bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded-full border border-white/10 text-[#F0BD28]">
                    {[...Array(tokoh.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-[#F0BD28]" />
                    ))}
                  </div>
                </div>
              </div>

              {/* 2. Area Testimoni Berada di Bawah Gambar */}
              <div className="p-4 sm:p-4.5 flex-1 flex flex-col justify-between gap-3 bg-[#0B2F6B]">
                {/* Kutipan Testimoni */}
                <div className="flex items-start gap-2.5">
                  <Quote className="w-5 h-5 text-[#F0BD28] shrink-0 mt-0.5 opacity-90" />
                  <p className="text-xs sm:text-[13px] text-white/95 italic font-medium leading-relaxed">
                    &ldquo;{cleanQuote(tokoh.content)}&rdquo;
                  </p>
                </div>

                {/* Identitas Tokoh */}
                <div className="pt-2.5 border-t border-white/10 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-sm sm:text-base font-bold text-white leading-tight truncate">
                        {tokoh.author}
                      </h3>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                    </div>
                    <p className="text-[11px] text-[#F0BD28] font-semibold truncate mt-0.5">
                      {tokoh.role}
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider bg-white/10 text-white/90 border border-white/15 shrink-0">
                    {tokoh.category || 'Tokoh'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Kotak Kecil Sebelah Kanan - Kategori UMUM (Menyesuaikan besarnya box kiri) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-2.5 sm:gap-3">
            {umum.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-3.5 sm:p-4 border border-[#DDE6F1] shadow-xs hover:border-[#1F5FD0] hover:shadow-sm transition-all flex flex-col justify-between gap-2 relative overflow-hidden group"
              >
                {/* Top: Kategori & Bintang */}
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#FDE8E9] text-[#D8232A]">
                    {item.category || 'Umum'}
                  </span>
                  <div className="flex items-center gap-0.5 text-[#F0BD28]">
                    {[...Array(item.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-[#F0BD28]" />
                    ))}
                  </div>
                </div>

                {/* Kutipan Testimoni Singkat & Rapi */}
                <p className="text-xs text-[#475569] leading-relaxed italic line-clamp-2">
                  &ldquo;{cleanQuote(item.content)}&rdquo;
                </p>

                {/* Info Penulis Testimoni */}
                <div className="pt-2 border-t border-[#F4F7FB] flex items-center gap-2.5">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-100 border border-[#DDE6F1] shrink-0">
                    <Image
                      src={getUploadUrl(item.avatar)}
                      alt={item.author}
                      fill
                      className="object-cover object-top"
                      sizes="32px"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-[#0B2F6B] leading-tight group-hover:text-[#1F5FD0] transition-colors truncate">
                      {item.author}
                    </h4>
                    <p className="text-[10px] text-[#64748B] line-clamp-1 mt-0.5">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
