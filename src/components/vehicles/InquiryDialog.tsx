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

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzfX0tcE0AFdR4uOqUGLNbCy9RhufFXIKlfuK8T_8ALs2W9bPpOkIfgoXgWZu4e0UQ0Zg/exec";

export const LEAD_TOAST = {
  title: "Заявку прийнято!",
  description: "B2B-менеджер IMUA зв'яжеться з вами протягом 15 хвилин.",
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (vehicle) {
      setNote(
        `Цікавить автомобіль: ${vehicle.title} (${vehicle.year}), внутрішній ID ${vehicle.internalId}, ціна ${formatUsd(vehicle.priceUsd)}`,
      );
    }
  }, [vehicle]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      formType: "Бронювання зі складу",
      vehicleInfo: vehicle ? `${vehicle.title} (${vehicle.year}) ID: ${vehicle.internalId}` : "-",
      company,
      taxId: "-",
      contact,
      phone,
      email,
      note,
    };

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      onOpenChange(false);
      toast.success(LEAD_TOAST.title, { description: LEAD_TOAST.description });
      setCompany("");
      setContact("");
      setPhone("");
      setEmail("");
    } catch {
      toast.error("Помилка відправки", {
        description: "Не вдалося надіслати форму. Будь ласка, зателефонуйте нам.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Бронювання автомобіля</DialogTitle>
          <DialogDescription>
            {vehicle
              ? `${vehicle.title} • ${vehicle.year} • ID: ${vehicle.internalId}`
              : "Залиште контакти для зв'язку з менеджером"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="iq-company">Компанія / ФОП</Label>
              <Input
                id="iq-company"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="ТОВ 'Логістик'"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="iq-contact">Контактна особа</Label>
              <Input
                id="iq-contact"
                required
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Олександр"
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
              <Label htmlFor="iq-email">Корпоративний Email</Label>
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
            <Button type="submit" disabled={loading} className="w-full sm:w-auto">
              {loading ? "Відправка..." : "Надіслати заявку"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
