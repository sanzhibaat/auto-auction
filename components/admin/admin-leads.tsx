"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Phone } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { demoLeads, leadStatusMeta, type Lead } from "@/lib/admin-data";

export function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>(demoLeads);

  function setStatus(id: string, status: Lead["status"]) {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    toast.success("Статус заявки обновлён");
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-xl font-semibold">
            Заявки и заказы
          </h2>
          <p className="text-sm text-muted-foreground">
            {leads.filter((l) => l.status === "new").length} новых из{" "}
            {leads.length}
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4">
        {leads.map((lead) => (
          <div
            key={lead.id}
            className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-medium">{lead.name}</span>
                <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
                  {lead.type === "order" ? "Заказ авто" : "Обратная связь"}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {lead.car} · {lead.budget} · {lead.city}
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                <a
                  href={`tel:${lead.phone}`}
                  className="flex items-center gap-1 text-accent"
                >
                  <Phone className="h-3.5 w-3.5" />
                  {lead.phone}
                </a>
                <span className="text-xs text-muted-foreground">
                  {lead.date}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${leadStatusMeta[lead.status].className}`}
              >
                {leadStatusMeta[lead.status].label}
              </span>
              <Select
                value={lead.status}
                onValueChange={(v) => setStatus(lead.id, v as Lead["status"])}
              >
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">Новая</SelectItem>
                  <SelectItem value="in_progress">В работе</SelectItem>
                  <SelectItem value="done">Завершена</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
