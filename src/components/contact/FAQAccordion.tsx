'use client';

import React, { useState, useEffect } from 'react';
import { faqs as defaultFaqs } from '@/content/mock/faq';
import { Plus, Minus, HelpCircle } from 'lucide-react';

export default function FAQAccordion() {
  const [items, setItems] = useState<any[]>(defaultFaqs);
  const [openId, setOpenId] = useState<string | null>('faq-1');

  useEffect(() => {
    async function loadFaqs() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api/v1';
        const res = await fetch(`${apiUrl}/faqs`, { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data) && json.data.length > 0) {
            setItems(
              json.data.map((f: any) => ({
                id: f.id,
                question: f.question,
                answer: f.answer,
                category: f.category || 'Umum'
              }))
            );
            setOpenId(json.data[0].id);
          }
        }
      } catch {
        // fallback
      }
    }
    loadFaqs();
  }, []);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div id="faq" className="space-y-4">
      <div className="space-y-1 text-center sm:text-left">
        <span className="text-xs font-bold text-[#D8232A] uppercase tracking-wider">
          Pusat Bantuan
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-[#0B2F6B]">
          Pertanyaan Sering Diajukan (FAQ)
        </h3>
      </div>

      <div className="space-y-3">
        {items.map((faq) => {
          const isOpen = openId === faq.id;

          return (
            <div
              key={faq.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen ? 'bg-white border-[#1A4FA0] shadow-sm' : 'bg-[#F4F7FB]/70 border-[#DDE6F1]'
              }`}
            >
              <button
                onClick={() => toggle(faq.id)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-[#0B2F6B] hover:text-[#1A4FA0] transition-colors"
                aria-expanded={isOpen}
              >
                <span className="flex items-center gap-2.5">
                  <HelpCircle className="w-4 h-4 text-[#D8232A] shrink-0" />
                  <span>{faq.question}</span>
                </span>
                <span
                  className={`p-1 rounded-full shrink-0 transition-transform duration-200 ${
                    isOpen ? 'bg-[#EBF3FF] text-[#1A4FA0]' : 'text-[#7B8CA1]'
                  }`}
                >
                  {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#5C6B7D] leading-relaxed border-t border-[#F4F7FB] animate-fade-in pl-11">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
