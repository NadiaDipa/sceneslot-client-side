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
import { toast } from "sonner";

const statusStyles: Record<string, string> = {
  Active: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
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
      toast.error("Could not find this listing. Please refresh the page.");
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
        toast.error(errorData?.message || "Failed to delete the studio.");
        return;
      }

      setDeleteOpen(false);
      toast.success("Studio deleted successfully.");
      onDeleted?.(id);
    } catch (err) {
      console.error("Failed to delete listing:", err);
      setDeleteFailed(true);
      toast.error("Failed to delete the studio. Please try again.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <li className="flex flex-wrap items-start gap-x-3.5 gap-y-3 rounded-2xl border-border bg-card p-4 ring-1 ring-foreground/10 transition-shadow hover:shadow-md hover:shadow-foreground/5 sm:flex-nowrap sm:items-center sm:gap-6 sm:p-5">
      <div className="relative aspect-[16/10] w-24 shrink-0 overflow-hidden rounded-xl sm:aspect-auto sm:h-[132px] sm:w-[220px]">
        <Image
          src={listing.image || listing.imageUrl}
          alt={listing.title}
          fill
          sizes="220px"
          className="object-cover"
        />
      </div>

      {/* Left-aligned at every breakpoint: image + title/price share the top
          row on mobile (flex-wrap moves the full-width actions row below),
          image/meta/actions run as one row from sm up */}
      <div className="flex min-w-0 flex-1 flex-col items-start gap-1.5 text-left">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="font-heading text-xl leading-[1.2] font-semibold">
            {listing.title}
          </h2>

          <span
            className={cn(
              "inline-flex items-center rounded-full px-2.5 py-1 text-[0.8125rem] font-semibold",
              statusStyles[listing.status || "Active"]
            )}
          >
            {listing.status || "Active"}
          </span>
        </div>

        <p className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
          {listing.category} · {listing.location} ·{" "}
          <span className="inline-flex items-center gap-1.5">
            <Users className="size-4 shrink-0" />
            {listing.bookingsThisMonth || 0} bookings this month
          </span>
        </p>

        <p className="font-heading text-xl leading-[1.2] font-bold">
          ${listing.hourlyRate}
          <span className="ml-1 text-sm font-medium text-muted-foreground">
            / hour
          </span>
        </p>

        <div className="flex w-full flex-col items-start gap-1 text-sm text-muted-foreground sm:w-auto sm:flex-row sm:items-center sm:gap-4">
          <span className="inline-flex items-center gap-1.5">
            <UserRound className="size-4 shrink-0" />
            Host:{" "}
            <span className="font-semibold text-foreground">
              {listing.ownerName || "Not available"}
            </span>
          </span>

          <span className="inline-flex min-w-0 items-center gap-1.5 break-all">
            <Mail className="size-4 shrink-0" />
            {listing.ownerEmail || "Not available"}
          </span>
        </div>
      </div>

      {/* Actions — same Edit / View / Delete, one full-width row at the card
          bottom on mobile (border-t separator), right-grouped column on
          desktop; uniform 40px (44px mobile) round tiles with 18px icons */}
      <div className="flex w-full shrink-0 items-center gap-3 border-t border-border/70 pt-3 sm:w-auto sm:justify-end sm:border-t-0 sm:gap-2 sm:pt-0">
        <Button
          variant="outline"
          size="icon"
          aria-label={`Edit ${listing.title}`}
          className="[&_svg]:size-4.5"
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
          className="[&_svg]:size-4.5"
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
          className="text-destructive hover:bg-destructive/10 hover:text-destructive [&_svg]:size-4.5"
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
        toast.error("Could not load your listings. Please try again.");
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
      {/* Header — centered on mobile, split left/right from sm up */}
      <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
        <div className="flex flex-col gap-1">
          <h1 className="font-heading text-[2rem] leading-[1.15] font-semibold text-balance sm:text-4xl">
            My studio listings
          </h1>

          <p className="text-base font-medium text-muted-foreground">
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