import { createFileRoute, Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import heroFleet from "@/assets/hero-fleet.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Про компанію INTRAMOTION UKRAINE (IMUA)" },
      {
        name: "description",
        content:
          "INTRAMOTION UKRAINE — постачальник комерційного транспорту для українського бізнесу: власний цех техогляду, імпорт зі США та ЄС, робота з юридичними особами.",
      },
      { property: "og:title", content: "Про компанію INTRAMOTION UKRAINE" },
      {
        property: "og:description",
        content:
          "Команда інженерів і фахівців з імпорту, які оснащують автопарки українських компаній перевіреною технікою.",
      },
    ],
  }),
  component: AboutPage,
});

const facts = [
  ["380+", "одиниць техніки передано клієнтам"],
  ["100+", "пунктів у протоколі техогляду ОТК"],
  ["9", "років на ринку комерційного транспорту"],
  ["2", "напрямки імпорту: США та ЄС"],
];

function AboutPage() {
  return (
    <div>
      <section className="surface-navy">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <p className="eyebrow text-accent">Про нас</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold text-navy-foreground sm:text-4xl">
            INTRAMOTION UKRAINE — інженерний підхід до комерційного транспорту
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-navy-foreground/75">
            Ми починали як сервіс діагностики комерційних фургонів, тому дивимось на авто очима
            техніка, а не продавця. Сьогодні IMUA — це склад перевіреної техніки, власний цех
            техогляду ОТК і команда, що веде імпорт із США та ЄС під ключ на юридичних осіб.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild variant="secondary">
              <Link to="/stock">Авто в наявності</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/b2b">B2B рішення</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map(([n, t]) => (
            <div key={t} className="panel rounded-md p-6">
              <p className="font-display text-3xl font-bold text-foreground">{n}</p>
              <p className="mt-2 text-sm text-muted-foreground">{t}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-2">
          <img
            src={heroFleet}
            alt="Автопарк комерційних фургонів на терміналі IMUA"
            loading="lazy"
            width={1920}
            height={1080}
            className="rounded-md object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold">Як ми працюємо</h2>
            <ol className="mt-5 space-y-4 text-sm text-muted-foreground">
              {[
                "Аналізуємо задачу автопарку: маршрути, навантаження, обʼєм вантажу, бюджет.",
                "Підбираємо техніку зі складу або відкриваємо замовлення на імпорт.",
                "Перевіряємо авто у власному цеху ОТК і надаємо офіційний протокол.",
                "Оформлюємо на юридичну особу з повним пакетом документів і ПДВ.",
                "Супроводжуємо після передачі: сервіс, запчастини, trade-in.",
              ].map((t, i) => (
                <li key={t} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-sm bg-primary text-xs font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  {t}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}
