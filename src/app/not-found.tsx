import React from 'react';
import Link from 'next/link';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-12 rounded-3xl border border-[#DDE6F1] shadow-xl">
        <div className="w-20 h-20 rounded-full bg-[#EBF3FF] text-[#1A4FA0] flex items-center justify-center mx-auto text-3xl font-black">
          404
        </div>

        <div className="space-y-2">
          <h1 className="text-xl sm:text-2xl font-black text-[#0B2F6B]">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-xs sm:text-sm text-[#5C6B7D] leading-relaxed">
            Mohon maaf, halaman yang Anda cari tidak tersedia, telah dipindahkan, atau tautan yang Anda tuju salah.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-[#0B2F6B] hover:bg-[#1A4FA0] shadow-sm transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Ke Halaman Utama</span>
          </Link>

          <Link
            href="/berita"
            className="w-full sm:w-auto px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-[#1A4FA0] bg-[#EBF3FF] hover:bg-[#d6e7ff] transition-colors flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Cari Berita</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
