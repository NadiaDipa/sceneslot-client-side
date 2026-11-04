"use client";

import { API_BASE } from "@/lib/api";
import { DeleteConfirmDialog } from "@/components/studio/delete-confirm-dialog";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { cn } from "cn";
import {
  Edit3,
  Eye,
  Plus,
  Trash2,
  Users,
  Loader2,
  UserRound,
  Mail,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const statusStyles: Record<string, string> = {
  Active: "bg-emerald-500/10 text-emerald-700",
  Draft: "bg-secondary text-secondary-foreground",
  Inactive: "bg-destructive/10 text-destructive",
};

export function ListingRow({
  listing,
  onDeleted,
}: {
  listing: any;
  onDeleted?: (id: string) => void;
}) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteFailed, setDeleteFailed] = useState(false);

  async function handleDelete() {
    const id = listing._id || listing.studioId;

    if (!id) {
      setDeleteFailed(true);
      return;
    }

    setDeleteFailed(false);
    setDeleting(true);

    try {
      const res = await fetch(`${API_BASE}/studios/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        console.error("Delete failed:", res.status, errorData);
        setDeleteFailed(true);
        return;
      }

      setDeleteOpen(false);
      onDeleted?.(id);
    } catch (err) {
      console.error("Failed to delete listing:", err);
      setDeleteFailed(true);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <li className="flex flex-col gap-4 rounded-2xl border-border bg-card p-4 ring-1 ring-foreground/10 transition-shadow hover:shadow-md hover:shadow-foreground/5 sm:flex-row sm:items-center sm:p-5">
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-xl sm:aspect-video sm:h-24 sm:w-40">
        <Image
          src={listing.image || listing.imageUrl}
          alt={listing.title}
          fill
          sizes="200px"
          className="object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="font-heading text-base font-semibold">
            {listing.title}
          </h2>

          <span
            className={cn(
              "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold",
              statusStyles[listing.status || "Active"]
            )}
          >
            {listing.status || "Active"}
          </span>
        </div>

        <p className="text-xs text-muted-foreground">
          {listing.category} · {listing.location} ·{" "}
          <span className="inline-flex items-center gap-1">
            <Users className="size-3" />
            {listing.bookingsThisMonth || 0} bookings this month
          </span>
        </p>

        <p className="text-sm">
          <span className="font-semibold">${listing.hourlyRate}</span>
          <span className="text-muted-foreground"> / hour</span>
        </p>

        <div className="flex flex-col gap-1 text-xs text-muted-foreground sm:flex-row sm:gap-4">
          <span className="inline-flex items-center gap-1.5">
            <UserRound className="size-3.5" />
            Host: {listing.ownerName || "Not available"}
          </span>

          <span className="inline-flex items-center gap-1.5">
            <Mail className="size-3.5" />
            {listing.ownerEmail || "Not available"}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          aria-label={`Edit ${listing.title}`}
          render={
            <Link href={`/studios/edit/${listing._id || listing.studioId}`} />
          }
        >
          <Edit3 />
        </Button>

        <Button
          variant="outline"
          size="icon"
          aria-label={`View ${listing.title}`}
          render={
            <Link href={`/studios/${listing._id || listing.studioId}`} />
          }
        >
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
        onConfirm={handleDelete}
        pending={deleting}
        onError={deleteFailed}
      />
    </li>
  );
}

export function MyListingsContent() {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const onDeleted = (id: string) => {
    setListings((prev) =>
      prev.filter((listing) => (listing._id || listing.studioId) !== id)
    );
  };

  useEffect(() => {
    fetch(`${API_BASE}/my-listings`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch my listings");
        }
        return res.json();
      })
      .then((data) => {
        setListings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch my listings:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const totalBookings = listings.reduce(
    (total, listing) => total + (listing.bookingsThisMonth || 0),
    0
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="font-heading text-3xl font-semibold sm:text-4xl">
            My studio listings
          </h1>

          <p className="text-sm text-muted-foreground sm:text-base">
            {listings.length} spaces · {totalBookings} bookings this month
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
          {listings.map((listing: any) => (
            <ListingRow
              key={listing._id || listing.studioId}
              listing={listing}
              onDeleted={onDeleted}
            />
          ))}
        </ul>
      )}
    </div>
  );
}