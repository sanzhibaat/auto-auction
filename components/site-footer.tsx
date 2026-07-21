import Link from "next/link";
import { Phone, Mail, MapPin, Send, MessageCircle } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-foreground text-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-accent text-accent-foreground font-heading text-lg font-bold">
              赤
            </span>
            <span className="font-heading text-lg font-bold">
              Akihabara Motors
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-background/70">
            Подбор, выкуп и доставка подержанных автомобилей с аукционов Японии.
            Честные аукционные листы и прозрачные расчёты.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Разделы</h3>
          <ul className="mt-4 space-y-2 text-sm text-background/70">
            <li>
              <Link href="/#gallery" className="hover:text-background">
                Каталог авто
              </Link>
            </li>
            <li>
              <Link href="/#calculator" className="hover:text-background">
                Калькуляторы
              </Link>
            </li>
            <li>
              <Link href="/#process" className="hover:text-background">
                Процесс покупки
              </Link>
            </li>
            <li>
              <Link href="/#reviews" className="hover:text-background">
                Отзывы
              </Link>
            </li>
            <li>
              <Link href="/admin" className="hover:text-background">
                Админ-панель
              </Link>
            </li>
          </ul>
        </div>

        {/*<div>
          <h3 className="text-sm font-semibold">Контакты</h3>
          <ul className="mt-4 space-y-3 text-sm text-background/70">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-accent" />
              <a href="tel:+78001234567" className="hover:text-background">
                8 800 123-45-67
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-accent" />
              <a
                href="mailto:info@akihabara-motors.ru"
                className="hover:text-background"
              >
                info@akihabara-motors.ru
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-accent" />
              Владивосток, ул. Морская, 12
            </li>
          </ul>
        </div>*/}

        <div>
          <h3 className="text-sm font-semibold">Мы в соцсетях</h3>
          <div className="mt-4 flex gap-3">
            <a
              href="#"
              aria-label="Telegram"
              className="flex h-10 w-10 items-center justify-center rounded-md bg-background/10 hover:bg-accent"
            >
              <Send className="h-5 w-5" />
            </a>
            <a
              href="#"
              aria-label="WhatsApp"
              className="flex h-10 w-10 items-center justify-center rounded-md bg-background/10 hover:bg-accent"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
          </div>
          <p className="mt-6 text-xs text-background/50">
            Ежедневно с 9:00 до 20:00 (Улан-Удэ)
          </p>
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-background/50 sm:flex-row sm:px-6 lg:px-8">
          <p>© 2026 Akihabara Motors. Все права защищены.</p>
          <p>
            Цены носят ознакомительный характер и не являются публичной офертой.
          </p>
        </div>
      </div>
    </footer>
  );
}
