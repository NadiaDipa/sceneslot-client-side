import { TableRowsSkeleton } from "@/components/shared/skeletons";
import { Skeleton } from "@/components/ui/skeleton";

export default function MyListingsLoading() {
  return (
    <section
      className="container-page flex flex-col gap-6 py-10 sm:py-14"
      aria-busy="true"
      aria-label="Loading your listings"
    >
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-9 w-64" />
          <Skeleton className="h-4 w-44" />
        </div>
        <Skeleton className="h-9 w-36 rounded-full" />
      </div>
      <TableRowsSkeleton />
    </section>
  );
}
