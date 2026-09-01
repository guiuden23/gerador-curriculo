"use client";

import type { PlanId } from "@/config/plans";
import { BenefitsSection } from "./BenefitsSection";
import { ComparisonSection } from "./ComparisonSection";
import { HeroSection } from "./HeroSection";
import { HowItWorksSection } from "./HowItWorksSection";
import { LandingFooter } from "./LandingFooter";
import { LandingHeader } from "./LandingHeader";
import { PlansSection } from "./PlansSection";
import { TemplateGallerySection } from "./TemplateGallerySection";
import { TestimonialsSection } from "./TestimonialsSection";

export function HomeLanding({
  onStart,
  onSelectPlan,
}: {
  onStart: () => void;
  onSelectPlan: (planId: PlanId) => void;
}) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <LandingHeader onStart={onStart} onScrollTo={scrollTo} />
      <HeroSection onStart={onStart} onScrollToExamples={() => scrollTo("exemplos")} />
      <HowItWorksSection />
      <BenefitsSection />
      <TemplateGallerySection onStart={onStart} />
      <TestimonialsSection />
      <ComparisonSection />
      <PlansSection onSelectPlan={onSelectPlan} />
      <LandingFooter />
    </div>
  );
}
