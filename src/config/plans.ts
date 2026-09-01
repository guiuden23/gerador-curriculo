import { SITE } from "./site";

export type PaymentGateway = "mercadopago" | "stripe" | "pix";

export interface PlanFeature {
  text: string;
  highlighted?: boolean;
}

export interface Plan {
  id: string;
  name: string;
  amount: number;
  currency: typeof SITE.currency;
  reference: string;
  description: string;
  highlight?: boolean;
  badge?: string;
  maxDownloads: number;
  features: PlanFeature[];
  paymentGateway: PaymentGateway;
  /** Exibir no PlanSelector e na landing */
  showInSelector: boolean;
  /** Rota de sucesso (Stripe e upsells) */
  successPath?: string;
}

export const PLANS = [
  {
    id: "resume",
    name: "Básico",
    amount: 19.99,
    currency: "BRL",
    reference: "curriculo-plus-basico",
    description: `${SITE.name} — Plano Básico`,
    highlight: true,
    badge: "Pagamento único — sem assinatura",
    maxDownloads: 2,
    features: [
      { text: "Currículo pronto para enviar às empresas" },
      { text: "Modelos profissionais aprovados por recrutadores" },
      { text: "Escolha entre 20 layouts modernos" },
      {
        text: "Baixe até 2 modelos de currículo à sua escolha",
        highlighted: true,
      },
      { text: "Visualização completa liberada após pagamento" },
      { text: "Download imediato em PDF" },
      { text: "Sem mensalidade" },
      { text: "Acesso instantâneo" },
    ],
    paymentGateway: "mercadopago",
    showInSelector: true,
    successPath: "/success",
  },
  {
    id: "resume-premium",
    name: "Premium",
    amount: 24.99,
    currency: "BRL",
    reference: "curriculo-plus-premium",
    description: `${SITE.name} — Plano Premium`,
    highlight: false,
    badge: "Currículo + correção por IA",
    maxDownloads: 2,
    features: [
      { text: "Tudo do plano Básico" },
      { text: "Revisão profissional do conteúdo por IA", highlighted: true },
      { text: "Sugestões de melhoria para ATS" },
    ],
    paymentGateway: "stripe",
    showInSelector: false,
    successPath: "/success",
  },
  {
    id: "cover-letter",
    name: "Carta de Apresentação",
    amount: 9.9,
    currency: "BRL",
    reference: "curriculo-cover-letter",
    description: `${SITE.name} — Carta de Apresentação`,
    highlight: false,
    badge: "Upsell — complemento ao currículo",
    maxDownloads: 1,
    features: [
      { text: "Carta personalizada com base no seu perfil" },
      { text: "Gerada por IA em segundos", highlighted: true },
    ],
    paymentGateway: "stripe",
    showInSelector: false,
    successPath: "/cover-letter",
  },
] as const satisfies readonly Plan[];

export type PlanId = (typeof PLANS)[number]["id"];

const planMap = new Map<string, Plan>(
  PLANS.map((plan) => [plan.id, plan as Plan])
);

export function getPlan(id: string): Plan | undefined {
  return planMap.get(id);
}

export function getSelectorPlans(): Plan[] {
  return PLANS.filter((plan) => plan.showInSelector) as Plan[];
}

export function isPlanId(id: string): id is PlanId {
  return planMap.has(id);
}

export function formatPlanPrice(amount: number): string {
  return amount.toLocaleString("pt-BR", {
    style: "currency",
    currency: SITE.currency,
  });
}

export function formatPlanPriceParts(amount: number): {
  currency: string;
  integer: string;
  fraction: string;
} {
  const [integer, fraction = "00"] = amount.toFixed(2).split(".");
  return { currency: "R$", integer, fraction };
}

export function planAmountInCents(amount: number): number {
  return Math.round(amount * 100);
}
