'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NewsArticle } from '@/types';
import { Mail, CheckCircle2, TrendingUp, Tag, Folder } from 'lucide-react';

interface NewsSidebarProps {
  popularNews: NewsArticle[];
  categories: { name: string; count: number }[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onSelectTag: (tag: string) => void;
}

export default function NewsSidebar({
  popularNews,
  categories,
  selectedCategory,
  onSelectCategory,
  onSelectTag
}: NewsSidebarProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  const popularTags = [
    'Tahfidz',
    'Prestasi',
    'Kegiatan',
    'SMPIslam',
    'SMAIslam',
    'Diniyah',
    'Parenting',
    'OSN',
    'DigitalLearning',
    'PPDB2027'
  ];

  return (
    <aside className="space-y-8" aria-label="News Sidebar">
      {/* Category List */}
      <div className="bg-white p-6 rounded-2xl sm:rounded-3xl border border-[#DDE6F1] shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-[#F4F7FB]">
          <Folder className="w-4 h-4 text-[#1A4FA0]" />
          <h3 className="text-sm font-bold text-[#0B2F6B] uppercase tracking-wider">
            Kategori Berita
          </h3>
        </div>

        <ul className="space-y-1.5 text-xs">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.name;

            return (
              <li key={cat.name}>
                <button
                  onClick={() => onSelectCategory(cat.name)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-semibold transition-all ${
                    isSelected
                      ? 'bg-[#D8232A] text-white'
                      : 'text-[#28384A] hover:bg-[#F4F7FB] hover:text-[#1A4FA0]'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-[#F4F7FB] text-[#7B8CA1]'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Popular News */}
      <div className="bg-white p-6 rounded-2xl sm:rounded-3xl border border-[#DDE6F1] shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-[#F4F7FB]">
          <TrendingUp className="w-4 h-4 text-[#D8232A]" />
          <h3 className="text-sm font-bold text-[#0B2F6B] uppercase tracking-wider">
            Berita Populer
          </h3>
        </div>

        <div className="space-y-3.5">
          {popularNews.map((item, idx) => (
            <Link
              key={item.id}
              href={`/berita/${item.slug}`}
              className="flex items-start gap-3 group"
            >
              <span className="w-6 h-6 rounded-full bg-[#EBF3FF] text-[#1A4FA0] text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <div className="space-y-1 flex-1">
                <h4 className="text-xs font-bold text-[#28384A] group-hover:text-[#1A4FA0] transition-colors leading-snug line-clamp-2">
                  {item.title}
                </h4>
                <p className="text-[10px] text-[#7B8CA1]">{item.publishedAt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Tags */}
      <div className="bg-white p-6 rounded-2xl sm:rounded-3xl border border-[#DDE6F1] shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-[#F4F7FB]">
          <Tag className="w-4 h-4 text-[#D8232A]" />
          <h3 className="text-sm font-bold text-[#0B2F6B] uppercase tracking-wider">
            Tag Populer
          </h3>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => onSelectTag(tag)}
              className="px-2.5 py-1 rounded-lg text-xs font-medium text-[#5C6B7D] bg-[#F4F7FB] hover:bg-[#EBF3FF] hover:text-[#1A4FA0] border border-[#E6EDF6] transition-colors"
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Newsletter Subscription Widget */}
      <div className="bg-linear-to-br from-[#0B2F6B] to-[#1A4FA0] p-6 rounded-2xl sm:rounded-3xl text-white shadow-md space-y-4">
        <div className="space-y-1.5">
          <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-[#FCA5A5]">
            <Mail className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Langganan Newsletter</h3>
          <p className="text-xs text-white/80 leading-relaxed">
            Dapatkan ringkasan kabar kegiatan, artikel opini, dan info PPDB berkala langsung di inbox email Anda.
          </p>
        </div>

        {isSubscribed ? (
          <div className="p-3.5 rounded-xl bg-[#D8232A] text-white flex items-center gap-2 text-xs font-bold animate-fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Terima kasih telah berlangganan! ✓</span>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="space-y-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email Anda"
              required
              className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white text-[#28384A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FCA5A5]"
            />
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#F0BD28] hover:bg-[#e0ad19] text-[#0B2F6B] transition-colors shadow-sm"
            >
              Langganan Sekarang
            </button>
          </form>
        )}

        <p className="text-[10px] text-white/60 leading-relaxed">
          Kami menjamin privasi dan tidak akan membagikan email Anda kepada pihak ketiga.
        </p>
      </div>
    </aside>
  );
}
