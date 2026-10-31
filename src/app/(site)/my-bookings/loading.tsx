import { TableRowsSkeleton } from "@/components/shared/skeletons";
import { Skeleton } from "@/components/ui/skeleton";

export default function MyBookingsLoading() {
  return (
    <section
      className="container-page flex flex-col gap-6 py-10 sm:py-14"
      aria-busy="true"
      aria-label="Loading bookings"
    >
      <div className="flex flex-col gap-2">
        <Skeleton className="h-9 w-44" />
        <Skeleton className="h-4 w-72" />
      </div>
      <TableRowsSkeleton />
    </section>
  );
}
