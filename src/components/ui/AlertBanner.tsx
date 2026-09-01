import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type AlertVariant = "success" | "error" | "warning" | "info";

const variantClasses: Record<AlertVariant, string> = {
  success:
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300",
  error:
    "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300",
  warning:
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300",
  info:
    "border-zinc-200 bg-zinc-50 text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
};

export function AlertBanner({
  variant = "info",
  title,
  children,
  className,
  pulse,
}: {
  variant?: AlertVariant;
  title?: string;
  children: ReactNode;
  className?: string;
  pulse?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border px-4 py-3 text-center",
        variantClasses[variant],
        className
      )}
    >
      {pulse && (
        <span className="mb-2 inline-flex items-center justify-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-amber-500" />
        </span>
      )}
      {title && <p className="text-lg font-bold">{title}</p>}
      <div className={cn(title && "mt-1 text-sm")}>{children}</div>
    </div>
  );
}
