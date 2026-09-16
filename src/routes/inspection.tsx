import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, ClipboardCheck, Gauge, ScanLine, ShieldCheck, Wrench } from "lucide-react";

import { Button } from "@/components/ui/button";
import otkBay from "@/assets/otk-bay.jpg";

export const Route = createFileRoute("/inspection")({
  head: () => ({
    meta: [
      { title: "Техогляд ОТК — власний цех перевірки авто | IMUA" },
      {
        name: "description",
        content:
          "Власний цех техогляду ОТК: сертифікована перевірка за 100+ пунктами, діагностика двигуна та шасі, офіційний протокол перед передачею авто клієнту.",
      },
      { property: "og:title", content: "Техогляд ОТК у власному цеху — IMUA" },
      {
        property: "og:description",
        content:
          "Діагностика шасі та двигуна, товщинометрія кузова, перевірка пробігу і офіційний протокол у форматі DEKRA.",
      },
    ],
  }),
  component: InspectionPage,
});

const blocks = [
  {
    icon: ScanLine,
    title: "Перевірка ідентичності та пробігу",
    text: "Звірка VIN, читання блоків керування, аналіз сервісної історії та підтвердження реального пробігу.",
  },
  {
    icon: Activity,
    title: "Комп'ютерна діагностика",
    text: "Сканування всіх електронних блоків, помилки в пам'яті, тест акумулятора та зарядної системи.",
  },
  {
    icon: Wrench,
    title: "Шасі та підвіска на підйомнику",
    text: "Люфти, стан рульового, гальмівних дисків, підшипників, амортизаторів і сайлентблоків.",
  },
  {
    icon: Gauge,
    title: "Двигун і трансмісія",
    text: "Компресія, тиск масла, стан ГРМ, тест АКПП під навантаженням, перевірка турбіни та сажового фільтра.",
  },
  {
    icon: ShieldCheck,
    title: "Кузов і геометрія",
    text: "Товщинометрія по всіх елементах, перевірка зазорів, слідів ремонту та геометрії кузова.",
  },
  {
    icon: ClipboardCheck,
    title: "Офіційний протокол",
    text: "Підсумковий звіт у форматі DEKRA з фотофіксацією, оцінкою кожного вузла та рекомендаціями.",
  },
];

function InspectionPage() {
  return (
    <div>
      <section className="surface-navy">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-accent">Власний цех · Техогляд ОТК</p>
            <h1 className="mt-3 text-3xl font-bold text-navy-foreground sm:text-4xl">
              100+ пунктів перевірки перед передачею авто
            </h1>
            <p className="mt-4 text-sm text-navy-foreground/75">
              Ми не покладаємось на чужі звіти. Кожен фургон і кожне корпоративне авто проходить
              перевірку на власному обладнаному посту: підйомник, діагностичні сканери, стенд
              гальмівної системи, товщиномір і люфт-детектор. Результат — офіційний протокол, який
              ви отримуєте разом із рахунком.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild variant="secondary">
                <Link to="/stock">Дивитися авто в наявності</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/custom-order">Замовити перевірку авто</Link>
              </Button>
            </div>
          </div>
          <img
            src={otkBay}
            alt="Цех техогляду ОТК: фургон на підйомнику та технік із планшетом"
            loading="lazy"
            width={1280}
            height={854}
            className="rounded-md object-cover"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-bold sm:text-3xl">Що входить у протокол ОТК</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {blocks.map((b) => (
            <div key={b.title} className="panel rounded-md p-6">
              <b.icon className="h-6 w-6 text-accent" />
              <h3 className="mt-4 text-base font-semibold">{b.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="panel rounded-md p-6 sm:p-8">
          <h2 className="text-xl font-bold">Приклад підсумкової оцінки</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Демонстраційний фрагмент протоколу — у реальному звіті кожен пункт супроводжується
            фотофіксацією.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Двигун і навісне", "Без зауважень"],
              ["Гальмівна система", "Диски 78% ресурсу"],
              ["Кузов", "Фарбування правих дверей"],
              ["Електроніка", "Помилок не виявлено"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-sm bg-secondary p-4">
                <p className="eyebrow text-muted-foreground">{k}</p>
                <p className="mt-2 text-sm font-semibold text-foreground">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
