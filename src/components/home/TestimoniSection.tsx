import React from 'react';
import Image from 'next/image';
import SectionHeader from '@/components/common/SectionHeader';
import { contentRepo } from '@/repositories/content.repository';
import { Quote, Star, Award, CheckCircle2 } from 'lucide-react';
import { getUploadUrl } from '@/lib/uploads';
import { Testimonial } from '@/types';

const defaultTokoh: Testimonial = {
  id: 'tokoh-default',
  author: 'K.H. Miftachul Achyar',
  role: "Rais 'Aam Pengurus Besar Nahdlatul Ulama (PBNU)",
  category: 'Tokoh',
  content:
    'Waduh, ini pesantren ini tanpa didoakan saja sudah sedemikian pesatnya. Nah, kalau didoakan, habis semua yang lain! Pesantren Cendekia Amanah adalah ikhtiar nyata memadukan ilmu agama, adab kepesantrenan, dan sains modern untuk mencetak generasi ulama intelektual.',
  avatar: '/uploads/guru/_dsc3403-jpg-1790912451361.jpg',
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
    avatar: '/uploads/guru/guru7.png',
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
          {/* Box Besar Sebelah Kiri - Kategori TOKOH */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-gradient-to-br from-[#07214E] via-[#0B2F6B] to-[#123D8A] text-white rounded-3xl p-7 sm:p-9 border border-[#1E4A96]/60 shadow-md relative overflow-hidden flex flex-col justify-between h-full group hover:shadow-xl transition-all">
              {/* Decorative Background Elements */}
              <Quote className="w-28 h-28 text-white/5 absolute top-6 right-6 pointer-events-none -rotate-6" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-blue-400/10 to-transparent pointer-events-none" />

              <div className="space-y-6 relative z-10">
                {/* Header Tag Tokoh */}
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#D8232A] text-white shadow-xs">
                    <Award className="w-3.5 h-3.5 text-[#F0BD28]" />
                    <span>Tokoh Nasional</span>
                  </span>

                  {/* Stars */}
                  <div className="flex items-center gap-1 text-[#F0BD28]">
                    {[...Array(tokoh.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#F0BD28]" />
                    ))}
                  </div>
                </div>

                {/* Big Quote */}
                <blockquote className="space-y-2">
                  <p className="text-base sm:text-lg lg:text-xl font-medium leading-relaxed italic text-white/95">
                    &ldquo;{tokoh.content}&rdquo;
                  </p>
                </blockquote>
              </div>

              {/* Tokoh Author Info */}
              <div className="pt-6 mt-6 border-t border-white/15 flex items-center gap-4 relative z-10">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-white/10 border-2 border-white/30 shadow-md shrink-0">
                  <Image
                    src={getUploadUrl(tokoh.avatar)}
                    alt={tokoh.author}
                    fill
                    className="object-cover object-top"
                    sizes="80px"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                      {tokoh.author}
                    </h3>
                    <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  </div>
                  <p className="text-xs text-[#FCA5A5] font-semibold mt-0.5 uppercase tracking-wide">
                    {tokoh.category || 'Tokoh'}
                  </p>
                  <p className="text-xs sm:text-sm text-white/80 line-clamp-2 mt-0.5 leading-snug">
                    {tokoh.role}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Kotak Kecil Sebelah Kanan - Kategori UMUM */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-4">
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
                    &ldquo;{item.content}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-3 border-t border-[#F4F7FB] flex items-center gap-3 relative z-10">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100 border border-[#DDE6F1] shrink-0">
                    <Image
                      src={getUploadUrl(item.avatar)}
                      alt={item.author}
                      fill
                      className="object-cover object-top"
                      sizes="40px"
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
