"use client";

import { useEffect } from "react";

export function usePollPaymentStatus(
  paymentId: number | null,
  onStatusChange: (status: string, statusDetail?: string) => void,
  endpointPrefix = "/api/mercadopago/status"
) {
  useEffect(() => {
    if (!paymentId) return;

    let alive = true;
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${endpointPrefix}/${paymentId}`);
        const json = (await res.json()) as {
          status?: string;
          statusDetail?: string;
        };
        if (!alive || !json.status) return;
        if (
          json.status === "approved" ||
          json.status === "rejected" ||
          json.status === "cancelled"
        ) {
          onStatusChange(json.status, json.statusDetail);
        }
      } catch (error) {
        console.warn("[Pagamento] Polling falhou (tenta de novo):", error);
      }
    }, 3000);

    return () => {
      alive = false;
      clearInterval(interval);
    };
  }, [paymentId, onStatusChange, endpointPrefix]);
}
