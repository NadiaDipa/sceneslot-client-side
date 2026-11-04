"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  ArrowRight,
  Building2,
  ChevronLeft,
  ChevronRight,
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

// Slow Ken Burns push-in on the active slide (idle resets softly for the next pass)
const kenBurnsVariants: Variants = {
  idle: { scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
  zoom: { scale: 1.08, transition: { duration: 6, ease: "linear" } },
};

// Staggered headline → subtext → buttons entrance, replayed on the active slide
const copyVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.2 } },
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
        className="group/hero h-[34rem] sm:h-[38rem] lg:h-[42rem] w-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i} className="relative overflow-hidden">
            {/* Slide image — slow cinematic Ken Burns zoom while active */}
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

            {/* Textural overlays — dark cinematic gradients + dot grain */}
            <span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/60 to-foreground/10"
            />
            <span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent"
            />
            <span
              aria-hidden
              className="bg-dotted absolute inset-0 opacity-50"
            />

            {/* Copy — staggered entrance for headline / subtext / buttons */}
            <motion.div
              className="container-page relative flex h-full items-end pb-16 sm:items-center sm:pb-0"
              variants={copyVariants}
              initial="hidden"
              animate={activeIndex === i ? "show" : "hidden"}
            >
              <div className="max-w-2xl pb-10 sm:pb-16">
                <motion.span
                  variants={copyItemVariants}
                  className="motion-reduce:transform-none! motion-reduce:opacity-100! inline-flex items-center gap-1.5 rounded-full bg-primary/95 px-3 py-1 text-xs font-semibold tracking-wide text-primary-foreground uppercase"
                >
                  <Sparkles className="size-3.5" />
                  {slide.category}
                </motion.span>
                <motion.h1
                  variants={copyItemVariants}
                  className="motion-reduce:transform-none! motion-reduce:opacity-100! mt-4 font-heading text-4xl leading-[1.05] font-bold tracking-tight text-background sm:text-5xl lg:text-6xl"
                >
                  {slide.headline}
                </motion.h1>
                <motion.p
                  variants={copyItemVariants}
                  className="motion-reduce:transform-none! motion-reduce:opacity-100! mt-4 max-w-xl text-base leading-relaxed text-background/80 sm:text-lg"
                >
                  {slide.description}
                </motion.p>
                <motion.div
                  variants={copyItemVariants}
                  className="motion-reduce:transform-none! motion-reduce:opacity-100! mt-8 flex flex-wrap items-center gap-3"
                >
                  <Link
                    href="/studios"
                    className={buttonVariants({
                      size: "lg",
                      className: "gap-2",
                    })}
                  >
                    Explore Studios
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover/button:translate-x-0.5" />
                  </Link>
                  <Link
                    href="/add-studio"
                    className={buttonVariants({
                      size: "lg",
                      variant: "outline",
                      className:
                        "border-background/40 bg-background/10 text-background backdrop-blur-sm hover:bg-background hover:text-foreground",
                    })}
                  >
                    <Building2 className="size-4" />
                    Host Your Space
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}

        {/* Animated pagination bars (per-slide buttons; stretch when active) */}
        <div
          className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2"
          role="group"
          aria-label="Slide bullets"
        >
          {slides.map((slide, idx) => (
            <button
              key={slide.category}
              type="button"
              aria-label={`Go to slide ${idx + 1}`}
              aria-current={activeIndex === idx ? "true" : undefined}
              onClick={() => swiperRef.current?.slideToLoop(idx)}
              className={cn(
                "h-1.5 shrink-0 cursor-pointer rounded-full transition-all duration-300 outline-none focus-visible:ring-3 focus-visible:ring-ring/50 motion-reduce:transition-none",
                activeIndex === idx
                  ? "w-10 bg-background"
                  : "w-5 bg-background/40 hover:w-7 hover:bg-background/70",
              )}
            />
          ))}
        </div>

        {/* Arrows */}
        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute top-1/2 left-4 z-10 hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-background/20 bg-foreground/30 text-background backdrop-blur-sm transition-all hover:bg-foreground/50 focus-visible:ring-3 focus-visible:ring-ring/50 sm:grid"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute top-1/2 right-4 z-10 hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-background/20 bg-foreground/30 text-background backdrop-blur-sm transition-all hover:bg-foreground/50 focus-visible:ring-3 focus-visible:ring-ring/50 sm:grid"
        >
          <ChevronRight className="size-5" />
        </button>
      </Swiper>
    </section>
  );
}
