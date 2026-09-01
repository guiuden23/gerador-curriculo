"use client";

import type { PlanId } from "@/config/plans";
import { PlanCards } from "@/components/resume/PlanSelector";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function PlansSection({
  onSelectPlan,
}: {
  onSelectPlan: (planId: PlanId) => void;
}) {
  return (
    <section id="planos" className="py-16">
      <div className="mx-auto max-w-3xl px-4">
        <SectionTitle
          title="Planos"
          subtitle="Pagamento único, sem mensalidade. Acesso liberado na hora."
        />
        <div className="mt-10">
          <PlanCards onSelect={onSelectPlan} />
        </div>
      </div>
    </section>
  );
}
