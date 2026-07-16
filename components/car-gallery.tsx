"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function CarGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="overflow-hidden rounded-xl border border-border bg-muted">
        <img
          src={images[active] || "/placeholder.svg"}
          alt={`${alt} — фото ${active + 1}`}
          className="aspect-[4/3] w-full object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-3">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                "overflow-hidden rounded-lg border bg-muted transition",
                i === active
                  ? "border-accent ring-2 ring-accent/30"
                  : "border-border hover:border-accent/50",
              )}
              aria-label={`Фото ${i + 1}`}
            >
              <img
                src={src || "/placeholder.svg"}
                alt=""
                className="aspect-[4/3] w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
