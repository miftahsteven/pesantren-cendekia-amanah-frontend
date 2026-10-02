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
          {/* Box Besar Sebelah Kiri - Kategori TOKOH (Highlight dengan Foto Besar) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-gradient-to-br from-[#07214E] via-[#0B2F6B] to-[#123D8A] text-white rounded-3xl p-6 sm:p-8 border border-[#1E4A96]/60 shadow-lg relative overflow-hidden flex flex-col justify-between h-full group hover:shadow-2xl transition-all">
              {/* Decorative Background Elements */}
              <Quote className="w-32 h-32 text-white/5 absolute -bottom-6 -right-6 pointer-events-none -rotate-12" />
              <div className="absolute top-0 right-0 w-72 h-72 bg-radial from-[#F0BD28]/10 via-blue-400/10 to-transparent pointer-events-none" />

              {/* 1. Header Bar: Tokoh Nasional badge & Stars */}
              <div className="flex items-center justify-between gap-3 relative z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#D8232A] text-white shadow-xs">
                  <Award className="w-3.5 h-3.5 text-[#F0BD28]" />
                  <span>Tokoh Nasional</span>
                </span>

                <div className="flex items-center gap-1 text-[#F0BD28]">
                  {[...Array(tokoh.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#F0BD28]" />
                  ))}
                </div>
              </div>

              {/* 2. Highlight Showcase: Foto Besar & Identitas Tokoh */}
              <div className="flex flex-col items-center text-center my-auto py-5 relative z-10">
                <div className="relative group/photo mb-4">
                  {/* Glowing Aura Effect */}
                  <div className="absolute -inset-2 bg-gradient-to-tr from-[#D8232A]/30 via-white/15 to-[#F0BD28]/35 rounded-3xl blur-xl opacity-80 group-hover/photo:opacity-100 transition duration-500" />

                  {/* Foto Besar Framed */}
                  <div className="relative w-44 h-56 sm:w-52 sm:h-64 rounded-3xl overflow-hidden border-3 border-white/30 shadow-2xl bg-white/10">
                    <Image
                      src={getUploadUrl(tokoh.avatar)}
                      alt={tokoh.author}
                      fill
                      className="object-cover object-top group-hover/photo:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 176px, 208px"
                      priority
                    />
                  </div>

                  {/* Verified Checkmark Badge */}
                  <div className="absolute -bottom-2 -right-2 bg-[#D8232A] text-white p-1.5 rounded-full shadow-lg border-2 border-[#07214E]">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Nama & Gelar Tokoh */}
                <div className="space-y-1 max-w-sm">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight">
                    {tokoh.author}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-[#F0BD28] tracking-wide">
                    {tokoh.role}
                  </p>
                </div>
              </div>

              {/* 3. Quote Box Tokoh */}
              <div className="relative z-10 bg-white/10 rounded-2xl p-4 sm:p-5 border border-white/15 backdrop-blur-xs shadow-inner">
                <Quote className="w-6 h-6 text-[#F0BD28] mb-1.5 opacity-90" />
                <blockquote className="text-xs sm:text-sm md:text-[15px] font-medium leading-relaxed italic text-white/95">
                  &ldquo;{tokoh.content}&rdquo;
                </blockquote>
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
