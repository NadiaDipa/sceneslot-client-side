"use client";

import { StudioCard } from "@/components/studio/studio-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categoryNameValues } from "@/data/categories";
import type { Studio } from "@/lib/types";
import { cn } from "cn";
import { MapPin, SearchX, Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";

type SortKey = "recommended" | "price-asc" | "price-desc" | "rating";

const priceOptions = [
  { value: "all", label: "Any price" },
  { value: "under-40", label: "Under $40/hr" },
  { value: "40-80", label: "$40 – $80/hr" },
  { value: "80-120", label: "$80 – $120/hr" },
  { value: "over-120", label: "$120+/hr" },
];

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "recommended", label: "Recommended" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
];

export function ExploreStudios({
  studios,
  uniqueLocations,
  initialCategory = "All Categories",
}: {
  studios: Studio[];
  uniqueLocations: string[];
  initialCategory?: string;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [location, setLocation] = useState("all");
  const [price, setPrice] = useState("all");
  const [sort, setSort] = useState<SortKey>("recommended");

  const hasFilters =
    query !== "" ||
    category !== "All Categories" ||
    location !== "all" ||
    price !== "all";

  function clearFilters() {
    setQuery("");
    setCategory("All Categories");
    setLocation("all");
    setPrice("all");
  }

  const results = useMemo(() => {
    /* Multi-term AND search with word-aware matching:
       - Title/category use token-prefix matching (so "photo" finds
         "Photography Loft", "workshops" finds the "Art Workshops" category).
       - Description/amenities use whole-word matching (with a simple trailing
         plural, so "portrait" still matches "portraits") — raw substring
         matching made coincidental hits relevant, e.g. "art" matching
         "voice-over artists" on a sound-stage listing. */
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const escapeRegex = (term: string) =>
      term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const matchPrefix = (term: string, text: string) =>
      new RegExp(`\\b${escapeRegex(term)}\\w*`, "i").test(text);
    const matchWord = (term: string, text: string) =>
      new RegExp(`\\b${escapeRegex(term)}(?:e?s)?\\b`, "i").test(text);

    let list = studios.filter((s) => {
      const matchesQuery =
        terms.length === 0 ||
        terms.every(
          (term) =>
            matchPrefix(term, s.title) ||
            matchPrefix(term, s.category) ||
            matchWord(term, s.description) ||
            matchWord(term, s.amenities.join(" "))
        );
      const matchesCategory =
        category === "All Categories" || s.category === category;
      const matchesLocation = location === "all" || s.location === location;
      const matchesPrice =
        price === "all" ||
        (price === "under-40" && s.hourlyRate < 40) ||
        (price === "40-80" && s.hourlyRate >= 40 && s.hourlyRate <= 80) ||
        (price === "80-120" && s.hourlyRate > 80 && s.hourlyRate <= 120) ||
        (price === "over-120" && s.hourlyRate > 120);
      return matchesQuery && matchesCategory && matchesLocation && matchesPrice;
    });

    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.hourlyRate - b.hourlyRate);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.hourlyRate - a.hourlyRate);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Recommended: featured first, then rating
        list = [...list].sort(
          (a, b) => Number(!!b.featured) - Number(!!a.featured) || b.rating - a.rating
        );
    }
    return list;
  }, [studios, query, category, location, price, sort]);

  return (
    <div className="flex flex-col gap-8">
      {/* Filter bar */}
      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 sm:p-5">
        <div className="relative">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search studios, amenities, or vibes…"
            aria-label="Search studios"
            className="h-10 pl-9 text-base sm:h-11"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded-full p-1 text-muted-foreground outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring/50"
            >
              <X className="size-4" />
            </button>
          ) : null}
        </div>

        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {[
            {
              label: "Category",
              value: category,
              onValueChange: (v: string | null) => setCategory(v ?? "All Categories"),
              options: categoryNameValues.map((c) => ({ value: c, label: c })),
            },
            {
              label: "Location",
              value: location,
              onValueChange: (v: string | null) => setLocation(v ?? "all"),
              options: [
                { value: "all", label: "All locations" },
                ...uniqueLocations.map((l) => ({ value: l, label: l })),
              ],
            },
            {
              label: "Price",
              value: price,
              onValueChange: (v: string | null) => setPrice(v ?? "all"),
              options: priceOptions,
            },
            {
              label: "Sort by",
              value: sort,
              onValueChange: (v: string | null) => setSort((v ?? "recommended") as SortKey),
              options: sortOptions.map((s) => ({ value: s.value, label: s.label })),
            },
          ].map((group) => (
            <div key={group.label} className="flex flex-col gap-1.5">
              <Label htmlFor={`filter-${group.label}`} className="text-sm text-foreground/80">
                {group.label}
              </Label>
              <Select value={group.value} onValueChange={group.onValueChange}>
                <SelectTrigger id={`filter-${group.label}`} className="w-full capitalize">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {group.options.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      </div>

      {/* Result meta */}
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{results.length}</span>{" "}
          {results.length === 1 ? "studio" : "studios"} found
        </p>
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="size-4 text-muted-foreground sm:hidden" aria-hidden />
          {hasFilters ? (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1.5">
              <X className="size-3.5" />
              Clear filters
            </Button>
          ) : null}
        </div>
      </div>

      {/* Active filter chips */}
      {hasFilters ? (
        <div className="flex flex-wrap gap-2">
          {category !== "All Categories" ? (
            <Badge variant="secondary">{category}</Badge>
          ) : null}
          {location !== "all" ? <Badge variant="secondary">{location}</Badge> : null}
          {price !== "all" ? (
            <Badge variant="secondary">{priceOptions.find((p) => p.value === price)?.label}</Badge>
          ) : null}
          {query ? <Badge variant="secondary">&ldquo;{query}&rdquo;</Badge> : null}
        </div>
      ) : null}

      {/* Grid or empty state */}
      {results.length > 0 ? (
        <div
          className={cn(
            "grid gap-6 sm:grid-cols-2",
            "lg:grid-cols-3"
          )}
        >
          {results.map((studio) => (
            <StudioCard key={studio.id} studio={studio} />
          ))}
        </div>
      ) : (
        <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center sm:py-20">
          <div aria-hidden className="bg-dotted-ink pointer-events-none absolute inset-0 opacity-60" />
          <div className="relative flex flex-col items-center gap-4">
            <div className="grid size-16 place-items-center rounded-2xl bg-accent text-accent-foreground">
              <SearchX className="size-8" strokeWidth={1.6} />
            </div>
            <div className="flex flex-col gap-1.5">
              <h2 className="font-heading text-xl font-semibold sm:text-2xl">
                No studios match those filters
              </h2>
              <p className="mx-auto max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
                Try a different category, widen the price range, or clear the
                search — the right room may just be one filter away.
              </p>
            </div>
            <Button className="mt-2 gap-2" onClick={clearFilters}>
              <MapPin className="size-4" />
              Clear all filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
