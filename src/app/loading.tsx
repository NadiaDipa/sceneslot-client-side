import { StudioGridSkeleton } from "@/components/shared/skeletons";
import { Skeleton } from "@/components/ui/skeleton";

/** Route-transition loading shell */
export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Loading page">
      <div className="relative h-[22rem] w-full border-b border-border bg-secondary/60 sm:h-[26rem]">
        <div className="container-page flex h-full flex-col justify-end gap-3 pb-10">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-10 w-3/4 max-w-xl" />
          <Skeleton className="h-5 w-2/3 max-w-lg" />
        </div>
      </div>
      <div className="container-page py-12">
        <StudioGridSkeleton count={6} />
      </div>
    </div>
  );
}
