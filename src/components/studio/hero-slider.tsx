"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Sparkles,
  SlidersHorizontal,
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
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1600&auto=format&fit=crop",
    category: "Photo Studios",
    headline: "Shot-ready studios, booked in minutes",
    description:
      "Portrait lofts, cyc walls, and daylight setups — reserved by the hour so your next frame happens on schedule.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1600&auto=format&fit=crop",
    category: "Sound Stages",
    headline: "Full-scale stages for full-scale ideas",
    description:
      "Blackout sound stages with rigging grids, drive-in access, and production offices for film and commercial crews.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=1600&auto=format&fit=crop",
    category: "Podcast Rooms",
    headline: "Press record in a room that sounds rich",
    description:
      "Acoustically treated podcast suites with broadcast mics, engineers, and video capture — just bring the conversation.",
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
        className="group/hero h-[42rem] sm:h-[40rem] lg:h-[40rem] w-full"
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
                  priority={i === 0}
                  sizes="100vw"
                  className="object-cover"
                />
              </motion.span>

              {/* Strong gradient overlay so text is always readable */}
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
              />
              <span aria-hidden className="bg-dotted absolute inset-0 opacity-40" />

              {/* Copy — staggered entrance replays on every slide change */}
              <motion.div
                className="container-page relative flex h-full flex-col justify-end pb-24"
                variants={copyVariants}
                initial="hidden"
                animate={activeIndex === i ? "show" : "hidden"}
              >
                {/* Glass category pill */}
                <motion.span
                  variants={copyItemVariants}
                  className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-white uppercase backdrop-blur-md"
                >
                  <Sparkles className="size-3.5 text-primary" />
                  {slide.category}
                </motion.span>

                <motion.h1
                  variants={copyItemVariants}
                  className="mt-4 max-w-3xl font-heading text-5xl leading-[1.02] font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
                >
                  {rest}
                  <span className="bg-gradient-to-r from-primary to-amber-300 bg-clip-text text-transparent">
                    {lastWord}
                  </span>
                </motion.h1>

                <motion.p
                  variants={copyItemVariants}
                  className="mt-4 max-w-xl text-base leading-relaxed text-white/80 line-clamp-2 sm:text-lg sm:line-clamp-none"
                >
                  {slide.description}
                </motion.p>

                {/* CTAs — both link to /studios as per requirement */}
                <motion.div
                  variants={copyItemVariants}
                  className="mt-6 flex flex-wrap items-center gap-3"
                >
                  <Link
                    href="/studios"
                    className={buttonVariants({
                      size: "lg",
                      className:
                        "gap-2 shadow-lg shadow-primary/40 hover:shadow-primary/60",
                    })}
                  >
                    Explore Studios
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover/button:translate-x-1" />
                  </Link>
                  <Link
                    href="/studios"
                    className={buttonVariants({
                      size: "lg",
                      variant: "outline",
                      className:
                        "border-white/25 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:text-white",
                    })}
                  >
                    Host Your Space
                  </Link>
                </motion.div>

                {/* Subtle stat strip */}
                <motion.div
                  variants={copyItemVariants}
                  className="mt-8 hidden items-center gap-5 sm:flex sm:gap-6"
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

                {/* Glass search bar (UI only — Search links to /studios) */}
                <motion.div
                  variants={copyItemVariants}
                  className="mt-8 grid w-full max-w-3xl grid-cols-1 gap-2 rounded-3xl border border-white/15 bg-white/10 p-2 shadow-2xl backdrop-blur-xl sm:grid-cols-[1fr_1fr_1fr_auto] sm:items-center"
                >
                  {searchFields.map((field) => (
                    <div
                      key={field.name}
                      className={cn(
                        "flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-4",
                        field.name !== "location" && "hidden sm:flex",
                      )}
                    >
                      <field.icon className="size-4 shrink-0 text-white/70" strokeWidth={1.8} />
                      {field.type === "select" ? (
                        <select
                          aria-label={field.label}
                          defaultValue=""
                          className="h-12 w-full cursor-pointer appearance-none bg-transparent text-sm text-white outline-none"
                        >
                          <option value="" disabled>
                            Category
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
                          className="h-12 w-full bg-transparent text-sm text-white outline-none placeholder:text-white/60 [color-scheme:dark]"
                        />
                      )}
                    </div>
                  ))}
                  <Link
                    href="/studios"
                    className={buttonVariants({
                      size: "lg",
                      className:
                        "w-full rounded-2xl shadow-lg shadow-primary/40 sm:w-auto",
                    })}
                    aria-label="Search studios"
                  >
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
          className="absolute top-1/2 left-4 z-10 hidden size-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-300 outline-none hover:scale-105 hover:bg-white/20 focus-visible:ring-3 focus-visible:ring-ring/60 sm:grid motion-reduce:transition-none motion-reduce:hover:scale-100!"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute top-1/2 right-4 z-10 hidden size-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-300 outline-none hover:scale-105 hover:bg-white/20 focus-visible:ring-3 focus-visible:ring-ring/60 sm:grid motion-reduce:transition-none motion-reduce:hover:scale-100!"
        >
          <ChevronRight className="size-5" />
        </button>
      </Swiper>
    </section>
  );
}