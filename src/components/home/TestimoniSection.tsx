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
    <section className="py-14 sm:py-16 bg-[#F4F7FB]/50 border-y border-[#DDE6F1]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <SectionHeader
          badge="Apresiasi & Kesan"
          title="KATA MEREKA"
          subtitle="Testimoni tulus dari tokoh nasional, para orang tua santri, dan alumni tentang dedikasi serta mutu pendidikan Pesantren Cendekia Amanah."
          centered
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Box Besar Sebelah Kiri - Kategori TOKOH (Foto di sebelah kanan sebagai background, teks di atasnya dengan opacity tidak terlalu gelap) */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="bg-[#07214E] text-white rounded-3xl p-7 sm:p-9 border border-[#1E4A96]/60 shadow-xl relative overflow-hidden flex flex-col justify-between h-full group min-h-[460px]">
              {/* Foto Tokoh di sebelah kanan sebagai background */}
              <div className="absolute right-0 top-0 bottom-0 w-3/5 sm:w-1/2 md:w-3/5 h-full pointer-events-none overflow-hidden">
                <Image
                  src={getUploadUrl(tokoh.avatar)}
                  alt={tokoh.author}
                  fill
                  className="object-cover object-top sm:object-right-top transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 60vw, (max-width: 1024px) 50vw, 35vw"
                  priority
                />
                {/* Gradient halus dari kiri ke kanan agar foto tetap terlihat jelas dan menyatu dengan background */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#07214E] via-[#07214E]/70 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07214E]/90 via-transparent to-[#07214E]/40" />
              </div>

              {/* Watermark Quote Dekoratif di Background */}
              <Quote className="w-28 h-28 text-white/5 absolute top-6 right-6 pointer-events-none -rotate-6" />

              {/* Lapisan overlay lembut (tidak terlalu gelap) untuk teks */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#07214E]/80 via-[#07214E]/40 to-transparent pointer-events-none" />

              {/* 1. Header Bar: Tokoh Nasional badge & Stars */}
              <div className="flex items-center justify-between gap-3 relative z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#D8232A] text-white shadow-md">
                  <Award className="w-3.5 h-3.5 text-[#F0BD28]" />
                  <span>Tokoh Nasional</span>
                </span>

                <div className="flex items-center gap-1 text-[#F0BD28] bg-black/20 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/10">
                  {[...Array(tokoh.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#F0BD28]" />
                  ))}
                </div>
              </div>

              {/* 2. Text Testimoni di atas gambar (dengan opacity tidak terlalu gelap) */}
              <div className="my-auto py-6 relative z-10 max-w-[85%] sm:max-w-[75%]">
                <Quote className="w-9 h-9 text-[#F0BD28] mb-2.5 opacity-90 drop-shadow" />
                <blockquote className="space-y-2">
                  <p className="text-base sm:text-lg lg:text-xl font-medium leading-relaxed italic text-white drop-shadow-md">
                    &ldquo;{cleanQuote(tokoh.content)}&rdquo;
                  </p>
                </blockquote>
              </div>

              {/* 3. Tokoh Identity & Status */}
              <div className="pt-5 border-t border-white/15 relative z-10 max-w-[85%] sm:max-w-[75%]">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-lg sm:text-xl font-bold text-white leading-tight drop-shadow-md">
                    {tokoh.author}
                  </h3>
                  <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0" />
                </div>
                <p className="text-xs sm:text-sm text-[#F0BD28] font-semibold mt-1 leading-snug drop-shadow-xs">
                  {tokoh.role}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/15 text-white/90 border border-white/20 backdrop-blur-xs">
                    {tokoh.category || 'Tokoh'}
                  </span>
                  <span className="text-[11px] text-white/70 italic">
                    Pesantren Cendekia Amanah
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Kotak Kecil Sebelah Kanan - Kategori UMUM */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-4">
            {umum.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-5.5 border border-[#DDE6F1] shadow-xs hover:border-[#1F5FD0] hover:shadow-md transition-all flex flex-col justify-between gap-3 relative overflow-hidden group"
              >
                <Quote className="w-12 h-12 text-[#EBF3FF] absolute top-3 right-3 -z-0 pointer-events-none" />

                <div className="space-y-2 relative z-10">
                  {/* Top Bar: Category badge & Stars */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#FDE8E9] text-[#D8232A]">
                      {item.category || 'Umum'}
                    </span>
                    <div className="flex items-center gap-1 text-[#F0BD28]">
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#F0BD28]" />
                      ))}
                    </div>
                  </div>

                  {/* Testimonial Quote */}
                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed italic line-clamp-3">
                    &ldquo;{cleanQuote(item.content)}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-3 border-t border-[#F4F7FB] flex items-center gap-3 relative z-10">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden bg-gray-100 border border-[#DDE6F1] shrink-0">
                    <Image
                      src={getUploadUrl(item.avatar)}
                      alt={item.author}
                      fill
                      className="object-cover object-top"
                      sizes="44px"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-[#0B2F6B] leading-tight group-hover:text-[#1F5FD0] transition-colors truncate">
                      {item.author}
                    </h4>
                    <p className="text-[11px] text-[#64748B] line-clamp-1 mt-0.5">
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
