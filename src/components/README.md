# Estrutura de componentes

## Layout (`components/layout/`)

| Componente | Uso |
|------------|-----|
| `BrandLogo` | Logo único — header, footer, landing |
| `AppHeader` | Header do fluxo interno (pós-landing) |
| `StaticPageShell` | Páginas standalone (`/success`, `/cover-letter`) |
| `PageShell` | Wrapper landing → planos → pagamento → editor |
| `FlowPageLayout` | Shell de telas de fluxo (voltar + conteúdo) |
| `FlowPageHeader` | Título + badges + descrição centralizados |
| `BackButton` | Voltar (`outline` ou `ghost`) |

## UI (`components/ui/`)

| Componente | Uso |
|------------|-----|
| `Badge` | Planos, status, tags |
| `Card` | Containers com borda/sombra |
| `AlertBanner` | Sucesso, erro, aviso, info |
| `SectionTitle` | Títulos de seção da landing |
| `GradientButton` | CTAs principais (roxo → fuchsia) |
| `PlanPrice` | Preço inline ou hero |
| `Button`, `Field`, `SkillsInput` | Formulários |
| `icons.tsx` | SVGs reutilizáveis |

## Landing (`components/landing/`)

Cada seção em arquivo próprio + `content.ts` com dados estáticos:

- `LandingHeader`, `HeroSection`, `HowItWorksSection`
- `BenefitsSection`, `TemplateGallerySection`, `TestimonialsSection`
- `ComparisonSection`, `PlansSection`, `LandingFooter`
- `HomeLanding.tsx` — orquestrador (~35 linhas)

## Resume (`components/resume/`)

- `TemplateMiniMock` — preview compartilhado (picker + galeria)
- `PlanCard`, `PlanFeatureList`, `PlanSelector` — planos via `config/plans.ts`

## Views (`components/views/`)

- `PlansView`, `PaymentViewWrapper`, `EditorView` — composição da home

## Config (`config/`)

- `plans.ts` — adicionar plano = editar array `PLANS`
- `site.ts` — branding global
