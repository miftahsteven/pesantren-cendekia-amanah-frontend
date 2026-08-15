import React from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import { agendas } from '@/content/mock/agenda';
import { Clock, MapPin, CalendarDays, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AgendaKegiatan() {
  return (
    <section className="py-14 sm:py-16 bg-white border-y border-[#DDE6F1]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <SectionHeader
          badge="Jadwal & Agenda"
          title="AGENDA KEGIATAN"
          subtitle="Rangkaian kegiatan, kompetisi, dan program penting mendatang di lingkungan Pesantren Cendekia Amanah."
          actionText="Lihat Kalender Akademik"
          actionHref="/kontak"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {agendas.map((agenda) => (
            <div
              key={agenda.id}
              className="bg-[#F4F7FB]/70 rounded-2xl sm:rounded-3xl p-6 border border-[#DDE6F1] shadow-xs hover-lift flex flex-col justify-between space-y-5 group"
            >
              <div className="flex items-start gap-4">
                {/* Calendar Date Badge */}
                <div className="w-16 h-18 rounded-2xl bg-[#0B2F6B] text-white flex flex-col items-center justify-center shrink-0 shadow-sm group-hover:bg-[#1A4FA0] transition-colors">
                  <span className="text-xl font-black leading-none">{agenda.day}</span>
                  <span className="text-[10px] font-bold text-[#8ED6A8] uppercase tracking-wider mt-1">
                    {agenda.month}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-1.5 flex-1">
                  {agenda.status && (
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EAF7EF] text-[#17804A] border border-[#8ED6A8]/40">
                      {agenda.status}
                    </span>
                  )}
                  <h3 className="text-sm sm:text-base font-bold text-[#0B2F6B] leading-snug group-hover:text-[#1A4FA0] transition-colors">
                    {agenda.title}
                  </h3>
                </div>
              </div>

              {/* Meta Info */}
              <div className="pt-3 border-t border-[#DDE6F1] space-y-1.5 text-xs text-[#5C6B7D]">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#17804A] shrink-0" />
                  <span>{agenda.time}</span>
                </div>
                {agenda.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#1A4FA0] shrink-0" />
                    <span className="line-clamp-1">{agenda.location}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
