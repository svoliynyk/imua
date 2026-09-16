import { Link } from "@tanstack/react-router";

import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="surface-navy mt-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo tone="light" />
          <p className="mt-4 max-w-sm text-sm text-navy-foreground/70">
            INTRAMOTION UKRAINE — постачання перевірених комерційних фургонів та корпоративних авто
            для українського бізнесу. Власний цех техогляду ОТК, імпорт із США та ЄС на юридичних
            осіб, повний пакет документів з ПДВ.
          </p>
        </div>
        <div>
          <h3 className="eyebrow text-accent">Напрямки</h3>
          <ul className="mt-4 space-y-2 text-sm text-navy-foreground/80">
            <li>
              <Link to="/stock">Авто в наявності</Link>
            </li>
            <li>
              <Link to="/custom-order">Під замовлення / Імпорт</Link>
            </li>
            <li>
              <Link to="/inspection">Техогляд ОТК</Link>
            </li>
            <li>
              <Link to="/b2b">B2B рішення</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="eyebrow text-accent">Контакти</h3>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-navy-foreground/80">
            <li>Київ, вул. Промислова 12 (термінал IMUA)</li>
            <li>Пн–Пт 09:00–19:00, Сб 10:00–15:00</li>
            <li>
              <a className="transition-colors hover:text-navy-foreground" href="mailto:b2b@intramotion.ua">
                b2b@intramotion.ua
              </a>
            </li>
          </ul>
          <p className="mt-4 text-xs text-navy-foreground/50">
            Контактні дані демонстраційні — надішліть свої актуальні, і ми їх замінимо.
          </p>
        </div>
      </div>
      <div className="border-t border-navy-foreground/10 px-4 py-5 text-center text-xs text-navy-foreground/50">
        © {new Date().getFullYear()} INTRAMOTION UKRAINE. Всі права захищено.
      </div>
    </footer>
  );
}
