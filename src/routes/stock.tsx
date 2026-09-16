import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SlidersHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { InquiryDialog } from "@/components/vehicles/InquiryDialog";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import {
  FUEL_LABELS,
  STATUS_LABELS,
  TRANSMISSION_LABELS,
  TYPE_LABELS,
  allYears,
  brandModelMap,
  formatKm,
  formatUsd,
  priceWithoutVat,
  vehicles,
  type Fuel,
  type Transmission,
  type Vehicle,
  type VehicleStatus,
  type VehicleType,
} from "@/data/vehicles";

export const Route = createFileRoute("/stock")({
  head: () => ({
    meta: [
      { title: "Комерційні авто в наявності — IMUA" },
      {
        name: "description",
        content:
          "Каталог перевірених комерційних фургонів та корпоративних авто в наявності: техогляд ОТК, підтверджений пробіг, ціни з ПДВ та рахунок на юридичну особу.",
      },
      { property: "og:title", content: "Комерційні авто в наявності — IMUA" },
      {
        property: "og:description",
        content:
          "Фургони Renault Master, Mercedes Sprinter, VW Crafter та корпоративні авто з власним техоглядом ОТК і документами з ПДВ.",
      },
    ],
  }),
  component: StockPage,
});

type Sort = "price_asc" | "price_desc" | "year_desc" | "mileage_asc" | "added_desc";

const MAX_PRICE = 50000;
const MAX_MILEAGE = 200000;

function StockPage() {
  const [showVat, setShowVat] = useState(true);
  const [types, setTypes] = useState<VehicleType[]>([]);
  const [brand, setBrand] = useState("all");
  const [model, setModel] = useState("all");
  const [priceMax, setPriceMax] = useState(MAX_PRICE);
  const [years, setYears] = useState<number[]>([]);
  const [mileageMax, setMileageMax] = useState(MAX_MILEAGE);
  const [fuels, setFuels] = useState<Fuel[]>([]);
  const [gearboxes, setGearboxes] = useState<Transmission[]>([]);
  const [statuses, setStatuses] = useState<VehicleStatus[]>([]);
  const [sort, setSort] = useState<Sort>("added_desc");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [active, setActive] = useState<Vehicle | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const toggle = <T,>(list: T[], set: (v: T[]) => void, value: T) =>
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  const results = useMemo(() => {
    const filtered = vehicles.filter((v) => {
      const price = showVat ? v.priceUsd : priceWithoutVat(v.priceUsd);
      if (types.length && !types.includes(v.vehicleType)) return false;
      if (brand !== "all" && v.brand !== brand) return false;
      if (model !== "all" && v.model !== model) return false;
      if (price > priceMax) return false;
      if (years.length && !years.includes(v.year)) return false;
      if (v.mileageKm > mileageMax) return false;
      if (fuels.length && !fuels.includes(v.fuel)) return false;
      if (gearboxes.length && !gearboxes.includes(v.transmission)) return false;
      if (statuses.length && !statuses.includes(v.status)) return false;
      return true;
    });

    return [...filtered].sort((a, b) => {
      switch (sort) {
        case "price_asc":
          return a.priceUsd - b.priceUsd;
        case "price_desc":
          return b.priceUsd - a.priceUsd;
        case "year_desc":
          return b.year - a.year;
        case "mileage_asc":
          return a.mileageKm - b.mileageKm;
        default:
          return b.addedAt.localeCompare(a.addedAt);
      }
    });
  }, [showVat, types, brand, model, priceMax, years, mileageMax, fuels, gearboxes, statuses, sort]);

  const reset = () => {
    setTypes([]);
    setBrand("all");
    setModel("all");
    setPriceMax(MAX_PRICE);
    setYears([]);
    setMileageMax(MAX_MILEAGE);
    setFuels([]);
    setGearboxes([]);
    setStatuses([]);
  };

  const filterPanel = (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3 rounded-sm bg-secondary px-3 py-2.5">
        <Label htmlFor="vat" className="text-sm font-medium">
          {showVat ? "Ціна з ПДВ" : "Ціна без ПДВ"}
        </Label>
        <Switch id="vat" checked={showVat} onCheckedChange={setShowVat} />
      </div>

      <FilterGroup title="Тип транспорту">
        {(Object.keys(TYPE_LABELS) as VehicleType[]).map((t) => (
          <CheckRow
            key={t}
            id={`t-${t}`}
            label={TYPE_LABELS[t]}
            hint={t === "van" ? "основний напрямок" : undefined}
            checked={types.includes(t)}
            onChange={() => toggle(types, setTypes, t)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Марка та модель">
        <Select
          value={brand}
          onValueChange={(v) => {
            setBrand(v);
            setModel("all");
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Марка" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Усі марки</SelectItem>
            {Object.keys(brandModelMap)
              .sort()
              .map((b) => (
                <SelectItem key={b} value={b}>
                  {b}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        <Select value={model} onValueChange={setModel} disabled={brand === "all"}>
          <SelectTrigger>
            <SelectValue placeholder="Модель" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Усі моделі</SelectItem>
            {(brandModelMap[brand] ?? []).map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterGroup>

      <FilterGroup title={`Ціна до ${formatUsd(priceMax)}`}>
        <Slider
          value={[priceMax]}
          min={10000}
          max={MAX_PRICE}
          step={500}
          onValueChange={(v) => setPriceMax(v[0] ?? MAX_PRICE)}
        />
      </FilterGroup>

      <FilterGroup title="Рік випуску">
        <div className="grid grid-cols-2 gap-2">
          {allYears.map((y) => (
            <CheckRow
              key={y}
              id={`y-${y}`}
              label={String(y)}
              checked={years.includes(y)}
              onChange={() => toggle(years, setYears, y)}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title={`Пробіг до ${formatKm(mileageMax)}`}>
        <Slider
          value={[mileageMax]}
          min={20000}
          max={MAX_MILEAGE}
          step={5000}
          onValueChange={(v) => setMileageMax(v[0] ?? MAX_MILEAGE)}
        />
      </FilterGroup>

      <FilterGroup title="Пальне">
        {(Object.keys(FUEL_LABELS) as Fuel[]).map((f) => (
          <CheckRow
            key={f}
            id={`f-${f}`}
            label={FUEL_LABELS[f]}
            checked={fuels.includes(f)}
            onChange={() => toggle(fuels, setFuels, f)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Коробка передач">
        {(Object.keys(TRANSMISSION_LABELS) as Transmission[]).map((t) => (
          <CheckRow
            key={t}
            id={`g-${t}`}
            label={TRANSMISSION_LABELS[t]}
            checked={gearboxes.includes(t)}
            onChange={() => toggle(gearboxes, setGearboxes, t)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Статус">
        {(Object.keys(STATUS_LABELS) as VehicleStatus[]).map((s) => (
          <CheckRow
            key={s}
            id={`s-${s}`}
            label={STATUS_LABELS[s]}
            checked={statuses.includes(s)}
            onChange={() => toggle(statuses, setStatuses, s)}
          />
        ))}
      </FilterGroup>

      <Separator />
      <Button variant="outline" className="w-full" onClick={reset}>
        Скинути фільтри
      </Button>
    </div>
  );

  return (
    <div>
      <section className="surface-navy">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <p className="eyebrow text-accent">Склад IMUA</p>
          <h1 className="mt-3 max-w-2xl text-3xl font-bold text-navy-foreground sm:text-4xl">
            Комерційні авто в наявності
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-navy-foreground/70">
            Кожна одиниця проходить власний техогляд ОТК за протоколом 100+ пунктів. Ціни вказані в
            USD, документи — на юридичну особу з ПДВ.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-8 lg:flex-row">
          <aside className="lg:w-72 lg:shrink-0">
            <Button
              variant="outline"
              className="w-full lg:hidden"
              onClick={() => setFiltersOpen((v) => !v)}
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              {filtersOpen ? "Сховати фільтри" : "Фільтри"}
            </Button>
            <div className={`${filtersOpen ? "mt-4 block" : "hidden"} panel rounded-md p-5 lg:block lg:sticky lg:top-24`}>
              {filterPanel}
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground">
                Знайдено <span className="font-semibold text-foreground">{results.length}</span> авто
              </p>
              <div className="flex items-center gap-2">
                <span className="hidden text-sm text-muted-foreground sm:inline">Сортування:</span>
                <Select value={sort} onValueChange={(v) => setSort(v as Sort)}>
                  <SelectTrigger className="w-56">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="added_desc">Дата додавання</SelectItem>
                    <SelectItem value="price_asc">Ціна: від дешевих</SelectItem>
                    <SelectItem value="price_desc">Ціна: від дорогих</SelectItem>
                    <SelectItem value="year_desc">Рік: новіші</SelectItem>
                    <SelectItem value="mileage_asc">Пробіг: менший</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {results.length === 0 ? (
              <div className="panel rounded-md p-12 text-center">
                <h2 className="text-lg font-semibold">Нічого не знайдено</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Спробуйте змінити фільтри або оформіть авто під замовлення.
                </p>
                <Button className="mt-5" onClick={reset}>
                  Скинути фільтри
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {results.map((v) => (
                  <VehicleCard
                    key={v.id}
                    vehicle={v}
                    showVat={showVat}
                    onInquire={(veh) => {
                      setActive(veh);
                      setDialogOpen(true);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <InquiryDialog vehicle={active} open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2.5">
      <h2 className="eyebrow text-muted-foreground">{title}</h2>
      {children}
    </div>
  );
}

function CheckRow({
  id,
  label,
  hint,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  hint?: string | undefined;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id={id} checked={checked} onCheckedChange={onChange} />
      <Label htmlFor={id} className="text-sm font-normal">
        {label}
      </Label>
      {hint && (
        <Badge variant="outline" className="rounded-sm text-[10px] uppercase">
          {hint}
        </Badge>
      )}
    </div>
  );
}
