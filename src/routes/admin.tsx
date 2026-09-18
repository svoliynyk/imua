import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, ShieldCheck, Trash2, LogOut } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getAuthClient } from "@/lib/neon-auth";
import { ADMIN_EMAIL, createAdminVehicle, deleteAdminVehicle, listAdminVehicles, updateAdminVehicleStatus } from "@/lib/admin.server";
import type { Vehicle, VehicleStatus } from "@/data/vehicles";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Адмін-панель — IMUA" }] }),
  component: AdminPage,
});

const empty = { title: "", brand: "", model: "", year: "2022", bodyType: "Фургон", vehicleType: "van", mileageKm: "0", priceUsd: "0", fuel: "diesel", transmission: "manual", vin: "", photos: "" };
const labels: Record<VehicleStatus, string> = { in_stock: "В наявності", reserved: "Заброньовано", sold: "Продано" };

function AdminPage() {
  const [session, setSession] = useState<{ user: { email: string } } | null>(null);
  const [isPending, setIsPending] = useState(true);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [form, setForm] = useState(empty);
  const [showForm, setShowForm] = useState(false);
  const email = session?.user?.email?.toLowerCase() ?? "";
  const isAdmin = email === ADMIN_EMAIL;

  useEffect(() => {
    void getAuthClient().then((client) => client?.getSession()).then((result) => {
      setSession(result?.data as { user: { email: string } } | null);
      setIsPending(false);
    });
  }, []);

  const refresh = async () => {
    if (isAdmin) setVehicles(await listAdminVehicles({ data: email }));
  };
  useEffect(() => { void refresh(); }, [isAdmin, email]);

  if (isPending) return <div className="mx-auto max-w-6xl px-6 py-24">Завантаження…</div>;
  if (!session) return <AuthCard />;
  if (!isAdmin) return <main className="mx-auto max-w-2xl px-6 py-24"><Card><CardHeader><CardTitle>Доступ заборонено</CardTitle></CardHeader><CardContent className="flex flex-col gap-4"><p className="text-muted-foreground">Цей акаунт не має доступу до адмін-панелі.</p><Button onClick={async () => (await getAuthClient())?.signOut()}>Вийти</Button></CardContent></Card></main>;

  const addVehicle = async (event: React.FormEvent) => {
    event.preventDefault();
    const vehicle: Vehicle = { id: `v-${Date.now()}`, internalId: `IMUA-${Date.now().toString().slice(-4)}`, title: form.title, brand: form.brand, model: form.model, year: Number(form.year), bodyType: form.bodyType, vehicleType: form.vehicleType as Vehicle["vehicleType"], mileageKm: Number(form.mileageKm), priceUsd: Number(form.priceUsd), vatIncluded: true, status: "in_stock", otkReportUrl: "/inspection", photos: form.photos.split(",").map((item) => item.trim()).filter(Boolean), fuel: form.fuel as Vehicle["fuel"], transmission: form.transmission as Vehicle["transmission"], vin: form.vin, addedAt: new Date().toISOString().slice(0, 10) };
    try { await createAdminVehicle({ data: { email, vehicle } }); setForm(empty); setShowForm(false); await refresh(); toast.success("Автомобіль додано"); } catch { toast.error("Не вдалося додати автомобіль"); }
  };
  const changeStatus = async (id: string, status: VehicleStatus) => { await updateAdminVehicleStatus({ data: { email, id, status } }); await refresh(); toast.success("Статус оновлено"); };
  const remove = async (id: string) => { if (!window.confirm("Видалити автомобіль?")) return; await deleteAdminVehicle({ data: { email, id } }); await refresh(); toast.success("Автомобіль видалено"); };
  const field = (key: keyof typeof empty, label: string, type = "text") => <div className="flex flex-col gap-2"><Label htmlFor={key}>{label}</Label><Input id={key} type={type} value={form[key]} onChange={(event) => setForm({ ...form, [key]: event.target.value })} required={key !== "photos"} /></div>;

  return <main className="mx-auto w-full max-w-7xl px-6 py-12"><div className="mb-10 flex flex-wrap items-end justify-between gap-4"><div><div className="mb-3 flex items-center gap-2 text-primary"><ShieldCheck className="size-5" /><span className="text-sm font-semibold uppercase tracking-[0.2em]">Admin</span></div><h1 className="font-display text-4xl font-semibold">Автомобілі</h1><p className="mt-2 text-muted-foreground">Керуйте каталогом та статусами авто.</p></div><div className="flex gap-2"><Button onClick={() => setShowForm(!showForm)}><Plus data-icon="inline-start" />Додати авто</Button><Button variant="outline" onClick={async () => (await getAuthClient())?.signOut()}><LogOut data-icon="inline-start" />Вийти</Button></div></div>
    {showForm && <Card className="mb-8"><CardHeader><CardTitle>Нове авто</CardTitle></CardHeader><CardContent><form onSubmit={addVehicle} className="grid gap-4 md:grid-cols-3">{field("title", "Назва")}{field("brand", "Марка")}{field("model", "Модель")}{field("year", "Рік", "number")}{field("bodyType", "Тип кузова")}{field("mileageKm", "Пробіг, км", "number")}{field("priceUsd", "Ціна, USD", "number")}{field("vin", "VIN")}{field("photos", "URL фото через кому")}<div className="flex items-end"><Button type="submit">Зберегти авто</Button></div></form></CardContent></Card>}
    <div className="grid gap-4">{vehicles.map((vehicle) => <Card key={vehicle.id}><CardContent className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between"><div><div className="mb-2 flex flex-wrap items-center gap-2"><Badge variant="outline">{vehicle.internalId}</Badge><Badge>{labels[vehicle.status]}</Badge></div><h2 className="text-lg font-semibold">{vehicle.title}</h2><p className="text-sm text-muted-foreground">{vehicle.year} · {vehicle.mileageKm.toLocaleString("uk-UA")} км · ${vehicle.priceUsd.toLocaleString("en-US")}</p></div><div className="flex flex-wrap items-center gap-2"><Select value={vehicle.status} onValueChange={(value) => void changeStatus(vehicle.id, value as VehicleStatus)}><SelectTrigger className="w-44"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="in_stock">В наявності</SelectItem><SelectItem value="reserved">Заброньовано</SelectItem><SelectItem value="sold">Продано</SelectItem></SelectContent></Select><Button variant="outline" size="icon" aria-label={`Видалити ${vehicle.title}`} onClick={() => void remove(vehicle.id)}><Trash2 /></Button></div></CardContent></Card>)}</div>
  </main>;
}

function AuthCard() {
  const [email, setEmail] = useState(ADMIN_EMAIL); const [password, setPassword] = useState(""); const [busy, setBusy] = useState(false);
  const submit = async (event: React.FormEvent) => { event.preventDefault(); setBusy(true); const result = await (await getAuthClient())?.signIn.email({
      email,
      password,
      callbackURL: window.location.origin,
    }); setBusy(false); if (result.error) toast.error("Не вдалося увійти"); };
  return <main className="mx-auto max-w-md px-6 py-24"><Card><CardHeader><CardTitle>Вхід до адмін-панелі</CardTitle></CardHeader><CardContent><form onSubmit={submit} className="flex flex-col gap-4"><div className="flex flex-col gap-2"><Label htmlFor="admin-email">Email</Label><Input id="admin-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></div><div className="flex flex-col gap-2"><Label htmlFor="admin-password">Пароль</Label><Input id="admin-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></div><Button type="submit" disabled={busy}>{busy ? "Вхід…" : "Увійти"}</Button></form></CardContent></Card></main>;
}
