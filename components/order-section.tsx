"use client";

import { useState } from "react";
import { toast } from "sonner";
import { CheckCircle2, ShieldCheck, Clock, BadgePercent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const benefits = [
  { icon: ShieldCheck, text: "Фиксированная цена в договоре" },
  { icon: Clock, text: "Срок доставки 4–8 недель" },
  { icon: BadgePercent, text: "Без скрытых комиссий" },
];

export function OrderSection() {
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      (e.target as HTMLFormElement).reset();
      toast.success("Заявка отправлена!", {
        description: "Менеджер свяжется с вами в течение 30 минут.",
      });
    }, 800);
  }

  return (
    <section id="order" className="scroll-mt-20 bg-foreground text-background">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24 lg:px-8">
        <div className="flex flex-col justify-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
            Заказ авто
          </p>
          <h2 className="mt-2 text-balance font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Закажите подбор автомобиля под ваш бюджет
          </h2>
          <p className="mt-4 max-w-md text-pretty text-background/70 leading-relaxed">
            Оставьте параметры — мы подберём варианты с японских аукционов,
            пришлём аукционные листы и рассчитаем стоимость под ключ.
          </p>

          <ul className="mt-8 space-y-3">
            {benefits.map((b) => (
              <li key={b.text} className="flex items-center gap-3 text-sm">
                <b.icon className="h-5 w-5 text-accent" />
                {b.text}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-center gap-3 rounded-lg border border-background/15 bg-background/5 p-4 text-sm text-background/80">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
            Без предоплаты за подбор. Депозит вносится только перед участием в
            торгах.
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-background/15 bg-background p-6 text-foreground sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="o-name">Ваше имя</Label>
              <Input id="o-name" name="name" required placeholder="Иван" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="o-phone">Телефон</Label>
              <Input
                id="o-phone"
                name="phone"
                type="tel"
                required
                placeholder="+7 900 000-00-00"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="o-city">Город</Label>
              <Input id="o-city" name="city" placeholder="Новосибирск" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="o-make">Желаемая марка/модель</Label>
              <Input id="o-make" name="make" placeholder="Toyota Mark X" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="o-budget">Бюджет под ключ</Label>
              <Select name="budget">
                <SelectTrigger id="o-budget">
                  <SelectValue placeholder="Выберите" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">до 1,5 млн ₽</SelectItem>
                  <SelectItem value="2">1,5–2,5 млн ₽</SelectItem>
                  <SelectItem value="3">2,5–4 млн ₽</SelectItem>
                  <SelectItem value="4">от 4 млн ₽</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="o-comment">Комментарий</Label>
              <Input
                id="o-comment"
                name="comment"
                placeholder="Год, пробег, пожелания по комплектации"
              />
            </div>
          </div>
          <Button
            type="submit"
            size="lg"
            className="mt-6 w-full"
            disabled={submitting}
          >
            {submitting ? "Отправляем..." : "Отправить заявку"}
          </Button>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Нажимая кнопку, вы соглашаетесь с обработкой персональных данных.
          </p>
        </form>
      </div>
    </section>
  );
}
