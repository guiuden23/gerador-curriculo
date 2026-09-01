import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { WITHOUT_SERVICE_ITEMS, WITH_SERVICE_ITEMS } from "./content";

export function ComparisonSection() {
  return (
    <section className="border-t border-zinc-100 bg-zinc-50 py-16 dark:border-zinc-900 dark:bg-zinc-900/40">
      <div className="mx-auto max-w-4xl px-4">
        <SectionTitle title="O que muda com o serviço" />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <Card size="md">
            <h3 className="text-center text-lg font-bold text-zinc-500">Sem o serviço</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-zinc-600 dark:text-zinc-300">
              {WITHOUT_SERVICE_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-0.5 text-red-400">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </Card>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 to-fuchsia-600 p-6 text-white shadow-xl shadow-purple-300/50 dark:shadow-purple-900/40">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10" />
            <div className="absolute -bottom-12 -left-8 h-32 w-32 rounded-full bg-fuchsia-300/20" />
            <div className="relative">
              <div className="mb-4 flex justify-center">
                <Badge variant="recommended">✨ Recomendado</Badge>
              </div>
              <h3 className="text-center text-lg font-extrabold">Com o serviço</h3>
              <ul className="mt-4 space-y-3 text-sm font-medium">
                {WITH_SERVICE_ITEMS.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/25 text-xs font-bold">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
