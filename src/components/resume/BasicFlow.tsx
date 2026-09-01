"use client";

import { useRef, useState } from "react";
import { useResume } from "@/hooks/use-resume";
import { getTemplate } from "@/lib/templates";
import { TemplatePicker } from "./TemplatePicker";
import { ResumeForm } from "./ResumeForm";
import { ResumePreview } from "./ResumePreview";
import { SavedModelsBar } from "./SavedModelsBar";
import type { ResumeData } from "@/lib/types";

export function BasicFlow({
  planName,
  maxDownloads,
  onBack,
  isDownloading,
  error,
  onDownload,
}: {
  planName: string;
  maxDownloads: number;
  onBack: () => void;
  isDownloading: boolean;
  error: string | null;
  onDownload: (data: ResumeData) => void;
}) {
  const { data } = useResume();
  const [chosen, setChosen] = useState(false);
  const template = getTemplate(data.templateId);
  const downloadRef = useRef<HTMLDivElement>(null);

  return (
    <div className="mx-auto">
      <button
        type="button"
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        ← Voltar aos planos
      </button>

      <div className="mb-8 text-center">
        <div className="inline-flex flex-wrap items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
            Plano {planName}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            ✓ Design e edição desbloqueados
          </span>
        </div>
        <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
          Escolha o layout e edite seu currículo
        </h1>
        <p className="mx-auto mt-2 max-w-lg text-zinc-600 dark:text-zinc-400">
          {chosen
            ? `Modelo "${template.name}" selecionado — edite seus dados e baixe o PDF quando estiver pronto.`
            : "Selecione um dos 20 modelos profissionais e edite seus dados para baixar."}
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          <TemplatePicker showHeader={false} onSelect={() => setChosen(true)} />
        </div>

        <div>
          <div className="mb-3 text-center text-sm font-medium text-zinc-500 dark:text-zinc-400">
            ✏️ Edite seu currículo — desbloqueado
          </div>
          <ResumeForm
            onComplete={() =>
              downloadRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "center",
              })
            }
          />
        </div>

        <div className="lg:sticky lg:top-8 lg:self-start">
          <div className="mb-3 text-center text-sm font-medium text-zinc-500 dark:text-zinc-400">
            👀 Pré-visualização em tempo real
          </div>
          <ResumePreview />
        </div>
      </div>

      <div ref={downloadRef} className="mt-10">
        <SavedModelsBar
          currentTemplateId={data.templateId}
          currentData={data}
          maxModels={maxDownloads}
          isDownloading={isDownloading}
          error={error}
          onDownload={onDownload}
        />
      </div>
    </div>
  );
}
