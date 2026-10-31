import { FilterRowSkeleton, StudioGridSkeleton } from "@/components/shared/skeletons";
import { Skeleton } from "@/components/ui/skeleton";

export default function StudiosLoading() {
  return (
    <>
      <section className="border-b border-border bg-secondary/50 py-12 sm:py-16">
        <div className="container-page flex flex-col items-center gap-3">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-10 w-72" />
          <Skeleton className="h-5 w-full max-w-xl" />
        </div>
      </section>
      <section className="container-page py-10 sm:py-14" aria-busy="true" aria-label="Loading studios">
        <FilterRowSkeleton />
        <div className="mt-8">
          <StudioGridSkeleton />
        </div>
      </section>
    </>
  );
}
