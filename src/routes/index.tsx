import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, FileSpreadsheet, Gauge, ShieldCheck, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { InquiryDialog } from "@/components/vehicles/InquiryDialog";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { vehicles, type Vehicle } from "@/data/vehicles";
import heroFleet from "@/assets/hero-fleet.jpg";
import otkBay from "@/assets/otk-bay.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IMUA — комерційні фургони та корпоративні авто для бізнесу" },
      {
        name: "description",
        content:
          "INTRAMOTION UKRAINE: перевірені комерційні фургони та корпоративні авто для українського бізнесу. Власний техогляд ОТК, підтверджений пробіг, імпорт під ключ, рахунок з ПДВ.",
      },
      {
        property: "og:title",
        content: "IMUA — комерційні фургони та корпоративні авто для бізнесу",
      },
      {
        property: "og:description",
        content:
          "Перевірені фургони для SME: техогляд ОТК у власному цеху, імпорт зі США та ЄС на юридичних осіб, документи з ПДВ.",
      },
    ],
  }),
  component: Index,
});

const badges = [
  { icon: ShieldCheck, text: "Власний техогляд ОТК" },
  { icon: Gauge, text: "Підтверджений низький пробіг" },
  { icon: Truck, text: "Імпорт під ключ на юросіб" },
  { icon: FileSpreadsheet, text: "Рахунок і ПДВ для B2B" },
];

function Index() {
  const [active, setActive] = useState<Vehicle | null>(null);
  const [open, setOpen] = useState(false);
  const featured = vehicles.filter((v) => v.status === "in_stock").slice(0, 3);

  return (
    <div>
      <section className="relative isolate overflow-hidden">
        <img
          src={heroFleet}
          alt="Автопарк комерційних фургонів на терміналі"
          width={1920}
          height={1080}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="surface-navy absolute inset-0 -z-10 opacity-85" />
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
          <p className="eyebrow text-accent">INTRAMOTION UKRAINE · B2B</p>
          <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight text-navy-foreground sm:text-5xl">
            Перевірені комерційні фургони та корпоративні авто для бізнесу
          </h1>
          <p className="mt-5 max-w-2xl text-base text-navy-foreground/80">
            Власний цех технічного огляду ОТК, підтверджений пробіг і повна підтримка з ПДВ.
            Оснащуємо автопарки SME технікою, якій можна довіряти щодня.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="secondary">
              <Link to="/stock">
                Дивитися авто в наявності <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/custom-order">Оформити під замовлення</Link>
            </Button>
          </div>

          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {badges.map((b) => (
              <li
                key={b.text}
                className="flex items-center gap-3 rounded-sm border border-navy-foreground/15 bg-navy/40 px-4 py-3 backdrop-blur"
              >
                <b.icon className="h-5 w-5 shrink-0 text-accent" />
                <span className="text-sm font-medium text-navy-foreground">{b.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-muted-foreground">Склад IMUA</p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Актуальні пропозиції</h2>
          </div>
          <Button asChild variant="outline">
            <Link to="/stock">Весь каталог</Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((v) => (
            <VehicleCard
              key={v.id}
              vehicle={v}
              showVat
              onInquire={(veh) => {
                setActive(veh);
                setOpen(true);
              }}
            />
          ))}
        </div>
      </section>

      <section className="surface-steel border-y border-border">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
          <img
            src={otkBay}
            alt="Технік перевіряє фургон на підйомнику в цеху ОТК"
            loading="lazy"
            width={1280}
            height={854}
            className="rounded-md object-cover"
          />
          <div>
            <p className="eyebrow text-muted-foreground">Техогляд ОТК</p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              Власний цех перевірки: 100+ пунктів до передачі
            </h2>
            <p className="mt-4 text-sm text-muted-foreground">
              Обладнаний пост із підйомником, діагностичними сканерами, товщиноміром і стендом
              гальмівної системи. Двигун, трансмісія, шасі та кузов перевіряються за сертифікованим
              протоколом, а ви отримуєте офіційний звіт у форматі DEKRA.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Підтвердження реального пробігу за блоками керування",
                "Діагностика двигуна та шасі на підйомнику",
                "Офіційний протокол з фотофіксацією кожного вузла",
              ].map((t) => (
                <li key={t} className="flex gap-2.5">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  <span className="text-muted-foreground">{t}</span>
                </li>
              ))}
            </ul>
            <Button asChild className="mt-7">
              <Link to="/inspection">Як проходить техогляд ОТК</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="panel flex flex-col items-start justify-between gap-6 rounded-md p-8 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-bold">Потрібен фургон, якого немає на складі?</h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Відкриємо індивідуальне замовлення на імпорт зі США або ЄС під вашу специфікацію — з
              перевіркою до купівлі та оформленням на компанію.
            </p>
          </div>
          <Button asChild size="lg">
            <Link to="/custom-order">Конфігурувати замовлення</Link>
          </Button>
        </div>
      </section>

      <InquiryDialog vehicle={active} open={open} onOpenChange={setOpen} />
    </div>
  );
}
