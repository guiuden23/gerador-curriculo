"use client";

import { initMercadoPago } from "@mercadopago/sdk-react";

export const MP_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY ??
  process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY ??
  process.env.NEXT_PUBLIC_MP_PUBLIC_KEY ??
  "";

// initMercadoPago é idempotente: chamar mais de uma vez é seguro.
let sdkInitialized = false;
export function ensureMpSdkInitialized() {
  if (sdkInitialized || !MP_PUBLIC_KEY) {
    if (!MP_PUBLIC_KEY) {
      console.error("[MP cartão] SDK não inicializado: public key ausente.");
    }
    return;
  }
  sdkInitialized = true;
  initMercadoPago(MP_PUBLIC_KEY, { locale: "pt-BR" });
}
