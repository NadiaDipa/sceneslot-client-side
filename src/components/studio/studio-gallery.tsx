"use client";

import type { Studio } from "@/lib/types";
import { cn } from "cn";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function StudioGallery({ studio }: { studio: Studio }) {
  const [active, setActive] = useState(0);

  const images = (
    studio.gallery.length ? studio.gallery : [studio.image]
  ).filter(Boolean);

  if (images.length === 0) {
    return (
      <div className="grid aspect-[16/9] place-items-center rounded-2xl bg-muted text-sm text-muted-foreground">
        No photos available
      </div>
    );
  }

  const total = images.length;
  const prev = () => setActive((i) => (i - 1 + total) % total);
  const next = () => setActive((i) => (i + 1) % total);

  return (
    <div className="flex flex-col gap-3">
      {/* Main carousel image — 3:2 on mobile (≈240px at 360–375w, inside the
          220–280px spec window); 16:9 from sm up unchanged */}
      <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-muted sm:aspect-[16/9]">
        {images.map((src, i) => (
          <Image
            key={`${src}-${i}`}
            src={src}
            alt={`${studio.title} — photo ${i + 1}`}
            fill
            priority={i === 0}
            sizes="(max-width: 1024px) 100vw, 70vw"
            className={cn(
              "object-cover transition-opacity duration-500",
              i === active ? "opacity-100" : "opacity-0"
            )}
          />
        ))}

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous photo"
              className="absolute top-1/2 left-3 grid size-10 max-sm:size-11 -translate-y-1/2 place-items-center rounded-full bg-black/50 text-white outline-none backdrop-blur-sm transition-colors hover:bg-black/70 focus-visible:ring-2 focus-visible:ring-primary"
            >
              <ChevronLeft className="size-5" />
            </button>

            <button
              type="button"
              onClick={next}
              aria-label="Next photo"
              className="absolute top-1/2 right-3 grid size-10 max-sm:size-11 -translate-y-1/2 place-items-center rounded-full bg-black/50 text-white outline-none backdrop-blur-sm transition-colors hover:bg-black/70 focus-visible:ring-2 focus-visible:ring-primary"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}

        <span className="absolute right-3 bottom-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {active + 1} / {total}
        </span>
      </div>

      {/* Thumbnails */}
      {total > 1 && (
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {images.map((src, i) => (
            <button
              key={`thumb-${src}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show photo ${i + 1}`}
              aria-pressed={active === i}
              className={cn(
                "relative aspect-[4/3] overflow-hidden rounded-xl bg-muted outline-none transition-all focus-visible:ring-2 focus-visible:ring-primary",
                active === i
                  ? "ring-2 ring-primary"
                  : "opacity-70 hover:opacity-100"
              )}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="25vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}