"use client";

import { useRef } from "react";
import { useResume } from "@/hooks/use-resume";
import { TEMPLATES, type TemplateConfig } from "@/lib/templates";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icons";
import { TemplateMiniMock } from "./TemplateMiniMock";

function TemplateCard({
  t,
  selected,
  onSelect,
}: {
  t: TemplateConfig;
  selected: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(t.id)}
      aria-pressed={selected}
      title={t.description}
      className={`group w-[110px] shrink-0 cursor-pointer snap-start rounded-xl p-1.5 text-left transition-all sm:w-[150px] ${
        selected
          ? "bg-purple-800 ring-2 ring-purple-800 ring-offset-2 ring-offset-zinc-50 dark:ring-offset-zinc-950"
          : "hover:bg-zinc-200/70 dark:hover:bg-zinc-800"
      }`}
    >
      <TemplateMiniMock template={t} />
      <span
        className={`mt-1.5 block truncate text-center text-[11px] font-semibold ${
          selected ? "text-white" : "text-zinc-600 dark:text-zinc-300"
        }`}
      >
        {t.name}
      </span>
    </button>
  );
}

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Modelos anteriores" : "Próximos modelos"}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-300 text-zinc-600 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
    >
      {direction === "prev" ? (
        <ChevronLeftIcon className="h-4 w-4" />
      ) : (
        <ChevronRightIcon className="h-4 w-4" />
      )}
    </button>
  );
}

const ROW_SIZE = TEMPLATES.length / 2;

export function TemplatePicker({
  showHeader = true,
  onSelect,
}: {
  showHeader?: boolean;
  onSelect?: (id: string) => void;
}) {
  const { data, update } = useResume();
  const rowARef = useRef<HTMLDivElement>(null);
  const rowBRef = useRef<HTMLDivElement>(null);

  const scrollRows = (dir: 1 | -1) => {
    for (const ref of [rowARef, rowBRef]) {
      const el = ref.current;
      if (!el) return;
      el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" });
    }
  };

  const handleSelect = (id: string) => {
    update("templateId", id);
    onSelect?.(id);
  };

  const rows = [TEMPLATES.slice(0, ROW_SIZE), TEMPLATES.slice(ROW_SIZE)];

  return (
    <div className="mx-auto mb-8 w-full max-w-3xl">
      {showHeader && (
        <h2 className="mb-4 text-center text-lg font-bold tracking-tight">
          Escolha um modelo
        </h2>
      )}
      <div className="mb-4 flex justify-end">
        <div className="flex gap-2">
          <ArrowButton direction="prev" onClick={() => scrollRows(-1)} />
          <ArrowButton direction="next" onClick={() => scrollRows(1)} />
        </div>
      </div>

      <div className="space-y-4">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            ref={rowIndex === 0 ? rowARef : rowBRef}
            className="flex gap-3 overflow-x-auto pb-2 snap-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {row.map((t) => (
              <TemplateCard
                key={t.id}
                t={t}
                selected={data.templateId === t.id}
                onSelect={handleSelect}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
