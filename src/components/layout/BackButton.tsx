"use client";

import { cn } from "@/lib/cn";

export function BackButton({
  onClick,
  label,
  variant = "outline",
  className,
}: {
  onClick: () => void;
  label: string;
  variant?: "outline" | "ghost";
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 text-sm font-semibold transition-colors",
        variant === "outline" &&
          "rounded-xl border border-zinc-300 px-5 py-2.5 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800",
        variant === "ghost" &&
          "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100",
        className
      )}
    >
      ← {label}
    </button>
  );
}
