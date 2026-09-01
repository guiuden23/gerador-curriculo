"use client";

import { HomeLanding } from "@/components/landing/HomeLanding";
import { AppHeader } from "@/components/layout/AppHeader";
import { PlansView } from "@/components/views/PlansView";
import { PaymentViewWrapper } from "@/components/views/PaymentViewWrapper";
import { EditorView } from "@/components/views/EditorView";
import { AppProviders } from "@/providers/app-providers";
import { useAppFlow } from "@/hooks/use-app-flow";

function HomeContent() {
  const { view, goTo, selectPlan } = useAppFlow();

  if (view === "landing") {
    return (
      <HomeLanding
        onStart={() => goTo("plans")}
        onSelectPlan={selectPlan}
      />
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <AppHeader onLogoClick={() => goTo("landing")} />
      <main className="mx-auto max-w-[1240px] px-4 py-10 sm:py-14">
        {view === "plans" && <PlansView />}
        {view === "payment" && <PaymentViewWrapper />}
        {view === "basic" && <EditorView />}
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <AppProviders>
      <HomeContent />
    </AppProviders>
  );
}
