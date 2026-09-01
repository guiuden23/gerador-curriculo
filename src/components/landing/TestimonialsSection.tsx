import { StarIcon } from "@/components/ui/icons";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { TESTIMONIALS } from "./content";

export function TestimonialsSection() {
  return (
    <section id="depoimentos" className="py-16">
      <div className="mx-auto max-w-5xl px-4">
        <SectionTitle title="Resultados e depoimentos" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {TESTIMONIALS.map((text) => (
            <div
              key={text}
              className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="absolute -right-2 -top-4 select-none text-7xl font-black text-purple-100 dark:text-purple-900/40">
                ”
              </div>
              <div className="relative">
                <div className="flex gap-0.5 text-amber-400">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <StarIcon key={s} />
                  ))}
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-200">
                  “{text}”
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 text-sm font-bold text-white">
                    CV
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Cliente verificado</div>
                    <div className="text-xs text-zinc-400 dark:text-zinc-500">
                      eCurrículo Digital
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
