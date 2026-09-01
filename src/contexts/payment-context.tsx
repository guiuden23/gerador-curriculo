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
import {
  isPaymentVerified,
  saveVerifiedPayment,
} from "@/lib/storage/payment-storage";

export type PaymentStatus =
  | "idle"
  | "paying"
  | "waiting"
  | "approved"
  | "rejected"
  | "error";

interface PaymentContextValue {
  status: PaymentStatus;
  paymentId: number | null;
  payerEmail: string;
  setStatus: (status: PaymentStatus) => void;
  setPaymentId: (id: number | null) => void;
  setPayerEmail: (email: string) => void;
  markApproved: (planId: PlanId, paymentId: number) => void;
  resetPayment: () => void;
  isVerifiedForPlan: (planId: PlanId) => boolean;
}

const PaymentContext = createContext<PaymentContextValue | null>(null);

export function PaymentProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<PaymentStatus>("idle");
  const [paymentId, setPaymentId] = useState<number | null>(null);
  const [payerEmail, setPayerEmail] = useState("");

  const markApproved = useCallback((planId: PlanId, id: number) => {
    saveVerifiedPayment(planId, id);
    setPaymentId(id);
    setStatus("approved");
  }, []);

  const resetPayment = useCallback(() => {
    setPaymentId(null);
    setStatus("paying");
  }, []);

  const isVerifiedForPlan = useCallback(
    (planId: PlanId) => isPaymentVerified(planId),
    []
  );

  const value = useMemo(
    () => ({
      status,
      paymentId,
      payerEmail,
      setStatus,
      setPaymentId,
      setPayerEmail,
      markApproved,
      resetPayment,
      isVerifiedForPlan,
    }),
    [
      status,
      paymentId,
      payerEmail,
      markApproved,
      resetPayment,
      isVerifiedForPlan,
    ]
  );

  return (
    <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>
  );
}

export function usePaymentContext() {
  const ctx = useContext(PaymentContext);
  if (!ctx) {
    throw new Error("usePayment deve ser usado dentro de <PaymentProvider>");
  }
  return ctx;
}
