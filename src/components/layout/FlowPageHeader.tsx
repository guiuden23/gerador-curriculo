import type { ReactNode } from "react";

export function FlowPageHeader({
  badges,
  title,
  description,
}: {
  badges?: ReactNode;
  title: string;
  description?: ReactNode;
}) {
  return (
    <div className="mb-8 text-center">
      {badges && (
        <div className="inline-flex flex-wrap items-center justify-center gap-2">
          {badges}
        </div>
      )}
      <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
      {description && (
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">{description}</p>
      )}
    </div>
  );
}
