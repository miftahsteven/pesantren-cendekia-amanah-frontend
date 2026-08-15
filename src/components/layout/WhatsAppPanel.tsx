'use client';

import React from 'react';
import { useUI } from '@/context/UIContext';
import { contactInfo } from '@/content/mock/contact';
import { X, ArrowUpRight, Building2, GraduationCap, BookOpen } from 'lucide-react';
import { WhatsAppIcon } from '@/components/common/SocialIcons';

export default function WhatsAppPanel() {
  const { isWhatsAppPanelOpen, closeWhatsAppPanel } = useUI();

  if (!isWhatsAppPanelOpen) return null;

  const getUnitIcon = (name: string) => {
    if (name.includes('Pesantren')) return Building2;
    if (name.includes('SMP')) return GraduationCap;
    return BookOpen;
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-end sm:items-center justify-end sm:justify-end sm:pr-8 p-4 animate-fade-in"
      onClick={closeWhatsAppPanel}
    >
      <div
        className="w-full sm:w-96 bg-white rounded-2xl shadow-2xl border border-[#DDE6F1] overflow-hidden animate-slide-down"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="whatsapp-panel-title"
      >
        {/* Header with WhatsApp Official Green */}
        <div className="bg-[#25D366] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <WhatsAppIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 id="whatsapp-panel-title" className="font-bold text-base text-white">
                Layanan WhatsApp
              </h3>
              <p className="text-xs text-white/90">Pilih Unit Pendidikan Tujuan Anda</p>
            </div>
          </div>
          <button
            onClick={closeWhatsAppPanel}
            className="p-1.5 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            aria-label="Tutup panel WhatsApp"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Units WhatsApp List */}
        <div className="p-4 space-y-2.5 max-h-[60vh] overflow-y-auto">
          <p className="text-xs text-[#5C6B7D] mb-2 px-1">
            Admin dan Panitia SPMB siap melayani pertanyaan seputar pendaftaran, biaya, dan program:
          </p>

          {contactInfo.whatsappUnits.map((unit) => {
            const Icon = getUnitIcon(unit.unitName);

            return (
              <a
                key={unit.unitName}
                href={unit.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl border border-[#E6EDF6] hover:border-[#25D366] hover:bg-[#EAF7EF]/50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#EAF7EF] text-[#17804A] group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#28384A] group-hover:text-[#17804A] transition-colors">
                      {unit.unitName}
                    </h4>
                    <p className="text-[11px] text-[#7B8CA1]">{unit.formattedNumber}</p>
                  </div>
                </div>

                <ArrowUpRight className="w-4 h-4 text-[#7B8CA1] group-hover:text-[#25D366] transition-colors" />
              </a>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="px-4 py-3 bg-[#F4F7FB] border-t border-[#E6EDF6] text-center">
          <p className="text-[11px] text-[#7B8CA1]">
            Jam Pelayanan: {contactInfo.workingHours}
          </p>
        </div>
      </div>
    </div>
  );
}
