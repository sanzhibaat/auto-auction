import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { statusMeta, type CarStatus } from "@/lib/data";

const trackSteps: { status: CarStatus; short: string }[] = [
  { status: "auction", short: "Аукцион" },
  { status: "purchased", short: "Выкуплен" },
  { status: "port", short: "Порт" },
  { status: "shipping", short: "В пути" },
  { status: "warehouse", short: "Склад" },
  { status: "available", short: "В наличии" },
];

export function StatusTracker({ status }: { status: CarStatus }) {
  const current = statusMeta[status].step;
  const isSold = status === "sold";

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="font-heading text-base font-semibold">Статус доставки</h3>
      {isSold ? (
        <p className="mt-3 text-sm text-muted-foreground">
          Этот автомобиль уже продан. Подберём похожий — оставьте заявку.
        </p>
      ) : (
        <ol className="mt-5 space-y-0">
          {trackSteps.map((s, i) => {
            const stepNum = statusMeta[s.status].step;
            const done = stepNum < current;
            const isCurrent = stepNum === current;
            const last = i === trackSteps.length - 1;
            return (
              <li key={s.status} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <span
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold",
                      done && "border-accent bg-accent text-accent-foreground",
                      isCurrent && "border-accent bg-accent/10 text-accent",
                      !done &&
                        !isCurrent &&
                        "border-border bg-card text-muted-foreground",
                    )}
                  >
                    {done ? <Check className="h-3.5 w-3.5" /> : stepNum}
                  </span>
                  {!last && (
                    <span
                      className={cn(
                        "my-0.5 h-6 w-px",
                        done ? "bg-accent" : "bg-border",
                      )}
                    />
                  )}
                </div>
                <div className={cn("pb-2 pt-0.5", last && "pb-0")}>
                  <p
                    className={cn(
                      "text-sm",
                      isCurrent
                        ? "font-semibold text-foreground"
                        : done
                          ? "text-foreground"
                          : "text-muted-foreground",
                    )}
                  >
                    {statusMeta[s.status].label}
                  </p>
                  {isCurrent && (
                    <p className="text-xs text-accent">Текущий этап</p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
