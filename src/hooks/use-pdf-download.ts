"use client";

import { useCallback, useState } from "react";
import { saveResumeData } from "@/lib/storage/resume-storage";
import { downloadBlob, generatePdfBlob, sanitizeFilename } from "@/lib/pdf";
import { getTemplate } from "@/lib/templates";
import type { ResumeData } from "@/lib/types";

export function usePdfDownload() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const download = useCallback(async (data: ResumeData) => {
    if (isDownloading) return;
    setIsDownloading(true);
    setError(null);

    try {
      const blob = await generatePdfBlob(data);
      saveResumeData(data);
      downloadBlob(blob, sanitizeFilename(data.fullName, getTemplate(data.templateId).name));
    } catch {
      setError(
        "Não foi possível gerar o PDF neste navegador. Tente novamente com outro navegador."
      );
    } finally {
      setIsDownloading(false);
    }
  }, [isDownloading]);

  return { isDownloading, error, download, setError };
}
