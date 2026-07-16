"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/#gallery", label: "Каталог" },
  { href: "/#calculator", label: "Калькуляторы" },
  { href: "/#process", label: "Как мы работаем" },
  { href: "/#reviews", label: "Отзывы" },
  { href: "/#faq", label: "Вопросы" },
  { href: "/#order", label: "Заказать авто" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-accent text-accent-foreground font-heading text-lg font-bold">
            赤
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-heading text-lg font-bold tracking-tight">
              Авто Монголия
            </span>
            {/*<span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Motors Japan
            </span>*/}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="tel:+78001234567"
            className="flex items-center gap-2 text-sm font-medium text-foreground"
          >
            <Phone className="h-4 w-4 text-accent" />8 800 123-45-67
          </a>
          <Button
            size="sm"
            nativeButton={false}
            render={<Link href="/#order" />}
          >
            Подобрать авто
          </Button>
        </div>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-md lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Меню"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-border/60 bg-background lg:hidden",
          open ? "max-h-96" : "max-h-0 border-t-0",
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-3">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-2.5 text-sm text-foreground hover:bg-secondary"
            >
              {l.label}
            </Link>
          ))}
          <Button
            className="mt-2"
            nativeButton={false}
            render={<Link href="/#order" onClick={() => setOpen(false)} />}
          >
            Подобрать авто
          </Button>
        </nav>
      </div>
    </header>
  );
}
