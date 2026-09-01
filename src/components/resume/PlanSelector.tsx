"use client";

import { getSelectorPlans, type PlanId } from "@/config/plans";
import { PlanCard } from "./PlanCard";

export type { PlanId };

export function PlanSelector({
  onSelect,
}: {
  onSelect: (planId: PlanId) => void;
}) {
  return (
    <div className="mx-auto w-full max-w-md">
      <PlanCards onSelect={onSelect} />
    </div>
  );
}

export function PlanCards({
  onSelect,
  disabled,
}: {
  onSelect: (planId: PlanId) => void;
  disabled?: boolean;
}) {
  const plans = getSelectorPlans();

  return (
    <div
      className={`mx-auto grid gap-4 ${
        plans.length > 1 ? "max-w-4xl md:grid-cols-2" : "max-w-md"
      }`}
    >
      {plans.map((plan) => (
        <PlanCard key={plan.id} plan={plan} onSelect={onSelect} disabled={disabled} />
      ))}
    </div>
  );
}
