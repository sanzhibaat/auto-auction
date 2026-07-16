"use client";

import { useState } from "react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminCars } from "@/components/admin/admin-cars";
import { AdminLeads } from "@/components/admin/admin-leads";
import { AdminReviews } from "@/components/admin/admin-reviews";
import { Car, Inbox, Star, ArrowLeft, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  function login(e: React.FormEvent) {
    e.preventDefault();
    if (pin === "admin") {
      setAuthed(true);
      setError(false);
    } else {
      setError(true);
    }
  }

  if (!authed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-secondary px-4">
        <Card className="w-full max-w-sm p-6">
          <div className="mb-5 flex flex-col items-center gap-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
              <Lock className="h-6 w-6 text-accent" />
            </div>
            <h1 className="font-heading text-xl font-semibold text-foreground">
              Панель управления
            </h1>
            <p className="text-sm text-muted-foreground">
              Введите пароль для доступа
            </p>
          </div>
          <form onSubmit={login} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="pin">Пароль</Label>
              <Input
                id="pin"
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Демо-пароль: admin"
              />
              {error && (
                <p className="text-sm text-destructive">Неверный пароль</p>
              )}
            </div>
            <Button type="submit">Войти</Button>
            <Link
              href="/"
              className="text-center text-sm text-muted-foreground hover:text-foreground"
            >
              Вернуться на сайт
            </Link>
          </form>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-secondary">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="font-heading text-lg font-semibold text-foreground">
              Админ-панель
            </h1>
          </div>
          <span className="text-sm text-muted-foreground">АвтоМонголия</span>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6">
        <Tabs defaultValue="cars">
          <TabsList className="mb-6">
            <TabsTrigger value="cars" className="gap-1.5">
              <Car className="h-4 w-4" /> Автомобили
            </TabsTrigger>
            <TabsTrigger value="leads" className="gap-1.5">
              <Inbox className="h-4 w-4" /> Заявки
            </TabsTrigger>
            <TabsTrigger value="reviews" className="gap-1.5">
              <Star className="h-4 w-4" /> Отзывы
            </TabsTrigger>
          </TabsList>
          <TabsContent value="cars">
            <AdminCars />
          </TabsContent>
          <TabsContent value="leads">
            <AdminLeads />
          </TabsContent>
          <TabsContent value="reviews">
            <AdminReviews />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
