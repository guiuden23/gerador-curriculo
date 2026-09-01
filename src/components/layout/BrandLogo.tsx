"use client";

import Link from "next/link";
import { SITE } from "@/config/site";
import { cn } from "@/lib/cn";

type BrandLogoVariant = "header" | "footer" | "landing";

const variantClasses: Record<BrandLogoVariant, { icon: string; text: string }> = {
  header: {
    icon: "h-8 w-8 rounded-lg bg-white text-sm font-bold text-purple-700",
    text: "text-lg font-bold tracking-tight text-white",
  },
  footer: {
    icon: "h-7 w-7 rounded-lg bg-purple-700 text-xs font-bold text-white",
    text: "font-bold text-zinc-700 dark:text-zinc-200",
  },
  landing: {
    icon: "h-8 w-8 rounded-lg bg-white text-sm font-bold text-purple-700",
    text: "text-lg font-bold tracking-tight text-white",
  },
};

export function BrandLogo({
  variant = "header",
  href,
  onClick,
  className,
}: {
  variant?: BrandLogoVariant;
  href?: string;
  onClick?: () => void;
  className?: string;
}) {
  const styles = variantClasses[variant];
  const accentClass =
    variant === "footer"
      ? "text-purple-600 dark:text-purple-400"
      : "text-white";

  const content = (
    <>
      <span
        className={cn(
          "flex items-center justify-center",
          styles.icon
        )}
      >
        CV
      </span>
      <span className={styles.text}>
        {SITE.shortName}{" "}
        <span className={accentClass}>Digital</span>
      </span>
    </>
  );

  const wrapperClass = cn(
    "flex items-center gap-2 rounded-lg transition-opacity hover:opacity-80",
    className
  );

  if (href) {
    return (
      <Link href={href} className={wrapperClass}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={cn(wrapperClass, "cursor-pointer")}>
      {content}
    </button>
  );
}
