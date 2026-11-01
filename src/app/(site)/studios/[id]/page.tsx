import type { Metadata } from "next";
import { RatingStars } from "@/components/shared/rating-stars";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "cn";
import { CircleCheck, Clock, MapPin, ShieldCheck, Users } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookingPanel } from "./booking-panel";
import { StudioGallery } from "@/components/studio/studio-gallery";

interface Props {
  params: Promise<{ id: string }>;
}

async function getStudio(id: string) {
  const res = await fetch(`http://localhost:5000/studios/${id}`);
  return res.json();
}

export default async function StudioDetailsPage({ params }: Props) {
  const { id } = await params;
  const studio = await getStudio(id);

  return (
    <>
      {/* Breadcrumb */}
      <div className="container-page pt-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Link href="/studios" className="rounded-sm transition-colors hover:text-foreground">
            Explore Studios
          </Link>
          <span aria-hidden>/</span>
          <Link
            href={`/studios?category=${encodeURIComponent(studio.category)}`}
            className="rounded-sm transition-colors hover:text-foreground"
          >
            {studio.category}
          </Link>
          <span aria-hidden>/</span>
          <span className="truncate font-medium text-foreground">{studio.title}</span>
        </nav>
      </div>

      <div className="container-page flex flex-col gap-10 py-6 sm:gap-12 sm:py-8">
        {/* Gallery */}
        <StudioGallery studio={studio} />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_22rem] lg:items-start">
          {/* Left column */}
          <div className="flex flex-col gap-8">
            {/* Title block */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="h-6">{studio.category}</Badge>
                <Badge variant="secondary" className="h-6 gap-1">
                  <Clock className="size-3" />
                  Instant booking
                </Badge>
              </div>
              <h1 className="font-heading text-3xl font-semibold sm:text-4xl">
                {studio.title}
              </h1>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                {studio.reviewsCount > 0 ? (
                  <span className="inline-flex items-center gap-2">
                    <RatingStars rating={studio.rating} />
                    <span className="font-semibold text-foreground">{studio.rating}</span>
                    ({studio.reviewsCount} reviews)
                  </span>
                ) : (
                  <span className="text-emerald-700">New listing</span>
                )}
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-4 text-primary" />
                  {studio.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Users className="size-4 text-primary" />
                  Up to {studio.maxCapacity} guests
                </span>
              </div>
              <p className="text-base leading-relaxed text-muted-foreground">
                {studio.description}
              </p>
            </div>

            {/* Key facts */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {[
                { label: "Hourly rate", value: `$${studio.hourlyRate}` },
                { label: "Security deposit", value: `$${studio.deposit}` },
                { label: "Max capacity", value: `${studio.maxCapacity} guests` },
              ].map((fact) => (
                <div key={fact.label} className="rounded-xl border border-border bg-card p-4">
                  <p className="text-xs text-muted-foreground">{fact.label}</p>
                  <p className="font-heading mt-1 text-lg font-semibold">{fact.value}</p>
                </div>
              ))}
            </div>

            {/* Amenities */}
            <div className="flex flex-col gap-4">
              <h2 className="font-heading text-xl font-semibold">Amenities</h2>
              <ul className="grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {studio.amenities.map((a) => (
                  <li key={a} className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                    <CircleCheck className="size-4 shrink-0 text-primary" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>

            {/* Overview */}
            <div className="flex flex-col gap-4">
              <h2 className="font-heading text-xl font-semibold">About this space</h2>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                {studio.overview}
              </p>
              {/* Address is intentionally hidden until the backend stage */}
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Exact address:</span>{" "}
                {studio.address} — shared with confirmed bookings.
              </p>
            </div>

            <Separator />

            {/* Host */}
            <div className="flex flex-col gap-3">
              <h2 className="font-heading text-xl font-semibold">Meet your host</h2>
              <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-start">
                <Avatar size="lg" className="size-14">
                  <AvatarImage src={studio.host.avatar} alt={studio.host.name} />
                  <AvatarFallback>
                    {studio.host.name
                      .split(" ")
                      .map((p) => p[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                  <p className="font-heading text-base font-semibold">{studio.host.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {studio.host.joined}
                    {studio.host.responseRate ? ` · ${studio.host.responseRate}` : ""}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {studio.host.bio}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Reviews (backend-backed listings have none yet) */}
            {studio.reviews.length > 0 ? (
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="font-heading text-xl font-semibold">
                    Creator reviews
                  </h2>
                  <span className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">{studio.rating}</span>{" "}
                    · {studio.reviewsCount} reviews
                  </span>
                </div>
                <div className="flex flex-col gap-4">
                  {studio.reviews.map((r) => (
                    <article
                      key={r.id}
                      className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-5"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <Avatar size="sm">
                            <AvatarImage src={r.avatar} alt={r.author} />
                          </Avatar>
                          <div>
                            <p className="text-sm font-semibold">{r.author}</p>
                            <p className="text-xs text-muted-foreground">{r.date}</p>
                          </div>
                        </div>
                        <RatingStars rating={r.rating} />
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {r.comment}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          {/* Right column — booking */}
          <div className={cn("lg:sticky lg:top-24")}>
            <BookingPanel studio={studio} />
            <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="size-4 shrink-0 text-primary" />
              Covered by SceneSlot liability protection on every booking.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
