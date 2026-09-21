# База даних авто (Lovable Cloud)

Мета: каталог авто керується з бази даних — додавати/редагувати авто можна без коду, за кілька хвилин.

## Крок 1. Увімкнути Lovable Cloud
- Створює вбудовану базу даних і середовище для неї (без зовнішніх акаунтів).

## Крок 2. Міграція: таблиця `vehicles`
Структура (відповідає поточному типу Vehicle у src/data/vehicles.ts):

```sql
create table public.vehicles (
  id uuid primary key default gen_random_uuid(),
  internal_id text not null unique,      -- IMUA-1042
  title text not null,
  brand text not null,
  model text not null,
  year int not null,
  body_type text not null,               -- Фургон L3H2
  vehicle_type text not null,            -- van | car | suv
  mileage_km int not null,
  price_usd int not null,                -- ціна з ПДВ
  status text not null default 'in_stock', -- in_stock | reserved | sold
  fuel text not null,
  transmission text not null,
  vin text not null,
  photos text[] not null default '{}',   -- ключі/URL фото
  otk_report_url text,                   -- поки веде на /inspection
  added_at timestamptz not null default now()
);
```

- GRANT: SELECT для anon + authenticated (каталог публічний), повний доступ service_role.
- RLS: політика «публічний read» для anon, запис — лише service_role (через табличний редактор у панелі).
- У цій самій міграції — INSERT усіх 8 поточних авто з мок-даних (щоб каталог не «спорожнів»).

## Крок 3. Фото
- Фото тепер — масив значень у базі. Існують 2 варіанти значень, обидва працюють:
  - URL (`https://...`) — напр., з Storage: завантажили фото, вставили посилання;
  - короткий ключ (`van-master-1`) — мапиться на вже вбудовані в сайт зображення (src/data/photo-map.ts).

## Крок 4. Отримання даних у застосунку
- `src/lib/vehicles.functions.ts` — публічна server-функція `listVehicles` (GET) через server publishable client (ключ + narrow anon SELECT), без адмін-доступу.
- Головна (`/`) та сторінка `/stock`: дані через route loader (`queryClient.ensureQueryData`) + `useSuspenseQuery`; кожна сторінка отримує errorComponent.
- `src/data/vehicles.ts`: мітки/форматтери/фільтри лишаються; масив мок-авто видаляється (тепер із бази).

## Крок 5. Перевірка
- Перевірити в прев'ю: головна (3 авто в наявності), каталог (8 авто, фільтри/сортування працюють), консоль без помилок.
- Перевірити, що редагування ціни в табличному редакторі бази змінює сайт.

## Технічні деталі
- Секрети (SUPABASE_URL, PUBLISHABLE_KEY) доступні в server-функціях; у браузер — лише VITE_*.
- Новий формат ключів sb_publishable_*: у client — fetch-обгортка з apikey (без Authorization: Bearer).
- Запис у таблицю не потрібен із сайту — лише читання; адмін-панель керування авто — окремий наступний крок, якщо захочете.
