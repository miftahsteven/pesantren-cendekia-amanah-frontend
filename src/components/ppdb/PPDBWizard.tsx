'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { UnitType } from '@/types';
import { contentRepo } from '@/repositories/content.repository';
import {
  User,
  Users,
  Building2,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  RotateCcw,
  Home,
  GraduationCap,
  BookOpen,
  Award,
  AlertCircle
} from 'lucide-react';

const ppdbSchema = z.object({
  fullName: z.string().min(3, 'Nama lengkap calon santri/siswa wajib diisi (minimal 3 karakter)'),
  nisn: z.string().regex(/^\d{10}$/, 'NISN harus berupa 10 digit angka'),
  birthPlaceDate: z.string().min(5, 'Tempat dan tanggal lahir wajib diisi (contoh: Depok, 12 Mei 2013)'),
  previousSchool: z.string().min(3, 'Asal sekolah/madrasah sebelumnya wajib diisi'),
  parentName: z.string().min(3, 'Nama orang tua / wali wajib diisi'),
  whatsapp: z
    .string()
    .regex(/^(08|\+628|628)[0-9]{8,12}$/, 'Nomor WhatsApp tidak valid (contoh: 081234567890)'),
  address: z.string().min(10, 'Alamat domisili lengkap wajib diisi (minimal 10 karakter)'),
  selectedUnit: z.enum(['pesantren', 'smp', 'sma', 'diniyah'] as const, {
    error: 'Silakan pilih unit pendidikan yang dituju'
  }),
  notes: z.string().optional()
});

type FormValues = z.infer<typeof ppdbSchema>;

export default function PPDBWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    registrationNumber: string;
    data: FormValues;
  } | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(ppdbSchema),
    defaultValues: {
      fullName: '',
      nisn: '',
      birthPlaceDate: '',
      previousSchool: '',
      parentName: '',
      whatsapp: '',
      address: '',
      selectedUnit: 'pesantren',
      notes: ''
    },
    mode: 'onBlur'
  });

  const selectedUnit = watch('selectedUnit');
  const formValues = watch();

  const handleNext = async () => {
    let isValid = false;
    if (currentStep === 1) {
      isValid = await trigger(['fullName', 'nisn', 'birthPlaceDate', 'previousSchool']);
    } else if (currentStep === 2) {
      isValid = await trigger(['parentName', 'whatsapp', 'address']);
    }

    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // Simulate API submission call
      const res = await contentRepo.submitPPDB(data);
      setSubmissionResult({
        registrationNumber: res.registrationNumber,
        data: res.data
      });
    } catch (err) {
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    reset();
    setSubmissionResult(null);
    setCurrentStep(1);
  };

  const unitsList = [
    {
      id: 'pesantren' as UnitType,
      name: 'Pesantren Cendekia Amanah',
      badge: 'Boarding 24 Jam',
      icon: Building2,
      desc: 'Fokus tahfidz 30 juz mutqin, bahasa Arab, dan pembinaan kepesantrenan.'
    },
    {
      id: 'smp' as UnitType,
      name: 'SMP Cendekia Amanah',
      badge: 'Boarding / Fullday',
      icon: GraduationCap,
      desc: 'Kurikulum nasional terpadu nilai Islam, digital learning, dan robotik.'
    },
    {
      id: 'sma' as UnitType,
      name: 'SMA Cendekia Amanah',
      badge: 'Boarding / Fullday',
      icon: BookOpen,
      desc: 'Persiapan masuk PTN favorit, karya tulis ilmiah remaja, dan kepemimpinan.'
    },
    {
      id: 'diniyah' as UnitType,
      name: 'Madrasah Diniyah (MDTA)',
      badge: 'Non Formal Sore',
      icon: Award,
      desc: 'Pembinaan aqidah, fiqih ibadah dasar, akhlak, dan tartil Al-Qur’an sore hari.'
    }
  ];

  // Success Screen
  if (submissionResult) {
    return (
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#DDE6F1] shadow-xl text-center space-y-6 max-w-2xl mx-auto animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-[#EAF7EF] text-[#17804A] flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <div className="space-y-2">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#EAF7EF] text-[#17804A] uppercase tracking-wider">
            Pendaftaran Berhasil Terkirim
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2F6B]">
            Selamat, Pendaftaran Anda Diterima!
          </h2>
          <p className="text-xs sm:text-sm text-[#5C6B7D] leading-relaxed max-w-lg mx-auto">
            Terima kasih telah mendaftar di Pesantren Cendekia Amanah. Tim panitia SPMB kami akan memverifikasi data dan
            menghubungi Anda melalui WhatsApp dalam kurun waktu 1×24 jam.
          </p>
        </div>

        {/* Registration Card */}
        <div className="p-6 rounded-2xl bg-[#F4F7FB] border border-[#DDE6F1] text-left space-y-3 max-w-md mx-auto">
          <div className="flex items-center justify-between border-b border-[#DDE6F1] pb-3">
            <span className="text-xs text-[#7B8CA1] font-semibold">Nomor Pendaftaran:</span>
            <span className="text-base font-black text-[#17804A] tracking-wider">
              {submissionResult.registrationNumber}
            </span>
          </div>

          <div className="space-y-1.5 text-xs text-[#28384A]">
            <div className="flex justify-between">
              <span className="text-[#7B8CA1]">Nama Calon Santri:</span>
              <span className="font-bold">{submissionResult.data.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#7B8CA1]">Unit Pendidikan:</span>
              <span className="font-bold uppercase text-[#1A4FA0]">
                {submissionResult.data.selectedUnit}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#7B8CA1]">Orang Tua / Wali:</span>
              <span className="font-bold">{submissionResult.data.parentName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#7B8CA1]">WhatsApp:</span>
              <span className="font-bold">{submissionResult.data.whatsapp}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-[#0B2F6B] hover:bg-[#1A4FA0] transition-colors shadow-sm flex items-center justify-center gap-1.5"
          >
            <Home className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>

          <button
            onClick={handleReset}
            className="w-full sm:w-auto px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-[#17804A] bg-[#EAF7EF] hover:bg-[#d6f0df] border border-[#8ED6A8] transition-colors flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Daftar Santri Lain</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#DDE6F1] shadow-xl space-y-8 max-w-3xl mx-auto">
      {/* 3-Step Wizard Progress Bar */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          {[
            { step: 1, label: 'Data Calon Santri', icon: User },
            { step: 2, label: 'Data Orang Tua / Wali', icon: Users },
            { step: 3, label: 'Pilihan Unit & Konfirmasi', icon: Building2 }
          ].map((s) => {
            const Icon = s.icon;
            const isCompleted = currentStep > s.step;
            const isCurrent = currentStep === s.step;

            return (
              <div key={s.step} className="flex flex-col items-center text-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                    isCompleted
                      ? 'bg-[#17804A] text-white'
                      : isCurrent
                      ? 'bg-[#1A4FA0] text-white ring-4 ring-[#EBF3FF]'
                      : 'bg-[#F4F7FB] text-[#7B8CA1] border border-[#DDE6F1]'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
                </div>
                <span
                  className={`text-[11px] font-bold mt-2 hidden sm:block ${
                    isCurrent ? 'text-[#0B2F6B]' : 'text-[#7B8CA1]'
                  }`}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Progress bar line */}
        <div className="w-full bg-[#F4F7FB] h-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-[#17804A] to-[#1A4FA0] transition-all duration-300"
            style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
          />
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* STEP 1: Data Calon Santri */}
        {currentStep === 1 && (
          <div className="space-y-5 animate-fade-in">
            <div className="border-b border-[#F4F7FB] pb-3">
              <h3 className="text-lg font-bold text-[#0B2F6B]">Langkah 1: Data Calon Santri</h3>
              <p className="text-xs text-[#5C6B7D]">Lengkapi identitas diri calon peserta didik baru.</p>
            </div>

            <div className="space-y-4">
              {/* Nama Lengkap */}
              <div>
                <label className="block text-xs font-bold text-[#28384A] mb-1.5">
                  Nama Lengkap Sesuai Akta Kelahiran <span className="text-[#D8232A]">*</span>
                </label>
                <input
                  type="text"
                  {...register('fullName')}
                  placeholder="Contoh: Muhammad Raihan Pratama"
                  className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#F4F7FB] border border-[#DDE6F1] focus:outline-none focus:ring-2 focus:ring-[#1A4FA0] focus:bg-white transition-all"
                />
                {errors.fullName && (
                  <p className="text-[11px] text-[#D8232A] flex items-center gap-1 mt-1 font-medium">
                    <AlertCircle className="w-3 h-3" /> {errors.fullName.message}
                  </p>
                )}
              </div>

              {/* NISN */}
              <div>
                <label className="block text-xs font-bold text-[#28384A] mb-1.5">
                  Nomor Induk Siswa Nasional (NISN) <span className="text-[#D8232A]">*</span>
                </label>
                <input
                  type="text"
                  maxLength={10}
                  {...register('nisn')}
                  placeholder="10 digit nomor NISN resmi"
                  className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#F4F7FB] border border-[#DDE6F1] focus:outline-none focus:ring-2 focus:ring-[#1A4FA0] focus:bg-white transition-all"
                />
                {errors.nisn && (
                  <p className="text-[11px] text-[#D8232A] flex items-center gap-1 mt-1 font-medium">
                    <AlertCircle className="w-3 h-3" /> {errors.nisn.message}
                  </p>
                )}
              </div>

              {/* Tempat & Tanggal Lahir */}
              <div>
                <label className="block text-xs font-bold text-[#28384A] mb-1.5">
                  Tempat, Tanggal Lahir <span className="text-[#D8232A]">*</span>
                </label>
                <input
                  type="text"
                  {...register('birthPlaceDate')}
                  placeholder="Contoh: Depok, 12 Mei 2013"
                  className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#F4F7FB] border border-[#DDE6F1] focus:outline-none focus:ring-2 focus:ring-[#1A4FA0] focus:bg-white transition-all"
                />
                {errors.birthPlaceDate && (
                  <p className="text-[11px] text-[#D8232A] flex items-center gap-1 mt-1 font-medium">
                    <AlertCircle className="w-3 h-3" /> {errors.birthPlaceDate.message}
                  </p>
                )}
              </div>

              {/* Asal Sekolah */}
              <div>
                <label className="block text-xs font-bold text-[#28384A] mb-1.5">
                  Asal Sekolah / Madrasah Sebelumnya <span className="text-[#D8232A]">*</span>
                </label>
                <input
                  type="text"
                  {...register('previousSchool')}
                  placeholder="Contoh: SD Islam Terpadu Amanah"
                  className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#F4F7FB] border border-[#DDE6F1] focus:outline-none focus:ring-2 focus:ring-[#1A4FA0] focus:bg-white transition-all"
                />
                {errors.previousSchool && (
                  <p className="text-[11px] text-[#D8232A] flex items-center gap-1 mt-1 font-medium">
                    <AlertCircle className="w-3 h-3" /> {errors.previousSchool.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Data Orang Tua / Wali */}
        {currentStep === 2 && (
          <div className="space-y-5 animate-fade-in">
            <div className="border-b border-[#F4F7FB] pb-3">
              <h3 className="text-lg font-bold text-[#0B2F6B]">Langkah 2: Data Orang Tua / Wali</h3>
              <p className="text-xs text-[#5C6B7D]">Kontak yang dapat dihubungi oleh panitia SPMB.</p>
            </div>

            <div className="space-y-4">
              {/* Nama Orang Tua */}
              <div>
                <label className="block text-xs font-bold text-[#28384A] mb-1.5">
                  Nama Lengkap Orang Tua / Wali <span className="text-[#D8232A]">*</span>
                </label>
                <input
                  type="text"
                  {...register('parentName')}
                  placeholder="Nama ayah, ibu, atau wali murid"
                  className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#F4F7FB] border border-[#DDE6F1] focus:outline-none focus:ring-2 focus:ring-[#1A4FA0] focus:bg-white transition-all"
                />
                {errors.parentName && (
                  <p className="text-[11px] text-[#D8232A] flex items-center gap-1 mt-1 font-medium">
                    <AlertCircle className="w-3 h-3" /> {errors.parentName.message}
                  </p>
                )}
              </div>

              {/* Nomor WhatsApp */}
              <div>
                <label className="block text-xs font-bold text-[#28384A] mb-1.5">
                  Nomor WhatsApp Aktif <span className="text-[#D8232A]">*</span>
                </label>
                <input
                  type="tel"
                  {...register('whatsapp')}
                  placeholder="Contoh: 081234567890"
                  className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#F4F7FB] border border-[#DDE6F1] focus:outline-none focus:ring-2 focus:ring-[#1A4FA0] focus:bg-white transition-all"
                />
                {errors.whatsapp && (
                  <p className="text-[11px] text-[#D8232A] flex items-center gap-1 mt-1 font-medium">
                    <AlertCircle className="w-3 h-3" /> {errors.whatsapp.message}
                  </p>
                )}
              </div>

              {/* Alamat Domisili */}
              <div>
                <label className="block text-xs font-bold text-[#28384A] mb-1.5">
                  Alamat Domisili Lengkap <span className="text-[#D8232A]">*</span>
                </label>
                <textarea
                  rows={3}
                  {...register('address')}
                  placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan, kecamatan, kota/kabupaten"
                  className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#F4F7FB] border border-[#DDE6F1] focus:outline-none focus:ring-2 focus:ring-[#1A4FA0] focus:bg-white transition-all"
                />
                {errors.address && (
                  <p className="text-[11px] text-[#D8232A] flex items-center gap-1 mt-1 font-medium">
                    <AlertCircle className="w-3 h-3" /> {errors.address.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Pilihan Unit & Konfirmasi */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="border-b border-[#F4F7FB] pb-3">
              <h3 className="text-lg font-bold text-[#0B2F6B]">Langkah 3: Pilihan Unit & Ringkasan</h3>
              <p className="text-xs text-[#5C6B7D]">Pilih jenjang yang dituju dan periksa ringkasan pendaftaran Anda.</p>
            </div>

            {/* Unit Selector Cards */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-[#28384A]">
                Pilih Unit Pendidikan Tujuan <span className="text-[#D8232A]">*</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {unitsList.map((unit) => {
                  const Icon = unit.icon;
                  const isSelected = selectedUnit === unit.id;

                  return (
                    <div
                      key={unit.id}
                      onClick={() => setValue('selectedUnit', unit.id)}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                        isSelected
                          ? 'border-[#17804A] bg-[#EAF7EF]/70 shadow-xs'
                          : 'border-[#DDE6F1] bg-white hover:border-[#1A4FA0]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div
                          className={`p-2 rounded-xl ${
                            isSelected ? 'bg-[#17804A] text-white' : 'bg-[#EBF3FF] text-[#1A4FA0]'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                            isSelected
                              ? 'bg-[#17804A] text-white'
                              : 'bg-[#F4F7FB] text-[#7B8CA1]'
                          }`}
                        >
                          {unit.badge}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold text-[#0B2F6B]">{unit.name}</h4>
                        <p className="text-[11px] text-[#5C6B7D] leading-tight mt-1">{unit.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Summary Review Card */}
            <div className="p-5 rounded-2xl bg-[#F4F7FB] border border-[#DDE6F1] space-y-3">
              <h4 className="text-xs font-bold text-[#0B2F6B] uppercase tracking-wider">
                Ringkasan Data Formulir
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[#7B8CA1] block">Nama Calon Santri:</span>
                  <span className="font-bold text-[#28384A]">{formValues.fullName || '-'}</span>
                </div>
                <div>
                  <span className="text-[#7B8CA1] block">NISN:</span>
                  <span className="font-bold text-[#28384A]">{formValues.nisn || '-'}</span>
                </div>
                <div>
                  <span className="text-[#7B8CA1] block">TTL:</span>
                  <span className="font-bold text-[#28384A]">{formValues.birthPlaceDate || '-'}</span>
                </div>
                <div>
                  <span className="text-[#7B8CA1] block">Asal Sekolah:</span>
                  <span className="font-bold text-[#28384A]">{formValues.previousSchool || '-'}</span>
                </div>
                <div>
                  <span className="text-[#7B8CA1] block">Orang Tua / Wali:</span>
                  <span className="font-bold text-[#28384A]">{formValues.parentName || '-'}</span>
                </div>
                <div>
                  <span className="text-[#7B8CA1] block">WhatsApp:</span>
                  <span className="font-bold text-[#28384A]">{formValues.whatsapp || '-'}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-[#7B8CA1] block">Alamat Domisili:</span>
                  <span className="font-bold text-[#28384A]">{formValues.address || '-'}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Buttons Navigation */}
        <div className="pt-6 border-t border-[#DDE6F1] flex items-center justify-between gap-4">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="px-5 py-2.5 rounded-full text-xs font-bold text-[#5C6B7D] hover:text-[#0B2F6B] bg-[#F4F7FB] hover:bg-[#EBF3FF] transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-[#0B2F6B] hover:bg-[#1A4FA0] shadow-sm transition-all flex items-center gap-1.5"
            >
              <span>Lanjut ke Langkah Berikutnya</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 rounded-full text-xs sm:text-sm font-bold text-[#0B2F6B] bg-[#F0BD28] hover:bg-[#e0ad19] shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Memproses Pendaftaran...</span>
              ) : (
                <>
                  <span>Kirim Pendaftaran Sekarang</span>
                  <Sparkles className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
