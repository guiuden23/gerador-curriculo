import type { ReactNode } from "react";
import { BrandLogo } from "./BrandLogo";
import { cn } from "@/lib/cn";

export function StaticPageShell({
  children,
  maxWidth = "max-w-xl",
  centered,
}: {
  children: ReactNode;
  maxWidth?: string;
  centered?: boolean;
}) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <header className="border-b border-purple-800 bg-purple-700">
        <div className="mx-auto flex max-w-5xl px-4 py-4">
          <BrandLogo variant="header" href="/" />
        </div>
      </header>
      <main
        className={cn(
          "mx-auto px-4 py-12 sm:py-16",
          maxWidth,
          centered && "flex flex-col items-center text-center"
        )}
      >
        {children}
      </main>
    </div>
  );
}
