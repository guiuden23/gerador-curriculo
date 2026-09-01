"use client";

import { useCallback, useEffect, useState } from "react";
import { getPlan, type PlanId } from "@/config/plans";
import { SKIP_PAYMENT_GATE } from "@/config/dev";
import { useResume } from "@/hooks/use-resume";
import { usePayment } from "@/hooks/use-payment";
import { Field } from "@/components/ui/Field";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { AlertBanner } from "@/components/ui/AlertBanner";
import { PlanPrice } from "@/components/ui/PlanPrice";
import { Button } from "@/components/ui/Button";
import { FlowPageLayout } from "@/components/layout/FlowPageLayout";
import { FlowPageHeader } from "@/components/layout/FlowPageHeader";
import { isValidPayerEmail } from "@/lib/mp-payer";
import { explainMpStatusDetail } from "@/lib/mp-status-detail";
import { PaymentStatusScreen } from "./PaymentStatusScreen";
import { PaymentBrick } from "./PaymentBrick";

type Status = "paying" | "waiting" | "approved" | "rejected" | "error";

const CARD_METHODS = { creditCard: "all" as const, debitCard: "all" as const };

export function PaymentView({
  planId,
  onBack,
  onSuccess,
}: {
  planId: PlanId;
  onBack: () => void;
  onSuccess: () => void;
}) {
  const plan = getPlan(planId);
  const { data, update } = useResume();
  const { markApproved } = usePayment();
  const [status, setStatus] = useState<Status>("paying");
  const [paymentId, setPaymentId] = useState<number | null>(null);
  const [errorReason, setErrorReason] = useState<"sdk" | "brick">("brick");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [payerEmail, setPayerEmail] = useState(() => data?.email?.trim() ?? "");
  const emailOk = isValidPayerEmail(payerEmail);

  if (!plan) {
    return (
      <FlowPageLayout maxWidth="max-w-md">
        <AlertBanner variant="error">Plano inválido.</AlertBanner>
        <Button variant="ghost" onClick={onBack} className="mt-4">
          Voltar
        </Button>
      </FlowPageLayout>
    );
  }

  const reset = () => {
    setPaymentId(null);
    setStatus("paying");
    setErrorMessage(null);
    setErrorReason("brick");
  };

  const handleApproved = (id: number) => {
    markApproved(planId, id);
    setStatus("approved");
    setTimeout(() => onSuccess(), 2500);
  };

  const handleCreated = ({
    paymentId: id,
    status: createStatus,
    statusDetail,
  }: {
    paymentId: number;
    status: string;
    statusDetail?: string;
  }) => {
    setPaymentId(id);
    if (createStatus === "approved") {
      handleApproved(id);
    } else if (createStatus === "rejected" || createStatus === "cancelled") {
      console.warn("[MP cartão] Tela: pagamento recusado.", {
        id,
        createStatus,
        statusDetail,
        motivo: explainMpStatusDetail(statusDetail),
      });
      setStatus("rejected");
    } else {
      setStatus("waiting");
    }
  };

  const handleStatusChange = (nextStatus: string, statusDetail?: string) => {
    if (nextStatus === "approved" && paymentId) {
      handleApproved(paymentId);
    } else {
      console.warn("[MP cartão] Tela: polling marcou recusado.", {
        nextStatus,
        statusDetail,
        motivo: explainMpStatusDetail(statusDetail),
      });
      setStatus("rejected");
    }
  };

  const handleBrickError = (reason: "sdk" | "brick", message?: string) => {
    console.error("[MP cartão] PaymentView.handleBrickError:", { reason, message });
    setErrorReason(reason);
    setErrorMessage(message ?? null);
    setStatus("error");
  };

  const skipToEditor = useCallback(() => {
    markApproved(planId, 0);
    onSuccess();
  }, [markApproved, onSuccess, planId]);

  useEffect(() => {
    if (!SKIP_PAYMENT_GATE) return;
    if (status !== "error" && status !== "rejected") return;
    const timer = setTimeout(skipToEditor, 1200);
    return () => clearTimeout(timer);
  }, [status, skipToEditor]);

  const devSkipButton = SKIP_PAYMENT_GATE ? (
    <Button variant="ghost" onClick={skipToEditor} className="mt-4 w-full border border-dashed border-amber-500/60 text-amber-800 dark:text-amber-300">
      Pular pagamento (modo teste) → testar editor e PDF
    </Button>
  ) : null;

  return (
    <FlowPageLayout
      backLabel="Voltar aos planos"
      onBack={onBack}
      header={
        <FlowPageHeader
          badges={<Badge variant="plan">Plano {plan.name}</Badge>}
          title={status === "approved" ? "Pagamento aprovado" : "Pagamento"}
          description={
            <>
              Pagamento único de <PlanPrice amount={plan.amount} variant="inline" /> para
              liberar seu currículo.
            </>
          }
        />
      }
    >
      {status === "paying" && paymentId === null && (
        <Card className="mx-auto max-w-md">
          <Field
            label="E-mail do titular"
            type="email"
            autoComplete="email"
            required
            placeholder="seuemail@gmail.com"
            hint="Use o e-mail real do dono do cartão. E-mail genérico é recusado pelo antifraude."
            value={payerEmail}
            onChange={(e) => {
              const next = e.target.value;
              setPayerEmail(next);
              update("email", next.trim());
            }}
          />
          {emailOk ? (
            <div className="mt-5">
              <PaymentBrick
                planId={planId}
                amount={plan.amount}
                payerEmail={payerEmail.trim()}
                paymentMethods={CARD_METHODS}
                onCreated={handleCreated}
                onError={handleBrickError}
              />
            </div>
          ) : (
            <AlertBanner variant="info" className="mt-4 text-left">
              Informe um e-mail válido para liberar o formulário de cartão.
            </AlertBanner>
          )}
          {devSkipButton}
        </Card>
      )}

      {status === "waiting" && paymentId && (
        <Card className="mx-auto max-w-md">
          <AlertBanner variant="warning" pulse className="mb-4">
            Aguardando confirmação do pagamento...
          </AlertBanner>
          <PaymentStatusScreen
            paymentId={paymentId}
            onStatusChange={handleStatusChange}
            onError={(message) => {
              setErrorReason("brick");
              setErrorMessage(message ?? null);
              setStatus("error");
            }}
          />
          {devSkipButton}
        </Card>
      )}

      {status === "rejected" && (
        <div className="mx-auto max-w-md">
          <AlertBanner variant="error" className="mb-4">
            Pagamento não aprovado. Tente novamente.
            {SKIP_PAYMENT_GATE && (
              <span className="mt-2 block text-sm">
                Modo teste ativo — redirecionando para o editor em instantes…
              </span>
            )}
          </AlertBanner>
          <Button onClick={reset} className="w-full">
            Tentar novamente
          </Button>
          {devSkipButton}
        </div>
      )}

      {status === "approved" && (
        <AlertBanner variant="success" className="mx-auto max-w-md rounded-2xl px-6 py-5">
          <p className="text-lg font-bold">
            Pagamento confirmado com sucesso! Agora você pode editar seu currículo e
            utilizar todos os designs disponíveis.
          </p>
          <p className="mt-1 text-sm opacity-90">
            Redirecionando para a edição do currículo...
          </p>
        </AlertBanner>
      )}

      {status === "error" && (
        <div className="mx-auto max-w-md">
          <AlertBanner variant="error" title="Não foi possível processar o pagamento" className="rounded-2xl px-6 py-5">
            {errorReason === "sdk"
              ? "O SDK do Mercado Pago não carregou (verifique a conexão ou bloqueios de rede)."
              : errorMessage
                ? errorMessage
                : "Ocorreu um erro ao processar o pagamento. Tente novamente em instantes."}
            {SKIP_PAYMENT_GATE && (
              <p className="mt-3 text-sm font-normal opacity-90">
                Modo teste ativo — redirecionando para o editor em instantes…
              </p>
            )}
          </AlertBanner>
          <Button onClick={reset} className="mt-4 w-full">
            Tentar novamente
          </Button>
          {devSkipButton}
        </div>
      )}
    </FlowPageLayout>
  );
}
