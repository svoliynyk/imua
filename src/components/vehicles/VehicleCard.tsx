import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, FileDown, FileCheck2, Receipt } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FUEL_LABELS,
  STATUS_LABELS,
  TRANSMISSION_LABELS,
  formatKm,
  formatUsd,
  priceWithoutVat,
  type Vehicle,
} from "@/data/vehicles";
import { downloadSpecSheet } from "@/lib/spec-sheet";

const statusClass: Record<Vehicle["status"], string> = {
  in_stock: "bg-success text-success-foreground",
  reserved: "bg-warning text-warning-foreground",
  sold: "bg-neutral-flat text-neutral-flat-foreground",
};

export function VehicleCard({
  vehicle,
  showVat,
  onInquire,
}: {
  vehicle: Vehicle;
  showVat: boolean;
  onInquire: (v: Vehicle) => void;
}) {
  const [idx, setIdx] = useState(0);
  const photos = vehicle.photos;
  const price = showVat ? vehicle.priceUsd : priceWithoutVat(vehicle.priceUsd);

  return (
    <article className="panel group flex flex-col overflow-hidden rounded-md transition-shadow hover:panel-lift">
      <div className="relative aspect-[3/2] overflow-hidden bg-muted">
        <img
          src={photos[idx]}
          alt={`${vehicle.title}, ${vehicle.year}`}
          loading="lazy"
          width={1280}
          height={854}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <Badge className={`absolute left-3 top-3 rounded-sm ${statusClass[vehicle.status]}`}>
          {STATUS_LABELS[vehicle.status]}
        </Badge>
        {photos.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Попереднє фото"
              onClick={() => setIdx((i) => (i - 1 + photos.length) % photos.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-sm bg-navy/70 p-1.5 text-navy-foreground opacity-0 transition-opacity group-hover:opacity-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Наступне фото"
              onClick={() => setIdx((i) => (i + 1) % photos.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm bg-navy/70 p-1.5 text-navy-foreground opacity-0 transition-opacity group-hover:opacity-100"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
              {photos.map((p, i) => (
                <span
                  key={p}
                  className={`h-1.5 w-4 rounded-full ${i === idx ? "bg-navy-foreground" : "bg-navy-foreground/40"}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="eyebrow text-muted-foreground">{vehicle.internalId}</p>
        <h3 className="mt-1 text-base font-semibold leading-snug text-foreground">
          {vehicle.brand} {vehicle.model} {vehicle.year}
        </h3>
        <p className="text-sm text-muted-foreground">{vehicle.bodyType}</p>

        <ul className="mt-3 flex flex-wrap gap-1.5">
          {[
            formatKm(vehicle.mileageKm),
            FUEL_LABELS[vehicle.fuel],
            TRANSMISSION_LABELS[vehicle.transmission],
            `VIN …${vehicle.vin.slice(-6)}`,
          ].map((pill) => (
            <li
              key={pill}
              className="rounded-sm bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground"
            >
              {pill}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-end justify-between gap-2">
          <div>
            <p className="font-display text-2xl font-bold text-foreground">{formatUsd(price)}</p>
            <p className="text-xs text-muted-foreground">
              {showVat ? "Ціна з ПДВ" : "Ціна без ПДВ"}
            </p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-sm border border-accent/40 bg-accent/10 px-2 py-1 text-xs font-medium text-accent">
            <Receipt className="h-3.5 w-3.5" /> Рахунок для ФОП/ТОВ
          </span>
        </div>

        <Link
          to={vehicle.otkReportUrl as "/inspection"}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
        >
          <FileCheck2 className="h-4 w-4" /> Звіт техогляду ОТК (формат DEKRA)
        </Link>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Button
            className="flex-1"
            disabled={vehicle.status === "sold"}
            onClick={() => onInquire(vehicle)}
          >
            {vehicle.status === "sold" ? "Продано" : "Забронювати"}
          </Button>
          <Button variant="outline" className="flex-1" onClick={() => downloadSpecSheet(vehicle)}>
            <FileDown className="mr-1.5 h-4 w-4" /> Завантажити специфікацію
          </Button>
        </div>
      </div>
    </article>
  );
}
