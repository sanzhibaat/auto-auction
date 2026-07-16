"use client";

import { useState } from "react";
import { siteReviews as initialReviews, type Review } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Check, Trash2 } from "lucide-react";
import { toast } from "sonner";

type ModReview = Review & { approved: boolean };

export function AdminReviews() {
  const [items, setItems] = useState<ModReview[]>(
    initialReviews.map((r, i) => ({ ...r, approved: i % 3 !== 0 })),
  );

  function toggle(id: string) {
    setItems((prev) =>
      prev.map((r) => (r.id === id ? { ...r, approved: !r.approved } : r)),
    );
    toast.success("Статус отзыва обновлён");
  }

  function remove(id: string) {
    setItems((prev) => prev.filter((r) => r.id !== id));
    toast.success("Отзыв удалён");
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((r) => (
        <Card key={r.id} className="flex flex-col gap-3 p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-medium text-foreground">{r.name}</p>
              <p className="text-sm text-muted-foreground">
                {r.car} {"\u00B7"} {r.date}
              </p>
            </div>
            <Badge
              variant={r.approved ? "default" : "secondary"}
              className={r.approved ? "bg-primary" : ""}
            >
              {r.approved ? "Опубликован" : "На модерации"}
            </Badge>
          </div>

          <div className="flex gap-0.5" aria-label={`Оценка ${r.rating} из 5`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < r.rating
                    ? "fill-accent text-accent"
                    : "text-muted-foreground/30"
                }`}
              />
            ))}
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground">
            {r.text}
          </p>

          <div className="mt-auto flex gap-2 pt-2">
            <Button
              size="sm"
              variant={r.approved ? "outline" : "default"}
              onClick={() => toggle(r.id)}
            >
              <Check className="mr-1 h-4 w-4" />
              {r.approved ? "Снять с публикации" : "Опубликовать"}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-destructive hover:text-destructive"
              onClick={() => remove(r.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
