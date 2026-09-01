import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { AppHeader } from "./AppHeader";

export function PageShell({
  children,
  onLogoClick,
  maxWidth = "max-w-[1240px]",
}: {
  children: ReactNode;
  onLogoClick?: () => void;
  maxWidth?: string;
}) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {onLogoClick && <AppHeader onLogoClick={onLogoClick} />}
      <main className={cn("mx-auto px-4 py-10 sm:py-14", maxWidth)}>
        {children}
      </main>
    </div>
  );
}
