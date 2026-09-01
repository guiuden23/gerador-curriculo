import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BadgeVariant = "plan" | "success" | "warning" | "tag" | "recommended" | "info";

const variantClasses: Record<BadgeVariant, string> = {
  plan: "bg-purple-700 text-white",
  success: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  warning: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  tag: "bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300",
  recommended: "bg-white/15 text-white",
  info: "bg-indigo-600 text-white",
};

export function Badge({
  children,
  variant = "plan",
  className,
}: {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
