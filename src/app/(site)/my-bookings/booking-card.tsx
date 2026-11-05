"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import type { Booking, BookingStatus } from "@/lib/types";
import { API_BASE } from "@/lib/api";
import { cn } from "cn";
import {
  Ban,
  CalendarDays,
  Clock,
  Loader2,
  MapPin,
  TriangleAlert,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

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
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [error, setError] = useState("");

  const canCancel = status === "Pending";

  const handleCancel = async () => {
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

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || "Failed to cancel booking.");
      }

      setStatus("Cancelled");
      setConfirmOpen(false);
      toast.success("Booking cancelled successfully.");
    } catch (error) {
      console.error("Cancel booking error:", error);

      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";

      setError(message);
      toast.error(message);
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

          {error && <p className="text-xs text-destructive">{error}</p>}
        </div>

        <div className="flex shrink-0 flex-col items-end gap-2 sm:items-stretch">
          <p className="font-heading text-lg font-semibold">
            ${booking.total}
            <span className="text-xs font-normal text-muted-foreground">
              {" "}
              total
            </span>
          </p>

          {canCancel ? (
            <Button
              variant="destructive"
              size="sm"
              className="gap-1.5"
              onClick={() => setConfirmOpen(true)}
              disabled={isCancelling}
            >
              <Ban className="size-3.5" />
              Cancel Booking
            </Button>
          ) : (
            <Separator className="w-24" />
          )}
        </div>
      </div>

      {/* Custom confirmation modal (replaces window.confirm) */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <div className="me-auto grid size-11 place-items-center rounded-xl bg-destructive/10 ring-1 ring-destructive/20">
              <TriangleAlert className="size-5 text-destructive" />
            </div>
            <DialogTitle className="font-heading text-lg font-semibold">
              Cancel this booking?
            </DialogTitle>
            <DialogDescription>
              Your session at{" "}
              <span className="font-medium text-foreground">
                &ldquo;{booking.studioTitle}&rdquo;
              </span>{" "}
              on {booking.date} will be cancelled and the time slot will be
              released for other creators.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfirmOpen(false)}
              disabled={isCancelling}
            >
              Keep booking
            </Button>

            <Button
              variant="destructive"
              onClick={handleCancel}
              disabled={isCancelling}
            >
              {isCancelling ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Cancelling…
                </>
              ) : (
                "Yes, cancel booking"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </li>
  );
}