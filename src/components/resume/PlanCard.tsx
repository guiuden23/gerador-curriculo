"use client";

import type { Plan, PlanId } from "@/config/plans";
import { Badge } from "@/components/ui/Badge";
import { GradientButton } from "@/components/ui/GradientButton";
import { PlanPrice } from "@/components/ui/PlanPrice";
import { DollarIcon } from "@/components/ui/icons";
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

        <PlanPrice amount={plan.amount} className="mt-2" />

        {plan.badge && (
          <Badge variant="tag" className="mt-2 normal-case tracking-normal">
            <DollarIcon />
            {plan.badge}
          </Badge>
        )}

        <PlanFeatureList features={plan.features} />

        <GradientButton
          fullWidth
          showArrow
          onClick={() => onSelect(plan.id as PlanId)}
          disabled={disabled}
          className="mt-5 sm:mt-6 py-3 text-[13px] sm:py-3.5 sm:text-sm"
        >
          Escolher {plan.name}
        </GradientButton>
        <p className="mt-3 text-center text-[11px] text-zinc-400 dark:text-zinc-500">
          Acesso liberado na hora, direto no seu navegador
        </p>
      </div>
    </div>
  );
}
