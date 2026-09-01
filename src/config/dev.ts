/** Libera o editor sem pagamento real — só para testes locais/staging. */
export const SKIP_PAYMENT_GATE =
  process.env.NEXT_PUBLIC_SKIP_PAYMENT_GATE === "true" ||
  process.env.NEXT_PUBLIC_SKIP_PAYMENT_GATE === "1";
