import { BookingSteps } from "@/components/home/booking-steps";
import { TrustSection } from "@/components/home/trust-section";
import { CategoryCard } from "@/components/studio/category-card";
import { HeroSlider } from "@/components/studio/hero-slider";
import { StudioCard } from "@/components/studio/studio-card";
import { mapStudioDoc, type StudioDoc } from "@/lib/api";
import type { Studio } from "@/lib/types";
import { buttonVariants } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";
import { categories } from "@/data/categories";
import { ArrowRight } from "lucide-react";
import { cn } from "cn";
import Link from "next/link";

export default async function HomePage() {
 const res = await fetch("http://localhost:5000/studios",{
   cache: "no-store",
 });
const docs: StudioDoc[] = await res.json();
const studios = docs.map((doc) => mapStudioDoc(doc));
const featured = studios.slice(0, 6);

  return (
    <>
      {/* A. Hero slider */}
      <HeroSlider />

      {/* B. Featured studios */}
      <section className="py-16 sm:py-24" aria-label="Featured studios">
        <div className="container-page">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              align="left"
              eyebrow="Featured"
              title="Studios creators keep rebooking"
              description="Hand-picked spaces with verified hosts, published gear lists, and instant booking turned on."
              className="mb-0"
            />
            <Link
              href="/studios"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className: "shrink-0 gap-2 self-start sm:self-auto",
              })}
            >
              View all studios
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((studio:Studio, i: number) => (
              <StudioCard
                key={studio.id}
                studio={studio}
                className={cn(
                  "animate-in fade-in fill-mode-both slide-in-from-bottom-4 duration-700",
                  // gentle stagger: 0, 100ms, 150ms, 200ms, 300ms, 500ms
                  ["", "delay-100", "delay-150", "delay-200", "delay-300", "delay-500"][i] ?? "",
                )}
              />
            ))}
          </div>
        </div>
      </section>

      {/* C. Browse categories */}
      <section
        className="border-y border-border bg-secondary/40 py-16 sm:py-24"
        aria-label="Browse categories"
      >
        <div className="container-page">
          <SectionHeading
            eyebrow="Browse categories"
            title="Find the room shaped like your idea"
            description="From cyc walls to condenser mics — every category is curated by working creators."
          />
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-5 lg:grid-rows-1">
            {categories.map((category, i) => (
              <CategoryCard
                key={category.name}
                category={category}
                className={cn(i === 4 && "col-span-2 lg:col-span-1")}
              />
            ))}
          </div>
        </div>
      </section>

      {/* D. How booking works */}
      <BookingSteps />

      {/* E. Host guarantee & creator support */}
      <TrustSection />
    </>
  );
}
