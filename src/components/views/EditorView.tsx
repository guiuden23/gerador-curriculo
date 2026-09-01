"use client";

import dynamic from "next/dynamic";
import { getPlan } from "@/config/plans";
import { useAppFlow } from "@/hooks/use-app-flow";
import { usePdfDownload } from "@/hooks/use-pdf-download";
import { BackButton } from "@/components/layout/BackButton";
import { AlertBanner } from "@/components/ui/AlertBanner";

const BasicFlow = dynamic(
  () => import("@/components/resume/BasicFlow").then((m) => m.BasicFlow),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto max-w-4xl animate-pulse space-y-6 p-8">
        <div className="h-8 w-1/3 rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="h-64 rounded bg-zinc-100 dark:bg-zinc-800" />
          <div className="h-64 rounded bg-zinc-100 dark:bg-zinc-800" />
          <div className="h-64 rounded bg-zinc-100 dark:bg-zinc-800" />
        </div>
      </div>
    ),
  }
);

export function EditorView() {
  const { selectedPlanId, canAccessEditor, goTo } = useAppFlow();
  const { isDownloading, error, download } = usePdfDownload();

  if (!selectedPlanId || !canAccessEditor) {
    return (
      <div className="mx-auto max-w-md text-center">
        <AlertBanner variant="warning">
          Complete o pagamento para acessar o editor.
        </AlertBanner>
        <div className="mt-6">
          <BackButton onClick={() => goTo("plans")} label="Ver planos" />
        </div>
      </div>
    );
  }

  const plan = getPlan(selectedPlanId);

  return (
    <BasicFlow
      planName={plan?.name ?? "Básico"}
      maxDownloads={plan?.maxDownloads ?? 2}
      onBack={() => goTo("plans")}
      isDownloading={isDownloading}
      error={error}
      onDownload={download}
    />
  );
}
