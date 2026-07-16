import {
  FileSearch,
  ClipboardCheck,
  Gavel,
  Ship,
  Landmark,
  KeyRound,
} from "lucide-react";
import { processSteps } from "@/lib/data";

const icons = [FileSearch, ClipboardCheck, Gavel, Ship, Landmark, KeyRound];

export function ProcessSection() {
  return (
    <section
      id="process"
      className="scroll-mt-20 border-b border-border bg-secondary/40"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
            Процесс
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Как мы привозим ваш автомобиль
          </h2>
          <p className="mt-3 text-muted-foreground">
            Шесть прозрачных этапов: от заявки до передачи готового к учёту
            авто. Вы видите статус на каждом шаге.
          </p>
        </div>

        <div className="relative mt-14">
          <div
            className="absolute left-0 right-0 top-7 hidden h-px bg-border lg:block"
            aria-hidden
          />
          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
            {processSteps.map((step, i) => {
              const Icon = icons[i];
              return (
                <li
                  key={step.n}
                  className="relative flex flex-col items-start lg:items-center lg:text-center"
                >
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-border bg-card shadow-sm">
                    <Icon className="h-6 w-6 text-accent" />
                    <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                      {step.n}
                    </span>
                  </div>
                  <h3 className="mt-4 font-heading text-base font-semibold">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground lg:px-1">
                    {step.text}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
