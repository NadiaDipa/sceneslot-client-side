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
import { API_BASE } from "@/lib/api";
import type { Studio } from "@/lib/types";
import { cn } from "cn";
import { BadgeCheck, CalendarDays, Clock, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

interface BookingModalProps {
  studio: Studio;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const START_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

export function BookingModal({
  studio,
  open,
  onOpenChange,
}: BookingModalProps) {
  const router = useRouter();

  const [date, setDate] = useState("");
  const [startHour, setStartHour] = useState("");
  const [duration, setDuration] = useState("2");
  const [guests, setGuests] = useState("1");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const rate = studio.hourlyRate;
  const hours = Number(duration) || 0;
  const subtotal = rate * hours;
  const serviceFee = Math.round(subtotal * 0.08);

  // Reset the form every time the modal is closed
  function handleOpenChange(next: boolean) {
    if (!next) {
      setDate("");
      setStartHour("");
      setDuration("2");
      setGuests("1");
      setMessage("");
      setSuccess(false);
    }
    onOpenChange(next);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const crew = Number(guests);

    if (!Number.isInteger(crew) || crew < 1) {
      toast.error("Crew size must be at least 1.");
      return;
    }

    if (crew > studio.maxCapacity) {
      toast.error(`This studio fits up to ${studio.maxCapacity} guests.`);
      return;
    }

    setLoading(true);
    setMessage("");
    setSuccess(false);

    try {
      const response = await fetch(`${API_BASE}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          studioId: studio.id,
          date,
          startTime: startHour,
          duration: hours,
          guests: crew,
        }),
      });

      const result = await response.json().catch(() => ({}));

      // Not logged in → send to login and come back to this studio
      if (response.status === 401) {
        toast.error("Please log in to book this workspace.");
        handleOpenChange(false);
        router.push(`/login?redirect=/studios/${studio.id}`);
        return;
      }

      if (!response.ok) {
        throw new Error(result.message || "Booking failed");
      }

      setSuccess(true);
      setMessage("Booking request submitted successfully!");
      toast.success("Booking request submitted successfully!");

      router.refresh();
      setTimeout(() => {
        handleOpenChange(false);
        router.push("/my-bookings");
      }, 1200);
    } catch (error) {
      const text =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";

      setSuccess(false);
      setMessage(text);
      toast.error(text);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">
            Book this workspace
          </DialogTitle>
          <DialogDescription>
            {studio.title} · {studio.location} — choose your preferred date and
            time.
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
                required
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

              <Select
                value={startHour}
                onValueChange={(v) => setStartHour(v ?? "")}
              >
                <SelectTrigger className="w-full" aria-label="Start time">
                  <SelectValue placeholder="Select a slot" />
                </SelectTrigger>
                <SelectContent>
                  {START_SLOTS.map((h) => (
                    <SelectItem key={h} value={h}>
                      {h}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>Duration</Label>
              <Select
                value={duration}
                onValueChange={(v) => setDuration(v ?? "2")}
              >
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

          <Separator />

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

          {message && (
            <p
              className={cn(
                "rounded-md p-3 text-sm",
                success
                  ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                  : "bg-destructive/10 text-destructive"
              )}
            >
              {message}
            </p>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
            >
              Close
            </Button>

            <Button
              type="submit"
              disabled={!date || !startHour || loading || success}
            >
              <BadgeCheck className="size-4" />
              {loading
                ? "Submitting..."
                : success
                  ? "Booking Submitted"
                  : "Book Workspace Now"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}