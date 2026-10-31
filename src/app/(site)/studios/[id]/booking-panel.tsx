"use client";

import { BookingModal } from "@/components/studio/booking-modal";
import { Button } from "@/components/ui/button";
import type { Studio } from "@/lib/types";
import { cn } from "cn";
import { CalendarCheck, Heart, Share2 } from "lucide-react";
import { useState } from "react";

export function BookingPanel({ studio }: { studio: Studio }) {
  const [open, setOpen] = useState(false);
  const [wished, setWished] = useState(false);

  return (
    <>
      <aside className="flex flex-col gap-4 rounded-2xl bg-card p-6 ring-1 ring-foreground/10 shadow-lg shadow-foreground/5">
        <div className="flex items-baseline justify-between">
          <span className="font-heading text-3xl font-semibold">
            ${studio.hourlyRate}
            <span className="text-sm font-normal text-muted-foreground"> / hour</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700">
            <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden />
            Instant booking
          </span>
        </div>

        <p className="text-xs leading-relaxed text-muted-foreground">
          Refundable security deposit: ${studio.deposit} · Free cancellation up
          to 24 hours before the slot
        </p>

        <Button size="lg" className="w-full gap-2" onClick={() => setOpen(true)}>
          <CalendarCheck className="size-4" />
          Book Workspace Now
        </Button>

        <div className="grid grid-cols-2 gap-2">
          {/* Wishlist / share become real with the backend stage */}
          <Button
            variant="outline"
            onClick={() => setWished((w) => !w)}
            className={cn("gap-2", wished && "text-accent-foreground")}
            aria-pressed={wished}
          >
            <Heart className={cn("size-4", wished && "fill-primary text-primary")} />
            {wished ? "Saved" : "Save"}
          </Button>
          <Button variant="outline" className="gap-2">
            <Share2 className="size-4" />
            Share
          </Button>
        </div>
      </aside>

      <BookingModal studio={studio} open={open} onOpenChange={setOpen} />
    </>
  );
}
