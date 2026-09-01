import { formatPlanPrice, formatPlanPriceParts } from "@/config/plans";
import { cn } from "@/lib/cn";

export function PlanPrice({
  amount,
  variant = "hero",
  className,
}: {
  amount: number;
  variant?: "hero" | "inline";
  className?: string;
}) {
  if (variant === "inline") {
    return (
      <span
        className={cn(
          "font-bold text-purple-700 dark:text-purple-400",
          className
        )}
      >
        {formatPlanPrice(amount)}
      </span>
    );
  }

  const { currency, integer, fraction } = formatPlanPriceParts(amount);

  return (
    <div className={cn("flex items-baseline gap-1.5", className)}>
      <span className="text-lg font-bold text-purple-600 dark:text-purple-400 sm:text-xl">
        {currency}
      </span>
      <span className="text-4xl font-extrabold leading-none tracking-tight text-purple-600 dark:text-purple-400 sm:text-5xl">
        {integer}
        <span className="text-2xl sm:text-3xl">,{fraction}</span>
      </span>
    </div>
  );
}
