# Website Pesantren Cendekia Amanah — Frontend (Tahap 1)

Frontend website resmi Lembaga Pendidikan Terpadu **Pesantren Cendekia Amanah** (Pesantren, SMP, SMA, dan Madrasah Diniyah). Dibangun berdasarkan spesifikasi **PRD-CA-WEB-FE-001** dengan standar arsitektur *API-Ready* untuk integrasi Backend API (Tahap 2) dan CMS Admin Console (Tahap 3).

---

## 🚀 Tech Stack

- **Framework:** Next.js (App Router, Server Components & Client Components)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Custom Brand Tokens)
- **Icons:** Lucide React (Phosphor Icons equivalent)
- **Form Management & Validation:** React Hook Form + Zod
- **Font:** Google Font Poppins via `next/font`

---

## 🎨 Brand Design System

| Token | Hex | Penggunaan |
|---|---|---|
| `--ca-deep-blue` | `#0B2F6B` | Primary institutional / Header / Footer |
| `--ca-navy` | `#1A4FA0` | Main buttons, navigation pill highlights |
| `--ca-green` | `#17804A` | Secondary accent, badges, Islamic theme |
| `--ca-green-soft` | `#8ED6A8` | Subtitle accents, success states |
| `--ca-red` | `#D8232A` | Badge kuota PPDB, alerts |
| `--ca-yellow` | `#F0BD28` | Primary CTA PPDB Button |
| `--ca-background-soft` | `#F4F7FB` | Card backdrops & section separators |
| `--ca-border` | `#DDE6F1` | Soft structural borders |

---

## 📁 Struktur Direktori

```text
frontend/
├── public/                     # Aset statis (logo, favicon, gambar galeri, partner, icon)
├── src/
│   ├── app/                    # Next.js App Router (SEO metadata & page shells)
│   │   ├── page.tsx            # Beranda (16 sections lengkap)
│   │   ├── pesantren/page.tsx  # Unit Pesantren
│   │   ├── smp/page.tsx        # Unit SMP Cendekia Amanah
│   │   ├── sma/page.tsx        # Unit SMA Cendekia Amanah
│   │   ├── diniyah/page.tsx    # Unit Madrasah Diniyah
│   │   ├── berita/
│   │   │   ├── page.tsx        # Berita (Filter kategori, search, sidebar, pagination)
│   │   │   └── [slug]/page.tsx # Detail Berita (Social sharing, related news, tag)
│   │   ├── opini/
│   │   │   ├── page.tsx        # Opini (Featured opinion + grid opini)
│   │   │   └── [slug]/page.tsx # Detail Opini
│   │   ├── ppdb/page.tsx       # PPDB Online (Wizard 3 langkah + validasi Zod + success state)
│   │   ├── kontak/page.tsx     # Kontak (WhatsApp unit, form pesan, maps, FAQ accordion)
│   │   ├── layout.tsx          # Root layout & providers
│   │   ├── not-found.tsx       # Branded 404 page
│   │   ├── error.tsx           # Global error handler
│   │   ├── robots.ts           # SEO robots.txt
│   │   └── sitemap.ts          # SEO sitemap.xml
│   │
│   ├── components/             # Reusable UI & Section Components
│   │   ├── layout/             # Header, Footer, TopUtilityBar, DesktopNav, MobileNav, FloatingActions, WhatsAppPanel, GlobalCTA
│   │   ├── home/               # HeroCarousel, HeroCTAStats, UnitCards, Sambutan, BigStats, Keunggulan, Agenda, Prestasi, dll.
│   │   ├── unit/               # EducationUnitPage (Reusable template untuk 4 unit)
│   │   ├── news/               # NewsListInteractive, NewsSidebar, ArticleDetail
│   │   ├── opinion/            # OpinionDetail
│   │   ├── ppdb/               # PPDBWizard (Form wizard, stepper, summary)
│   │   ├── contact/            # ContactForm, FAQAccordion
│   │   ├── modal/              # BrochureModal, VideoModal
│   │   └── common/             # Breadcrumb, SectionHeader
│   │
│   ├── content/
│   │   └── mock/               # Mock data terstruktur (site, units, news, opinions, agenda, achievements, gallery, dll.)
│   │
│   ├── repositories/           # Content Repository Pattern (Mock -> API ready)
│   │   ├── content.repository.ts
│   │   └── mock-content.repository.ts
│   │
│   ├── types/                  # Definisi interface TypeScript lengkap
│   ├── context/                # UIContext (Modal & Panel controls)
│   └── lib/                    # Helper functions (cn utils)
```

---

## 🛠️ Menjalankan Aplikasi

1. **Install dependensi:**
   ```bash
   npm install
   ```

2. **Jalankan Server Development:**
   ```bash
   npm run dev
   ```
   Buka [http://localhost:3000](http://localhost:3000) di browser.

3. **Build untuk Production:**
   ```bash
   npm run build
   npm run start
   ```

---

## 🔄 Transisi ke Tahap 2 (Backend Integration)

Pada Tahap 2, seluruh UI tidak perlu dirombak. Cukup:
1. Buat `src/repositories/api-content.repository.ts` yang mengimplementasikan `IContentRepository`.
2. Ganti instance `contentRepo` di `src/repositories/` dari `MockContentRepository` ke `ApiContentRepository`.
