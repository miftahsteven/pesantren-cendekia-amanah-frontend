'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { RotateCcw, Home, AlertTriangle } from 'lucide-react';

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App Error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-12 rounded-3xl border border-[#DDE6F1] shadow-xl">
        <div className="w-20 h-20 rounded-full bg-[#FDE8E9] text-[#D8232A] flex items-center justify-center mx-auto">
          <AlertTriangle className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h1 className="text-xl sm:text-2xl font-black text-[#0B2F6B]">
            Terjadi Kesalahan
          </h1>
          <p className="text-xs sm:text-sm text-[#5C6B7D] leading-relaxed">
            Sistem kami mengalami kendala teknis saat memuat konten. Silakan muat ulang halaman atau kembali ke beranda.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-[#0B2F6B] hover:bg-[#1A4FA0] shadow-sm transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Coba Lagi</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-[#28384A] bg-[#F4F7FB] hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Ke Beranda</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
