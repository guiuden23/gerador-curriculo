import type { TemplateConfig } from "@/lib/templates";

export function TemplateMiniMock({ template }: { template: TemplateConfig }) {
  const p = template.palette;

  return (
    <div
      className="aspect-[210/297] w-full overflow-hidden rounded-md"
      style={{ backgroundColor: p.paper }}
    >
      {template.layout === "sidebar" ? (
        <div className="flex h-full">
          <div className="w-[32%] p-[6%]" style={{ backgroundColor: p.headerBg }}>
            <div className="h-[8%] w-full rounded-sm" style={{ backgroundColor: p.headerText }} />
            <div
              className="mt-[4%] h-[3%] w-[70%] rounded-sm"
              style={{ backgroundColor: p.headerAccent }}
            />
            <div className="mt-[16%] space-y-[5%]">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-[3%] w-full rounded-sm"
                  style={{ backgroundColor: p.headerAccent, opacity: 0.7 }}
                />
              ))}
            </div>
          </div>
          <div className="flex-1 space-y-[6%] p-[6%]">
            <div className="h-[4%] w-[55%] rounded-sm" style={{ backgroundColor: p.accent }} />
            <div className="space-y-[4%]">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-[3%] w-full rounded-sm"
                  style={{ backgroundColor: p.muted, opacity: 0.5 }}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-full flex-col">
          <div className="h-[30%] p-[7%]" style={{ backgroundColor: p.headerBg }}>
            <div className="h-[10%] w-[60%] rounded-sm" style={{ backgroundColor: p.headerText }} />
            <div
              className="mt-[5%] h-[4%] w-[45%] rounded-sm"
              style={{ backgroundColor: p.headerAccent }}
            />
            <div
              className="mt-[10%] h-[3%] w-[85%] rounded-sm"
              style={{ backgroundColor: p.headerAccent, opacity: 0.6 }}
            />
          </div>
          <div className="flex-1 space-y-[6%] p-[7%]">
            <div className="h-[4%] w-[50%] rounded-sm" style={{ backgroundColor: p.accent }} />
            <div className="space-y-[4%]">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-[3%] w-full rounded-sm"
                  style={{ backgroundColor: p.muted, opacity: 0.5 }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
