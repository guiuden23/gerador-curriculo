"use client";

import { TEMPLATES } from "@/lib/templates";
import type { PlanId } from "@/config/plans";
import { PlanCards } from "@/components/resume/PlanSelector";

export function HomeLanding({
  onStart,
  onSelectPlan,
}: {
  onStart: () => void;
  onSelectPlan: (planId: PlanId) => void;
}) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-purple-800 bg-gradient-to-r from-purple-700 via-purple-600 to-fuchsia-600 backdrop-blur dark:from-purple-800 dark:via-purple-700 dark:to-fuchsia-700">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mx-auto flex cursor-pointer items-center gap-2 md:mx-0"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-sm font-bold text-purple-700">
              CV
            </span>
            <span className="text-lg font-bold tracking-tight text-white">
              eCurrículo <span className="text-white">Digital</span>
            </span>
          </button>

          <nav className="hidden items-center gap-7 text-sm font-bold text-white/90 md:flex">
            <button type="button" onClick={() => scrollTo("como-funciona")} className="cursor-pointer transition-colors hover:text-white">
              Como funciona
            </button>
            <button type="button" onClick={() => scrollTo("exemplos")} className="cursor-pointer transition-colors hover:text-white">
              Exemplos
            </button>
            <button type="button" onClick={() => scrollTo("depoimentos")} className="cursor-pointer transition-colors hover:text-white">
              Depoimentos
            </button>
            <button type="button" onClick={() => scrollTo("planos")} className="cursor-pointer transition-colors hover:text-white">
              Planos
            </button>
          </nav>

          <button
            type="button"
            onClick={onStart}
            className="hidden h-10 cursor-pointer items-center justify-center rounded-xl bg-white px-5 text-sm font-bold text-purple-700 transition-colors hover:bg-purple-50 md:inline-flex"
          >
            Criar Meu Currículo
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 dark:from-purple-950/40 dark:via-zinc-950 dark:to-zinc-950" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:py-20 lg:grid-cols-2">
          <div>
              <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Conquiste mais entrevistas com um currículo profissional
              </h1>
              <p className="mt-5 max-w-xl text-base text-zinc-600 dark:text-zinc-300 sm:text-lg">
              Crie currículos modernos, profissionais e otimizados para ATS,
              destacando suas competências e experiências para chamar a
              atenção dos recrutadores.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onStart}
                className="group inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-8 text-base font-bold text-white shadow-lg shadow-purple-500/25 transition-all hover:from-purple-700 hover:to-fuchsia-700 active:scale-[0.98]"
              >
                Criar Meu Currículo
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </button>
              <button
                type="button"
                onClick={() => scrollTo("exemplos")}
                className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-zinc-300 px-7 text-base font-semibold text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
              >
                Ver Exemplos
              </button>
            </div>

          </div>

          {/* Visual: dashboard + currículo */}
          <div className="relative">
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Faux currículo */}
              <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-xl shadow-purple-100 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-none">
                <div className="mb-3 h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500" />
                <div className="h-3 w-2/3 rounded bg-zinc-200 dark:bg-zinc-700" />
                <div className="mt-2 h-2 w-1/2 rounded bg-zinc-100 dark:bg-zinc-800" />
                <div className="mt-5 space-y-2">
                  <div className="h-2 w-full rounded bg-zinc-100 dark:bg-zinc-800" />
                  <div className="h-2 w-full rounded bg-zinc-100 dark:bg-zinc-800" />
                  <div className="h-2 w-4/5 rounded bg-zinc-100 dark:bg-zinc-800" />
                  <div className="h-2 w-full rounded bg-zinc-100 dark:bg-zinc-800" />
                  <div className="h-2 w-3/5 rounded bg-zinc-100 dark:bg-zinc-800" />
                </div>
                <div className="mt-5 flex gap-2">
                  <span className="rounded-full bg-purple-100 px-2.5 py-1 text-[10px] font-semibold text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                    ATS
                  </span>
                  <span className="rounded-full bg-fuchsia-100 px-2.5 py-1 text-[10px] font-semibold text-fuchsia-700 dark:bg-fuchsia-950 dark:text-fuchsia-300">
                    LinkedIn
                  </span>
                </div>
              </div>

              {/* Faux dashboard estilo Power BI */}
              <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-xl shadow-purple-100 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-none">
                <div className="mb-3 text-[11px] font-bold uppercase tracking-wide text-zinc-400">
                  Painel de Resultados
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="mb-1 flex justify-between text-[10px] text-zinc-500">
                      <span>Entrevistas</span>
                      <span className="font-bold text-emerald-600">+68%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                      <div className="h-full w-[78%] rounded-full bg-emerald-500" />
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 flex justify-between text-[10px] text-zinc-500">
                      <span>Respostas</span>
                      <span className="font-bold text-purple-600">+42%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                      <div className="h-full w-[55%] rounded-full bg-purple-500" />
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 flex justify-between text-[10px] text-zinc-500">
                      <span>ATS Score</span>
                      <span className="font-bold text-fuchsia-600">92%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                      <div className="h-full w-[92%] rounded-full bg-fuchsia-500" />
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-end gap-1.5">
                  {[40, 65, 50, 80, 70, 95].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t bg-gradient-to-t from-purple-500 to-fuchsia-400"
                      style={{ height: `${h * 0.5}px` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="border-t border-zinc-100 bg-zinc-50 py-16 dark:border-zinc-900 dark:bg-zinc-900/40">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center text-3xl font-bold tracking-tight">Como funciona</h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-zinc-600 dark:text-zinc-400">
            Em 4 passos simples você tem um currículo profissional pronto para enviar.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "1", t: "Escolha o plano ideal", d: "Selecione o plano que cabe no seu bolso." },
              { n: "2", t: "Realize o pagamento", d: "Pagamento único, seguro e sem mensalidade." },
              { n: "3", t: "Preencha suas informações", d: "Informe seus dados profissionais no editor." },
              { n: "4", t: "Gere e baixe os documentos", d: "Baixe seu currículo em PDF na hora." },
            ].map((s) => (
              <div
                key={s.n}
                className="rounded-2xl border border-zinc-200 bg-white p-6 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-lg font-bold text-white">
                  {s.n}
                </div>
                <h3 className="mt-4 font-bold">{s.t}</h3>
                <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center text-3xl font-bold tracking-tight">Benefícios</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {[
              "Modelos profissionais modernos",
              "Download em PDF",
              "Processo rápido e intuitivo",
              "Maior chance de conseguir entrevistas",
            ].map((b) => (
              <div
                key={b}
                className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-5 text-lg font-semibold shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                  ✓
                </span>
                {b}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXEMPLOS DE CURRÍCULOS */}
      <section id="exemplos" className="border-t border-zinc-100 bg-zinc-50 py-16 dark:border-zinc-900 dark:bg-zinc-900/40">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">Exemplos de currículos</h2>
            <p className="mx-auto mt-3 max-w-xl text-zinc-600 dark:text-zinc-400">
              Modelos profissionais aprovados por recrutadores. Escolha o estilo que combina com você.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {TEMPLATES.map((t) => (
              <div
                key={t.id}
                className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-transform hover:-translate-y-1 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="relative h-56 overflow-hidden bg-zinc-50 p-3 dark:bg-zinc-800/40">
                  <div className="flex h-full gap-2.5">
                    {/* sidebar */}
                    <div
                      className="flex w-1/3 flex-col gap-1.5 rounded-l p-2"
                      style={{ background: t.palette.headerBg }}
                    >
                      <div className="h-7 w-7 rounded-full" style={{ background: t.palette.headerAccent }} />
                      <div className="h-1.5 w-3/4 rounded-full bg-white/80" />
                      <div className="h-1 w-1/2 rounded-full bg-white/50" />
                      <div className="mt-1 space-y-1">
                        <div className="h-1 w-full rounded-full bg-white/40" />
                        <div className="h-1 w-5/6 rounded-full bg-white/40" />
                        <div className="h-1 w-2/3 rounded-full bg-white/40" />
                      </div>
                    </div>
                    {/* corpo */}
                    <div className="flex flex-1 flex-col gap-2">
                      <div className="h-2 w-1/2 rounded-full" style={{ background: t.palette.accent }} />
                      <div className="h-1.5 w-full rounded-full bg-zinc-200 dark:bg-zinc-700" />
                      <div className="h-1.5 w-11/12 rounded-full bg-zinc-200 dark:bg-zinc-700" />
                      <div className="h-1.5 w-4/5 rounded-full bg-zinc-200 dark:bg-zinc-700" />
                      <div className="mt-1 h-2 w-2/5 rounded-full" style={{ background: t.palette.accent }} />
                      <div className="h-1.5 w-full rounded-full bg-zinc-200 dark:bg-zinc-700" />
                      <div className="h-1.5 w-10/12 rounded-full bg-zinc-200 dark:bg-zinc-700" />
                      <div className="h-1.5 w-3/4 rounded-full bg-zinc-200 dark:bg-zinc-700" />
                    </div>
                  </div>
                </div>
                <div className="p-3 text-center text-sm font-semibold">{t.name}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={onStart}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-purple-600 px-8 text-sm font-bold text-white transition-colors hover:bg-purple-700"
            >
              Ver Todos os Modelos
            </button>
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section id="depoimentos" className="py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center text-3xl font-bold tracking-tight">Resultados e depoimentos</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {[
              "Consegui diversas entrevistas após atualizar meu currículo.",
              "Meu currículo ficou muito mais profissional.",
              "Excelente investimento para quem quer recolocação.",
              "Fácil de usar e resultado incrível.",
            ].map((text, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="absolute -right-2 -top-4 select-none text-7xl font-black text-purple-100 dark:text-purple-900/40">
                  ”
                </div>
                <div className="relative">
                  <div className="flex gap-0.5 text-amber-400">
                    {[0, 1, 2, 3, 4].map((s) => (
                      <svg key={s} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                        <path d="M12 2l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.8 6.1 20.8l1.2-6.6L2.5 9l6.6-.9z" />
                      </svg>
                    ))}
                  </div>
                  <p className="mt-4 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-200">
                    “{text}”
                  </p>
                  <div className="mt-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 text-sm font-bold text-white">
                      CV
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Cliente verificado</div>
                      <div className="text-xs text-zinc-400 dark:text-zinc-500">
                        eCurrículo Digital
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARAÇÃO */}
      <section className="border-t border-zinc-100 bg-zinc-50 py-16 dark:border-zinc-900 dark:bg-zinc-900/40">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-center text-3xl font-bold tracking-tight">O que muda com o serviço</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-center text-lg font-bold text-zinc-500">Sem o serviço</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-zinc-600 dark:text-zinc-300">
                {["Currículo comum", "Visual ultrapassado", "Sem otimização ATS", "Menor taxa de resposta", "Processo totalmente manual"].map(
                  (i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-0.5 text-red-400">✕</span>
                      {i}
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 to-fuchsia-600 p-6 text-white shadow-xl shadow-purple-300/50 dark:shadow-purple-900/40">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10" />
              <div className="absolute -bottom-12 -left-8 h-32 w-32 rounded-full bg-fuchsia-300/20" />
              <div className="relative">
                <div className="mb-4 flex justify-center">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wide">
                    ✨ Recomendado
                  </span>
                </div>
                <h3 className="text-center text-lg font-extrabold">Com o serviço</h3>
                <ul className="mt-4 space-y-3 text-sm font-medium">
                  {["Currículo profissional", "Design moderno", "Mais entrevistas", "IA especializada"].map((i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/25 text-xs font-bold">
                        ✓
                      </span>
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PLANOS */}
      <section id="planos" className="py-16">
        <div className="mx-auto max-w-3xl px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">Planos</h2>
            <p className="mx-auto mt-3 max-w-xl text-zinc-600 dark:text-zinc-400">
              Pagamento único, sem mensalidade. Acesso liberado na hora.
            </p>
          </div>

          <div className="mt-10">
            <PlanCards onSelect={onSelectPlan} />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-200 bg-zinc-50 py-8 dark:border-zinc-800 dark:bg-zinc-900/40">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 text-sm text-zinc-500 sm:flex-row dark:text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-700 text-xs font-bold text-white">
              CV
            </span>
            <span className="font-bold text-zinc-700 dark:text-zinc-200">
              eCurrículo <span className="text-purple-600 dark:text-purple-400">Digital</span>
            </span>
          </div>
          <p>© {new Date().getFullYear()} eCurrículo Digital. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
