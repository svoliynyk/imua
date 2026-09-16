import {
  FUEL_LABELS,
  STATUS_LABELS,
  TRANSMISSION_LABELS,
  formatKm,
  formatUsd,
  priceWithoutVat,
  type Vehicle,
} from "@/data/vehicles";

/**
 * Відкриває друковану специфікацію авто — користувач зберігає її як PDF
 * через діалог друку браузера.
 */
export function downloadSpecSheet(v: Vehicle) {
  const rows: [string, string][] = [
    ["Внутрішній ID", v.internalId],
    ["Марка / Модель", `${v.brand} ${v.model}`],
    ["Рік випуску", String(v.year)],
    ["Тип кузова", v.bodyType],
    ["Пробіг", formatKm(v.mileageKm)],
    ["Пальне", FUEL_LABELS[v.fuel]],
    ["КПП", TRANSMISSION_LABELS[v.transmission]],
    ["VIN", v.vin],
    ["Статус", STATUS_LABELS[v.status]],
    ["Ціна з ПДВ", formatUsd(v.priceUsd)],
    ["Ціна без ПДВ", formatUsd(priceWithoutVat(v.priceUsd))],
    ["Техогляд ОТК", "Пройдено, протокол 100+ пунктів"],
  ];

  const html = `<!doctype html><html lang="uk"><head><meta charset="utf-8">
<title>Специфікація ${v.title}</title>
<style>
  body{font-family:system-ui,sans-serif;color:#1b2333;margin:40px;}
  h1{font-size:20px;margin:0 0 4px;}
  .sub{color:#5b667d;font-size:13px;margin-bottom:24px;}
  table{border-collapse:collapse;width:100%;font-size:13px;}
  td{border-bottom:1px solid #e2e6ee;padding:9px 4px;}
  td:first-child{color:#5b667d;width:45%;}
  .brand{font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:#2c3a5c;margin-bottom:18px;}
</style></head><body>
<div class="brand">INTRAMOTION UKRAINE · IMUA</div>
<h1>${v.title}</h1>
<div class="sub">Технічна специфікація · комерційна пропозиція для юридичних осіб</div>
<table>${rows.map(([k, val]) => `<tr><td>${k}</td><td><strong>${val}</strong></td></tr>`).join("")}</table>
<p class="sub" style="margin-top:24px">Документ сформовано автоматично. Повний пакет з ПДВ надається менеджером IMUA.</p>
<script>window.onload=()=>window.print()</script>
</body></html>`;

  const w = window.open("", "_blank");
  if (!w) return;
  w.document.write(html);
  w.document.close();
}
