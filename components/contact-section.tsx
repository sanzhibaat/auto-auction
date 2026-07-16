"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const contacts = [
  { icon: Phone, label: "Телефон", value: "8 800 123-45-67", href: "tel:+78001234567" },
  { icon: Mail, label: "Почта", value: "info@akihabara-motors.ru", href: "mailto:info@akihabara-motors.ru" },
  { icon: MapPin, label: "Офис", value: "Владивосток, ул. Морская, 12", href: "#" },
  { icon: Clock, label: "Режим работы", value: "Ежедневно 9:00–20:00", href: "#" },
]

export function ContactSection() {
  const [submitting, setSubmitting] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      ;(e.target as HTMLFormElement).reset()
      toast.success("Сообщение отправлено!", {
        description: "Мы ответим вам в ближайшее время.",
      })
    }, 800)
  }

  return (
    <section id="contact" className="scroll-mt-20 border-b border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24 lg:px-8">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">Обратная связь</p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Остались вопросы? Напишите нам
          </h2>
          <p className="mt-3 text-muted-foreground">
            Ответим на любые вопросы о подборе, доставке и растаможке японских авто.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {contacts.map((c) => (
              <a
                key={c.label}
                href={c.href}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-accent/10">
                  <c.icon className="h-5 w-5 text-accent" />
                </span>
                <span>
                  <span className="block text-xs text-muted-foreground">{c.label}</span>
                  <span className="block text-sm font-medium">{c.value}</span>
                </span>
              </a>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-card p-6 sm:p-8">
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="c-name">Имя</Label>
                <Input id="c-name" name="name" required placeholder="Ваше имя" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="c-contact">Телефон или email</Label>
                <Input id="c-contact" name="contact" required placeholder="+7 900 000-00-00" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="c-message">Сообщение</Label>
              <Textarea
                id="c-message"
                name="message"
                required
                rows={5}
                placeholder="Расскажите, какой автомобиль ищете или какой у вас вопрос"
              />
            </div>
          </div>
          <Button type="submit" size="lg" className="mt-6 w-full" disabled={submitting}>
            {submitting ? "Отправляем..." : "Отправить сообщение"}
          </Button>
        </form>
      </div>
    </section>
  )
}
