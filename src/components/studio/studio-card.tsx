import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { RatingStars } from "@/components/shared/rating-stars";
import type { Studio } from "@/lib/types";
import { cn } from "cn";
import { ArrowRight, MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function StudioCard({
  studio,
  className,
}: {
  studio: Studio;
  className?: string;
}) {
  return (
    <Card
      className={cn(
        "group h-full gap-0 overflow-hidden pt-0 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:ring-primary/25 hover:shadow-xl hover:shadow-foreground/10 motion-reduce:transition-none",
        className,
      )}
    >
      {/* Image — slightly shorter (3/2) so the card reads as image + content, not all image */}
      <div className="relative aspect-[3/2] overflow-hidden">
        <Image
          src={studio.image}
          alt={studio.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] motion-reduce:transition-none"
        />
        {/* Neutral dark wash (independent of theme) keeps badges readable over any photo */}
        <span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-70"
        />

        <Badge className="absolute top-3 left-3 h-6 rounded-full bg-background/85 px-3 text-foreground ring-1 ring-foreground/15 backdrop-blur-md hover:bg-background/85">
          {studio.category}
        </Badge>

        {/* Rating badge: always visible */}
        <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-background/85 px-2.5 py-1 text-xs font-semibold text-foreground ring-1 ring-foreground/15 backdrop-blur-md">
          <Star className="size-3 fill-primary text-primary" />
          {studio.reviewsCount > 0 ? studio.rating.toFixed(1) : "New"}
        </span>
      </div>

      {/* Content: ratings keep a fixed-height row so titles align across the grid.
          Name/rating/location center on mobile; price + button (footer) untouched. */}
      <CardContent className="flex flex-1 flex-col items-center gap-3 p-5 pb-6 text-center sm:items-start sm:p-6 sm:text-left">
        <div className="flex min-h-5 items-center gap-2 text-[0.875rem] text-muted-foreground">
          {studio.reviewsCount > 0 ? (
            <>
              <RatingStars rating={studio.rating} />
              <span className="font-semibold whitespace-nowrap text-foreground">
                {studio.rating.toFixed(1)}
              </span>
              <span className="min-w-0 truncate">
                ({studio.reviewsCount} reviews)
              </span>
            </>
          ) : (
            <span>New Studio · No reviews yet</span>
          )}
        </div>
        <h3 className="font-heading text-xl leading-snug font-semibold tracking-[-0.01em] sm:text-[1.375rem]">
          <Link
            href={`/studios/${studio.id}`}
            className="rounded-sm outline-none transition-colors hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {studio.title}
          </Link>
        </h3>
        <p className="flex items-center gap-1.5 text-[0.875rem] text-muted-foreground">
          <MapPin className="size-3.5 shrink-0 text-primary" />
          <span className="min-w-0 truncate">{studio.location}</span>
        </p>
      </CardContent>

      {/* Footer: price first, then a full, clearly-clickable booking action */}
      <CardFooter className="items-center gap-4 border-border/70 bg-muted/40 px-5 py-4 sm:px-6">
        <div className="flex min-w-0 flex-col overflow-hidden leading-tight">
          {/* No whitespace-nowrap: "$180" and "/ hour" stayed unsplittable at
              max-content width, which (with the nowrap sub-line below) pushed the
              footer's min-content to ~379px — beyond the ~358px mobile grid track,
              so the card overflowed the viewport and a horizontal scrollbar appeared. */}
          <span className="font-heading text-xl font-bold text-foreground sm:whitespace-nowrap">
            ${studio.hourlyRate}
            <span className="ml-1 text-sm font-medium text-muted-foreground">
              / hour
            </span>
          </span>
          {/* line-clamp-2 shows the full sentence ("Free cancellation" included) and
              can wrap when the footer is squeezed instead of ellipsizing mid-word.
              min-h-8 reserves the 2-line height so every card in the grid keeps the
              same footer height (and equal card heights) at every column width. */}
          <span className="line-clamp-2 min-h-8 text-xs text-muted-foreground">
            Instant booking · Free cancellation
          </span>
        </div>
        <Link
          href={`/studios/${studio.id}`}
          aria-label={`View details for ${studio.title}`}
          className={buttonVariants({
            className:
              "ml-auto h-11 shrink-0 gap-2 rounded-lg px-5 text-[0.95rem] font-semibold max-sm:flex-1",
          })}
        >
          View Details
          <ArrowRight className="size-4 transition-transform duration-300 group-hover/button:translate-x-1 motion-reduce:transform-none" />
        </Link>
      </CardFooter>
    </Card>
  );
}
