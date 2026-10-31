import { Star } from "lucide-react";
import { cn } from "cn";

interface RatingStarsProps {
  rating: number;
  className?: string;
  size?: "sm" | "md";
}

export function RatingStars({ rating, className, size = "sm" }: RatingStarsProps) {
  const dimension = size === "sm" ? "size-3.5" : "size-4";
  return (
    <span
      className={cn("inline-flex items-center gap-0.5", className)}
      aria-label={`Rated ${rating} out of 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            dimension,
            i < Math.round(rating)
              ? "fill-primary text-primary"
              : "fill-muted text-muted-foreground/30"
          )}
        />
      ))}
    </span>
  );
}
