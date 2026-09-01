import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardSize = "md" | "lg";

const sizeClasses: Record<CardSize, string> = {
  md: "rounded-2xl p-5",
  lg: "rounded-3xl p-6",
};

export function Card({
  children,
  className,
  size = "lg",
}: {
  children: ReactNode;
  className?: string;
  size?: CardSize;
}) {
  return (
    <div
      className={cn(
        "border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900",
        sizeClasses[size],
        className
      )}
    >
      {children}
    </div>
  );
}
