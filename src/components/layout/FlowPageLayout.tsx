import type { ReactNode } from "react";
import { BackButton } from "./BackButton";
import { cn } from "@/lib/cn";

export function FlowPageLayout({
  backLabel,
  onBack,
  header,
  children,
  maxWidth = "max-w-2xl",
  backVariant = "ghost",
}: {
  backLabel?: string;
  onBack?: () => void;
  header?: ReactNode;
  children: ReactNode;
  maxWidth?: string;
  backVariant?: "ghost" | "outline";
}) {
  return (
    <div className={cn("mx-auto", maxWidth)}>
      {backLabel && onBack && (
        <BackButton
          onClick={onBack}
          label={backLabel}
          variant={backVariant}
          className="mb-6"
        />
      )}
      {header}
      {children}
    </div>
  );
}
