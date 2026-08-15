'use client';

import React, { useState, useEffect } from 'react';
import { useUI } from '@/context/UIContext';
import { brochures as defaultBrochures } from '@/content/mock/brochures';
import { X, Download, FileText, Clock, CheckCircle2 } from 'lucide-react';
import { getUploadUrl } from '@/lib/uploads';

export default function BrochureModal() {
  const { isBrochureModalOpen, closeBrochureModal } = useUI();
  const [items, setItems] = useState<any[]>(defaultBrochures);

  useEffect(() => {
    async function loadBrochures() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api/v1';
        const res = await fetch(`${apiUrl}/brochures`, { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data) && json.data.length > 0) {
            setItems(
              json.data.map((b: any) => ({
                id: b.id,
                title: b.title,
                subtitle: b.unitName,
                format: 'PDF Document',
                fileSize: b.fileSize,
                downloadUrl: getUploadUrl(b.fileUrl),
                status: 'available'
              }))
            );
          }
        }
      } catch {
        // fallback
      }
    }
    if (isBrochureModalOpen) {
      loadBrochures();
    }
  }, [isBrochureModalOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isBrochureModalOpen) {
        closeBrochureModal();
      }
    };

    if (isBrochureModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isBrochureModalOpen, closeBrochureModal]);

  if (!isBrochureModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={closeBrochureModal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="brochure-modal-title"
    >
      <div
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#DDE6F1]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0B2F6B] text-white px-6 py-5 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-[#8ED6A8]">Unduh Brosur</span>
            <h2 id="brochure-modal-title" className="text-xl font-bold text-white">
              Brosur & Pamflet PPDB
            </h2>
          </div>
          <button
            onClick={closeBrochureModal}
            className="p-2 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            aria-label="Tutup modal brosur"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content List */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <p className="text-sm text-[#5C6B7D]">
            Silakan unduh dokumen panduan, rincian kurikulum, dan informasi pendaftaran santri baru berikut:
          </p>

          <div className="space-y-3">
            {items.map((item) => {
              const isAvailable = item.status === 'available';

              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-[#E6EDF6] hover:border-[#B9C8DC] transition-all bg-[#F4F7FB]/50 hover:bg-white"
                >
                  <div className="flex items-start space-x-3.5">
                    <div
                      className={`p-2.5 rounded-lg shrink-0 ${
                        isAvailable ? 'bg-[#EBF3FF] text-[#1A4FA0]' : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-sm text-[#28384A]">{item.title}</h3>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isAvailable
                              ? 'bg-[#EAF7EF] text-[#17804A] border border-[#8ED6A8]/40'
                              : 'bg-amber-50 text-amber-600 border border-amber-200'
                          }`}
                        >
                          {isAvailable ? item.format : 'SEGERA'}
                        </span>
                      </div>
                      <p className="text-xs text-[#7B8CA1] mt-0.5">{item.subtitle}</p>
                    </div>
                  </div>

                  <div className="shrink-0 ml-3">
                    {isAvailable ? (
                      <a
                        href={item.downloadUrl}
                        download
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#17804A] hover:bg-[#12643E] rounded-lg transition-colors shadow-sm"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Unduh
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-[#7B8CA1] bg-gray-100 rounded-lg">
                        <Clock className="w-3 h-3" />
                        {item.fileSize}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3.5 bg-[#EBF3FF] rounded-xl border border-[#DDE6F1] flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#1A4FA0] shrink-0 mt-0.5" />
            <p className="text-xs text-[#28384A] leading-relaxed">
              Brosur resmi memuat informasi lengkap tentang profil pesantren, syarat pendaftaran, jadwal seleksi, dan
              rincian pembiayaan tahun ajaran 2027/2028.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-gray-50 border-t border-[#E6EDF6] flex justify-end">
          <button
            onClick={closeBrochureModal}
            className="px-4 py-2 text-xs font-medium text-[#5C6B7D] hover:text-[#28384A] transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
