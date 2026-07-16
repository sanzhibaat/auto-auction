"use client"

import { useState } from "react"
import { Calculator, Truck } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  calcCustoms,
  calcTurnkey,
  formatRub,
  type AgeGroup,
  type FuelType,
} from "@/lib/calc"

const fuelOptions: { value: FuelType; label: string }[] = [
  { value: "petrol", label: "Бензин" },
  { value: "hybrid", label: "Гибрид" },
  { value: "diesel", label: "Дизель" },
  { value: "electric", label: "Электро" },
]
const ageOptions: { value: AgeGroup; label: string }[] = [
  { value: "lt3", label: "До 3 лет" },
  { value: "3to5", label: "От 3 до 5 лет" },
  { value: "gt5", label: "Старше 5 лет" },
]

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between py-2.5 text-sm">
      <span className={accent ? "font-semibold" : "text-muted-foreground"}>{label}</span>
      <span className={accent ? "font-heading text-lg font-bold text-accent" : "font-medium"}>{value}</span>
    </div>
  )
}

export function CalculatorsSection() {
  // Растаможка
  const [age, setAge] = useState<AgeGroup>("3to5")
  const [engine, setEngine] = useState(2000)
  const [fuel, setFuel] = useState<FuelType>("petrol")
  const [price, setPrice] = useState(1500000)
  const customs = calcCustoms({ ageGroup: age, engineCc: engine, fuel, priceRub: price })

  // Под ключ
  const [tAge, setTAge] = useState<AgeGroup>("3to5")
  const [tEngine, setTEngine] = useState(2000)
  const [tFuel, setTFuel] = useState<FuelType>("petrol")
  const [auctionJpy, setAuctionJpy] = useState(900000)
  const [delivery, setDelivery] = useState(0)
  const turnkey = calcTurnkey({
    auctionPriceJpy: auctionJpy,
    fuel: tFuel,
    ageGroup: tAge,
    engineCc: tEngine,
    deliveryRub: delivery,
  })

  return (
    <section id="calculator" className="scroll-mt-20 border-b border-border bg-background">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">Калькуляторы</p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Посчитайте стоимость заранее
          </h2>
          <p className="mt-3 text-muted-foreground">
            Прикиньте растаможку и цену под ключ. Расчёт ориентировочный — точную смету подготовит менеджер.
          </p>
        </div>

        <Tabs defaultValue="turnkey" className="mt-10">
          <TabsList className="mx-auto grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="turnkey" className="gap-2">
              <Truck className="h-4 w-4" /> Цена под ключ
            </TabsTrigger>
            <TabsTrigger value="customs" className="gap-2">
              <Calculator className="h-4 w-4" /> Растаможка
            </TabsTrigger>
          </TabsList>

          {/* Под ключ */}
          <TabsContent value="turnkey" className="mt-8">
            <div className="grid gap-8 rounded-xl border border-border bg-card p-6 lg:grid-cols-2 lg:p-8">
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label>Цена на аукционе (¥)</Label>
                  <Input
                    type="number"
                    value={auctionJpy}
                    onChange={(e) => setAuctionJpy(Number(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Объём двигателя (см³)</Label>
                  <Input
                    type="number"
                    value={tEngine}
                    onChange={(e) => setTEngine(Number(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Тип топлива</Label>
                  <Select value={tFuel} onValueChange={(v) => setTFuel(v as FuelType)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {fuelOptions.map((f) => (
                        <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Возраст авто</Label>
                  <Select value={tAge} onValueChange={(v) => setTAge(v as AgeGroup)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {ageOptions.map((a) => (
                        <SelectItem key={a.value} value={a.value}>{a.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Доставка по РФ (₽)</Label>
                  <Input
                    type="number"
                    value={delivery}
                    onChange={(e) => setDelivery(Number(e.target.value) || 0)}
                  />
                </div>
              </div>

              <div className="flex flex-col rounded-lg bg-secondary/60 p-5">
                <h3 className="font-heading text-lg font-semibold">Расчёт стоимости</h3>
                <div className="mt-3 divide-y divide-border">
                  <Row label="Авто (по курсу)" value={formatRub(turnkey.carRub)} />
                  <Row label="Аукционный и брокерский сбор" value={formatRub(turnkey.auctionFee)} />
                  <Row label="Фрахт и морская доставка" value={formatRub(turnkey.freight)} />
                  <Row label="Таможня и сборы" value={formatRub(turnkey.customsTotal)} />
                  <Row label="Услуги компании" value={formatRub(turnkey.serviceFee)} />
                  {delivery > 0 && <Row label="Доставка по РФ" value={formatRub(turnkey.deliveryRub)} />}
                  <Row label="Итого под ключ" value={formatRub(turnkey.total)} accent />
                </div>
                <p className="mt-auto pt-4 text-xs text-muted-foreground">
                  Демо-курс ¥1 ≈ 0,62 ₽. Итоговая сумма фиксируется в договоре.
                </p>
              </div>
            </div>
          </TabsContent>

          {/* Растаможка */}
          <TabsContent value="customs" className="mt-8">
            <div className="grid gap-8 rounded-xl border border-border bg-card p-6 lg:grid-cols-2 lg:p-8">
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label>Возраст авто</Label>
                  <Select value={age} onValueChange={(v) => setAge(v as AgeGroup)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {ageOptions.map((a) => (
                        <SelectItem key={a.value} value={a.value}>{a.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Объём двигателя (см³)</Label>
                  <Input
                    type="number"
                    value={engine}
                    onChange={(e) => setEngine(Number(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Тип топлива</Label>
                  <Select value={fuel} onValueChange={(v) => setFuel(v as FuelType)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {fuelOptions.map((f) => (
                        <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Стоимость авто (₽)</Label>
                  <Input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value) || 0)}
                  />
                </div>
              </div>

              <div className="flex flex-col rounded-lg bg-secondary/60 p-5">
                <h3 className="font-heading text-lg font-semibold">Таможенные платежи</h3>
                <div className="mt-3 divide-y divide-border">
                  <Row label="Таможенная пошлина" value={formatRub(customs.duty)} />
                  <Row label="Утилизационный сбор" value={formatRub(customs.utilFee)} />
                  <Row label="Сбор за оформление" value={formatRub(customs.clearanceFee)} />
                  <Row label="Итого растаможка" value={formatRub(customs.total)} accent />
                </div>
                <p className="mt-auto pt-4 text-xs text-muted-foreground">
                  Расчёт упрощённый, для ознакомления. Точные ставки зависят от ТН ВЭД и курса ЦБ.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
