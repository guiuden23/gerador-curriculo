/** Traduz o status_detail do Mercado Pago para o motivo da recusa. */
const STATUS_DETAIL_PT: Record<string, string> = {
  cc_rejected_bad_filled_card_number: "Número do cartão inválido.",
  cc_rejected_bad_filled_date: "Data de validade inválida.",
  cc_rejected_bad_filled_other: "Dados do cartão inválidos.",
  cc_rejected_bad_filled_security_code: "CVV inválido.",
  cc_rejected_blacklist: "Cartão na lista negra do Mercado Pago.",
  cc_rejected_call_for_authorize: "O banco pede autorização (ligar para o emissor).",
  cc_rejected_card_disabled: "Cartão desabilitado / não habilitado para compras online.",
  cc_rejected_card_error: "Erro no cartão (emissor recusou).",
  cc_rejected_duplicated_payment: "Pagamento duplicado (mesma compra recente).",
  cc_rejected_high_risk: "Recusado por risco (antifraude do Mercado Pago).",
  cc_rejected_insufficient_amount: "Saldo ou limite insuficiente.",
  cc_rejected_invalid_installments: "Número de parcelas inválido para este cartão.",
  cc_rejected_max_attempts: "Máximo de tentativas excedido.",
  cc_rejected_other_reason:
    "Recusado pelo banco (motivo genérico). Cartão real em conta TESTE, ou cartão de teste em conta PRODUÇÃO, costuma cair aqui.",
  rejected_high_risk: "Recusado por risco (antifraude).",
  rejected_insufficient_data: "Dados insuficientes para processar.",
  rejected_by_bank: "Recusado pelo banco emissor.",
  rejected_by_regulations: "Recusado por regulamentação.",
  cc_amount_rate_limit_exceeded: "Limite de tentativas/valor excedido.",
  pending_contingency: "Pendente (contingência do Mercado Pago).",
  pending_review_manual: "Pendente de revisão manual.",
  accredited: "Aprovado.",
};

export function explainMpStatusDetail(statusDetail?: string | null): string {
  if (!statusDetail) return "(sem status_detail)";
  return STATUS_DETAIL_PT[statusDetail] ?? `Código não mapeado: ${statusDetail}`;
}

export function mpCredentialKind(value?: string | null): string {
  if (!value) return "AUSENTE";
  if (value.startsWith("TEST-")) return "TESTE";
  if (value.startsWith("APP_USR-")) return "PRODUÇÃO";
  return `OUTRO (prefixo: ${value.slice(0, 8)})`;
}

/** Traduz códigos de cause[] da API de pagamentos (erros HTTP 4xx). */
export function explainMpApiCause(cause: unknown): string | undefined {
  if (!Array.isArray(cause) || cause.length === 0) return undefined;
  const first = cause[0] as { code?: number; description?: string };
  const byCode: Record<number, string> = {
    10111:
      "A conta Mercado Pago recusou o emissor do cartão (não é erro do app). Com cartão de teste correto, isso indica que a conta vendedor ainda não está habilitada para cartão — complete endereço/dados no painel MP ou teste via Pix.",
    10113:
      "Cartão bloqueado por regra da conta Mercado Pago. Complete endereço/dados de cobrança no painel MP e habilite pagamentos com cartão. Pix costuma funcionar mesmo nesse cenário.",
    2006:
      "Token do cartão não encontrado — a public key e o access token precisam ser do mesmo ambiente (ambos TEST ou ambos PRODUÇÃO).",
  };
  if (first.code != null && byCode[first.code]) return byCode[first.code];
  return first.description;
}
