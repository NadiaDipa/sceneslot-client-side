"use client";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import type { Studio } from "@/lib/types";
import { cn } from "cn";
import { BadgeCheck, CalendarDays, Clock, Users } from "lucide-react";
import { useState, type FormEvent } from "react";

interface BookingModalProps {
  studio: Studio;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/** Visual booking flow — hours are mock availability for the chosen date. */
function mockHours() {
  return ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
}

export function BookingModal({ studio, open, onOpenChange }: BookingModalProps) {
  const [date, setDate] = useState("");
  const [startHour, setStartHour] = useState("");
  const [duration, setDuration] = useState("2");
  const [guests, setGuests] = useState("1");

  const rate = studio.hourlyRate;
  const hours = Number(duration) || 0;
  const subtotal = rate * hours;
  const serviceFee = Math.round(subtotal * 0.08);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    /* Visual only — real booking logic lands with the backend stage */
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">
            Book this workspace
          </DialogTitle>
          <DialogDescription>
            {studio.title} · {studio.location} — pick your slot and the host
            confirms instantly.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="booking-date">
                <CalendarDays className="size-3.5 text-primary" />
                Date
              </Label>
              <Input
                id="booking-date"
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="booking-guests">
                <Users className="size-3.5 text-primary" />
                Crew size
              </Label>
              <Input
                id="booking-guests"
                type="number"
                min={1}
                max={studio.maxCapacity}
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label>
                <Clock className="size-3.5 text-primary" />
                Start time
              </Label>
              <Select value={startHour} onValueChange={(v) => setStartHour(v ?? "")}>
                <SelectTrigger className="w-full" aria-label="Start time">
                  <SelectValue placeholder="Select a slot" />
                </SelectTrigger>
                <SelectContent>
                  {mockHours().map((h) => (
                    <SelectItem key={h} value={h}>
                      {h}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="booking-duration">Duration</Label>
              <Select value={duration} onValueChange={(v) => setDuration(v ?? "2")}>
                <SelectTrigger className="w-full" aria-label="Duration">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["1", "2", "3", "4", "6", "8"].map((d) => (
                    <SelectItem key={d} value={d}>
                      {d} {d === "1" ? "hour" : "hours"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <p className="mb-1.5 text-xs font-medium text-muted-foreground">
              Mock availability for {date || "your date"}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {mockHours().map((h) => (
                <span
                  key={h}
                  className={cn(
                    "rounded-md border px-2 py-1 text-xs font-medium",
                    h === startHour
                      ? "border-primary bg-accent text-accent-foreground"
                      : "border-border text-muted-foreground"
                  )}
                >
                  {h}
                </span>
              ))}
            </div>
          </div>

          <Separator />

          {/* Price summary */}
          <div className="flex flex-col gap-1.5 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>
                ${rate}/hr × {hours} {hours === 1 ? "hour" : "hours"}
              </span>
              <span className="text-foreground">${subtotal}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>SceneSlot service fee</span>
              <span className="text-foreground">${serviceFee}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Refundable deposit</span>
              <span className="text-foreground">${studio.deposit}</span>
            </div>
            <Separator className="my-1" />
            <div className="flex justify-between font-semibold">
              <span>Session total</span>
              <span>${subtotal + serviceFee + studio.deposit}</span>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!date || !startHour}>
              <BadgeCheck className="size-4" />
              Book Workspace Now
            </Button>
          </DialogFooter>
          <p className="text-center text-xs text-muted-foreground sm:-mt-2">
            Demo UI — booking requests are not sent until the backend stage.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
