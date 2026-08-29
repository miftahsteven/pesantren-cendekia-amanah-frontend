import React from 'react';
import Image from 'next/image';
import SectionHeader from '@/components/common/SectionHeader';
import { contentRepo } from '@/repositories/content.repository';
import { Quote, Star } from 'lucide-react';
import { getUploadUrl } from '@/lib/uploads';

export default async function TestimoniSection() {
  const testimonials = await contentRepo.getTestimonials();

  return (
    <section className="py-14 sm:py-16 bg-[#F4F7FB]/50 border-y border-[#DDE6F1]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <SectionHeader
          badge="Apresiasi & Kesan"
          title="KATA MEREKA"
          subtitle="Testimoni tulus dari orang tua santri, alumni, dan tokoh nasional tentang kualitas pendidikan di Pesantren Cendekia Amanah."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-[#DDE6F1] shadow-xs hover-lift flex flex-col justify-between space-y-6 relative overflow-hidden"
            >
              <Quote className="w-16 h-16 text-[#EBF3FF] absolute top-3 right-3 -z-0 pointer-events-none" />

              <div className="space-y-4 relative z-10">
                {/* Rating stars */}
                <div className="flex items-center gap-1 text-[#F0BD28]">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#F0BD28]" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-[#5C6B7D] leading-relaxed italic">
                  &ldquo;{item.content}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-[#F4F7FB] flex items-center gap-3 relative z-10">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 border border-[#DDE6F1] shrink-0">
                  <Image
                    src={getUploadUrl(item.avatar)}
                    alt={item.author}
                    fill
                    className="object-cover object-top"
                    sizes="48px"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0B2F6B] leading-snug">{item.author}</h4>
                  <p className="text-[10px] text-[#D8232A] font-semibold">{item.category}</p>
                  <p className="text-[10px] text-[#7B8CA1] line-clamp-1">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
