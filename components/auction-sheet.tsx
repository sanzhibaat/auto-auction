import { Star, Info } from "lucide-react";
import type { Car } from "@/lib/data";

const gradeLegend = [
  { grade: "5", desc: "Практически новый" },
  { grade: "4.5", desc: "Отличное состояние" },
  { grade: "4", desc: "Хорошее, мелкие дефекты" },
  { grade: "3.5", desc: "Заметный износ" },
  { grade: "R", desc: "Восстановлен после ДТП" },
];

export function AuctionSheet({ car }: { car: Car }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-heading text-lg font-semibold">
            Аукционный лист
          </h3>
          <p className="text-sm text-muted-foreground">{car.auctionHouse}</p>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg bg-accent/10 px-3 py-1.5">
          <Star className="h-4 w-4 fill-accent text-accent" />
          <span className="font-heading text-lg font-bold text-accent">
            {car.auctionGrade}
          </span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-secondary/60 p-4 text-center">
          <p className="text-xs text-muted-foreground">Кузов (экстерьер)</p>
          <p className="mt-1 font-heading text-2xl font-bold">
            {car.sheet.exterior}
          </p>
        </div>
        <div className="rounded-lg bg-secondary/60 p-4 text-center">
          <p className="text-xs text-muted-foreground">Салон (интерьер)</p>
          <p className="mt-1 font-heading text-2xl font-bold">
            {car.sheet.interior}
          </p>
        </div>
      </div>

      {car.sheet.diagram.length > 0 && (
        <div className="mt-5">
          <p className="text-sm font-medium">Отметки на схеме кузова</p>
          <ul className="mt-2 space-y-2">
            {car.sheet.diagram.map((d) => (
              <li key={d.code} className="flex items-center gap-3 text-sm">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border bg-secondary font-mono text-xs font-semibold">
                  {d.code}
                </span>
                <span>
                  <span className="font-medium">{d.part}</span>
                  <span className="text-muted-foreground"> — {d.note}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-5">
        <p className="text-sm font-medium">Заметки аукциониста</p>
        <ul className="mt-2 space-y-1.5">
          {car.sheet.notes.map((n) => (
            <li
              key={n}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              {n}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 flex items-start gap-2 rounded-lg border border-border bg-secondary/40 p-3 text-xs text-muted-foreground">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
        <div>
          <p className="mb-1 font-medium text-foreground">Шкала оценок:</p>
          {gradeLegend.map((g) => (
            <span key={g.grade} className="mr-3 inline-block">
              <span className="font-semibold text-foreground">{g.grade}</span> —{" "}
              {g.desc}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
