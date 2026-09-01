"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { PlanId } from "@/config/plans";
import { loadSelectedPlan, saveSelectedPlan } from "@/lib/storage/plan-storage";
import { isPaymentVerified } from "@/lib/storage/payment-storage";
import { usePaymentContext } from "@/contexts/payment-context";

export type AppView = "landing" | "plans" | "payment" | "basic";

interface AppFlowContextValue {
  view: AppView;
  selectedPlanId: PlanId | null;
  goTo: (view: AppView) => void;
  selectPlan: (planId: PlanId) => void;
  resetToLanding: () => void;
  canAccessEditor: boolean;
}

const AppFlowContext = createContext<AppFlowContextValue | null>(null);

function resolveInitialPlan(): PlanId | null {
  const stored = loadSelectedPlan();
  return stored as PlanId | null;
}

export function AppFlowProvider({ children }: { children: ReactNode }) {
  const { status: paymentStatus } = usePaymentContext();
  const [view, setView] = useState<AppView>("landing");
  const [selectedPlanId, setSelectedPlanId] = useState<PlanId | null>(resolveInitialPlan);

  const goTo = useCallback((next: AppView) => setView(next), []);

  const selectPlan = useCallback((planId: PlanId) => {
    setSelectedPlanId(planId);
    saveSelectedPlan(planId);
    setView("payment");
  }, []);

  const resetToLanding = useCallback(() => {
    setView("landing");
  }, []);

  const canAccessEditor = useMemo(
    () => Boolean(selectedPlanId && isPaymentVerified(selectedPlanId)),
    // paymentStatus dispara recomputo após markApproved (sessionStorage sozinho não re-renderiza).
    [selectedPlanId, paymentStatus]
  );

  const value = useMemo(
    () => ({
      view,
      selectedPlanId,
      goTo,
      selectPlan,
      resetToLanding,
      canAccessEditor,
    }),
    [view, selectedPlanId, goTo, selectPlan, resetToLanding, canAccessEditor]
  );

  return <AppFlowContext.Provider value={value}>{children}</AppFlowContext.Provider>;
}

export function useAppFlowContext() {
  const ctx = useContext(AppFlowContext);
  if (!ctx) {
    throw new Error("useAppFlow deve ser usado dentro de <AppFlowProvider>");
  }
  return ctx;
}
