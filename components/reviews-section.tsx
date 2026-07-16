import { Star, ExternalLink, Send, MessageSquare } from "lucide-react"
import { siteReviews, socialReviews } from "@/lib/data"

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Оценка ${rating} из 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={
            i < rating ? "h-4 w-4 fill-accent text-accent" : "h-4 w-4 text-border"
          }
        />
      ))}
    </div>
  )
}

const networkColors: Record<string, string> = {
  VK: "bg-[#0077ff]/10 text-[#0077ff]",
  Telegram: "bg-[#229ed9]/10 text-[#229ed9]",
  Drom: "bg-accent/10 text-accent",
  Avito: "bg-[#0af]/10 text-[#0077cc]",
}

export function ReviewsSection() {
  return (
    <section id="reviews" className="scroll-mt-20 border-b border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">Отзывы</p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Нам доверяют по всей России
          </h2>
          <p className="mt-3 text-muted-foreground">
            Отзывы наших клиентов на сайте и в социальных сетях.
          </p>
        </div>

        {/* Site reviews */}
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {siteReviews.map((r) => (
            <figure key={r.id} className="flex flex-col rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-3">
                <img
                  src={r.avatar || "/placeholder.svg"}
                  alt={r.name}
                  className="h-11 w-11 rounded-full object-cover"
                />
                <div>
                  <figcaption className="font-medium">{r.name}</figcaption>
                  <p className="text-xs text-muted-foreground">
                    {r.city} · {r.car}
                  </p>
                </div>
                <div className="ml-auto">
                  <Stars rating={r.rating} />
                </div>
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">
                {r.text}
              </blockquote>
              <p className="mt-4 text-xs text-muted-foreground">{r.date}</p>
            </figure>
          ))}
        </div>

        {/* Social reviews */}
        <div className="mt-14">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <MessageSquare className="h-4 w-4 text-accent" />
            Отзывы в социальных сетях и на площадках
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {socialReviews.map((s) => (
              <a
                key={s.id}
                href={s.link}
                className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${networkColors[s.network]}`}
                  >
                    {s.network}
                  </span>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground transition-colors group-hover:text-accent" />
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/90">{s.text}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">{s.name}</span>
                  <span>{s.date}</span>
                </div>
              </a>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
            >
              <Send className="h-4 w-4" />
              Все отзывы в нашем Telegram-канале
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
