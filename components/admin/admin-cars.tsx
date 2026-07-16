"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusBadge } from "@/components/status-badge";
import {
  cars as initialCars,
  statusMeta,
  type Car,
  type CarStatus,
} from "@/lib/data";
import { formatRub } from "@/lib/calc";

type Editable = Pick<
  Car,
  | "id"
  | "make"
  | "model"
  | "year"
  | "priceRub"
  | "status"
  | "auctionGrade"
  | "mileage"
>;

const statusEntries = Object.entries(statusMeta) as [
  CarStatus,
  { label: string },
][];

export function AdminCars() {
  const [items, setItems] = useState<Editable[]>(
    initialCars.map((c) => ({
      id: c.id,
      make: c.make,
      model: c.model,
      year: c.year,
      priceRub: c.priceRub,
      status: c.status,
      auctionGrade: c.auctionGrade,
      mileage: c.mileage,
    })),
  );
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Editable | null>(null);

  function openNew() {
    setEditing({
      id: "",
      make: "",
      model: "",
      year: new Date().getFullYear(),
      priceRub: 0,
      status: "auction",
      auctionGrade: "4",
      mileage: 0,
    });
    setOpen(true);
  }

  function openEdit(item: Editable) {
    setEditing({ ...item });
    setOpen(true);
  }

  function remove(id: string) {
    setItems((prev) => prev.filter((c) => c.id !== id));
    toast.success("Автомобиль удалён");
  }

  function save() {
    if (!editing) return;
    if (!editing.make || !editing.model) {
      toast.error("Заполните марку и модель");
      return;
    }
    if (editing.id) {
      setItems((prev) => prev.map((c) => (c.id === editing.id ? editing : c)));
      toast.success("Изменения сохранены");
    } else {
      const id = `${editing.make}-${editing.model}-${Date.now()}`
        .toLowerCase()
        .replace(/\s+/g, "-");
      setItems((prev) => [{ ...editing, id }, ...prev]);
      toast.success("Автомобиль добавлен");
    }
    setOpen(false);
    setEditing(null);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-xl font-semibold">Автомобили</h2>
          <p className="text-sm text-muted-foreground">
            {items.length} позиций в каталоге
          </p>
        </div>
        <Button onClick={openNew}>
          <Plus className="h-4 w-4" />
          Добавить авто
        </Button>
      </div>

      <div className="mt-5 overflow-hidden rounded-xl border border-border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Авто</th>
                <th className="px-4 py-3 font-medium">Год</th>
                <th className="px-4 py-3 font-medium">Оценка</th>
                <th className="px-4 py-3 font-medium">Цена</th>
                <th className="px-4 py-3 font-medium">Статус</th>
                <th className="px-4 py-3 text-right font-medium">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {items.map((c) => (
                <tr key={c.id} className="bg-card">
                  <td className="px-4 py-3 font-medium">
                    {c.make} {c.model}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{c.year}</td>
                  <td className="px-4 py-3">{c.auctionGrade}</td>
                  <td className="px-4 py-3">{formatRub(c.priceRub)}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={c.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEdit(c)}
                        aria-label="Изменить"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(c.id)}
                        aria-label="Удалить"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editing?.id ? "Редактировать авто" : "Новый автомобиль"}
            </DialogTitle>
            <DialogDescription>
              Заполните основные данные карточки.
            </DialogDescription>
          </DialogHeader>
          {editing && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Марка</Label>
                <Input
                  value={editing.make}
                  onChange={(e) =>
                    setEditing({ ...editing, make: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Модель</Label>
                <Input
                  value={editing.model}
                  onChange={(e) =>
                    setEditing({ ...editing, model: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Год</Label>
                <Input
                  type="number"
                  value={editing.year}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      year: Number(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Пробег (км)</Label>
                <Input
                  type="number"
                  value={editing.mileage}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      mileage: Number(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Цена под ключ (₽)</Label>
                <Input
                  type="number"
                  value={editing.priceRub}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      priceRub: Number(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Оценка аукциона</Label>
                <Input
                  value={editing.auctionGrade}
                  onChange={(e) =>
                    setEditing({ ...editing, auctionGrade: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Статус</Label>
                <Select
                  value={editing.status}
                  onValueChange={(v) =>
                    setEditing({ ...editing, status: v as CarStatus })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusEntries.map(([value, meta]) => (
                      <SelectItem key={value} value={value}>
                        {meta.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Отмена
            </Button>
            <Button onClick={save}>Сохранить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
