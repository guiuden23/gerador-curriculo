import { BrandLogo } from "@/components/layout/BrandLogo";
import { SITE } from "@/config/site";

export function LandingFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 py-8 dark:border-zinc-800 dark:bg-zinc-900/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 text-sm text-zinc-500 sm:flex-row dark:text-zinc-400">
        <BrandLogo variant="footer" />
        <p>© {new Date().getFullYear()} {SITE.name}. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
