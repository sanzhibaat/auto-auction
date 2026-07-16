import Link from "next/link";
import { ArrowRight, ShieldCheck, FileCheck2, Ship } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { stats } from "@/lib/data";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24 lg:px-8">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Аукционы Японии напрямую
          </span>
          <h1 className="mt-6 text-balance font-heading text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Японские авто с аукционов —{" "}
            <span className="text-accent">честно и под ключ</span>
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Подбираем, выкупаем и доставляем автомобили с аукционов Японии.
            Реальные аукционные листы, прозрачный расчёт стоимости и доставка по
            всей России.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/#gallery" className={buttonVariants({ size: "lg" })}>
              Смотреть каталог
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/#calculator"
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              Рассчитать стоимость
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <FileCheck2 className="h-4 w-4 text-accent" /> Оригинальные
              аукционные листы
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-accent" /> Фиксированная цена
              в договоре
            </span>
            <span className="flex items-center gap-2">
              <Ship className="h-4 w-4 text-accent" /> Доставка до вашего города
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <img
              src="/placeholder.svg?height=720&width=960"
              alt="Японский автомобиль с аукциона"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-4 hidden rounded-xl border border-border bg-card p-4 shadow-md sm:block">
            <p className="text-xs text-muted-foreground">
              Средняя оценка аукциона
            </p>
            <p className="font-heading text-2xl font-bold text-accent">
              4.5 / 5
            </p>
          </div>
        </div>
      </div>

      <div className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map((s) => (
            <div key={s.label} className="py-8 text-center">
              <p className="font-heading text-3xl font-bold sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
