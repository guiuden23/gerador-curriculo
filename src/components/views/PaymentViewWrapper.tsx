"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { useAppFlow } from "@/hooks/use-app-flow";

const PaymentView = dynamic(
  () => import("@/components/payment/PaymentView").then((m) => m.PaymentView),
  { ssr: false, loading: () => <PaymentLoading /> }
);

function PaymentLoading() {
  return (
    <Card className="mx-auto max-w-md animate-pulse">
      <div className="h-6 w-1/2 rounded bg-zinc-200 dark:bg-zinc-700" />
      <div className="mt-4 h-32 rounded bg-zinc-100 dark:bg-zinc-800" />
    </Card>
  );
}

export function PaymentViewWrapper() {
  const { selectedPlanId, goTo } = useAppFlow();

  useEffect(() => {
    if (!selectedPlanId) {
      goTo("plans");
    }
  }, [selectedPlanId, goTo]);

  if (!selectedPlanId) {
    return null;
  }

  return (
    <PaymentView
      planId={selectedPlanId}
      onBack={() => goTo("plans")}
      onSuccess={() => goTo("basic")}
    />
  );
}
