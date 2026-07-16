import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Gauge,
  Fuel,
  Cog,
  Settings2,
  Palette,
  MapPin,
  Phone,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CarGallery } from "@/components/car-gallery";
import { StatusTracker } from "@/components/status-tracker";
import { AuctionSheet } from "@/components/auction-sheet";
import { StatusBadge } from "@/components/status-badge";
import { CarCard } from "@/components/car-card";
import { Button } from "@/components/ui/button";
import { cars } from "@/lib/data";
import { formatRub, formatJpy } from "@/lib/calc";

export function generateStaticParams() {
  return cars.map((c) => ({ id: c.id }));
}

export default async function CarPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const car = cars.find((c) => c.id === id);
  if (!car) notFound();

  const specs = [
    { icon: Calendar, label: "Год выпуска", value: String(car.year) },
    {
      icon: Gauge,
      label: "Пробег",
      value: `${car.mileage.toLocaleString("ru-RU")} км`,
    },
    { icon: Fuel, label: "Топливо", value: car.fuel },
    { icon: Cog, label: "Двигатель", value: `${car.engine} л` },
    { icon: Settings2, label: "Коробка", value: car.transmission },
    { icon: Settings2, label: "Привод", value: car.drive },
    { icon: Palette, label: "Цвет", value: car.color },
    { icon: MapPin, label: "Локация", value: car.location },
  ];

  const similar = cars
    .filter((c) => c.id !== car.id && c.make === car.make)
    .slice(0, 4);
  const fill = cars.filter((c) => c.id !== car.id && c.make !== car.make);
  const related = [...similar, ...fill].slice(0, 4);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Link
            href="/#gallery"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Назад в каталог
          </Link>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <CarGallery
                images={car.images}
                alt={`${car.make} ${car.model}`}
              />
            </div>

            <div className="flex flex-col">
              <StatusBadge status={car.status} className="w-fit" />
              <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight">
                {car.make} {car.model}
              </h1>
              <p className="mt-1 text-muted-foreground">
                {car.year} год · оценка аукциона {car.auctionGrade}
              </p>

              <div className="mt-5 rounded-xl border border-border bg-card p-5">
                <p className="text-sm text-muted-foreground">
                  Стоимость под ключ
                </p>
                <p className="font-heading text-3xl font-bold">
                  {formatRub(car.priceRub)}
                </p>
                <p className="text-sm text-muted-foreground">
                  цена на аукционе ~ {formatJpy(car.priceJpy)}
                </p>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  {/*<Button asChild size="lg" className="flex-1">
                    <Link href="/#order">Заказать этот авто</Link>
                  </Button>*/}
                  <Button
                    size="lg"
                    className="flex-1"
                    render={<Link href="/#order" />}
                  >
                    Заказать этот авто
                  </Button>
                  {/*<Button asChild size="lg" variant="outline">
                    <a href="tel:+78001234567">
                      <Phone className="h-4 w-4" />
                      Позвонить
                    </a>
                  </Button>*/}
                  <Button
                    size="lg"
                    variant="outline"
                    nativeButton={false}
                    render={<a href="tel:+78001234567" />}
                  >
                    <Phone className="h-4 w-4" />
                    Позвонить
                  </Button>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border">
                {specs.map((s) => (
                  <div
                    key={s.label}
                    className="flex items-center gap-3 bg-card p-3.5"
                  >
                    <s.icon className="h-4 w-4 shrink-0 text-accent" />
                    <span>
                      <span className="block text-xs text-muted-foreground">
                        {s.label}
                      </span>
                      <span className="block text-sm font-medium">
                        {s.value}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <AuctionSheet car={car} />
            <StatusTracker status={car.status} />
          </div>

          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="font-heading text-2xl font-bold tracking-tight">
                Похожие автомобили
              </h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {related.map((c) => (
                  <CarCard key={c.id} car={c} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
