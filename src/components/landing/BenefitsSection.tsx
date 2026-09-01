import { Card } from "@/components/ui/Card";
import { CheckIcon } from "@/components/ui/icons";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { BENEFITS } from "./content";

export function BenefitsSection() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-5xl px-4">
        <SectionTitle title="Benefícios" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {BENEFITS.map((benefit) => (
            <Card key={benefit} size="md" className="flex items-center gap-3 text-lg font-semibold">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                <CheckIcon />
              </span>
              {benefit}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
