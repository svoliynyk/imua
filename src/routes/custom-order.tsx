import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check, Ship, Truck } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { LEAD_TOAST } from "@/components/vehicles/InquiryDialog";

export const Route = createFileRoute("/custom-order")({
  head: () => ({
    meta: [
      { title: "Авто під замовлення та імпорт із США / ЄС — IMUA" },
      {
        name: "description",
        content:
          "Конфігуратор індивідуального замовлення комерційного транспорту: підбір, аукціони США та ЄС, доставка й митне оформлення на юридичну особу з ПДВ.",
      },
      { property: "og:title", content: "Авто під замовлення та імпорт — IMUA" },
      {
        property: "og:description",
        content:
          "Три кроки до індивідуального імпорту фургона чи корпоративного авто під потреби вашого автопарку.",
      },
    ],
  }),
  component: CustomOrderPage,
});

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbys-mxoiCsgNoucDdTpkDRyG8PDAQXn790UnmgWmiklG7_MDTzCjEhYU4_0xkUOvJUbdw/exec";
const steps = ["Транспорт і специфікація", "Бюджет і строки", "Дані компанії"];

function CustomOrderPage() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    type: "van",
    brand: "",
    model: "",
    specs: "",
    budget: "30000-45000",
    timeline: "60",
    company: "",
    taxId: "",
    contact: "",
    phone: "",
    email: "",
    fileName: "",
  });

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      formType: "Авто під замовлення",
      vehicleInfo: `${form.type}; ${form.brand} ${form.model}`.trim(),
      company: form.company,
      taxId: form.taxId,
      contact: form.contact,
      phone: form.phone,
      email: form.email,
      note: `Специфікація: ${form.specs}; бюджет: ${form.budget}; строк: ${form.timeline} днів`,
    };

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      toast.success(LEAD_TOAST.title, { description: LEAD_TOAST.description });
      setStep(0);
      setForm((f) => ({ ...f, company: "", taxId: "", contact: "", phone: "", email: "" }));
    } catch {
      toast.error("Помилка відправки", {
        description: "Не вдалося надіслати форму. Будь ласка, зателефонуйте нам.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="surface-navy">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <p className="eyebrow text-accent">Під замовлення · Імпорт США / ЄС</p>
          <h1 className="mt-3 max-w-2xl text-3xl font-bold text-navy-foreground sm:text-4xl">
            Конфігуратор індивідуального замовлення
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-navy-foreground/70">
            Опишіть потрібний транспорт — ми знайдемо його на аукціонах і майданчиках США та ЄС,
            перевіримо, привеземо та оформимо на вашу компанію під ключ.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <form onSubmit={submit} className="panel rounded-md p-6 sm:p-8">
          <div className="mb-6">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-foreground">
                Крок {step + 1} з 3 · {steps[step]}
              </span>
              <span className="text-muted-foreground">{Math.round(((step + 1) / 3) * 100)}%</span>
            </div>
            <Progress value={((step + 1) / 3) * 100} className="mt-3" />
          </div>

          {step === 0 && (
            <div className="space-y-5">
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { value: "van", label: "Комерційний фургон", icon: Truck },
                  { value: "car", label: "Легкове / корпоративне авто", icon: Ship },
                ].map((o) => (
                  <button
                    key={o.value}
                    type="button"
                    onClick={() => set("type", o.value)}
                    className={`flex items-center gap-3 rounded-sm border p-4 text-left text-sm font-medium transition-colors ${
                      form.type === o.value
                        ? "border-accent bg-accent/10 text-foreground"
                        : "border-border text-muted-foreground hover:bg-secondary"
                    }`}
                  >
                    <o.icon className="h-5 w-5 text-accent" />
                    {o.label}
                  </button>
                ))}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="brand" label="Бажана марка">
                  <Input
                    id="brand"
                    required
                    value={form.brand}
                    onChange={(e) => set("brand", e.target.value)}
                    placeholder="Mercedes-Benz"
                  />
                </Field>
                <Field id="model" label="Модель / серія">
                  <Input
                    id="model"
                    value={form.model}
                    onChange={(e) => set("model", e.target.value)}
                    placeholder="Sprinter 316 Maxi"
                  />
                </Field>
              </div>
              <Field id="specs" label="Ключові характеристики">
                <Textarea
                  id="specs"
                  rows={4}
                  value={form.specs}
                  onChange={(e) => set("specs", e.target.value)}
                  placeholder="Довга база, висока стеля, автомат, пробіг до 120 тис. км, холодильна установка"
                />
              </Field>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5">
              <Field id="budget" label="Бюджет (USD, з ПДВ)">
                <Select value={form.budget} onValueChange={(v) => set("budget", v)}>
                  <SelectTrigger id="budget">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15000-30000">$15 000 – $30 000</SelectItem>
                    <SelectItem value="30000-45000">$30 000 – $45 000</SelectItem>
                    <SelectItem value="45000-70000">$45 000 – $70 000</SelectItem>
                    <SelectItem value="70000+">понад $70 000</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field id="timeline" label="Бажаний строк постачання">
                <Select value={form.timeline} onValueChange={(v) => set("timeline", v)}>
                  <SelectTrigger id="timeline">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">до 30 днів</SelectItem>
                    <SelectItem value="60">30–60 днів</SelectItem>
                    <SelectItem value="90">60–90 днів</SelectItem>
                    <SelectItem value="flex">не критично</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field id="qty" label="Кількість одиниць у замовленні">
                <Input id="qty" type="number" min={1} defaultValue={1} />
              </Field>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="company" label="Назва компанії">
                  <Input
                    id="company"
                    required
                    value={form.company}
                    onChange={(e) => set("company", e.target.value)}
                    placeholder="ТОВ «Логістик Плюс»"
                  />
                </Field>
                <Field id="taxId" label="ЄДРПОУ / ІПН">
                  <Input
                    id="taxId"
                    required
                    value={form.taxId}
                    onChange={(e) => set("taxId", e.target.value)}
                    placeholder="12345678"
                  />
                </Field>
                <Field id="contact" label="Контактна особа">
                  <Input
                    id="contact"
                    required
                    value={form.contact}
                    onChange={(e) => set("contact", e.target.value)}
                  />
                </Field>
                <Field id="phone" label="Телефон">
                  <Input
                    id="phone"
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    placeholder="+380 67 000 00 00"
                  />
                </Field>
              </div>
              <Field id="email" label="Email">
                <Input
                  id="email"
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder="fleet@company.ua"
                />
              </Field>
              <Field id="file" label="Технічне завдання (необов'язково)">
                <Input
                  id="file"
                  type="file"
                  onChange={(e) => set("fileName", e.target.files?.[0]?.name ?? "")}
                />
              </Field>
              {form.fileName && (
                <p className="text-xs text-muted-foreground">Файл: {form.fileName}</p>
              )}
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
            <Button
              type="button"
              variant="outline"
              disabled={step === 0}
              onClick={() => setStep((s) => s - 1)}
            >
              Назад
            </Button>
            {step < 2 ? (
              <Button type="button" onClick={() => setStep((s) => s + 1)}>
                Далі
              </Button>
            ) : (
              <Button type="submit" disabled={loading}>
                {loading ? "Відправка..." : "Надіслати запит"}
              </Button>
            )}
          </div>
        </form>

        <aside className="space-y-4">
          <div className="panel rounded-md p-6">
            <h2 className="eyebrow text-muted-foreground">Що входить у послугу</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {[
                "Підбір і перевірка історії авто до купівлі",
                "Виїзна інспекція на майданчику США / ЄС",
                "Логістика, митне оформлення, сертифікація",
                "Постановка на облік на юридичну особу",
                "Техогляд ОТК у нашому цеху перед передачею",
                "Повний пакет документів і рахунок з ПДВ",
              ].map((t) => (
                <li key={t} className="flex gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  <span className="text-muted-foreground">{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="surface-navy rounded-md p-6">
            <p className="text-sm text-navy-foreground/80">
              Середній строк постачання фургона з ЄС — 35–45 днів, зі США — 60–80 днів.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
    </div>
  );
}
