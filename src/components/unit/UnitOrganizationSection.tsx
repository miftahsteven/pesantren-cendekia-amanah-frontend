'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { OrganizationMember } from '@/types';
import SectionHeader from '@/components/common/SectionHeader';
import { getUploadUrl } from '@/lib/uploads';
import {
  Users,
  Award,
  GraduationCap,
  Sparkles,
  BookOpen,
  Briefcase,
  IdCard,
  UserCheck
} from 'lucide-react';

interface Props {
  unitName: string;
  members: OrganizationMember[];
}

export default function UnitOrganizationSection({ unitName, members }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  if (!members || members.length === 0) {
    return null;
  }

  // Extract available categories
  const categories = ['ALL'];
  members.forEach((m) => {
    if (m.category && !categories.includes(m.category)) {
      categories.push(m.category);
    }
  });

  const filteredMembers = selectedCategory === 'ALL'
    ? members
    : members.filter((m) => m.category === selectedCategory);

  // Group by levels if 'ALL' is selected
  const level1 = filteredMembers.filter((m) => m.level === 1);
  const level2 = filteredMembers.filter((m) => m.level === 2);
  const level3 = filteredMembers.filter((m) => m.level === 3 || !m.level);

  return (
    <section id="organisasi" className="py-14 sm:py-16 bg-[#F4F7FB] border-y border-[#DDE6F1] scroll-mt-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-10">
        <SectionHeader
          badge="Struktur & Tenaga Pendidik"
          title={`STRUKTUR ORGANISASI ${unitName.toUpperCase()}`}
          subtitle={`Dipimpin oleh figur pendidik berpengalaman, berintegritas tinggi, dan didukung oleh dewan asatidz profesional lulusan perguruan tinggi terkemuka dalam dan luar negeri.`}
        />

        {/* Category Filters */}
        {categories.length > 2 && (
          <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => {
              const label = cat === 'ALL' ? 'Semua Formasi' : cat;
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#1A4FA0] text-white shadow-sm'
                      : 'bg-white text-[#28384A] border border-[#DDE6F1] hover:bg-[#EBF3FF] hover:border-[#B9C8DC]'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        )}

        {/* If viewing all: show hierarchical tree structure */}
        {selectedCategory === 'ALL' ? (
          <div className="space-y-10">
            {/* Level 1: Kepala Sekolah / Pimpinan Utama */}
            {level1.length > 0 && (
              <div className="space-y-4">
                <div className="text-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#FDE8E9] text-[#D8232A] border border-[#FCA5A5]/40 uppercase tracking-wider">
                    <Award className="w-3.5 h-3.5" />
                    Pimpinan Lembaga
                  </span>
                </div>

                <div className="max-w-2xl mx-auto">
                  {level1.map((p) => (
                    <div
                      key={p.id}
                      className="bg-white rounded-3xl border-2 border-[#1A4FA0]/20 p-6 sm:p-8 shadow-md hover-lift flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-bl from-[#1A4FA0]/10 via-transparent to-transparent pointer-events-none" />

                      <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden bg-gray-100 shrink-0 border-2 border-[#1A4FA0]/30 shadow-xs">
                        <Image
                          src={getUploadUrl(p.photoUrl)}
                          alt={p.name}
                          fill
                          className="object-cover"
                          sizes="150px"
                        />
                      </div>

                      <div className="space-y-2 flex-1">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#1A4FA0] text-white uppercase tracking-wider">
                          {p.position}
                        </span>
                        <h3 className="text-lg sm:text-xl font-black text-[#0B2F6B] leading-tight">
                          {p.name}
                        </h3>
                        {p.nip && (
                          <p className="text-xs text-[#64748B] font-mono flex items-center justify-center sm:justify-start gap-1">
                            <IdCard className="w-3.5 h-3.5 text-[#D8232A]" />
                            <span>{p.nip}</span>
                          </p>
                        )}
                        {p.education && (
                          <p className="text-xs font-semibold text-[#1A4FA0] flex items-center justify-center sm:justify-start gap-1">
                            <GraduationCap className="w-4 h-4 text-[#1A4FA0] shrink-0" />
                            <span>{p.education}</span>
                          </p>
                        )}
                        {p.bio && (
                          <p className="text-xs text-[#5C6B7D] leading-relaxed pt-1 border-t border-gray-100">
                            {p.bio}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Level 2: Wakil Kepala & Manajemen */}
            {level2.length > 0 && (
              <div className="space-y-4">
                <div className="text-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#EBF3FF] text-[#1A4FA0] border border-[#DDE6F1] uppercase tracking-wider">
                    <Briefcase className="w-3.5 h-3.5" />
                    Wakil Kepala & Koordinator Bidang
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {level2.map((w) => (
                    <div
                      key={w.id}
                      className="bg-white rounded-2xl border border-[#DDE6F1] p-5 shadow-xs hover-lift flex items-center gap-4 group"
                    >
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-[#DDE6F1]">
                        <Image
                          src={getUploadUrl(w.photoUrl)}
                          alt={w.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="100px"
                        />
                      </div>
                      <div className="space-y-1 min-w-0 flex-1">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-[#EBF3FF] text-[#1A4FA0]">
                          {w.position}
                        </span>
                        <h4 className="text-sm font-bold text-[#0B2F6B] truncate">{w.name}</h4>
                        {w.education && (
                          <p className="text-[11px] text-[#64748B] line-clamp-1 flex items-center gap-1">
                            <GraduationCap className="w-3 h-3 text-[#1A4FA0] shrink-0" />
                            <span>{w.education}</span>
                          </p>
                        )}
                        {w.nip && (
                          <p className="text-[10px] text-[#7B8CA1] font-mono">{w.nip}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Level 3: Dewan Guru & Pengajar */}
            {level3.length > 0 && (
              <div className="space-y-4">
                <div className="text-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-white text-[#28384A] border border-[#DDE6F1] uppercase tracking-wider">
                    <BookOpen className="w-3.5 h-3.5 text-[#D8232A]" />
                    Dewan Guru & Pengajar Bidang Studi
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {level3.map((g) => (
                    <div
                      key={g.id}
                      className="bg-white rounded-2xl border border-[#DDE6F1] p-5 shadow-xs hover-lift flex flex-col justify-between group"
                    >
                      <div className="flex items-start gap-3.5">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-[#DDE6F1]">
                          <Image
                            src={getUploadUrl(g.photoUrl)}
                            alt={g.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="80px"
                          />
                        </div>
                        <div className="space-y-1 min-w-0 flex-1">
                          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-[#FDE8E9] text-[#D8232A]">
                            {g.position}
                          </span>
                          <h4 className="text-sm font-bold text-[#0B2F6B] leading-snug">{g.name}</h4>
                          {g.education && (
                            <p className="text-[11px] text-[#64748B] line-clamp-1">{g.education}</p>
                          )}
                        </div>
                      </div>

                      {g.bio && (
                        <p className="text-xs text-[#5C6B7D] leading-relaxed pt-3 mt-3 border-t border-gray-100 line-clamp-2">
                          {g.bio}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Filtered Flat Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((m) => (
              <div
                key={m.id}
                className="bg-white rounded-2xl border border-[#DDE6F1] p-5 shadow-xs hover-lift flex flex-col justify-between group"
              >
                <div className="flex items-start gap-4">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-[#DDE6F1]">
                    <Image
                      src={getUploadUrl(m.photoUrl)}
                      alt={m.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="80px"
                    />
                  </div>
                  <div className="space-y-1 min-w-0 flex-1">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-[#EBF3FF] text-[#1A4FA0]">
                      {m.position}
                    </span>
                    <h4 className="text-sm font-bold text-[#0B2F6B] leading-snug">{m.name}</h4>
                    {m.education && (
                      <p className="text-[11px] text-[#64748B] line-clamp-1">{m.education}</p>
                    )}
                    {m.nip && <p className="text-[10px] text-[#7B8CA1] font-mono">{m.nip}</p>}
                  </div>
                </div>

                {m.bio && (
                  <p className="text-xs text-[#5C6B7D] leading-relaxed pt-3 mt-3 border-t border-gray-100 line-clamp-2">
                    {m.bio}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
