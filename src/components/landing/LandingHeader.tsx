"use client";

import { BrandLogo } from "@/components/layout/BrandLogo";
import { LANDING_NAV_ITEMS } from "./content";

export function LandingHeader({
  onStart,
  onScrollTo,
}: {
  onStart: () => void;
  onScrollTo: (id: string) => void;
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-purple-800 bg-gradient-to-r from-purple-700 via-purple-600 to-fuchsia-600 backdrop-blur dark:from-purple-800 dark:via-purple-700 dark:to-fuchsia-700">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <BrandLogo
          variant="landing"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="mx-auto md:mx-0"
        />

        <nav className="hidden items-center gap-7 text-sm font-bold text-white/90 md:flex">
          {LANDING_NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onScrollTo(item.id)}
              className="cursor-pointer transition-colors hover:text-white"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          onClick={onStart}
          className="hidden h-10 cursor-pointer items-center justify-center rounded-xl bg-white px-5 text-sm font-bold text-purple-700 transition-colors hover:bg-purple-50 md:inline-flex"
        >
          Criar Meu Currículo
        </button>
      </div>
    </header>
  );
}
