"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Booking, BookingStatus } from "@/lib/types";
import { cn } from "cn";
import { Ban, CalendarDays, Clock, MapPin, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { DeleteConfirmDialog } from "@/components/studio/delete-confirm-dialog";

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
  /** Set for above-the-fold cards so the image isn't LCP-warned. */
  priority?: boolean;
}) {
  const [cancelOpen, setCancelOpen] = useState(false);
  const canCancel = booking.status === "Pending";

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
                statusStyles[booking.status]
              )}
            >
              {booking.status}
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
            Booking ref <span className="font-mono font-medium">{booking.id}</span>
          </p>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-2 sm:items-stretch">
          <p className="font-heading text-lg font-semibold">
            ${booking.total}
            <span className="text-xs font-normal text-muted-foreground"> total</span>
          </p>
          {canCancel ? (
            <Button
              variant="destructive"
              size="sm"
              className="gap-1.5"
              onClick={() => setCancelOpen(true)}
            >
              <Ban className="size-3.5" />
              Cancel Booking
            </Button>
          ) : (
            <Separator className="w-24" />
          )}
        </div>
      </div>

      {/* Demo only — booking state changes land with the API */}
      <DeleteConfirmDialog
        open={cancelOpen}
        onOpenChange={setCancelOpen}
        title="Cancel this booking?"
        itemName={`${booking.studioTitle} — ${booking.date}`}
      />
    </li>
  );
}
