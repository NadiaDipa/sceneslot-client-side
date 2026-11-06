import { BookingSteps } from "@/components/home/booking-steps";
import { TrustSection } from "@/components/home/trust-section";
import { CategoryCard } from "@/components/studio/category-card";
import { HeroSlider } from "@/components/studio/hero-slider";
import { StudioCard } from "@/components/studio/studio-card";
import { mapStudioDoc, type StudioDoc } from "@/lib/api";
import type { Studio } from "@/lib/types";
import { buttonVariants } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { categories } from "@/data/categories";
import { ArrowRight } from "lucide-react";
import { cn } from "cn";
import Link from "next/link";

// Always render on request so the build never needs the backend running
export const dynamic = "force-dynamic";

export default async function HomePage() {
  let featured: Studio[] = [];

  try {
    const res = await fetch(`${process.env.API_BASE_URL}/featured-studios`, {
      cache: "no-store",
    });

    if (res.ok) {
      const docs: StudioDoc[] = await res.json();
      featured = docs.map((doc) => mapStudioDoc(doc)).slice(0, 6);
    }
  } catch (error) {
    console.error("Featured studios fetch failed:", error);
  }

  return (
    <>
      {/* A. Hero slider */}
      <HeroSlider />

      {/* B. Featured studios */}
      <section className="py-16 sm:py-24" aria-label="Featured studios">
        <div className="container-page">
          <Reveal className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
            <SectionHeading
              align="left"
              eyebrow="Featured"
              title={
                <>
                  Studios creators keep{" "}
                  <span className="accent-serif">rebooking</span>
                </>
              }
              description="Hand-picked spaces with verified hosts, published gear lists, and instant booking turned on."
              className="mb-0"
            />
            <Link
              href="/studios"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className:
                  "h-11 shrink-0 gap-2 px-5 font-semibold self-center sm:self-auto",
              })}
            >
              View all studios
              <ArrowRight className="size-4 transition-transform duration-300 group-hover/button:translate-x-1 motion-reduce:transform-none" />
            </Link>
          </Reveal>

          {featured.length > 0 ? (
            <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
              {featured.map((studio: Studio) => (
                <RevealItem key={studio.id}>
                  <StudioCard studio={studio} className="h-full" />
                </RevealItem>
              ))}
            </RevealGroup>
          ) : (
            <p className="mt-12 text-center text-sm text-muted-foreground">
              No studios available right now. Please check back soon.
            </p>
          )}
        </div>
      </section>

      {/* C. Browse categories */}
      <section
        className="border-y border-border bg-secondary/40 py-16 sm:py-24"
        aria-label="Browse categories"
      >
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Browse categories"
              title={
                <>
                  Find the room shaped like{" "}
                  <span className="accent-serif">your idea</span>
                </>
              }
              description="From cyc walls to condenser mics — every category is curated by working creators."
            />
          </Reveal>
          {/* Bento grid: one wide hero tile, then pairs. Rendered statically (no
              scroll-reveal gating) so all five categories are always visible. */}
          <div className="grid grid-cols-2 gap-3.5 sm:gap-5 md:grid-cols-6 md:gap-6">
            {categories.map((category, i) => (
              <CategoryCard
                key={category.name}
                category={category}
                className={cn(
                  "col-span-1",
                  i === 0 && "col-span-2 md:col-span-3",
                  i === 1 && "md:col-span-3",
                  (i === 2 || i === 3 || i === 4) && "md:col-span-2",
                )}
                aspectClassName={cn(
                  i === 0
                    ? "aspect-[16/10] md:aspect-[16/11]"
                    : i === 1
                      ? "aspect-[4/5] md:aspect-[16/11]"
                      : "aspect-[4/5]",
                )}
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