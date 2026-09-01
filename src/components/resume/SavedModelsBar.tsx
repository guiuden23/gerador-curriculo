"use client";

import { useState } from "react";
import { getTemplate } from "@/lib/templates";
import type { ResumeData } from "@/lib/types";

export function SavedModelsBar({
  currentTemplateId,
  currentData,
  maxModels,
  isDownloading,
  error,
  onDownload,
}: {
  currentTemplateId: string;
  currentData: ResumeData;
  maxModels: number;
  isDownloading: boolean;
  error: string | null;
  onDownload: (data: ResumeData) => void;
}) {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [savedEdition, setSavedEdition] = useState<ResumeData | null>(null);
  const [flash, setFlash] = useState<string | null>(null);

  const atLimit = savedIds.length >= maxModels;
  const limitLabel = Number.isFinite(maxModels) ? `${savedIds.length}/${maxModels}` : `${savedIds.length}`;

  const handleSave = () => {
    let added = false;
    setSavedIds((prev) => {
      if (prev.includes(currentTemplateId) || prev.length >= maxModels) return prev;
      added = true;
      return [...prev, currentTemplateId];
    });
    setSavedEdition({ ...currentData });
    setFlash(added ? "Design e edições salvos!" : "Design já salvo — edições atualizadas!");
  };

  const buildData = (templateId: string): ResumeData => ({
    ...(savedEdition ?? currentData),
    templateId,
  });

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={handleSave}
          disabled={atLimit}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border-2 border-indigo-600 px-6 text-sm font-semibold text-indigo-600 transition-colors hover:bg-indigo-50 disabled:cursor-not-allowed disabled:border-zinc-300 disabled:text-zinc-400 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-950"
        >
          Salvar
        </button>
      </div>

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        Modelos salvos: {limitLabel}
        {atLimit && " — limite atingido"}
      </p>

      {savedIds.length === 0 ? (
        <button
          type="button"
          disabled
          className="inline-flex h-12 w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-zinc-300 px-8 text-sm font-semibold text-zinc-500 dark:bg-zinc-800 dark:text-zinc-600 sm:w-auto"
        >
          Salve um modelo para baixar
        </button>
      ) : (
        <div className="flex flex-wrap justify-center gap-3">
          {savedIds.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => onDownload(buildData(id))}
              disabled={isDownloading}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isDownloading ? "Gerando PDF..." : `Baixar "${getTemplate(id).name}"`}
            </button>
          ))}
        </div>
      )}

      {flash && (
        <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">{flash}</p>
      )}
      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}
