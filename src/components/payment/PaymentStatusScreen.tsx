"use client";

import { useEffect } from "react";
import { StatusScreen } from "@mercadopago/sdk-react";
import { ensureMpSdkInitialized, MP_PUBLIC_KEY } from "@/lib/mp-init";
import { usePollPaymentStatus } from "@/hooks/use-poll-payment-status";

function errorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (error && typeof error === "object") {
    const raw = error as {
      message?: string;
      cause?: { message?: string };
      error?: string;
    };
    return raw?.message || raw?.cause?.message || raw?.error || JSON.stringify(error);
  }
  return String(error);
}

export function PaymentStatusScreen({
  paymentId,
  onStatusChange,
  onError,
}: {
  paymentId: number;
  onStatusChange: (status: string, statusDetail?: string) => void;
  onError: (message?: string) => void;
}) {
  useEffect(() => {
    ensureMpSdkInitialized();
  }, []);

  useEffect(() => {
    if (!MP_PUBLIC_KEY) {
      onError("Chave pública do Mercado Pago não configurada.");
    }
  }, [onError]);

  usePollPaymentStatus(paymentId, onStatusChange);

  if (!MP_PUBLIC_KEY) return null;

  return (
    <StatusScreen
      locale="pt-BR"
      initialization={{ paymentId: String(paymentId) }}
      customization={{ visual: { hidePixQrCode: false } }}
      onError={(error: unknown) => {
        console.error("[MP cartão] Status Screen Brick onError:", error);
        onError(errorMessage(error));
      }}
      onReady={() => {}}
    />
  );
}
