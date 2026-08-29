import React from 'react';
import { Metadata } from 'next';
import Breadcrumb from '@/components/common/Breadcrumb';
import ContactForm from '@/components/contact/ContactForm';
import FAQAccordion from '@/components/contact/FAQAccordion';
import GlobalCTA from '@/components/layout/GlobalCTA';
import { contactInfo } from '@/content/mock/contact';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  ArrowUpRight,
  Building2,
  GraduationCap,
  BookOpen,
  ExternalLink
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kontak Kami — Pesantren Cendekia Amanah',
  description:
    'Hubungi Pesantren Cendekia Amanah: Alamat Kampus Depok, Layanan WhatsApp Panitia SPMB per unit, formulir pertanyaan, dan lokasi.',
  openGraph: {
    title: 'Kontak Kami — Pesantren Cendekia Amanah',
    description:
      'Tim kami siap membantu menjawab pertanyaan Anda seputar pendidikan di Cendekia Amanah.',
    images: ['/images/galery/pesantren1.png']
  }
};

export default function ContactPage() {
  const getUnitIcon = (name: string) => {
    if (name.includes('Pesantren')) return Building2;
    if (name.includes('SMP')) return GraduationCap;
    return BookOpen;
  };

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Hero Section */}
      <section className="pt-4 sm:pt-6">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-4">
          <Breadcrumb items={[{ label: 'Kontak' }]} />

          {/* Hero Banner */}
          <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 text-white bg-linear-to-r from-[#0B2F6B] via-[#1A4FA0] to-[#0B2F6B] shadow-xl border border-[#12377E]">
            <div className="max-w-2xl space-y-3">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#D8232A] text-white uppercase tracking-wider shadow-xs">
                Pusat Layanan & Sekretariat
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                HUBUNGI KAMI
              </h1>
              <p className="text-sm sm:text-base text-white/85 leading-relaxed">
                Tim sekretariat dan asatidz Pesantren Cendekia Amanah siap membantu memberikan informasi seputar kurikulum,
                asrama, pendaftaran santri baru, dan konsultasi keislaman.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Contact Info Cards */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Alamat */}
          <div className="bg-white p-6 rounded-2xl sm:rounded-3xl border border-[#DDE6F1] shadow-xs hover-lift flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-xl bg-[#EBF3FF] text-[#1A4FA0] flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-[#0B2F6B]">Alamat Kampus</h3>
              <p className="text-xs text-[#5C6B7D] leading-relaxed">
                {contactInfo.address.fullText}
              </p>
            </div>
            <a
              href={contactInfo.address.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#1A4FA0] hover:text-[#0B2F6B]"
            >
              <span>Petunjuk Arah</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 2: Telepon */}
          <div className="bg-white p-6 rounded-2xl sm:rounded-3xl border border-[#DDE6F1] shadow-xs hover-lift flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-xl bg-[#FDE8E9] text-[#D8232A] flex items-center justify-center">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-[#0B2F6B]">Nomor Telepon</h3>
              <p className="text-xs text-[#5C6B7D] leading-relaxed">
                Hubungi hotline telepon kantor sekretariat pusat:
              </p>
            </div>
            <a
              href="tel:+6285776446468"
              className="text-xs font-bold text-[#D8232A] hover:underline"
            >
              {contactInfo.phone}
            </a>
          </div>

          {/* Card 3: Email */}
          <div className="bg-white p-6 rounded-2xl sm:rounded-3xl border border-[#DDE6F1] shadow-xs hover-lift flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-xl bg-[#FEF8E8] text-[#D4A31C] flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-[#0B2F6B]">Email Resmi</h3>
              <p className="text-xs text-[#5C6B7D] leading-relaxed">
                Kirimkan surat atau pertanyaan formal ke alamat email resmi kami:
              </p>
            </div>
            <a
              href={`mailto:${contactInfo.email}`}
              className="text-xs font-bold text-[#1A4FA0] hover:underline"
            >
              {contactInfo.email}
            </a>
          </div>

          {/* Card 4: Jam Layanan */}
          <div className="bg-white p-6 rounded-2xl sm:rounded-3xl border border-[#DDE6F1] shadow-xs hover-lift flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-[#0B2F6B]">Jam Pelayanan</h3>
              <p className="text-xs text-[#5C6B7D] leading-relaxed">
                Waktu operasional kantor sekretariat dan penerimaan tamu:
              </p>
            </div>
            <span className="text-xs font-bold text-[#28384A]">
              {contactInfo.workingHours}
            </span>
          </div>
        </div>
      </section>

      {/* WhatsApp Unit Links & Form Grid */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: WhatsApp Per Unit List (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-linear-to-br from-[#D8232A] to-[#B81C22] p-6 sm:p-8 rounded-3xl text-white shadow-lg space-y-6">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 fill-white text-[#D8232A]" />
                </div>
                <h3 className="text-xl font-bold text-white">Layanan WhatsApp Unit</h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Pilih nomor WhatsApp sesuai unit yang ingin Anda tanyakan untuk respons lebih cepat dan terarah:
                </p>
              </div>

              <div className="space-y-3">
                {contactInfo.whatsappUnits.map((unit) => {
                  const Icon = getUnitIcon(unit.unitName);

                  return (
                    <a
                      key={unit.unitName}
                      href={unit.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 rounded-2xl bg-white/10 hover:bg-white text-white hover:text-[#0B2F6B] border border-white/20 transition-all duration-200 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-white/15 text-white group-hover:bg-[#FDE8E9] group-hover:text-[#D8232A] transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold">{unit.unitName}</div>
                          <div className="text-[11px] text-white/70 group-hover:text-[#5C6B7D]">
                            {unit.formattedNumber}
                          </div>
                        </div>
                      </div>

                      <ArrowUpRight className="w-4 h-4 text-white/60 group-hover:text-[#D8232A] transition-colors" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Google Maps / Location Box */}
            <div className="bg-white rounded-3xl p-6 border border-[#DDE6F1] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#0B2F6B] flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#D8232A]" />
                  <span>Lokasi Kampus</span>
                </h3>
                <a
                  href={contactInfo.address.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#1A4FA0] flex items-center gap-1 hover:underline"
                >
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-[#E6EDF6] bg-gray-100">
                <iframe
                  src={contactInfo.address.mapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Peta Lokasi Pesantren Cendekia Amanah"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Right: Contact Form (7 cols on lg) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-[1000px] mx-auto px-4 sm:px-6">
        <FAQAccordion />
      </section>

      {/* Global Callout */}
      <GlobalCTA />
    </div>
  );
}
