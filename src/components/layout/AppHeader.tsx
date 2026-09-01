"use client";

import { SITE } from "@/config/site";

export function AppHeader({ onLogoClick }: { onLogoClick: () => void }) {
  return (
    <header className="border-b border-purple-800 bg-purple-700">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <button
          type="button"
          onClick={onLogoClick}
          className="flex cursor-pointer items-center gap-2 rounded-lg transition-opacity hover:opacity-80"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-sm font-bold text-purple-700">
            CV
          </span>
          <span className="text-lg font-bold tracking-tight text-white">
            {SITE.shortName}{" "}
            <span className="text-white">Digital</span>
          </span>
        </button>
      </div>
    </header>
  );
}
