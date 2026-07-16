import Link from "next/link";
import { Gauge, Fuel, Cog, Star } from "lucide-react";
import { StatusBadge } from "@/components/status-badge";
import { formatRub, formatJpy } from "@/lib/calc";
import type { Car } from "@/lib/data";

export function CarCard({ car }: { car: Car }) {
  return (
    <Link
      href={`/cars/${car.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={car.images[0] || "/placeholder.svg"}
          alt={`${car.make} ${car.model} ${car.year}`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3">
          <StatusBadge status={car.status} />
        </div>
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-background/90 px-2 py-1 text-xs font-semibold backdrop-blur">
          <Star className="h-3 w-3 fill-accent text-accent" />
          {car.auctionGrade}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-heading text-lg font-semibold leading-tight">
            {car.make} {car.model}
          </h3>
          <span className="shrink-0 text-sm text-muted-foreground">
            {car.year}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Gauge className="h-3.5 w-3.5" />{" "}
            {car.mileage.toLocaleString("ru-RU")} км
          </span>
          <span className="flex items-center gap-1">
            <Fuel className="h-3.5 w-3.5" /> {car.fuel}
          </span>
          <span className="flex items-center gap-1">
            <Cog className="h-3.5 w-3.5" /> {car.engine} л · {car.drive}
          </span>
        </div>

        <div className="mt-auto pt-4">
          <p className="font-heading text-xl font-bold">
            {formatRub(car.priceRub)}
          </p>
          <p className="text-xs text-muted-foreground">
            под ключ · аукцион ~ {formatJpy(car.priceJpy)}
          </p>
        </div>
      </div>
    </Link>
  );
}
