# eCurrículo Digital — Gerador de Currículos

Web app (PWA) que gera currículos profissionais em PDF a partir de um formulário guiado, com **20 modelos de design** à escolha.

## Planos e pagamentos

| Plano | Preço | Gateway | Inclui |
| --- | --- | --- | --- |
| **Básico** | R$ 19,99 | Mercado Pago | Currículo em PDF (até 2 modelos) |
| **Premium** | R$ 24,99 | Stripe | PDF + correção por IA (legado) |
| **Carta de apresentação** | R$ 9,90 | Stripe | Upsell — carta por IA |

> Para adicionar ou alterar planos, edite [`src/config/plans.ts`](src/config/plans.ts). O `PlanSelector` e as APIs de pagamento leem os valores desse arquivo automaticamente.

## Arquitetura

```
src/
├── app/              # Rotas Next.js (pages + API)
├── components/       # UI (landing, payment, resume, layout, views)
├── config/           # Planos e configuração do site
├── contexts/         # Resume, fluxo da app e pagamento
├── hooks/            # useResume, useAppFlow, usePayment, usePdfDownload
├── lib/              # PDF, templates, integrações MP/PIX
└── providers/        # AppProviders (compõe todos os contexts)
```

## Funcionalidades

- Formulário multi-etapas: contato, experiências, formação e habilidades
- **20 modelos de design** com preview em tempo real (A4)
- Geração de PDF no cliente (`@react-pdf/renderer`) — dados não vão ao servidor
- Pagamento via Mercado Pago Bricks (cartão) no fluxo principal
- Stripe para upsell de carta de apresentação e plano Premium
- Rotas PIX legadas mantidas para compatibilidade
- PWA instalável + proxy corporativo para SDK do Mercado Pago

## Configuração

### 1. Instalar dependências

```bash
yarn install
```

### 2. Variáveis de ambiente

Copie `.env.example` para `.env.local`:

| Variável | Descrição |
| --- | --- |
| `NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY` | Chave pública MP (mesma aplicação do access token) |
| `MERCADOPAGO_ACCESS_TOKEN` | Access token MP |
| `STRIPE_SECRET_KEY` | Chave secreta Stripe (upsell / Premium) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Chave pública Stripe |
| `NEXT_PUBLIC_APP_URL` | URL do app (ex.: `http://localhost:3000`) |
| `OPENAI_API_KEY` | Opcional — carta de apresentação e correção IA |

### 3. Desenvolvimento

```bash
yarn dev
```

## Como adicionar um novo plano

1. Abra [`src/config/plans.ts`](src/config/plans.ts)
2. Adicione um objeto ao array `PLANS`:

```typescript
{
  id: "premium",
  name: "Premium",
  amount: 24.99,
  currency: "BRL",
  reference: "curriculo-plus-premium",
  description: "eCurrículo Digital — Plano Premium",
  highlight: false,
  badge: "Currículo + IA",
  maxDownloads: 2,
  features: [
    { text: "Tudo do Básico" },
    { text: "Correção por IA", highlighted: true },
  ],
  paymentGateway: "mercadopago", // ou "stripe" | "pix"
  showInSelector: true,
  successPath: "/success",
}
```

3. O card aparece automaticamente no `PlanSelector` quando `showInSelector: true`
4. O valor é aplicado na UI, no Brick e na API `/api/mercadopago/pay` (servidor ignora amount do cliente)

## Fluxo do usuário

1. Landing → escolhe plano
2. Pagamento (Mercado Pago)
3. Editor desbloqueado após confirmação (gate em `sessionStorage`)
4. Escolhe layout, edita dados, baixa até 2 PDFs
5. Upsell opcional: carta de apresentação via Stripe em `/cover-letter`

## Stack

- Next.js 16 (App Router, TypeScript)
- Tailwind CSS v4
- @react-pdf/renderer
- Mercado Pago SDK + Stripe
- React Context + hooks customizados
