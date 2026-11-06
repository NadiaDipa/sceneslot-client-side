import type { Metadata } from "next";
import { categoryNames } from "@/data/categories";
import { API_BASE, mapStudioDoc, type StudioDoc } from "@/lib/api";
import type { Studio } from "@/lib/types";
import { ExploreStudios } from "./explore-studios";

export const metadata: Metadata = {
  title: "Explore Studios",
  description:
    "Search and filter creative studios — photo, film, podcast, music, and maker spaces bookable by the hour.",
};

export default async function StudiosPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; location?: string }>;
}) {
  const params = await searchParams;

  let docs: StudioDoc[] = [];

  try {
    const res = await fetch(`${API_BASE}/studios`, {
      cache: "no-store",
    });

    if (res.ok) {
      docs = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch studios:", error);
  }

  const studios: Studio[] = docs.map(mapStudioDoc);

  const uniqueLocations = [
    ...new Set(studios.map((studio) => studio.location)),
  ];

  const initialCategory =
    params.category && (categoryNames as string[]).includes(params.category)
      ? params.category
      : "All Categories";

  return (
    <>
      {/* Page header */}
      <section className="relative overflow-hidden bg-secondary/50 py-12 sm:py-16">
        <div
          aria-hidden
          className="bg-dotted-ink absolute inset-0 opacity-60"
        />
        <div className="container-page relative flex flex-col items-center gap-3 text-center">
          <span className="font-mono text-xs font-medium tracking-widest text-muted-foreground uppercase">
            The marketplace
          </span>
          <h1 className="font-heading text-[2rem] leading-[1.15] font-semibold text-balance sm:text-4xl lg:text-5xl">
            Explore creative studios
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
            Discover creative photo, film, podcast, music and maker spaces — searchable by category, location, and hourly rate.
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-sm">
            {categoryNames.map((c) => {
              const count = studios.filter((s) => s.category === c).length;
              return count > 0 ? (
                <span
                  key={c}
                  className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  {c} · {count}
                </span>
              ) : null;
            })}
          </div>
        </div>
      </section>

      {/* Listing */}
      <section className="container-page py-10 sm:py-14">
        <ExploreStudios
          key={initialCategory}
          studios={studios}
          uniqueLocations={uniqueLocations}
          initialCategory={initialCategory}
          initialLocationQuery={params.location?.trim() ?? ""}
        />
      </section>
    </>
  );
}