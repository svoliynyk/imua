import vanMaster from "@/assets/van-master.jpg";
import vanSprinter from "@/assets/van-sprinter.jpg";
import vanTransporter from "@/assets/van-transporter.jpg";
import vanTransit from "@/assets/van-transit.jpg";
import vanBoxer from "@/assets/van-boxer.jpg";
import vanCrafter from "@/assets/van-crafter.jpg";
import carOctavia from "@/assets/car-octavia.jpg";
import carRav4 from "@/assets/car-rav4.jpg";
import otkBay from "@/assets/otk-bay.jpg";

/**
 * ДОДАВАННЯ АВТО — під 5 хвилин.
 * Скопіюйте будь-який об'єкт нижче, змініть поля та збережіть файл.
 * Схема повністю сумісна з таблицею БД (Lovable Cloud):
 *   vehicles(id, internal_id, title, brand, model, year, body_type, vehicle_type,
 *            mileage_km, price_usd, vat_included, status, otk_report_url,
 *            photos text[], fuel, transmission, vin, added_at)
 */

export type VehicleStatus = "in_stock" | "reserved" | "sold";
export type VehicleType = "van" | "car" | "suv";
export type Fuel = "diesel" | "petrol" | "hybrid" | "ev";
export type Transmission = "automatic" | "manual";

export interface Vehicle {
  id: string;
  internalId: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  bodyType: string;
  vehicleType: VehicleType;
  mileageKm: number;
  /** Ціна в USD з ПДВ */
  priceUsd: number;
  vatIncluded: boolean;
  status: VehicleStatus;
  otkReportUrl: string;
  photos: string[];
  fuel: Fuel;
  transmission: Transmission;
  vin: string;
  addedAt: string;
}

export const VAT_RATE = 0.2;

export const priceWithoutVat = (priceWithVat: number) =>
  Math.round(priceWithVat / (1 + VAT_RATE));

export const STATUS_LABELS: Record<VehicleStatus, string> = {
  in_stock: "В наявності",
  reserved: "Заброньовано",
  sold: "Продано",
};

export const TYPE_LABELS: Record<VehicleType, string> = {
  van: "Комерційні фургони",
  car: "Легкові авто",
  suv: "Кросовери / SUV",
};

export const FUEL_LABELS: Record<Fuel, string> = {
  diesel: "Дизель",
  petrol: "Бензин",
  hybrid: "Гібрид",
  ev: "Електро",
};

export const TRANSMISSION_LABELS: Record<Transmission, string> = {
  automatic: "Автомат",
  manual: "Механіка",
};

export const vehicles: Vehicle[] = [
  {
    id: "v-001",
    internalId: "IMUA-1042",
    title: "Renault Master L3H2 Fourgon",
    brand: "Renault",
    model: "Master",
    year: 2021,
    bodyType: "Фургон L3H2",
    vehicleType: "van",
    mileageKm: 118000,
    priceUsd: 28900,
    vatIncluded: true,
    status: "in_stock",
    otkReportUrl: "/inspection",
    photos: [vanMaster, otkBay],
    fuel: "diesel",
    transmission: "manual",
    vin: "VF1MA000167891234",
    addedAt: "2026-09-02",
  },
  {
    id: "v-002",
    internalId: "IMUA-1047",
    title: "Mercedes-Benz Sprinter 316 CDI Maxi",
    brand: "Mercedes-Benz",
    model: "Sprinter",
    year: 2022,
    bodyType: "Фургон Maxi",
    vehicleType: "van",
    mileageKm: 94500,
    priceUsd: 41500,
    vatIncluded: true,
    status: "in_stock",
    otkReportUrl: "/inspection",
    photos: [vanSprinter, otkBay],
    fuel: "diesel",
    transmission: "automatic",
    vin: "WDB9066332S998877",
    addedAt: "2026-09-09",
  },
  {
    id: "v-003",
    internalId: "IMUA-1051",
    title: "Volkswagen Transporter T6.1 Kasten",
    brand: "Volkswagen",
    model: "Transporter",
    year: 2021,
    bodyType: "Фургон коротка база",
    vehicleType: "van",
    mileageKm: 87200,
    priceUsd: 32400,
    vatIncluded: true,
    status: "reserved",
    otkReportUrl: "/inspection",
    photos: [vanTransporter, otkBay],
    fuel: "diesel",
    transmission: "automatic",
    vin: "WV1ZZZ7HZMH045612",
    addedAt: "2026-08-28",
  },
  {
    id: "v-004",
    internalId: "IMUA-1053",
    title: "Ford Transit 350 L3 Van",
    brand: "Ford",
    model: "Transit",
    year: 2020,
    bodyType: "Фургон L3",
    vehicleType: "van",
    mileageKm: 142800,
    priceUsd: 24700,
    vatIncluded: true,
    status: "in_stock",
    otkReportUrl: "/inspection",
    photos: [vanTransit, otkBay],
    fuel: "diesel",
    transmission: "manual",
    vin: "WF0XXXTTGXLK55231",
    addedAt: "2026-08-19",
  },
  {
    id: "v-005",
    internalId: "IMUA-1058",
    title: "Volkswagen Crafter 35 L3H3",
    brand: "Volkswagen",
    model: "Crafter",
    year: 2022,
    bodyType: "Фургон L3H3",
    vehicleType: "van",
    mileageKm: 76400,
    priceUsd: 38900,
    vatIncluded: true,
    status: "in_stock",
    otkReportUrl: "/inspection",
    photos: [vanCrafter, otkBay],
    fuel: "diesel",
    transmission: "automatic",
    vin: "WV1ZZZSYZN9012345",
    addedAt: "2026-09-11",
  },
  {
    id: "v-006",
    internalId: "IMUA-1060",
    title: "Peugeot Boxer 435 L4H2",
    brand: "Peugeot",
    model: "Boxer",
    year: 2019,
    bodyType: "Фургон L4H2",
    vehicleType: "van",
    mileageKm: 176300,
    priceUsd: 19800,
    vatIncluded: true,
    status: "sold",
    otkReportUrl: "/inspection",
    photos: [vanBoxer, otkBay],
    fuel: "diesel",
    transmission: "manual",
    vin: "VF3YCTMFC12876540",
    addedAt: "2026-07-30",
  },
  {
    id: "v-007",
    internalId: "IMUA-1063",
    title: "Skoda Octavia 2.0 TDI Business",
    brand: "Skoda",
    model: "Octavia",
    year: 2022,
    bodyType: "Ліфтбек",
    vehicleType: "car",
    mileageKm: 68900,
    priceUsd: 21600,
    vatIncluded: true,
    status: "in_stock",
    otkReportUrl: "/inspection",
    photos: [carOctavia, otkBay],
    fuel: "diesel",
    transmission: "automatic",
    vin: "TMBJJ7NE5N0123987",
    addedAt: "2026-09-05",
  },
  {
    id: "v-008",
    internalId: "IMUA-1066",
    title: "Toyota RAV4 2.5 Hybrid AWD",
    brand: "Toyota",
    model: "RAV4",
    year: 2023,
    bodyType: "Кросовер",
    vehicleType: "suv",
    mileageKm: 42100,
    priceUsd: 36800,
    vatIncluded: true,
    status: "in_stock",
    otkReportUrl: "/inspection",
    photos: [carRav4, otkBay],
    fuel: "hybrid",
    transmission: "automatic",
    vin: "JTMB5RFV60D098765",
    addedAt: "2026-09-13",
  },
];

/** Каскадний селектор бренд -> моделі */
export const brandModelMap: Record<string, string[]> = vehicles.reduce(
  (acc, v) => {
    acc[v.brand] = Array.from(new Set([...(acc[v.brand] ?? []), v.model]));
    return acc;
  },
  {} as Record<string, string[]>,
);

export const allYears = Array.from(new Set(vehicles.map((v) => v.year))).sort((a, b) => b - a);

export const formatKm = (km: number) => `${km.toLocaleString("uk-UA")} км`;
export const formatUsd = (n: number) => `$${n.toLocaleString("uk-UA")}`;
