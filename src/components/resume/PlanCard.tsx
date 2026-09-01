"use client";

import type { Plan, PlanId } from "@/config/plans";
import { formatPlanPriceParts } from "@/config/plans";
import { PlanFeatureList } from "./PlanFeatureList";

export function PlanCard({
  plan,
  onSelect,
  disabled,
}: {
  plan: Plan;
  onSelect: (planId: PlanId) => void;
  disabled?: boolean;
}) {
  const { currency, integer, fraction } = formatPlanPriceParts(plan.amount);

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border bg-white shadow-xl shadow-purple-100/70 dark:bg-zinc-900 dark:shadow-none ${
        plan.highlight
          ? "border-purple-300 dark:border-purple-800"
          : "border-zinc-200 dark:border-zinc-700"
      }`}
    >
      <div className="h-1.5 w-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-purple-600" />

      <div className="p-5 sm:p-7">
        <h3 className="text-base font-bold tracking-tight text-purple-600 dark:text-purple-400 sm:text-lg">
          {plan.name}
        </h3>

        <div className="mt-2 flex items-baseline gap-1.5">
          <span className="text-lg font-bold text-purple-600 dark:text-purple-400 sm:text-xl">
            {currency}
          </span>
          <span className="text-4xl font-extrabold leading-none tracking-tight text-purple-600 dark:text-purple-400 sm:text-5xl">
            {integer}
            <span className="text-2xl sm:text-3xl">,{fraction}</span>
          </span>
        </div>

        {plan.badge && (
          <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700 dark:bg-purple-950/60 dark:text-purple-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5"
              aria-hidden="true"
            >
              <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            {plan.badge}
          </p>
        )}

        <PlanFeatureList features={plan.features} />

        <button
          type="button"
          onClick={() => onSelect(plan.id as PlanId)}
          disabled={disabled}
          className="group mt-5 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 py-3 text-[13px] font-bold text-white shadow-lg shadow-purple-500/25 transition-all hover:from-purple-700 hover:to-fuchsia-700 hover:shadow-xl active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:mt-6 sm:py-3.5 sm:text-sm"
        >
          Escolher {plan.name}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
        <p className="mt-3 text-center text-[11px] text-zinc-400 dark:text-zinc-500">
          Acesso liberado na hora, direto no seu navegador
        </p>
      </div>
    </div>
  );
}
