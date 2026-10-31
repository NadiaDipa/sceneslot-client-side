"use client";

import { DeleteConfirmDialog } from "@/components/studio/delete-confirm-dialog";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { listings } from "@/data/studios";
import type { Listing } from "@/lib/types";
import { cn } from "cn";
import { Edit3, Eye, Plus, Trash2, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const statusStyles: Record<string, string> = {
  Active: "bg-emerald-500/10 text-emerald-700",
  Draft: "bg-secondary text-secondary-foreground",
  Inactive: "bg-destructive/10 text-destructive",
};

export function ListingRow({ listing }: { listing: Listing }) {
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <li className="flex flex-col gap-4 rounded-2xl border-border bg-card p-4 ring-1 ring-foreground/10 transition-shadow hover:shadow-md hover:shadow-foreground/5 sm:flex-row sm:items-center sm:p-5">
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-xl sm:aspect-video sm:h-24 sm:w-40">
        <Image src={listing.image} alt={listing.title} fill sizes="200px" className="object-cover" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="font-heading text-base font-semibold">{listing.title}</h2>
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold",
              statusStyles[listing.status]
            )}
          >
            {listing.status}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          {listing.category} · {listing.location} ·{" "}
          <span className="inline-flex items-center gap-1">
            <Users className="size-3" />
            {listing.bookingsThisMonth} bookings this month
          </span>
        </p>
        <p className="text-sm">
          <span className="font-semibold">${listing.hourlyRate}</span>
          <span className="text-muted-foreground"> / hour</span>
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Button variant="outline" size="icon" aria-label={`Edit ${listing.title}`} render={<Link href={`/studios/edit/${listing.studioId}`} />}>
          <Edit3 />
        </Button>
        <Button variant="outline" size="icon" aria-label={`View ${listing.title}`} render={<Link href={`/studios/${listing.studioId}`} />}>
          <Eye />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          aria-label={`Delete ${listing.title}`}
          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={() => setDeleteOpen(true)}
        >
          <Trash2 />
        </Button>
      </div>

      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        itemName={listing.title}
      />
    </li>
  );
}

export function MyListingsContent() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="font-heading text-3xl font-semibold sm:text-4xl">
            My studio listings
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            {listings.length} spaces ·{" "}
            {listings.reduce((a, l) => a + l.bookingsThisMonth, 0)} bookings this
            month
          </p>
        </div>
        <Button className="gap-2" render={<Link href="/add-studio" />}>
          <Plus className="size-4" />
          Add New Studio
        </Button>
      </div>

      {listings.length === 0 ? (
        <EmptyState
          icon={Plus}
          title="No listings yet"
          description="Your published studios will appear here. Add your first space and start accepting bookings."
          actionLabel="Add New Studio"
          actionHref="/add-studio"
        />
      ) : (
        <ul className="flex flex-col gap-4">
          {listings.map((l) => (
            <ListingRow key={l.studioId} listing={l} />
          ))}
        </ul>
      )}
    </div>
  );
}
