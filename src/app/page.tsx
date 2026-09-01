"use client";

import { HomeLanding } from "@/components/landing/HomeLanding";
import { PageShell } from "@/components/layout/PageShell";
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
    <PageShell onLogoClick={() => goTo("landing")}>
      {view === "plans" && <PlansView />}
      {view === "payment" && <PaymentViewWrapper />}
      {view === "basic" && <EditorView />}
    </PageShell>
  );
}

export default function Home() {
  return (
    <AppProviders>
      <HomeContent />
    </AppProviders>
  );
}
