'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UIContextType {
  isBrochureModalOpen: boolean;
  isVideoModalOpen: boolean;
  isWhatsAppPanelOpen: boolean;
  openBrochureModal: () => void;
  closeBrochureModal: () => void;
  openVideoModal: () => void;
  closeVideoModal: () => void;
  openWhatsAppPanel: () => void;
  closeWhatsAppPanel: () => void;
  toggleWhatsAppPanel: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isWhatsAppPanelOpen, setIsWhatsAppPanelOpen] = useState(false);

  const openBrochureModal = () => setIsBrochureModalOpen(true);
  const closeBrochureModal = () => setIsBrochureModalOpen(false);

  const openVideoModal = () => setIsVideoModalOpen(true);
  const closeVideoModal = () => setIsVideoModalOpen(false);

  const openWhatsAppPanel = () => setIsWhatsAppPanelOpen(true);
  const closeWhatsAppPanel = () => setIsWhatsAppPanelOpen(false);
  const toggleWhatsAppPanel = () => setIsWhatsAppPanelOpen((prev) => !prev);

  return (
    <UIContext.Provider
      value={{
        isBrochureModalOpen,
        isVideoModalOpen,
        isWhatsAppPanelOpen,
        openBrochureModal,
        closeBrochureModal,
        openVideoModal,
        closeVideoModal,
        openWhatsAppPanel,
        closeWhatsAppPanel,
        toggleWhatsAppPanel
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
