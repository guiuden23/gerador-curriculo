"use client";

import { AppFlowProvider } from "@/contexts/app-flow-context";
import { PaymentProvider } from "@/contexts/payment-context";
import { ResumeProvider } from "@/contexts/resume-context";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ResumeProvider>
      <PaymentProvider>
        <AppFlowProvider>{children}</AppFlowProvider>
      </PaymentProvider>
    </ResumeProvider>
  );
}
