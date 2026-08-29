'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NewsArticle } from '@/types';
import NewsSidebar from './NewsSidebar';
import { Search, Calendar, Eye, ArrowRight, FileQuestion } from 'lucide-react';
import { getUploadUrl } from '@/lib/uploads';

interface NewsListInteractiveProps {
  initialArticles: NewsArticle[];
  popularArticles: NewsArticle[];
}

export default function NewsListInteractive({
  initialArticles,
  popularArticles
}: NewsListInteractiveProps) {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const categories = [
    'Semua',
    'Pesantren',
    'SMP',
    'SMA',
    'Diniyah',
    'Prestasi',
    'Kegiatan'
  ];

  // Category counts
  const categoryCounts = useMemo(() => {
    return categories.map((cat) => {
      const count =
        cat === 'Semua'
          ? initialArticles.length
          : initialArticles.filter((a) => a.category.toLowerCase() === cat.toLowerCase()).length;
      return { name: cat, count };
    });
  }, [initialArticles]);

  // Filter & Search Logic
  const filteredArticles = useMemo(() => {
    let result = [...initialArticles];

    // Category filter
    if (selectedCategory !== 'Semua') {
      result = result.filter(
        (item) => item.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Search query filter (title & excerpt)
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.excerpt.toLowerCase().includes(q) ||
          item.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    return result;
  }, [initialArticles, selectedCategory, searchQuery]);

  // Items per page
  const ITEMS_PER_PAGE = 9;
  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE) || 1;
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSelectTag = (tag: string) => {
    setSearchQuery(tag);
    setCurrentPage(1);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
      {/* Main Content (8 cols on lg) */}
      <div className="lg:col-span-8 space-y-6">
        {/* Search Bar & Category Filter Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-[#DDE6F1] shadow-xs space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-5 h-5 text-[#7B8CA1] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Cari berita berdasarkan judul, topik, atau kata kunci..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#F4F7FB] border border-[#E6EDF6] text-[#28384A] placeholder-[#7B8CA1] focus:outline-none focus:ring-2 focus:ring-[#1A4FA0] focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#7B8CA1] hover:text-[#0B2F6B]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;

              return (
                <button
                  key={cat}
                  onClick={() => handleSelectCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                    isSelected
                      ? 'bg-[#D8232A] text-white shadow-xs'
                      : 'bg-[#F4F7FB] text-[#5C6B7D] hover:bg-[#EBF3FF] hover:text-[#1A4FA0]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-[#7B8CA1] px-1">
          <span>
            Menampilkan <strong>{filteredArticles.length}</strong> berita
            {selectedCategory !== 'Semua' && ` dalam kategori "${selectedCategory}"`}
            {searchQuery && ` untuk "${searchQuery}"`}
          </span>
          {(selectedCategory !== 'Semua' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('Semua');
                setSearchQuery('');
                setCurrentPage(1);
              }}
              className="text-[#1A4FA0] font-bold hover:underline"
            >
              Reset Filter
            </button>
          )}
        </div>

        {/* News Grid or Empty State */}
        {paginatedArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paginatedArticles.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-2xl sm:rounded-3xl border border-[#DDE6F1] overflow-hidden shadow-xs hover-lift flex flex-col justify-between group"
              >
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={getUploadUrl(item.featuredImage)}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/90 text-[#D8232A] shadow-xs uppercase tracking-wider backdrop-blur-xs">
                    {item.category}
                  </span>
                </div>

                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-[#7B8CA1]">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#D8232A]" />
                        {item.publishedAt}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {item.viewsCount} dibaca
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#0B2F6B] group-hover:text-[#1A4FA0] transition-colors leading-snug line-clamp-2">
                      <Link href={`/berita/${item.slug}`}>{item.title}</Link>
                    </h3>

                    <p className="text-xs text-[#5C6B7D] leading-relaxed line-clamp-3">
                      {item.excerpt}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#F4F7FB]">
                    <Link
                      href={`/berita/${item.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#1A4FA0] group-hover:text-[#D8232A] transition-colors"
                    >
                      <span>Baca Selengkapnya</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-3xl p-12 border border-[#DDE6F1] text-center space-y-4 shadow-xs">
            <div className="w-16 h-16 rounded-full bg-[#EBF3FF] text-[#1A4FA0] flex items-center justify-center mx-auto">
              <FileQuestion className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-[#0B2F6B]">
                Tidak Ada Berita yang Cocok
              </h3>
              <p className="text-xs sm:text-sm text-[#5C6B7D] max-w-md mx-auto">
                Tidak ada berita yang cocok dengan pencarian Anda. Silakan coba kata kunci lain atau pilih kategori lain.
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedCategory('Semua');
                setSearchQuery('');
                setCurrentPage(1);
              }}
              className="px-5 py-2.5 rounded-full text-xs font-bold bg-[#0B2F6B] text-white hover:bg-[#1A4FA0] transition-colors"
            >
              Lihat Semua Berita
            </button>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="pt-6 flex items-center justify-center gap-1.5" aria-label="Pagination">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-xl text-xs font-bold border border-[#DDE6F1] bg-white text-[#28384A] hover:bg-[#F4F7FB] disabled:opacity-40 disabled:pointer-events-none transition-colors"
              aria-label="Halaman sebelumnya"
            >
              «
            </button>

            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              const isActive = currentPage === pageNum;

              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-9 h-9 rounded-xl text-xs font-bold transition-colors ${
                    isActive
                      ? 'bg-[#1A4FA0] text-white shadow-xs'
                      : 'bg-white border border-[#DDE6F1] text-[#28384A] hover:bg-[#F4F7FB]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-xl text-xs font-bold border border-[#DDE6F1] bg-white text-[#28384A] hover:bg-[#F4F7FB] disabled:opacity-40 disabled:pointer-events-none transition-colors"
              aria-label="Halaman berikutnya"
            >
              »
            </button>
          </div>
        )}
      </div>

      {/* Sidebar (4 cols on lg) */}
      <div className="lg:col-span-4">
        <NewsSidebar
          popularNews={popularArticles}
          categories={categoryCounts}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
          onSelectTag={handleSelectTag}
        />
      </div>
    </div>
  );
}
