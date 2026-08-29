'use client';

import React from 'react';
import { useUI } from '@/context/UIContext';
import { Download, MessageSquare } from 'lucide-react';
import { WhatsAppIcon } from '@/components/common/SocialIcons';

export default function FloatingActions() {
  const { openBrochureModal, toggleWhatsAppPanel } = useUI();

  return (
    <>
      {/* Desktop Vertical Square Action Cards on right side */}
      <aside
        aria-label="Aksi Cepat"
        className="fixed right-0 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col space-y-2.5 items-end"
      >
        {/* 1. Konsultasi Keislaman (Dark Green Square) */}
        <a
          href="https://cholilnafis.id/#konsultasi"
          target="_blank"
          rel="noopener noreferrer"
          className="w-[78px] h-[78px] bg-[#D8232A] hover:bg-[#B81C22] text-white rounded-l-2xl shadow-xl transition-all duration-200 transform hover:-translate-x-1.5 flex flex-col items-center justify-center gap-1 text-center p-1.5 group"
          title="Konsultasi Keislaman bersama KH. Cholil Nafis"
        >
          <MessageSquare className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-bold leading-tight">
            Konsultasi<br />Keislaman
          </span>
        </a>

        {/* 2. WhatsApp (Official WhatsApp Green Square) */}
        <button
          onClick={toggleWhatsAppPanel}
          className="w-[78px] h-[78px] bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-l-2xl shadow-xl transition-all duration-200 transform hover:-translate-x-1.5 flex flex-col items-center justify-center gap-1 text-center p-1.5 group"
          title="Layanan WhatsApp Cendekia Amanah"
        >
          <WhatsAppIcon className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-bold leading-tight">
            WhatsApp
          </span>
        </button>

        {/* 3. Unduh Brosur (Navy Blue Square) */}
        <button
          onClick={openBrochureModal}
          className="w-[78px] h-[78px] bg-[#1A4FA0] hover:bg-[#0B2F6B] text-white rounded-l-2xl shadow-xl transition-all duration-200 transform hover:-translate-x-1.5 flex flex-col items-center justify-center gap-1 text-center p-1.5 group"
          title="Unduh Brosur Pendidikan"
        >
          <Download className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-bold leading-tight">
            Unduh<br />Brosur
          </span>
        </button>
      </aside>

      {/* Global Circular Floating WhatsApp Button (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          onClick={toggleWhatsAppPanel}
          className="relative group flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-full shadow-2xl shadow-[#25D366]/40 transition-all duration-300 transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#25D366]/50"
          aria-label="Buka layanan WhatsApp Pesantren Cendekia Amanah"
        >
          {/* Pulse badge effect */}
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F0BD28] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#F0BD28]"></span>
          </span>

          <WhatsAppIcon className="w-7 h-7 text-white" />

          {/* Tooltip on hover */}
          <span className="absolute right-16 bg-[#0B2F6B] text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 hidden sm:block">
            Chat WhatsApp Kami
          </span>
        </button>
      </div>
    </>
  );
}
