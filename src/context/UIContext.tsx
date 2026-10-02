'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UIContextType {
  isBrochureModalOpen: boolean;
  isVideoModalOpen: boolean;
  videoModalUrl: string | null;
  isWhatsAppPanelOpen: boolean;
  isPpdbModalOpen: boolean;
  openBrochureModal: () => void;
  closeBrochureModal: () => void;
  openVideoModal: (url?: string | React.MouseEvent | unknown) => void;
  closeVideoModal: () => void;
  openWhatsAppPanel: () => void;
  closeWhatsAppPanel: () => void;
  toggleWhatsAppPanel: () => void;
  openPpdbModal: () => void;
  closePpdbModal: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoModalUrl, setVideoModalUrl] = useState<string | null>(null);
  const [isWhatsAppPanelOpen, setIsWhatsAppPanelOpen] = useState(false);
  const [isPpdbModalOpen, setIsPpdbModalOpen] = useState(false);

  const openBrochureModal = () => setIsBrochureModalOpen(true);
  const closeBrochureModal = () => setIsBrochureModalOpen(false);

  const openVideoModal = (url?: string | unknown) => {
    if (typeof url === 'string' && url.trim() !== '') {
      setVideoModalUrl(url.trim());
    } else {
      setVideoModalUrl(null);
    }
    setIsVideoModalOpen(true);
  };
  const closeVideoModal = () => setIsVideoModalOpen(false);

  const openWhatsAppPanel = () => setIsWhatsAppPanelOpen(true);
  const closeWhatsAppPanel = () => setIsWhatsAppPanelOpen(false);
  const toggleWhatsAppPanel = () => setIsWhatsAppPanelOpen((prev) => !prev);

  const openPpdbModal = () => setIsPpdbModalOpen(true);
  const closePpdbModal = () => setIsPpdbModalOpen(false);

  return (
    <UIContext.Provider
      value={{
        isBrochureModalOpen,
        isVideoModalOpen,
        videoModalUrl,
        isWhatsAppPanelOpen,
        isPpdbModalOpen,
        openBrochureModal,
        closeBrochureModal,
        openVideoModal,
        closeVideoModal,
        openWhatsAppPanel,
        closeWhatsAppPanel,
        toggleWhatsAppPanel,
        openPpdbModal,
        closePpdbModal
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
}
