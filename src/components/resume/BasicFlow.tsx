"use client";

import { useRef, useState } from "react";
import { useResume } from "@/hooks/use-resume";
import { getTemplate } from "@/lib/templates";
import { Badge } from "@/components/ui/Badge";
import { FlowPageLayout } from "@/components/layout/FlowPageLayout";
import { FlowPageHeader } from "@/components/layout/FlowPageHeader";
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
    <FlowPageLayout
      backLabel="Voltar aos planos"
      onBack={onBack}
      maxWidth="max-w-none"
      header={
        <FlowPageHeader
          badges={
            <>
              <Badge variant="plan">Plano {planName}</Badge>
              <Badge variant="success">✓ Design e edição desbloqueados</Badge>
            </>
          }
          title="Escolha o layout e edite seu currículo"
          description={
            chosen
              ? `Modelo "${template.name}" selecionado — edite seus dados e baixe o PDF quando estiver pronto.`
              : "Selecione um dos 20 modelos profissionais e edite seus dados para baixar."
          }
        />
      }
    >
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
    </FlowPageLayout>
  );
}
