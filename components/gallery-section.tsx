"use client"

import { useMemo, useState } from "react"
import { Search } from "lucide-react"
import { CarCard } from "@/components/car-card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { cars, statusMeta, type CarStatus } from "@/lib/data"

const makes = ["Все марки", ...Array.from(new Set(cars.map((c) => c.make)))]
const fuels = ["Любое топливо", "Бензин", "Гибрид", "Дизель", "Электро"]
const statusFilters: { value: "all" | "available" | "ontheway"; label: string }[] = [
  { value: "all", label: "Все авто" },
  { value: "available", label: "В наличии" },
  { value: "ontheway", label: "В пути" },
]
const sortOptions = [
  { value: "price-asc", label: "Сначала дешевле" },
  { value: "price-desc", label: "Сначала дороже" },
  { value: "year-desc", label: "Сначала новее" },
  { value: "mileage-asc", label: "Меньше пробег" },
]

const onTheWayStatuses: CarStatus[] = ["auction", "purchased", "port", "shipping", "warehouse"]

export function GallerySection() {
  const [query, setQuery] = useState("")
  const [make, setMake] = useState("Все марки")
  const [fuel, setFuel] = useState("Любое топливо")
  const [sort, setSort] = useState("price-asc")
  const [tab, setTab] = useState<"all" | "available" | "ontheway">("all")

  const filtered = useMemo(() => {
    const result = cars.filter((c) => {
      const matchesQuery = `${c.make} ${c.model}`.toLowerCase().includes(query.toLowerCase())
      const matchesMake = make === "Все марки" || c.make === make
      const matchesFuel = fuel === "Любое топливо" || c.fuel === fuel
      const matchesTab =
        tab === "all"
          ? true
          : tab === "available"
            ? c.status === "available"
            : onTheWayStatuses.includes(c.status)
      return matchesQuery && matchesMake && matchesFuel && matchesTab
    })

    return [...result].sort((a, b) => {
      switch (sort) {
        case "price-desc":
          return b.priceRub - a.priceRub
        case "year-desc":
          return b.year - a.year
        case "mileage-asc":
          return a.mileage - b.mileage
        default:
          return a.priceRub - b.priceRub
      }
    })
  }, [query, make, fuel, sort, tab])

  return (
    <section id="gallery" className="scroll-mt-20 border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">Каталог</p>
            <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Автомобили с аукционов
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Реальные позиции с japanese-аукционов. Статус каждого авто обновляется на всех этапах доставки.
            </p>
          </div>
          <div className="flex gap-2">
            {statusFilters.map((f) => (
              <Button
                key={f.value}
                variant={tab === f.value ? "default" : "outline"}
                size="sm"
                onClick={() => setTab(f.value)}
              >
                {f.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-3 rounded-xl border border-border bg-card p-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Марка или модель"
              className="pl-9"
            />
          </div>
          <Select value={make} onValueChange={setMake}>
            <SelectTrigger>
              <SelectValue placeholder="Марка" />
            </SelectTrigger>
            <SelectContent>
              {makes.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={fuel} onValueChange={setFuel}>
            <SelectTrigger>
              <SelectValue placeholder="Топливо" />
            </SelectTrigger>
            <SelectContent>
              {fuels.map((f) => (
                <SelectItem key={f} value={f}>
                  {f}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger>
              <SelectValue placeholder="Сортировка" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          Найдено: <span className="font-medium text-foreground">{filtered.length}</span> авто
        </p>

        {filtered.length > 0 ? (
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-xl border border-dashed border-border p-12 text-center text-muted-foreground">
            По вашему запросу ничего не найдено. Попробуйте изменить фильтры или{" "}
            <a href="#order" className="text-accent underline">
              оставьте заявку на подбор
            </a>
            .
          </div>
        )}
      </div>
    </section>
  )
}
