import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { UIProvider } from '@/context/UIContext';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import FloatingActions from '@/components/layout/FloatingActions';
import WhatsAppPanel from '@/components/layout/WhatsAppPanel';
import BrochureModal from '@/components/modal/BrochureModal';
import VideoModal from '@/components/modal/VideoModal';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap'
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0B2F6B'
};

export const metadata: Metadata = {
  metadataBase: new URL('https://cendekiaamanah.sch.id'),
  title: {
    default: 'Pesantren Cendekia Amanah — Lembaga Pendidikan Terpadu',
    template: '%s | Pesantren Cendekia Amanah'
  },
  description:
    'Lembaga Pendidikan Terpadu dengan unit Pesantren, SMP, SMA, dan Madrasah Diniyah. Mencetak Generasi Qurani, Berprestasi, dan Berjiwa Pemimpin.',
  keywords: [
    'Pesantren Cendekia Amanah',
    'SMP Cendekia Amanah',
    'SMA Cendekia Amanah',
    'Madrasah Diniyah',
    'Pesantren Depok',
    'Tahfidz Al-Quran',
    'PPDB Pesantren 2027',
    'Boarding School Islam Depok',
    'KH Cholil Nafis'
  ],
  authors: [{ name: 'Pesantren Cendekia Amanah' }],
  creator: 'Pesantren Cendekia Amanah',
  publisher: 'Pesantren Cendekia Amanah',
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png'
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://cendekiaamanah.sch.id',
    siteName: 'Pesantren Cendekia Amanah',
    title: 'Pesantren Cendekia Amanah — Lembaga Pendidikan Terpadu',
    description:
      'Mencetak Generasi Qurani, Berprestasi, dan Berjiwa Pemimpin untuk Masa Depan Gemilang.',
    images: [
      {
        url: '/images/galery/pesantren6.png',
        width: 1200,
        height: 630,
        alt: 'Pesantren Cendekia Amanah'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pesantren Cendekia Amanah',
    description: 'Mencetak Generasi Qurani, Berprestasi, dan Berjiwa Pemimpin.',
    images: ['/images/galery/pesantren6.png']
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" data-scroll-behavior="smooth" className={`${poppins.variable} font-sans antialiased`}>
      <body className="flex flex-col min-h-screen bg-[#F4F7FB] text-[#28384A]">
        <UIProvider>
          {/* Global Sticky Header */}
          <SiteHeader />

          {/* Main Page Body */}
          <main className="flex-1 w-full">{children}</main>

          {/* Global Footer */}
          <SiteFooter />

          {/* Floating Actions & WhatsApp Button */}
          <FloatingActions />

          {/* Global Accessible Modals & Panels */}
          <WhatsAppPanel />
          <BrochureModal />
          <VideoModal />
        </UIProvider>
      </body>
    </html>
  );
}
