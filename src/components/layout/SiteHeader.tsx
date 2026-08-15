import React from 'react';
import TopUtilityBar from './TopUtilityBar';
import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './MobileNavigation';

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full shadow-xs">
      <TopUtilityBar />
      <DesktopNavigation />
      <MobileNavigation />
    </header>
  );
}
