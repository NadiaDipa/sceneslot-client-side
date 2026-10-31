import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { RatingStars } from "@/components/shared/rating-stars";
import type { Studio } from "@/lib/types";
import { cn } from "cn";
import { ArrowRight, Clock, MapPin } from "lucide-react";
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
        "group gap-0 overflow-hidden pt-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-foreground/10",
        className,
      )}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={studio.image}
          alt={studio.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent opacity-60"
        />
        <Badge className="absolute top-3 left-3 h-6 bg-background/90 text-foreground backdrop-blur-sm hover:bg-background">
          {studio.category}
        </Badge>
        <span className="absolute right-3 bottom-3 inline-flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold text-foreground backdrop-blur-sm">
          <Clock className="size-3 text-primary" />${studio.hourlyRate}/hr
        </span>
      </div>

      <CardContent className="flex flex-col gap-2 p-5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <RatingStars rating={studio.rating} />
          <span className="font-semibold text-foreground">{studio.rating}</span>
          <span>({studio.reviewsCount} reviews)</span>
        </div>
        <h3 className="font-heading text-lg font-semibold leading-snug">
          <Link
            href={`/studios/${studio.id}`}
            className="rounded-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {studio.title}
          </Link>
        </h3>
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-3.5 shrink-0 text-primary" />
          {studio.location}
        </p>
      </CardContent>

      <CardFooter className="justify-between border-border/60">
        <span className="text-xs font-medium text-muted-foreground">
          Instant booking · Free cancellation
        </span>
        <Link
          href={`/studios/${studio.id}`}
          className={buttonVariants({
            variant: "ghost",
            size: "sm",
            className:
              "gap-1 text-primary hover:bg-accent hover:text-accent-foreground",
          })}
        >
          View Details
          <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </CardFooter>
    </Card>
  );
}
