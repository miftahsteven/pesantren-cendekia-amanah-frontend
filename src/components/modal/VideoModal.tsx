'use client';

import React, { useEffect, useState } from 'react';
import { useUI } from '@/context/UIContext';
import { X, Play } from 'lucide-react';

const DEFAULT_YOUTUBE_URL = 'https://www.youtube.com/watch?v=iv-QsaLtvb8';

function getYouTubeEmbedUrl(url: string | undefined | null): string {
  const fallbackId = 'iv-QsaLtvb8';
  if (!url || typeof url !== 'string' || url.trim() === '') {
    return `https://www.youtube-nocookie.com/embed/${fallbackId}?autoplay=1`;
  }

  const trimmed = url.trim();

  // If already an embed URL
  if (trimmed.includes('youtube.com/embed/') || trimmed.includes('youtube-nocookie.com/embed/')) {
    const separator = trimmed.includes('?') ? '&' : '?';
    return trimmed.includes('autoplay=') ? trimmed : `${trimmed}${separator}autoplay=1`;
  }

  let videoId = '';

  try {
    const parsed = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`);

    if (parsed.hostname.includes('youtube.com')) {
      if (parsed.pathname === '/watch') {
        videoId = parsed.searchParams.get('v') || '';
      } else if (parsed.pathname.startsWith('/embed/')) {
        videoId = parsed.pathname.split('/embed/')[1]?.split('?')[0] || '';
      } else if (parsed.pathname.startsWith('/shorts/')) {
        videoId = parsed.pathname.split('/shorts/')[1]?.split('?')[0] || '';
      }
    } else if (parsed.hostname.includes('youtu.be')) {
      videoId = parsed.pathname.slice(1).split('?')[0] || '';
    }
  } catch {
    // URL parsing fallback via regex
  }

  if (!videoId) {
    const match = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (match) videoId = match[1];
  }

  return `https://www.youtube-nocookie.com/embed/${videoId || fallbackId}?autoplay=1`;
}

export default function VideoModal() {
  const { isVideoModalOpen, closeVideoModal, videoModalUrl } = useUI();
  const [siteVideoUrl, setSiteVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchSiteSetting() {
      try {
        const res = await fetch('/api/v1/site');
        if (res.ok) {
          const json = await res.json();
          if (isMounted && json?.data?.setting?.virtualTourUrl) {
            setSiteVideoUrl(json.data.setting.virtualTourUrl);
          }
        }
      } catch {
        // Fallback handled automatically
      }
    }

    if (isVideoModalOpen && !siteVideoUrl) {
      fetchSiteSetting();
    }

    return () => {
      isMounted = false;
    };
  }, [isVideoModalOpen, siteVideoUrl]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVideoModalOpen) {
        closeVideoModal();
      }
    };

    if (isVideoModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVideoModalOpen, closeVideoModal]);

  if (!isVideoModalOpen) return null;

  const activeVideoUrl = videoModalUrl || siteVideoUrl || DEFAULT_YOUTUBE_URL;
  const embedSrc = getYouTubeEmbedUrl(activeVideoUrl);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in"
      onClick={closeVideoModal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
    >
      <div
        className="relative w-full max-w-3xl bg-[#0B2F6B] rounded-2xl shadow-2xl overflow-hidden border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#D8232A] flex items-center justify-center text-white">
              <Play className="w-4 h-4 fill-white" />
            </div>
            <div>
              <h2 id="video-modal-title" className="text-base font-bold text-white">
                Video Profil & Virtual Tour Pesantren Cendekia Amanah
              </h2>
              <p className="text-xs text-[#FCA5A5]">Mengenal Lingkungan Belajar, Asrama, dan Fasilitas Unggulan</p>
            </div>
          </div>
          <button
            onClick={closeVideoModal}
            className="p-2 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Tutup modal video"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Container (16:9) */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center">
          <iframe
            className="w-full h-full"
            src={embedSrc}
            title="Video Profil Pesantren Cendekia Amanah"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Caption */}
        <div className="px-6 py-3.5 bg-[#0B2F6B] flex items-center justify-between text-xs text-white/75">
          <span>Kanal YouTube Resmi: @amanahtv1035</span>
          <button
            onClick={closeVideoModal}
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors cursor-pointer"
          >
            Tutup Video
          </button>
        </div>
      </div>
    </div>
  );
}
