import type { PlanFeature } from "@/config/plans";
import { CheckIcon } from "@/components/ui/icons";

export function PlanFeatureList({ features }: { features: readonly PlanFeature[] }) {
  return (
    <ul className="mt-5 space-y-2 border-t border-zinc-100 pt-4 text-xs text-zinc-600 dark:border-zinc-800 dark:text-zinc-300 sm:mt-6 sm:space-y-2.5 sm:pt-5 sm:text-sm">
      {features.map((feature) => (
        <li
          key={feature.text}
          className={
            feature.highlighted
              ? "rounded-xl bg-purple-900 px-3 py-2 font-semibold text-white dark:bg-purple-950"
              : "flex items-start gap-2.5"
          }
        >
          {feature.highlighted ? (
            feature.text
          ) : (
            <>
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                <CheckIcon />
              </span>
              {feature.text}
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
