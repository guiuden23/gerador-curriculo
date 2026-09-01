import { cn } from "@/lib/cn";

export function SectionTitle({
  title,
  subtitle,
  className,
  id,
}: {
  title: string;
  subtitle?: string;
  className?: string;
  id?: string;
}) {
  return (
    <div className={cn("text-center", className)} id={id}>
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      {subtitle && (
        <p className="mx-auto mt-3 max-w-xl text-zinc-600 dark:text-zinc-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}
