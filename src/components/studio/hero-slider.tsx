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
import { motion, type Variants } from "motion/react";
import { Autoplay, Keyboard, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { cn } from "cn";
import { categories } from "@/data/categories";
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
    headline: "Full-scale stages for full-scale ideas",
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

  return (
    <section className="relative" aria-label="Featured spaces">
      <Swiper
        modules={[Autoplay, Keyboard, Navigation]}
        onSwiper={(s) => (swiperRef.current = s)}
        onSlideChange={(s) => setActiveIndex(s.realIndex)}
        loop
        keyboard={{ enabled: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        grabCursor
        className="group/hero h-[44rem] w-full sm:h-[45rem] lg:h-[46rem] 2xl:h-[48rem]"
      >
        {slides.map((slide, i) => {
          /* Presentation only: highlight the last headline word */
          const lastWord = slide.headline.slice(slide.headline.lastIndexOf(" ") + 1);
          const rest = slide.headline.slice(0, slide.headline.length - lastWord.length);
          return (
            <SwiperSlide key={i} className="relative overflow-hidden">
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
              <span aria-hidden className="bg-dotted absolute inset-0 opacity-40" />

              {/* Copy block floats at optical center; search stays anchored at the bottom.
                  Generous top padding keeps everything clear of the fixed Navbar. */}
              <motion.div
                className="container-page relative flex h-full flex-col pt-28 pb-20 lg:pt-32"
                variants={copyVariants}
                initial="hidden"
                animate={activeIndex === i ? "show" : "hidden"}
              >
                <div className="my-auto flex w-fit max-w-4xl flex-col items-start">
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
                    className="mt-4 max-w-[52rem] text-5xl leading-[1.02] font-bold tracking-[-0.03em] text-white sm:text-6xl lg:text-7xl 2xl:text-[5.25rem]"
                  >
                    {rest}
                    <span className="bg-gradient-to-r from-[#C9AC72] via-[#978F66] to-[#E4D6A9] bg-clip-text font-serif text-[1.08em] italic text-transparent">
                      {lastWord}
                    </span>
                  </motion.h1>

                  <motion.p
                    variants={copyItemVariants}
                    className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 line-clamp-2 sm:text-lg sm:line-clamp-none"
                  >
                    {slide.description}
                  </motion.p>

                  {/* CTAs — both link to /studios as per requirement */}
                  <motion.div
                    variants={copyItemVariants}
                    className="mt-7 flex flex-wrap items-center gap-3 sm:gap-4"
                  >
                    <Link
                      href="/studios"
                      className={buttonVariants({
                        size: "lg",
                        className:
                          "h-12 px-7 text-sm font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40",
                      })}
                    >
                      Explore Studios
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover/button:translate-x-1 motion-reduce:transform-none" />
                    </Link>
                    <Link
                      href="/studios"
                      className={buttonVariants({
                        size: "lg",
                        variant: "outline",
                        className:
                          "h-12 border-white/30 bg-white/5 px-7 text-white backdrop-blur-md hover:border-white/50 hover:bg-white/15 hover:text-white",
                      })}
                    >
                      Host Your Space
                    </Link>
                  </motion.div>

                  {/* Subtle stat strip */}
                  <motion.div
                    variants={copyItemVariants}
                    className="mt-7 hidden items-center gap-5 sm:flex sm:gap-6"
                    aria-label="SceneSlot at a glance"
                  >
                    {stats.map((stat, idx) => (
                      <span
                        key={stat.label}
                        className={cn(
                          "flex items-baseline gap-1.5",
                          idx > 0 && "border-l border-white/20 pl-5 sm:pl-6",
                        )}
                      >
                        <span className="font-heading text-lg font-bold text-white sm:text-xl">
                          {stat.value}
                        </span>
                        <span className="text-xs font-medium text-white/70 sm:text-sm">
                          {stat.label}
                        </span>
                      </span>
                    ))}
                  </motion.div>
                </div>

                {/* Marketplace search panel (UI only — Search links to /studios).
                    A light, labeled card reads clearly over any slide image. */}
                <motion.div
                  variants={copyItemVariants}
                  className="mt-8 grid w-full max-w-4xl grid-cols-1 gap-1 rounded-2xl bg-background/95 p-1.5 shadow-2xl ring-1 ring-black/10 backdrop-blur-md sm:grid-cols-[1fr_1fr_1fr_auto] sm:items-stretch sm:gap-0 sm:divide-x sm:divide-border"
                >
                  {searchFields.map((field) => (
                    <div
                      key={field.name}
                      className={cn(
                        "flex min-w-0 items-center gap-3 rounded-xl px-4 py-2.5 transition-colors hover:bg-muted/70 sm:h-14",
                        field.name !== "location" && "hidden sm:flex",
                      )}
                    >
                      <field.icon
                        className="size-4 shrink-0 text-muted-foreground"
                        strokeWidth={1.8}
                      />
                      <div className="flex min-w-0 flex-1 flex-col gap-0.5 leading-tight">
                        <span className="text-[0.6rem] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                          {field.label}
                        </span>
                        {field.type === "select" ? (
                          <select
                            aria-label={field.label}
                            defaultValue=""
                            className="w-full cursor-pointer appearance-none bg-transparent pr-1 text-sm font-medium text-foreground outline-none"
                          >
                            <option value="" disabled>
                              Choose a category
                            </option>
                            {categories.map((c) => (
                              <option key={c.name} value={c.name} className="text-foreground">
                                {c.name}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            aria-label={field.label}
                            type={field.type}
                            placeholder={field.placeholder}
                            className="w-full bg-transparent text-sm font-medium text-foreground outline-none placeholder:text-muted-foreground/60"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                  <Link
                    href="/studios"
                    className={buttonVariants({
                      size: "lg",
                      className:
                        "h-12 w-full gap-2 text-sm font-semibold sm:h-14 sm:w-auto sm:min-w-40",
                    })}
                    aria-label="Search studios"
                  >
                    <Search className="size-4" />
                    Search
                  </Link>
                </motion.div>
              </motion.div>
            </SwiperSlide>
          );
        })}

        {/* Progress-bar pagination — active bar fills over the autoplay cycle */}
        <div
          className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 sm:gap-3"
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
              className="relative h-1 w-14 cursor-pointer overflow-hidden rounded-full bg-white/25 outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-ring/50 sm:w-20 motion-reduce:transition-none"
            >
              {activeIndex === idx && (
                <motion.span
                  key={activeIndex}
                  className="absolute inset-0 origin-left rounded-full bg-primary"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 6, ease: "linear" }}
                />
              )}
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
