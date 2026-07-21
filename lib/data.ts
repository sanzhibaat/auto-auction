export type CarStatus =
  | "auction"
  | "purchased"
  | "port"
  | "shipping"
  | "warehouse"
  | "available"
  | "sold";

export const statusMeta: Record<
  CarStatus,
  {
    label: string;
    step: number;
    tone: "neutral" | "progress" | "ready" | "done";
  }
> = {
  auction: { label: "На аукционе", step: 1, tone: "neutral" },
  purchased: { label: "Выкуплен", step: 2, tone: "progress" },
  port: { label: "В порту Японии", step: 3, tone: "progress" },
  shipping: { label: "В пути морем", step: 4, tone: "progress" },
  warehouse: { label: "На складе во Владивостоке", step: 5, tone: "progress" },
  available: { label: "В наличии", step: 6, tone: "ready" },
  sold: { label: "Продан", step: 7, tone: "done" },
};

export type Car = {
  id: string;
  make: string;
  model: string;
  year: number;
  mileage: number; // km
  engine: number; // liters
  fuel: "Бензин" | "Гибрид" | "Дизель" | "Электро";
  transmission: "АКПП" | "МКПП" | "Вариатор";
  drive: "Передний" | "Задний" | "Полный";
  color: string;
  priceJpy: number; // auction estimate in JPY
  priceRub: number; // turnkey estimate in RUB
  status: CarStatus;
  auctionGrade: string; // e.g. "4.5"
  auctionHouse: string;
  location: string;
  images: string[];
  featured?: boolean;
  sheet: {
    exterior: string;
    interior: string;
    notes: string[];
    diagram: { code: string; part: string; note: string }[];
  };
};

function img(w: number, h: number, q: string) {
  return `/placeholder.svg?height=${h}&width=${w}&query=${encodeURIComponent(q)}`;
}

export const cars: Car[] = [
  {
    id: "toyota-mark-x-2014",
    make: "Toyota",
    model: "Mark X 250G",
    year: 2014,
    mileage: 78000,
    engine: 2.5,
    fuel: "Бензин",
    transmission: "АКПП",
    drive: "Задний",
    color: "Чёрный перламутр",
    priceJpy: 980000,
    priceRub: 1890000,
    status: "available",
    auctionGrade: "4.5",
    auctionHouse: "USS Tokyo",
    location: "Улан-Батор",
    featured: true,
    images: [
      "/toyota-mark-x-2014.webp",
      img(900, 600, "toyota mark x interior dashboard"),
      img(900, 600, "toyota mark x rear view"),
    ],
    sheet: {
      exterior: "B",
      interior: "B",
      notes: [
        "Один владелец",
        "Полная история обслуживания",
        "Сколов и ржавчины нет",
      ],
      diagram: [
        { code: "A1", part: "Передний бампер", note: "Мелкая царапина" },
        { code: "U2", part: "Заднее крыло", note: "Вмятина без покраски" },
      ],
    },
  },
  {
    id: "honda-fit-hybrid-2017",
    make: "Honda",
    model: "Fit Hybrid",
    year: 2017,
    mileage: 52000,
    engine: 1.5,
    fuel: "Гибрид",
    transmission: "Вариатор",
    drive: "Передний",
    color: "Белый",
    priceJpy: 620000,
    priceRub: 1190000,
    status: "shipping",
    auctionGrade: "4",
    auctionHouse: "TAA Yokohama",
    location: "В пути морем",
    featured: true,
    images: [
      img(900, 600, "white honda fit hybrid hatchback"),
      img(900, 600, "honda fit interior"),
    ],
    sheet: {
      exterior: "A",
      interior: "B",
      notes: ["Тяговая батарея в норме", "Некуренный салон"],
      diagram: [{ code: "A3", part: "Капот", note: "Скол краски" }],
    },
  },
  {
    id: "mazda-cx5-2016",
    make: "Mazda",
    model: "CX-5 XD AWD",
    year: 2016,
    mileage: 96000,
    engine: 2.2,
    fuel: "Дизель",
    transmission: "АКПП",
    drive: "Полный",
    color: "Красный металлик",
    priceJpy: 1150000,
    priceRub: 2290000,
    status: "warehouse",
    auctionGrade: "4",
    auctionHouse: "USS Nagoya",
    location: "Владивосток",
    featured: true,
    images: [
      img(900, 600, "red mazda cx-5 suv soul red"),
      img(900, 600, "mazda cx-5 interior dashboard"),
      img(900, 600, "mazda cx-5 cargo trunk"),
    ],
    sheet: {
      exterior: "B",
      interior: "A",
      notes: ["Полный привод", "Зимняя резина в комплекте"],
      diagram: [
        { code: "E1", part: "Дверь водителя", note: "Притёртость" },
        { code: "W2", part: "Лобовое стекло", note: "Скол" },
      ],
    },
  },
  {
    id: "subaru-forester-2015",
    make: "Subaru",
    model: "Forester 2.0i-L",
    year: 2015,
    mileage: 110000,
    engine: 2.0,
    fuel: "Бензин",
    transmission: "Вариатор",
    drive: "Полный",
    color: "Серебристый",
    priceJpy: 870000,
    priceRub: 1750000,
    status: "port",
    auctionGrade: "3.5",
    auctionHouse: "ARAI Bayside",
    location: "Порт Отару",
    images: [
      img(900, 600, "silver subaru forester suv"),
      img(900, 600, "subaru forester interior"),
    ],
    sheet: {
      exterior: "C",
      interior: "B",
      notes: [
        "Полный привод symmetrical AWD",
        "Требует замены передних колодок",
      ],
      diagram: [
        { code: "U4", part: "Задний бампер", note: "Глубокая царапина" },
      ],
    },
  },
  {
    id: "nissan-note-epower-2018",
    make: "Nissan",
    model: "Note e-POWER",
    year: 2018,
    mileage: 41000,
    engine: 1.2,
    fuel: "Гибрид",
    transmission: "Вариатор",
    drive: "Передний",
    color: "Синий",
    priceJpy: 700000,
    priceRub: 1350000,
    status: "purchased",
    auctionGrade: "4.5",
    auctionHouse: "USS Tokyo",
    location: "Аукционная площадка",
    images: [
      img(900, 600, "blue nissan note e-power hatchback"),
      img(900, 600, "nissan note interior"),
    ],
    sheet: {
      exterior: "A",
      interior: "A",
      notes: ["Гибрид e-POWER", "Идеальное состояние"],
      diagram: [],
    },
  },
  {
    id: "lexus-rx450h-2015",
    make: "Lexus",
    model: "RX 450h",
    year: 2015,
    mileage: 89000,
    engine: 3.5,
    fuel: "Гибрид",
    transmission: "Вариатор",
    drive: "Полный",
    color: "Белый перламутр",
    priceJpy: 2100000,
    priceRub: 3690000,
    status: "auction",
    auctionGrade: "4.5",
    auctionHouse: "USS Tokyo",
    location: "Аукцион USS",
    featured: true,
    images: [
      img(900, 600, "white pearl lexus rx450h luxury suv"),
      img(900, 600, "lexus rx interior luxury leather"),
      img(900, 600, "lexus rx rear three quarter"),
    ],
    sheet: {
      exterior: "A",
      interior: "A",
      notes: [
        "Премиум комплектация",
        "Кожаный салон",
        "Камеры кругового обзора",
      ],
      diagram: [{ code: "A2", part: "Переднее крыло", note: "Полировка" }],
    },
  },
  {
    id: "toyota-prius-2019",
    make: "Toyota",
    model: "Prius 50",
    year: 2019,
    mileage: 63000,
    engine: 1.8,
    fuel: "Гибрид",
    transmission: "Вариатор",
    drive: "Передний",
    color: "Серый",
    priceJpy: 1250000,
    priceRub: 2150000,
    status: "available",
    auctionGrade: "5",
    auctionHouse: "TAA Kinki",
    location: "Владивосток",
    images: [
      img(900, 600, "grey toyota prius 50 hybrid"),
      img(900, 600, "toyota prius interior"),
    ],
    sheet: {
      exterior: "A",
      interior: "A",
      notes: ["Состояние нового авто", "Безаварийный"],
      diagram: [],
    },
  },
  {
    id: "suzuki-jimny-2020",
    make: "Suzuki",
    model: "Jimny JC",
    year: 2020,
    mileage: 28000,
    engine: 0.66,
    fuel: "Бензин",
    transmission: "МКПП",
    drive: "Полный",
    color: "Хаки",
    priceJpy: 1450000,
    priceRub: 2390000,
    status: "sold",
    auctionGrade: "5",
    auctionHouse: "USS Osaka",
    location: "Продан в Москву",
    images: [
      img(900, 600, "khaki suzuki jimny kei car offroad"),
      img(900, 600, "suzuki jimny interior"),
    ],
    sheet: {
      exterior: "A",
      interior: "A",
      notes: ["Редкая комплектация", "Не эксплуатировался на бездорожье"],
      diagram: [],
    },
  },
];

export const processSteps = [
  {
    n: 1,
    title: "Заявка и подбор",
    text: "Вы оставляете параметры: марка, бюджет, год. Мы подбираем варианты с японских аукционов под ваш запрос.",
  },
  {
    n: 2,
    title: "Оценка аукционного листа",
    text: "Проверяем реальный аукционный лист, фото и оценку состояния. Рассказываем о всех дефектах честно.",
  },
  {
    n: 3,
    title: "Ставка и выкуп",
    text: "Согласуем максимальную ставку и участвуем в торгах. Покупаем авто только с вашего одобрения.",
  },
  {
    n: 4,
    title: "Логистика и доставка",
    text: "Организуем фрахт, морскую доставку до Владивостока и при необходимости — до вашего города.",
  },
  {
    n: 5,
    title: "Таможня и оформление",
    text: "Проходим таможенное оформление, оплачиваем пошлины и утильсбор, оформляем документы.",
  },
  {
    n: 6,
    title: "Передача автомобиля",
    text: "Вы получаете готовый к постановке на учёт автомобиль с полным пакетом документов.",
  },
];

export type Review = {
  id: string;
  name: string;
  city: string;
  car: string;
  rating: number;
  text: string;
  date: string;
  avatar: string;
};

export const siteReviews: Review[] = [
  {
    id: "r1",
    name: "Алексей М.",
    city: "Хабаровск",
    car: "Toyota Mark X",
    rating: 5,
    text: "Привезли Mark X точно в срок. Аукционный лист совпал с реальным состоянием на 100%. Расчёт под ключ не изменился ни на рубль.",
    date: "12.03.2026",
    avatar: img(120, 120, "portrait man smiling"),
  },
  {
    id: "r2",
    name: "Ирина С.",
    city: "Новосибирск",
    car: "Honda Fit Hybrid",
    rating: 5,
    text: "Первый раз заказывала авто из Японии и очень переживала. Менеджер вёл на каждом этапе, присылал фото из порта. Машина — как новая.",
    date: "28.02.2026",
    avatar: img(120, 120, "portrait woman smiling"),
  },
  {
    id: "r3",
    name: "Дмитрий К.",
    city: "Иркутск",
    car: "Mazda CX-5 XD",
    rating: 4,
    text: "Дизельный CX-5 в отличном состоянии. Чуть задержалась доставка из-за погоды, но команда честно предупредила заранее.",
    date: "15.02.2026",
    avatar: img(120, 120, "portrait man casual"),
  },
  {
    id: "r4",
    name: "Сергей В.",
    city: "Краснодар",
    car: "Lexus RX 450h",
    rating: 5,
    text: "Брал премиальный RX, боялся скрытых проблем. Прислали полный отчёт и видео. Всё прозрачно, рекомендую.",
    date: "05.02.2026",
    avatar: img(120, 120, "portrait older man"),
  },
];

export type SocialReview = {
  id: string;
  network: "VK" | "Telegram" | "Drom" | "Avito";
  name: string;
  text: string;
  date: string;
  link: string;
};

export const socialReviews: SocialReview[] = [
  {
    id: "s1",
    network: "Drom",
    name: "user_vladauto",
    text: "Заказывал Subaru Forester. Всё чётко, отчёты по логистике приходили каждую неделю. 5 звёзд.",
    date: "Март 2026",
    link: "#",
  },
  {
    id: "s2",
    network: "VK",
    name: "Марина Л.",
    text: "Спасибо за Nissan Note e-Power! Машина супер экономичная, состояние идеальное.",
    date: "Февраль 2026",
    link: "#",
  },
  {
    id: "s3",
    network: "Telegram",
    name: "@kuzmin_a",
    text: "Ребята помогли разобраться с растаможкой, посчитали всё заранее. Никаких сюрпризов по цене.",
    date: "Февраль 2026",
    link: "#",
  },
  {
    id: "s4",
    network: "Avito",
    name: "Андрей П.",
    text: "Брал Prius 2019 — машина без нареканий, документы оформили быстро. Буду обращаться ещё.",
    date: "Январь 2026",
    link: "#",
  },
];

export const faqItems = [
  {
    q: "Сколько времени занимает доставка авто из Японии?",
    a: "В среднем от 4 до 8 недель с момента выкупа на аукционе: морская доставка до Владивостока занимает 2–3 недели, далее таможенное оформление и доставка до вашего города.",
  },
  {
    q: "Можно ли увидеть реальное состояние авто до покупки?",
    a: "Да. Мы предоставляем оригинальный аукционный лист с независимой оценкой состояния, все фотографии и при необходимости дополнительное видео. Ничего не скрываем.",
  },
  {
    q: "Что входит в цену «под ключ»?",
    a: "Стоимость авто на аукционе, аукционные и брокерские сборы, фрахт и морская доставка, таможенная пошлина, утилизационный сбор и оформление документов. Итоговая сумма фиксируется в договоре.",
  },
  {
    q: "Какие гарантии вы даёте?",
    a: "Мы работаем по договору, в котором прописана фиксированная цена и сроки. Если состояние авто не соответствует аукционному листу — компенсируем разницу.",
  },
  {
    q: "Нужна ли предоплата?",
    a: "Для участия в торгах вносится депозит, который засчитывается в стоимость авто. Остаток оплачивается по этапам, прописанным в договоре.",
  },
  {
    q: "Помогаете ли с постановкой на учёт?",
    a: "Да, мы передаём полный пакет документов, готовый для постановки на учёт в ГИБДД, и консультируем по всем вопросам.",
  },
];

export const stats = [
  { value: "1200+", label: "авто привезено" },
  { value: "9 лет", label: "на рынке" },
  { value: "60+", label: "городов доставки" },
  { value: "4.9", label: "средняя оценка" },
];
