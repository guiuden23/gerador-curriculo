import { NextResponse } from "next/server";
import { serverFetch } from "@/lib/server-fetch";
import { getPlan } from "@/config/plans";
import { cleanIdentification, isValidPayerEmail, splitPersonName } from "@/lib/mp-payer";
import { explainMpStatusDetail, explainMpApiCause, mpCredentialKind } from "@/lib/mp-status-detail";

const ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN;

// Valor e identificação do plano definidos SOMENTE no servidor via config/plans.ts.
// O valor enviado pelo cliente (tela do brick) é ignorado.

interface MPFormData {
  token?: string;
  payment_method_id?: string;
  issuer_id?: string;
  installments?: number;
  payment_method_option_id?: string | null;
  processing_mode?: string | null;
  payer?: {
    email?: string;
    first_name?: string;
    last_name?: string;
    identification?: { type?: string; number?: string };
  };
}

export async function POST(request: Request) {
  const publicKey =
    process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY ??
    process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY ??
    "";
  const tokenKind = mpCredentialKind(ACCESS_TOKEN);
  const publicKeyKind = mpCredentialKind(publicKey);

  if (tokenKind !== publicKeyKind && tokenKind !== "AUSENTE" && publicKeyKind !== "AUSENTE") {
    console.warn(
      "[MP cartão] INCOMPATIBILIDADE DE CREDENCIAIS: access token é",
      tokenKind,
      "mas a public key é",
      publicKeyKind,
      "— o token do cartão gerado no Brick não casa com a conta que cobra, e o pagamento sai recusado."
    );
  }

  if (!ACCESS_TOKEN) {
    console.error("[MP cartão] MERCADOPAGO_ACCESS_TOKEN ausente — pagamento impossível.");
    return NextResponse.json(
      { error: "Access token do Mercado Pago não configurado." },
      { status: 501 }
    );
  }

  let payload: { planId?: string; formData: MPFormData };
  try {
    payload = (await request.json()) as { planId?: string; formData: MPFormData };
  } catch {
    console.error("[MP cartão] JSON do body inválido.");
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const planId = payload.planId ?? "resume";
  const plan = getPlan(planId);
  if (!plan || plan.paymentGateway !== "mercadopago") {
    return NextResponse.json({ error: "Plano inválido para Mercado Pago." }, { status: 400 });
  }

  const PLAN_AMOUNT = plan.amount;
  const PLAN_DESCRIPTION = plan.description;
  const PLAN_REFERENCE = plan.reference;

  const { formData } = payload;
  const isPix = formData?.payment_method_id === "pix";

  // Cartão precisa do token gerado pelo Brick; Pix não usa token.
  if (!formData || !formData.payment_method_id || (!isPix && !formData.token)) {
    console.error("[MP cartão] Payload incompleto — recusando antes de chamar a API:", {
      hasToken: Boolean(formData?.token),
      paymentMethodId: formData?.payment_method_id,
      formDataKeys: Object.keys(formData ?? {}),
    });
    return NextResponse.json(
      { error: "Dados de pagamento incompletos." },
      { status: 400 }
    );
  }

  const payerEmail = formData.payer?.email?.trim() ?? "";
  if (!isValidPayerEmail(payerEmail)) {
    console.error("[MP cartão] E-mail do pagador ausente ou inválido:", payerEmail);
    return NextResponse.json(
      { error: "Informe um e-mail válido do titular do cartão." },
      { status: 400 }
    );
  }

  const identification = cleanIdentification(formData.payer?.identification);
  const namesFromPayer = {
    first_name: formData.payer?.first_name?.trim(),
    last_name: formData.payer?.last_name?.trim(),
  };
  const namesFallback = splitPersonName(
    [namesFromPayer.first_name, namesFromPayer.last_name].filter(Boolean).join(" ")
  );
  const firstName = namesFromPayer.first_name || namesFallback.first_name;
  const lastName = namesFromPayer.last_name || namesFallback.last_name;

  const idempotencyKey =
    typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  // notification_url é OPCIONAL e a API rejeita o pagamento se ela não for
  // publicamente acessível ("notification_url attribute must be url valid")
  // — ex.: http://localhost. Em teste local enviamos SEM webhook; o status é
  // acompanhado por polling (/api/mercadopago/status/:id). Em produção
  // (URL https pública) o webhook é enviado normalmente.
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";
  let notificationUrl: string | undefined;
  try {
    const parsed = new URL(appUrl);
    const isLocalHost =
      parsed.hostname === "localhost" ||
      parsed.hostname === "127.0.0.1" ||
      parsed.hostname === "::1" ||
      parsed.hostname === "0.0.0.0";
    if (
      !isLocalHost &&
      (parsed.protocol === "http:" || parsed.protocol === "https:")
    ) {
      notificationUrl = `${appUrl.replace(/\/+$/, "")}/api/webhooks/mercadopago`;
    }
  } catch {
    // URL inválida — segue sem webhook.
  }

  const isTestEnv = tokenKind === "TESTE";

  const cardFields = isPix
    ? {}
    : {
        token: formData.token,
        installments: Number(formData.installments ?? 1),
        payment_type_id: "credit_card" as const,
        ...(formData.processing_mode ? { processing_mode: formData.processing_mode } : {}),
        ...(formData.payment_method_option_id
          ? { payment_method_option_id: formData.payment_method_option_id }
          : {}),
        ...(formData.issuer_id &&
        formData.issuer_id !== "0" &&
        !Number.isNaN(Number(formData.issuer_id))
          ? { issuer_id: Number(formData.issuer_id) }
          : {}),
      };

  const mpRequestBody = {
    transaction_amount: PLAN_AMOUNT,
    payment_method_id: formData.payment_method_id,
    description: PLAN_DESCRIPTION,
    external_reference: PLAN_REFERENCE,
    ...(notificationUrl ? { notification_url: notificationUrl } : {}),
    // binary_mode agressivo pode bloquear cartões de teste no sandbox.
    binary_mode: !isTestEnv && Boolean(formData?.token),
    ...cardFields,
    payer: {
      email: payerEmail,
      first_name: firstName,
      last_name: lastName,
      identification,
    },
  };

  if (!isPix) {
    console.info("[MP cartão] Criando pagamento:", {
      env: isTestEnv ? "TESTE" : tokenKind,
      payment_method_id: formData.payment_method_id,
      payment_type_id: "credit_card",
      installments: formData.installments,
      issuer_id: formData.issuer_id ?? "(ausente)",
      payment_method_option_id: formData.payment_method_option_id ?? "(ausente)",
      processing_mode: formData.processing_mode ?? "(ausente)",
      binary_mode: !isTestEnv,
      tokenPrefix: formData.token?.slice(0, 8),
    });
  }

  try {
    const res = await serverFetch("https://api.mercadopago.com/v1/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "X-Idempotency-Key": idempotencyKey,
      },
      body: JSON.stringify(mpRequestBody),
    });

    const body = (await res.json()) as {
      id?: number;
      status?: string;
      status_detail?: string;
      message?: string;
      error?: string;
      cause?: unknown;
      transaction_amount?: number;
      currency_id?: string;
      live_mode?: boolean;
      payment_type_id?: string;
      payment_method_id?: string;
      card?: { last_four_digits?: string; first_six_digits?: string };
    };

    if (!res.ok) {
      console.error(
        "[MP cartão] API recusou a criação do pagamento (HTTP",
        res.status,
        "):",
        body.message ?? body.error,
        "cause:",
        body.cause
      );
      return NextResponse.json(
        {
          error:
            explainMpApiCause(body.cause) ??
            body.message ??
            "Pagamento recusado pela Mercado Pago.",
          statusDetail: body.status_detail,
          mpError: body.error,
          cause: body.cause,
        },
        { status: 502 }
      );
    }

    if (body.status === "rejected" || body.status === "cancelled") {
      console.warn(
        "[MP cartão] PAGAMENTO RECUSADO pelo Mercado Pago/banco:",
        {
          id: body.id,
          status: body.status,
          status_detail: body.status_detail,
          motivo: explainMpStatusDetail(body.status_detail),
          live_mode: body.live_mode,
          dica:
            tokenKind === "TESTE"
              ? "Conta TESTE: use só cartões de teste da documentação do Mercado Pago (ex.: 5031 4332 1540 6351). Cartão real é recusado."
              : tokenKind === "PRODUÇÃO"
                ? "Conta PRODUÇÃO: cartão de teste é recusado. Se o cartão é real, o banco devolveu status_detail acima."
                : "Confira se as chaves TESTE/PRODUÇÃO estão no mesmo ambiente.",
        }
      );
    }

    // Conferência do valor cobrado: garante que o pagamento aprovado
    // foi exatamente pelo preço do plano, em reais (BRL).
    if (body.status === "approved") {
      const charged = Number(body.transaction_amount);
      const amountOk = Number.isFinite(charged) && Math.abs(charged - PLAN_AMOUNT) < 0.005;
      const currencyOk = body.currency_id === "BRL";
      if (!amountOk || !currencyOk) {
        console.error(
          "[MP cartão] Valor cobrado não confere com o plano:",
          { charged, expected: PLAN_AMOUNT, currency: body.currency_id, body }
        );
        return NextResponse.json(
          {
            error: "Valor cobrado não confere com o plano contratado. " +
              "Pagamento será estornado pela Mercado Pago.",
          },
          { status: 502 }
        );
      }
    }

    return NextResponse.json({
      id: body.id,
      status: body.status,
      statusDetail: body.status_detail,
    });
  } catch (error) {
    console.error("[MP cartão] Falha de rede/exceção ao criar pagamento:", error);
    return NextResponse.json(
      { error: "Não foi possível processar o pagamento." },
      { status: 500 }
    );
  }
}