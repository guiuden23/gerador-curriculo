"use client";

import { PlanSelector } from "@/components/resume/PlanSelector";
import { BackButton } from "@/components/layout/BackButton";
import { useAppFlow } from "@/hooks/use-app-flow";

export function PlansView() {
  const { selectPlan, goTo } = useAppFlow();

  return (
    <div className="flex flex-col items-center gap-6">
      <PlanSelector onSelect={selectPlan} />
      <BackButton onClick={() => goTo("landing")} label="Voltar" />
    </div>
  );
}
