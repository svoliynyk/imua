-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users read own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- Vehicles
CREATE TABLE public.vehicles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  internal_id text NOT NULL DEFAULT '',
  title text NOT NULL,
  brand text NOT NULL,
  model text NOT NULL,
  year integer NOT NULL,
  body_type text NOT NULL DEFAULT '',
  vehicle_type text NOT NULL DEFAULT 'van',
  mileage_km integer NOT NULL DEFAULT 0,
  price_usd integer NOT NULL DEFAULT 0,
  vat_included boolean NOT NULL DEFAULT true,
  status text NOT NULL DEFAULT 'in_stock',
  otk_report_url text NOT NULL DEFAULT '/inspection',
  photos text[] NOT NULL DEFAULT '{}',
  fuel text NOT NULL DEFAULT 'diesel',
  transmission text NOT NULL DEFAULT 'manual',
  vin text NOT NULL DEFAULT '',
  added_at date NOT NULL DEFAULT current_date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.vehicles TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.vehicles TO authenticated;
GRANT ALL ON public.vehicles TO service_role;

ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Vehicles are publicly readable" ON public.vehicles
  FOR SELECT USING (true);

CREATE POLICY "Admins insert vehicles" ON public.vehicles
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update vehicles" ON public.vehicles
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete vehicles" ON public.vehicles
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER vehicles_updated_at
  BEFORE UPDATE ON public.vehicles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Перший зареєстрований користувач автоматично стає адміністратором
CREATE OR REPLACE FUNCTION public.assign_first_admin()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
  ELSE
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user')
    ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created_assign_role
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.assign_first_admin();

-- Seed: 8 авто з каталогу
INSERT INTO public.vehicles (internal_id, title, brand, model, year, body_type, vehicle_type, mileage_km, price_usd, status, photos, fuel, transmission, vin, added_at) VALUES
('IMUA-1042','Renault Master L3H2 Fourgon','Renault','Master',2021,'Фургон L3H2','van',118000,28900,'in_stock',ARRAY['/vehicles/van-master.jpg','/vehicles/otk-bay.jpg'],'diesel','manual','VF1MA000167891234','2026-09-02'),
('IMUA-1047','Mercedes-Benz Sprinter 316 CDI Maxi','Mercedes-Benz','Sprinter',2022,'Фургон Maxi','van',94500,41500,'in_stock',ARRAY['/vehicles/van-sprinter.jpg','/vehicles/otk-bay.jpg'],'diesel','automatic','WDB9066332S998877','2026-09-09'),
('IMUA-1051','Volkswagen Transporter T6.1 Kasten','Volkswagen','Transporter',2021,'Фургон коротка база','van',87200,32400,'reserved',ARRAY['/vehicles/van-transporter.jpg','/vehicles/otk-bay.jpg'],'diesel','automatic','WV1ZZZ7HZMH045612','2026-08-28'),
('IMUA-1053','Ford Transit 350 L3 Van','Ford','Transit',2020,'Фургон L3','van',142800,24700,'in_stock',ARRAY['/vehicles/van-transit.jpg','/vehicles/otk-bay.jpg'],'diesel','manual','WF0XXXTTGXLK55231','2026-08-19'),
('IMUA-1058','Volkswagen Crafter 35 L3H3','Volkswagen','Crafter',2022,'Фургон L3H3','van',76400,38900,'in_stock',ARRAY['/vehicles/van-crafter.jpg','/vehicles/otk-bay.jpg'],'diesel','automatic','WV1ZZZSYZN9012345','2026-09-11'),
('IMUA-1060','Peugeot Boxer 435 L4H2','Peugeot','Boxer',2019,'Фургон L4H2','van',176300,19800,'sold',ARRAY['/vehicles/van-boxer.jpg','/vehicles/otk-bay.jpg'],'diesel','manual','VF3YCTMFC12876540','2026-07-30'),
('IMUA-1063','Skoda Octavia 2.0 TDI Business','Skoda','Octavia',2022,'Ліфтбек','car',68900,21600,'in_stock',ARRAY['/vehicles/car-octavia.jpg','/vehicles/otk-bay.jpg'],'diesel','automatic','TMBJJ7NE5N0123987','2026-09-05'),
('IMUA-1066','Toyota RAV4 2.5 Hybrid AWD','Toyota','RAV4',2023,'Кросовер','suv',42100,36800,'in_stock',ARRAY['/vehicles/car-rav4.jpg','/vehicles/otk-bay.jpg'],'hybrid','automatic','JTMB5RFV60D098765','2026-09-13');