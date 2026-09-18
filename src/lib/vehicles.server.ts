import { neon } from "@neondatabase/serverless";
import type { Vehicle, VehicleStatus } from "@/data/vehicles";

const sql = neon(import.meta.env.DATABASE_URL ?? "");
const ADMIN_EMAILS = new Set(["svyatikyt@gmail.com"]);

type VehicleInput = Omit<Vehicle, "photos"> & { photos: string[] };

function assertAdmin(email: string) {
  if (!ADMIN_EMAILS.has(email.trim().toLowerCase())) {
    throw new Error("Unauthorized");
  }
}

export async function listAdminVehicles(email: string) {
  assertAdmin(email);
  return (await sql`
    SELECT id, internal_id AS "internalId", title, brand, model, year, body_type AS "bodyType",
      vehicle_type AS "vehicleType", mileage_km AS "mileageKm", price_usd AS "priceUsd",
      vat_included AS "vatIncluded", status, otk_report_url AS "otkReportUrl", photos,
      fuel, transmission, vin, added_at::text AS "addedAt"
    FROM public.vehicles ORDER BY added_at DESC, created_at DESC
  `) as Vehicle[];
}

export async function createAdminVehicle(email: string, vehicle: VehicleInput) {
  assertAdmin(email);
  await sql`
    INSERT INTO public.vehicles (id, internal_id, title, brand, model, year, body_type, vehicle_type,
      mileage_km, price_usd, vat_included, status, otk_report_url, photos, fuel, transmission, vin, added_at)
    VALUES (${vehicle.id}, ${vehicle.internalId}, ${vehicle.title}, ${vehicle.brand}, ${vehicle.model},
      ${vehicle.year}, ${vehicle.bodyType}, ${vehicle.vehicleType}, ${vehicle.mileageKm}, ${vehicle.priceUsd},
      ${vehicle.vatIncluded}, ${vehicle.status}, ${vehicle.otkReportUrl}, ${vehicle.photos}, ${vehicle.fuel},
      ${vehicle.transmission}, ${vehicle.vin}, ${vehicle.addedAt})
  `;
}

export async function updateAdminVehicleStatus(email: string, id: string, status: VehicleStatus) {
  assertAdmin(email);
  await sql`UPDATE public.vehicles SET status = ${status}, updated_at = now() WHERE id = ${id}`;
}

export async function deleteAdminVehicle(email: string, id: string) {
  assertAdmin(email);
  await sql`DELETE FROM public.vehicles WHERE id = ${id}`;
}

export { ADMIN_EMAILS };
