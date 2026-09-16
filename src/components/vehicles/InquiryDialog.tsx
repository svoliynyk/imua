import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Vehicle } from "@/data/vehicles";
import { formatUsd } from "@/data/vehicles";

export const LEAD_TOAST = {
  title: "Дякуємо! Ваш запит прийнято",
  description: "B2B менеджер автопарку зв'яжеться з вашою компанією протягом 15 хвилин.",
};

export function InquiryDialog({
  vehicle,
  open,
  onOpenChange,
}: {
  vehicle: Vehicle | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [company, setCompany] = useState("");
  const [contact, setContact] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (vehicle) {
      setNote(
        `Цікавить ${vehicle.title} (${vehicle.year}), внутрішній ID ${vehicle.internalId}, ` +
          `ціна ${formatUsd(vehicle.priceUsd)} з ПДВ. Прошу зв'язатися щодо бронювання та тест-драйву.`,
      );
    }
  }, [vehicle]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenChange(false);
    toast.success(LEAD_TOAST.title, { description: LEAD_TOAST.description });
    setCompany("");
    setContact("");
    setPhone("");
    setEmail("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Швидкий запит / Тест-драйв</DialogTitle>
          <DialogDescription>
            {vehicle
              ? `${vehicle.title} · ${vehicle.year} · ${vehicle.internalId}`
              : "Заповніть форму — ми підготуємо комерційну пропозицію."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="iq-company">Назва компанії</Label>
              <Input
                id="iq-company"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="ТОВ «Логістик Плюс»"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="iq-contact">Контактна особа</Label>
              <Input
                id="iq-contact"
                required
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Іван Петренко"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="iq-phone">Телефон</Label>
              <Input
                id="iq-phone"
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+380 67 000 00 00"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="iq-email">Email</Label>
              <Input
                id="iq-email"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="fleet@company.ua"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="iq-note">Коментар</Label>
            <Textarea
              id="iq-note"
              rows={4}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full sm:w-auto">
              Забронювати
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
