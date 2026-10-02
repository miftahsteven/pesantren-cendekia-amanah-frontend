import React from 'react';
import { apiGet } from '@/lib/api-client';
import PPDBBannerClient from './PPDBBannerClient';

const defaultBanner = {
  title: 'Sistem Penerimaan Murid Baru (SPMB) SMP Pesantren Cendekia Amanah Tahun Ajaran 2027/2028',
  imageUrl: '/uploads/gallery/spmb-banner-2027-2028.jpg',
  primaryCtaUrl: 'https://forms.gle/VTSESWSS3CzPFf7C6',
  isActive: true
};

export default async function PPDBBannerCTA() {
  let banner = defaultBanner;

  try {
    const res = await apiGet<any>('/site/ppdb-banner');
    if (res) {
      banner = {
        title: res.title || defaultBanner.title,
        imageUrl: res.imageUrl || defaultBanner.imageUrl,
        primaryCtaUrl: res.primaryCtaUrl || defaultBanner.primaryCtaUrl,
        isActive: res.isActive !== undefined ? Boolean(res.isActive) : true
      };
    }
  } catch {
    // Keep default
  }

  if (!banner.isActive) {
    return null;
  }

  return <PPDBBannerClient banner={banner} />;
}
