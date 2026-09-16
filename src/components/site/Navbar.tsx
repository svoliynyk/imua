import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";

const links = [
  { to: "/stock", label: "В наявності" },
  { to: "/custom-order", label: "Під замовлення / Імпорт" },
  { to: "/inspection", label: "Техогляд ОТК" },
  { to: "/b2b", label: "B2B рішення" },
  { to: "/about", label: "Про нас" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-sm px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-secondary text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/custom-order">Запросити пропозицію для автопарку</Link>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden"
            aria-label="Меню"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-4 pb-4 lg:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block border-b border-border py-3 text-sm font-medium text-foreground"
            >
              {l.label}
            </Link>
          ))}
          <Button asChild className="mt-4 w-full">
            <Link to="/custom-order" onClick={() => setOpen(false)}>
              Запросити пропозицію
            </Link>
          </Button>
        </nav>
      )}
    </header>
  );
}
