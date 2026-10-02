'use client';

import React, { useState, useMemo } from 'react';
import { Agenda } from '@/types';
import SectionHeader from '@/components/common/SectionHeader';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Info,
  CheckCircle2,
  Tag
} from 'lucide-react';

interface KalenderAkademikSectionProps {
  unitCode?: string;
  initialAgendas?: Agenda[];
}

const MONTH_NAMES_ID = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

const DAYS_HEADER = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

// Default 8 dummy events for SMP (Oktober & November 2026)
const DEFAULT_SMP_AGENDAS: Agenda[] = [
  {
    id: 'smp-ag-1',
    title: 'Penilaian Tengah Semester (PTS) Ganjil',
    category: 'Ujian',
    eventDate: '2026-10-05',
    day: '05',
    month: 'Oktober',
    year: '2026',
    time: '07:30 - 12:30 WIB',
    location: 'Ruang Kelas SMP & Lab CBT',
    description: 'Evaluasi capaian pembelajaran pertengahan semester ganjil berbasis Computer-Based Test (CBT) dan asesmen portofolio.',
    status: 'Mendatang'
  },
  {
    id: 'smp-ag-2',
    title: 'Outing Class & Observasi Ekologi Lingkungan',
    category: 'Kegiatan Siswa',
    eventDate: '2026-10-12',
    day: '12',
    month: 'Oktober',
    year: '2026',
    time: '08:00 - 15:00 WIB',
    location: 'Kebun Raya & Agrowisata Sains',
    description: 'Pembelajaran kontekstual sains dan eksplorasi ekosistem alam terbuka untuk santri kelas 7 & 8.',
    status: 'Mendatang'
  },
  {
    id: 'smp-ag-3',
    title: 'Peringatan Hari Santri Nasional & Gelar Karya P5',
    category: 'Peringatan',
    eventDate: '2026-10-22',
    day: '22',
    month: 'Oktober',
    year: '2026',
    time: '07:00 - 13:00 WIB',
    location: 'Lapangan Utama Cendekia Amanah',
    description: 'Upacara bendera Hari Santri, pameran hasil projek penguatan profil pelajar Pancasila & pentas seni santri SMP.',
    status: 'Mendatang'
  },
  {
    id: 'smp-ag-4',
    title: 'Simulasi Asesmen Nasional Berbasis Komputer (ANBK)',
    category: 'Akademik',
    eventDate: '2026-10-28',
    day: '28',
    month: 'Oktober',
    year: '2026',
    time: '08:00 - 11:30 WIB',
    location: 'Lab Komputer SMP',
    description: 'Simulasi kesiapan perangkat server dan literasi-numerasi ANBK untuk siswa kelas 8 SMP Cendekia Amanah.',
    status: 'Mendatang'
  },
  {
    id: 'smp-ag-5',
    title: 'Pekan Olahraga & Seni Santri (Class Meeting)',
    category: 'Kesiswaan',
    eventDate: '2026-11-07',
    day: '07',
    month: 'November',
    year: '2026',
    time: '08:00 - 16:00 WIB',
    location: 'Sport Hall Cendekia Amanah',
    description: 'Kompetisi antar-kelas: futsal, panahan, hadrah banjari, english speech contest, dan olimpiade sains internal.',
    status: 'Mendatang'
  },
  {
    id: 'smp-ag-6',
    title: 'Parenting Day & Pembagian Laporan Perkembangan Siswa',
    category: 'Wali Murid',
    eventDate: '2026-11-14',
    day: '14',
    month: 'November',
    year: '2026',
    time: '09:00 - 12:00 WIB',
    location: 'Auditorium Al-Amanah & Hybrid Zoom',
    description: 'Sinergi dewan guru dan orang tua dalam mendampingi tumbuh kembang dan adab remaja di era keterbukaan informasi.',
    status: 'Mendatang'
  },
  {
    id: 'smp-ag-7',
    title: 'Tasmi’ Al-Qur’an Akbar Sekali Duduk (Juz 28, 29, 30)',
    category: 'Tahfidz',
    eventDate: '2026-11-23',
    day: '23',
    month: 'November',
    year: '2026',
    time: '05:30 - 11:30 WIB',
    location: 'Masjid Utama Pesantren Cendekia Amanah',
    description: 'Ujian tasmi’ hafalan Al-Qur’an terbuka sekali duduk di hadapan dewan asatidz musyrif tahfidz dan wali santri.',
    status: 'Mendatang'
  },
  {
    id: 'smp-ag-8',
    title: 'Penilaian Akhir Semester (PAS) Ganjil TP 2026/2027',
    category: 'Ujian',
    eventDate: '2026-11-30',
    day: '30',
    month: 'November',
    year: '2026',
    time: '07:30 - 13:00 WIB',
    location: 'Gedung Kelas SMP Cendekia Amanah',
    description: 'Pelaksanaan ujian akhir semester ganjil seluruh mata pelajaran kurikulum nasional dan kurikulum pesantren.',
    status: 'Mendatang'
  }
];

export default function KalenderAkademikSection({
  unitCode = 'smp',
  initialAgendas
}: KalenderAkademikSectionProps) {
  // Use provided agendas if any, else default to SMP dummy events
  const agendas: Agenda[] = useMemo(() => {
    if (initialAgendas && initialAgendas.length > 0) {
      return initialAgendas;
    }
    return DEFAULT_SMP_AGENDAS;
  }, [initialAgendas]);

  // Base state for 2-month window: start at October 2026 (local context 2026-10)
  const [baseDate, setBaseDate] = useState(() => new Date(2026, 9, 1)); // October 2026 (0-indexed month 9)
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Month 1 & Month 2
  const month1Date = useMemo(() => new Date(baseDate.getFullYear(), baseDate.getMonth(), 1), [baseDate]);
  const month2Date = useMemo(() => new Date(baseDate.getFullYear(), baseDate.getMonth() + 1, 1), [baseDate]);

  const handlePrev = () => {
    setBaseDate(new Date(baseDate.getFullYear(), baseDate.getMonth() - 2, 1));
  };

  const handleNext = () => {
    setBaseDate(new Date(baseDate.getFullYear(), baseDate.getMonth() + 2, 1));
  };

  // Map of events by YYYY-MM-DD
  const eventsByDate = useMemo(() => {
    const map = new Map<string, Agenda[]>();
    agendas.forEach((ag) => {
      let dateKey = ag.eventDate;
      if (!dateKey) {
        // Derive from year, month, day
        const y = ag.year || '2026';
        let mIdx = MONTH_NAMES_ID.findIndex((m) => m.toLowerCase().startsWith(ag.month.toLowerCase().slice(0, 3)));
        if (mIdx === -1) mIdx = 9;
        const mm = String(mIdx + 1).padStart(2, '0');
        const dd = String(ag.day).padStart(2, '0');
        dateKey = `${y}-${mm}-${dd}`;
      }
      if (!map.has(dateKey)) {
        map.set(dateKey, []);
      }
      map.get(dateKey)!.push(ag);
    });
    return map;
  }, [agendas]);

  // Categories list
  const categories = useMemo(() => {
    const set = new Set<string>();
    agendas.forEach((ag) => {
      if (ag.category) set.add(ag.category);
    });
    return ['ALL', ...Array.from(set)];
  }, [agendas]);

  // Filtered agendas
  const displayedAgendas = useMemo(() => {
    return agendas.filter((ag) => {
      const matchCat = selectedCategory === 'ALL' || ag.category === selectedCategory;
      if (!matchCat) return false;
      if (selectedDate) {
        let dateKey = ag.eventDate;
        if (!dateKey) {
          const y = ag.year || '2026';
          let mIdx = MONTH_NAMES_ID.findIndex((m) => m.toLowerCase().startsWith(ag.month.toLowerCase().slice(0, 3)));
          if (mIdx === -1) mIdx = 9;
          const mm = String(mIdx + 1).padStart(2, '0');
          const dd = String(ag.day).padStart(2, '0');
          dateKey = `${y}-${mm}-${dd}`;
        }
        return dateKey === selectedDate;
      }
      return true;
    });
  }, [agendas, selectedCategory, selectedDate]);

  // Helper to render a single month calendar grid
  const renderMonthCalendar = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const monthName = MONTH_NAMES_ID[month];

    const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Sunday
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const calendarCells: {
      dayNumber: number;
      isCurrentMonth: boolean;
      dateString: string;
      hasEvents: boolean;
      eventsCount: number;
    }[] = [];

    // Previous month padding
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const d = daysInPrevMonth - i;
      const prevM = month === 0 ? 12 : month;
      const prevY = month === 0 ? year - 1 : year;
      const ds = `${prevY}-${String(prevM).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      calendarCells.push({
        dayNumber: d,
        isCurrentMonth: false,
        dateString: ds,
        hasEvents: false,
        eventsCount: 0
      });
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      const mm = String(month + 1).padStart(2, '0');
      const dd = String(d).padStart(2, '0');
      const ds = `${year}-${mm}-${dd}`;
      const evs = eventsByDate.get(ds) || [];
      calendarCells.push({
        dayNumber: d,
        isCurrentMonth: true,
        dateString: ds,
        hasEvents: evs.length > 0,
        eventsCount: evs.length
      });
    }

    // Next month padding to fill complete weeks (multiples of 7)
    const remaining = 7 - (calendarCells.length % 7);
    if (remaining < 7) {
      for (let d = 1; d <= remaining; d++) {
        const nextM = month === 11 ? 1 : month + 2;
        const nextY = month === 11 ? year + 1 : year;
        const ds = `${nextY}-${String(nextM).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        calendarCells.push({
          dayNumber: d,
          isCurrentMonth: false,
          dateString: ds,
          hasEvents: false,
          eventsCount: 0
        });
      }
    }

    return (
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#DDE6F1] shadow-xs space-y-4">
        {/* Month Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#DDE6F1]">
          <div>
            <h3 className="text-base sm:text-lg font-black text-[#0B2F6B] tracking-tight">
              {monthName} {year}
            </h3>
            <span className="text-[11px] font-semibold text-[#64748B]">Semester Ganjil TP 2026/2027</span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EBF3FF] text-[#1F5FD0]">
            Kalender Sekolah
          </span>
        </div>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 gap-1 text-center">
          {DAYS_HEADER.map((dh, i) => (
            <div
              key={i}
              className={`text-xs font-bold py-1.5 ${
                i === 0 ? 'text-[#D8232A]' : i === 5 ? 'text-[#00875A]' : 'text-[#64748B]'
              }`}
            >
              {dh}
            </div>
          ))}
        </div>

        {/* Day Cells Grid */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
          {calendarCells.map((cell, idx) => {
            const isSelected = selectedDate === cell.dateString;

            if (!cell.isCurrentMonth) {
              return (
                <div
                  key={idx}
                  className="h-10 sm:h-11 rounded-xl flex items-center justify-center text-xs text-gray-300 font-medium select-none"
                >
                  {cell.dayNumber}
                </div>
              );
            }

            if (cell.hasEvents) {
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDate(isSelected ? null : cell.dateString)}
                  className={`h-10 sm:h-11 rounded-xl flex flex-col items-center justify-center font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer shadow-sm relative group ${
                    isSelected
                      ? 'bg-[#B0171D] text-white ring-4 ring-[#D8232A]/30 scale-105'
                      : 'bg-[#D8232A] text-white hover:bg-[#B0171D] hover:scale-105'
                  }`}
                  title={`${cell.eventsCount} kegiatan pada tanggal ini`}
                >
                  <span>{cell.dayNumber}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F0BD28] mt-0.5" />
                </button>
              );
            }

            return (
              <div
                key={idx}
                className="h-10 sm:h-11 rounded-xl flex items-center justify-center text-xs sm:text-sm font-semibold text-[#1A293B] hover:bg-[#F4F7FB] transition-colors"
              >
                {cell.dayNumber}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <section id="kalender-akademik" className="py-14 sm:py-16 bg-[#F8FAFC] border-y border-[#DDE6F1] scroll-mt-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <SectionHeader
            badge="Kalender Akademik 1 Semester"
            title="KALENDER AKADEMIK & AGENDA SMP"
            subtitle="Jadwal lengkap kegiatan belajar mengajar, pelaksanaan asesmen/ujian, peringatan hari besar, serta agenda kesiswaan SMP Cendekia Amanah."
          />

          {/* Month Navigation Controls */}
          <div className="flex items-center gap-2 self-start md:self-auto shrink-0 pb-2">
            <button
              onClick={handlePrev}
              className="p-2 rounded-xl bg-white border border-[#DDE6F1] hover:border-[#0B2F6B] text-[#0B2F6B] transition-all shadow-xs flex items-center gap-1 text-xs font-bold"
              aria-label="Bulan Sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Sebelumnya</span>
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-xl bg-white border border-[#DDE6F1] hover:border-[#0B2F6B] text-[#0B2F6B] transition-all shadow-xs flex items-center gap-1 text-xs font-bold"
              aria-label="Bulan Berikutnya"
            >
              <span className="hidden sm:inline">Berikutnya</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Legend Information Box */}
        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-[#DDE6F1] shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#D8232A] text-white flex items-center justify-center font-bold text-[11px] shadow-xs">
                ●
              </span>
              <span className="font-bold text-[#1A293B]">Tanggal Merah / Ada Kegiatan Akademik</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F0BD28]" />
              <span className="text-[#64748B]">Indikator Titik Agenda Sekolah</span>
            </div>
          </div>

          {selectedDate && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#0B2F6B] font-semibold">
                Filter Tanggal: <span className="font-bold underline">{selectedDate}</span>
              </span>
              <button
                onClick={() => setSelectedDate(null)}
                className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                Reset Filter Tanggal
              </button>
            </div>
          )}
        </div>

        {/* 2-Month Calendar Grid (Side by Side) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {renderMonthCalendar(month1Date)}
          {renderMonthCalendar(month2Date)}
        </div>

        {/* List of Academic Calendar Events */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DDE6F1] shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DDE6F1]">
            <div>
              <h3 className="text-lg sm:text-xl font-black text-[#0B2F6B] tracking-tight">
                DAFTAR KEGIATAN & AGENDA AKADEMIK
              </h3>
              <p className="text-xs text-[#64748B] mt-0.5">
                Menampilkan agenda resmi 1 bulan ini dan 1 bulan depan ({MONTH_NAMES_ID[month1Date.getMonth()]} & {MONTH_NAMES_ID[month2Date.getMonth()]} {month1Date.getFullYear()}).
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all shrink-0 ${
                    selectedCategory === cat
                      ? 'bg-[#0B2F6B] text-white shadow-xs'
                      : 'bg-[#F4F7FB] text-[#64748B] hover:bg-[#EBF3FF] hover:text-[#0B2F6B]'
                  }`}
                >
                  {cat === 'ALL' ? 'Semua Kategori' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Agenda Event Cards */}
          {displayedAgendas.length === 0 ? (
            <div className="p-8 text-center text-[#64748B] space-y-2">
              <CalendarIcon className="w-10 h-10 mx-auto text-gray-300" />
              <p className="text-sm font-semibold">Tidak ada kegiatan yang sesuai dengan filter.</p>
              <button
                onClick={() => {
                  setSelectedCategory('ALL');
                  setSelectedDate(null);
                }}
                className="text-xs font-bold text-[#1F5FD0] hover:underline"
              >
                Tampilkan Semua Agenda
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {displayedAgendas.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#F8FAFC] p-5 rounded-2xl border border-[#DDE6F1] hover:border-[#D8232A]/40 transition-all hover-lift flex items-start gap-4"
                >
                  {/* Date Badge in Brand Red */}
                  <div className="w-16 h-16 rounded-2xl bg-[#D8232A] text-white flex flex-col items-center justify-center font-bold shrink-0 shadow-md">
                    <span className="text-xl leading-none font-black">{item.day}</span>
                    <span className="text-[10px] text-[#F0BD28] uppercase font-bold tracking-wider mt-1">
                      {item.month.slice(0, 3)}
                    </span>
                    <span className="text-[9px] text-white/80 leading-none">{item.year}</span>
                  </div>

                  {/* Event Details */}
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EBF3FF] text-[#1F5FD0]">
                        {item.category || 'Akademik'}
                      </span>
                      {item.status && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gray-200 text-gray-700">
                          {item.status}
                        </span>
                      )}
                    </div>

                    <h4 className="font-bold text-sm text-[#0B2F6B] leading-snug line-clamp-2">
                      {item.title}
                    </h4>

                    {item.description && (
                      <p className="text-xs text-[#5C6B7D] leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    )}

                    <div className="pt-1 flex flex-wrap items-center gap-3 text-[11px] text-[#64748B]">
                      {item.time && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#1F5FD0]" />
                          <span>{item.time}</span>
                        </span>
                      )}
                      {item.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#D8232A]" />
                          <span className="line-clamp-1">{item.location}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
