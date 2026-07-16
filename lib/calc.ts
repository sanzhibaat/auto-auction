// Упрощённые демонстрационные расчёты. Реальные ставки уточняются у менеджера.

export const JPY_TO_RUB = 0.62; // демо-курс

export type FuelType = "petrol" | "hybrid" | "diesel" | "electric";
export type AgeGroup = "lt3" | "3to5" | "gt5";

export function formatRub(value: number) {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

export function formatJpy(value: number) {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

// Демо-расчёт таможенной пошлины для физлиц (личное пользование)
export function calcCustoms({
  ageGroup,
  engineCc,
  fuel,
  priceRub,
}: {
  ageGroup: AgeGroup;
  engineCc: number;
  fuel: FuelType;
  priceRub: number;
}) {
  // Ставка за см3 (руб) — упрощённые коэффициенты для демонстрации
  let perCc = 0;
  if (ageGroup === "lt3") {
    // для новых считается % от стоимости, упрощаем фиксированной ставкой
    perCc = fuel === "diesel" ? 3.2 : 2.7;
  } else if (ageGroup === "3to5") {
    perCc = fuel === "diesel" ? 3.6 : 3.0;
  } else {
    perCc = fuel === "diesel" ? 5.7 : 4.8;
  }

  const electricFactor = fuel === "electric" ? 0 : 1;
  const duty = engineCc * perCc * electricFactor;

  // Утилизационный сбор (демо)
  let utilFee = ageGroup === "lt3" ? 3400 : 5200;
  if (engineCc > 3000) utilFee *= 2;

  // Таможенный сбор за оформление (демо, по стоимости)
  const clearanceFee =
    priceRub > 2700000 ? 11500 : priceRub > 1200000 ? 8530 : 4269;

  const total = duty + utilFee + clearanceFee;
  return { duty, utilFee, clearanceFee, total };
}

// Демо-расчёт стоимости "под ключ"
export function calcTurnkey({
  auctionPriceJpy,
  fuel,
  ageGroup,
  engineCc,
  deliveryRub,
}: {
  auctionPriceJpy: number;
  fuel: FuelType;
  ageGroup: AgeGroup;
  engineCc: number;
  deliveryRub: number;
}) {
  const carRub = auctionPriceJpy * JPY_TO_RUB;
  const auctionFee = 55000; // аукционный + брокерский сбор (демо)
  const freight = 95000; // фрахт + морская доставка до Владивостока (демо)
  const priceForCustoms = carRub;
  const customs = calcCustoms({
    ageGroup,
    engineCc,
    fuel,
    priceRub: priceForCustoms,
  });
  const serviceFee = 60000; // услуги компании (демо)

  const total =
    carRub + auctionFee + freight + customs.total + serviceFee + deliveryRub;
  return {
    carRub,
    auctionFee,
    freight,
    customsTotal: customs.total,
    customsBreakdown: customs,
    serviceFee,
    deliveryRub,
    total,
  };
}
