'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { apiContentRepo } from '@/repositories/api-content.repository';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Semua kolom wajib diisi.');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    try {
      await apiContentRepo.submitContact(formData);
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err: any) {
      setErrorMessage(err.message || 'Gagal mengirim pesan. Silakan coba beberapa saat lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#DDE6F1] shadow-md space-y-6">
      <div className="space-y-1">
        <span className="text-xs font-bold text-[#D8232A] uppercase tracking-wider">
          Formulir Pesan
        </span>
        <h3 className="text-xl font-bold text-[#0B2F6B]">Kirim Pesan ke Kami</h3>
        <p className="text-xs text-[#5C6B7D]">
          Isi formulir berikut dan tim sekretariat kami akan membalas via email atau WhatsApp.
        </p>
      </div>

      {isSuccess ? (
        <div className="p-6 rounded-2xl bg-[#FDE8E9] border border-[#FCA5A5] text-center space-y-3 animate-fade-in">
          <div className="w-12 h-12 rounded-full bg-[#D8232A] text-white flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="text-base font-bold text-[#D8232A]">Pesan Terkirim ✓</h4>
            <p className="text-xs text-[#5C6B7D]">
              Terima kasih. Pesan dan pertanyaan Anda telah kami terima dengan baik.
            </p>
          </div>
          <button
            onClick={() => setIsSuccess(false)}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-white text-[#D8232A] border border-[#FCA5A5] hover:bg-[#FDE8E9]"
          >
            Kirim Pesan Lain
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMessage && (
            <div className="p-3 rounded-xl bg-[#FDE8E9] border border-[#D8232A]/30 text-[#D8232A] text-xs font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-[#28384A] mb-1.5">
              Nama Lengkap <span className="text-[#D8232A]">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Nama Anda"
              required
              className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#F4F7FB] border border-[#DDE6F1] focus:outline-none focus:ring-2 focus:ring-[#1A4FA0] focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#28384A] mb-1.5">
              Alamat Email <span className="text-[#D8232A]">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="nama@email.com"
              required
              className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#F4F7FB] border border-[#DDE6F1] focus:outline-none focus:ring-2 focus:ring-[#1A4FA0] focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#28384A] mb-1.5">
              Pesan / Pertanyaan <span className="text-[#D8232A]">*</span>
            </label>
            <textarea
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tulis pertanyaan Anda seputar pendaftaran, biaya, program asrama, dll..."
              required
              className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#F4F7FB] border border-[#DDE6F1] focus:outline-none focus:ring-2 focus:ring-[#1A4FA0] focus:bg-white transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-full font-bold text-xs sm:text-sm text-white bg-[#0B2F6B] hover:bg-[#1A4FA0] shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Mengirim Pesan...</span>
            ) : (
              <>
                <span>Kirim Pesan</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
