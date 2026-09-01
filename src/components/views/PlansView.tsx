"use client";

import { PlanSelector } from "@/components/resume/PlanSelector";
import { BackButton } from "@/components/layout/BackButton";
import { FlowPageHeader } from "@/components/layout/FlowPageHeader";
import { useAppFlow } from "@/hooks/use-app-flow";

export function PlansView() {
  const { selectPlan, goTo } = useAppFlow();

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-6">
      <FlowPageHeader
        title="Escolha seu plano"
        description="Pagamento único, sem mensalidade. Acesso liberado na hora."
      />
      <PlanSelector onSelect={selectPlan} />
      <BackButton onClick={() => goTo("landing")} label="Voltar" />
    </div>
  );
}
