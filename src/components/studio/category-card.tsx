import { Card } from "@/components/ui/card";
import type { Category } from "@/data/categories";
import { cn } from "cn";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function CategoryCard({
  category,
  className,
  aspectClassName = "aspect-[4/5]",
}: {
  category: Category;
  className?: string;
  /** Aspect ratio of the image area, controllable per grid position (e.g. bento layouts). */
  aspectClassName?: string;
}) {
  return (
    <Card
      className={cn(
        "group relative gap-0 overflow-hidden p-0 ring-0 transition-all duration-300 ease-out hover:-translate-y-1 motion-reduce:transition-none hover:shadow-lg hover:shadow-foreground/10",
        className
      )}
    >
      {/* Category cards navigate to the explorer with the category preselected */}
      <Link
        href={`/studios?category=${encodeURIComponent(category.name)}`}
        aria-label={`Browse ${category.name}`}
        className="block h-full outline-none focus-visible:ring-3 focus-visible:ring-primary/40 focus-visible:ring-inset"
      >
        <div className={cn("relative", aspectClassName)}>
          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07] motion-reduce:transition-none"
          />
          {/* Fixed dark gradient + white text stays readable over any photo in both themes.
              Stronger stops (90/40/5) keep the caption anchored over bright photos;
              deepened further on hover so labels never compete with the image. */}
          <span
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/5"
          />
          <span
            aria-hidden
            className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/15"
          />
          {/* Expand affordance slides up into place on hover / keyboard focus */}
          <span className="absolute top-3 right-3 grid size-9 translate-y-1.5 place-items-center rounded-full border border-white/25 bg-white/15 text-white opacity-0 backdrop-blur-sm transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 motion-reduce:transition-none">
            <ArrowUpRight className="size-4" />
          </span>
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 p-4 sm:p-5">
            <p className="font-heading text-lg font-semibold text-white sm:text-xl">
              {category.name}
            </p>
            <p className="text-sm leading-relaxed text-white/85">
              {category.tagline}
            </p>
          </div>
        </div>
      </Link>
    </Card>
  );
}
