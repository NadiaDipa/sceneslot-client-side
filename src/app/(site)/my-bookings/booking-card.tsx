"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Booking, BookingStatus } from "@/lib/types";
import { API_BASE } from "@/lib/api";
import { cn } from "cn";
import { Ban, CalendarDays, Clock, MapPin, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const statusStyles: Record<BookingStatus, string> = {
  Pending: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  Confirmed: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  Completed: "bg-primary/15 text-accent-foreground",
  Cancelled: "bg-destructive/10 text-destructive",
};

export function BookingCard({
  booking,
  priority = false,
}: {
  booking: Booking;
  priority?: boolean;
}) {
  const [status, setStatus] = useState<BookingStatus>(booking.status);
  const [isCancelling, setIsCancelling] = useState(false);
  const [error, setError] = useState("");

  const canCancel = status === "Pending";

  const handleCancel = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to cancel "${booking.studioTitle}" on ${booking.date}?`
    );

    if (!confirmed) return;

    try {
      setIsCancelling(true);
      setError("");

      const response = await fetch(
        `${API_BASE}/bookings/${booking.id}/cancel`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to cancel booking.");
      }

      setStatus("Cancelled");
    } catch (error) {
      console.error("Cancel booking error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <li className="overflow-hidden rounded-2xl bg-card ring-1 ring-foreground/10 transition-shadow hover:shadow-md hover:shadow-foreground/5">
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-5">
        <Link
          href={`/studios/${booking.studioId}`}
          className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50 sm:aspect-video sm:h-24 sm:w-40"
        >
          <Image
            src={booking.studioImage}
            alt={booking.studioTitle}
            fill
            sizes="200px"
            priority={priority}
            loading={priority ? "eager" : undefined}
            className="object-cover"
          />
        </Link>

        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/studios/${booking.studioId}`}
              className="font-heading text-base font-semibold outline-none transition-colors hover:text-accent-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {booking.studioTitle}
            </Link>

            <span
              className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
                statusStyles[status]
              )}
            >
              {status}
            </span>
          </div>

          <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3.5" />
              {booking.location}
            </span>

            <span className="inline-flex items-center gap-1">
              <CalendarDays className="size-3.5" />
              {booking.date}
            </span>

            <span className="inline-flex items-center gap-1">
              <Clock className="size-3.5" />
              {booking.hours[0]} – {booking.hours[1]} ·{" "}
              {Number(booking.hours[1].split(":")[0]) -
                Number(booking.hours[0].split(":")[0])}
              h
            </span>

            <span className="inline-flex items-center gap-1">
              <Users className="size-3.5" />
              {booking.guests} guests
            </span>
          </p>

          <p className="text-xs text-muted-foreground">
            Booking ref{" "}
            <span className="font-mono font-medium">{booking.id}</span>
          </p>

          {error && (
            <p className="text-xs text-destructive">{error}</p>
          )}
        </div>

        <div className="flex shrink-0 flex-col items-end gap-2 sm:items-stretch">
          <p className="font-heading text-lg font-semibold">
            ${booking.total}
            <span className="text-xs font-normal text-muted-foreground">
              {" "}total
            </span>
          </p>

          {canCancel ? (
            <Button
              variant="destructive"
              size="sm"
              className="gap-1.5"
              onClick={handleCancel}
              disabled={isCancelling}
            >
              <Ban className="size-3.5" />
              {isCancelling ? "Cancelling..." : "Cancel Booking"}
            </Button>
          ) : (
            <Separator className="w-24" />
          )}
        </div>
      </div>
    </li>
  );
}
