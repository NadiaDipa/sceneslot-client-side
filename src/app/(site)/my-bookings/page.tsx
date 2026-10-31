import type { Metadata } from "next";
import { EmptyState } from "@/components/shared/empty-state";
import { bookings } from "@/data/studios";
import { CalendarDays } from "lucide-react";
import { BookingCard } from "./booking-card";

export const metadata: Metadata = { title: "My Bookings" };

export default function MyBookingsPage() {
  return (
    <section className="container-page py-10 sm:py-14">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="font-heading text-3xl font-semibold sm:text-4xl">
            My bookings
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Track confirmed sessions, pending approvals, and past shoots.
          </p>
        </div>

        {bookings.length === 0 ? (
          <EmptyState
            icon={CalendarDays}
            title="No bookings yet"
            description="When you reserve a studio, it shows up here with its date, hours, and status. Your first session is a search away."
            actionLabel="Explore Studios"
            actionHref="/studios"
          />
        ) : (
          <ul className="flex flex-col gap-4">
            {bookings.map((b, i) => (
              <BookingCard key={b.id} booking={b} priority={i === 0} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
