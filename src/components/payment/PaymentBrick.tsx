"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Payment } from "@mercadopago/sdk-react";
import type {
  IAdditionalCardFormData,
  IPaymentBrickPaymentMethods,
  IPaymentFormData,
} from "@mercadopago/sdk-react/esm/bricks/payment/type";
import { installMpApiProxy } from "@/lib/mp-api-proxy";
import { ensureMpSdkInitialized, MP_PUBLIC_KEY } from "@/lib/mp-init";
import { cleanIdentification, isValidPayerEmail, splitPersonName } from "@/lib/mp-payer";
import type { PlanId } from "@/config/plans";
import { explainMpStatusDetail } from "@/lib/mp-status-detail";

type AllOrArray = "all" | string[];
type BrickMethods = IPaymentBrickPaymentMethods & {
  creditCard: AllOrArray;
  debitCard: AllOrArray;
  ticket: AllOrArray;
  bankTransfer: AllOrArray;
  atm: AllOrArray;
  mercadoPago: AllOrArray;
  prepaidCard: AllOrArray;
};

// "" desativa o método; "all" habilita. O tipo do SDK aceita string[] vazio.
const METHOD_BASE: BrickMethods = {
  creditCard: [],
  debitCard: [],
  ticket: [],
  bankTransfer: [],
  atm: [],
  mercadoPago: [],
  prepaidCard: [],
};

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

interface SubmitFormData {
  token?: string;
  payment_method_id?: string;
  issuer_id?: string;
  installments?: number;
  payer?: {
    email?: string;
    first_name?: string;
    last_name?: string;
    identification?: { type?: string; number?: string };
  };
}

export function PaymentBrick({
  planId,
  amount,
  payerEmail,
  onCreated,
  onError,
  paymentMethods,
}: {
  planId: PlanId;
  amount: number;
  payerEmail: string;
  onCreated: (result: { paymentId: number; status: string; statusDetail?: string }) => void;
  onError: (reason: "sdk" | "brick", message?: string) => void;
  paymentMethods?: Partial<BrickMethods>;
}) {
  useEffect(() => {
    // Garante que as chamadas do SDK à API do Mercado Pago passem pelo proxy
    // do servidor (idempotente; independe do Service Worker).
    installMpApiProxy();
    ensureMpSdkInitialized();
  }, []);

  const payerEmailRef = useRef(payerEmail);
  const onCreatedRef = useRef(onCreated);
  const onErrorRef = useRef(onError);
  const [brickInitEmail] = useState(() => payerEmail);

  useEffect(() => {
    payerEmailRef.current = payerEmail;
    onCreatedRef.current = onCreated;
    onErrorRef.current = onError;
  }, [payerEmail, onCreated, onError]);

  useEffect(() => {
    if (!MP_PUBLIC_KEY) {
      console.error("[MP cartão] NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY ausente.");
      onErrorRef.current("sdk", "Chave pública do Mercado Pago não configurada.");
    }
  }, [amount]);

  const initialization = useMemo(
    () => ({
      amount,
      payer: {
        email: brickInitEmail,
        entityType: "individual" as const,
      },
    }),
    [amount, brickInitEmail]
  );
  const customization = useMemo(
    () => ({
      paymentMethods: {
        ...METHOD_BASE,
        ...(paymentMethods ?? { creditCard: "all", debitCard: "all" }),
      },
    }),
    [paymentMethods]
  );

  const handleSubmit = useCallback(async (
    payload: IPaymentFormData,
    extra?: IAdditionalCardFormData | null
  ) => {
    const cardholderName =
      extra?.cardholderName ??
      (payload.additionalData && "cardholderName" in payload.additionalData
        ? payload.additionalData.cardholderName
        : undefined);
    const names = splitPersonName(cardholderName);
    const rawForm = payload.formData as SubmitFormData;
    const email = (payerEmailRef.current || rawForm.payer?.email || "").trim();

    if (!isValidPayerEmail(email)) {
      console.error("[MP cartão] E-mail do pagador inválido:", email);
      throw new Error("Informe um e-mail válido do titular do cartão.");
    }

    const formData: SubmitFormData = {
      ...rawForm,
      payer: {
        ...rawForm.payer,
        email,
        first_name: names.first_name ?? rawForm.payer?.first_name,
        last_name: names.last_name ?? rawForm.payer?.last_name,
        identification: cleanIdentification(rawForm.payer?.identification),
      },
    };

    const res = await fetch("/api/mercadopago/pay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planId, formData }),
    });
    const json = (await res.json().catch(() => ({}))) as {
      id?: number;
      status?: string;
      statusDetail?: string;
      error?: string;
      mpError?: string;
      cause?: unknown;
    };

    if (!res.ok || !json.id || !json.status) {
      console.error("[MP cartão] Falha ao criar pagamento no servidor:", json);
      throw new Error(json?.error ?? "Falha ao criar o pagamento.");
    }

    if (json.status === "rejected" || json.status === "cancelled") {
      console.warn("[MP cartão] Pagamento criado mas RECUSADO:", {
        id: json.id,
        status: json.status,
        statusDetail: json.statusDetail,
        motivo: explainMpStatusDetail(json.statusDetail),
      });
    }

    onCreatedRef.current({ paymentId: json.id, status: json.status, statusDetail: json.statusDetail });
  }, [planId]);

  const handleBrickError = useCallback((error: unknown) => {
    const raw =
      error && typeof error === "object"
        ? (error as { type?: string; cause?: string })
        : {};
    if (
      raw.type === "non_critical" ||
      raw.cause === "secure_fields_card_token_creation_failed"
    ) {
      return;
    }
    onErrorRef.current("brick", errorMessage(error));
  }, []);

  if (!MP_PUBLIC_KEY) return null;

  return (
    <Payment
      locale="pt-BR"
      initialization={initialization}
      customization={customization}
      onSubmit={handleSubmit}
      onError={handleBrickError}
      onReady={() => {}}
    />
  );
}
