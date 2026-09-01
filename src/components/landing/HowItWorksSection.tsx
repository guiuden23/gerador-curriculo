import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { HOW_IT_WORKS_STEPS } from "./content";

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="border-t border-zinc-100 bg-zinc-50 py-16 dark:border-zinc-900 dark:bg-zinc-900/40">
      <div className="mx-auto max-w-5xl px-4">
        <SectionTitle
          title="Como funciona"
          subtitle="Em 4 passos simples você tem um currículo profissional pronto para enviar."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {HOW_IT_WORKS_STEPS.map((step) => (
            <Card key={step.n} size="md" className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-lg font-bold text-white">
                {step.n}
              </div>
              <h3 className="mt-4 font-bold">{step.title}</h3>
              <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400">{step.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
