"use client";

import { BrandLogo } from "./BrandLogo";

export function AppHeader({ onLogoClick }: { onLogoClick: () => void }) {
  return (
    <header className="border-b border-purple-800 bg-purple-700">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <BrandLogo variant="header" onClick={onLogoClick} />
      </div>
    </header>
  );
}
