import { createServerFn } from "@tanstack/react-start";
import { neon } from "@neondatabase/serverless";
import type { Vehicle, VehicleStatus } from "@/data/vehicles";

const ADMIN_EMAIL = "svyatikyt@gmail.com";
type VehicleInput = Omit<Vehicle, "photos"> & { photos: string[] };

function db() {
  return neon(process.env.DATABASE_URL ?? "");
}

function assertAdmin(email: string) {
  if (email.trim().toLowerCase() !== ADMIN_EMAIL) throw new Error("Unauthorized");
}

export const listAdminVehicles = createServerFn({ method: "GET" })
  .validator((email: string) => email)
  .handler(async ({ data: email }) => {
    assertAdmin(email);
    return db()`SELECT id, internal_id AS "internalId", title, brand, model, year, body_type AS "bodyType", vehicle_type AS "vehicleType", mileage_km AS "mileageKm", price_usd AS "priceUsd", vat_included AS "vatIncluded", status, otk_report_url AS "otkReportUrl", photos, fuel, transmission, vin, added_at::text AS "addedAt" FROM public.vehicles ORDER BY added_at DESC, created_at DESC` as Promise<Vehicle[]>;
  });

export const createAdminVehicle = createServerFn({ method: "POST" })
  .validator((input: { email: string; vehicle: VehicleInput }) => input)
  .handler(async ({ data: { email, vehicle } }) => {
    assertAdmin(email);
    await db()`INSERT INTO public.vehicles (id, internal_id, title, brand, model, year, body_type, vehicle_type, mileage_km, price_usd, vat_included, status, otk_report_url, photos, fuel, transmission, vin, added_at) VALUES (${vehicle.id}, ${vehicle.internalId}, ${vehicle.title}, ${vehicle.brand}, ${vehicle.model}, ${vehicle.year}, ${vehicle.bodyType}, ${vehicle.vehicleType}, ${vehicle.mileageKm}, ${vehicle.priceUsd}, ${vehicle.vatIncluded}, ${vehicle.status}, ${vehicle.otkReportUrl}, ${vehicle.photos}, ${vehicle.fuel}, ${vehicle.transmission}, ${vehicle.vin}, ${vehicle.addedAt})`;
  });

export const updateAdminVehicleStatus = createServerFn({ method: "POST" })
  .validator((input: { email: string; id: string; status: VehicleStatus }) => input)
  .handler(async ({ data: { email, id, status } }) => {
    assertAdmin(email);
    await db()`UPDATE public.vehicles SET status = ${status}, updated_at = now() WHERE id = ${id}`;
  });

export const deleteAdminVehicle = createServerFn({ method: "POST" })
  .validator((input: { email: string; id: string }) => input)
  .handler(async ({ data: { email, id } }) => {
    assertAdmin(email);
    await db()`DELETE FROM public.vehicles WHERE id = ${id}`;
  });

export { ADMIN_EMAIL };
