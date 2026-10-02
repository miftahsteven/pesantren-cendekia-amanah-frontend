'use client';

import React, { useEffect, useState } from 'react';
import { useUI } from '@/context/UIContext';
import { contentRepo } from '@/repositories/content.repository';
import { PpdbLink } from '@/types';
import {
  X,
  ExternalLink,
  GraduationCap,
  BookOpen,
  Building2,
  Sparkles,
  MessageCircle,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import Link from 'next/link';

export default function PPDBModal() {
  const { isPpdbModalOpen, closePpdbModal } = useUI();
  const [links, setLinks] = useState<PpdbLink[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isPpdbModalOpen) {
      setIsLoading(true);
      contentRepo
        .getPpdbLinks()
        .then((data) => {
          if (data && data.length > 0) {
            setLinks(data.filter((d) => d.isActive));
          }
        })
        .catch((err) => console.error('Error loading PPDB links:', err))
        .finally(() => setIsLoading(false));
    }
  }, [isPpdbModalOpen]);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isPpdbModalOpen) {
        closePpdbModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPpdbModalOpen, closePpdbModal]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isPpdbModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isPpdbModalOpen]);

  if (!isPpdbModalOpen) return null;

  const getUnitIcon = (unitCode: string) => {
    switch (unitCode.toLowerCase()) {
      case 'sma':
        return <GraduationCap className="w-5 h-5 text-[#D8232A]" />;
      case 'smp':
        return <BookOpen className="w-5 h-5 text-[#1F5FD0]" />;
      case 'mdta':
      case 'diniyah':
        return <Building2 className="w-5 h-5 text-[#059669]" />;
      case 'pesantren':
      default:
        return <Sparkles className="w-5 h-5 text-[#D97706]" />;
    }
  };

  const getUnitBorderColor = (unitCode: string) => {
    switch (unitCode.toLowerCase()) {
      case 'sma':
        return 'hover:border-[#D8232A] hover:shadow-[#D8232A]/10';
      case 'smp':
        return 'hover:border-[#1F5FD0] hover:shadow-[#1F5FD0]/10';
      case 'mdta':
      case 'diniyah':
        return 'hover:border-[#059669] hover:shadow-[#059669]/10';
      case 'pesantren':
      default:
        return 'hover:border-[#D97706] hover:shadow-[#D97706]/10';
    }
  };

  const getUnitBtnColor = (unitCode: string) => {
    switch (unitCode.toLowerCase()) {
      case 'sma':
        return 'bg-[#D8232A] hover:bg-[#b51c22] text-white shadow-xs';
      case 'smp':
        return 'bg-[#0B2F6B] hover:bg-[#1A4FA0] text-white shadow-xs';
      case 'mdta':
      case 'diniyah':
        return 'bg-[#047857] hover:bg-[#065f46] text-white shadow-xs';
      case 'pesantren':
      default:
        return 'bg-[#B45309] hover:bg-[#92400e] text-white shadow-xs';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0B2F6B]/60 backdrop-blur-sm transition-opacity"
        onClick={closePpdbModal}
        aria-hidden="true"
      />

      {/* Modal Dialog Box */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="ppdb-modal-title"
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-[#DDE6F1] overflow-hidden flex flex-col max-h-[90vh] z-10 animate-scale-up"
      >
        {/* Header with decorative background */}
        <div className="relative px-6 py-6 sm:px-8 sm:py-7 bg-linear-to-r from-[#0B2F6B] via-[#123E84] to-[#0B2F6B] text-white">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-[#F0BD28] text-[#0B2F6B] shadow-xs">
                <Sparkles className="w-3.5 h-3.5 fill-[#0B2F6B]" />
                <span>SPMB Online 2027/2028</span>
              </span>
              <h2 id="ppdb-modal-title" className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
                Pilih Unit Pendidikan Tujuan
              </h2>
              <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                Silakan pilih jenjang pendidikan di bawah ini untuk langsung mengisi formulir pendaftaran resmi:
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={closePpdbModal}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors shrink-0"
              aria-label="Tutup jendela pendaftaran"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body / Unit Cards Grid */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-4">
          {isLoading && links.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#64748B] animate-pulse">
              Memuat pilihan formulir pendaftaran unit...
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {links.map((link) => (
                <div
                  key={link.id}
                  className={`group relative bg-[#F8FAFC] hover:bg-white p-5 rounded-2xl border border-[#DDE6F1] shadow-xs transition-all duration-300 hover:shadow-lg flex flex-col justify-between ${getUnitBorderColor(
                    link.unitCode
                  )}`}
                >
                  <div className="space-y-2.5">
                    {/* Top Row: Icon & Badge */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="w-10 h-10 rounded-xl bg-white border border-[#DDE6F1] flex items-center justify-center shadow-xs">
                        {getUnitIcon(link.unitCode)}
                      </div>
                      {link.badge && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-white border border-[#DDE6F1] text-[#0B2F6B]">
                          {link.badge}
                        </span>
                      )}
                    </div>

                    {/* Unit Name & Title */}
                    <div>
                      <h3 className="text-sm font-black text-[#0B2F6B] group-hover:text-[#1F5FD0] transition-colors leading-snug">
                        {link.title}
                      </h3>
                      <p className="text-[11px] font-bold text-[#D8232A] mt-0.5">{link.unitName}</p>
                    </div>

                    {/* Description */}
                    {link.description && (
                      <p className="text-xs text-[#5C6B7D] leading-relaxed line-clamp-2">
                        {link.description}
                      </p>
                    )}
                  </div>

                  {/* CTA Button */}
                  <div className="pt-4 mt-2 border-t border-[#E2E8F0]/70">
                    <a
                      href={link.formUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 transform group-hover:scale-[1.02] active:scale-[0.98] ${getUnitBtnColor(
                        link.unitCode
                      )}`}
                    >
                      <span>Buka Formulir Pendaftaran</span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer Assistance & Links */}
        <div className="px-6 py-4 sm:px-8 sm:py-5 bg-[#F4F7FB] border-t border-[#DDE6F1] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#5C6B7D]">
            <ShieldCheck className="w-4 h-4 text-[#0B2F6B] shrink-0" />
            <span>Formulir resmi Panitia SPMB Pesantren Cendekia Amanah</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://wa.me/6285776446468?text=Halo%20Panitia%20PPDB%20Cendekia%20Amanah%2C%20saya%20ingin%20konsultasi%20pendaftaran%20santri%20baru"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] transition-colors shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Bantuan WhatsApp</span>
            </a>

            <Link
              href="/ppdb"
              onClick={closePpdbModal}
              className="inline-flex items-center gap-1 font-bold text-[#0B2F6B] hover:text-[#1A4FA0] text-[11px] transition-colors"
            >
              <span>Alur & Brosur Lengkap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
