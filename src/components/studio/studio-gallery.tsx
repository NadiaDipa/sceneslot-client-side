"use client";

import type { Studio } from "@/lib/types";
import { cn } from "cn";
import Image from "next/image";
import { useState } from "react";

export function StudioGallery({ studio }: { studio: Studio }) {
  const [active, setActive] = useState(0);
  const images = studio.gallery.length ? studio.gallery : [studio.image];

  return (
    <div className="flex flex-col gap-3">
      <div className="group/main relative aspect-[16/9] overflow-hidden rounded-2xl">
        <Image
          key={images[active]}
          src={images[active]}
          alt={`${studio.title} — photo ${active + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="object-cover"
        />
        <span
          aria-hidden
          className="absolute right-4 bottom-4 rounded-full bg-foreground/60 px-3 py-1 text-xs font-medium text-background backdrop-blur-sm"
        >
          {active + 1} / {images.length}
        </span>
      </div>

      {images.length > 1 ? (
        <div className="grid grid-cols-4 gap-3" role="tablist" aria-label="Studio gallery">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Show photo ${i + 1}`}
              onClick={() => setActive(i)}
              className={cn(
                "relative aspect-[4/3] overflow-hidden rounded-xl outline-none transition-all focus-visible:ring-3 focus-visible:ring-ring/50",
                i === active
                  ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
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
      ) : null}
    </div>
  );
}
