import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, FileSpreadsheet, Handshake, PackageCheck, Percent, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/b2b")({
  head: () => ({
    meta: [
      { title: "B2B рішення для автопарку — IMUA" },
      {
        name: "description",
        content:
          "Постачання автопарку для SME: рахунок на юридичну особу з ПДВ, оптові умови, лізинг-партнери, сервісна підтримка та trade-in комерційного транспорту.",
      },
      { property: "og:title", content: "B2B рішення для автопарку — IMUA" },
      {
        property: "og:description",
        content:
          "Комплексне оснащення автопарку українських компаній: документи з ПДВ, оптові умови, лізинг і сервіс.",
      },
    ],
  }),
  component: B2BPage,
});

const solutions = [
  {
    icon: FileSpreadsheet,
    title: "Документи з ПДВ",
    text: "Рахунок, видаткова, акт, податкова накладна. Прозоре оформлення на ТОВ або ФОП без сірих схем.",
  },
  {
    icon: Truck,
    title: "Оснащення автопарку партіями",
    text: "Від 3 до 30 одиниць за узгодженим графіком постачання з фіксованою специфікацією.",
  },
  {
    icon: Percent,
    title: "Оптові умови та лізинг",
    text: "Спеціальні ціни на партії, робота з лізинговими та банківськими партнерами.",
  },
  {
    icon: PackageCheck,
    title: "Дообладнання під задачу",
    text: "Стелажі, ізотерма, холодильна установка, брендування, GPS-моніторинг і тахографи.",
  },
  {
    icon: Handshake,
    title: "Trade-in і викуп",
    text: "Оцінка та викуп ваших старих фургонів із зарахуванням у нову покупку.",
  },
  {
    icon: Building2,
    title: "Персональний менеджер",
    text: "Один контакт на всі питання: підбір, документи, сервіс, гарантійні звернення.",
  },
];

function B2BPage() {
  return (
    <div>
      <section className="surface-navy">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <p className="eyebrow text-accent">B2B напрямок</p>
          <h1 className="mt-3 max-w-2xl text-3xl font-bold text-navy-foreground sm:text-4xl">
            Рішення для автопарків малого та середнього бізнесу
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-navy-foreground/70">
            Ми працюємо тільки з бізнесом: логістика, доставка, будівництво, сервісні служби,
            фармацевтика, HoReCa. Розуміємо навантаження на техніку та економіку автопарку.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s) => (
            <div key={s.title} className="panel rounded-md p-6">
              <s.icon className="h-6 w-6 text-accent" />
              <h2 className="mt-4 text-base font-semibold">{s.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>

        <div className="panel mt-12 flex flex-col items-start justify-between gap-6 rounded-md p-8 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-bold">Потрібна пропозиція під ваш автопарк?</h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Надішліть параметри — розрахуємо варіанти з наявного складу та під замовлення, з
              цінами з ПДВ і без.
            </p>
          </div>
          <Button asChild size="lg">
            <Link to="/custom-order">Запросити пропозицію</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
