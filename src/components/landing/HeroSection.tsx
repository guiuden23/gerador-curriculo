"use client";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { GradientButton } from "@/components/ui/GradientButton";

export function HeroSection({
  onStart,
  onScrollToExamples,
}: {
  onStart: () => void;
  onScrollToExamples: () => void;
}) {
  return (
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
            <GradientButton size="lg" showArrow onClick={onStart}>
              Criar Meu Currículo
            </GradientButton>
            <button
              type="button"
              onClick={onScrollToExamples}
              className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-zinc-300 px-7 text-base font-semibold text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
            >
              Ver Exemplos
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card size="md" className="shadow-xl shadow-purple-100 dark:shadow-none">
              <div className="mb-3 h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500" />
              <div className="h-3 w-2/3 rounded bg-zinc-200 dark:bg-zinc-700" />
              <div className="mt-2 h-2 w-1/2 rounded bg-zinc-100 dark:bg-zinc-800" />
              <div className="mt-5 space-y-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-2 rounded bg-zinc-100 dark:bg-zinc-800" style={{ width: `${100 - i * 8}%` }} />
                ))}
              </div>
              <div className="mt-5 flex gap-2">
                <Badge variant="tag" className="normal-case tracking-normal">ATS</Badge>
                <Badge variant="tag" className="normal-case tracking-normal text-fuchsia-700 dark:text-fuchsia-300">LinkedIn</Badge>
              </div>
            </Card>

            <Card size="md" className="shadow-xl shadow-purple-100 dark:shadow-none">
              <div className="mb-3 text-[11px] font-bold uppercase tracking-wide text-zinc-400">
                Painel de Resultados
              </div>
              <div className="space-y-3">
                {[
                  { label: "Entrevistas", value: "+68%", width: "78%", color: "bg-emerald-500" },
                  { label: "Respostas", value: "+42%", width: "55%", color: "bg-purple-500" },
                  { label: "ATS Score", value: "92%", width: "92%", color: "bg-fuchsia-500" },
                ].map((bar) => (
                  <div key={bar.label}>
                    <div className="mb-1 flex justify-between text-[10px] text-zinc-500">
                      <span>{bar.label}</span>
                      <span className="font-bold text-emerald-600">{bar.value}</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                      <div className={`h-full rounded-full ${bar.color}`} style={{ width: bar.width }} />
                    </div>
                  </div>
                ))}
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
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
