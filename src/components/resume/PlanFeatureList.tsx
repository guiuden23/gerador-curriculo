import type { PlanFeature } from "@/config/plans";

function CheckIcon() {
  return (
    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-3 w-3"
        aria-hidden="true"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </span>
  );
}

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
              <CheckIcon />
              {feature.text}
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
