export type Lead = {
  id: string;
  name: string;
  phone: string;
  city: string;
  car: string;
  budget: string;
  type: "order" | "contact";
  status: "new" | "in_progress" | "done";
  date: string;
};

export const demoLeads: Lead[] = [
  {
    id: "l1",
    name: "Олег Назаров",
    phone: "+7 914 555-12-34",
    city: "Владивосток",
    car: "Toyota Mark X 250G",
    budget: "1,5–2,5 млн ₽",
    type: "order",
    status: "new",
    date: "22.06.2026 10:24",
  },
  {
    id: "l2",
    name: "Екатерина Лис",
    phone: "+7 923 444-87-01",
    city: "Новосибирск",
    car: "Honda Fit Hybrid",
    budget: "до 1,5 млн ₽",
    type: "order",
    status: "in_progress",
    date: "21.06.2026 18:02",
  },
  {
    id: "l3",
    name: "Михаил Гордеев",
    phone: "+7 902 333-22-11",
    city: "Иркутск",
    car: "Уточнить по телефону",
    budget: "—",
    type: "contact",
    status: "new",
    date: "21.06.2026 14:47",
  },
  {
    id: "l4",
    name: "Анна Соловьёва",
    phone: "+7 905 111-99-88",
    city: "Краснодар",
    car: "Lexus RX 450h",
    budget: "от 4 млн ₽",
    type: "order",
    status: "done",
    date: "19.06.2026 09:15",
  },
];

export const leadStatusMeta: Record<
  Lead["status"],
  { label: string; className: string }
> = {
  new: { label: "Новая", className: "bg-accent/10 text-accent" },
  in_progress: {
    label: "В работе",
    className: "bg-foreground/5 text-foreground",
  },
  done: { label: "Завершена", className: "bg-muted text-muted-foreground" },
};

export type PendingReview = {
  id: string;
  name: string;
  car: string;
  rating: number;
  text: string;
  date: string;
};

export const demoPendingReviews: PendingReview[] = [
  {
    id: "pr1",
    name: "Виктор Зимин",
    car: "Subaru Forester",
    rating: 5,
    text: "Привезли Forester в идеале, всё как договаривались. Спасибо команде!",
    date: "20.06.2026",
  },
  {
    id: "pr2",
    name: "Гость",
    car: "Toyota Prius",
    rating: 4,
    text: "Хорошая машина, но хотелось бы чуть быстрее по срокам.",
    date: "18.06.2026",
  },
];
