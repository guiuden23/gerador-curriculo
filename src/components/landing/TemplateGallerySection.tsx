"use client";

import { TEMPLATES } from "@/lib/templates";
import { GradientButton } from "@/components/ui/GradientButton";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { TemplateMiniMock } from "@/components/resume/TemplateMiniMock";

export function TemplateGallerySection({ onStart }: { onStart: () => void }) {
  return (
    <section id="exemplos" className="border-t border-zinc-100 bg-zinc-50 py-16 dark:border-zinc-900 dark:bg-zinc-900/40">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle
          title="Exemplos de currículos"
          subtitle="Modelos profissionais aprovados por recrutadores. Escolha o estilo que combina com você."
        />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {TEMPLATES.map((template) => (
            <div
              key={template.id}
              className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-transform hover:-translate-y-1 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="relative h-56 overflow-hidden bg-zinc-50 p-3 dark:bg-zinc-800/40">
                <TemplateMiniMock template={template} />
              </div>
              <div className="p-3 text-center text-sm font-semibold">{template.name}</div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <GradientButton size="lg" onClick={onStart}>
            Ver Todos os Modelos
          </GradientButton>
        </div>
      </div>
    </section>
  );
}
