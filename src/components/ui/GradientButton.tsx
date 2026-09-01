import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ArrowRightIcon } from "./icons";

type GradientButtonSize = "md" | "lg";

const sizeClasses: Record<GradientButtonSize, string> = {
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-8 text-base",
};

export function GradientButton({
  children,
  showArrow,
  size = "md",
  fullWidth,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  showArrow?: boolean;
  size?: GradientButtonSize;
  fullWidth?: boolean;
}) {
  return (
    <button
      type="button"
      className={cn(
        "group inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 font-bold text-white shadow-lg shadow-purple-500/25 transition-all hover:from-purple-700 hover:to-fuchsia-700 hover:shadow-xl active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60",
        sizeClasses[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
      {showArrow && (
        <ArrowRightIcon className="transition-transform group-hover:translate-x-0.5" />
      )}
    </button>
  );
}

export function GradientButtonContent({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
