import type { Metadata } from "next";
import { EmptyState } from "@/components/shared/empty-state";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { BookingCard } from "./booking-card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Booking } from "@/lib/types";

export const metadata: Metadata = { title: "My Bookings" };

export default async function MyBookingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login?redirect=/my-bookings");
  }

  let bookings: Booking[] = [];

  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/my-bookings`,
      {
        headers: await headers(),
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch bookings");
    }

    bookings = await response.json();
  } catch (error) {
    console.error("My bookings fetch error:", error);
  }

  return (
    <section className="container-page py-10 sm:py-14">
      <div className="flex flex-col gap-6">
        <div>
          <Button
            variant="ghost"
            size="sm"
            className="mb-4 -ml-2 gap-2"
            render={<Link href="/dashboard" />}
          >
            <ArrowLeft className="size-4" />
            Back to Dashboard
          </Button>

          <div className="flex flex-col gap-1">
            <h1 className="font-heading text-3xl font-semibold sm:text-4xl">
              My bookings
            </h1>

            <p className="text-sm text-muted-foreground sm:text-base">
              Track confirmed sessions, pending approvals, and past shoots.
            </p>
          </div>
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
            {bookings.map((booking, index) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                priority={index === 0}
              />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}