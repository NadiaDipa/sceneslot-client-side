import { Card } from "@/components/ui/card";
import type { Category } from "@/data/categories";
import { cn } from "cn";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function CategoryCard({
  category,
  className,
}: {
  category: Category;
  className?: string;
}) {
  return (
    <Card
      className={cn(
        "group relative gap-0 overflow-hidden p-0 ring-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-foreground/10",
        className
      )}
    >
      {/* Category cards navigate to the explorer with the category preselected */}
      <Link
        href={`/studios?category=${encodeURIComponent(category.name)}`}
        aria-label={`Browse ${category.name}`}
        className="outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <div className="relative aspect-[4/5] sm:aspect-[3/3.6]">
          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/25 to-transparent"
          />
          <span className="absolute top-3 right-3 grid size-8 place-items-center rounded-full bg-background/15 text-background opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
            <ArrowUpRight className="size-4" />
          </span>
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 p-5">
            <p className="font-heading text-xl font-semibold text-background">
              {category.name}
            </p>
            <p className="text-xs leading-relaxed text-background/75">
              {category.tagline}
            </p>
          </div>
        </div>
      </Link>
    </Card>
  );
}
