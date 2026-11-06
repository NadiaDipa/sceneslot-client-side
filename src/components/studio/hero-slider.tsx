"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Search,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, type Variants } from "motion/react";
import { Autoplay, Keyboard, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { cn } from "cn";
import { HeroCategorySelect } from "@/components/studio/hero-category-select";
import "swiper/css";
import "swiper/css/navigation";

export interface HeroSlide {
  image: string;
  category: string;
  headline: string;
  description: string;
}

const slides: HeroSlide[] = [
  {
    image:
      "https://images.unsplash.com/photo-1603425013520-e0b30e6e37dc?q=80&w=1920&auto=format&fit=crop",
    category: "Photo Studios",
    headline: "Shot-ready studios, booked in minutes",
    description:
      "Portrait lofts, cyc walls, and daylight setups — reserved by the hour so your next frame happens on schedule.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1615458317538-72c46d9359d8?q=80&w=1920&auto=format&fit=crop",
    category: "Podcast Rooms",
    headline: "Press record in a room that sounds rich",
    description:
      "Acoustically treated podcast suites with broadcast mics, engineers, and video capture — just bring the conversation.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1675635069927-cf0522ccdf6e?q=80&w=1920&auto=format&fit=crop",
    category: "Sound Stages",
    /* Non-breaking hyphen keeps "Full\u2011scale" on one line mobile
       (text-balance otherwise breaks it at the regular hyphen) */
    headline: "Full‑scale stages for full‑scale ideas",
    description:
      "Blackout sound stages with rigging grids, drive-in access, and production offices for film and commercial crews.",
  },
];

/* Static UI-only search fields (Search just links to /studios) */
const searchFields = [
  {
    name: "location",
    label: "Location",
    placeholder: "Where do you shoot?",
    icon: MapPin,
    type: "text",
  },
  {
    name: "date",
    label: "Date",
    placeholder: "",
    icon: CalendarDays,
    type: "date",
  },
  {
    name: "category",
    label: "Category",
    placeholder: "",
    icon: SlidersHorizontal,
    type: "select",
  },
];

/* Static stat strip below the headline */
const stats = [
  { value: "500+", label: "studios" },
  { value: "12k", label: "bookings" },
  { value: "4.9", label: "rating" },
];

/* Slow Ken Burns push-in on the active slide (resets softly for the next pass) */
const kenBurnsVariants: Variants = {
  idle: { scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
  zoom: { scale: 1.08, transition: { duration: 8, ease: "linear" } },
};

/* Staggered pill → title → text → buttons/stat/search entrance, replayed per slide */
const copyVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const copyItemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function HeroSlider() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  /* Hero search criteria — submitted to /studios (see handleHeroSearch) */
  const [heroLocation, setHeroLocation] = useState("");
  const [heroCategory, setHeroCategory] = useState<string | null>(null);
  const router = useRouter();

  function handleHeroSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    /* Reuses the /studios page's existing supported criteria:
       - category → exact filter (existing ?category param)
       - location → strict location-field filter (new ?location param)
       - date has no matching logic anywhere yet (no availability model),
         so it is intentionally not sent. Empty state → all studios. */
    const params = new URLSearchParams();
    if (heroCategory) params.set("category", heroCategory);
    const locationText = heroLocation.trim();
    if (locationText) params.set("location", locationText);
    const qs = params.toString();
    router.push(qs.length ? `/studios?${qs}` : "/studios");
  }

  return (
    <section className="relative" aria-label="Featured spaces">
      {/* Fully content-sized slider: the min-height floors live on the slides.
          The Swiper wrapper is a flex row (align stretch), so every slide also
          stretches to the tallest slide — slide heights stay identical, and the
          CTA → search-panel gap (fixed margins) never depends on content. */}
      <Swiper
        modules={[Autoplay, Keyboard, Navigation]}
        onSwiper={(s) => (swiperRef.current = s)}
        onSlideChange={(s) => setActiveIndex(s.realIndex)}
        loop
        keyboard={{ enabled: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        grabCursor
        className="group/hero h-auto w-full"
      >
        {slides.map((slide, i) => {
          /* Presentation only: highlight the last headline word */
          const lastWord = slide.headline.slice(slide.headline.lastIndexOf(" ") + 1);
          const rest = slide.headline.slice(0, slide.headline.length - lastWord.length);
          return (
            <SwiperSlide
              key={i}
              /* h-auto! overrides Swiper's built-in `height: 100%` (which
                 collapses to the slide's own content height and leaves a
                 cream gap under the shorter slides). With height:auto the
                 wrapper's flex stretch equalizes ALL slides to the tallest
                 one — the hero's dark image then always covers the full
                 slider, and the pagination bars always sit on the image. */
              className="relative flex h-auto! min-h-[70svh] flex-col overflow-hidden sm:min-h-[45rem] lg:min-h-[48rem]"
            >
              {/* Background image — slow Ken Burns zoom while active */}
              <motion.span
                className="absolute inset-0 motion-reduce:transform-none!"
                variants={kenBurnsVariants}
                initial="idle"
                animate={activeIndex === i ? "zoom" : "idle"}
              >
                <Image
                  src={slide.image}
                  alt={slide.category}
                  fill
                  preload={i === 0}
                  sizes="100vw"
                  className="object-cover"
                />
              </motion.span>

              {/* Layered cinematic gradients: left wash for copy, bottom wash for search */}
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-black/10"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20"
              />
              {/* Extra readability wash: guarantees white copy contrast on bright photos.
                  pointer-events-none keeps arrows / panel / buttons fully clickable. */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/55 via-black/30 to-black/10"
              />
              <span aria-hidden className="bg-dotted absolute inset-0 opacity-40" />

              {/* Content-sized slide (floors on the SwiperSlide above; svh =
                  small viewport, so the phone browser bar can't push the
                  search panel off-screen). Copy is top-anchored and the
                  search panel is in normal flow with fixed margins, so the
                  gap between them is content-height-independent. */}
              {/* Structured flex column, identical on every slide:
                  pt = navbar clearance, fixed bottom inset = pagination zone
                  (panel → bars gap and bars → hero bottom are constants by
                  construction, never leftover-space-dependent). */}
              <motion.div
                className="container-page relative flex h-full flex-col pt-12 pb-[4.5rem] sm:pt-24"
                variants={copyVariants}
                initial="hidden"
                animate={activeIndex === i ? "show" : "hidden"}
              >
              {/* Zone A (flex-1, centered): pill/headline/description/CTAs/stats.
                  Every child carries a reserved min-height (headline 2 lines
                  desktop / 3 mobile, description 2 lines desktop / 3 mobile)
                  and the stats row a fixed min-h, so the copy block has the
                  SAME height on every slide — all variable slide height is
                  absorbed by this zone, and every y-position below (buttons,
                  stats, search panel, pagination) is identical per viewport. */}
                <div className="flex min-h-0 flex-1 flex-col justify-center">
                  <div className="flex w-fit max-w-5xl flex-col items-start max-sm:mx-auto max-sm:items-center max-sm:text-center">
                  {/* Glass category pill */}
                  <motion.span
                    variants={copyItemVariants}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-white uppercase backdrop-blur-md"
                  >
                    <Sparkles className="size-3.5 text-primary" />
                    {slide.category}
                  </motion.span>

                  <motion.h1
                    variants={copyItemVariants}
                    /* Fluid size (clamp 40→72px, per spec) + reserved
                       min-height of 2 lines desktop / 3 lines mobile, so a
                       1-line headline can never shift anything below. */
                    className="mt-3 max-w-[52rem] min-h-[3.15em] text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] font-bold tracking-[-0.03em] text-balance hyphens-none text-white sm:mt-4 sm:min-h-[2.1em]"
                  >
                    {rest}
                    <span className="bg-gradient-to-r from-[#C9AC72] via-[#978F66] to-[#E4D6A9] bg-clip-text font-serif text-[1.08em] italic text-transparent">
                      {lastWord}
                    </span>
                  </motion.h1>

                  <motion.p
                    variants={copyItemVariants}
                    /* Reserved min-height: 3 lines mobile / 2 lines desktop,
                       so description length never moves the CTAs. */
                    className="mt-3 max-w-2xl min-h-[4.875rem] text-base leading-relaxed text-white/90 line-clamp-3 sm:mt-4 sm:min-h-[3.656rem] sm:text-lg sm:line-clamp-2"
                  >
                    {slide.description}
                  </motion.p>

                  {/* CTAs — both link to /studios as per requirement.
                      44px tap targets on mobile, side-by-side when they fit. */}
                  <motion.div
                    variants={copyItemVariants}
                    className="mt-3 flex max-sm:justify-center flex-wrap items-center gap-2.5 sm:mt-7 sm:gap-4"
                  >
                    <Link
                      href="/studios"
                      className={buttonVariants({
                        size: "lg",
                        className:
                          "h-11 px-5 text-sm font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 sm:h-12 sm:px-7",
                      })}
                    >
                      Explore Studios
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover/button:translate-x-1 motion-reduce:transform-none" />
                    </Link>
                    {/* Same route as the Footer's "Host Your Space" link: /add-studio
                        server-checks the session and redirects guests to
                        /login?redirect=/add-studio */}
                    <Link
                      href="/add-studio"
                      className={buttonVariants({
                        size: "lg",
                        variant: "outline",
                        className:
                          "h-11 border-white/30 bg-white/5 px-5 text-white backdrop-blur-md hover:border-white/50 hover:bg-white/15 hover:text-white sm:h-12 sm:px-7",
                      })}
                    >
                      Host Your Space
                    </Link>
                  </motion.div>

                  {/* Stat strip — the wrapper is ALWAYS rendered with a reserved
                      min-height equal to the row's rendered height (28px), so a
                      slide without stats keeps the exact same buttons →
                      search-bar rhythm; an empty row stays space-keeping but
                      invisible. Search panel top spacing therefore comes from
                      the same source (this wrapper + the pinned panel inset)
                      on every slide. */}
                  <motion.div
                    variants={copyItemVariants}
                    className={cn(
                      "mt-4 flex min-h-7 items-center justify-center gap-4 sm:mt-7 sm:justify-start sm:gap-5",
                      stats.length === 0 && "invisible",
                    )}
                    aria-label={stats.length ? "SceneSlot at a glance" : undefined}
                    aria-hidden={stats.length === 0 || undefined}
                  >
                    {stats.map((stat, idx) => (
                      <span
                        key={stat.label}
                        className={cn(
                          "flex items-baseline gap-1.5",
                          idx > 0 && "border-l border-white/20 pl-4 sm:pl-6",
                        )}
                      >
                        <span className="font-heading text-sm font-bold text-white sm:text-xl">
                          {stat.value}
                        </span>
                        <span className="text-xs font-medium text-white/70 sm:text-sm">
                          {stat.label}
                        </span>
                      </span>
                    ))}
                  </motion.div>
                </div>
              </div>

                  {/* Zone B: search panel, fixed (normal flow) with a constant
                      Zone A → panel margin of 48px mobile / 56px desktop —
                      both ≥ the 48px spec and never content-dependent.
                      max-w keeps the same left-aligned 4xl footprint. */}
                  {/* Panel is a real form: Search (type=submit) reads the
                      selected criteria and navigates to /studios with them.
                      Classes unchanged — identical look and layout. */}
                  <motion.form
                    onSubmit={handleHeroSearch}
                    variants={copyItemVariants}
                    className="relative mt-12 grid max-w-4xl grid-cols-1 gap-1 rounded-2xl bg-background/95 p-1.5 shadow-2xl ring-1 ring-black/10 backdrop-blur-md sm:mt-14 sm:grid-cols-[1fr_1fr_1fr_auto] sm:items-stretch sm:gap-0 sm:divide-x sm:divide-border sm:w-full"
                  >
                  {searchFields.map((field) => (
                    <div
                      key={field.name}
                      className={cn(
                        "flex min-w-0 items-center gap-3 rounded-xl px-4 py-2.5 transition-colors hover:bg-muted/70 sm:h-14 sm:py-2",
                        field.name !== "location" && "hidden sm:flex",
                      )}
                    >
                      <field.icon
                        className="size-4 shrink-0 text-muted-foreground"
                        strokeWidth={1.8}
                      />
                      <div className="flex min-w-0 flex-1 flex-col gap-0.5 leading-tight">
                        <span className="text-xs font-bold tracking-[0.14em] text-muted-foreground uppercase">
                          {field.label}
                        </span>
                        {field.type === "select" ? (
                          <HeroCategorySelect
                            value={heroCategory}
                            onValueChange={setHeroCategory}
                          />
                        ) : field.type === "text" ? (
                          <input
                            aria-label={field.label}
                            name={field.name}
                            type={field.type}
                            placeholder={field.placeholder}
                            value={heroLocation}
                            onChange={(e) => setHeroLocation(e.target.value)}
                            className="w-full bg-transparent text-[0.95rem] font-medium text-foreground outline-none placeholder:text-muted-foreground/70"
                          />
                        ) : (
                          <input
                            aria-label={field.label}
                            name={field.name}
                            type={field.type}
                            placeholder={field.placeholder}
                            className="w-full bg-transparent text-[0.95rem] font-medium text-foreground outline-none placeholder:text-muted-foreground/70"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                  <button
                    type="submit"
                    className={buttonVariants({
                      size: "lg",
                      className:
                        "h-11 w-full gap-2 text-sm font-semibold sm:h-14 sm:w-auto sm:min-w-40",
                    })}
                    aria-label="Search studios"
                  >
                    <Search className="size-4" />
                    Search
                  </button>
                </motion.form>
                {/* No trailing spacer: the container's fixed pb-[4.5rem] puts
                    the panel 72px above the slide bottom, i.e. 28px above the
                    pagination bars (which sit 24–44px from the bottom) —
                    within the required 24–32px on every slide/viewport. */}
              </motion.div>
            </SwiperSlide>
          );
        })}

        {/* Progress-bar pagination — active bar fills over the autoplay cycle.
            Buttons carry the hit area (h-5); the visible bar stays slim, so it
            stays clear of the search panel and remains easy to tap on mobile. */}
        <div
          className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1 sm:gap-1.5"
          role="group"
          aria-label="Slide progress"
        >
          {slides.map((slide, idx) => (
            <button
              key={slide.category}
              type="button"
              aria-label={`Go to slide ${idx + 1}`}
              aria-current={activeIndex === idx ? "true" : undefined}
              onClick={() => swiperRef.current?.slideToLoop(idx)}
              className="group/pill flex h-5 cursor-pointer items-center px-1 outline-none focus-visible:ring-2 focus-visible:ring-ring/50 motion-reduce:transition-none"
            >
              <span
                aria-hidden
                className="relative h-1 w-12 overflow-hidden rounded-full bg-white/30 ring-1 ring-inset ring-white/25 transition-colors duration-300 group-hover/pill:bg-white/40 sm:w-16"
              >
                {activeIndex === idx && (
                  <motion.span
                    key={activeIndex}
                    className="absolute inset-0 origin-left rounded-full bg-[#E4D6A9]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 6, ease: "linear" }}
                  />
                )}
              </span>
            </button>
          ))}
        </div>

        {/* Glass round arrows */}
        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute top-1/2 left-4 z-10 hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/25 text-white backdrop-blur-md transition-colors duration-300 outline-none hover:border-white/40 hover:bg-white/15 focus-visible:ring-3 focus-visible:ring-ring/60 sm:grid motion-reduce:transition-none"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute top-1/2 right-4 z-10 hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/25 text-white backdrop-blur-md transition-colors duration-300 outline-none hover:border-white/40 hover:bg-white/15 focus-visible:ring-3 focus-visible:ring-ring/60 sm:grid motion-reduce:transition-none"
        >
          <ChevronRight className="size-5" />
        </button>
      </Swiper>
    </section>
  );
}
